// app/payment-status/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Download, Loader2, AlertTriangle, CheckCircle as CheckCircleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import FooterSection from "@/components/footer-section";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

interface PurchasedItem {
  _id: string;
  title: string;
  pdfFileUrl?: string; 
  itemType: 'ebook' | 'nutritionPlan' | 'unknown'; 
}

function PaymentStatusDisplay() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'pending'>('loading');
  const [message, setMessage] = useState("Verifying your payment. Please wait...");
  const [purchasedItemDetails, setPurchasedItemDetails] = useState<PurchasedItem | null>(null);

  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (!orderId) {
      setMessage("Order ID not found. Cannot verify payment.");
      setStatus('failed'); setIsLoading(false); return;
    }

    console.log(`Payment Status Page: Verifying order ${orderId}`);
    setIsLoading(true);

    const verifyPayment = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/payment/cashfree-order-status/${orderId}`);
        const data = await response.json();
        console.log("Payment Status Page: Backend verification response:", data);

        if (data.success && data.orderData) {
          const orderDetails = data.orderData;
          const tags = orderDetails.order_tags || (orderDetails.tags as any);
          const itemId = tags?.itemId as string | undefined; // Explicitly type itemId
          
          // Ensure itemTypeFromTag is explicitly typed to include 'unknown' from the start
          const itemTypeFromTag: 'ebook' | 'nutritionPlan' | 'unknown' = 
            tags?.itemType === 'ebook' ? 'ebook' :
            tags?.itemType === 'nutritionPlan' ? 'nutritionPlan' :
            'unknown';
            
          const itemNameFromTag = tags?.itemName as string || 'your purchased item';

          console.log(`Item ID from tags: ${itemId}, Item Type from tags: ${itemTypeFromTag}, Item Name from tags: ${itemNameFromTag}`);

          if (orderDetails.order_status === "PAID") {
            setStatus('success');
            setMessage(`Payment for "${itemNameFromTag}" was successful!`);

            let finalPdfUrl: string | undefined;
            
            if (itemId) { // Only proceed if itemId is valid
              if (itemTypeFromTag === 'ebook') {
                finalPdfUrl = data.orderData.purchasedItem?.pdfFileUrl || tags?.pdfFileUrl;
                console.log("Using pdfFileUrl for ebook:", finalPdfUrl);
              } else if (itemTypeFromTag === 'nutritionPlan') {
                finalPdfUrl = `${API_BASE_URL}/api/nutrition-plans/download/${itemId}`;
                console.log("Constructed download URL for nutrition plan:", finalPdfUrl);
              }
              // No specific URL needed for 'unknown' type here for download button logic

              setPurchasedItemDetails({
                _id: itemId,
                title: itemNameFromTag,
                pdfFileUrl: finalPdfUrl,
                itemType: itemTypeFromTag, // This will be 'ebook', 'nutritionPlan', or 'unknown'
              });
            } else { // itemId is missing
              console.warn("itemId missing in order tags. Download link will not be available.");
              setMessage(prev => prev + " However, specific item details for download couldn't be fully retrieved. Please check your email or contact support.");
              setPurchasedItemDetails({ // Still set some details for messaging
                  _id: "N/A", title: itemNameFromTag, itemType: 'unknown' 
              });
            }

          } else if (["ACTIVE", "PENDING", "INITIALIZED"].includes(orderDetails.order_status)) {
            setStatus('pending'); 
            setMessage(`Payment for "${itemNameFromTag}" is ${orderDetails.order_status}. We'll notify you.`);
            if (itemId) setPurchasedItemDetails({_id: itemId, title: itemNameFromTag, itemType: itemTypeFromTag});
          } else { // Failed or other statuses
            setStatus('failed'); 
            setMessage(`Payment for "${itemNameFromTag}" was ${orderDetails.order_status || 'unsuccessful'}. ${orderDetails.paymentMessage || ''}`);
            if (itemId) setPurchasedItemDetails({_id: itemId, title: itemNameFromTag, itemType: itemTypeFromTag});
          }
        } else { // data.success is false or no data.orderData
          setStatus('failed'); 
          setMessage(`Could not verify payment status for order ${orderId}. ${data.error || 'Server error.'}`);
        }
      } catch (err: any) {
        console.error("Payment Status Page: Error during verification:", err);
        setStatus('failed'); setMessage("An error occurred: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [orderId]); 

  const handleCloseAndRedirect = () => {
    let redirectPath = '/'; // Default fallback
    if (purchasedItemDetails) {
        if (purchasedItemDetails.itemType === 'ebook') redirectPath = '/library';
        else if (purchasedItemDetails.itemType === 'nutritionPlan') redirectPath = '/nutrition';
    }
    router.replace(redirectPath);
  };

  let downloadUrlForButton: string | undefined;
  let downloadButtonText = "Download Item";
  let suggestedFileName: string | undefined;

  if (status === 'success' && purchasedItemDetails) {
    downloadButtonText = `Download: ${purchasedItemDetails.title}`;
    if (purchasedItemDetails.itemType === 'ebook' && purchasedItemDetails._id !== "N/A") {
      downloadUrlForButton = `${API_BASE_URL}/api/ebooks/download/${purchasedItemDetails._id}`;
      suggestedFileName = `${purchasedItemDetails.title.replace(/\s+/g, '_') || 'ebook'}.pdf`;
    } else if (purchasedItemDetails.itemType === 'nutritionPlan' && purchasedItemDetails._id !== "N/A") {
      downloadUrlForButton = `${API_BASE_URL}/api/nutrition-plans/download/${purchasedItemDetails._id}`;
      suggestedFileName = `${purchasedItemDetails.title.replace(/\s+/g, '_') || 'nutrition-plan'}.pdf`;
    } 
    // If pdfFileUrl_direct was set for ebooks and that's preferred:
    // else if (purchasedItemDetails.itemType === 'ebook' && purchasedItemDetails.pdfFileUrl_direct) {
    //   downloadUrlForButton = purchasedItemDetails.pdfFileUrl_direct;
    // }
  }

  if (isLoading) { 
    return (<div className="min-h-screen flex flex-col items-center justify-center text-center p-4"><Loader2 className="h-12 w-12 text-pink-500 animate-spin mb-4" /><p className="text-xl text-gray-700">Verifying your payment status...</p></div>);
  }

  return (
    <Dialog open={true} onOpenChange={() => { /* Controlled by page presence */ }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {status === 'success' && <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3"><CheckCircleIcon className="h-7 w-7 text-green-600" /></div>}
          {status === 'failed' && <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3"><AlertTriangle className="h-7 w-7 text-red-600" /></div>}
          {status === 'pending' && <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-3"><Loader2 className="h-7 w-7 text-yellow-600 animate-spin" /></div>}
          <DialogTitle className="text-center text-xl">
            {status === 'success' && "Payment Successful!"}
            {status === 'failed' && "Payment Unsuccessful"}
            {status === 'pending' && "Payment Pending"}
            {status === 'loading' && "Verifying Payment..."} 
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4 text-center">
          <p className="text-gray-600 text-sm">{message}</p>
          
          {status === 'success' && purchasedItemDetails && purchasedItemDetails._id !== "N/A" && downloadUrlForButton && (
            <a 
              href={downloadUrlForButton} 
              rel="noopener noreferrer" 
              download={suggestedFileName}
              className="w-full inline-block"
            >
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                <Download className="mr-2 h-4 w-4" />{downloadButtonText}
              </Button>
            </a>
          )}
          {status === 'success' && purchasedItemDetails && (purchasedItemDetails._id === "N/A" || !downloadUrlForButton) && (
             <p className="text-orange-500 text-sm">Your item "{purchasedItemDetails.title}" is confirmed. Download link is being prepared or will be sent via email. Contact support if not received.</p>
          )}
           {status === 'success' && !purchasedItemDetails && ( // Should ideally not hit this if itemId is always extracted
             <p className="text-orange-500 text-sm">Your payment is confirmed. Item details are being processed, please check your email or contact support.</p>
          )}

          <DialogFooter className="sm:justify-center pt-2">
            <Button variant="outline" onClick={handleCloseAndRedirect}>
              {status === 'success' ? "Continue to Site" : "Back to Site"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-pink-600" /> Loading Payment Status...</div>}>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <PaymentStatusDisplay />
        </main>
        <FooterSection />
      </div>
    </Suspense>
  );
}