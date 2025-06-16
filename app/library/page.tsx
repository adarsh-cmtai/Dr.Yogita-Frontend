import LibraryClientPage from "./LibraryClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "E-Book Library | Dr. Yogita Physiotherapy",
  description: "Browse and download our collection of e-books on physiotherapy, wellness, and recovery.",
}

export default function LibraryPage() {
  return <LibraryClientPage />
}
