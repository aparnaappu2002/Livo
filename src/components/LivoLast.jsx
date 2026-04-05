import { useEffect, useState } from "react";

import appStoreBadge from "../assets/appstore (1).png";
import playStoreBadge from "../assets/playstore.png";
import livoDevice from "../assets/whitescroll.png";
import qrcode from "../assets/qrcode.png";
import bulletIcon from "../assets/dot.png";

const features = [
  "Farming made simpler",
  "Stay informed, stay confident",
  "Grow with better decisions",
];

export default function LivoLast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#e8f5f0] flex items-center justify-center p-8 font-sans">
      <div
        className={`
          relative max-w-5xl w-full bg-white rounded-3xl border-4 border-black
          shadow-[0_8px_40px_rgba(26,92,71,0.15)]
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        
        <div className="relative flex flex-col lg:flex-row items-stretch gap-0 overflow-visible rounded-3xl">

          {/* LEFT CONTENT */}
          <div className="flex-1 z-10 px-10 pt-12 pb-10">
            {/* Headline — single line, large */}
            <h1
              className={`
                text-3xl lg:text-4xl font-extrabold leading-tight mb-4 tracking-tight
                transition-all duration-700 delay-100
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="text-gray-900">Understand Your Crop Like Never Before</span>
            </h1>

            {/* CTA text */}
            <p
              className={`
                text-gray-900 text-base font-semibold mb-5
                transition-all duration-700 delay-200
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              Get your{" "}
              <span className="text-[#2aab7e] font-bold">livo now</span>
            </p>

            {/* App store badges */}
            <div
              className={`
                flex gap-3 mb-8 flex-wrap
                transition-all duration-700 delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              <a href="#" className="hover:scale-105 transition-transform duration-200">
                <img src={appStoreBadge} alt="Download on the App Store" className="h-12 rounded-xl" />
              </a>
              <a href="#" className="hover:scale-105 transition-transform duration-200">
                <img src={playStoreBadge} alt="Get it on Play Store" className="h-12 rounded-xl" />
              </a>
            </div>

            {/* Feature bullets */}
            <ul className="space-y-3">
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
                  <img src={bulletIcon} alt="" className="w-5 h-5 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — QR Code + Device */}
          <div
            className={`
              relative shrink-0 w-full lg:w-[400px] flex flex-col items-center justify-center py-10 pr-16
              transition-all duration-700 delay-200
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            {/* QR Code image */}
            <img
              src={qrcode}
              alt="Scan to Download"
              className={`
                w-52 h-52 object-contain rounded-2xl border border-gray-100 shadow-sm
                transition-all duration-700 delay-300
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            />

            {/* Scan text below QR */}
            <p className="mt-4 text-gray-900 font-semibold text-base text-center">
              Scan to Download
            </p>
            <p className="text-gray-400 text-sm text-center mt-0.5">
              Works on both IOS &amp; Android
            </p>

            {/* Livo device — overlapping right edge of card */}
            <div
              className={`
                absolute right-0 top-1/2 -translate-y-1/2 z-20
                transition-all duration-700 delay-500
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
              style={{ width: 72 }}
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

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
      `}</style>
    </div>
  );
}