import React, { useEffect, useRef } from "react";

import farmFriend     from '../assets/Whisk_d2c0e379c3fc875be95448cc05f3f0eedr-Photoroom 1.png';
import newFarmFriends from '../assets/FarmFriends2.png';
import statsImage     from '../assets/Frame 2147211065.png';
import groundBg       from '../assets/image 1175.png';
import treeLeft       from '../assets/Tree 1.png';
import treeRight      from '../assets/Tree 1.png';
import SavingsPage    from "./SavingsProfitSection";

const lerp = (p, inMin, inMax, outMin, outMax) => {
  const t = Math.min(1, Math.max(0, (p - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
};

const TOTAL_SCREENS = 6; // added 1 extra screen for the transition phase

const RippleEffectSection = () => {
  const wrapperRef    = useRef(null);
  const overlayRef    = useRef(null);
  const groundRef     = useRef(null);
  const treeLRef      = useRef(null);
  const treeRRef      = useRef(null);
  const headingRef    = useRef(null);
  const subRef        = useRef(null);
  const statsRef      = useRef(null);
  const farmRef       = useRef(null);
  const farmImgRef    = useRef(null);
  const arcRef        = useRef(null);
  const msTxtRef      = useRef(null);
  const subTxtRef     = useRef(null);
  const savingsRevealRef = useRef(null); // new: the rising savings content container
  const rafRef        = useRef(null);
  const farmerSwapped = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = newFarmFriends;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const wrapper  = wrapperRef.current;
        const overlay  = overlayRef.current;
        if (!wrapper || !overlay) return;

        const rect       = wrapper.getBoundingClientRect();
        const scrollable = wrapper.offsetHeight - window.innerHeight;
        const scrolled   = -rect.top;
        const p          = scrollable > 0
          ? Math.min(1, Math.max(0, scrolled / scrollable))
          : 0;

        const inSection = rect.top <= 0 && rect.bottom >= window.innerHeight;
        overlay.style.display = inSection ? "block" : "none";

        if (!inSection) return;

        // Farmer image swap
        if (p > 0.34 && !farmerSwapped.current && farmImgRef.current) {
          farmImgRef.current.src = newFarmFriends;
          farmerSwapped.current = true;
        }

        // P5 — ground rises
        if (groundRef.current) {
          groundRef.current.style.transform = `translateY(${lerp(p, 0.34, 0.48, 100, 0)}%)`;
          groundRef.current.style.opacity   = lerp(p, 0.34, 0.47, 0, 1);
        }

        // P5 — trees drop
        if (treeLRef.current) {
          treeLRef.current.style.transform = `translateY(${lerp(p, 0.34, 0.48, -100, 0)}%)`;
          treeLRef.current.style.opacity   = lerp(p, 0.34, 0.47, 0, 1);
        }
        if (treeRRef.current) {
          treeRRef.current.style.transform = `translateY(${lerp(p, 0.34, 0.48, -100, 0)}%) scaleX(-1)`;
          treeRRef.current.style.opacity   = lerp(p, 0.34, 0.47, 0, 1);
        }

        // P1 — heading blur-in
        if (headingRef.current) {
          headingRef.current.style.opacity   = lerp(p, 0.00, 0.12, 0, 1);
          headingRef.current.style.transform = `translateY(${lerp(p, 0.00, 0.12, 28, 0)}px)`;
          headingRef.current.style.filter    = `blur(${lerp(p, 0.00, 0.12, 12, 0)}px)`;
        }

        // P2 — subheading
        if (subRef.current) {
          subRef.current.style.opacity   = lerp(p, 0.10, 0.22, 0, 1);
          subRef.current.style.transform = `translateY(${lerp(p, 0.10, 0.22, 20, 0)}px)`;
        }

        // P3 — stats
        if (statsRef.current) {
          statsRef.current.style.opacity   = lerp(p, 0.16, 0.28, 0, 1);
          statsRef.current.style.transform = `translateY(${lerp(p, 0.16, 0.28, 40, 0)}px)`;
        }

        // P4 — farm friends
        if (farmRef.current) {
          farmRef.current.style.opacity   = lerp(p, 0.22, 0.36, 0, 1);
          farmRef.current.style.transform = `translateY(${lerp(p, 0.22, 0.36, 90, 0)}px)`;
        }

        // P6 — arc rises
        if (arcRef.current) {
          arcRef.current.style.transform            = `translateY(${lerp(p, 0.48, 0.62, 110, 0)}%)`;
          arcRef.current.style.height               = `${lerp(p, 0.56, 0.72, 0, 100)}vh`;
          arcRef.current.style.borderTopLeftRadius  = `${lerp(p, 0.54, 0.72, 50, 0)}%`;
          arcRef.current.style.borderTopRightRadius = `${lerp(p, 0.54, 0.72, 50, 0)}%`;
        }

        // P7 — "More Savings" heading fades in at center
        // Then from p=0.82 it travels upward toward its final top position
        if (msTxtRef.current) {
          const fadeIn   = lerp(p, 0.60, 0.70, 0, 1);
          // center → top: move from 40% down to ~7% from top
          const topPct   = lerp(p, 0.78, 0.92, 40, 7);
          msTxtRef.current.style.opacity = fadeIn;
          msTxtRef.current.style.top     = `${topPct}%`;
          // shrink font slightly as it moves to top
          const scale = lerp(p, 0.78, 0.92, 1, 0.82);
          msTxtRef.current.style.transform = `translateY(-50%) scale(${scale})`;
        }

        // P8 — subtitle fades in then fades out as savings rises
        if (subTxtRef.current) {
          const fadeIn  = lerp(p, 0.68, 0.76, 0, 1);
          const fadeOut = lerp(p, 0.80, 0.90, 1, 0);
          subTxtRef.current.style.opacity = Math.min(fadeIn, fadeOut);
          // move subtitle upward to follow heading
          const topPct = lerp(p, 0.78, 0.92, 52, 19);
          subTxtRef.current.style.top = `${topPct}%`;
        }

        // P9 — SavingsPage calculator rises from bottom into view
        // It slides up from 100vh offset to 0, starting after heading is at top
        if (savingsRevealRef.current) {
          const translateY = lerp(p, 0.82, 1.00, 100, 0);
          savingsRevealRef.current.style.transform = `translateY(${translateY}%)`;
          savingsRevealRef.current.style.opacity   = lerp(p, 0.82, 0.90, 0, 1);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{
          height: `${TOTAL_SCREENS * 100}vh`,
          position: "relative",
        }}
      />

      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 100,
          display: "none",
          overflow: "hidden",
          willChange: "transform",
          background: "white", // white bg so savings page looks native
        }}
      >
        {/* Scene background — fades out as arc takes over */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "#EEF0EC",
          overflow: "hidden",
        }}>
          {/* Ground */}
          <div
            ref={groundRef}
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "42%", zIndex: 1,
              opacity: 0,
              transform: "translateY(100%)",
              willChange: "transform, opacity",
            }}
          >
            <img
              src={groundBg} alt=""
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "bottom" }}
            />
          </div>

          {/* Tree Left */}
          <div
            ref={treeLRef}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "clamp(160px, 28vw, 480px)",
              zIndex: 10, pointerEvents: "none",
              opacity: 0, transform: "translateY(-100%)",
              willChange: "transform, opacity",
            }}
          >
            <img src={treeLeft} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

          {/* Tree Right */}
          <div
            ref={treeRRef}
            style={{
              position: "absolute", top: 0, right: 0,
              width: "clamp(160px, 28vw, 480px)",
              zIndex: 10, pointerEvents: "none",
              opacity: 0, transform: "translateY(-100%) scaleX(-1)",
              willChange: "transform, opacity",
            }}
          >
            <img src={treeRight} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

          {/* Content column */}
          <div style={{
            position: "relative", zIndex: 20,
            height: "100%",
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "4rem 1.5rem 1rem",
            boxSizing: "border-box",
          }}>
            {/* P1 — Heading */}
            <h1
              ref={headingRef}
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700, textAlign: "center",
                color: "#0E3937", margin: 0, lineHeight: 1.2,
                opacity: 0, transform: "translateY(28px)", filter: "blur(12px)",
                willChange: "transform, opacity, filter",
              }}
            >
              Livo's Ripple Effect
            </h1>

            {/* P2 — Subheading */}
            <p
              ref={subRef}
              style={{
                marginTop: "1rem", marginBottom: 0,
                textAlign: "center", color: "#4B5563",
                fontSize: "clamp(0.8rem, 1.5vw, 1rem)", maxWidth: "600px",
                opacity: 0, transform: "translateY(20px)",
                willChange: "transform, opacity",
              }}
            >
              A Transformation That Spans Across Revin Farmers — Boosting Profits,
              Cutting Waste, And Enriching Farming Communities.
            </p>

            {/* P3 — Stats image */}
            <div
              ref={statsRef}
              style={{
                marginTop: "2rem", width: "100%",
                display: "flex", justifyContent: "center",
                opacity: 0, transform: "translateY(40px)",
                willChange: "transform, opacity",
              }}
            >
              <img
                src={statsImage} alt="Livo Impact Statistics"
                style={{ width: "100%", maxWidth: "900px", objectFit: "contain", display: "block" }}
              />
            </div>

            {/* P4 — Farm friends */}
            <div
              ref={farmRef}
              style={{
                marginTop: "auto", width: "100%",
                display: "flex", justifyContent: "center",
                opacity: 0, transform: "translateY(90px)",
                willChange: "transform, opacity",
              }}
            >
              <img
                ref={farmImgRef}
                src={farmFriend} alt="Farmers Illustration"
                style={{
                  width: "100%", maxWidth: "1100px",
                  objectFit: "contain", objectPosition: "bottom",
                  marginBottom: "-30px", display: "block",
                }}
              />
            </div>
          </div>
        </div>

        {/* P6 — White arc */}
        <div
          ref={arcRef}
          style={{
            position: "absolute", left: 0, right: 0, bottom: 0,
            zIndex: 30, background: "white",
            height: "70vh",
            borderTopLeftRadius: "50%", borderTopRightRadius: "50%",
            transform: "translateY(110%)",
            pointerEvents: "none",
            willChange: "transform, height, border-radius",
          }}
        />

        {/* P7 — "More Savings" heading — animates from center to top */}
        <div
          ref={msTxtRef}
          style={{
            position: "absolute", left: 0, right: 0,
            top: "40%",   // JS will animate this
            zIndex: 50, textAlign: "center", padding: "0 1.5rem",
            opacity: 0,
            transform: "translateY(-50%) scale(1)",
            pointerEvents: "none",
            willChange: "top, opacity, transform",
            transition: "none",
          }}
        >
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700, color: "#0E3937",
            lineHeight: 1.25, margin: 0,
          }}>
            More Savings. More Profit.
          </h2>
        </div>

        {/* P8 — Subtitle — follows heading up then fades out */}
        <div
          ref={subTxtRef}
          style={{
            position: "absolute", left: 0, right: 0,
            top: "52%",   // JS will animate this
            zIndex: 50, textAlign: "center", padding: "0 1.5rem",
            opacity: 0,
            pointerEvents: "none",
            willChange: "top, opacity",
          }}
        >
          <p style={{ color: "#6B7280", fontSize: "clamp(0.8rem, 1.5vw, 1rem)", margin: 0 }}>
            Track Your Present. Transform Your Future With Livo.
          </p>
        </div>

        {/*
          P9 — SavingsPage cards rise from bottom.
          The heading above stays pinned at top (zIndex 50).
          This container holds ONLY the calculator grid (no heading).
        */}
        <div
          ref={savingsRevealRef}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 40,
            transform: "translateY(100%)",
            opacity: 0,
            overflowY: "auto",
            willChange: "transform, opacity",
            background: "white",
          }}
        >
          {/* Heading pinned at top of savings panel */}
          
          {/* Calculator cards only — SavingsPage without its own heading */}
          <SavingsPage hideHeading />
        </div>

      </div>
      {/* end fixed overlay */}
    </>
  );
};

export default RippleEffectSection;