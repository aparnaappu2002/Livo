import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import farmFriend     from '../assets/Whisk_d2c0e379c3fc875be95448cc05f3f0eedr-Photoroom 1.png';
import newFarmFriends from '../assets/FarmFriends2.png';
import statsImage     from '../assets/Frame 2147211065.png';
import groundBg       from '../assets/image 1175.png';
import treeLeft       from '../assets/Tree 1.png';
import treeRight      from '../assets/Tree 2.png';
import SavingsPage from "./SavingsProfitSection";


const SliderInput = ({ label, value, setValue, min, max, unit }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-1">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold">{value} {unit}</p>
    </div>
    <input
      type="range" min={min} max={max} value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full accent-green-600"
    />
    <div className="flex justify-between text-xs text-gray-400 mt-1">
      <span>{min} {unit}</span>
      <span>{max} {unit}</span>
    </div>
  </div>
);

const LandSizeControl = ({ land, setLand }) => (
  <div className="flex justify-between items-center mb-6">
    <p className="text-sm text-gray-600">Land size</p>
    <div className="flex items-center gap-3">
      <button
        onClick={() => setLand(Math.max(1, land - 1))}
        className="w-8 h-8 rounded-full bg-gray-200 font-bold hover:bg-gray-300 transition-colors"
      >−</button>
      <span className="font-semibold w-12 text-center">{land} Ac</span>
      <button
        onClick={() => setLand(land + 1)}
        className="w-8 h-8 rounded-full bg-gray-200 font-bold hover:bg-gray-300 transition-colors"
      >+</button>
    </div>
  </div>
);

const BarChart = ({ withoutLivo, withLivo }) => {
  const max = Math.max(withoutLivo, withLivo, 1);
  return (
    <div className="flex items-end gap-10 h-48 mt-6 px-4">
      <div className="flex flex-col items-center flex-1">
        <p className="text-xs font-semibold text-orange-500 mb-1">
          ₹{Math.round(withoutLivo).toLocaleString()}
        </p>
        <div
          className="w-full bg-orange-400 rounded-t-lg transition-all duration-500"
          style={{ height: `${(withoutLivo / max) * 160}px` }}
        />
        <p className="text-xs mt-2 text-gray-500 text-center">Without Livo</p>
      </div>
      <div className="flex flex-col items-center flex-1">
        <p className="text-xs font-semibold text-green-700 mb-1">
          ₹{Math.round(withLivo).toLocaleString()}
        </p>
        <div
          className="w-full bg-green-600 rounded-t-lg transition-all duration-500"
          style={{ height: `${(withLivo / max) * 160}px` }}
        />
        <p className="text-xs mt-2 text-gray-500 text-center">With Livo</p>
      </div>
    </div>
  );
};



/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────*/
const RippleEffectSection = () => {
  const [showNewFarmers, setShowNewFarmers] = useState(false);
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);

  // Total scroll height: 500vh gives plenty of room for all phases
  const SCROLL_HEIGHT = "500vh";

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // ── Phase 1: arc rises from off-screen bottom
  const arcY = useTransform(scrollYProgress, [0, 0.40], ["110%", "0%"]);

  // ── Arc shape: tall ellipse → rectangle
  const arcHeight       = useTransform(scrollYProgress, [0.52, 0.82], ["75vh", "100vh"]);
  const arcBorderRadius = useTransform(scrollYProgress, [0.52, 0.78], ["50%", "0%"]);

  // ── Headline text fades in
  const textOpacity = useTransform(scrollYProgress, [0.38, 0.54], [0, 1]);
  const textY       = useTransform(scrollYProgress, [0.38, 0.54], [20, 0]);

  // ── Subtitle + stats fade in once panel is rectangular
  const subOpacity = useTransform(scrollYProgress, [0.75, 0.90], [0, 1]);

  // ── SLIDE-UP: entire sticky layer exits upward after panel is full
  //    0.82 = panel has become a full rectangle
  //    1.00 = layer fully above the viewport
  const layerY = useTransform(scrollYProgress, [0.82, 1.00], ["0%", "-100%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio < 0.6)
          setShowNewFarmers(true);
      },
      { threshold: [0.0, 0.3, 0.6, 0.9], rootMargin: "0px 0px -20% 0px" }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.disconnect(); };
  }, []);

  return (
    <>
      {/*
        The wrapper drives the scroll distance.
        SavingsPage sits in normal flow below the sticky window,
        so it's revealed naturally as the sticky layer slides up.
      */}
      <div ref={wrapperRef} style={{ height: SCROLL_HEIGHT, position: "relative" }}>

        {/* ══ STICKY WINDOW — slides up on exit ══ */}
        <motion.div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ y: layerY, zIndex: 10 }}
        >

          {/* ── LAYER 0: Ripple background section ── */}
          <section
            ref={sectionRef}
            className="absolute inset-0 bg-white overflow-hidden"
          >
            {/* Ground */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none z-0"
              style={{ height: "58%" }}
            >
              <img
                src={groundBg} alt="" aria-hidden="true"
                className="w-full h-full object-cover object-bottom"
              />
            </div>

            {/* Trees */}
            <div
              className="absolute top-0 left-0 pointer-events-none z-10"
              style={{ width: "clamp(280px, 32vw, 520px)" }}
            >
              <img src={treeLeft} alt="" aria-hidden="true" className="w-full h-auto" />
            </div>
            <div
              className="absolute top-0 right-0 pointer-events-none z-10"
              style={{ width: "clamp(280px, 32vw, 520px)" }}
            >
              <img src={treeRight} alt="" aria-hidden="true" className="w-full h-auto scale-x-[-1]" />
            </div>

            {/* Content */}
            <div className="relative z-20 pt-16 pb-12 px-6 h-full flex flex-col">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-green-900">
                  Livo's Ripple Effect
                </h1>
                <p className="mt-4 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                  A Transformation That Spans Across Revin Farmers — Boosting Profits,
                  Cutting Waste, And Enriching Farming Communities.
                </p>
              </div>
              <div className="mt-12 flex justify-center">
                <img
                  src={statsImage} alt="Livo Impact Statistics"
                  className="w-full max-w-5xl object-contain"
                />
              </div>
              <div className="mt-8 flex justify-center flex-1 transition-all duration-1000 ease-in-out">
                <img
                  key={showNewFarmers ? "new" : "original"}
                  src={showNewFarmers ? newFarmFriends : farmFriend}
                  alt="Farmers Illustration"
                  className="w-full max-w-[1150px] object-contain object-bottom"
                  style={{ marginBottom: "-30px" }}
                />
              </div>
            </div>
          </section>

          {/* ── LAYER 1: Morphing white arc/panel ── */}
          <motion.div
            className="absolute left-0 right-0 bottom-0 z-20 bg-white pointer-events-none"
            style={{
              y: arcY,
              height: arcHeight,
              borderTopLeftRadius: arcBorderRadius,
              borderTopRightRadius: arcBorderRadius,
            }}
          />

          {/* ── LAYER 2: "More Savings. More Profit." headline ── */}
          <motion.div
            className="absolute left-0 right-0 z-30 pointer-events-none text-center px-6"
            style={{
              opacity: textOpacity,
              y: textY,
              top: "42%",
              transform: "translateY(-50%)",
            }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold leading-snug"
              style={{ color: "#0E3937" }}
            >
              More Savings. More Profit.
            </h2>
          </motion.div>

          {/* ── LAYER 3: Subtitle (fades in late on the full panel) ── */}
          <motion.div
            className="absolute left-0 right-0 z-30 pointer-events-none text-center px-6"
            style={{
              opacity: subOpacity,
              top: "54%",
            }}
          >
            <p className="text-gray-500 text-sm md:text-base">
              Track Your Present. Transform Your Future With Livo.
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* ══ SAVINGS PAGE — lives in normal flow, revealed as sticky layer slides up ══ */}
      <SavingsPage />
    </>
  );
};

export default RippleEffectSection;