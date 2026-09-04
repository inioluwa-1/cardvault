# Valutex 🎁💳

**Valutex** is a modern, responsive digital gift card platform engineered for seamless gift card creation, multi-channel distribution, wallet management, and flexible redemptions. It delivers an end-to-end experience tailored for both **Merchants/Vendors** and **Consumers**.

---

## 🚀 Key Features

### 👤 Consumer / User Experience
- **Digital Gift Card Wallet (`/` & `/gift-cards`)**:
  - Live total balance counter that automatically reflects deductions from redemptions.
  - Quick filter tabs: **All**, **Available**, and **Used**.
  - Interactive cards that take users directly to full card details.
- **Claim & Add to Wallet**:
  - Claim any gift card code with a personalized name and immediately add it to your balance.
- **Dynamic Gift Card Details (`/details?code=...`)**:
  - High-definition card preview featuring merchant logos, custom background templates, and brand colors.
  - Breakdown of Card Value, Amount Paid, Expiry Date, and real-time status (`Active` vs. `Fully Redeemed`).
- **Flexible Balance Redemptions**:
  - **Partial Redemption**: Redeem an exact amount (e.g. ₦3,000 out of a ₦10,000 card) while keeping the remaining balance in your wallet.
  - **Quick Max Redemption**: One-tap "Use Max" chip or leave empty to redeem in full.
  - Real-time balance validation preventing over-redemption.
  - Instant congratulatory modal showing **Amount Redeemed** and **Remaining Balance**.
- **Recent Activity Ledger**:
  - Chronological activity log displaying uploaded brand logos, redemption badges, and exact dates.

---

### 🏪 Merchant / Vendor Portal
- **Executive Vendor Dashboard (`/vendor`)**:
  - Financial overview metrics: **Total Budget**, **Cards Created**, **Cards Shared**, **Cards Redeemed**, and **Remaining Available Cards**.
  - Recent activity feed linking directly to detailed transaction records.
- **Gift Card Studio (`/vendor/create`)**:
  - Create single or batch gift cards with custom titles, values, discounted prices, expiry dates, and quantities.
  - Upload custom **Brand Logos** and **Card Background Templates** with client-side canvas compression (Base64) to ensure permanent persistence.
  - Custom brand color picker and live interactive preview.
- **Cards Catalog (`/vendor/cards`)**:
  - Comprehensive card inventory with instant search.
  - Responsive viewport-fit filter tabs: **All Status**, **Active**, **Expired**.
  - Date range filter popover: **All Time**, **Last 7 Days**, **Last 30 Days**, or **Custom Date**.
- **Social & Multi-Channel Distribution (`/vendor/send`)**:
  - Direct sharing via **WhatsApp**, **Telegram**, **X (Twitter)**, **Instagram**, and **Email** with pre-filled claim links and codes.
- **Transaction & Activity Ledger (`/vendor/activity`)**:
  - Dedicated audit log of all claimed and redeemed cards across your business.
  - Filter by **All**, **Shared**, or **Redeemed** with search across codes, cards, and customer names.
- **Card Details & Audit (`/vendor/details?id=...`)**:
  - Deep-dive into individual card batches: Overview metrics, generated claim codes, and customer redemption timestamps.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Architecture**: React Context API (`AppContext`) with browser `localStorage` persistence and automatic schema migration.
- **Image Processing**: HTML5 Canvas client-side compressor converting uploads into persistent, low-footprint Base64 data URLs.
- **Deployment**: Configured and validated for zero-warning [Vercel](https://vercel.com/) production builds.

---

## 📂 Project Structure

```
valutex/
├── app/
│   ├── layout.tsx              # Root layout with AppProvider
│   ├── globals.css             # Global Tailwind utilities and scrollbar suppression
│   ├── page.tsx                # Consumer Dashboard (Wallet balance & Recent Activity)
│   ├── details/
│   │   └── page.tsx            # Consumer Gift Card Details & Redemption Screen
│   ├── gift-cards/
│   │   └── page.tsx            # Consumer Gift Cards Collection & Filtering
│   └── vendor/
│       ├── page.tsx            # Vendor Analytics Dashboard
│       ├── activity/
│       │   └── page.tsx        # Vendor Transaction & Activity Ledger
│       ├── cards/
│       │   └── page.tsx        # Vendor Card Management & Multi-Filters
│       ├── create/
│       │   └── page.tsx        # Card Creation Studio with image compression
│       ├── details/
│       │   └── page.tsx        # Vendor Batch Code Details & Audit
│       └── send/
│           └── page.tsx        # Multi-Channel Customer Distribution
├── components/
│   ├── BottomNav.tsx           # Consumer Mobile Navigation with Add & Redeem Modals
│   ├── VendorBottomNav.tsx     # Vendor Mobile Navigation Bar
│   └── ShareCardModal.tsx      # Social Share Modal (WhatsApp, Telegram, X, Email)
├── context/
│   └── AppContext.tsx          # Global store for cards, codes, partial redemptions & claims
├── public/                     # Static media and background assets
└── README.md                   # Project documentation
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18.18+ or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/valutex.git
   cd valutex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Access the **User Experience** at: `http://localhost:3000/`
   - Access the **Vendor Experience** at: `http://localhost:3000/vendor`

---

## 🚢 Production Build

To test or verify a production build locally:

```bash
npm run build
npm run start
```
