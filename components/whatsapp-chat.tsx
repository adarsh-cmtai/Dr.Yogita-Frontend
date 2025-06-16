"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import Image from "next/image"

interface WhatsAppChatProps {
  phoneNumber?: string
  defaultMessage?: string
}

const WhatsAppChat: React.FC<WhatsAppChatProps> = ({
  phoneNumber = "919876543210", // Replace with actual phone number
  defaultMessage = "Hello, I'd like to inquire about physiotherapy services.",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(defaultMessage)
  const [isLoading, setIsLoading] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleOpenChat = () => {
    setIsOpen(true)
  }

  const handleCloseChat = () => {
    setIsOpen(false)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    setIsLoading(true)

    // Simulate loading for demo purposes
    setTimeout(() => {
      // Open WhatsApp with the message
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      setIsLoading(false)
      setMessage(defaultMessage)
      setIsOpen(false)
    }, 1000)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Add event listener for custom event
    const handleCustomOpenChat = () => {
      setIsOpen(true)
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Add event listener for custom event
    document.addEventListener("openWhatsAppChat", handleCustomOpenChat)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("openWhatsAppChat", handleCustomOpenChat)
    }
  }, [isOpen])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  // Focus textarea when chat opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        onClick={handleOpenChat}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6 fill-white" />}
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-green-500 p-4 flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white mr-3">
                <Image src="/dr-yogita-headshot.png" alt="Dr. Yogita" fill className="object-cover" sizes="40px" />
              </div>
              <div className="text-white">
                <h3 className="font-semibold">Dr. Yogita</h3>
                <p className="text-xs text-white/80">Online | Typically replies within minutes</p>
              </div>
              <button className="ml-auto text-white hover:bg-white/10 p-1 rounded-full" onClick={handleCloseChat}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-gray-50">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-4 border-l-4 border-green-500">
                <p className="text-gray-700 text-sm">
                  Hi there! 👋 I'm Dr. Yogita's virtual assistant. How can we help you today? Feel free to type your
                  message below.
                </p>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end">
                <textarea
                  ref={textareaRef}
                  className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none min-h-[80px] max-h-[120px] text-sm"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                ></textarea>
                <button
                  className={`ml-2 bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center ${
                    !message.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                  }`}
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by WhatsApp. Messages will be sent directly to Dr. Yogita's team.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppChat
