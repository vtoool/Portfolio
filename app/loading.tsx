export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-4">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-zinc-400 text-sm animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}