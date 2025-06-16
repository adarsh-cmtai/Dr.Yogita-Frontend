"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Calendar, ChevronDown, ChevronRight } from "lucide-react"
import GoogleFormPopup from "./GoogleFormPopup"; // Path check karein (components folder mein hai?)

const POPUP_INITIAL_DELAY = 5000; // 5 seconds
const POPUP_RESHOW_DELAY = 60000; // 1 minute (60,000 ms)
const POPUP_SUBMITTED_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

export default function Navbar() {
  console.log("Navbar: Component rendering or re-rendering."); // Log 1

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8d7da' }}>
        <h1 style={{ color: '#721c24',fontSize:"100px" } }>Site is under maintenance</h1>
        <p style={{fontSize:"100px"}}>Please check back later!</p>
      </div>
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [healthInsightsOpen, setHealthInsightsOpen] = useState(false);
  const [offlineOpen, setOfflineOpen] = useState(false);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [wellnessResourcesOpen, setWellnessResourcesOpen] = useState(false);
  
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [popupCanBeShown, setPopupCanBeShown] = useState(true);

  const toggleWellnessResources = () => setWellnessResourcesOpen(!wellnessResourcesOpen);
  const toggleOffline = () => setOfflineOpen((prev) => !prev);
  const toggleOnline = () => setOnlineOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleMobileServices = () => setMobileServicesOpen(!mobileServicesOpen);
  const toggleHealthInsights = () => setHealthInsightsOpen((prev) => !prev);

  // Popup Logic Effect
  useEffect(() => {
    console.log("Navbar Popup useEffect: Running. popupCanBeShown:", popupCanBeShown); // Log 2
    if (typeof window === 'undefined') return;

    let popupTimerId: NodeJS.Timeout | undefined;

    // Phase 1: Determine if popup *can* be shown based on submission cooldown
    const lastSubmittedStr = localStorage.getItem('popupFormSubmittedTimestamp');
    if (lastSubmittedStr) {
      const lastSubmittedTime = parseInt(lastSubmittedStr, 10);
      if (Date.now() - lastSubmittedTime < POPUP_SUBMITTED_COOLDOWN) {
        console.log("Navbar Popup useEffect: Cooldown active. Setting popupCanBeShown to false."); // Log 3
        if (popupCanBeShown) setPopupCanBeShown(false); // Update state only if it's currently true
        setShowFormPopup(false); // Ensure it's visually hidden
        return; // Exit effect, no timer needed
      } else {
        console.log("Navbar Popup useEffect: Cooldown expired. Removing timestamp."); // Log 4
        localStorage.removeItem('popupFormSubmittedTimestamp');
        if (!popupCanBeShown) setPopupCanBeShown(true); // Update state if it was false
      }
    } else {
      // No submission timestamp, so popup is allowed in principle from submission perspective
      if (!popupCanBeShown) {
          console.log("Navbar Popup useEffect: No submission timestamp, ensuring popupCanBeShown is true."); // Log 5
          setPopupCanBeShown(true); // If it got stuck as false for other reasons, reset
      }
    }

    // Phase 2: If popupCanBeShown is false after Phase 1, don't schedule.
    // This check uses the LATEST value of popupCanBeShown (if state was updated above, effect will re-run)
    if (!popupCanBeShown) {
      console.log("Navbar Popup useEffect: popupCanBeShown is false, not scheduling timer."); // Log 6
      setShowFormPopup(false); // Ensure it's hidden
      return;
    }

    // Phase 3: Schedule the popup if it's allowed
    console.log("Navbar Popup useEffect: popupCanBeShown is true. Proceeding to schedule timer."); // Log 7
    const lastClosedStr = localStorage.getItem('popupLastClosedTimestamp');
    let delayUntilShow = POPUP_INITIAL_DELAY;

    if (lastClosedStr) {
      const lastClosedTime = parseInt(lastClosedStr, 10);
      const timeSinceClosed = Date.now() - lastClosedTime;

      if (timeSinceClosed < POPUP_RESHOW_DELAY) {
        delayUntilShow = POPUP_RESHOW_DELAY - timeSinceClosed;
        console.log(`Navbar Popup Timer: Recently closed. Reshowing in ${delayUntilShow / 1000}s`); // Log 8
      } else {
        delayUntilShow = 300; // Small delay if reshow time passed
        localStorage.removeItem('popupLastClosedTimestamp');
        console.log("Navbar Popup Timer: Reshow delay passed. Showing in 0.3s"); // Log 9
      }
    } else {
      console.log(`Navbar Popup Timer: Initial show. Delaying by ${delayUntilShow / 1000}s`); // Log 10
    }
    
    popupTimerId = setTimeout(() => {
      // Final check before showing, primarily for submission status again
      const stillNotSubmittedRecentlyStr = localStorage.getItem('popupFormSubmittedTimestamp');
      const stillNotSubmittedRecently = !stillNotSubmittedRecentlyStr || 
                              (Date.now() - parseInt(stillNotSubmittedRecentlyStr || "0", 10) >= POPUP_SUBMITTED_COOLDOWN);

      if(stillNotSubmittedRecently) {
          console.log("Navbar Popup Timer: Timer fired. Setting showFormPopup to true."); // Log 11
          setShowFormPopup(true);
      } else {
          console.log("Navbar Popup Timer: Timer fired BUT recently submitted (final check). Not showing."); // Log 12
          if (popupCanBeShown) setPopupCanBeShown(false); // Ensure it's set to false if this check fails
          setShowFormPopup(false);
      }
    }, delayUntilShow);

    return () => {
      if (popupTimerId) {
        console.log("Navbar Popup useEffect: Cleanup - Clearing timer ID:", popupTimerId); // Log 13
        clearTimeout(popupTimerId);
      }
    };
  }, [popupCanBeShown]); // Effect depends on popupCanBeShown


  const handleClosePopup = useCallback(() => {
    console.log("Navbar: handleClosePopup called."); // Log 14
    setShowFormPopup(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('popupLastClosedTimestamp', Date.now().toString());
    }
    // popupCanBeShown remains true. The main useEffect will re-evaluate on next interaction or if it re-runs.
  }, []);

  const handleFormSubmitted = useCallback(() => {
    console.log("Navbar: handleFormSubmitted called."); // Log 15
    if (typeof window !== 'undefined') {
      localStorage.setItem('popupFormSubmittedTimestamp', Date.now().toString());
    }
    setPopupCanBeShown(false); // This will trigger the useEffect to re-run
    setShowFormPopup(false);   // Hide popup immediately
  }, []);


  const servicesList = [
    { name: "CoreCare Physio", href: "/services/core-care", type: "offline" },
    { name: "Electrotherapy Healing", href: "/services/healing-with-electrotherapy", type: "offline" },
    { name: "Manual Therapy", href: "/services/manual-therapy-and-mobilisation", type: "offline" },
    { name: "Post-Surgery Rehab", href: "/services/post-surgery-rehabilitation", type: "offline" },
    { name: "Align & Thrive", href: "/services/align-and-thrive", type: "offline" },
    { name: "OrthoCare Physio", href: "/services/ortho-care", type: "offline" },
    { name: "Lifespan Physio", href: "/services/lifespan-pysiocare", type: "offline" },
    { name: "SheMoves Physio", href: "/services/she-moves", type: "offline" },
    { name: "PhysioConnect", href: "/services/physiotherapy", type: "online" },
    { name: "Back & Neck Pain Relief", href: "/services/back-neck-pain", type: "online" },
    { name: "Posture Correction", href: "/services/posture-correction", type: "online" },
    { name: "Workplace Wellness", href: "/services/Workplace-Wellness", type: "online" },
    { name: "Women’s Health Physio", href: "/services/women-health-therapy", type: "online" },
    { name: "Bach Flower Healing", href: "/services/holistic-healing", type: "online" },
    { name: "Home Exercise Plan", href: "/services/customize-home-exercise-plan", type: "online" },
    { name: "Stress & Posture Therapy", href: "/services/stress-and-posture-therapy", type: "online" },
  ];


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Relief Read", href: "/library" },
    { name: "Nourishwell", href: "/nutrition" },
    // { name: "Free Gift", href: "/gift" },
  ];

  console.log("Navbar: Rendering JSX. popupCanBeShown:", popupCanBeShown, "showFormPopup:", showFormPopup); // Log 16

  return (
    <> 
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4 bg-white"}`}>
        {/* ... (aapka baaki ka header JSX jaisa pehle tha) ... */}
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.png" alt="Dr. Yogita Physiotherapy" width={50} height={50} className="mr-3 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dr. Yogita</h1>
              <p className="text-xs text-pink-600">Physiotherapist & Holistic Health Expert</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-evenly space-x-2">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 ${isScrolled ? "text-gray-700 hover:text-pink-800" : "text-black hover:text-pink-800"} transition-colors rounded-md text-sm font-medium`}
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition ${isScrolled ? "text-gray-700 hover:text-pink-800" : "text-black hover:text-pink-800"}`}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
                  >
                    <div className="py-1">
                      {["online", "offline"].map((type) => (
                        <div key={type} className="group relative">
                          <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-800 cursor-pointer">
                            {type.charAt(0).toUpperCase() + type.slice(1)} Services
                            <ChevronRight className="h-4 w-4" />
                          </div>
                          <div className="absolute top-0 left-full w-56 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 z-50">
                            <div className="py-1">
                              {servicesList
                                .filter((s) => s.type === type)
                                .map((service) => (
                                  <Link
                                    key={service.name}
                                    href={service.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-800"
                                    onClick={() => setServicesDropdownOpen(false)} 
                                  >
                                    {service.name}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Health Insights Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHealthInsightsOpen(true)}
              onMouseLeave={() => setHealthInsightsOpen(false)}
            >
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition ${isScrolled ? "text-gray-700 hover:text-pink-800" : "text-black hover:text-pink-800"}`}
              >
                Health Insights
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {healthInsightsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  >
                    <div className="py-1">
                      {[
                        { name: "Blog", href: "/blog" },
                        { name: "Podcast", href: "/podcast" },
                        { name: "Programs", href: "/programs" },
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-800"
                          onClick={() => setHealthInsightsOpen(false)} 
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Explore Dropdown for Shop, Library, Nutrition */}
            <div
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                className={`flex items-center px-3 py-2 text-sm font-medium transition ${isScrolled ? "text-gray-700 hover:text-pink-800" : "text-black hover:text-pink-800"}`}
              >
                Shop 
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {exploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  >
                    <div className="py-1">
                      {[
                        { name: "Relief Read", href: "/library" },
                        { name: "Nourishwell", href: "/nutrition" },
                      ].map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-800"
                           onClick={() => setExploreOpen(false)} 
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks
              .filter((link) =>
                !["Shop", "Relief Read", "Nourishwell", "Blog", "Podcast", "Programs"].includes(link.name)
              )
              .slice(2) 
              .map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 ${isScrolled ? "text-gray-700 hover:text-pink-800" : "text-black hover:text-pink-800"} transition-colors rounded-md text-sm font-medium`}
                >
                  {link.name}
                </Link>
              ))}

            <Link
              href="/booking"
              className={`px-3 py-2 ${isScrolled ? "text-gray-700 hover:text-pink-800" : "text-black hover:text-pink-800"} transition-colors rounded-md text-sm font-medium flex items-center`}
            >
              <Calendar className="mr-1 h-4 w-4" />
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-pink-800">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t mt-2"
            >
              <div className="px-4 py-3 space-y-3">
                {navLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Services Accordion */}
                <div>
                  <button
                    onClick={toggleMobileServices}
                    className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                  >
                    <span>Services</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${mobileServicesOpen ? "rotate-90" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-1 space-y-1 border-l-2 border-pink-100"
                      >
                        {/* Offline Services */}
                        <div>
                          <button
                            onClick={toggleOffline} 
                            className="w-full flex justify-between items-center py-2 text-sm text-gray-600 rounded-md hover:text-pink-600 hover:bg-pink-50 pl-2 pr-3"
                          >
                            <span>Offline Services</span>
                            <ChevronRight className={`h-4 w-4 transition-transform ${offlineOpen ? "rotate-90" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {offlineOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-2 max-h-48 overflow-y-auto pr-1 custom-scroll space-y-1 py-1"
                              >
                                {servicesList
                                  .filter((service) => service.type === "offline")
                                  .map((service) => (
                                    <Link
                                      key={service.name}
                                      href={service.href}
                                      className="block pl-4 pr-2 py-2 text-sm text-gray-500 rounded-md hover:text-pink-600 hover:bg-pink-50"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {service.name}
                                    </Link>
                                  ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Online Services */}
                        <div>
                          <button
                            onClick={toggleOnline} 
                            className="w-full flex justify-between items-center py-2 text-sm text-gray-600 rounded-md hover:text-pink-600 hover:bg-pink-50 pl-2 pr-3"
                          >
                            <span>Online Services</span>
                            <ChevronRight className={`h-4 w-4 transition-transform ${onlineOpen ? "rotate-90" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {onlineOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-2 max-h-48 overflow-y-auto pr-1 custom-scroll space-y-1 py-1"
                              >
                                {servicesList
                                  .filter((service) => service.type === "online")
                                  .map((service) => (
                                    <Link
                                      key={service.name}
                                      href={service.href}
                                      className="block pl-4 pr-2 py-2 text-sm text-gray-500 rounded-md hover:text-pink-600 hover:bg-pink-50"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {service.name}
                                    </Link>
                                  ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Health Insights Accordion */}
                <div>
                  <button
                    onClick={toggleHealthInsights}
                    className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-pink-600 hover:bg-pink-50"
                  >
                    <span>Health Insights</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${healthInsightsOpen ? "rotate-90" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {healthInsightsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-1 space-y-1 border-l-2 border-pink-100 max-h-48 overflow-y-auto pr-1 custom-scroll py-1"
                      >
                        <Link href="/blog" className="block pl-2 pr-2 py-2 text-sm text-gray-500 rounded-md hover:text-pink-600 hover:bg-pink-50" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/podcast" className="block pl-2 pr-2 py-2 text-sm text-gray-500 rounded-md hover:text-pink-600 hover:bg-pink-50" onClick={() => setIsOpen(false)}>Podcast</Link>
                        <Link href="/programs" className="block pl-2 pr-2 py-2 text-sm text-gray-500 rounded-md hover:text-pink-600 hover:bg-pink-50" onClick={() => setIsOpen(false)}>Program</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Shop (Wellness Resources) Accordion */}
                <div>
                  <button
                    onClick={toggleWellnessResources}
                    className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-pink-600 hover:bg-pink-50"
                  >
                    <span>Shop</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${wellnessResourcesOpen ? "rotate-90" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {wellnessResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-1 space-y-1 border-l-2 border-pink-100 max-h-48 overflow-y-auto pr-1 custom-scroll py-1"
                      >
                        {[
                          { name: "Relief Read", href: "/library" },
                          { name: "Nourishwell", href: "/nutrition" },
                        ].map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="block pl-2 pr-2 py-2 text-sm text-gray-500 rounded-md hover:text-pink-600 hover:bg-pink-50"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Remaining links */}
                {navLinks
                  .filter(
                    (link) =>
                      !["Shop", "Relief Read", "Nutrition"].includes(link.name) && 
                      !["Home", "About"].includes(link.name) 
                  )
                  .map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}

                {/* Book Now CTA */}
                <Link
                  href="/booking"
                  className="block bg-pink-500 hover:bg-pink-600 text-white text-center px-4 py-3 rounded-md text-base font-medium mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar className="inline-block mr-2 h-5 w-5" />
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Render the popup */}
      {popupCanBeShown && ( 
         <GoogleFormPopup
           show={showFormPopup}
           onClose={handleClosePopup}
           onSubmitted={handleFormSubmitted}
         />
      )}
    </>
  )
}
