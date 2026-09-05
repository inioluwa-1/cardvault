"use client";

import { Plus, Send, Utensils, User, CheckCircle2, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';

export default function UserHome() {
  const { getUserCards } = useAppContext();
  const userCards = getUserCards("Favour");

  const [activeTab, setActiveTab] = useState<"All" | "Available" | "Used">("All");

  const totalValue = userCards.reduce((sum, item) => {
    if (item.code.isRedeemed) return sum;
    const bal = typeof item.code.currentBalance === 'number' ? item.code.currentBalance : item.card.value;
    return sum + bal;
  }, 0);
  const availableCount = userCards.filter(item => !item.code.isRedeemed && (typeof item.code.currentBalance !== 'number' || item.code.currentBalance > 0)).length;
  const usedCount = userCards.filter(item => item.code.isRedeemed || (typeof item.code.currentBalance === 'number' && item.code.currentBalance <= 0)).length;

  const filteredCards = userCards.filter(item => {
    const isUsed = item.code.isRedeemed || (typeof item.code.currentBalance === 'number' && item.code.currentBalance <= 0);
    if (activeTab === "Available") return !isUsed;
    if (activeTab === "Used") return isUsed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-8 pb-32 h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Top Banner Card */}
          <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-8 shadow-sm bg-slate-900">
            <Image 
              src="/banner-bg.jpg" 
              alt="Background texture"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover opacity-60 grayscale-[0.2]"
              priority
            />
            <div className="absolute inset-0 bg-[#694C9D]/60 mix-blend-overlay"></div>
            
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-white/80">Total Cards</span>
                <span className="text-sm font-medium text-white/80">Total Value</span>
              </div>
              <div className="flex justify-between items-end w-full">
                <span className="text-4xl font-bold text-white">{userCards.length}</span>
                <span className="text-2xl font-bold text-white">₦{totalValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Quick Actions</h2>
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => window.dispatchEvent(new Event('open-add-modal'))}
              className="flex-1 bg-white hover:bg-slate-50 active:scale-95 transition-all py-4 rounded-2xl flex gap-2 items-center justify-center font-medium shadow-sm border border-slate-100"
            >
              <Plus className="w-5 h-5 text-[#694C9D]" strokeWidth={2.5} />
              Add Gift Card
            </button>
            <Link href="/gift-cards" className="flex-1 bg-white hover:bg-slate-50 active:scale-95 transition-all py-4 rounded-2xl flex gap-2 items-center justify-center font-medium shadow-sm border border-slate-100">
              <Search className="w-5 h-5 text-[#694C9D]" strokeWidth={2.5} />
              View All
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar px-1 pb-1">
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

          {/* List */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-8">
            <h3 className="text-sm font-semibold text-slate-500 mb-4 px-1">Recent Activity</h3>
            
            {filteredCards.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm">
                No activity found.
              </div>
            ) : (
              <div className="space-y-0">
                {filteredCards.map(({ card, code }, idx) => (
                  <div key={idx}>
                    <Link 
                      href={`/details?code=${code.code}`}
                      className="flex items-center justify-between py-3 hover:bg-slate-50/80 transition-colors rounded-xl px-2 -mx-2 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 relative bg-slate-50 border border-slate-200/60 flex items-center justify-center shadow-xs">
                          {card.logoUrl ? (
                            <Image 
                              src={card.logoUrl} 
                              alt={card.name} 
                              fill 
                              sizes="48px" 
                              unoptimized 
                              className="object-contain p-2" 
                            />
                          ) : card.bgImage ? (
                            <Image 
                              src={card.bgImage} 
                              alt={card.name} 
                              fill 
                              sizes="48px" 
                              unoptimized 
                              className="object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                              <Utensils className="w-5 h-5 text-white" />
                            </div>
                          )}
                          {code.isRedeemed && (
                            <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                              <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-slate-800 group-hover:text-[#694C9D] transition-colors">
                            {code.isRedeemed 
                              ? 'Fully Redeemed' 
                              : (code.redeemedAmount && code.redeemedAmount > 0)
                                ? 'Partially Redeemed'
                                : 'Added Gift Card'}
                          </div>
                          <div className="text-[12px] text-slate-500 leading-tight">
                            {card.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[15px] font-bold ${code.isRedeemed ? 'text-slate-900' : 'text-[#694C9D]'}`}>
                          {code.isRedeemed 
                            ? `-₦${(code.redeemedAmount || card.value).toLocaleString()}` 
                            : `₦${(typeof code.currentBalance === 'number' ? code.currentBalance : card.value).toLocaleString()}`}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {code.isRedeemed && code.redeemedAt 
                            ? new Date(code.redeemedAt).toLocaleDateString()
                            : (typeof code.currentBalance === 'number' && code.currentBalance < card.value)
                              ? `₦${code.currentBalance.toLocaleString()} left`
                              : code.claimedAt 
                                ? new Date(code.claimedAt).toLocaleDateString()
                                : 'Just now'}
                        </div>
                      </div>
                    </Link>
                    {idx < filteredCards.length - 1 && (
                      <div className="h-[1px] bg-slate-100 ml-14"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <BottomNav />
      </div>
    </div>
  );
}
