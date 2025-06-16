"use client"

import React, { useState, useEffect, useMemo, ChangeEvent, Suspense, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Filter as FilterIcon, X, Download, Loader2, AlertTriangle, CheckCircle as CheckCircleIcon } from "lucide-react"
import Image from "next/image" // Changed from NextImage to Image for consistency with your other imports
import { Button } from "@/components/ui/button"
import FooterSection from "@/components/footer-section"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter, useSearchParams } from 'next/navigation'; // For redirect handling

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}` || "http://localhost:5001";
const SESSION_STORAGE_KEY_PENDING_PURCHASE_NUTRITION_PLAN_ID = 'rp_pending_purchase_nutrition_plan_id';


interface Thumbnail {
  url: string;
  key?: string;
}

interface NutritionPlan {
  _id: string;
  title: string;
  description: string;
  price: number;
  pages?: number;
  thumbnail?: Thumbnail;
  category: string;
  slug: string;
  createdAt: string;
  razorpayPaymentLink: string; // Field for Razorpay payment page URL (matches AdminDashboard)
  pdfUrl: string;             // Link to the downloadable PDF
}

const getImageUrl = (thumbnail?: Thumbnail): string => {
  if (!thumbnail?.url) return "/placeholder.svg";
  if (thumbnail.url.startsWith('http')) return thumbnail.url;
  return `${API_URL}${thumbnail.url.startsWith('/') ? '' : '/'}${thumbnail.url}`;
};

// Component to handle redirect from Razorpay
function PaymentStatusHandler({
  allNutritionPlans,
  setSelectedPlanForModal,
  openThankYouModal,
  openPaymentFailedModal,
  setIsLoadingStatusCheck,
}: {
  allNutritionPlans: NutritionPlan[];
  setSelectedPlanForModal: (plan: NutritionPlan | null) => void;
  openThankYouModal: () => void;
  openPaymentFailedModal: (message: string) => void;
  setIsLoadingStatusCheck: (loading: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const razorpayStatus = searchParams.get('razorpay_payment_link_status');
    // Ensure this 'internal_plan_id' is the query param you add to your Razorpay Payment Page's Redirect URL
    const planIdFromQuery = searchParams.get('internal_plan_id'); 

    if (razorpayStatus && planIdFromQuery) { // Only proceed if both Razorpay status and your custom ID are present
      setIsLoadingStatusCheck(true);
      const pendingPlanId = sessionStorage.getItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_NUTRITION_PLAN_ID);

      const processPaymentResult = async () => {
        try {
          if (razorpayStatus === 'paid' && pendingPlanId) {
            if (pendingPlanId !== planIdFromQuery) {
                console.warn("PaymentStatusHandler: Mismatch between session plan ID and query plan ID.", 
                             `Session: ${pendingPlanId}, Query: ${planIdFromQuery}. Using query plan ID.`);
                // Potentially log this for security review. For now, proceed with query ID.
            }

            const purchasedPlan = allNutritionPlans.find(plan => plan._id === planIdFromQuery);
            if (purchasedPlan) {
              setSelectedPlanForModal(purchasedPlan);
              openThankYouModal();
              console.log("PaymentStatusHandler: Razorpay success, nutrition plan found:", purchasedPlan.title);
            } else {
              console.error("PaymentStatusHandler: Razorpay success, but plan ID from query not found:", planIdFromQuery);
              openPaymentFailedModal("Payment successful, but there was an issue retrieving your nutrition plan details. Please contact support.");
            }
          } else if (razorpayStatus !== 'paid') {
            openPaymentFailedModal(`Payment was not successful. Status: ${razorpayStatus}. Please try again or contact support.`);
          } else if (!pendingPlanId && razorpayStatus === 'paid') {
            console.warn("PaymentStatusHandler: Razorpay success, but no pendingPlanId in session. This might be an old redirect or direct access.");
            openPaymentFailedModal("Payment status is unclear. If you made a purchase, please check your email or contact support.");
          }
        } catch (err: any) {
          console.error("PaymentStatusHandler: Error processing Razorpay result:", err);
          openPaymentFailedModal("An error occurred while processing your payment: " + err.message);
        } finally {
          sessionStorage.removeItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_NUTRITION_PLAN_ID);
          setIsLoadingStatusCheck(false);
          // Clean up URL query parameters to prevent re-processing on refresh
          const currentPath = window.location.pathname; // e.g., /nutrition
          router.replace(currentPath, { scroll: false });
        }
      };

      if (allNutritionPlans.length > 0) { // Ensure plans are loaded before trying to find one
        processPaymentResult();
      } else {
        // Wait for allNutritionPlans to be populated if this effect runs too early
        console.log("PaymentStatusHandler: Waiting for nutrition plans to load before processing payment result.");
      }

    } else if (razorpayStatus && !planIdFromQuery) {
        // Razorpay status present, but your custom ID is missing - indicates redirect URL misconfiguration on Razorpay
        setIsLoadingStatusCheck(true); // Show loading as we process this
        console.error("PaymentStatusHandler: Razorpay status received, but 'internal_plan_id' is missing from query parameters. Check Razorpay Payment Page redirect URL configuration.");
        openPaymentFailedModal("There was an issue with the payment redirect. Please ensure you were redirected from a valid payment page. Contact support if this persists.");
        sessionStorage.removeItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_NUTRITION_PLAN_ID);
        const currentPath = window.location.pathname;
        router.replace(currentPath, { scroll: false });
        setIsLoadingStatusCheck(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, allNutritionPlans, router]); // Add allNutritionPlans to dependencies

  return null; // This component does not render anything itself
}


const NutritionClientPage = () => {
  const [allNutritionPlans, setAllNutritionPlans] = useState<NutritionPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // For initial data fetch
  const [error, setError] = useState<string | null>(null); // For fetch errors
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  // State for PDF Download and Payment Status Modals
  const [isLoadingStatusCheck, setIsLoadingStatusCheck] = useState(false); // For payment status check on redirect
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<NutritionPlan | null>(null);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState<boolean>(false);
  const [isPaymentFailedModalOpen, setIsPaymentFailedModalOpen] = useState<boolean>(false);
  const [paymentFailedMessage, setPaymentFailedMessage] = useState<string>("");

  const router = useRouter();

  // Modal control functions
  const openThankYouModal = useCallback(() => { setIsThankYouModalOpen(true); }, []);
  const openPaymentFailedModal = useCallback((message: string) => { setPaymentFailedMessage(message); setIsPaymentFailedModalOpen(true); }, []);
  
  const resetPostPaymentModals = () => {
    setIsThankYouModalOpen(false); setIsPaymentFailedModalOpen(false);
    setSelectedPlanForModal(null); setPaymentFailedMessage("");
  };

  useEffect(() => {
    const fetchNutritionPlans = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/nutrition-plans`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.success) {
                setAllNutritionPlans(data.data || []);
                setAvailableCategories(data.categories || []);
            } else {
                throw new Error(data.error || "Failed to fetch nutrition plans");
            }
        } catch (err: any) {
            console.error("Fetch error:", err);
            setError(err.message || "An unknown error occurred while fetching plans.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchNutritionPlans();
  }, []);


  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);
  const handleCategoryToggle = (category: string) => setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  const clearFilters = () => setSelectedCategories([]);
  
  const filteredNutritionPlans = useMemo(() => {
    return allNutritionPlans.filter(plan =>
      (plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       plan.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategories.length === 0 || selectedCategories.includes(plan.category))
    );
  }, [allNutritionPlans, searchTerm, selectedCategories]);

  const handlePayNowClick = (plan: NutritionPlan) => {
    if (plan.razorpayPaymentLink && plan.razorpayPaymentLink.startsWith('https://pages.razorpay.com/')) {
      // Store the plan ID in session storage so we know what was purchased upon redirect
      sessionStorage.setItem(SESSION_STORAGE_KEY_PENDING_PURCHASE_NUTRITION_PLAN_ID, plan._id);
      console.log(`Redirecting to Razorpay for ${plan.title}: ${plan.razorpayPaymentLink}. Stored plan ID: ${plan._id}`);
      window.location.href = plan.razorpayPaymentLink;
    } else {
      console.error("Razorpay link is missing, invalid, or not a Razorpay Page link for this plan:", plan.title, plan.razorpayPaymentLink);
      setError(`The payment link for "${plan.title}" is not configured correctly. Please contact support.`);
    }
  };

  const handleDownloadPdf = () => {
    if (selectedPlanForModal?.pdfUrl) {
      const pdfLink = selectedPlanForModal.pdfUrl.startsWith('http') 
        ? selectedPlanForModal.pdfUrl 
        : `${API_URL}${selectedPlanForModal.pdfUrl.startsWith('/') ? '' : '/'}${selectedPlanForModal.pdfUrl}`;
      
      const link = document.createElement('a');
      link.href = pdfLink;
      link.target = "_blank";
      link.download = (selectedPlanForModal.title.replace(/[^a-z0-9_ ]/gi, '').replace(/ /g, '_') || 'nutrition_plan') + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Optionally close modal after download attempt
      // resetPostPaymentModals(); 
    } else {
        setPaymentFailedMessage("Could not initiate download. PDF link is missing or invalid for the selected plan.");
        setIsPaymentFailedModalOpen(true); // Show failed modal if PDF URL is bad
        console.error("handleDownloadPdf failed: selectedPlanForModal or its pdfUrl is missing", selectedPlanForModal);
    }
  };

  if (isLoading || isLoadingStatusCheck) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50/30">
      <Loader2 className="h-12 w-12 text-pink-500 animate-spin" />
      <p className="mt-4 text-xl text-pink-600">
        {isLoadingStatusCheck ? 'Verifying Payment...' : 'Loading Nutrition Plans...'}
      </p>
    </div>
  );
  
  if (error && !isLoading) return ( // Show fetch error if initial loading is done
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-700 p-4">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <p className="text-xl font-semibold text-center">Failed to Load Nutrition Plans</p>
        <p className="mt-2 text-center max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-6 bg-red-600 hover:bg-red-700 text-white">Try Again</Button>
    </div>
  );
  
  return (
    <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-16 w-16 animate-spin text-pink-600" /></div>
    }>
        <PaymentStatusHandler
            allNutritionPlans={allNutritionPlans}
            setSelectedPlanForModal={setSelectedPlanForModal}
            openThankYouModal={openThankYouModal}
            openPaymentFailedModal={openPaymentFailedModal}
            setIsLoadingStatusCheck={setIsLoadingStatusCheck}
        />
        <>
            <section className="bg-gray-50 py-28 md:py-28">
            <div className="container mx-auto px-4">
                <motion.h1 
                    className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6"
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    Nourish Your Body, Enhance Your Healing
                </motion.h1>
                <motion.p 
                    className="text-md md:text-lg text-center text-gray-600 mb-10 md:mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    Explore specialized nutrition plans designed to support your recovery and well-being. Each plan is crafted by experts to provide optimal nourishment.
                </motion.p>
                
                {/* Filter and Search UI */}
                <motion.div 
                    className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 p-4 bg-white rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full sm:w-auto sm:flex-grow relative">
                        <Search className="text-gray-500 mr-3 flex-shrink-0" size={20} />
                        <Input type="text" placeholder="Search by title or description..." className="bg-transparent border-none outline-none w-full h-full focus-visible:ring-0 focus-visible:ring-offset-0" value={searchTerm} onChange={handleSearchChange} />
                        {searchTerm && <Button variant="ghost" size="icon" className="p-1 h-7 w-7 absolute right-2 text-gray-500 hover:text-gray-700" onClick={() => setSearchTerm('')}><X size={18} /></Button>}
                    </div>
                    <Button variant="outline" className="gap-2 w-full sm:w-auto shrink-0 border-gray-300 hover:bg-gray-100" onClick={() => setIsFilterModalOpen(true)}>
                        <FilterIcon size={18} /> Filter {selectedCategories.length > 0 ? `(${selectedCategories.length})` : ''}
                    </Button>
                </motion.div>
                
                {/* Filter Modal Dialog */}
                <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader><DialogTitle>Filter by Category</DialogTitle><DialogDescription>Select categories to refine your plan search.</DialogDescription></DialogHeader>
                        {availableCategories.length > 0 ? (
                            <ScrollArea className="h-[200px] my-4 border rounded-md">
                                <div className="space-y-3 p-4">{availableCategories.map(cat => (
                                    <div key={cat} className="flex items-center space-x-3">
                                        <Checkbox id={`cat-${cat}`} checked={selectedCategories.includes(cat)} onCheckedChange={() => handleCategoryToggle(cat)} />
                                        <Label htmlFor={`cat-${cat}`} className="font-normal cursor-pointer text-gray-700 hover:text-gray-900">{cat}</Label>
                                    </div>))}
                                </div>
                            </ScrollArea>
                        ) : <p className="text-sm text-gray-500 my-4">No categories available for filtering at the moment.</p>}
                        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2 pt-4">
                            <Button variant="ghost" onClick={() => { clearFilters(); setIsFilterModalOpen(false); }}>Clear Filters</Button>
                            <Button onClick={() => setIsFilterModalOpen(false)}>Apply Filters</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Conditional rendering for loading/no plans states */}
                {/* This part is tricky with the main isLoading already handled above. We only show these if not in main loading/error state. */}
                {!isLoading && !error && filteredNutritionPlans.length === 0 && (
                    <p className="text-center text-gray-500 py-10 text-lg">
                        { (searchTerm || selectedCategories.length > 0) 
                            ? "No plans match your current search or filter criteria. Try adjusting your filters or search terms."
                            : "No nutrition plans are currently available. Please check back later or contact support."
                        }
                    </p>
                )}

                {/* Nutrition Plans Grid */}
                {!isLoading && !error && filteredNutritionPlans.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredNutritionPlans.map((plan, index) => (
                            <motion.div 
                                key={plan._id} 
                                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white flex flex-col" 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ duration: 0.5, delay: 0.05 * index }}>
                                <div className="relative w-full h-52 sm:h-56">
                                    <Image src={getImageUrl(plan.thumbnail)} alt={plan.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={index < 3} />
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{plan.category}</span>
                                    <h3 className="font-bold text-xl text-gray-800 mb-2 truncate" title={plan.title}>{plan.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{plan.description}</p>
                                    {plan.pages && <p className="text-xs text-gray-500 mb-3">Approximately {plan.pages} pages</p>}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                                        <span className="text-gray-900 font-bold text-2xl">₹{plan.price}</span>
                                        <Button 
                                            onClick={() => handlePayNowClick(plan)} 
                                            size="sm" 
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                            disabled={!plan.razorpayPaymentLink} // Disable if no payment link
                                        >
                                            {(!plan.razorpayPaymentLink) ? "Unavailable" : "Pay Now"}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            </section>

            {/* Thank You Modal */}
            <Dialog open={isThankYouModalOpen} onOpenChange={(isOpen) => !isOpen && resetPostPaymentModals()}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
                            <CheckCircleIcon className="h-7 w-7 text-green-600" />
                        </div>
                        <DialogTitle className="text-center text-xl">Payment Successful!</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 mt-4 text-center">
                        <p className="text-gray-600 text-sm">Your nutrition plan, "{selectedPlanForModal?.title || 'Selected Plan'}", is ready for download.</p>
                        {selectedPlanForModal && selectedPlanForModal.pdfUrl ? (
                            <Button onClick={handleDownloadPdf} className="w-full bg-pink-500 hover:bg-pink-600">
                                <Download className="mr-2 h-4 w-4" />Download: {selectedPlanForModal.title}
                            </Button>
                        ) : (
                            <p className="text-red-500 text-sm">Download link processing or unavailable. Please check your email or contact support.</p>
                        )}
                        <DialogFooter className="sm:justify-center">
                            <Button variant="outline" onClick={() => { resetPostPaymentModals(); router.replace('/nutrition', { scroll: false }); }}>Close</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Payment Failed Modal */}
            <Dialog open={isPaymentFailedModalOpen} onOpenChange={(isOpen) => !isOpen && resetPostPaymentModals()}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3">
                            <AlertTriangle className="h-7 w-7 text-red-600" />
                        </div>
                        <DialogTitle className="text-center text-xl">Payment Unsuccessful</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 mt-4 text-center">
                        <p className="text-gray-600 text-sm">{paymentFailedMessage || "An error occurred during payment. Please try again."}</p>
                        <DialogFooter className="sm:justify-center">
                            <Button variant="outline" onClick={resetPostPaymentModals}>Close</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
            
            <FooterSection />
        </>
    </Suspense>
  )
}

export default NutritionClientPage;
