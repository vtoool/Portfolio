import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectLoading() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 linear-gradient-bg pointer-events-none z-0" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full border-x border-zinc-900/50 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center">
        <Navbar />

        <div className="pt-20 pb-12 px-4 max-w-3xl mx-auto w-full">
          <div className="space-y-8 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-zinc-800 rounded-full w-24"></div>
              <div className="h-8 bg-zinc-800 rounded w-3/4"></div>
              <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
            </div>

            {/* Image skeleton */}
            <div className="mt-12 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 aspect-video relative">
              <div className="w-full h-full bg-zinc-800 animate-pulse"></div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4 mt-12">
              <div className="h-6 bg-zinc-800 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                <div className="h-4 bg-zinc-800 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}