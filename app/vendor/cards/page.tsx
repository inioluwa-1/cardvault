"use client";

import { Search, ChevronDown, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VendorBottomNav } from "@/components/VendorBottomNav";

export default function VendorCardsPage() {
  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-8 pb-32 h-full overflow-y-auto no-scrollbar">
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Gift Card"
              className="w-full bg-white rounded-[16px] py-4 pl-12 pr-4 text-[15px] outline-none shadow-sm placeholder:text-slate-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
            <button className="bg-[#694C9D] text-white px-5 py-2.5 rounded-[12px] font-medium text-sm whitespace-nowrap shadow-sm">
              All Status
            </button>
            <button className="bg-white text-slate-600 px-5 py-2.5 rounded-[12px] font-medium text-sm whitespace-nowrap shadow-sm border border-transparent hover:border-slate-200 transition-colors">
              Active
            </button>
            <button className="bg-white text-slate-600 px-5 py-2.5 rounded-[12px] font-medium text-sm whitespace-nowrap shadow-sm border border-transparent hover:border-slate-200 transition-colors">
              Expired
            </button>
            <button className="bg-white text-slate-600 px-4 py-2.5 rounded-[12px] font-medium text-sm whitespace-nowrap shadow-sm border border-transparent hover:border-slate-200 transition-colors flex items-center gap-1">
              Date <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-5">
            
            {/* Card Item 1 */}
            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-slate-100">
              
              {/* Image Preview Area */}
              <Link href="/vendor/details" className="block relative w-full h-[180px] rounded-[16px] overflow-hidden group bg-slate-900 mb-5">
                <Image 
                  src="/burger-fries.jpg" 
                  alt="Background"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                
                {/* Active Badge */}
                <div className="absolute top-4 right-4 bg-[#4ADE80] text-slate-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Active
                </div>

                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mt-1">
                      <span className="text-[13px] font-medium text-white">Tasty Bites</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end w-full">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-0.5 shadow-black/50">
                        Special Treat
                      </h2>
                      <div className="text-2xl font-bold text-[#b9a3dc]">
                        ₦15,000
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
                    <div className="text-[17px] font-semibold text-slate-900">₦15,000</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-slate-400 mb-0.5">Discount Price</div>
                    <div className="text-[17px] font-semibold text-slate-900">₦13,000</div>
                  </div>
                </div>

                <div className="flex justify-between items-end px-1">
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[12px] text-slate-400 mb-0.5">Collected</div>
                      <div className="text-[15px] font-semibold text-slate-900">80/100</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-slate-400 mb-0.5">Redeemed</div>
                      <div className="text-[15px] font-semibold text-slate-900">52</div>
                    </div>
                  </div>
                  <button className="bg-[#694C9D] text-white px-6 py-3 rounded-[12px] font-medium text-sm hover:bg-[#52337a] transition-colors shadow-sm active:scale-95">
                    Share Card
                  </button>
                </div>
              </div>

            </div>

            {/* Card Item 2 */}
            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-slate-100">
              
              {/* Image Preview Area */}
              <Link href="/vendor/details" className="block relative w-full h-[180px] rounded-[16px] overflow-hidden group bg-slate-900 mb-5">
                <Image 
                  src="/burger-fries.jpg" 
                  alt="Background"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                
                {/* Active Badge */}
                <div className="absolute top-4 right-4 bg-[#4ADE80] text-slate-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Active
                </div>

                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mt-1">
                      <span className="text-[13px] font-medium text-white">Tasty Bites</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end w-full">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-0.5 shadow-black/50">
                        Special Treat
                      </h2>
                      <div className="text-2xl font-bold text-[#b9a3dc]">
                        ₦15,000
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
                    <div className="text-[17px] font-semibold text-slate-900">₦15,000</div>
                  </div>
                  <div>
                    <div className="text-[12px] text-slate-400 mb-0.5">Discount Price</div>
                    <div className="text-[17px] font-semibold text-slate-900">₦13,000</div>
                  </div>
                </div>

                <div className="flex justify-between items-end px-1">
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[12px] text-slate-400 mb-0.5">Collected</div>
                      <div className="text-[15px] font-semibold text-slate-900">80/100</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-slate-400 mb-0.5">Redeemed</div>
                      <div className="text-[15px] font-semibold text-slate-900">52</div>
                    </div>
                  </div>
                  <button className="bg-[#694C9D] text-white px-6 py-3 rounded-[12px] font-medium text-sm hover:bg-[#52337a] transition-colors shadow-sm active:scale-95">
                    Share Card
                  </button>
                </div>
              </div>

            </div>
            
          </div>
        </main>

        <VendorBottomNav />
      </div>
    </div>
  );
}
