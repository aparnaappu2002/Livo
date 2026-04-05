import { useEffect, useState } from "react";

import appStoreBadge from "../assets/appstore (1).png";
import playStoreBadge from "../assets/playstore.png";
import livoDevice from "../assets/scroll.png";
import heroIllustration from "../assets/heroImage.png";
import bulletIcon from "../assets/dot.png";

const features = [
  "Farming made simpler",
  "Stay informed, stay confident",
  "Grow with better decisions",
];

export default function LivoLanding() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f7f4] flex items-center justify-center p-6 font-sans">
      <div
        className={`
          relative w-full bg-white rounded-3xl border-4 border-black
          shadow-[0_8px_40px_rgba(26,92,71,0.10)]
          transition-all duration-700 ease-out overflow-hidden
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        style={{ maxWidth: "1200px" }}
      >
        <div className="relative flex flex-col lg:flex-row items-stretch gap-0 px-16 pt-14 pb-0">

          {/* LEFT CONTENT */}
          <div className="flex-1 z-10 pb-12">

            {/* Headline */}
            <h1
              className={`
                font-bold leading-tight mb-4 tracking-tight text-gray-900
                transition-all duration-700 delay-100
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.8rem)",
                whiteSpace: "nowrap",
              }}
            >
              Understand Your Crop Like Never Before
            </h1>

            {/* Subtitle */}
            <p
              className={`
                text-gray-400 font-light tracking-wide mb-3
                transition-all duration-700 delay-150
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
            >
              Your partner that farms with you.
            </p>

            {/* CTA text */}
            <p
              className={`
                font-semibold mb-8
                transition-all duration-700 delay-200
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", color: "#111827" }}
            >
              Get your{" "}
              <span style={{ color: "#2aab7e", fontWeight: 700 }}>livo now</span>
            </p>

            {/* App store badges */}
            <div
              className={`
                flex gap-4 mb-10
                transition-all duration-700 delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              <a href="#" className="hover:scale-105 transition-transform duration-200">
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="rounded-xl shadow-md"
                  style={{ height: "56px", width: "auto" }}
                />
              </a>
              <a href="#" className="hover:scale-105 transition-transform duration-200">
                <img
                  src={playStoreBadge}
                  alt="Get it on Play Store"
                  className="rounded-xl shadow-md"
                  style={{ height: "56px", width: "auto" }}
                />
              </a>
            </div>

            {/* Feature bullets */}
            <ul className="space-y-4">
              {features.map((feat, i) => (
                <li
                  key={feat}
                  className={`
                    flex items-center gap-4 text-gray-700 font-medium
                    transition-all duration-700
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  `}
                  style={{
                    transitionDelay: `${400 + i * 80}ms`,
                    fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                  }}
                >
                  <img src={bulletIcon} alt="" className="shrink-0" style={{ width: 22, height: 22 }} />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — illustration shifted left, device overlaps right edge */}
          <div
            className={`
              relative shrink-0 flex items-end justify-start
              transition-all duration-700 delay-200
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{
              width: "clamp(260px, 40%, 460px)",
              /* Negative margin pulls the whole column leftward */
              marginLeft: "clamp(-60px, -4vw, -20px)",
              /* Positive padding-right makes space for the device outside */
              paddingRight: "clamp(60px, 6vw, 90px)",
            }}
          >
            {/* Hero illustration — fills the column */}
            <img
              src={heroIllustration}
              alt="Farmer using Livo app"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />

            {/* Device — anchored to top-right, never clipped */}
            <div
              className={`
                absolute top-4 right-0
                transition-all duration-700 delay-500
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
              style={{ width: "clamp(52px, 5.5vw, 80px)" }}
            >
              <img
                src={livoDevice}
                alt="Livo device"
                className="w-full drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}