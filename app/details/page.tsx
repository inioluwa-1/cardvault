import { Plus, Home, Gift, CreditCard, ArrowLeft, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';

export default function GiftCardDetails() {
  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center gap-4">
          <Link href="/" className="active:scale-95 transition-transform p-1">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </Link>
          <h1 className="text-xl font-medium">Gift Card Details</h1>
        </div>

        <main className="px-5 pb-32 h-full overflow-y-auto no-scrollbar">
          {/* Hero Card */}
          <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 shadow-md">
            <Image 
              src="/burger-fries.jpg" 
              alt="Tasty Bites"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
            
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start w-full">
                <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-sm font-medium text-white">Tasty Bites</span>
                </div>
                <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex justify-between items-end w-full">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 shadow-black/50">Special Treat</h2>
                  <div className="text-3xl font-bold text-[#b9a3dc]">₦15,000</div>
                </div>
                <div className="text-xs text-white/70 font-mono tracking-wider">
                  GC-8X7M-KL2P
                </div>
              </div>
            </div>
          </div>

          {/* Card Details Container */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Card Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-1 border-b border-slate-50/50 pb-4">
                <span className="text-slate-500">Card Value</span>
                <span className="font-semibold text-slate-900">₦15,000</span>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-slate-50/50 pb-4">
                <span className="text-slate-500">You Paid</span>
                <span className="font-semibold text-slate-900">₦13,000</span>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-slate-50/50 pb-4">
                <span className="text-slate-500">Valid Until</span>
                <span className="font-semibold text-slate-900">31 May, 2026</span>
              </div>
              
              <div className="flex justify-between items-center py-1 pt-1">
                <span className="text-slate-500">Status</span>
                <span className="bg-[#34c759] text-white text-[13px] font-bold px-4 py-1.5 rounded-full">Active</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full bg-[#694C9D] hover:bg-[#52337a] active:scale-[0.98] transition-all text-white font-semibold py-4 rounded-xl shadow-sm">
              Redeem Now
            </button>
            <button className="w-full bg-transparent border border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all text-slate-700 font-semibold py-4 rounded-xl shadow-sm">
              Send / Sell
            </button>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
