"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; // सुनिश्चित करें कि यह इम्पोर्टेड है
import { Button } from "@/components/ui/button"; // सुनिश्चित करें कि यह इम्पोर्टेड है
import { Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
// BlogPost टाइप की जगह Author और CoverImage को सीधे इम्पोर्ट करें अगर सिर्फ वही चाहिए
import type { Author, CoverImage } from "@/types/blog"; 

interface BlogPostAuthorProps {
  // authorDetails का टाइप Author, string, या undefined हो सकता है,
  // जो BlogPost['author'] से आता है (string | Author | undefined)
  authorDetails?: string | Author; 
}

export default function BlogPostAuthor({ authorDetails }: BlogPostAuthorProps) {
  // authorDetails के आधार पर वेरिएबल्स को सुरक्षित रूप से निकालें
  let authorName: string = "Dr. Yogita Physiotherapy"; // डिफ़ॉल्ट नाम
  let authorBio: string | undefined = "Dr. Yogita brings over 23 years of experience..."; // डिफ़ॉल्ट बायो
  let authorAvatarUrl: string = "/dr-yogita-headshot.png"; // डिफ़ॉल्ट अवतार
  let socialLinks: Author['socialLinks'] | null = null; // Author टाइप से socialLinks का टाइप लें

  if (typeof authorDetails === 'string') {
    authorName = authorDetails;
    // अगर authorDetails सिर्फ स्ट्रिंग है, तो बायो, अवतार और सोशल लिंक्स डिफ़ॉल्ट रहेंगे
  } else if (authorDetails) { // अगर authorDetails एक ऑब्जेक्ट (Author टाइप) है
    authorName = authorDetails.name || authorName; // अगर नाम नहीं है तो डिफ़ॉल्ट
    authorBio = authorDetails.bio || authorBio;
    authorAvatarUrl = authorDetails.avatar?.url || authorAvatarUrl;
    socialLinks = authorDetails.socialLinks || null;
  }

  return (
    <section className="py-12 bg-rose-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <Card className="border-pink-100 overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-gradient-to-br from-pink-100 to-blue-50 p-6 flex items-center justify-center">
                    <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <Image 
                        src={authorAvatarUrl} // placeholder-avatar.png की जरूरत नहीं अगर authorAvatarUrl में डिफ़ॉल्ट है
                        alt={authorName} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 128px, 144px" // बेहतर sizes प्रॉप
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 md:p-8">
                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2">{authorName}</h3>
                    <p className="text-pink-500 font-medium mb-4">Physiotherapist & Wellness Expert</p> {/* यह भी डायनामिक हो सकता है */}
                    {authorBio && <p className="text-gray-600 mb-4 text-sm">{authorBio}</p>}
                    
                    {(socialLinks?.instagram || socialLinks?.facebook || socialLinks?.linkedin) && (
                      <div className="flex items-center space-x-3 mt-4">
                        {socialLinks.instagram && (
                          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${authorName} on Instagram`}>
                            <Button variant="outline" size="icon" className="rounded-full border-pink-200 hover:bg-pink-50 transition-colors">
                              <Instagram className="h-4 w-4 text-pink-500" />
                            </Button>
                          </a>
                        )}
                        {socialLinks.facebook && (
                          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${authorName} on Facebook`}>
                            <Button variant="outline" size="icon" className="rounded-full border-pink-200 hover:bg-pink-50 transition-colors">
                              <Facebook className="h-4 w-4 text-pink-500" />
                            </Button>
                          </a>
                        )}
                        {socialLinks.linkedin && (
                          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${authorName} on LinkedIn`}>
                            <Button variant="outline" size="icon" className="rounded-full border-pink-200 hover:bg-pink-50 transition-colors">
                              <Linkedin className="h-4 w-4 text-pink-500" />
                            </Button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}