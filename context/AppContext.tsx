"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface GiftCardCode {
  code: string;
  isClaimed: boolean;
  claimedBy: string | null;
  claimedAt: string | null;
  isRedeemed: boolean;
  redeemedAt: string | null;
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

interface AppContextType {
  vendorCards: GiftCard[];
  createCard: (card: Omit<GiftCard, "id" | "codes" | "createdAt">) => string;
  claimCode: (codeStr: string, userName: string) => { success: boolean; message: string; card?: GiftCard };
  redeemCode: (codeStr: string) => { success: boolean; message: string; card?: GiftCard };
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
    const stored = localStorage.getItem("valutex_cards");
    if (stored) {
      try {
        setVendorCards(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored cards", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("valutex_cards", JSON.stringify(vendorCards));
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

  const redeemCode = (codeStr: string) => {
    let found = false;
    let notClaimed = false;
    let alreadyRedeemed = false;
    let redeemedCard: GiftCard | undefined;

    const newCards = vendorCards.map((card) => {
      const updatedCodes = card.codes.map((codeObj) => {
        if (codeObj.code === codeStr) {
          found = true;
          if (!codeObj.isClaimed) {
            notClaimed = true;
            return codeObj;
          }
          if (codeObj.isRedeemed) {
            alreadyRedeemed = true;
            return codeObj;
          }
          redeemedCard = card;
          return {
            ...codeObj,
            isRedeemed: true,
            redeemedAt: new Date().toISOString(),
          };
        }
        return codeObj;
      });
      return { ...card, codes: updatedCodes };
    });

    if (!found) return { success: false, message: "Invalid gift card code." };
    if (notClaimed) return { success: false, message: "You must add this card to your wallet first." };
    if (alreadyRedeemed) return { success: false, message: "Gift card has already been redeemed." };

    setVendorCards(newCards);
    return { success: true, message: "Card Redeemed Successfully!", card: redeemedCard };
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
