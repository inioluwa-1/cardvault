import { Plus, Home, Gift, CreditCard, Search, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-12 pb-32 h-full overflow-y-auto no-scrollbar">
          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search Gift Card" 
              className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 shadow-sm transition-all"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-1">
            <button className="bg-[#694C9D] text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap transition-transform active:scale-95">
              All (8)
            </button>
            <button className="bg-white text-slate-500 hover:text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap border border-slate-100 transition-transform active:scale-95">
              Available (5)
            </button>
            <button className="bg-white text-slate-500 hover:text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap border border-slate-100 transition-transform active:scale-95">
              Used (3)
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {/* Card 1 */}
            <Link href="/details" className="block relative w-full h-48 rounded-2xl overflow-hidden shadow-md group">
              <Image 
                src="/burger-fries.jpg" 
                alt="Tasty Bites"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
              
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start w-full">
                  <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <span className="text-sm font-medium text-white">Tasty Bites</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors">
                    <MoreVertical className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end w-full">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1 shadow-black/50">Special Treat</h2>
                    <div className="text-2xl font-bold text-[#b9a3dc]">₦15,000</div>
                  </div>
                  <div className="text-[10px] text-white/70 font-mono tracking-wider">
                    GC-8X7M-KL2P
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/details" className="block relative w-full h-48 rounded-2xl overflow-hidden shadow-md group">
              <Image 
                src="/burger-fries.jpg" 
                alt="Tasty Bites"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
              
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start w-full">
                  <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <span className="text-sm font-medium text-white">Tasty Bites</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors">
                    <MoreVertical className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end w-full">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1 shadow-black/50">Special Treat</h2>
                    <div className="text-2xl font-bold text-[#b9a3dc]">₦15,000</div>
                  </div>
                  <div className="text-[10px] text-white/70 font-mono tracking-wider">
                    GC-8X7M-KL2P
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
