import { useEffect, useRef, useState } from "react";

import appStoreBadge from "../assets/whiteappstore.png";
import playStoreBadge from "../assets/white playstore.png";
import mascot from "../assets/image-Photoroom (4) 1.png";
import revinLogo from "../assets/logo 2.png";
import livoLogo from "../assets/livo.png";

const quickLinks = [
  "Home", "Revin Sight", "Revin Log", "Revin Skypulse",
  "Use Case", "About Us", "Career",
];
const usefulLinks = ["Terms And Conditions", "Privacy Policy", "FAQs"];
const socialLinks = [
  { label: "Facebook",  href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
];

export default function LivoFooter() {
  const [revealed, setRevealed] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.05 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(20px)",
    transition: `transform 0.65s ease-out ${delay}ms, opacity 0.65s ease-out ${delay}ms`,
  });

  return (
    <div ref={footerRef} className="relative w-full font-sans">

      {/* ── MASCOT — floats above the panel top edge ── */}
      <div
        className="absolute left-1/2 z-30"
        style={{
          top: -56,
          transform: `translateX(-50%) translateY(${revealed ? "0px" : "18px"}) scale(${revealed ? 1 : 0.88})`,
          opacity: revealed ? 1 : 0,
          transition: "transform 0.7s ease-out 100ms, opacity 0.7s ease-out 100ms",
        }}
      >
        <img
          src={mascot}
          alt="Livo mascot"
          className="w-28 h-28 object-contain drop-shadow-xl"
        />
      </div>

      {/* ── MAIN PANEL ── */}
      <div
        className="relative w-full bg-white"
        style={{
          borderTopLeftRadius: "2.5rem",
          borderTopRightRadius: "2.5rem",
          boxShadow: "0 -16px 60px rgba(0,0,0,0.07)",
          transform: revealed ? "translateY(0)" : "translateY(60px)",
          opacity: revealed ? 1 : 0,
          transition: "transform 0.7s ease-out, opacity 0.5s ease-out",
        }}
      >
        <div className="pt-14 pb-0">

          {/* ── 5-COLUMN GRID ── */}
          {/* col1: Revin logo + address + contact
              col2: Social links
              col3: LIVO branding (centre)
              col4: Quick links
              col5: Useful links                  */}
          <div
            className="grid px-10 lg:px-16 mb-12 gap-y-10"
            style={{
              gridTemplateColumns: "1.4fr 0.8fr 1.4fr 1fr 1fr",
              ...fadeUp(180),
            }}
          >

            {/* COL 1 — Revin logo + Address + Contact */}
            <div className="pr-8">
              <img
                src={revinLogo}
                alt="Revin Krishi"
                className="h-9 object-contain mb-6"
              />
              <p className="text-gray-900 font-bold text-sm mb-2">Address</p>
              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                Technology Innovation Foundation<br />
                Of IIT Palakkad (TECHIN) V<br />
                Square Building, 3/1443, NH544,<br />
                Opposite ITI Ltd, Kanjikode,<br />
                Pudussery Central, Kerala 678623
              </p>
              <p className="text-gray-900 font-bold text-sm mb-2">To Contact</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Gmail: Connect@Revinkrishi.Com<br />
                Ph no: 91+919778485001
              </p>
            </div>

            {/* COL 2 — Social links */}
            <div className="pt-16 pr-6">
              <ul className="space-y-5">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#2aab7e] transition-colors duration-200 group"
                    >
                      {s.label}
                      <svg
                        className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        viewBox="0 0 10 10" fill="none"
                      >
                        <path
                          d="M2 8L8 2M8 2H4M8 2V6"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 3 — LIVO branding centred (no card, open layout) */}
            <div className="flex flex-col items-center text-center px-4 pt-2">
              <img
                src={livoLogo}
                alt="LIVO"
                className="object-contain mb-3"
                style={{ height: 56 }}
              />
              <p className="text-sm leading-snug text-gray-500 mb-6">
                Smarter Farming<br />Starts Here
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <a href="#" className="hover:scale-105 transition-transform duration-200">
                  <img
                    src={appStoreBadge}
                    alt="App Store"
                    className="h-10 rounded-lg"
                    style={{ filter: "invert(1)" }}   /* white badge → dark on white bg */
                  />
                </a>
                <a href="#" className="hover:scale-105 transition-transform duration-200">
                  <img
                    src={playStoreBadge}
                    alt="Play Store"
                    className="h-10 rounded-lg"
                    style={{ filter: "invert(1)" }}
                  />
                </a>
              </div>
            </div>

            {/* COL 4 — Quick Links */}
            <div className="pl-4">
              <p className="text-gray-900 font-bold text-sm mb-5">Quick Links</p>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 text-xs hover:text-[#2aab7e] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 5 — Useful Links */}
            <div className="pl-4">
              <p className="text-gray-900 font-bold text-sm mb-5">Useful Links</p>
              <ul className="space-y-3">
                {usefulLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 text-xs hover:text-[#2aab7e] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── COPYRIGHT ── */}
          <div
            className="border-t border-gray-100 py-5 text-center"
            style={fadeUp(350)}
          >
            <p className="text-gray-400 text-xs">
              Copyright © 2026 All Rights Reserved
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}