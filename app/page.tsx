"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./landing.css";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [emailInput, setEmailInput] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-rotating timer for "How it works"
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 4200);
    return () => clearInterval(timer);
  }, [activeStep]);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubmittedEmail(emailInput);
    setIsSubmitted(true);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="landing-page" id="top">
      {/* HEADER */}
      <header>
        <div className="wrap nav">
          <a className="brand" href="#top">
            <Image src="/cardvault-logo.png" alt="CardVault Logo" width={32} height={32} unoptimized priority />
            <span>CardVault</span>
          </a>

          <nav className="nav-links">
            <a href="#how">How it works</a>
            <a href="#features">Product</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <Link href="/user" style={{ color: "var(--lime)", fontWeight: 600 }}>Customer App</Link>
            <Link href="/vendor" style={{ color: "var(--purple-2)", fontWeight: 600 }}>Vendor Portal</Link>
          </nav>

          <div className="nav-right">
            <Link className="btn btn-ghost" href="/user" style={{ padding: "9px 16px", fontSize: "13px" }}>
              Login
            </Link>
            <a className="btn btn-primary" href="#waitlist">
              Join waitlist
            </a>
            <button
              className={`burger ${isMobileMenuOpen ? "open" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <a className="mm-link" href="#how" onClick={closeMenu}>
            <span>How it works</span>
            <span style={{ fontSize: "14px", opacity: 0.6 }}>→</span>
          </a>
          <a className="mm-link" href="#features" onClick={closeMenu}>
            <span>Product</span>
            <span style={{ fontSize: "14px", opacity: 0.6 }}>→</span>
          </a>
          <a className="mm-link" href="#pricing" onClick={closeMenu}>
            <span>Pricing</span>
            <span style={{ fontSize: "14px", opacity: 0.6 }}>→</span>
          </a>
          <a className="mm-link" href="#faq" onClick={closeMenu}>
            <span>FAQ</span>
            <span style={{ fontSize: "14px", opacity: 0.6 }}>→</span>
          </a>

          <div className="mm-portals">
            <Link className="mm-portal-card user" href="/user" onClick={closeMenu}>
              <b>Customer Wallet</b>
              <span>Open /user app</span>
            </Link>
            <Link className="mm-portal-card vendor" href="/vendor" onClick={closeMenu}>
              <b>Vendor Portal</b>
              <span>Open /vendor dashboard</span>
            </Link>
          </div>

          <div className="mm-actions">
            <Link className="btn btn-ghost" href="/user" onClick={closeMenu}>
              Login
            </Link>
            <a className="btn btn-primary" href="#waitlist" onClick={closeMenu}>
              Join waitlist
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="kicker">Business Value Infrastructure</div>
              <h1 className="headline">
                Gift cards that don&apos;t die in a <em>drawer</em>.
              </h1>
              <p className="lead">
                Create branded gift cards, store credit and vouchers in minutes — no developer required. Customers keep everything in one wallet, spend it in-store or online, and pass it on when it isn&apos;t for them.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-primary" href="#waitlist">
                  Join the waitlist
                </a>
                <Link className="btn btn-portal" href="/user">
                  Launch Customer App →
                </Link>
                <Link className="btn btn-ghost" href="/vendor">
                  Vendor Portal →
                </Link>
              </div>
              <div className="hero-meta">
                <div className="dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span>Founding businesses onboarding across Nigeria &amp; West Africa</span>
              </div>
            </div>

            <div className="stack" aria-hidden="true">
              <div className="card c1">
                <div className="card-top">
                  <div className="card-tag">Kalu Hair Studio</div>
                </div>
                <div className="card-bottom">
                  <div className="card-balance">₦12,000</div>
                  <div className="card-sub">Store credit · expires never</div>
                </div>
              </div>
              <div className="card c2">
                <div className="card-top">
                  <div className="card-tag">Lumen Coffee Co.</div>
                </div>
                <div className="card-bottom">
                  <div className="card-balance">₦8,500</div>
                  <div className="card-sub">Gift card from Ada</div>
                </div>
              </div>
              <div className="card c3">
                <div className="card-top">
                  <div className="card-tag">CardVault Wallet</div>
                </div>
                <div className="card-bottom">
                  <div className="card-balance">₦34,200</div>
                  <div className="card-sub">Across 6 businesses</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="light">
          <div className="wrap eyebrow-free">
            <h2>From setup to redemption in three steps</h2>
            <p className="section-lead">
              No custom build, no waiting on a developer. A business can be live the same day.
            </p>

            <div className="how-wrap">
              <div className="how-tabs" role="tablist">
                <button
                  className={`how-tab ${activeStep === 1 ? "active" : ""}`}
                  onClick={() => setActiveStep(1)}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === 1}
                >
                  <span className="t-num">01</span>
                  <span className="t-body">
                    <b>Create your value</b>
                    <span>Set it up under your own name in minutes.</span>
                  </span>
                </button>
                <button
                  className={`how-tab ${activeStep === 2 ? "active" : ""}`}
                  onClick={() => setActiveStep(2)}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === 2}
                >
                  <span className="t-num">02</span>
                  <span className="t-body">
                    <b>Sell it or gift it</b>
                    <span>Share a link, QR code, or hosted page.</span>
                  </span>
                </button>
                <button
                  className={`how-tab ${activeStep === 3 ? "active" : ""}`}
                  onClick={() => setActiveStep(3)}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === 3}
                >
                  <span className="t-num">03</span>
                  <span className="t-body">
                    <b>Redeem anywhere it&apos;s honoured</b>
                    <span>In-store, online, or passed on to someone else.</span>
                  </span>
                </button>
              </div>

              <div className="how-panel">
                <div className={`how-slide ${activeStep === 1 ? "active" : ""}`}>
                  <div className="how-visual hv-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2.5" y="5" width="19" height="14" rx="3" />
                      <path d="M2.5 9.5h19" />
                      <path d="M6 14h5" />
                      <circle cx="17" cy="14" r="1.3" fill="currentColor" stroke="none" />
                    </svg>
                  </div>
                  <h3>Create your value</h3>
                  <p>
                    Set up a gift card, store credit or voucher under your own name — Hotel Credit, Studio Card, whatever fits your brand. Takes minutes, not a dev sprint.
                  </p>
                  <div className="how-progress">
                    <span className="done"><i /></span>
                    <span />
                    <span />
                  </div>
                </div>

                <div className={`how-slide ${activeStep === 2 ? "active" : ""}`}>
                  <div className="how-visual hv-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.4" />
                      <rect x="14" y="3" width="7" height="7" rx="1.4" />
                      <rect x="3" y="14" width="7" height="7" rx="1.4" />
                      <path d="M14 15.5h4" />
                      <path d="M14 18.5h6.5" />
                    </svg>
                  </div>
                  <h3>Sell it or gift it</h3>
                  <p>
                    Share a payment link, a QR code, or your hosted page. Customers buy for themselves or someone else, and delivery is instant.
                  </p>
                  <div className="how-progress">
                    <span className="done"><i /></span>
                    <span className="done"><i /></span>
                    <span />
                  </div>
                </div>

                <div className={`how-slide ${activeStep === 3 ? "active" : ""}`}>
                  <div className="how-visual hv-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </div>
                  <h3>Redeem anywhere it&apos;s honoured</h3>
                  <p>
                    Holders spend in-store or at checkout online. If it isn&apos;t right for them, they gift it onward or convert it — so the value keeps moving instead of expiring, unused.
                  </p>
                  <div className="how-progress">
                    <span className="done"><i /></span>
                    <span className="done"><i /></span>
                    <span className="done"><i /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features">
          <div className="wrap eyebrow-free">
            <h2>Everything a value program needs, one layer</h2>
            <p className="section-lead">
              CardVault isn&apos;t a gift-card app bolted onto your store. It&apos;s the infrastructure underneath it.
            </p>

            <div className="features">
              <div className="feature">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="6" width="19" height="13" rx="3" />
                  <path d="M2.5 10.5h19" />
                  <path d="M6 15h4" />
                </svg>
                <h3>No-code card creation</h3>
                <p>Configure gift cards, store credit, vouchers and rewards from a simple dashboard — set your own name, amounts and rules.</p>
              </div>
              <div className="feature">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
                  <path d="M15 12h4" />
                  <circle cx="15.5" cy="12" r="0.6" fill="currentColor" />
                </svg>
                <h3>One wallet, every business</h3>
                <p>Customers hold value from every participating business in a single place instead of screenshots and paper cards.</p>
              </div>
              <div className="feature">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
                <h3>Never a dead end</h3>
                <p>Value that doesn&apos;t suit the holder can be gifted onward or converted to another business — redemption goes up, waste goes down.</p>
              </div>
              <div className="feature">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V10" />
                  <path d="M12 20V4" />
                  <path d="M20 20v-7" />
                </svg>
                <h3>Redeem in-store or online</h3>
                <p>QR at the counter, a code at checkout, or a link in a DM — value works wherever your customers already are.</p>
              </div>
              <div className="feature">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v3.2" />
                  <path d="M12 17.8V21" />
                  <path d="M4.9 4.9l2.3 2.3" />
                  <path d="M16.8 16.8l2.3 2.3" />
                  <path d="M3 12h3.2" />
                  <path d="M17.8 12H21" />
                  <path d="M4.9 19.1l2.3-2.3" />
                  <path d="M16.8 7.2l2.3-2.3" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
                <h3>Looks like your brand</h3>
                <p>Every hosted page and receipt carries the issuing business&apos;s own identity — CardVault stays invisible to your customer.</p>
              </div>
              <div className="feature">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                  <path d="M7 15l4-5 3 3 5-7" />
                </svg>
                <h3>Issued, outstanding, redeemed</h3>
                <p>Track exactly what&apos;s live, what&apos;s spent and what&apos;s still sitting in wallets — reconciled per business, always.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WALLET SHOWCASE */}
        <section className="wallet-section">
          <div className="wrap wallet-grid">
            <div className="wallet-mock">
              <div className="head">
                <span>Your wallet</span>
                <span>6 businesses</span>
              </div>
              <div className="wallet-row">
                <div
                  className="chip"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 20% 15%,#e6a24a 0%,transparent 50%),radial-gradient(100% 100% at 85% 85%,#7a4a24 0%,transparent 60%),#1c1108",
                  }}
                />
                <div className="info">
                  <b>Lumen Coffee Co.</b>
                  <span>Gift card</span>
                </div>
                <div className="amt">₦8,500</div>
              </div>
              <div className="wallet-row">
                <div
                  className="chip"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 20% 15%,#d9a76b 0%,transparent 50%),radial-gradient(100% 100% at 85% 85%,#6e3d52 0%,transparent 60%),#180d13",
                  }}
                />
                <div className="info">
                  <b>Kalu Hair Studio</b>
                  <span>Store credit</span>
                </div>
                <div className="amt">₦12,000</div>
              </div>
              <div className="wallet-row">
                <div
                  className="chip"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 20% 15%,#5fb7c9 0%,transparent 50%),radial-gradient(100% 100% at 85% 85%,#274a52 0%,transparent 60%),#0c1315",
                  }}
                />
                <div className="info">
                  <b>Zaron Fitness</b>
                  <span>Referral reward</span>
                </div>
                <div className="amt">₦4,200</div>
              </div>
              <div className="wallet-cta">
                <Link href="/user" className="btn btn-primary" style={{ padding: "10px", fontSize: "13px", flex: 1 }}>
                  Spend
                </Link>
                <Link href="/user" className="btn btn-ghost" style={{ padding: "10px", fontSize: "13px", flex: 1 }}>
                  Gift it on
                </Link>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.14, maxWidth: "16ch" }}>
                Value that would&apos;ve gone unused, doesn&apos;t.
              </h2>
              <ul className="list-check">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Not the right gift? Send it to someone who wants it, in two taps.
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Don&apos;t shop at that business? Convert it to one you do — where the network allows it.
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  Everything in one wallet, so nothing gets forgotten in a text thread.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="light">
          <div className="wrap eyebrow-free">
            <h2>Simple pricing, for when you launch</h2>
            <p className="section-lead">
              Founding businesses lock in these rates for their first year. Nothing charges until you&apos;re live.
            </p>

            <div className="pricing-grid">
              <div className="plan">
                <div className="plan-name">Starter</div>
                <div className="plan-price">Free<sub> to join</sub></div>
                <div className="plan-desc">For a single business testing the waters.</div>
                <ul className="plan-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Up to 100 active cards
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Hosted gift page &amp; QR
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    5% fee per redemption
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Basic issued/redeemed tracking
                  </li>
                </ul>
                <a className="btn btn-dark btn-block" href="#waitlist">
                  Join waitlist
                </a>
              </div>

              <div className="plan featured">
                <div className="plan-badge">Most popular</div>
                <div className="plan-name">Growth</div>
                <div className="plan-price">₦15,000<sub>/mo</sub></div>
                <div className="plan-desc">For businesses running an active program.</div>
                <ul className="plan-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Unlimited cards &amp; holders
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    2.5% fee per redemption
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Full brand customisation
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Referral programs &amp; analytics
                  </li>
                </ul>
                <a className="btn btn-primary btn-block" href="#waitlist">
                  Join waitlist
                </a>
              </div>

              <div className="plan">
                <div className="plan-name">Business</div>
                <div className="plan-price">Custom</div>
                <div className="plan-desc">For chains, corporates and platform integrations.</div>
                <ul className="plan-features">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    API &amp; POS access
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Bulk corporate rewards
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Dedicated onboarding
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                    Volume-based pricing
                  </li>
                </ul>
                <a className="btn btn-dark btn-block" href="#waitlist">
                  Talk to us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist">
          <div className="wrap">
            <div className="waitlist">
              <h2>Be first through the door when CardVault opens.</h2>
              <p>
                We&apos;re onboarding a small group of founding businesses before public launch. Join now and get Starter pricing locked in.
              </p>
              {!isSubmitted ? (
                <form className="wl-form" onSubmit={handleWaitlistSubmit}>
                  <input
                    type="email"
                    required
                    placeholder="you@business.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    aria-label="Email address"
                  />
                  <button type="submit" className="btn btn-dark">
                    Join waitlist
                  </button>
                </form>
              ) : (
                <div className="wl-success show">
                  You&apos;re on the list — we&apos;ll email <span>{submittedEmail}</span> when it&apos;s your turn.
                </div>
              )}
              <div className="wl-note">No spam. One email when your invite is ready.</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="light section-tight">
          <div className="wrap eyebrow-free">
            <h2>Questions, answered</h2>
            <div className="faq">
              <details>
                <summary>
                  Is CardVault a bank, or does it hold my money?
                  <span className="plus" />
                </summary>
                <p>
                  No. CardVault isn&apos;t a fintech or e-money product — it&apos;s infrastructure for the value your business already issues, like gift cards and store credit. Regulated features such as cross-business conversion go through compliance review before they launch in any market.
                </p>
              </details>
              <details>
                <summary>
                  Can I use my own branding?
                  <span className="plus" />
                </summary>
                <p>
                  Yes — your hosted gift page, receipts and customer communications carry your business&apos;s name and look, not CardVault&apos;s. Call it whatever fits: gift card, hotel credit, studio card.
                </p>
              </details>
              <details>
                <summary>
                  Where can customers redeem their value?
                  <span className="plus" />
                </summary>
                <p>
                  Wherever you accept it — in-store via QR code, or online at checkout with a code or link. You control where and how it&apos;s honoured.
                </p>
              </details>
              <details>
                <summary>
                  What happens if a holder doesn&apos;t want their gift card?
                  <span className="plus" />
                </summary>
                <p>
                  They can gift it to someone else or, where the network supports it, convert it into value at another participating business — so it&apos;s far more likely to get used than sit forgotten.
                </p>
              </details>
              <details>
                <summary>
                  When can I start selling gift cards?
                  <span className="plus" />
                </summary>
                <p>
                  We&apos;re onboarding founding businesses in small batches ahead of public launch. Join the waitlist and we&apos;ll reach out with next steps and your Starter pricing.
                </p>
              </details>
              <details>
                <summary>
                  Do you support businesses outside Nigeria?
                  <span className="plus" />
                </summary>
                <p>
                  We&apos;re launching Nigeria and West Africa first. If you&apos;re elsewhere, join the waitlist and tell us where you&apos;re based — it helps us prioritise where we expand next.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a className="brand" href="#top">
                <Image src="/cardvault-logo.png" alt="CardVault Logo" width={32} height={32} unoptimized />
                <span>CardVault</span>
              </a>
              <p>Business Value Infrastructure for African businesses — issue it, wallet it, redeem it, anywhere.</p>
            </div>
            <div className="foot-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#how">How it works</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><Link href="/user">Customer App</Link></li>
                <li><Link href="/vendor">Vendor Portal</Link></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#waitlist">Waitlist</a></li>
                <li><a href="https://wearetavcorp.com" target="_blank" rel="noopener noreferrer">TavCorp</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 CardVault. A TavCorp product.</span>
            <div className="foot-social">
              <a href="#" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 3H21l-6.6 7.5L22.2 21h-6.8l-5.3-6.9L4 21H1.9l7-8L1 3h6.9l4.8 6.3L18.9 3Zm-1.2 16.2h1.2L7.4 4.7H6.1l11.6 14.5Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.9h4V21H3V9.9Zm7 0h3.8v1.52h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.55 4.78 5.87V21h-4v-4.9c0-1.17-.02-2.68-1.66-2.68-1.67 0-1.92 1.27-1.92 2.6V21h-4V9.9Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
