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
import revinLogo from "../assets/logo 2.png";
import whiteApple from "../assets/white_appstore.png";
import whitePlaystore from "../assets/white_playstore.png";

const WaveText = ({ text, isActive }) => {
  return (
    <span aria-label={text} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: isActive ? "waveLetter 1.6s ease-in-out 1" : "none",
            animationDelay: `${i * 0.07}s`,
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
  const [phase, setPhase] = useState("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => setPhase("text"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const TRANSITION = "opacity 0.55s ease, transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)";

  const logoStyle = {
    transition: TRANSITION,
    opacity: phase === "logo" ? 1 : 0,
    transform: phase === "logo" ? "translateY(0)" : "translateY(-60px)",
  };

  const tagStyle = {
    transition: TRANSITION,
    opacity: phase === "text" ? 1 : 0,
    transform: phase === "text" ? "translateY(0)" : "translateY(60px)",
  };

  return (
    <React.Fragment>
      <style>{`
        @keyframes waveLetter {
          0%,100% { transform: translateY(0px); }
          40%      { transform: translateY(-10px); }
          60%      { transform: translateY(-6px); }
        }
      `}</style>

      <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200 pt-20">

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
          <div className="relative h-180 overflow-hidden">

            <div
              className="absolute inset-x-0 top-36 flex justify-center items-center z-0 pointer-events-none"
              style={{ overflow: "hidden", height: "180px" }}
            >
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
                <img src={livoLogo} alt="LIVO" style={{ height: "110px" }} className="object-contain select-none" />
              </div>

              <div style={{ ...tagStyle, position: "absolute", textAlign: "center" }}>
  <p
    style={{
      fontSize: "clamp(32px, 5.5vw, 72px)",
      fontWeight: 400,
      color: "#134e4a",
      lineHeight: 1.15,
      margin: 0,
      letterSpacing: "0.5px",
      whiteSpace: "nowrap",
    }}
  >
    <WaveText text="INDIA'S #1 " isActive={phase === "text"} />
    <span style={{ color: "#000000" }}>
      <WaveText text="AGRI PARTNER" isActive={phase === "text"} />
    </span>
  </p>

  <div
    style={{
      fontSize: "clamp(15px, 1.9vw, 24px)",
      fontWeight: 500,
      color: "#4b7c6f",
      marginTop: "10px",
      letterSpacing: "1px",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    }}
  >
    <WaveText text="Powered By " isActive={phase === "text"} />
    <img
      src={revinLogo}
      alt="Revin"
      style={{
        height: "clamp(18px, 2.2vw, 30px)",
        objectFit: "contain",
        display: "inline-block",
      }}
    />
  </div>

  {/* Store Buttons */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      marginTop: "16px",
    }}
  >
    <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition">
      <img src={whiteApple} alt="App Store" style={{ height: "clamp(28px, 3vw, 40px)", objectFit: "contain", border: "none", outline: "none" }} />
    </a>
    <a href="https://play.google.com/store/apps/details?id=com.revin.livo" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition">
      <img src={whitePlaystore} alt="Play Store" style={{ height: "clamp(28px, 3vw, 40px)", objectFit: "contain", border: "none", outline: "none" }} />
    </a>
  </div>
</div>
            </div>

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

            <img src={whisk} alt="drone" className="absolute bottom-24 right-12 h-65 object-contain" />
          </div>

          <div className="relative w-full">
            <img src={green} alt="green" className="w-full" />
            <div className="relative">
              <img src={brown} alt="soil" className="w-full" style={{ maxHeight: "80px", objectFit: "cover" }} />
              {/* <div className="absolute inset-0 flex items-center justify-center gap-4">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition">
                  <img src={whiteApple} alt="App Store" className="h-10 object-contain" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.revin.livo" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition">
                  <img src={whitePlaystore} alt="Play Store" className="h-10 object-contain" />
                </a>
              </div> */}
            </div>
          </div>

          <img
            src={farmer}
            alt="farmers"
            className="absolute left-12 z-20 object-contain object-bottom pointer-events-none"
            style={{
              height: "clamp(200px, 42vh, 480px)",
              width: "auto",
              bottom: "calc(100% - 680px - 50px)",
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Hero;