"use client";

import { ArrowLeft, MoreVertical, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useAppContext, GiftCard, GiftCardCode, RedeemResult } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { ShareCardModal } from '@/components/ShareCardModal';

function GiftCardDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');
  const cardIdParam = searchParams.get('id');

  const { vendorCards, redeemCode } = useAppContext();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isRedeemPromptOpen, setIsRedeemPromptOpen] = useState(false);
  const [redeemAmountInput, setRedeemAmountInput] = useState("");
  const [redeemError, setRedeemError] = useState("");
  const [showRedeemSuccess, setShowRedeemSuccess] = useState(false);
  const [successMeta, setSuccessMeta] = useState<{
    redeemedAmount: number;
    remainingBalance: number;
    isFullyRedeemed: boolean;
  }>({
    redeemedAmount: 0,
    remainingBalance: 0,
    isFullyRedeemed: true
  });

  // Find the matching card and code
  let matchedCard: GiftCard | undefined;
  let matchedCode: GiftCardCode | undefined;

  for (const card of vendorCards) {
    if (cardIdParam && card.id === cardIdParam) {
      matchedCard = card;
      matchedCode = card.codes.find(c => c.isClaimed || c.code === codeParam) || card.codes[0];
      break;
    }
    const foundCode = card.codes.find(c => c.code === codeParam);
    if (foundCode) {
      matchedCard = card;
      matchedCode = foundCode;
      break;
    }
  }

  // Fallback if not found yet (e.g. initial demo)
  const card = matchedCard || vendorCards[0] || {
    id: "demo",
    name: "Special Treat",
    value: 15000,
    discountPrice: 13000,
    expiryDate: "31 May, 2026",
    quantity: 1,
    bgImage: "/burger-fries.jpg",
    color: "#b9a3dc",
    codes: [{ code: "GC-8X7M-KL2P", isClaimed: true, isRedeemed: false, claimedBy: "User", currentBalance: 15000 }],
    createdAt: new Date().toISOString()
  };

  const code = matchedCode || card.codes[0] || {
    code: "GC-8X7M-KL2P",
    isClaimed: true,
    isRedeemed: false,
    claimedBy: "User",
    currentBalance: 15000
  };

  const availableBalance = typeof code.currentBalance === 'number' 
    ? code.currentBalance 
    : (code.isRedeemed ? 0 : card.value);

  const isRedeemed = code.isRedeemed || availableBalance <= 0;

  const handleRedeemConfirm = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isRedeemed) return;

    const amountNum = redeemAmountInput.trim() ? Number(redeemAmountInput.trim()) : undefined;
    if (redeemAmountInput.trim() && (isNaN(Number(redeemAmountInput.trim())) || Number(redeemAmountInput.trim()) <= 0)) {
      setRedeemError("Please enter a valid positive amount.");
      return;
    }

    const result = redeemCode(code.code, amountNum);
    if (result.success) {
      setSuccessMeta({
        redeemedAmount: result.redeemedAmount || availableBalance,
        remainingBalance: result.remainingBalance ?? 0,
        isFullyRedeemed: result.isFullyRedeemed ?? true
      });
      setRedeemError("");
      setIsRedeemPromptOpen(false);
      setShowRedeemSuccess(true);
      setRedeemAmountInput("");
    } else {
      setRedeemError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="active:scale-95 transition-transform p-1 hover:bg-slate-200/50 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-xl font-medium">Gift Card Details</h1>
        </div>

        <main className="px-5 pb-32 h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Hero Card */}
          <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 shadow-md bg-slate-900">
            <Image 
              src={card.bgImage || "/burger-fries.jpg"} 
              alt={card.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
              unoptimized
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
            
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start w-full">
                {card.logoUrl ? (
                  <div className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-full border border-white/10 relative overflow-hidden">
                    <Image src={card.logoUrl} alt="Logo" fill sizes="40px" className="object-cover p-1.5" unoptimized />
                  </div>
                ) : (
                  <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <span className="text-sm font-medium text-white">{card.name}</span>
                  </div>
                )}
                <button 
                  onClick={() => setIsShareOpen(true)}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 active:scale-95 transition-transform"
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex justify-between items-end w-full">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 shadow-black/50">{card.name}</h2>
                  <div className="text-3xl font-bold" style={{ color: card.color || "#b9a3dc" }}>
                    ₦{availableBalance.toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-white/80 font-mono tracking-wider bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  {code.code}
                </div>
              </div>
            </div>
          </div>

          {/* Card Details Container */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Card Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-1 border-b border-slate-50 pb-4 text-[15px]">
                <span className="text-slate-500">Available Balance</span>
                <span className="font-bold text-[#694C9D]">₦{availableBalance.toLocaleString()}</span>
              </div>

              {availableBalance < card.value && (
                <div className="flex justify-between items-center py-1 border-b border-slate-50 pb-4 text-[15px]">
                  <span className="text-slate-500">Original Value</span>
                  <span className="font-medium text-slate-500 line-through">₦{card.value.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-1 border-b border-slate-50 pb-4 text-[15px]">
                <span className="text-slate-500">You Paid</span>
                <span className="font-semibold text-slate-900">₦{card.discountPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-slate-50 pb-4 text-[15px]">
                <span className="text-slate-500">Valid Until</span>
                <span className="font-semibold text-slate-900">{card.expiryDate || "No expiry"}</span>
              </div>
              
              <div className="flex justify-between items-center py-1 pt-1 text-[15px]">
                <span className="text-slate-500">Status</span>
                <span className={`text-[12px] font-bold px-3.5 py-1 rounded-full ${
                  isRedeemed ? "bg-orange-500 text-white" : "bg-[#34c759] text-white"
                }`}>
                  {isRedeemed ? "Fully Redeemed" : "Active"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isRedeemed ? (
              <button 
                disabled 
                className="w-full bg-slate-200 text-slate-500 font-semibold py-4 rounded-xl cursor-not-allowed text-[15px]"
              >
                Card Fully Redeemed
              </button>
            ) : (
              <button 
                onClick={() => {
                  setRedeemAmountInput("");
                  setRedeemError("");
                  setIsRedeemPromptOpen(true);
                }}
                className="w-full bg-[#694C9D] hover:bg-[#52337a] active:scale-[0.98] transition-all text-white font-semibold py-4 rounded-xl shadow-sm text-[15px]"
              >
                Redeem Now
              </button>
            )}
            
            <button 
              onClick={() => setIsShareOpen(true)}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all text-slate-700 font-semibold py-4 rounded-xl shadow-sm text-[15px]"
            >
              Send / Share
            </button>
          </div>
        </main>

        {/* Redeem Amount Modal Prompt */}
        {isRedeemPromptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-[#eef0f5] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setIsRedeemPromptOpen(false)} 
                  className="p-1 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6 text-slate-900" />
                </button>
                <h2 className="text-lg font-medium text-slate-900">Redeem Card</h2>
              </div>

              <form onSubmit={handleRedeemConfirm} className="space-y-5">
                {redeemError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{redeemError}</span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-900">Amount to Redeem (₦)</label>
                    <span className="text-xs text-[#694C9D] font-medium">
                      Available: ₦{availableBalance.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400 text-sm">₦</span>
                    <input 
                      type="number"
                      value={redeemAmountInput}
                      onChange={e => setRedeemAmountInput(e.target.value)}
                      placeholder={`Max ₦${availableBalance.toLocaleString()} (or empty for full)`}
                      className="w-full bg-white border border-transparent rounded-xl pl-9 pr-24 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setRedeemAmountInput(String(availableBalance))}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#efe8fa] hover:bg-[#e4d8f5] text-[#694C9D] text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors active:scale-95"
                    >
                      Use Max
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 px-1">
                    Enter a partial amount to spend, or leave empty to redeem the entire balance.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-[#694C9D] text-white font-medium rounded-xl py-4 hover:bg-[#52337a] transition-colors shadow-sm active:scale-[0.98]"
                  >
                    Confirm Redemption
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Redeem Success Modal */}
        {showRedeemSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-[#eef0f5] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 shadow-2xl border border-white/20 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5 mt-2">
                <CheckCircle2 className="w-10 h-10 text-green-500" strokeWidth={2.5} />
              </div>

              <h2 className="text-[22px] font-bold text-slate-900 mb-1">
                {successMeta.isFullyRedeemed ? "Fully Redeemed!" : "Redeemed Successfully!"}
              </h2>
              <p className="text-slate-600 text-[14px] mb-5">
                You redeemed <strong className="text-slate-900">₦{successMeta.redeemedAmount.toLocaleString()}</strong> from your <strong>{card.name}</strong> gift card.
              </p>

              <div className="w-full bg-white rounded-2xl p-4 mb-6 shadow-xs border border-slate-100 text-left">
                <div className="flex justify-between items-center text-sm py-2 border-b border-slate-50">
                  <span className="text-slate-500">Amount Redeemed</span>
                  <span className="font-bold text-slate-900">₦{successMeta.redeemedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 pt-2.5">
                  <span className="text-slate-500">Remaining Balance</span>
                  <span className={`font-bold ${successMeta.remainingBalance > 0 ? "text-[#694C9D]" : "text-slate-400"}`}>
                    ₦{successMeta.remainingBalance.toLocaleString()}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setShowRedeemSuccess(false)} 
                className="w-full bg-[#694C9D] text-white font-medium rounded-[16px] py-3.5 hover:bg-[#52337a] transition-colors shadow-sm active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Share Modal */}
        <ShareCardModal 
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          card={card}
        />

        <BottomNav />
      </div>
    </div>
  );
}

export default function GiftCardDetails() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center text-slate-500 font-sans">
        Loading details...
      </div>
    }>
      <GiftCardDetailsContent />
    </Suspense>
  );
}
