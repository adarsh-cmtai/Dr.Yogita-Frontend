// app/payment-confirmation/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { Button } from "@/components/ui/button"; // Adjust path as per your project
import { Loader2, AlertTriangle, CheckCircleIcon, Download, Home } from "lucide-react";
import FooterSection from "@/components/footer-section"; // Adjust path

interface Ebook {
  _id: string;
  title: string;
  description: string;
  price: number;
  pages: number;
  image: string;
  category: string;
  slug: string;
  pdfFileUrl?: string;
  razorpayPaymentLink?: string;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";
const SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID = 'rp_pending_purchase_ebook_id';

function PaymentConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [purchasedEbook, setPurchasedEbook] = useState<Ebook | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // --- CRUCIAL DEBUGGING LOGS ---
    console.log("Payment Confirmation Page Loaded. Full URL:", window.location.href);
    console.log("Raw URL Search Params String:", window.location.search);
    const allParamsFromNext: Record<string, string> = {}; // <--- FIX APPLIED HERE
    for (const [key, value] of searchParams.entries()) {
        allParamsFromNext[key] = value;
    }
    console.log("Parsed Search Params by Next.js (useSearchParams):", allParamsFromNext);
    // --- END DEBUGGING LOGS ---

    // Standard Razorpay parameters for Payment Links/Pages
    const rzpPaymentId = searchParams.get('razorpay_payment_id');
    const rzpPaymentLinkStatus = searchParams.get('razorpay_payment_link_status');
    // const rzpOrderId = searchParams.get('razorpay_order_id'); // Useful for backend verification
    // const rzpSignature = searchParams.get('razorpay_signature'); // Essential for backend verification

    // Fallback to generic parameters (less likely for standard Razorpay flow but good for flexibility)
    const genericStatusParam = searchParams.get('status'); // Your original 'status'
    const genericPaymentIdParam = searchParams.get('payment_id'); // Your original 'payment_id'

    const pendingEbookId = sessionStorage.getItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID);

    const processPayment = async () => {
      let isSuccess = false;
      let isFailure = false;
      let failureReason = "Payment failed or was cancelled by the user."; // Default failure message
      let paymentIdForVerification = rzpPaymentId || genericPaymentIdParam;

      // Determine payment outcome
      if (rzpPaymentId && rzpPaymentLinkStatus === 'paid') {
        isSuccess = true;
        console.log("Detected success via razorpay_payment_id and razorpay_payment_link_status='paid'.");
      } else if (rzpPaymentId && !rzpPaymentLinkStatus && !genericStatusParam) {
        // If only rzpPaymentId is present, and no other status, assume success (common in some RZP flows)
        // This needs careful testing with your specific Razorpay setup.
        console.warn("Assuming success based on presence of razorpay_payment_id only. Verify this flow.");
        isSuccess = true;
      } else if (rzpPaymentLinkStatus && (rzpPaymentLinkStatus === 'failed' || rzpPaymentLinkStatus === 'cancelled')) {
        isFailure = true;
        const rzpErrorDesc = searchParams.get('razorpay_error_description');
        failureReason = `Payment ${rzpPaymentLinkStatus}.${rzpErrorDesc ? ` ${rzpErrorDesc}` : ''}`;
        console.log("Detected failure via razorpay_payment_link_status:", rzpPaymentLinkStatus);
      } else if (genericStatusParam === 'success' && paymentIdForVerification) {
        isSuccess = true; // Fallback to your generic 'status' parameter
        console.log("Detected success via generic 'status=success' parameter.");
      } else if (genericStatusParam === 'failed') {
        isFailure = true;
        const genericReason = searchParams.get('reason');
        failureReason = `Payment failed.${genericReason ? ` Reason: ${genericReason}` : ''}`;
        console.log("Detected failure via generic 'status=failed' parameter.");
      }


      if (!isSuccess && !isFailure) {
        let specificErrorMsg = "Payment details are missing, invalid, or incomplete in the redirect URL.";
        if (!paymentIdForVerification && !rzpPaymentLinkStatus && !genericStatusParam) {
            // This is the original error you saw
            specificErrorMsg = "Payment details are missing from the redirect URL. Please contact support if you made a purchase.";
        } else if (paymentIdForVerification && !pendingEbookId) {
             specificErrorMsg = "Payment details found, but the purchased item could not be identified from your session. Please contact support.";
        }
        console.error("Could not determine payment status clearly.", {rzpPaymentId, rzpPaymentLinkStatus, genericStatusParam, paymentIdForVerification});
        setError(specificErrorMsg);
        // No 'return' here, finally block handles cleanup.
      } else if (isSuccess) {
        if (!pendingEbookId) {
          console.error("Payment successful, but no pendingEbookId in session.");
          setError("Payment successful, but we could not identify the purchased item. Please contact support with your payment ID.");
          // No 'return', finally block.
        } else {
          console.log("Processing successful payment for ebook ID:", pendingEbookId, "with payment ID:", paymentIdForVerification);
          // Backend verification is highly recommended here using paymentIdForVerification, rzpOrderId, rzpSignature
          // Example:
          // const verifyResponse = await fetch(`${API_BASE_URL}/payment/razorpay-verify`, { /* ... */ });
          // if (!verifyData.success) throw new Error('Backend payment verification failed.');

          try {
            const response = await fetch(`${API_BASE_URL}/ebooks`); // Fetch all to find one
            if (!response.ok) throw new Error("Failed to fetch e-book details after payment.");
            const ebookData = await response.json();

            if (ebookData.success && Array.isArray(ebookData.data)) {
              const ebook = ebookData.data.find((eb: Ebook) => eb._id === pendingEbookId);
              if (ebook) {
                setPurchasedEbook(ebook);
                setSuccessMessage(`Your purchase of "${ebook.title}" was successful!`);
              } else {
                console.error("Payment successful, but pendingEbookId not found in fetched ebooks:", pendingEbookId);
                setError("Payment successful, but there was an issue retrieving your e-book details. Please contact support.");
              }
            } else {
              throw new Error(ebookData.error || "Could not parse e-book data after payment.");
            }
          } catch (fetchErr: any) {
             console.error("Error fetching/processing ebook details post-payment:", fetchErr);
             setError("Payment successful, but an error occurred retrieving e-book details: " + fetchErr.message);
          }
        }
      } else if (isFailure) {
        console.log("Payment failed. Reason:", failureReason);
        setError(failureReason);
      }
      
      // Cleanup is handled in finally
      try {
        // Code that might throw before finally
      } catch(e) {
        // handle if necessary, or let finally do its job
      } finally {
        if (pendingEbookId) {
            console.log("Removing pendingEbookId from session storage:", pendingEbookId);
            sessionStorage.removeItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID);
        }
        setIsLoading(false);
        // Clean up URL query parameters by replacing the current history entry
        // This should be one of the last things to ensure all params were read
        if (router && typeof router.replace === 'function') {
            const currentPathname = window.location.pathname; // Or your desired base path for this page
            console.log("Replacing URL to clean params. Current pathname:", currentPathname);
            router.replace(currentPathname, { scroll: false });
        } else {
            console.warn("Router not available or replace is not a function for URL cleaning.");
        }
      }
    };

    processPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]); // Ensure router and searchParams are in dependency array

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-pink-600">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="text-xl">Verifying your payment, please wait...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 text-center min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      {error && (
        <div className="bg-red-50 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-red-700 mb-3">Payment Issue</h1>
          <p className="text-gray-700 mb-8">{error}</p>
          <Button onClick={() => router.push('/library')} className="bg-red-600 hover:bg-red-700 text-white">
            <Home className="mr-2 h-4 w-4" /> Go to Library
          </Button>
        </div>
      )}

      {successMessage && purchasedEbook && (
        <div className="bg-green-50 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-green-700 mb-3">Thank You for Your Purchase!</h1>
          <p className="text-gray-700 mb-4">{successMessage}</p>
          
          {purchasedEbook.image && (
            <div className="my-6">
              <NextImage 
                src={purchasedEbook.image} 
                alt={purchasedEbook.title} 
                width={150} 
                height={200} 
                className="mx-auto rounded-md shadow-md object-cover" 
                unoptimized={purchasedEbook.image?.includes("cloudinary") ? true : false}
              />
            </div>
          )}

          {purchasedEbook.pdfFileUrl ? (
            <a
              href={purchasedEbook.pdfFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={`${purchasedEbook.title.replace(/[^a-zA-Z0-9\s_-]/g, '') || 'ebook'}.pdf`}
              className="w-full inline-block"
            >
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-3">
                <Download className="mr-2 h-5 w-5" /> Download: {purchasedEbook.title}
              </Button>
            </a>
          ) : (
            <p className="text-yellow-600 bg-yellow-50 p-3 rounded-md">
              Your e-book is confirmed! The download link is being prepared. Please check your email shortly, or contact support if you don't receive it.
            </p>
          )}
          <Button variant="outline" onClick={() => router.push('/library')} className="mt-8">
             Continue Browsing Library
          </Button>
        </div>
      )}

      {!isLoading && !error && !successMessage && (
         <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-lg w-full">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-2xl font-semibold text-gray-700 mb-3">Payment Status Unknown</h1>
            <p className="text-gray-600 mb-8">Could not determine payment status or no payment information was found in the redirect. If you believe this is an error, please contact support.</p>
            <Button onClick={() => router.push('/library')} className="mt-6">
                Go to Library
            </Button>
        </div>
      )}
    </div>
  );
}

export default function PaymentConfirmationPage() {
  return (
    <>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-pink-600">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p className="text-xl">Loading page...</p>
        </div>
      }>
        <PaymentConfirmationContent />
      </Suspense>
      <FooterSection />
    </>
  );
} 
