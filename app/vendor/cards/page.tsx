"use client";

import { Search, ChevronDown, MoreVertical, Check, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VendorBottomNav } from "@/components/VendorBottomNav";
import { ShareCardModal } from "@/components/ShareCardModal";
import { useState } from "react";
import { useAppContext, GiftCard } from "@/context/AppContext";

type DateFilterOption = "all" | "7days" | "30days" | "custom";

export default function VendorCardsPage() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<GiftCard | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Expired">("All");
  const [dateFilter, setDateFilter] = useState<DateFilterOption>("all");
  const [customDate, setCustomDate] = useState("");
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { vendorCards } = useAppContext();

  const filteredCards = vendorCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // Status filter
    if (statusFilter === "Expired") {
      const isExpired = card.expiryDate && card.expiryDate !== "No expiry" && new Date(card.expiryDate).getTime() < Date.now();
      if (!isExpired) return false;
    } else if (statusFilter === "Active") {
      const isExpired = card.expiryDate && card.expiryDate !== "No expiry" && new Date(card.expiryDate).getTime() < Date.now();
      if (isExpired) return false;
    }

    // Date filter
    if (dateFilter !== "all") {
      const cardTimestamp = card.createdAt ? new Date(card.createdAt).getTime() : Date.now();
      const now = Date.now();

      if (dateFilter === "7days") {
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        if (cardTimestamp < sevenDaysAgo) return false;
      } else if (dateFilter === "30days") {
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
        if (cardTimestamp < thirtyDaysAgo) return false;
      } else if (dateFilter === "custom" && customDate) {
        const cardDateStr = new Date(cardTimestamp).toISOString().split("T")[0];
        if (cardDateStr !== customDate) return false;
      }
    }

    return true;
  });

  const getDateButtonLabel = () => {
    if (dateFilter === "7days") return "7 Days";
    if (dateFilter === "30days") return "30 Days";
    if (dateFilter === "custom") return "Custom";
    return "Date";
  };

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-8 pb-32 h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Gift Card"
              className="w-full bg-white rounded-[16px] py-4 pl-12 pr-4 text-[15px] outline-none shadow-sm placeholder:text-slate-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 mb-6 w-full relative z-30">
            <button 
              onClick={() => setStatusFilter("All")}
              className={`${statusFilter === "All" ? "bg-[#694C9D] text-white" : "bg-white text-slate-600 border border-transparent hover:border-slate-200"} py-2 px-2 rounded-[10px] font-medium text-xs whitespace-nowrap shadow-sm flex-1 flex items-center justify-center transition-colors active:scale-95`}
            >
              All Status
            </button>
            <button 
              onClick={() => setStatusFilter("Active")}
              className={`${statusFilter === "Active" ? "bg-[#694C9D] text-white" : "bg-white text-slate-600 border border-transparent hover:border-slate-200"} py-2 px-2 rounded-[10px] font-medium text-xs whitespace-nowrap shadow-sm flex-1 flex items-center justify-center transition-colors active:scale-95`}
            >
              Active
            </button>
            <button 
              onClick={() => setStatusFilter("Expired")}
              className={`${statusFilter === "Expired" ? "bg-[#694C9D] text-white" : "bg-white text-slate-600 border border-transparent hover:border-slate-200"} py-2 px-2 rounded-[10px] font-medium text-xs whitespace-nowrap shadow-sm flex-1 flex items-center justify-center transition-colors active:scale-95`}
            >
              Expired
            </button>

            {/* Date Filter with Dropdown */}
            <div className="relative flex-1">
              <button 
                onClick={() => setIsDateMenuOpen(!isDateMenuOpen)}
                className={`${
                  dateFilter !== "all" 
                    ? "bg-[#694C9D] text-white" 
                    : "bg-white text-slate-600 border border-transparent hover:border-slate-200"
                } py-2 px-1.5 rounded-[10px] font-medium text-xs whitespace-nowrap shadow-sm w-full flex items-center justify-center gap-1 transition-colors active:scale-95`}
              >
                <span>{getDateButtonLabel()}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${dateFilter !== "all" ? "text-white" : "text-slate-500"} ${isDateMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isDateMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsDateMenuOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-[16px] shadow-xl border border-slate-100 p-2 z-40 animate-in fade-in zoom-in-95 duration-150 text-slate-800">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Filter by date
                    </div>

                    <button
                      onClick={() => { setDateFilter("all"); setIsDateMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium flex items-center justify-between transition-colors ${
                        dateFilter === "all" ? "bg-[#efe8fa] text-[#694C9D]" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>All Time</span>
                      {dateFilter === "all" && <Check className="w-3.5 h-3.5 text-[#694C9D]" />}
                    </button>

                    <button
                      onClick={() => { setDateFilter("7days"); setIsDateMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium flex items-center justify-between transition-colors ${
                        dateFilter === "7days" ? "bg-[#efe8fa] text-[#694C9D]" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Last 7 Days</span>
                      {dateFilter === "7days" && <Check className="w-3.5 h-3.5 text-[#694C9D]" />}
                    </button>

                    <button
                      onClick={() => { setDateFilter("30days"); setIsDateMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-[10px] text-xs font-medium flex items-center justify-between transition-colors ${
                        dateFilter === "30days" ? "bg-[#efe8fa] text-[#694C9D]" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Last 30 Days</span>
                      {dateFilter === "30days" && <Check className="w-3.5 h-3.5 text-[#694C9D]" />}
                    </button>

                    <div className="h-[1px] bg-slate-100 my-1"></div>

                    <div className="p-2">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> Custom Date
                      </label>
                      <input 
                        type="date"
                        value={customDate}
                        onChange={(e) => {
                          setCustomDate(e.target.value);
                          if (e.target.value) {
                            setDateFilter("custom");
                          } else {
                            setDateFilter("all");
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-[8px] px-2.5 py-1.5 text-xs text-slate-700 outline-none focus:border-[#694C9D]"
                      />
                      {dateFilter === "custom" && customDate && (
                        <button
                          onClick={() => {
                            setDateFilter("all");
                            setCustomDate("");
                            setIsDateMenuOpen(false);
                          }}
                          className="mt-2 text-[11px] text-[#694C9D] hover:underline font-medium block"
                        >
                          Clear custom date
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-5">
            
            {filteredCards.length === 0 && (
              <div className="text-center text-slate-500 mt-10">
                {vendorCards.length === 0 ? "No cards created yet." : "No cards match your filter."}
              </div>
            )}

            {filteredCards.map((card) => {
              const claimedCount = card.codes.filter(c => c.isClaimed).length;
              const redeemedCount = card.codes.filter(c => c.isRedeemed).length;

              return (
                <div key={card.id} className="bg-white rounded-[24px] p-4 shadow-sm border border-slate-100">
                  
                  {/* Image Preview Area */}
                  <Link href={`/vendor/details?id=${card.id}`} className="block relative w-full h-[180px] rounded-[16px] overflow-hidden group bg-slate-900 mb-5">
                    <Image 
                      src={card.bgImage || "/burger-fries.jpg"} 
                      alt="Background"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                    
                    {/* Active Badge */}
                    <div className="absolute top-4 right-4 bg-[#4ADE80] text-slate-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Active
                    </div>

                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-start w-full">
                        {card.logoUrl ? (
                           <div className="bg-white/90 backdrop-blur-md w-8 h-8 rounded-full border border-white/10 relative overflow-hidden mt-1">
                             <Image src={card.logoUrl} alt="Logo" fill sizes="32px" className="object-cover p-1" unoptimized />
                           </div>
                        ) : (
                          <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mt-1">
                            <span className="text-[13px] font-medium text-white">Logo</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-end w-full">
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-0.5 shadow-black/50">
                            {card.name}
                          </h2>
                          <div className="text-2xl font-bold" style={{ color: card.color || "#b9a3dc" }}>
                            ₦{card.value.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Stats & Actions */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-5 px-1">
                      <div>
                        <div className="text-[12px] text-slate-400 mb-0.5">Value</div>
                        <div className="text-[17px] font-semibold text-slate-900">₦{card.value.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[12px] text-slate-400 mb-0.5">Discount Price</div>
                        <div className="text-[17px] font-semibold text-slate-900">₦{card.discountPrice.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end px-1">
                      <div className="flex gap-6">
                        <div>
                          <div className="text-[12px] text-slate-400 mb-0.5">Collected</div>
                          <div className="text-[15px] font-semibold text-slate-900">{claimedCount}/{card.quantity}</div>
                        </div>
                        <div>
                          <div className="text-[12px] text-slate-400 mb-0.5">Redeemed</div>
                          <div className="text-[15px] font-semibold text-slate-900">{redeemedCount}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedCard(card);
                          setIsShareOpen(true);
                        }} 
                        className="bg-[#694C9D] text-white px-6 py-3 rounded-[12px] font-medium text-sm hover:bg-[#52337a] transition-colors shadow-sm active:scale-95"
                      >
                        Share Card
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </main>

        <VendorBottomNav />
        <ShareCardModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} card={selectedCard} />
      </div>
    </div>
  );
}
