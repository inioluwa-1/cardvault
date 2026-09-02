"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { VendorBottomNav } from "@/components/VendorBottomNav";
import { ShareCardModal } from "@/components/ShareCardModal";
import { useState } from "react";
import { useAppContext, GiftCard } from "@/context/AppContext";

export default function VendorSendPage() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<GiftCard | undefined>(undefined);
  const { vendorCards } = useAppContext();

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        {/* Header / Search */}
        <div className="px-5 pt-12 pb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5 bg-white border border-transparent rounded-[16px] text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
              placeholder="Search Gift Card"
            />
          </div>
        </div>

        {/* Content */}
        <main className="px-5 pb-32 h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
          
          <div className="space-y-0">
            {vendorCards.length === 0 && (
              <div className="text-center text-slate-500 py-10">No cards created yet.</div>
            )}
            {/* List Items */}
            {vendorCards.map((card, index) => (
              <div key={card.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-[52px] h-[52px] rounded-[12px] overflow-hidden shrink-0 relative shadow-sm border border-slate-200/50">
                      <Image 
                        src={card.bgImage} 
                        alt={card.name} 
                        fill 
                        sizes="52px"
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <div className="text-[13px] text-slate-500 font-medium leading-none mb-1">Card</div>
                      <div className="text-[15px] text-slate-800 font-semibold leading-tight">{card.name}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCard(card);
                      setIsShareOpen(true);
                    }}
                    className="bg-[#694C9D] text-white px-5 py-2.5 rounded-[10px] font-medium text-sm hover:bg-[#52337a] transition-colors shadow-sm active:scale-95"
                  >
                    Send Card
                  </button>
                </div>
                {/* Divider (except last item) */}
                {index < vendorCards.length - 1 && <div className="h-[1px] bg-slate-200/70 w-full ml-1"></div>}
              </div>
            ))}
          </div>

        </main>

        <VendorBottomNav />
        <ShareCardModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} card={selectedCard} />
      </div>
    </div>
  );
}
