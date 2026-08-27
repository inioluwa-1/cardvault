import { CalendarPlus, Share2, Store, CheckCircle2, Gift, CreditCard, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { VendorBottomNav } from '@/components/VendorBottomNav';

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-8 pb-32 h-full overflow-y-auto no-scrollbar">
          
          {/* Top Banner Card */}
          <div className="relative w-full h-36 rounded-[24px] overflow-hidden shadow-sm mb-6 flex flex-col justify-center px-6 border border-slate-200/60 bg-gradient-to-br from-[#e6dcf3] to-[#d4c1ea]">
            <div className="relative z-10">
              <div className="text-[13px] font-medium text-slate-600 mb-1">Total Budget (Gift Cards)</div>
              <div className="text-3xl font-bold text-[#694C9D]">₦1,004,000</div>
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
                <div className="text-xl font-bold text-slate-900">1,250</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-[#694C9D]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500 font-medium mb-0.5">Shared to customers</div>
                <div className="text-xl font-bold text-slate-900">980</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Store className="w-4 h-4 text-[#694C9D]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500 font-medium mb-0.5">Redeemed Cards</div>
                <div className="text-xl font-bold text-slate-900">620</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-[20px] p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#694C9D]" />
              </div>
              <div>
                <div className="text-[12px] text-slate-500 font-medium mb-0.5">Remaining Cards</div>
                <div className="text-xl font-bold text-slate-900">360</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-4">
            <div className="flex justify-between items-center mb-4 px-1">
              <h2 className="text-lg font-semibold text-slate-800">Recent Activity</h2>
              <button className="text-[13px] font-medium text-slate-500 hover:text-slate-800 transition-colors">View All</button>
            </div>

            {/* List Item 1 */}
            <Link href="/vendor/details" className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 first:pt-2 hover:bg-slate-50 transition-colors rounded-lg px-2 -mx-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f4effa] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-[#694C9D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-[15px]">GC-8X7M-KL2P</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#528d25]"></div>
                    <p className="text-[12px] text-slate-500">Redeemed by John D.</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900 text-[15px]">₦15,000</div>
                <div className="text-[12px] text-slate-400 mt-0.5 font-medium">2m ago</div>
              </div>
            </Link>

            {/* List Item 2 */}
            <Link href="/vendor/details" className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-lg px-2 -mx-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f4effa] flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-[#694C9D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-[15px]">GC-3HRQ-WE4R</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-[12px] text-slate-500">Given to user by Mary J.</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900 text-[15px]">₦20,000</div>
                <div className="text-[12px] text-slate-400 mt-0.5 font-medium">15m ago</div>
              </div>
            </Link>

            {/* List Item 3 */}
            <Link href="/vendor/details" className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-lg px-2 -mx-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f4effa] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-[#694C9D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-[15px]">GC-7PZN-BMBT</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#528d25]"></div>
                    <p className="text-[12px] text-slate-500">Redeemed by Mike B.</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900 text-[15px]">₦10,000</div>
                <div className="text-[12px] text-slate-400 mt-0.5 font-medium">1h ago</div>
              </div>
            </Link>
            
          </div>
        </main>

        <VendorBottomNav />
      </div>
    </div>
  );
}
