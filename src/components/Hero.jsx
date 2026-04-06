import React, { useEffect, useState } from "react";
import logoIcon from '../assets/image-Photoroom (4) 1.png'
import livoLogo from '../assets/livo.png'
import farmer from '../assets/farmerwithleg.png'
import whisk from '../assets/Whisk_234bd7dfe2c1e40acf441108695808f9dr-Photoroom 1.png'
import brown from '../assets/image 1168.png'
import green from '../assets/Whisk_daaea36240bbd8f814c496d1f4f3c38feg-Photoroom 1.png'
import apple from '../assets/image-Photoroom (36) 1.png'
import playstore from '../assets/image-Photoroom (35) 1.png'
import plant from '../assets/Frame 2147211003.png'
import fadeplant from '../assets/Frame 2147211011.png'
import wheat from '../assets/wheat.png'
import fadewheat from '../assets/Frame 2147211020.png'
import chilli from '../assets/Frame 2147210967.png'
import fadechilli from '../assets/Frame 2147210977.png'

/* ── Wave: each letter bobs up/down with a staggered delay ── */
const WaveText = ({ text, isActive }) => {
  return (
    <span aria-label={text} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            /* Each letter animates only when isActive */
            animation: isActive
              ? `waveLetter 1.6s ease-in-out 1`
              : "none",
            animationDelay: `${i * 0.07}s`,
            /* Preserve spaces */
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const [phase, setPhase] = useState("logo"); // "logo" | "exit" | "text"

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => setPhase("text"), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const TRANSITION = "opacity 0.55s ease, transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)";

  const logoStyle = {
    transition: TRANSITION,
    opacity:   phase === "logo" ? 1 : 0,
    transform: phase === "logo" ? "translateY(0)" : "translateY(-60px)",
  };

  const tagStyle = {
    transition: TRANSITION,
    opacity:   phase === "text" ? 1 : 0,
    transform: phase === "text" ? "translateY(0)" : "translateY(60px)",
  };

  return (
    <>
      {/* ── Keyframe injected once ── */}
      <style>{`
        @keyframes waveLetter {
          0%,100% { transform: translateY(0px); }
          40%      { transform: translateY(-10px); }
          60%      { transform: translateY(-6px); }
        }
      `}</style>

      <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200 pt-20">

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-12 py-4">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="Livo icon" className="w-10 h-10 object-contain" />
            <img src={livoLogo} alt="LIVO" className="h-7 object-contain" />
          </div>
          <ul className="hidden md:flex gap-10 text-gray-600 font-medium">
            <li className="text-green-600">Home</li>
            <li className="hover:text-green-600 cursor-pointer">Features</li>
            <li className="hover:text-green-600 cursor-pointer">Savings</li>
            <li className="hover:text-green-600 cursor-pointer">Community</li>
          </ul>
          <a href="https://play.google.com/store/apps/details?id=com.revin.livo" target="_blank" rel="noopener noreferrer">
            <button className="border border-green-600 text-green-600 px-5 py-2 rounded-lg hover:bg-green-600 hover:text-white transition">
              Download App
            </button>
          </a>
        </nav>

        <div className="relative">
          <div className="relative h-170 overflow-hidden">

            {/* ── CENTER ANIMATION AREA ── */}
            <div
              className="absolute inset-x-0 top-36 flex justify-center items-center z-0 pointer-events-none"
              style={{ overflow: "hidden", height: "180px" }}
            >

              {/* LOGO — slides up and out */}
              <div
                style={{
                  ...logoStyle,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img src={logoIcon} alt="Livo icon" style={{ height: "150px" }} className="object-contain select-none" />
                <img src={livoLogo} alt="LIVO"      style={{ height: "110px" }} className="object-contain select-none" />
              </div>

              {/* TAGLINE — slides up from below, then waves */}
              <div
                style={{
                  ...tagStyle,
                  position: "absolute",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize:      "clamp(32px, 5.5vw, 72px)",
                    fontWeight:    400,          /* ← thin/light weight */
                    color:         "#134e4a",
                    lineHeight:    1.15,
                    margin:        0,
                    letterSpacing: "0.5px",
                    whiteSpace:    "nowrap",
                  }}
                >
                  <WaveText text="Your Fields Companion" isActive={phase === "text"} />
                </p>

                {/* Sub-line also waves, slightly delayed overall */}
                <p
                  style={{
                    fontSize:      "clamp(13px, 1.6vw, 20px)",
                    fontWeight:    300,
                    color:         "#4b7c6f",
                    marginTop:     "10px",
                    letterSpacing: "1px",
                    whiteSpace:    "nowrap",
                  }}
                >
                  <WaveText text="Track. Grow. Profit." isActive={phase === "text"} />
                </p>
              </div>

            </div>

            {/* Wheat plants */}
            <div className="absolute bottom-0 left-0 flex items-end z-10">
              <div className="absolute bottom-0 flex items-end gap-4 pl-16">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img key={i} src={fadewheat} alt="fade-wheat" className="h-30 object-contain -ml-2" />
                ))}
              </div>
              <div className="relative flex items-end pl-4 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img key={i} src={wheat} alt="wheat" className="h-40 object-contain -ml-2" />
                ))}
              </div>
            </div>

            {/* Plants */}
            <div className="absolute bottom-0 left-0 w-full flex items-end">
              <div className="relative flex-1 flex items-end justify-center">
                <div className="absolute bottom-0 flex items-end justify-center gap-4 w-full pl-24">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img key={i} src={fadeplant} alt="fade-corn" className="h-40 object-contain" />
                  ))}
                </div>
                <div className="relative flex items-end justify-center gap-0 w-full px-8 pl-54">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img key={i} src={plant} alt="corn" className="h-58 object-contain" />
                  ))}
                </div>

                {/* Chilli - Right */}
                <div className="absolute bottom-0 right-0 flex items-end z-10 w-72">
                  <div className="absolute bottom-0 flex items-end gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <img key={i} src={fadechilli} alt="fade-chilli" className="h-28 object-contain -ml-2" />
                    ))}
                  </div>
                  <div className="relative flex items-end gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img key={i} src={chilli} alt="chilli" className="h-40 object-contain -ml-2" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drone */}
            <img src={whisk} alt="drone" className="absolute bottom-24 right-12 h-65 object-contain" />
          </div>

          {/* Green grass + Brown soil */}
          <div className="relative w-full">
            <img src={green} alt="green" className="w-full" />
            <div className="relative">
              <img src={brown} alt="soil" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center gap-6">
                <a
                  href="https://play.google.com/store/apps/details?id=com.revin.livo"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:scale-105 transition"
                >
                  <img src={apple} alt="apple" className="w-6 h-6" />
                  <div className="leading-tight">
                    <p className="text-xs text-gray-600">Download on the</p>
                    <p className="text-lg font-semibold text-black">App Store</p>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.revin.livo"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:scale-105 transition"
                >
                  <img src={playstore} alt="playstore" className="w-6 h-6" />
                  <div className="leading-tight">
                    <p className="text-xs text-gray-600">GET IT ON</p>
                    <p className="text-lg font-semibold text-black">Play Store</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Farmer */}
          <img
            src={farmer} alt="farmers"
            className="absolute left-12 z-20 object-contain object-bottom pointer-events-none"
            style={{
              height: "clamp(200px, 42vh, 480px)",
              width: "auto",
              bottom: "calc(100% - 680px - 50px)",
            }}
          />
        </div>

      </div>
    </>
  );
};

export default Hero;