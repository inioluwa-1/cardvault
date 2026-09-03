"use client";

import { CalendarPlus, Share2, Store, CheckCircle2, Gift, CreditCard, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { VendorBottomNav } from '@/components/VendorBottomNav';
import { useAppContext } from '@/context/AppContext';

export default function VendorDashboard() {
  const { vendorCards } = useAppContext();

  let totalBudget = 0;
  let totalCreated = 0;
  let totalShared = 0;
  let totalRedeemed = 0;

  const allActivity: any[] = [];

  vendorCards.forEach(card => {
    totalBudget += card.value * card.quantity;
    totalCreated += card.quantity;
    
    card.codes.forEach(code => {
      if (code.isClaimed) totalShared++;
      if (code.isRedeemed) totalRedeemed++;

      if (code.isRedeemed) {
        allActivity.push({
          type: 'redeemed',
          code: code.code,
          card: card,
          user: code.claimedBy || "Unknown",
          date: new Date(code.redeemedAt || 0)
        });
      } else if (code.isClaimed) {
        allActivity.push({
          type: 'claimed',
          code: code.code,
          card: card,
          user: code.claimedBy || "Unknown",
          date: new Date(code.claimedAt || 0)
        });
      }
    });
  });

  const remainingCards = totalCreated - totalShared;

  // Sort by date descending
  allActivity.sort((a, b) => b.date.getTime() - a.date.getTime());
  const recentActivity = allActivity.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-8 pb-32 h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* Top Banner Card */}
          <div className="relative w-full h-36 rounded-[24px] overflow-hidden shadow-sm mb-6 flex flex-col justify-center px-6 border border-slate-200/60 bg-gradient-to-br from-[#e6dcf3] to-[#d4c1ea]">
            <div className="relative z-10">
              <div className="text-[13px] font-medium text-slate-600 mb-1">Total Budget (Gift Cards)</div>
              <div className="text-3xl font-bold text-[#694C9D]">₦{totalBudget.toLocaleString()}</div>
            </div>
            {/* Wavy background graphic simulation */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
              backgroundImage: 'url(/purple_wavy_bg_1787866549069.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Stat 1 */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <CalendarPlus className="w-4 h-4 text-[#694C9D]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500 font-medium mb-0.5">Created Cards</div>
                <div className="text-xl font-bold text-slate-900">{totalCreated.toLocaleString()}</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-[#694C9D]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500 font-medium mb-0.5">Shared to customers</div>
                <div className="text-xl font-bold text-slate-900">{totalShared.toLocaleString()}</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Store className="w-4 h-4 text-[#694C9D]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500 font-medium mb-0.5">Redeemed Cards</div>
                <div className="text-xl font-bold text-slate-900">{totalRedeemed.toLocaleString()}</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#694C9D]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500 font-medium mb-0.5">Remaining Cards</div>
                <div className="text-xl font-bold text-slate-900">{remainingCards.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-4">
            <div className="flex justify-between items-center mb-4 px-1">
              <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
              <Link href="/vendor/activity" className="text-[13px] font-medium text-[#694C9D] hover:text-[#52337a] transition-colors">
                View All
              </Link>
            </div>

            {recentActivity.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm">
                No activity found.
              </div>
            ) : (
              <div className="space-y-0">
                {recentActivity.map((activity, idx) => (
                  <Link href={`/vendor/details?id=${activity.card.id}`} key={idx} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 first:pt-2 hover:bg-slate-50 transition-colors rounded-lg px-2 -mx-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#f4effa] overflow-hidden flex items-center justify-center shrink-0 relative border border-slate-100">
                        {activity.card.logoUrl ? (
                          <Image 
                            src={activity.card.logoUrl} 
                            alt={activity.card.name} 
                            fill 
                            sizes="44px" 
                            unoptimized 
                            className="object-contain p-1.5" 
                          />
                        ) : activity.type === 'redeemed' ? (
                          <CreditCard className="w-5 h-5 text-[#694C9D]" />
                        ) : (
                          <Gift className="w-5 h-5 text-[#694C9D]" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-[15px]">{activity.code}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${activity.type === 'redeemed' ? 'bg-[#528d25]' : 'bg-slate-300'}`}></div>
                          <p className="text-[12px] text-slate-500">
                            {activity.type === 'redeemed' ? 'Redeemed by ' : 'Given to user by '} 
                            {activity.user}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 text-[15px]">₦{activity.card.value.toLocaleString()}</div>
                      <div className="text-[12px] text-slate-400 mt-0.5 font-medium">
                        {activity.date.toLocaleDateString()}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>

        <VendorBottomNav />
      </div>
    </div>
  );
}
