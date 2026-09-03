"use client";

import { ArrowLeft, Send, MessageCircle, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiftCard } from "@/context/AppContext";

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card?: GiftCard;
}

export function ShareCardModal({ isOpen, onClose, card }: ShareCardModalProps) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const code = card ? (card.codes.find(c => !c.isClaimed && !c.isRedeemed)?.code || "NO-CODES") : "GC-8X7M-KL2P";
  const message = `Here is your ${card?.name || 'Gift'} card worth ₦${card ? card.value.toLocaleString() : '15,000'}! Use code: ${code}`;
  const encodedMessage = encodeURIComponent(message);

  const handleWhatsApp = () => window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  const handleTelegram = () => window.open(`https://t.me/share/url?url=&text=${encodedMessage}`, "_blank");
  const handleX = () => window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}`, "_blank");
  const handleInstagram = () => {
    // Instagram doesn't have a direct text share URL. Fallback to copy.
    navigator.clipboard.writeText(message);
    alert("Message copied to clipboard! You can now paste it in Instagram.");
  };

  const handleEmailShare = () => {
    if (!email.trim()) {
      alert("Please enter an email address first.");
      return;
    }
    window.location.href = `mailto:${email}?subject=Your Gift Card&body=${encodedMessage}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[#eef0f5] rounded-[32px] p-6 animate-in zoom-in-95 duration-200 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onClose} className="p-1 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h2 className="text-[17px] font-medium text-slate-900">Send Card</h2>
        </div>

        {/* Card Preview */}
        <div className="block relative w-full h-[180px] rounded-[20px] overflow-hidden shadow-xl shadow-black/10 group bg-slate-900 mb-6">
          <Image 
            src={card?.bgImage || "/burger-fries.jpg"} 
            alt="Background"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
          
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start w-full">
              {card?.logoUrl ? (
                <div className="bg-white/90 backdrop-blur-md w-8 h-8 rounded-full border border-white/10 relative overflow-hidden mt-1">
                  <Image src={card.logoUrl} alt="Logo" fill sizes="32px" className="object-cover p-1" unoptimized />
                </div>
              ) : (
                <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 mt-1">
                  <span className="text-[13px] font-medium text-white">Logo</span>
                </div>
              )}
              <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors mt-1">
                <MoreVertical className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex justify-between items-end w-full">
              <div>
                <h2 className="text-2xl font-bold text-white mb-0.5 shadow-black/50">
                  {card?.name || "Special Treat"}
                </h2>
                <div className="text-2xl font-bold" style={{ color: card?.color || "#b9a3dc" }}>
                  ₦{card ? card.value.toLocaleString() : "15,000"}
                </div>
              </div>
              <div className="text-[10px] text-white/70 font-mono tracking-wider mb-1">
                {card ? (card.codes.find(c => !c.isClaimed && !c.isRedeemed)?.code || "NO-CODES") : "GC-8X7M-KL2P"}
              </div>
            </div>
          </div>
        </div>

        {/* Share Via Email */}
        <div className="mb-6">
          <label className="block text-[15px] font-medium text-slate-900 mb-3">Share Via Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter the email address"
            className="w-full bg-white rounded-[12px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
          />
        </div>

        {/* Share via Socials */}
        <div className="mb-8">
          <label className="block text-[15px] font-medium text-slate-900 mb-4">Share via</label>
          <div className="flex justify-between items-center px-1">
            {/* WhatsApp */}
            <button onClick={handleWhatsApp} className="flex flex-col items-center gap-2 group">
              <div className="w-[52px] h-[52px] rounded-full bg-[#dcfce7] flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 text-[#22c55e]" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-medium text-slate-700">WhatsApp</span>
            </button>

            {/* Telegram */}
            <button onClick={handleTelegram} className="flex flex-col items-center gap-2 group">
              <div className="w-[52px] h-[52px] rounded-full bg-[#e0f2fe] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Send className="w-5 h-5 text-[#0284c7] -ml-1 mt-0.5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-medium text-slate-700">Telegram</span>
            </button>

            {/* Instagram */}
            <button onClick={handleInstagram} className="flex flex-col items-center gap-2 group">
              <div className="w-[52px] h-[52px] rounded-full bg-[#fce7f3] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#db2777] w-6 h-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <span className="text-[11px] font-medium text-slate-700">Instagram</span>
            </button>

            {/* X (Twitter) */}
            <button onClick={handleX} className="flex flex-col items-center gap-2 group">
              <div className="w-[52px] h-[52px] rounded-full bg-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-white"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
              </div>
              <span className="text-[11px] font-medium text-slate-700">X</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button onClick={handleEmailShare} className="w-full bg-[#694C9D] text-white font-medium rounded-[12px] py-3.5 hover:bg-[#52337a] transition-colors shadow-sm active:scale-[0.98]">
            Share
          </button>
          <Link 
            href="/vendor"
            onClick={onClose} 
            className="flex items-center justify-center w-full bg-[#cec6e0] text-[#52337a] font-medium rounded-[12px] py-3.5 hover:bg-[#c2b8d9] transition-colors shadow-sm active:scale-[0.98]"
          >
            Go Back Home
          </Link>
        </div>
        
      </div>
    </div>
  );
}
