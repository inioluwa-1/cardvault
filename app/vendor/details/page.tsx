"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VendorCardDetails() {
  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative shadow-2xl sm:border-x sm:border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="px-5 pt-12 pb-2 flex items-center gap-3">
          <Link href="/vendor/create" className="p-1 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </Link>
          <h1 className="text-xl font-medium text-slate-900">Card Details</h1>
        </div>

        {/* Scrollable Content */}
        <div className="px-5 pb-32 overflow-y-auto no-scrollbar flex-1">
          
          {/* Title & Status */}
          <div className="flex justify-between items-center mt-4 mb-6">
            <h2 className="text-2xl font-medium text-slate-900">Card: Special Treat</h2>
            <div className="bg-[#4ADE80] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm shadow-green-500/20">
              Active
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
            <button className="bg-[#694C9D] text-white px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap shadow-sm shadow-[#694C9D]/30 transition-transform active:scale-95">
              Overview
            </button>
            <button className="bg-white text-slate-500 px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap shadow-sm border border-transparent hover:border-slate-200 transition-colors">
              Codes (100)
            </button>
            <button className="bg-white text-slate-500 px-5 py-2 rounded-lg font-medium text-sm whitespace-nowrap shadow-sm border border-transparent hover:border-slate-200 transition-colors">
              Redemptions (52)
            </button>
          </div>

          {/* Quick Stats Row */}
          <div className="flex justify-between gap-3 mb-6">
            <div className="bg-[#e4e1e8] rounded-xl flex-1 flex flex-col items-center justify-center py-3 shadow-inner">
              <span className="text-[11px] text-slate-600 mb-0.5">Redeemed</span>
              <span className="text-xl font-semibold text-slate-900">52</span>
            </div>
            <div className="bg-[#e4e1e8] rounded-xl flex-1 flex flex-col items-center justify-center py-3 shadow-inner">
              <span className="text-[11px] text-slate-600 mb-0.5">Given to Users</span>
              <span className="text-xl font-semibold text-slate-900">80</span>
            </div>
            <div className="bg-[#e4e1e8] rounded-xl flex-1 flex flex-col items-center justify-center py-3 shadow-inner">
              <span className="text-[11px] text-slate-600 mb-0.5">Remaining</span>
              <span className="text-xl font-semibold text-slate-900">38</span>
            </div>
          </div>

          {/* Detailed Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-[16px] p-4 shadow-sm">
              <div className="text-[12px] text-slate-500 mb-1">Value</div>
              <div className="text-[17px] font-semibold text-slate-900">₦15,000</div>
            </div>
            <div className="bg-white rounded-[16px] p-4 shadow-sm">
              <div className="text-[12px] text-slate-500 mb-1">Discount Price</div>
              <div className="text-[17px] font-semibold text-slate-900">₦13,000</div>
            </div>
            <div className="bg-white rounded-[16px] p-4 shadow-sm">
              <div className="text-[12px] text-slate-500 mb-1">Created</div>
              <div className="text-[15px] font-semibold text-slate-900">10 May, 2026</div>
            </div>
            <div className="bg-white rounded-[16px] p-4 shadow-sm">
              <div className="text-[12px] text-slate-500 mb-1">Expiry Date</div>
              <div className="text-[15px] font-semibold text-slate-900">31 May, 2026</div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white rounded-[16px] p-4 shadow-sm mb-6">
            <div className="text-[12px] text-slate-500 mb-1">Budget</div>
            <div className="text-xl font-semibold text-slate-900">₦1,040,000</div>
          </div>

          {/* Card Preview */}
          <div className="block relative w-full h-[220px] rounded-[20px] overflow-hidden shadow-xl shadow-black/10 group bg-slate-900 mt-2">
            <Image 
              src="/burger-fries.jpg" 
              alt="Background"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
            
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
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
                  <h2 className="text-3xl font-bold text-white mb-1 shadow-black/50">
                    Special Treat
                  </h2>
                  <div className="text-2xl font-bold text-[#b9a3dc]">
                    ₦15,000
                  </div>
                </div>
                <div className="text-[11px] text-white/70 font-mono tracking-wider">
                  GC-8X7M-KL2P
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 w-full left-0 right-0 bg-[#eef0f5]/80 backdrop-blur-md p-5 pb-8 sm:pb-5 border-t border-slate-200/50 z-20">
          <button className="w-full bg-[#694C9D] text-white font-medium rounded-[16px] py-4 hover:bg-[#52337a] transition-colors shadow-lg shadow-[#694C9D]/20 active:scale-[0.98]">
            Share Card
          </button>
        </div>
        
      </div>
    </div>
  );
}
