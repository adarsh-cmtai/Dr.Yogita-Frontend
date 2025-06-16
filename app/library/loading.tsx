export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading Library...</h2>
        <p className="text-gray-500">Please wait while we fetch our e-books collection</p>
      </div>
    </div>
  )
}
