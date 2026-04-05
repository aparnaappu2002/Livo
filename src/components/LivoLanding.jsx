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
          relative max-w-5xl w-full bg-white rounded-3xl border-4 border-black
          shadow-[0_8px_40px_rgba(26,92,71,0.10)]
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* Subtle background accent */}

        <div className="relative flex flex-col lg:flex-row items-center gap-0 px-10 pt-12 pb-8 lg:pb-0">
          {/* LEFT CONTENT */}
          <div className="flex-1 z-10">
            {/* Headline */}
            <h1
              className={`
                text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3 tracking-tight
                transition-all duration-700 delay-100
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Understand Your Crop<br />
              <span className="text-[#1a5c47]">Like Never Before</span>
            </h1>

            {/* Subtitle */}
            <p
              className={`
                text-gray-400 text-lg mb-2 font-light tracking-wide
                transition-all duration-700 delay-150
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Your partner that farms with you.
            </p>

            {/* CTA text */}
            <p
              className={`
                text-gray-900 text-base font-semibold mb-6
                transition-all duration-700 delay-200
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Get your{" "}
              <span className="text-[#2aab7e] font-bold">livo</span>{" "}
              <span className="text-[#2aab7e] font-bold">now</span>
            </p>

            {/* App store badges */}
            <div
              className={`
                flex gap-4 mb-8 flex-wrap
                transition-all duration-700 delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              <a href="#" className="hover:scale-105 transition-transform duration-200">
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-14 rounded-xl shadow-md"
                />
              </a>
              <a href="#" className="hover:scale-105 transition-transform duration-200">
                <img
                  src={playStoreBadge}
                  alt="Get it on Play Store"
                  className="h-14 rounded-xl shadow-md"
                />
              </a>
            </div>

            {/* Feature bullets */}
            <ul className="space-y-3 mb-10">
              {features.map((feat, i) => (
                <li
                  key={feat}
                  className={`
                    flex items-center gap-3 text-gray-700 text-base font-medium
                    transition-all duration-700
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  `}
                  style={{ transitionDelay: `${400 + i * 80}ms` }}
                >
                  <img src={bulletIcon} alt="" className="w-5 h-5 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Illustration + Device */}
          <div
            className={`
              relative shrink-0 w-full lg:w-115 flex items-end justify-center
              transition-all duration-700 delay-200
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{ marginBottom: "-4px", marginLeft: "-30px" }}
          >
            {/* Main illustration — overflows below card border */}
            <img
              src={heroIllustration}
              alt="Farmer using Livo app"
              className="w-full max-w-sm lg:max-w-none lg:w-105 object-contain drop-shadow-xl"
              style={{ marginBottom: "-70px" }}
            />

            {/* Livo device — overlaid top right */}
            <div
              className="absolute top-4 right-0"
              style={{ width: 80 }}
            >
              <img
                src={livoDevice}
                alt="Livo device"
                className={`
                  w-full drop-shadow-2xl
                  transition-all duration-700 delay-500
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                `}
              />
              {/* <span className="block text-center text-[9px] text-gray-400 mt-1 font-mono tracking-widest uppercase">
                75 × 150
              </span> */}
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap');
      `}</style>
    </div>
  );
}