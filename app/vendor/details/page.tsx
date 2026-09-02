"use client";

import { ArrowLeft, Check, Copy, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppContext, GiftCard } from "@/context/AppContext";
import { ShareCardModal } from "@/components/ShareCardModal";

function VendorCardDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { vendorCards } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<"Overview" | "Codes" | "Redemptions">("Overview");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const card = vendorCards.find(c => c.id === id);

  if (!card) {
    return (
      <div className="min-h-screen bg-[#eef0f5] flex items-center justify-center">
        <div className="text-slate-500">Card not found</div>
      </div>
    );
  }

  const claimedCount = card.codes.filter(c => c.isClaimed).length;
  const redeemedCount = card.codes.filter(c => c.isRedeemed).length;
  const remainingCount = card.quantity - claimedCount;
  const totalValue = card.quantity * card.value;

  const redeemedCodes = card.codes.filter(c => c.isRedeemed);
  
  const filteredRedemptions = redeemedCodes.filter(c => {
    const term = searchQuery.toLowerCase();
    const nameMatch = c.claimedBy?.toLowerCase().includes(term);
    const codeMatch = c.code.toLowerCase().includes(term);
    return nameMatch || codeMatch;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative shadow-2xl sm:border-x sm:border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="px-5 pt-12 pb-2 flex items-center gap-3">
          <Link href="/vendor/cards" className="p-1 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </Link>
          <h1 className="text-xl font-medium text-slate-900">Card Details</h1>
        </div>

        {/* Scrollable Content */}
        <div className="px-5 pb-32 overflow-y-auto no-scrollbar flex-1">
          
          {/* Title & Status */}
          <div className="flex justify-between items-center mt-4 mb-6">
            <h2 className="text-2xl font-medium text-slate-900">{card.name}</h2>
            <div className="bg-[#4ADE80] text-slate-900 text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm shadow-green-500/20">
              Active
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
            {(["Overview", "Codes", "Redemptions"] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap shadow-sm transition-transform active:scale-95 ${
                  activeTab === tab 
                    ? "bg-[#694C9D] text-white shadow-[#694C9D]/30" 
                    : "bg-white text-slate-500 hover:border-slate-200 border border-transparent"
                }`}
              >
                {tab} {tab === "Codes" && `(${card.quantity})`} {tab === "Redemptions" && `(${redeemedCount})`}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "Overview" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Quick Stats Row */}
              <div className="flex justify-between gap-3 mb-6">
                <div className="bg-[#e4e1e8] rounded-xl flex-1 flex flex-col items-center justify-center py-3 shadow-inner">
                  <span className="text-[11px] text-slate-600 mb-0.5">Redeemed</span>
                  <span className="text-xl font-semibold text-slate-900">{redeemedCount}</span>
                </div>
                <div className="bg-[#e4e1e8] rounded-xl flex-1 flex flex-col items-center justify-center py-3 shadow-inner">
                  <span className="text-[11px] text-slate-600 mb-0.5">Given to Users</span>
                  <span className="text-xl font-semibold text-slate-900">{claimedCount}</span>
                </div>
                <div className="bg-[#e4e1e8] rounded-xl flex-1 flex flex-col items-center justify-center py-3 shadow-inner">
                  <span className="text-[11px] text-slate-600 mb-0.5">Remaining</span>
                  <span className="text-xl font-semibold text-slate-900">{remainingCount}</span>
                </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-[16px] p-4 shadow-sm">
                  <div className="text-[12px] text-slate-500 mb-1">Value</div>
                  <div className="text-[17px] font-semibold text-slate-900">₦{card.value.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-[16px] p-4 shadow-sm">
                  <div className="text-[12px] text-slate-500 mb-1">Discount Price</div>
                  <div className="text-[17px] font-semibold text-slate-900">₦{card.discountPrice.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-[16px] p-4 shadow-sm">
                  <div className="text-[12px] text-slate-500 mb-1">Created</div>
                  <div className="text-[15px] font-semibold text-slate-900">{new Date(card.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="bg-white rounded-[16px] p-4 shadow-sm">
                  <div className="text-[12px] text-slate-500 mb-1">Expiry Date</div>
                  <div className="text-[15px] font-semibold text-slate-900">{card.expiryDate}</div>
                </div>
              </div>

              {/* Budget */}
              <div className="bg-white rounded-[16px] p-4 shadow-sm mb-6">
                <div className="text-[12px] text-slate-500 mb-1">Budget (Total Value)</div>
                <div className="text-xl font-semibold text-slate-900">₦{totalValue.toLocaleString()}</div>
              </div>

              {/* Card Preview */}
              <div className="block relative w-full h-[220px] rounded-[20px] overflow-hidden shadow-xl shadow-black/10 group bg-slate-900 mt-2">
                <Image 
                  src={card.bgImage} 
                  alt="Background"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    {card.logoUrl ? (
                      <div className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-full border border-white/10 relative overflow-hidden mt-1">
                        <Image src={card.logoUrl} alt="Logo" fill sizes="40px" className="object-cover p-1.5" />
                      </div>
                    ) : (
                      <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span className="text-sm font-medium text-white">Logo</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-end w-full">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1 shadow-black/50">
                        {card.name}
                      </h2>
                      <div className="text-2xl font-bold" style={{ color: card.color || "#b9a3dc" }}>
                        ₦{card.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Codes" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-3">
              {card.codes.map((c, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-slate-100">
                  <div>
                    <div className="font-mono font-medium text-slate-800 text-[15px] mb-1">{c.code}</div>
                    <div className="text-[12px] font-medium flex items-center gap-1.5">
                      {c.isRedeemed ? (
                        <><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-green-600">Redeemed</span></>
                      ) : c.isClaimed ? (
                        <><span className="w-2 h-2 rounded-full bg-blue-500"></span><span className="text-blue-600">Claimed</span></>
                      ) : (
                        <><span className="w-2 h-2 rounded-full bg-slate-300"></span><span className="text-slate-500">Available</span></>
                      )}
                    </div>
                  </div>
                  <button onClick={() => handleCopy(c.code)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#694C9D] hover:bg-[#efe8fa] transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Redemptions" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="relative mb-4">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name or code..."
                  className="w-full bg-white rounded-[16px] py-4 pl-12 pr-4 text-[15px] outline-none shadow-sm placeholder:text-slate-400 border border-slate-200/60 focus:border-[#694C9D]"
                />
              </div>

              {filteredRedemptions.length === 0 ? (
                <div className="text-center py-10 text-slate-500 bg-white rounded-[16px] border border-slate-100">
                  {searchQuery ? "No redemptions found matching your search." : "No codes have been redeemed yet."}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredRedemptions.map((c, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-slate-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                      <div className="pl-2">
                        <div className="font-semibold text-slate-800 text-[15px] mb-0.5">{c.claimedBy}</div>
                        <div className="font-mono text-slate-500 text-[12px]">{c.code}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {c.redeemedAt ? new Date(c.redeemedAt).toLocaleDateString() : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 w-full left-0 right-0 bg-[#eef0f5]/80 backdrop-blur-md p-5 pb-8 sm:pb-5 border-t border-slate-200/50 z-20">
          <button onClick={() => setIsShareOpen(true)} className="w-full bg-[#694C9D] text-white font-medium rounded-[16px] py-4 hover:bg-[#52337a] transition-colors shadow-lg shadow-[#694C9D]/20 active:scale-[0.98]">
            Share Card
          </button>
        </div>
        
        <ShareCardModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} card={card} />
      </div>
    </div>
  );
}

export default function VendorCardDetails() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#eef0f5] flex items-center justify-center"><div className="text-slate-500">Loading...</div></div>}>
      <VendorCardDetailsContent />
    </Suspense>
  );
}
