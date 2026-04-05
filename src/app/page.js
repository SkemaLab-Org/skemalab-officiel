export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white px-4">
      <div className="w-full max-w-xl text-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4">
          Coming Soon
        </p>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)] mb-6">
          Nous arrivons bientôt
        </h1>
        <div className="inline-flex items-center justify-center gap-3 rounded-full bg-purple-600/20 px-5 py-3 text-sm font-medium text-purple-100 border border-purple-500/30">
          ✨ Préparez-vous à découvrir bientôt
        </div>
      </div>
    </div>
  );
}