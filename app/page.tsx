"use client";

import { Plus, Send, Utensils, User, CheckCircle2, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';

export default function AppHome() {
  const { getUserCards } = useAppContext();
  const userCards = getUserCards("Favour");

  const [activeTab, setActiveTab] = useState<"All" | "Available" | "Used">("All");

  const totalValue = userCards.reduce((sum, item) => sum + item.card.value, 0);
  const availableCount = userCards.filter(item => !item.code.isRedeemed).length;
  const usedCount = userCards.filter(item => item.code.isRedeemed).length;

  const filteredCards = userCards.filter(item => {
    if (activeTab === "Available") return !item.code.isRedeemed;
    if (activeTab === "Used") return item.code.isRedeemed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-8 pb-32 h-full overflow-y-auto no-scrollbar">
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
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          code.isRedeemed ? 'bg-orange-100' : 'bg-slate-800'
                        }`}>
                          {code.isRedeemed ? (
                             <CheckCircle2 className="w-5 h-5 text-orange-500" />
                          ) : (
                             <Utensils className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-slate-800">
                            {code.isRedeemed ? 'Redeemed' : 'Added Gift Card'}
                          </div>
                          <div className="text-[12px] text-slate-500 leading-tight">
                            {card.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[15px] font-bold ${code.isRedeemed ? 'text-slate-900' : 'text-[#694C9D]'}`}>
                          {code.isRedeemed ? '-' : '+'}₦{card.value.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {code.isRedeemed && code.redeemedAt 
                            ? new Date(code.redeemedAt).toLocaleDateString()
                            : code.claimedAt 
                              ? new Date(code.claimedAt).toLocaleDateString()
                              : 'Just now'}
                        </div>
                      </div>
                    </div>
                    {idx < filteredCards.length - 1 && (
                      <div className="h-[1px] bg-slate-100 w-full ml-14"></div>
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
