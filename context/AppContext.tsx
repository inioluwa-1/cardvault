"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface GiftCardCode {
  code: string;
  isClaimed: boolean;
  claimedBy: string | null;
  claimedAt: string | null;
  isRedeemed: boolean;
  redeemedAt: string | null;
  currentBalance?: number;
  redeemedAmount?: number;
}

export interface GiftCard {
  id: string;
  name: string;
  value: number;
  discountPrice: number;
  expiryDate: string;
  quantity: number;
  bgImage: string;
  logoUrl?: string;
  color?: string;
  codes: GiftCardCode[];
  createdAt: string;
}

export interface RedeemResult {
  success: boolean;
  message: string;
  card?: GiftCard;
  code?: GiftCardCode;
  redeemedAmount?: number;
  remainingBalance?: number;
  isFullyRedeemed?: boolean;
}

interface AppContextType {
  vendorCards: GiftCard[];
  createCard: (card: Omit<GiftCard, "id" | "codes" | "createdAt">) => string;
  claimCode: (codeStr: string, userName: string) => { success: boolean; message: string; card?: GiftCard };
  redeemCode: (codeStr: string, amount?: number) => RedeemResult;
  getUserCards: (userName: string) => { card: GiftCard; code: GiftCardCode }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = (len: number) => Array.from({ length: len }).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  return `GC-${segment(4)}-${segment(4)}`;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [vendorCards, setVendorCards] = useState<GiftCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cardvault_cards") || localStorage.getItem("valutex_cards");
    if (stored) {
      try {
        const parsed: GiftCard[] = JSON.parse(stored);
        // Clean any expired blob URLs from older sessions
        const cleaned = parsed.map(c => ({
          ...c,
          bgImage: c.bgImage && c.bgImage.startsWith("blob:") ? "/burger-fries.jpg" : (c.bgImage || "/burger-fries.jpg"),
          logoUrl: c.logoUrl && c.logoUrl.startsWith("blob:") ? undefined : c.logoUrl,
        }));
        setVendorCards(cleaned);
      } catch (e) {
        console.error("Failed to parse stored cards", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cardvault_cards", JSON.stringify(vendorCards));
    }
  }, [vendorCards, isLoaded]);

  const createCard = (cardData: Omit<GiftCard, "id" | "codes" | "createdAt">) => {
    const newCard: GiftCard = {
      ...cardData,
      id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      codes: Array.from({ length: cardData.quantity }).map(() => ({
        code: generateRandomCode(),
        isClaimed: false,
        claimedBy: null,
        claimedAt: null,
        isRedeemed: false,
        redeemedAt: null,
      })),
    };

    setVendorCards((prev) => [newCard, ...prev]);
    return newCard.id;
  };

  const claimCode = (codeStr: string, userName: string) => {
    let found = false;
    let alreadyClaimed = false;
    let claimedCard: GiftCard | undefined;

    const newCards = vendorCards.map((card) => {
      const updatedCodes = card.codes.map((codeObj) => {
        if (codeObj.code === codeStr) {
          found = true;
          if (codeObj.isClaimed) {
            alreadyClaimed = true;
            return codeObj;
          }
          claimedCard = card;
          return {
            ...codeObj,
            isClaimed: true,
            claimedBy: userName,
            claimedAt: new Date().toISOString(),
          };
        }
        return codeObj;
      });
      return { ...card, codes: updatedCodes };
    });

    if (!found) return { success: false, message: "Invalid gift card code." };
    if (alreadyClaimed) return { success: false, message: "Gift card has already been claimed." };

    setVendorCards(newCards);
    return { success: true, message: "Code Verified!", card: claimedCard };
  };

  const redeemCode = (codeStr: string, amount?: number): RedeemResult => {
    let found = false;
    let notClaimed = false;
    let alreadyRedeemed = false;
    let excessAmount = false;
    let availableBal = 0;
    let redeemedCard: GiftCard | undefined;
    let updatedCodeObj: GiftCardCode | undefined;
    let redeemedAmt = 0;
    let remBal = 0;
    let isFull = false;

    const newCards = vendorCards.map((card) => {
      const updatedCodes = card.codes.map((codeObj) => {
        if (codeObj.code === codeStr) {
          found = true;
          if (!codeObj.isClaimed) {
            notClaimed = true;
            return codeObj;
          }

          const currentBalance = typeof codeObj.currentBalance === 'number' 
            ? codeObj.currentBalance 
            : (codeObj.isRedeemed ? 0 : card.value);

          availableBal = currentBalance;

          if (codeObj.isRedeemed || currentBalance <= 0) {
            alreadyRedeemed = true;
            return codeObj;
          }

          const targetAmount = (amount && amount > 0) ? amount : currentBalance;
          if (targetAmount > currentBalance) {
            excessAmount = true;
            return codeObj;
          }

          redeemedCard = card;
          redeemedAmt = targetAmount;
          remBal = currentBalance - targetAmount;
          isFull = remBal <= 0;

          const updated: GiftCardCode = {
            ...codeObj,
            currentBalance: remBal,
            redeemedAmount: (codeObj.redeemedAmount || 0) + targetAmount,
            isRedeemed: isFull,
            redeemedAt: new Date().toISOString(),
          };
          updatedCodeObj = updated;
          return updated;
        }
        return codeObj;
      });
      return { ...card, codes: updatedCodes };
    });

    if (!found) return { success: false, message: "Invalid gift card code." };
    if (notClaimed) return { success: false, message: "You must add this card to your wallet first." };
    if (alreadyRedeemed) return { success: false, message: "Gift card has already been fully redeemed." };
    if (excessAmount) return { success: false, message: `Amount exceeds available balance of ₦${availableBal.toLocaleString()}.` };

    setVendorCards(newCards);
    return { 
      success: true, 
      message: isFull ? "Card Fully Redeemed!" : "Partial Redemption Successful!", 
      card: redeemedCard,
      code: updatedCodeObj,
      redeemedAmount: redeemedAmt,
      remainingBalance: remBal,
      isFullyRedeemed: isFull
    };
  };

  const getUserCards = (userName: string) => {
    const userCards: { card: GiftCard; code: GiftCardCode }[] = [];
    vendorCards.forEach((card) => {
      card.codes.forEach((codeObj) => {
        if (codeObj.isClaimed) {
          userCards.push({ card, code: codeObj });
        }
      });
    });
    // Sort by claimed date descending
    return userCards.sort((a, b) => {
      const dateA = a.code.claimedAt ? new Date(a.code.claimedAt).getTime() : 0;
      const dateB = b.code.claimedAt ? new Date(b.code.claimedAt).getTime() : 0;
      return dateB - dateA;
    });
  };

  return (
    <AppContext.Provider value={{ vendorCards, createCard, claimCode, redeemCode, getUserCards }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
