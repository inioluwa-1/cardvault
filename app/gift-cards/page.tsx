"use client";

import { Search, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';

export default function GiftCardsPage() {
  const { getUserCards } = useAppContext();
  const userCards = getUserCards("Favour");
  
  const [activeTab, setActiveTab] = useState<"All" | "Available" | "Used">("All");

  const isCardUsed = (item: { card: any; code: any }) => 
    item.code.isRedeemed || (typeof item.code.currentBalance === 'number' && item.code.currentBalance <= 0);

  const filteredCards = userCards.filter(item => {
    const isUsed = isCardUsed(item);
    if (activeTab === "Available") return !isUsed;
    if (activeTab === "Used") return isUsed;
    return true;
  });

  const availableCount = userCards.filter(item => !isCardUsed(item)).length;
  const usedCount = userCards.filter(item => isCardUsed(item)).length;

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-12 pb-32 h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search Gift Card" 
              className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-1">
            {(["All", "Available", "Used"] as const).map(tab => {
              const count = tab === "All" ? userCards.length : tab === "Available" ? availableCount : usedCount;
              return (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap transition-transform active:scale-95 ${
                    activeTab === tab 
                      ? "bg-[#694C9D] text-white" 
                      : "bg-white text-slate-500 hover:text-slate-700 border border-slate-100"
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredCards.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                You have no {activeTab !== "All" ? activeTab.toLowerCase() : ""} gift cards.
              </div>
            )}
            
            {filteredCards.map(({ card, code }, idx) => (
              <Link 
                href={`/details?code=${code.code}`}
                key={idx} 
                className={`block relative w-full h-48 rounded-2xl overflow-hidden shadow-md group ${code.isRedeemed ? 'opacity-60 grayscale-[0.5]' : ''} active:scale-[0.99] transition-transform`}
              >
                <Image 
                  src={card.bgImage || "/burger-fries.jpg"} 
                  alt={card.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                
                {code.isRedeemed && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 backdrop-blur-[1px]">
                    <div className="bg-white/90 text-slate-900 font-bold px-4 py-2 rounded-lg rotate-12 shadow-xl border border-white">
                      REDEEMED
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 p-4 flex flex-col justify-between z-0">
                  <div className="flex justify-between items-start w-full">
                    {card.logoUrl ? (
                      <div className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-full border border-white/10 relative overflow-hidden">
                        <Image src={card.logoUrl} alt="Logo" fill sizes="40px" className="object-cover p-1.5" unoptimized />
                      </div>
                    ) : (
                      <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span className="text-sm font-medium text-white">Logo</span>
                      </div>
                    )}
                    <button 
                      type="button"
                      onClick={(e) => e.preventDefault()}
                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end w-full">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1 shadow-black/50">{card.name}</h2>
                      <div className="text-2xl font-bold" style={{ color: card.color || "#b9a3dc" }}>
                        ₦{(typeof code.currentBalance === 'number' ? code.currentBalance : card.value).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-[10px] text-white/70 font-mono tracking-wider">
                      {code.code}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </main>
        
        <BottomNav />
      </div>
    </div>
  );
}
