// components/GoogleFormPopup.tsx
"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

// ================== IMPORTANT - REPLACE PLACEHOLDERS! ==================
const GOOGLE_FORM_ACTION_URL = "YOUR_GOOGLE_FORM_ACTION_URL_ENDING_IN_formResponse"; 
const NAME_FIELD_ID = "entry.YOUR_NAME_FIELD_ID";            
const EMAIL_FIELD_ID = "entry.YOUR_EMAIL_FIELD_ID";          
const PHONE_FIELD_ID = "entry.YOUR_PHONE_FIELD_ID";          
const AGE_FIELD_ID = "entry.YOUR_AGE_FIELD_ID";              
const GENDER_FIELD_ID = "entry.YOUR_GENDER_FIELD_ID";        
const CITY_FIELD_ID = "entry.YOUR_CITY_FIELD_ID";            
const CONSULTATION_MODE_FIELD_ID = "entry.YOUR_CONSULTATION_MODE_FIELD_ID"; 
const MESSAGE_FIELD_ID = "entry.YOUR_MESSAGE_FIELD_ID";      
// ========================================================================

interface GoogleFormPopupProps {
  show: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

interface FormDataState {
  [key: string]: string; 
}

const initialFormData: FormDataState = {
  [NAME_FIELD_ID]: '', [EMAIL_FIELD_ID]: '', [PHONE_FIELD_ID]: '',
  [AGE_FIELD_ID]: '', [GENDER_FIELD_ID]: '', [CITY_FIELD_ID]: '',
  [CONSULTATION_MODE_FIELD_ID]: '', [MESSAGE_FIELD_ID]: '',
};

const inputBaseClass = "w-full px-3.5 py-2.5 bg-white/80 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm placeholder-gray-500 transition-all duration-200 ease-in-out";
const labelBaseClass = "block text-sm font-semibold text-gray-800 mb-1.5";

export default function GoogleFormPopup({ show, onClose, onSubmitted }: GoogleFormPopupProps) {
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (show && submissionStatus !== 'success') {
      setFormData(initialFormData);
      setSubmissionStatus(null);
      setIsSubmitting(false);
    }
  }, [show]);

  useEffect(() => {
    if (!show) {
      const timer = setTimeout(() => {
        setSubmissionStatus(null);
      }, 300); // Reset status after the exit animation completes
      return () => clearTimeout(timer);
    }
  }, [show]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const googleFormData = new FormData();
    for (const key in formData) {
      if (formData[key]) { 
        googleFormData.append(key, formData[key]);
      }
    }
    
    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST", body: googleFormData, mode: 'no-cors', 
      });
      setSubmissionStatus('success');
      onSubmitted(); 
    } catch (error) {
      console.error('GoogleFormPopup: Form submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-100 rounded-2xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            <button
              onClick={() => { if (!isSubmitting || submissionStatus === 'success') onClose(); }}
              className="absolute top-3 right-3 text-gray-500 hover:text-pink-600 transition-colors p-2 rounded-full z-10 hover:bg-white/50"
              aria-label="Close popup"
              disabled={isSubmitting && submissionStatus !== 'success'}
            >
              <X size={24} />
            </button>

            <div className="p-6 sm:p-8 overflow-y-auto hide-scrollbar">
                {submissionStatus === 'success' ? (
                <div className="text-center py-12 px-4 flex flex-col items-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                      <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-6" strokeWidth={1.5}/>
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Thank You!</h2>
                    <p className="text-gray-600 text-base sm:text-lg mb-8">Your inquiry has been submitted. We'll be in touch shortly.</p>
                    <Button 
                      onClick={onClose}
                      className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      Close
                    </Button>
                </div>
                ) : (
                <>
                    <div className="text-center mb-6 sm:mb-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Book Your Free Consultation</h2>
                      <p className="text-sm sm:text-base text-gray-600">
                          Take the first step towards better health.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div>
                          <label htmlFor={NAME_FIELD_ID} className={labelBaseClass}>Full Name <span className="text-red-500">*</span></label>
                          <input type="text" name={NAME_FIELD_ID} id={NAME_FIELD_ID} value={formData[NAME_FIELD_ID]} onChange={handleChange} required className={inputBaseClass} placeholder="e.g., Priya Sharma"/>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label htmlFor={EMAIL_FIELD_ID} className={labelBaseClass}>Email <span className="text-red-500">*</span></label>
                            <input type="email" name={EMAIL_FIELD_ID} id={EMAIL_FIELD_ID} value={formData[EMAIL_FIELD_ID]} onChange={handleChange} required className={inputBaseClass} placeholder="you@example.com"/>
                          </div>
                          <div>
                            <label htmlFor={PHONE_FIELD_ID} className={labelBaseClass}>Phone <span className="text-red-500">*</span></label>
                            <input type="tel" name={PHONE_FIELD_ID} id={PHONE_FIELD_ID} value={formData[PHONE_FIELD_ID]} onChange={handleChange} required pattern="[0-9]{10,15}" title="Please enter a valid 10-15 digit phone number" className={inputBaseClass} placeholder="e.g., 9876543210"/>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label htmlFor={AGE_FIELD_ID} className={labelBaseClass}>Age <span className="text-red-500">*</span></label>
                            <input type="number" name={AGE_FIELD_ID} id={AGE_FIELD_ID} value={formData[AGE_FIELD_ID]} onChange={handleChange} required min="1" max="120" className={inputBaseClass} placeholder="Your Age"/>
                          </div>
                          <div>
                            <label htmlFor={CITY_FIELD_ID} className={labelBaseClass}>City <span className="text-red-500">*</span></label>
                            <input type="text" name={CITY_FIELD_ID} id={CITY_FIELD_ID} value={formData[CITY_FIELD_ID]} onChange={handleChange} required className={inputBaseClass} placeholder="e.g., Mumbai"/>
                          </div>
                      </div>
                      
                      <div>
                          <label className={labelBaseClass}>Gender <span className="text-red-500">*</span></label>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                            {['Male', 'Female', 'Other'].map(option => (
                                <label key={option} className="inline-flex items-center text-sm text-gray-700 cursor-pointer">
                                  <input type="radio" name={GENDER_FIELD_ID} value={option} checked={formData[GENDER_FIELD_ID] === option} onChange={handleChange} required className="form-radio h-4 w-4 text-pink-600 border-gray-400 focus:ring-pink-500"/>
                                  <span className="ml-2">{option}</span>
                                </label>
                            ))}
                          </div>
                      </div>

                      <div>
                          <label className={labelBaseClass}>Consultation Mode <span className="text-red-500">*</span></label>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                            {['Online', 'Offline (In-Clinic)'].map(option => (
                                <label key={option} className="inline-flex items-center text-sm text-gray-700 cursor-pointer">
                                  <input type="radio" name={CONSULTATION_MODE_FIELD_ID} value={option} checked={formData[CONSULTATION_MODE_FIELD_ID] === option} onChange={handleChange} required className="form-radio h-4 w-4 text-pink-600 border-gray-400 focus:ring-pink-500"/>
                                  <span className="ml-2">{option}</span>
                                </label>
                            ))}
                          </div>
                      </div>
                      
                      <div>
                          <label htmlFor={MESSAGE_FIELD_ID} className={labelBaseClass}>Your Health Concern <span className="text-red-500">*</span></label>
                          <textarea name={MESSAGE_FIELD_ID} id={MESSAGE_FIELD_ID} rows={4} value={formData[MESSAGE_FIELD_ID]} onChange={handleChange} required className={`${inputBaseClass} min-h-[100px]`} placeholder="Briefly describe your health concern..."></textarea>
                      </div>

                      {submissionStatus === 'error' && (
                          <div className="bg-red-100 border border-red-400 text-red-800 p-3 rounded-lg text-sm flex items-center gap-3">
                              <AlertTriangle className="h-5 w-5 shrink-0" />
                              <span>Submission failed. Please check your connection and try again.</span>
                          </div>
                      )}

                      <button 
                          type="submit" 
                          disabled={isSubmitting} 
                          className="w-full flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-rose-50 text-base"
                      >
                          {isSubmitting ? (
                          <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Submitting...
                          </>
                          ) : (
                          'Confirm & Book Session'
                          )}
                      </button>
                    </form>

                    <p className="text-xs text-gray-500 mt-6 text-center">
                      Your information is safe with us. We respect your privacy.
                    </p>
                </>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
