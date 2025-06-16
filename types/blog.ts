// src/types/blog.ts

export interface CoverImage {
  url: string;
  public_id?: string; // If you store this from Cloudinary
}

// Author टाइप BlogPost.author से बनाया गया
export interface Author {
  name: string;
  bio?: string;
  avatar?: CoverImage;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string; // Full HTML or Markdown content
  excerpt: string;
  coverImage: CoverImage; // यह अब Non-nullable है, आपके दिए गए टाइप के अनुसार
  categories: string[];
  author?: string | Author; // Can be simple string or complex object
  isFeatured?: boolean;
  status?: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  readingTime?: string;
  createdAt: string; // ISO Date string from backend (e.g., from timestamps: true)
  updatedAt: string; // ISO Date string
}

// यह नया टाइप है जिसे हम चाइल्ड कंपोनेंट्स में इस्तेमाल करेंगे
export interface DisplayBlogPost extends BlogPost {
  date: string; // फॉर्मेट की हुई तारीख (जैसे "June 1, 2025")
}