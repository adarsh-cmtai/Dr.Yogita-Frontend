"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Calendar, ChevronDown, ChevronRight } from "lucide-react"
import GoogleFormPopup from "./GoogleFormPopup";

const POPUP_INITIAL_DELAY = 5000;
const POPUP_RESHOW_DELAY = 60000;
const POPUP_SUBMITTED_COOLDOWN = 24 * 60 * 60 * 1000;

export default function Navbar() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8d7da' }}>
        <h1 style={{ color: '#721c24', fontSize: "100px" }}>Site is under maintenance</h1>
        <p style={{ fontSize: "100px" }}>Please check back later!</p>
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let popupTimerId;

    const lastSubmittedStr = localStorage.getItem('popupFormSubmittedTimestamp');
    if (lastSubmittedStr) {
      const lastSubmittedTime = parseInt(lastSubmittedStr, 10);
      if (Date.now() - lastSubmittedTime < POPUP_SUBMITTED_COOLDOWN) {
        if (popupCanBeShown) setPopupCanBeShown(false);
        setShowFormPopup(false);
        return;
      } else {
        localStorage.removeItem('popupFormSubmittedTimestamp');
        if (!popupCanBeShown) setPopupCanBeShown(true);
      }
    } else {
      if (!popupCanBeShown) {
          setPopupCanBeShown(true);
      }
    }

    if (!popupCanBeShown) {
      setShowFormPopup(false);
      return;
    }

    const lastClosedStr = localStorage.getItem('popupLastClosedTimestamp');
    let delayUntilShow = POPUP_INITIAL_DELAY;

    if (lastClosedStr) {
      const lastClosedTime = parseInt(lastClosedStr, 10);
      const timeSinceClosed = Date.now() - lastClosedTime;

      if (timeSinceClosed < POPUP_RESHOW_DELAY) {
        delayUntilShow = POPUP_RESHOW_DELAY - timeSinceClosed;
      } else {
        delayUntilShow = 300;
        localStorage.removeItem('popupLastClosedTimestamp');
      }
    }
    
    popupTimerId = setTimeout(() => {
      const stillNotSubmittedRecentlyStr = localStorage.getItem('popupFormSubmittedTimestamp');
      const stillNotSubmittedRecently = !stillNotSubmittedRecentlyStr || 
                              (Date.now() - parseInt(stillNotSubmittedRecentlyStr || "0", 10) >= POPUP_SUBMITTED_COOLDOWN);

      if(stillNotSubmittedRecently) {
          setShowFormPopup(true);
      } else {
          if (popupCanBeShown) setPopupCanBeShown(false);
          setShowFormPopup(false);
      }
    }, delayUntilShow);

    return () => {
      if (popupTimerId) {
        clearTimeout(popupTimerId);
      }
    };
  }, [popupCanBeShown]);

  const handleClosePopup = useCallback(() => {
    setShowFormPopup(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('popupLastClosedTimestamp', Date.now().toString());
    }
  }, []);

  const handleFormSubmitted = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('popupFormSubmittedTimestamp', Date.now().toString());
    }
    setPopupCanBeShown(false);
    setShowFormPopup(false);
  }, []);

  const servicesList = [
    { name: "CoreCare Physio", href: "/services/core-care", type: "Clinic" },
    { name: "Electrotherapy Healing", href: "/services/healing-with-electrotherapy", type: "Clinic" },
    { name: "Manual Therapy", href: "/services/manual-therapy-and-mobilisation", type: "Clinic" },
    { name: "Post-Surgery Rehab", href: "/services/post-surgery-rehabilitation", type: "Clinic" },
    { name: "Align & Thrive", href: "/services/align-and-thrive", type: "Clinic" },
    { name: "OrthoCare Physio", href: "/services/ortho-care", type: "Clinic" },
    { name: "Lifespan Physio", href: "/services/lifespan-pysiocare", type: "Clinic" },
    { name: "SheMoves Physio", href: "/services/she-moves", type: "Clinic" },
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
    // { name: "Nourishwell", href: "/nutrition" },
  ];

  return (
    <> 
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4 bg-white"}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.png" alt="Dr. Yogita Physiotherapy" width={50} height={50} className="mr-3 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dr. Yogita</h1>
              <p className="text-xs text-pink-600">Physiotherapist & Holistic Health Expert</p>
            </div>
          </Link>

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
                      {["online", "Clinic"].map((type) => (
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

          <button onClick={toggleMenu} className="md:hidden text-gray-700 hover:text-pink-800">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
                        <div>
                          <button
                            onClick={toggleOffline} 
                            className="w-full flex justify-between items-center py-2 text-sm text-gray-600 rounded-md hover:text-pink-600 hover:bg-pink-50 pl-2 pr-3"
                          >
                            <span>Clinic Services</span>
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
                                  .filter((service) => service.type === "Clinic")
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
