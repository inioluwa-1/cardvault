"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 20h14v-9H5v9z" />
    <path d="M5 11l4-7h6l4 7" />
    <path d="M12 20v-3" />
    <path d="M5 11h14" />
  </svg>
);

const CardsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="10" height="14" rx="1" transform="rotate(-20 8 13)" />
    <rect x="11" y="6" width="10" height="14" rx="1" transform="rotate(20 16 13)" />
    <rect x="7" y="4" width="10" height="14" rx="1" fill="white" />
    <path d="M12 8.5l1.5 2.5-1.5 2.5-1.5-2.5 1.5-2.5z" fill="#694C9D" stroke="none" />
    <circle cx="6" cy="11" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="18" cy="11" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);

const ReportsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 21c1.5 0 3 1 5 1s4.5-1 6-1V5a2 2 0 0 0-2-2H10L6 7v14z" fill="white" />
    <path d="M10 3v4H6" />
    <path d="M9 10h5" />
    <path d="M9 13h4" />
    <path d="M9 16h6" />
    <path d="M5 19c1.5 0 3 1 5 1s4.5-1 6-1" />
    <path d="M4 17c1.5 0 3 1 5 1s4.5-1 6-1" />
  </svg>
);

export function VendorBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 z-30">
      {/* FAB button */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
        <Link 
          href="/vendor/create"
          className="w-[56px] h-[56px] bg-[#694C9D] rounded-full flex items-center justify-center text-white shadow-[0_8px_20px_rgba(105,76,157,0.4)] hover:scale-105 active:scale-95 transition-transform border-[4px] border-[#eef0f5]"
        >
          <Plus className="w-6 h-6" strokeWidth={3} />
        </Link>
      </div>
      
      <div className="bg-white rounded-t-[32px] px-8 py-5 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.04)] pb-8 sm:pb-6 relative z-0">
        <Link href="/vendor" className={`flex flex-col items-center gap-2 transition-opacity w-16 ${pathname === "/vendor" ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
          <HomeIcon className={`w-7 h-7 ${pathname === "/vendor" ? "text-[#101828]" : "text-[#101828]"}`} />
          <span className={`text-[13px] font-serif ${pathname === "/vendor" ? "text-[#7a839e]" : "text-[#9ca3af]"}`}>Home</span>
        </Link>
        
        <Link href="/vendor/cards" className={`flex flex-col items-center gap-2 transition-opacity w-16 ${pathname === "/vendor/cards" ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
          <CardsIcon className={`w-7 h-7 ${pathname === "/vendor/cards" ? "text-[#101828]" : "text-[#101828]"}`} />
          <span className={`text-[13px] font-serif ${pathname === "/vendor/cards" ? "text-[#7a839e]" : "text-[#9ca3af]"}`}>My cards</span>
        </Link>

        <Link href="/vendor/reports" className={`flex flex-col items-center gap-2 transition-opacity w-16 ${pathname === "/vendor/reports" ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
          <ReportsIcon className={`w-7 h-7 ${pathname === "/vendor/reports" ? "text-[#101828]" : "text-[#101828]"}`} />
          <span className={`text-[13px] font-serif ${pathname === "/vendor/reports" ? "text-[#7a839e]" : "text-[#9ca3af]"}`}>Reports</span>
        </Link>
      </div>
    </div>
  );
}
