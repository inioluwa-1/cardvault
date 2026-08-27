"use client";

import { Home, Gift, CreditCard, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const handleOpenAdd = () => setIsAddOpen(true);
    window.addEventListener('open-add-modal', handleOpenAdd);
    return () => window.removeEventListener('open-add-modal', handleOpenAdd);
  }, []);

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 z-30">
        {/* FAB button */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
          <button 
            onClick={() => setIsAddOpen(true)}
            className="w-[56px] h-[56px] bg-[#694C9D] rounded-full flex items-center justify-center text-white shadow-[0_8px_20px_rgba(105,76,157,0.4)] hover:scale-105 active:scale-95 transition-transform border-[4px] border-[#eef0f5]"
          >
            <Plus className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
        
        <div className="bg-white rounded-t-[32px] px-8 py-5 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.04)] pb-8 sm:pb-6 relative z-0">
          <Link href="/" className={`flex flex-col items-center gap-1.5 transition-opacity w-16 ${pathname === "/" ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
            <Home className={`w-6 h-6 ${pathname === "/" ? "text-slate-800" : "text-slate-500"}`} strokeWidth={1.5} />
            <span className={`text-[11px] font-medium ${pathname === "/" ? "text-slate-600" : "text-slate-500"}`}>Home</span>
          </Link>
          <button onClick={() => setIsRedeemOpen(true)} className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity w-20 pr-4">
            <Gift className="w-6 h-6 text-slate-500" strokeWidth={1.5} />
            <span className="text-[11px] font-medium text-slate-500">Redeem Card</span>
          </button>
          <Link href="/gift-cards" className={`flex flex-col items-center gap-1.5 transition-opacity w-16 pl-2 ${pathname === "/gift-cards" ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
            <CreditCard className={`w-6 h-6 ${pathname === "/gift-cards" ? "text-slate-800" : "text-slate-500"}`} strokeWidth={1.5} />
            <span className={`text-[11px] font-medium ${pathname === "/gift-cards" ? "text-slate-800" : "text-slate-500"}`}>Gift-Cards</span>
          </Link>
        </div>
      </div>

      {/* Redeem Modal Overlay */}
      {isRedeemOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#eef0f5] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => setIsRedeemOpen(false)} className="p-1 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95">
                <ArrowLeft className="w-6 h-6 text-slate-900" />
              </button>
              <h2 className="text-lg font-medium text-slate-900">Redeem Card</h2>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsRedeemOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Your Name</label>
                <input 
                  type="text" 
                  defaultValue="Favour"
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Gift Card Number</label>
                <textarea 
                  placeholder="Enter the gift card number you want to redeem"
                  rows={3}
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#694C9D] text-white font-medium rounded-xl py-4 hover:bg-[#52337a] transition-colors shadow-sm active:scale-[0.98]">
                  Redeem Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Card Modal Overlay */}
      {isAddOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#eef0f5] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => setIsAddOpen(false)} className="p-1 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95">
                <ArrowLeft className="w-6 h-6 text-slate-900" />
              </button>
              <h2 className="text-lg font-medium text-slate-900">Add Card</h2>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsAddOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Gift Card Number</label>
                <textarea 
                  placeholder="Enter your secure Gift Card number"
                  rows={3}
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm resize-none"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#694C9D] text-white font-medium rounded-xl py-4 hover:bg-[#52337a] transition-colors shadow-sm active:scale-[0.98]">
                  Add to your Cards
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
