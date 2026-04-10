import React, { useEffect, useState } from "react";
import logoIcon from "../assets/image-Photoroom (4) 1.png";
import livoLogo from "../assets/livo.png";
import farmer from "../assets/farmerwithleg.png";
import whisk from "../assets/Whisk_234bd7dfe2c1e40acf441108695808f9dr-Photoroom 1.png";
import brown from "../assets/image 1168.png";
import green from "../assets/Whisk_daaea36240bbd8f814c496d1f4f3c38feg-Photoroom 1.png";
import plant from "../assets/Frame 2147211003.png";
import fadeplant from "../assets/Frame 2147211011.png";
import wheat from "../assets/wheat.png";
import fadewheat from "../assets/Frame 2147211020.png";
import chilli from "../assets/Frame 2147210967.png";
import fadechilli from "../assets/Frame 2147210977.png";
import revinLogo from "../assets/logo 3.png";
import whiteApple from "../assets/white_appstore.png";
import whitePlaystore from "../assets/white_playstore.png";

/* ─── Wave Text ─────────────────────────────────────────── */
// FIX: Never mix animation shorthand + animationDelay longhand on the same
// element — React diffs them independently and throws a conflict warning on
// re-render. Solution: use ONLY longhands (never the shorthand `animation`).
const WaveText = ({ text, isActive }) => (
  <span aria-label={text} style={{ display: "inline-block" }}>
    {text.split("").map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          // ✅ All longhands — no shorthand `animation` property at all
          animationName:            isActive ? "waveLetter" : "none",
          animationDuration:        "1.6s",
          animationTimingFunction:  "ease-in-out",
          animationIterationCount:  1,
          animationFillMode:        "both",
          animationDelay:           `${i * 0.07}s`,
          whiteSpace: char === " " ? "pre" : "normal",
        }}
      >
        {char}
      </span>
    ))}
  </span>
);

/* ─── Hamburger Icon ─────────────────────────────────────── */
const MenuIcon = ({ open }) => (
  <div style={{ width: 22, height: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <span style={{ display: "block", height: 2, background: "#374151", borderRadius: 2, transition: "transform 0.3s", transformOrigin: "center", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
    <span style={{ display: "block", height: 2, background: "#374151", borderRadius: 2, transition: "opacity 0.3s", opacity: open ? 0 : 1 }} />
    <span style={{ display: "block", height: 2, background: "#374151", borderRadius: 2, transition: "transform 0.3s", transformOrigin: "center", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
  </div>
);

/* ─── NavLink ────────────────────────────────────────────── */
const NavLink = ({ label, active }) => {
  const activeColor = "#16a34a";
  const inactiveColor = "#4b5563";
  const defaultColor = active ? activeColor : inactiveColor;
  function handleEnter(e) { e.currentTarget.style.color = activeColor; }
  function handleLeave(e) { e.currentTarget.style.color = defaultColor; }
  return (
    <li style={{ listStyle: "none", cursor: "pointer", color: defaultColor, fontWeight: active ? 600 : 500, fontSize: 15, transition: "color 0.2s" }}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {label}
    </li>
  );
};

/* ─── Download Button ────────────────────────────────────── */
const DownloadButton = ({ fullWidth }) => {
  function handleEnter(e) { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.color = "#fff"; }
  function handleLeave(e) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#16a34a"; }
  return (
    <a href="https://play.google.com/store/apps/details?id=com.revin.livo" target="_blank" rel="noopener noreferrer"
      style={{ display: "block", marginTop: fullWidth ? 8 : 0 }}>
      <button style={{ width: fullWidth ? "100%" : "auto", border: "1.5px solid #16a34a", color: "#16a34a", padding: fullWidth ? "10px" : "8px 20px", borderRadius: 8, fontWeight: 500, fontSize: 14, background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
        onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        Get Livo
      </button>
    </a>
  );
};

/* ─── Hero ───────────────────────────────────────────────── */
const Hero = () => {
  const [phase, setPhase] = useState("logo");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => setPhase("text"), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const TRANS = "opacity 0.55s ease, transform 0.55s cubic-bezier(0.4,0,0.2,1)";

  const logoStyle = {
    transition: TRANS,
    opacity: phase === "logo" ? 1 : 0,
    transform: phase === "logo" ? "translateY(0)" : "translateY(-60px)",
    position: "absolute",
    display: "flex", alignItems: "center", gap: 12,
  };

  const tagStyle = {
    transition: TRANS,
    opacity: phase === "text" ? 1 : 0,
    transform: phase === "text" ? "translateY(0)" : "translateY(60px)",
    position: "absolute",
    textAlign: "center", width: "100%", left: 0, right: 0, padding: "0 16px",
  };

  const navLinks = ["Home", "Features", "Savings", "Community"];

  return (
    <React.Fragment>
      <style>{`
        @keyframes waveLetter {
          0%,100% { transform: translateY(0px); }
          40%      { transform: translateY(-10px); }
          60%      { transform: translateY(-6px); }
        }
        html, body { margin: 0; padding: 0; overflow-x: hidden; box-sizing: border-box; }
        *, *::before, *::after { box-sizing: inherit; }
      `}</style>

      {/* ════ NAVBAR ════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        width: "100vw", zIndex: 100,
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}>
        <div style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 60, padding: "0 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, minWidth: 0 }}>
            <img src={logoIcon} alt="icon" style={{ width: 30, height: 30, objectFit: "contain", flexShrink: 0 }} />
            <img src={livoLogo} alt="LIVO" style={{ height: 22, objectFit: "contain", flexShrink: 0 }} />
          </div>

          {!isMobile && (
            <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link, i) => <NavLink key={link} label={link} active={i === 0} />)}
            </ul>
          )}

          {!isMobile && <DownloadButton fullWidth={false} />}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(p => !p)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 6, flexShrink: 0 }}
              aria-label="Toggle menu"
            >
              <MenuIcon open={menuOpen} />
            </button>
          )}
        </div>

        <div style={{
          width: "100%", overflow: "hidden",
          maxHeight: menuOpen ? 280 : 0,
          opacity: menuOpen ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
          background: "#fff", borderTop: "1px solid #f0f0f0",
        }}>
          <div style={{ padding: "8px 16px 16px" }}>
            {navLinks.map((link, i) => (
              <button key={link} onClick={() => setMenuOpen(false)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "11px 14px", border: "none", borderRadius: 8,
                background: i === 0 ? "#f0fdf4" : "transparent",
                color: i === 0 ? "#16a34a" : "#4b5563",
                fontWeight: i === 0 ? 600 : 500,
                fontSize: 15, cursor: "pointer", marginBottom: 2,
              }}>
                {link}
              </button>
            ))}
            <DownloadButton fullWidth={true} />
          </div>
        </div>
      </nav>

      {/* ════ PAGE BODY ════ */}
      <div style={{ paddingTop: 60, minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>

        {/* ════ DESKTOP ════ */}
        {!isMobile && (
          <>
            <div style={{ position: "relative", height: "clamp(600px,82vh,900px)", overflow: "hidden" }}>

              <div style={{ position: "absolute", top: "clamp(80px,14vh,160px)", left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-start", height: 200, overflow: "hidden", zIndex: 10 }}>
                <div style={logoStyle}>
                  <img src={logoIcon} alt="" style={{ height: 130, objectFit: "contain" }} />
                  <img src={livoLogo} alt="LIVO" style={{ height: 100, objectFit: "contain" }} />
                </div>
                <div style={tagStyle}>
                  <p style={{ fontSize: "clamp(32px,5.5vw,72px)", fontWeight: 600, color: "#134e4a", lineHeight: 1.15, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                    <WaveText text="INDIA'S #1 " isActive={phase === "text"} />
                    <span style={{ color: "#000" }}><WaveText text="AGRI PARTNER" isActive={phase === "text"} /></span>
                  </p>
                  <div style={{ fontSize: "clamp(14px,1.9vw,22px)", fontWeight: 500, color: "#4b7c6f", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <WaveText text="Powered By " isActive={phase === "text"} />
                    <img src={revinLogo} alt="Revin" style={{ height: "clamp(18px,2.2vw,30px)", objectFit: "contain" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
                    <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                      <img src={whiteApple} alt="App Store" style={{ height: "clamp(30px,3vw,42px)", objectFit: "contain" }} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.revin.livo" target="_blank" rel="noopener noreferrer">
                      <img src={whitePlaystore} alt="Play Store" style={{ height: "clamp(30px,3vw,42px)", objectFit: "contain" }} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Wheat left */}
              <div style={{ position: "absolute", bottom: 0, left: 0, display: "flex", alignItems: "flex-end", zIndex: 10 }}>
                <div style={{ position: "absolute", bottom: 0, display: "flex", paddingLeft: 48 }}>
                  {Array.from({ length: 5 }).map((_, i) => <img key={i} src={fadewheat} alt="" style={{ height: "clamp(80px,12vh,140px)", objectFit: "contain", marginLeft: -8 }} />)}
                </div>
                <div style={{ position: "relative", display: "flex", paddingLeft: 16 }}>
                  {Array.from({ length: 5 }).map((_, i) => <img key={i} src={wheat} alt="" style={{ height: "clamp(100px,15vh,160px)", objectFit: "contain", marginLeft: -8 }} />)}
                </div>
              </div>

              {/* Plants centre */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", alignItems: "flex-end" }}>
                <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                  <div style={{ position: "absolute", bottom: 0, display: "flex", justifyContent: "center", gap: 16, width: "100%", paddingLeft: 96 }}>
                    {Array.from({ length: 5 }).map((_, i) => <img key={i} src={fadeplant} alt="" style={{ height: "clamp(80px,14vh,140px)", objectFit: "contain" }} />)}
                  </div>
                  <div style={{ position: "relative", display: "flex", justifyContent: "center", width: "100%", paddingLeft: "13%" }}>
                    {Array.from({ length: 5 }).map((_, i) => <img key={i} src={plant} alt="" style={{ height: "clamp(100px,18vh,180px)", objectFit: "contain" }} />)}
                  </div>
                </div>
              </div>

              {/* Chilli right */}
              <div style={{ position: "absolute", bottom: 0, right: 0, display: "flex", alignItems: "flex-end", zIndex: 10 }}>
                <div style={{ position: "absolute", bottom: 0, display: "flex", gap: 8 }}>
                  {Array.from({ length: 4 }).map((_, i) => <img key={i} src={fadechilli} alt="" style={{ height: "clamp(80px,12vh,130px)", objectFit: "contain", marginLeft: -8 }} />)}
                </div>
                <div style={{ position: "relative", display: "flex", gap: 8 }}>
                  {Array.from({ length: 5 }).map((_, i) => <img key={i} src={chilli} alt="" style={{ height: "clamp(100px,15vh,160px)", objectFit: "contain", marginLeft: -8 }} />)}
                </div>
              </div>

              <img src={whisk} alt="drone" style={{ position: "absolute", bottom: "clamp(60px,10vh,100px)", right: "clamp(16px,3vw,48px)", height: "clamp(120px,18vh,260px)", objectFit: "contain", zIndex: 5 }} />
              <img src={farmer} alt="farmer" style={{ position: "absolute", left: "clamp(16px,3vw,48px)", bottom: -30, height: "clamp(200px,40vh,480px)", width: "auto", objectFit: "contain", objectPosition: "bottom", zIndex: 20, pointerEvents: "none" }} />
            </div>

            <img src={green} alt="" style={{ width: "100%", display: "block" }} />
            <img src={brown} alt="" style={{ width: "100%", maxHeight: 80, objectFit: "cover", display: "block" }} />
          </>
        )}

        {/* ════ MOBILE ════ */}
        {isMobile && (
          <div style={{ position: "relative", width: "100%", height: "calc(100vh - 60px)", overflow: "hidden" }}>

            <div style={{ position: "absolute", top: 200, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-start", height: 220, overflow: "hidden", zIndex: 10 }}>
              <div style={logoStyle}>
                <img src={logoIcon} alt="" style={{ height: 60, objectFit: "contain" }} />
                <img src={livoLogo} alt="LIVO" style={{ height: 44, objectFit: "contain" }} />
              </div>
              <div style={tagStyle}>
                <p style={{ fontSize: "clamp(26px,7.5vw,38px)", fontWeight: 400, color: "#134e4a", lineHeight: 1.2 }}>
                  <WaveText text="INDIA'S #1 " isActive={phase === "text"} />
                  <span style={{ color: "#000" }}><WaveText text="AGRI PARTNER" isActive={phase === "text"} /></span>
                </p>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#4b7c6f", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
                  <WaveText text="Powered By " isActive={phase === "text"} />
                  <img src={revinLogo} alt="Revin" style={{ height: 18, objectFit: "contain" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                    <img src={whiteApple} alt="App Store" style={{ height: 32, objectFit: "contain" }} />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.revin.livo" target="_blank" rel="noopener noreferrer">
                    <img src={whitePlaystore} alt="Play Store" style={{ height: 32, objectFit: "contain" }} />
                  </a>
                </div>
              </div>
            </div>

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1 }}>
              <img src={green} alt="" style={{ width: "100%", display: "block" }} />
              <img src={brown} alt="" style={{ width: "100%", maxHeight: 50, objectFit: "cover", display: "block" }} />
            </div>

            <div style={{ position: "absolute", bottom: 50, left: 0, width: "25%", display: "flex", alignItems: "flex-end", justifyContent: "flex-start", zIndex: 3, overflow: "hidden" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <img key={i} src={i % 2 === 0 ? wheat : fadewheat} alt="" style={{ height: 90, objectFit: "contain", marginLeft: -4, flexShrink: 0 }} />
              ))}
            </div>

            <div style={{ position: "absolute", bottom: 50, left: "25%", width: "50%", display: "flex", justifyContent: "center", alignItems: "flex-end", zIndex: 2, overflow: "hidden" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <img key={i} src={i % 2 === 0 ? plant : fadeplant} alt="" style={{ height: 100, objectFit: "contain", flexShrink: 0 }} />
              ))}
            </div>

            <div style={{ position: "absolute", bottom: 50, right: 0, width: "25%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", zIndex: 3, overflow: "hidden" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <img key={i} src={i % 2 === 0 ? chilli : fadechilli} alt="" style={{ height: 90, objectFit: "contain", marginLeft: -4, flexShrink: 0 }} />
              ))}
            </div>

            <img src={farmer} alt="farmer" style={{ position: "absolute", bottom: 20, left: -10, height: "clamp(160px, 32vh, 260px)", width: "auto", objectFit: "contain", objectPosition: "bottom", zIndex: 5, pointerEvents: "none" }} />

            <img src={whisk} alt="drone" style={{ position: "absolute", top: "clamp(550px, 100vh, 400px)", right: 8, height: "clamp(70px, 14vw, 110px)", width: "auto", objectFit: "contain", zIndex: 4, pointerEvents: "none" }} />
          </div>
        )}

      </div>
    </React.Fragment>
  );
};

export default Hero;