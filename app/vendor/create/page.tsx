"use client";

import { ArrowLeft, Calendar, Download, Check, MoreVertical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";

export default function CreateGiftCard() {
  const { createCard } = useAppContext();
  const [cardName, setCardName] = useState("");
  const [value, setValue] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [createdCardId, setCreatedCardId] = useState("");
  
  // Custom logo (URL)
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Background Template
  const [bgImage, setBgImage] = useState("/burger-fries.jpg");
  const templateInputRef = useRef<HTMLInputElement>(null);

  // Predefined templates
  const templates = [
    "/burger-fries.jpg",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400", // furniture/sofa
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400", // furniture
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400", // cake
  ];

  // Text Colors (for the price highlight)
  const colors = [
    { value: "#b9a3dc", bgClass: "bg-white", borderClass: "border-[#694C9D]" }, // Default purple
    { value: "#1e293b", bgClass: "bg-slate-900", borderClass: "border-slate-200" }, // Black
    { value: "#ef4444", bgClass: "bg-red-500", borderClass: "border-red-400" }, // Red
    { value: "#facc15", bgClass: "bg-yellow-400", borderClass: "border-yellow-300" }, // Yellow
    { value: "#3b82f6", bgClass: "bg-blue-500", borderClass: "border-blue-400" }, // Blue
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBgImage(URL.createObjectURL(file));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !value || !quantity) return;

    const newId = createCard({
      name: cardName,
      value: Number(value),
      discountPrice: Number(discount || value),
      expiryDate: expiry || "No expiry",
      quantity: Number(quantity),
      bgImage: bgImage,
      logoUrl: logoUrl || undefined,
      color: selectedColor,
    });

    setCreatedCardId(newId);
    setShowSuccessPopup(true);
  };

  return (
    <div className="min-h-screen bg-[#eef0f5] text-slate-900 font-sans">
      <div className="max-w-md mx-auto bg-[#eef0f5] min-h-screen relative shadow-2xl sm:border-x sm:border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="px-5 pt-12 pb-4 flex items-center gap-3">
          <Link href="/vendor" className="p-1 hover:bg-slate-200/50 rounded-full transition-colors active:scale-95">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </Link>
          <h1 className="text-xl font-medium text-slate-900">Create Gift Card</h1>
        </div>

        {/* Scrollable Form Content */}
        <div className="px-5 pb-32 overflow-y-auto no-scrollbar flex-1">
          
          <form className="space-y-5" onSubmit={handleCreate}>
            {/* Card Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Card Name</label>
              <input 
                type="text" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Input your card name"
                className="w-full bg-white border border-transparent rounded-[16px] px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
              />
            </div>

            {/* Value & Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Value (₦)</label>
                <input 
                  type="number" 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Add value"
                  className="w-full bg-white border border-transparent rounded-[16px] px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Discounted Price (₦)</label>
                <input 
                  type="number" 
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discounted price"
                  className="w-full bg-white border border-transparent rounded-[16px] px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
                />
              </div>
            </div>

            {/* Expiry & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="DD MMM, YYYY"
                    className="w-full bg-white border border-transparent rounded-[16px] pl-4 pr-10 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
                  />
                  <Calendar className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="w-full bg-white border border-transparent rounded-[16px] px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#694C9D]/20 shadow-sm"
                />
              </div>
            </div>

            {/* Upload Logo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload your brand logo</label>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={logoInputRef}
                onChange={handleLogoUpload}
              />
              <button 
                type="button" 
                onClick={() => logoInputRef.current?.click()}
                className="w-[140px] h-[100px] bg-white border-2 border-dashed border-slate-200 rounded-[16px] flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-[#694C9D] hover:text-[#694C9D] transition-colors shadow-sm overflow-hidden relative"
              >
                {logoUrl ? (
                  <Image src={logoUrl} alt="Brand Logo" fill sizes="140px" className="object-contain p-2" />
                ) : (
                  <>
                    <Download className="w-8 h-8" strokeWidth={1.5} />
                    <span className="text-[10px] leading-tight text-center px-4 font-medium">Upload Your Brand Logo</span>
                  </>
                )}
              </button>
            </div>

            {/* Card Templates */}
            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="block text-sm font-medium text-slate-700">Card Templates</label>
                <span className="text-[12px] font-medium text-[#528d25] cursor-pointer">See All</span>
              </div>
              
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={templateInputRef}
                onChange={handleTemplateUpload}
              />
              
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {/* Upload Custom Template */}
                <button 
                  type="button" 
                  onClick={() => templateInputRef.current?.click()}
                  className="w-[75px] h-[75px] shrink-0 bg-white border-2 border-dashed border-slate-200 rounded-[12px] flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-[#694C9D] hover:text-[#694C9D] transition-colors shadow-sm"
                >
                  <Download className="w-5 h-5" strokeWidth={1.5} />
                  <span className="text-[8px] leading-tight text-center px-1 font-medium">Upload image template</span>
                </button>

                {/* Map over predefined templates */}
                {templates.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBgImage(src)}
                    className={`w-[75px] h-[75px] shrink-0 relative rounded-[12px] overflow-hidden shadow-sm transition-all ${
                      bgImage === src ? 'border-2 border-[#694C9D]' : 'border-2 border-transparent'
                    }`}
                  >
                    <Image src={src} alt="Template" fill sizes="75px" className="object-cover" />
                    {bgImage === src && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-slate-900" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Text Color</label>
              <div className="flex gap-3">
                {colors.map((color, idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-transform ${color.bgClass} ${color.borderClass} ${selectedColor === color.value ? 'scale-110 border-[2px]' : 'border'}`}
                  >
                    {selectedColor === color.value && color.value === "#b9a3dc" && (
                       <Check className="w-4 h-4 text-[#694C9D]" strokeWidth={3} />
                    )}
                    {selectedColor === color.value && color.value !== "#b9a3dc" && (
                       <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Preview</label>
              <div className="block relative w-full h-48 rounded-2xl overflow-hidden shadow-md group bg-slate-900">
                {/* Background Image */}
                <Image 
                  src={bgImage} 
                  alt="Background"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    {logoUrl ? (
                      <div className="bg-white/90 backdrop-blur-md w-10 h-10 rounded-full border border-white/10 relative overflow-hidden">
                        <Image src={logoUrl} alt="Logo" fill sizes="40px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span className="text-sm font-medium text-white">Tasty Bites</span>
                      </div>
                    )}
                    <button type="button" className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors">
                      <MoreVertical className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end w-full">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1 shadow-black/50">
                        {cardName || "Card Name"}
                      </h2>
                      <div className="text-2xl font-bold" style={{ color: selectedColor }}>
                        ₦{Number(value).toLocaleString() || "0"}
                      </div>
                    </div>
                    <div className="text-[10px] text-white/70 font-mono tracking-wider">
                      GC-8X7M-KL2P
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 w-full left-0 right-0 bg-[#eef0f5]/80 backdrop-blur-md p-5 pb-8 sm:pb-5 border-t border-slate-200/50 z-20">
          <button 
            type="submit"
            onClick={handleCreate}
            className="w-full bg-[#694C9D] text-white font-medium rounded-[16px] py-4 hover:bg-[#52337a] transition-colors shadow-lg shadow-[#694C9D]/20 active:scale-[0.98]"
          >
            Create Card
          </button>
        </div>
        
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm rounded-[24px] p-8 flex flex-col items-center justify-center text-center shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5">
                <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Card Created!</h2>
              <p className="text-sm text-slate-500 mb-8">
                Your new gift card has been generated successfully and is ready to be shared.
              </p>
              <Link 
                href={`/vendor/details?id=${createdCardId}`} 
                className="w-full bg-[#694C9D] text-white font-medium rounded-[16px] py-4 hover:bg-[#52337a] transition-colors mb-3 block"
              >
                View Card
              </Link>
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="w-full text-slate-500 font-medium py-3 hover:text-slate-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
