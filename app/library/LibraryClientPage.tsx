"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent, Suspense, useCallback } from "react";
// Script from next/script is no longer needed for Cashfree
import { motion } from "framer-motion";
import NextImage from "next/image";
// ... other imports
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ShoppingCart, Search, Filter as FilterIcon, X, Loader2, AlertTriangle, CheckCircle as CheckCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import FooterSection from "@/components/footer-section";
import { useRouter, useSearchParams } from 'next/navigation';

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
  razorpayPaymentLink?: string; // New field for Razorpay payment page URL
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:5001/api";
const SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID = 'rp_pending_purchase_ebook_id';

// This component now handles redirect from Razorpay
function PaymentStatusHandler({
  allEbooks,
  setSelectedEbookForModal,
  openThankYouModal,
  openPaymentFailedModal,
  setIsLoadingStatusCheck,
}: {
  allEbooks: Ebook[];
  setSelectedEbookForModal: (ebook: Ebook | null) => void;
  openThankYouModal: () => void;
  openPaymentFailedModal: (message: string) => void;
  setIsLoadingStatusCheck: (loading: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentStatus = searchParams.get('status'); // Parameter from Razorpay redirect
    const razorpayPaymentId = searchParams.get('payment_id'); // Razorpay payment ID
    // const razorpayOrderId = searchParams.get('order_id'); // Razorpay order ID (if needed for backend verification)

    if (paymentStatus && razorpayPaymentId) {
      setIsLoadingStatusCheck(true);
      const pendingEbookId = sessionStorage.getItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID);

      const processPaymentResult = async () => {
        try {
          if (paymentStatus === 'success' && pendingEbookId) {
            // OPTIONAL: Backend verification step
            // Here, you would ideally call your backend to verify the Razorpay payment_id
            // For example:
            // const verifyResponse = await fetch(`${API_BASE_URL}/payment/razorpay-verify-payment`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ razorpay_payment_id: razorpayPaymentId, expected_ebook_id: pendingEbookId })
            // });
            // const verifyData = await verifyResponse.json();
            // if (!verifyResponse.ok || !verifyData.success) {
            //   throw new Error(verifyData.error || 'Payment verification failed with backend.');
            // }
            // For this example, we'll assume direct success if Razorpay redirects with status=success

            const purchasedEbook = allEbooks.find(eb => eb._id === pendingEbookId);
            if (purchasedEbook) {
              setSelectedEbookForModal(purchasedEbook);
              openThankYouModal();
              console.log("PaymentStatusHandler: Razorpay success, ebook found:", purchasedEbook.title);
            } else {
              console.error("PaymentStatusHandler: Razorpay success, but pending ebook ID not found in allEbooks list:", pendingEbookId);
              openPaymentFailedModal("Payment successful, but there was an issue retrieving your e-book details. Please contact support.");
            }
          } else if (paymentStatus === 'failed') {
            openPaymentFailedModal(`Payment via Razorpay failed. Reason: ${searchParams.get('reason') || 'Unknown reason'}`);
          } else if (!pendingEbookId && paymentStatus === 'success') {
            console.warn("PaymentStatusHandler: Razorpay success, but no pendingEbookId in session. This might be an old redirect.");
            // Potentially show a generic success or just clean URL
            openPaymentFailedModal("Payment status unclear. If you made a purchase, please check your email or contact support.");
          }
        } catch (err: any) {
          console.error("PaymentStatusHandler: Error processing Razorpay result:", err);
          openPaymentFailedModal("Error processing payment result: " + err.message);
        } finally {
          sessionStorage.removeItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID);
          setIsLoadingStatusCheck(false);
          // Clean up URL query parameters
          if (router && typeof router.replace === 'function') {
            router.replace('/library', { scroll: false });
          }
        }
      };

      processPaymentResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, allEbooks, router]); // Key dependencies

  return null;
}

export default function LibraryClientPage() {
  const [allEbooks, setAllEbooks] = useState<Ebook[]>([]);
  const [filteredEbooks, setFilteredEbooks] = useState<Ebook[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoadingEbooks, setIsLoadingEbooks] = useState(true);
  const [fetchEbooksError, setFetchEbooksError] = useState<string | null>(null);
  
  // Removed Cashfree specific states: isSubmittingPayment, isPaymentModalOpen, paymentFormData, isCashfreeSDKLoaded
  const [isLoadingStatusCheck, setIsLoadingStatusCheck] = useState(false); // For payment status check on redirect
  const [selectedEbookForModal, setSelectedEbookForModal] = useState<Ebook | null>(null); // For Thank You/Failed modals
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [isPaymentFailedModalOpen, setIsPaymentFailedModalOpen] = useState(false);
  const [paymentFailedMessage, setPaymentFailedMessage] = useState("");
  const [isPaymentPendingModalOpen, setIsPaymentPendingModalOpen] = useState(false); // Kept if needed for other async ops, but less relevant for Razorpay Page
  const [paymentPendingMessage, setPaymentPendingMessage] = useState("");

  const router = useRouter();

  const openThankYouModal = useCallback(() => { console.log("Opening Thank You Modal"); setIsThankYouModalOpen(true); }, []);
  const openPaymentFailedModal = useCallback((message: string) => { setPaymentFailedMessage(message); setIsPaymentFailedModalOpen(true); }, []);
  // openPaymentPendingModal might be less used now, but kept for consistency
  const openPaymentPendingModal = useCallback((message: string) => { setPaymentPendingMessage(message); setIsPaymentPendingModalOpen(true); }, []);


  useEffect(() => {
    const fetchEbooks = async () => {
      setIsLoadingEbooks(true); setFetchEbooksError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/ebooks`);
        if (!response.ok) { const errData = await response.json().catch(() => ({})); throw new Error(errData.error || `Failed status: ${response.status}`); }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const fetched: Ebook[] = data.data.map((eb: any) => ({
            _id: eb._id, title: eb.title, description: eb.description, price: eb.price,
            pages: eb.pages, image: eb.thumbnailUrl, category: eb.category, slug: eb.slug,
            pdfFileUrl: eb.pdfFileUrl,
            razorpayPaymentLink: eb.razorpayPaymentLink, // Make sure your API sends this
          }));
          setAllEbooks(fetched); setFilteredEbooks(fetched);
          setCategories(Array.from(new Set(fetched.map(e => e.category?.trim()).filter(Boolean))).sort());
        } else { throw new Error(data.error || "Unknown fetch error."); }
      } catch (err: any) { setFetchEbooksError(err.message); console.error("Fetch Ebooks Error:", err); }
      finally { setIsLoadingEbooks(false); }
    };
    fetchEbooks();
  }, []);

  useEffect(() => {
    let current = [...allEbooks];
    if (searchQuery.trim()) { const lower = searchQuery.toLowerCase().trim(); current = current.filter(e => e.title.toLowerCase().includes(lower) || e.description.toLowerCase().includes(lower)); }
    if (selectedCategory) { current = current.filter(e => e.category === selectedCategory); }
    setFilteredEbooks(current);
  }, [searchQuery, selectedCategory, allEbooks]);

  const handleCategoryClick = (category: string) => setSelectedCategory(category === selectedCategory ? null : category);

  const handleBuyClick = (ebook: Ebook) => {
    if (!ebook.razorpayPaymentLink) {
      alert("Sorry, this e-book is currently not available for purchase. The payment link is missing.");
      console.error("Razorpay payment link missing for ebook:", ebook.title, ebook._id);
      return;
    }
    // Store the ebook ID in session storage so we know what was purchased upon redirect
    sessionStorage.setItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_EBOOK_ID, ebook._id);
    
    // Construct the Razorpay payment page URL.
    // If your Razorpay page link already includes some dynamic parts or you need to add notes for tracking,
    // you might construct it here. For simple links, just use it directly.
    // Example: appending email if Razorpay page supports prefilling `contact` or `email` via URL:
    // const paymentUrl = new URL(ebook.razorpayPaymentLink);
    // paymentUrl.searchParams.set('contact', 'user_email@example.com'); // If user email is known and page supports it
    // window.location.href = paymentUrl.toString();

    console.log(`Redirecting to Razorpay for ${ebook.title}: ${ebook.razorpayPaymentLink}`);
    window.location.href = ebook.razorpayPaymentLink;
  };

  // handlePaymentSubmit and customer details modal are removed.

  const resetPostPaymentModals = () => {
    setIsThankYouModalOpen(false); setIsPaymentFailedModalOpen(false); setIsPaymentPendingModalOpen(false);
    setSelectedEbookForModal(null); setPaymentFailedMessage(""); setPaymentPendingMessage("");
  };

  if (isLoadingEbooks || isLoadingStatusCheck) return (<div className="min-h-screen flex flex-col items-center justify-center bg-rose-50/30"><Loader2 className="h-12 w-12 text-pink-500 animate-spin" /><p className="mt-4 text-xl text-pink-600">{isLoadingStatusCheck ? 'Verifying Payment...' : 'Loading Library...'}</p></div>);
  if (fetchEbooksError) return (<div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-4"><AlertTriangle className="h-12 w-12 mb-4" /><p className="text-xl font-semibold text-center">Failed to Load E-Books</p><p className="mt-2 text-center max-w-md">{fetchEbooksError}</p><Button onClick={() => window.location.reload()} className="mt-6 bg-red-600 hover:bg-red-700 text-white">Try Again</Button></div>);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-pink-600" /></div>}>
      {/* No Cashfree SDK Script needed */}
      <PaymentStatusHandler
        allEbooks={allEbooks}
        setSelectedEbookForModal={setSelectedEbookForModal}
        openThankYouModal={openThankYouModal}
        openPaymentFailedModal={openPaymentFailedModal}
        setIsLoadingStatusCheck={setIsLoadingStatusCheck}
      />
      <>
        <section className="relative py-20 md:py-28 overflow-hidden"> {/* Hero Section */}
            <div className="absolute inset-0 z-0"><NextImage src="/library/library.jpg" alt="Library Hero" fill className="object-cover brightness-[0.6] filter" sizes="100vw" priority /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div></div>
            <div className="container mx-auto px-4 relative z-10"><div className="max-w-3xl mx-auto text-center"><motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>E-Book Library</motion.h1><motion.p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>Explore our e-books on physiotherapy, wellness, and recovery.</motion.p></div></div>
        </section>
        <section className="py-12 bg-rose-50/50"> {/* Search and Filter */}
            <div className="container mx-auto px-4"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}><Card className="border-pink-100 shadow-sm"><CardContent className="p-6"><div className="flex flex-col md:flex-row gap-6 md:items-end">
                <div className="w-full md:flex-1"><label htmlFor="search-ebooks" className="block text-sm font-medium text-gray-700 mb-1.5">Search</label><div className="relative"><Input id="search-ebooks" type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pr-10 shadow-sm" /><div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"><Search className="h-5 w-5" /></div></div></div>
                {categories.length > 0 && (<div className="w-full md:flex-1"><label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label><div className="flex flex-wrap gap-2">{categories.map(cat => (<Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} size="sm" onClick={() => handleCategoryClick(cat)} className={`rounded-full ${selectedCategory === cat ? "bg-pink-500 text-white hover:bg-pink-600 border-pink-500" : "border-pink-300 text-pink-700 hover:bg-pink-100"}`}>{cat}</Button>))}
                {selectedCategory && (<Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)} className="rounded-full text-gray-600 hover:bg-gray-200 flex items-center">Clear <X className="ml-1 h-4 w-4" /></Button>)}
                </div></div>)}
            </div></CardContent></Card></motion.div></div>
        </section>
        <section className="py-16 bg-white"> {/* E-books Grid */}
            <div className="container mx-auto px-4">
                {filteredEbooks.length > 0 ? (<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {filteredEbooks.map((eb, idx) => (<motion.div key={eb._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}><Card className="h-full border-gray-200 hover:shadow-xl focus-within:shadow-xl flex flex-col overflow-hidden rounded-lg group"><div className="relative aspect-[3/4] w-full overflow-hidden"><NextImage src={eb.image || "/placeholder-ebook.png"} alt={eb.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw, 25vw" priority={idx < 4} unoptimized={eb.image?.includes("cloudinary") ? true : false} /><div className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow">₹{eb.price}</div></div><CardContent className="p-5 flex-grow flex flex-col"><div className="mb-3 flex flex-wrap gap-2"><span className="bg-pink-100 text-pink-700 text-xs px-2 py-0.5 rounded-full font-medium">{eb.category}</span><span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">{eb.pages} pages</span></div><h3 className="text-lg font-semibold text-gray-800 mb-1.5 line-clamp-2 group-hover:text-pink-600 transition-colors">{eb.title}</h3><p className="text-gray-600 text-sm mb-5 flex-grow line-clamp-3">{eb.description}</p>
                    <Button
                      onClick={() => handleBuyClick(eb)}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-auto"
                      disabled={isLoadingEbooks || !eb.razorpayPaymentLink} // Disable if loading or link missing
                      aria-label={`Buy ${eb.title}`}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {(!eb.razorpayPaymentLink && !isLoadingEbooks) ? "Unavailable" : "Buy Now"}
                    </Button>
                    </CardContent></Card></motion.div>))}
                </div>) : (<div className="col-span-full text-center py-16"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><FilterIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" /><h3 className="text-2xl font-semibold text-gray-700 mb-3">No E-Books Found</h3><p className="text-gray-500 max-w-md mx-auto">Try different keywords or filters.</p></motion.div></div>)}
            </div>
        </section>

        {/* Customer details modal removed */}

        {/* Thank You Modal */}
        <Dialog open={isThankYouModalOpen} onOpenChange={(isOpen) => !isOpen && resetPostPaymentModals()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader><div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3"><CheckCircleIcon className="h-7 w-7 text-green-600" /></div><DialogTitle className="text-center text-xl">Thank You!</DialogTitle></DialogHeader>
                <div className="space-y-5 mt-4 text-center"><p className="text-gray-600 text-sm">Your e-book, "{selectedEbookForModal?.title || 'Selected Ebook'}", is ready.</p>
                    {selectedEbookForModal && selectedEbookForModal.pdfFileUrl ? (
                        <a href={selectedEbookForModal.pdfFileUrl} target="_blank" rel="noopener noreferrer" download={selectedEbookForModal.title + ".pdf"} className="w-full inline-block"><Button className="w-full bg-pink-500 hover:bg-pink-600"><Download className="mr-2 h-4 w-4" />Download: {selectedEbookForModal.title}</Button></a>
                    ) : (<p className="text-red-500 text-sm">Download link processing. Check email or contact support.</p>)}
                    <DialogFooter className="sm:justify-center"><Button variant="outline" onClick={() => { resetPostPaymentModals(); router.replace('/library', { scroll: false }); }}>Close</Button></DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
        {/* Payment Failed Modal */}
        <Dialog open={isPaymentFailedModalOpen} onOpenChange={(isOpen) => !isOpen && resetPostPaymentModals()}><DialogContent className="sm:max-w-md"><DialogHeader><div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3"><AlertTriangle className="h-7 w-7 text-red-600" /></div><DialogTitle className="text-center text-xl">Payment Unsuccessful</DialogTitle></DialogHeader><div className="space-y-5 mt-4 text-center"><p className="text-gray-600 text-sm">{paymentFailedMessage || "Error during payment."}</p><DialogFooter className="sm:justify-center"><Button variant="outline" onClick={resetPostPaymentModals}>Close</Button></DialogFooter></div></DialogContent></Dialog>
        {/* Payment Pending Modal (might be less relevant now) */}
        <Dialog open={isPaymentPendingModalOpen} onOpenChange={(isOpen) => !isOpen && resetPostPaymentModals()}><DialogContent className="sm:max-w-md"><DialogHeader><div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-3"><Loader2 className="h-7 w-7 text-yellow-600 animate-spin" /></div><DialogTitle className="text-center text-xl">Payment Status</DialogTitle></DialogHeader><div className="space-y-5 mt-4 text-center"><p className="text-gray-600 text-sm">{paymentPendingMessage || "Checking payment status."}</p><DialogFooter className="sm:justify-center"><Button variant="outline" onClick={resetPostPaymentModals}>Close</Button></DialogFooter></div></DialogContent></Dialog>
        <FooterSection />
      </>
    </Suspense>
  );
}