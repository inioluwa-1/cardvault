"use client";

import { Plus, Send, Home, Gift, CreditCard, Utensils, Pizza, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BottomNav } from '@/components/BottomNav';

export default function AppHome() {
  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        <main className="px-5 pt-8 pb-32 h-full overflow-y-auto no-scrollbar">
          {/* Top Banner Card */}
          <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-8 shadow-sm">
            <Image 
              src="/banner-bg.jpg" 
              alt="Background texture"
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-primary-500/10 mix-blend-overlay"></div>
            
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-slate-700/70">Total Cards</span>
                <span className="text-sm font-medium text-slate-700/70">Total Value</span>
              </div>
              <div className="flex justify-between items-end w-full">
                <span className="text-4xl font-bold text-primary-600">8</span>
                <span className="text-2xl font-bold text-primary-600">₦104,000</span>
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
              <Plus className="w-5 h-5 text-primary-500" strokeWidth={2.5} />
              Add Gift Card
            </button>
            <button className="flex-1 bg-white hover:bg-slate-50 active:scale-95 transition-all py-4 rounded-2xl flex gap-2 items-center justify-center font-medium shadow-sm border border-slate-100">
              <Send className="w-5 h-5 text-primary-500" strokeWidth={2.5} />
              Send
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar px-1 pb-1">
            <button className="bg-primary-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap transition-transform active:scale-95">
              All (8)
            </button>
            <button className="bg-white text-slate-500 hover:text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap border border-slate-100 transition-transform active:scale-95">
              Available (5)
            </button>
            <button className="bg-white text-slate-500 hover:text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm whitespace-nowrap border border-slate-100 transition-transform active:scale-95">
              Used (3)
            </button>
          </div>

          {/* List */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-8">
            {[
              {
                id: 1,
                title: "Added Gift Card",
                subtitle: "Tasty Bites - Special Treat",
                amount: "+₦15,000",
                time: "2h ago",
                Icon: Utensils,
                iconBg: "bg-slate-800",
                iconColor: "text-white",
                amountColor: "text-primary-600"
              },
              {
                id: 2,
                title: "Redeemed",
                subtitle: "KFC - Weekend Delight",
                amount: "-₦10,000",
                time: "Yesterday",
                Icon: Pizza,
                iconBg: "bg-orange-100",
                iconColor: "text-orange-500",
                amountColor: "text-slate-900"
              },
              {
                id: 3,
                title: "Received",
                subtitle: "From Sarah M.",
                amount: "+₦20,000",
                time: "2 days ago",
                Icon: User,
                iconBg: "bg-pink-100",
                iconColor: "text-pink-500",
                amountColor: "text-primary-600"
              }
            ].map((card) => (
              <Link 
                key={card.id} 
                href="/details" 
                className="flex items-center justify-between py-4 border-b border-slate-50 last:border-b-0 first:pt-1 hover:bg-slate-50/50 transition-colors -mx-2 px-2 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                    <card.Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">{card.title}</h3>
                    <p className="text-[13px] text-slate-500 mt-0.5">{card.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${card.amountColor}`}>{card.amount}</div>
                  <div className="text-[12px] text-slate-400 mt-1 font-medium">{card.time}</div>
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
