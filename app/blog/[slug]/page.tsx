// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import BlogPostHero from "@/components/blog/blog-post-hero";
import BlogPostContent from "@/components/blog/blog-post-content";
import BlogPostAuthor from "@/components/blog/blog-post-author";
import RelatedPosts from "@/components/blog/related-posts";
import FooterSection from "@/components/footer-section";
import type { BlogPost, DisplayBlogPost, Author, CoverImage } from "@/types/blog";

// API बेस URL को सुरक्षित रूप से प्राप्त करने के लिए हेल्पर फंक्शन
function getApiBaseUrlOrThrow(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl && process.env.NODE_ENV === 'production') {
    throw new Error("CRITICAL: NEXT_PUBLIC_API_URL एनवायरनमेंट वेरिएबल प्रोडक्शन बिल्ड में सेट नहीं है।");
  }
  return `${apiUrl || "http://localhost:5001"}/api`;
}

// API से एक ब्लॉग पोस्ट फ़ेच करने का फंक्शन
async function getBlogPostBySlugFromAPI(slug: string): Promise<BlogPost | null> {
  const API_BASE_URL = getApiBaseUrlOrThrow();
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);
    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`ब्लॉग पोस्ट स्लग "${slug}" के साथ नहीं मिला (404).`);
        return null;
      }
      const errorText = await res.text();
      console.error(`पोस्ट ${slug} फ़ेच करने में विफल। स्थिति: ${res.status}. रिस्पांस: ${errorText}`);
      throw new Error(`पोस्ट ${slug} फ़ेच करते समय API एरर: ${res.status}`);
    }
    const apiResponse = await res.json(); // API रिस्पांस को टाइप करें (अगले सुधार में)
    if (apiResponse.success && apiResponse.data) {
      return apiResponse.data as BlogPost;
    } else {
      console.warn(`पोस्ट ${slug} के लिए API रिस्पांस सफल नहीं था या डेटा गायब था। रिस्पांस:`, apiResponse);
      return null;
    }
  } catch (error) {
    console.error(`ब्लॉग पोस्ट ${slug} फ़ेच करने में एरर:`, error);
    if (error instanceof Error && error.message.startsWith("CRITICAL:")) throw error;
    throw new Error(`ब्लॉग पोस्ट ${slug} को फ़ेच करने की प्रक्रिया में बाहरी या आंतरिक एरर: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// API से स्लग लिस्ट के लिए टाइप डेफिनिशन
interface SlugItem {
  slug: string;
  // अगर API से स्लग के साथ और भी प्रॉपर्टीज आ सकती हैं, तो उन्हें यहाँ जोड़ें
  // या [key: string]: any; का उपयोग करें अगर वे अज्ञात हैं
}

interface ApiBlogSlugsResponse {
  success: boolean;
  data: SlugItem[]; // data अब SlugItem का ऐरे है
  // API रिस्पांस में अन्य फ़ील्ड्स (जैसे count, message) भी हो सकते हैं
}

// सभी ब्लॉग स्लग फ़ेच करने का फंक्शन (generateStaticParams के लिए)
async function getAllBlogSlugsFromAPI(): Promise<{ slug: string }[]> {
  const API_BASE_URL = getApiBaseUrlOrThrow();
  try {
    const res = await fetch(`${API_BASE_URL}/blogs?limit=1000&select=slug`);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`स्लग फ़ेच करने में विफल। स्थिति: ${res.status}. रिस्पांस: ${errorText}`);
      throw new Error(`स्लग फ़ेच करने में विफल। स्थिति: ${res.status}`);
    }
    // API रिस्पांस को स्पष्ट रूप से टाइप करें
    const data: ApiBlogSlugsResponse = await res.json();

    if (data.success && Array.isArray(data.data)) {
      if (data.data.length === 0) {
        console.warn("API ने सफलता का संकेत दिया लेकिन data.data ऐरे में कोई ब्लॉग स्लग नहीं मिला।");
      }
      // अब 'post' का टाइप SlugItem होगा, इसलिए post.slug मौजूद होगा
      return data.data
        .filter(post => post && typeof post.slug === 'string') // यहाँ 'post' अब SlugItem टाइप का है
        .map(post => ({ slug: post.slug })); // यहाँ भी 'post' SlugItem टाइप का है
    } else {
      console.error("API रिस्पांस से स्लग पार्स करने में विफल या API ने विफलता का संकेत दिया। रिस्पांस डेटा:", data);
      throw new Error("स्लग के लिए API रिस्पांस अपेक्षित फॉर्मेट में नहीं था या विफलता का संकेत दिया।");
    }
  } catch (error) {
    console.error("getAllBlogSlugsFromAPI में एरर:", error);
    if (error instanceof Error && error.message.startsWith("CRITICAL:")) throw error;
    throw new Error(`सभी ब्लॉग स्लग फ़ेच करने की प्रक्रिया में बाहरी या आंतरिक एरर: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// SEO के लिए मेटाडेटा जेनरेट करें
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const postData = await getBlogPostBySlugFromAPI(params.slug); // वेरिएबल का नाम बदला

  if (!postData) {
    return { title: "पोस्ट नहीं मिला" };
  }

  const getAuthorName = (authorData?: string | Author): string | undefined => {
    if (!authorData) return undefined;
    if (typeof authorData === 'string') return authorData;
    return authorData.name;
  };

  return {
    title: `${postData.metaTitle || postData.title} | डॉ. योगिता फिजियोथेरेपी ब्लॉग`,
    description: postData.metaDescription || postData.excerpt,
    openGraph: {
      title: `${postData.metaTitle || postData.title}`,
      description: postData.metaDescription || postData.excerpt,
      images: postData.coverImage?.url ? [{ url: postData.coverImage.url }] : [],
      type: 'article',
      publishedTime: postData.createdAt,
      modifiedTime: postData.updatedAt,
      authors: getAuthorName(postData.author) ? [getAuthorName(postData.author)!] : undefined,
      tags: postData.categories,
    }
  };
}

// ब्लॉग पोस्ट के लिए स्टैटिक पाथ प्री-जेनरेट करें
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  console.log("generateStaticParams: सभी ब्लॉग स्लग फ़ेच किए जा रहे हैं...");
  try {
    const slugs = await getAllBlogSlugsFromAPI();
    console.log(`generateStaticParams: ${slugs.length} स्लग पाए गए।`);
    if (slugs.length === 0) {
        console.warn("generateStaticParams: कोई स्लग नहीं मिला। कोई डायनामिक ब्लॉग पेज नहीं बनाया जाएगा।");
    }
    return slugs;
  } catch (error) {
    console.error("generateStaticParams में getAllBlogSlugsFromAPI को कॉल करते समय गंभीर एरर:", error);
    throw new Error(`generateStaticParams विफल हुआ क्योंकि स्लग फ़ेच नहीं किए जा सके: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "तारीख उपलब्ध नहीं";
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error(`तारीख "${dateString}" फॉर्मेट करने में एरर:`, e);
    return "अमान्य तारीख";
  }
};

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postData = await getBlogPostBySlugFromAPI(params.slug);

  if (!postData) {
    notFound();
  }
  
  const displayPost: DisplayBlogPost = {
    ...postData,
    date: formatDate(postData.createdAt) 
  };

  let authorDetailsForComponent: Author | { name: string } | undefined = undefined;
  if (postData.author) {
    if (typeof postData.author === 'object') {
      authorDetailsForComponent = postData.author;
    } else {
      authorDetailsForComponent = { name: postData.author };
    }
  } else {
    authorDetailsForComponent = { name: "डॉ. योगिता फिजियोथेरेपी" };
  }

  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <BlogPostHero post={displayPost} />  
      <BlogPostContent post={displayPost} /> 
      {authorDetailsForComponent && <BlogPostAuthor authorDetails={authorDetailsForComponent} />}
      <RelatedPosts currentPostSlug={params.slug} currentPostCategories={postData.categories} />
      <FooterSection />
    </main>
  );
}