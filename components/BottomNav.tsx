"use client";

import { Home, Gift, CreditCard, Plus, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppContext, GiftCard } from "@/context/AppContext";

export function BottomNav() {
  const pathname = usePathname();
  const { claimCode, redeemCode } = useAppContext();
  
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  // Add Card State
  const [addCodeStr, setAddCodeStr] = useState("");
  const [addName, setAddName] = useState("");
  const [addError, setAddError] = useState("");
  const [isAddSuccessOpen, setIsAddSuccessOpen] = useState(false);
  const [claimedCard, setClaimedCard] = useState<GiftCard | null>(null);

  // Redeem Card State
  const [redeemCodeStr, setRedeemCodeStr] = useState("");
  const [redeemError, setRedeemError] = useState("");
  const [isRedeemSuccessOpen, setIsRedeemSuccessOpen] = useState(false);
  const [redeemedCard, setRedeemedCard] = useState<GiftCard | null>(null);

  useEffect(() => {
    const handleOpenAdd = () => setIsAddOpen(true);
    window.addEventListener('open-add-modal', handleOpenAdd);
    return () => window.removeEventListener('open-add-modal', handleOpenAdd);
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) {
      setAddError("Please enter your name.");
      return;
    }
    if (!addCodeStr.trim()) {
      setAddError("Please enter a gift card number to proceed.");
      return;
    }
    
    const result = claimCode(addCodeStr.trim(), addName);
    if (result.success && result.card) {
      setClaimedCard(result.card);
      setAddError("");
      setIsAddOpen(false);
      setIsAddSuccessOpen(true);
      setAddCodeStr("");
    } else {
      setAddError(result.message);
    }
  };

  const handleRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemCodeStr.trim()) {
      setRedeemError("Please enter a gift card number to proceed.");
      return;
    }
    
    const result = redeemCode(redeemCodeStr.trim());
    if (result.success && result.card) {
      setRedeemedCard(result.card);
      setRedeemError("");
      setIsRedeemOpen(false);
      setIsRedeemSuccessOpen(true);
      setRedeemCodeStr("");
    } else {
      setRedeemError(result.message);
    }
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 z-30">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
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
          <button onClick={() => setIsRedeemOpen(true)} className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity w-16">
            <Gift className="w-6 h-6 text-slate-500" strokeWidth={1.5} />
            <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap text-center">Redeem Card</span>
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

            <form className="space-y-5" onSubmit={handleRedeemSubmit}>
              {redeemError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{redeemError}</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Gift Card Number</label>
                <textarea 
                  value={redeemCodeStr}
                  onChange={e => setRedeemCodeStr(e.target.value)}
                  placeholder="Enter the gift card number you want to redeem"
                  rows={3}
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm resize-none font-mono"
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

            <form className="space-y-5" onSubmit={handleAddSubmit}>
              {addError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{addError}</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={addName}
                  onChange={e => setAddName(e.target.value)}
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Gift Card Number</label>
                <textarea 
                  value={addCodeStr}
                  onChange={e => setAddCodeStr(e.target.value)}
                  placeholder="Enter your secure Gift Card number"
                  rows={3}
                  className="w-full bg-white border border-transparent rounded-xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm resize-none font-mono"
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

      {/* Add Success Modal Overlay */}
      {isAddSuccessOpen && claimedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#eef0f5] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 shadow-2xl border border-white/20 flex flex-col items-center">
            
            <div className="mb-2 mt-2">
              <img 
                src="https://res.cloudinary.com/de3ryzm92/image/upload/v1788287726/Screenshot_2026-09-01_193405-removebg-preview_imgiff.png" 
                alt="Success Icon" 
                className="w-24 h-24 object-contain"
              />
            </div>

            <h2 className="text-[22px] font-bold text-slate-900 mb-2">Code Verified!</h2>
            <p className="text-slate-600 text-[15px] mb-6 text-center">
              You have <span className="font-semibold text-slate-900">₦{(claimedCard.value - claimedCard.discountPrice).toLocaleString()}</span> discount on your order.
            </p>

            <div className="w-full bg-slate-100/60 rounded-[20px] p-5 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative bg-slate-200">
                  <Image src={claimedCard.bgImage} alt={claimedCard.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="text-[13px] text-slate-500 font-medium">Card</div>
                  <div className="text-[15px] text-slate-900 font-semibold leading-tight">{claimedCard.name}</div>
                </div>
              </div>

              <div className="h-[1px] bg-slate-200/60 w-full mb-5"></div>

              <div className="space-y-3.5 mb-5">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-slate-600">Your Name</span>
                  <span className="text-slate-900 font-medium">{addName}</span>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-slate-600">Original Value</span>
                  <span className="text-slate-900 font-medium">₦{claimedCard.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-slate-600">You Paid</span>
                  <span className="text-slate-900 font-medium">₦{claimedCard.discountPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="h-[1px] border-t border-dashed border-slate-300 w-full mb-4"></div>

              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#059669] font-medium">Discount</span>
                <span className="text-[#059669] font-semibold">₦{(claimedCard.value - claimedCard.discountPrice).toLocaleString()}</span>
              </div>
            </div>

            <button onClick={() => setIsAddSuccessOpen(false)} className="w-full bg-[#694C9D] text-white font-medium rounded-[16px] py-4 hover:bg-[#52337a] transition-colors shadow-sm active:scale-[0.98]">
              Go Back Home
            </button>
            
          </div>
        </div>
      )}

      {/* Redeem Success Modal Overlay */}
      {isRedeemSuccessOpen && redeemedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#eef0f5] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 shadow-2xl border border-white/20 flex flex-col items-center">
            
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mt-2">
              <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={2.5} />
            </div>

            <h2 className="text-[22px] font-bold text-slate-900 mb-2">Congratulations!</h2>
            <p className="text-slate-600 text-[15px] mb-6 text-center">
              You have successfully redeemed your <strong>{redeemedCard.name}</strong> gift card.
            </p>

            <button onClick={() => setIsRedeemSuccessOpen(false)} className="w-full bg-[#694C9D] text-white font-medium rounded-[16px] py-4 hover:bg-[#52337a] transition-colors shadow-sm active:scale-[0.98]">
              Close
            </button>
            
          </div>
        </div>
      )}
    </>
  );
}
