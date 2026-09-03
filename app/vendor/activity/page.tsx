"use client";

import { ArrowLeft, Search, CreditCard, Gift, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAppContext, GiftCard } from "@/context/AppContext";
import { VendorBottomNav } from "@/components/VendorBottomNav";

interface ActivityItem {
  type: "redeemed" | "claimed";
  code: string;
  card: GiftCard;
  user: string;
  date: Date;
}

export default function VendorActivityPage() {
  const { vendorCards } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "claimed" | "redeemed">("All");

  // Collect all activities
  const allActivities: ActivityItem[] = [];
  vendorCards.forEach((card) => {
    card.codes.forEach((code) => {
      if (code.isRedeemed) {
        allActivities.push({
          type: "redeemed",
          code: code.code,
          card: card,
          user: code.claimedBy || "Unknown",
          date: new Date(code.redeemedAt || code.claimedAt || Date.now()),
        });
      } else if (code.isClaimed) {
        allActivities.push({
          type: "claimed",
          code: code.code,
          card: card,
          user: code.claimedBy || "Unknown",
          date: new Date(code.claimedAt || Date.now()),
        });
      }
    });
  });

  // Sort descending by date
  allActivities.sort((a, b) => b.date.getTime() - a.date.getTime());

  const sharedCount = allActivities.filter(a => a.type === "claimed").length;
  const redeemedCount = allActivities.filter(a => a.type === "redeemed").length;

  // Filter activities
  const filteredActivities = allActivities.filter((activity) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      activity.code.toLowerCase().includes(query) ||
      activity.user.toLowerCase().includes(query) ||
      activity.card.name.toLowerCase().includes(query);

    if (!matchesQuery) return false;

    if (activeTab === "claimed") return activity.type === "claimed";
    if (activeTab === "redeemed") return activity.type === "redeemed";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative overflow-hidden shadow-2xl sm:border-x sm:border-slate-200">
        
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/vendor" 
              className="p-1.5 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-slate-900" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Activity History</h1>
              <p className="text-xs text-slate-500">All card claims and redemptions</p>
            </div>
          </div>
          <div className="bg-[#efe8fa] text-[#694C9D] text-xs font-semibold px-3 py-1 rounded-full">
            {allActivities.length} total
          </div>
        </div>

        <main className="px-5 pt-2 pb-32 h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden no-scrollbar">
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code, card, or customer..."
              className="w-full bg-white rounded-[16px] py-4 pl-12 pr-4 text-[14px] outline-none shadow-sm placeholder:text-slate-400 border border-slate-100 focus:border-[#694C9D] transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-5 w-full">
            <button
              onClick={() => setActiveTab("All")}
              className={`py-2 px-3 rounded-[12px] font-medium text-xs whitespace-nowrap shadow-sm flex-1 flex items-center justify-center transition-colors active:scale-95 ${
                activeTab === "All" ? "bg-[#694C9D] text-white" : "bg-white text-slate-600 border border-slate-100"
              }`}
            >
              All ({allActivities.length})
            </button>
            <button
              onClick={() => setActiveTab("claimed")}
              className={`py-2 px-3 rounded-[12px] font-medium text-xs whitespace-nowrap shadow-sm flex-1 flex items-center justify-center transition-colors active:scale-95 ${
                activeTab === "claimed" ? "bg-[#694C9D] text-white" : "bg-white text-slate-600 border border-slate-100"
              }`}
            >
              Shared ({sharedCount})
            </button>
            <button
              onClick={() => setActiveTab("redeemed")}
              className={`py-2 px-3 rounded-[12px] font-medium text-xs whitespace-nowrap shadow-sm flex-1 flex items-center justify-center transition-colors active:scale-95 ${
                activeTab === "redeemed" ? "bg-[#694C9D] text-white" : "bg-white text-slate-600 border border-slate-100"
              }`}
            >
              Redeemed ({redeemedCount})
            </button>
          </div>

          {/* Activities List */}
          <div className="bg-white rounded-[24px] p-4 shadow-sm border border-slate-100">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                {searchQuery ? "No activity matching your search." : "No activities recorded yet."}
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filteredActivities.map((activity, idx) => (
                  <Link 
                    href={`/vendor/details?id=${activity.card.id}`} 
                    key={idx}
                    className="flex items-center justify-between py-3.5 hover:bg-slate-50/80 transition-colors rounded-xl px-2 -mx-2 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Logo or Icon */}
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
                        ) : activity.type === "redeemed" ? (
                          <CreditCard className="w-5 h-5 text-[#694C9D]" />
                        ) : (
                          <Gift className="w-5 h-5 text-[#694C9D]" />
                        )}
                      </div>

                      {/* Code & User info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 text-[14px] font-mono truncate">
                            {activity.code}
                          </h3>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            activity.type === "redeemed" ? "bg-green-100 text-green-700" : "bg-purple-100 text-[#694C9D]"
                          }`}>
                            {activity.type === "redeemed" ? "Redeemed" : "Claimed"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activity.type === "redeemed" ? "bg-[#528d25]" : "bg-slate-300"}`}></div>
                          <p className="text-[12px] text-slate-500 truncate">
                            {activity.type === "redeemed" ? "Redeemed by " : "Claimed by "}
                            <span className="font-medium text-slate-700">{activity.user}</span>
                            <span className="text-slate-400"> • {activity.card.name}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Amount & Date */}
                    <div className="text-right shrink-0 pl-3">
                      <div className="font-bold text-slate-900 text-[14px]">
                        ₦{activity.card.value.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
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
