import React, { useEffect, useRef, useState } from "react";
import headingImage from '../assets/Frame 2147211135.png'
import askLivoImg from '../assets/Frame 2147210723.png'
import knowFieldImg from '../assets/Frame 2147210723 (1).png'
import actConfidentImg from '../assets/Frame 2147210723 (2).png'
import talkIcon from '../assets/chat-square-arrow_svgrepo.com.png'
import cropIcon from '../assets/sprout_svgrepo.com.png'
import climateIcon from '../assets/cloud_svgrepo.com.png'
import diagnosisIcon from '../assets/scan_svgrepo.com.png'
import noteIcon from '../assets/Frame 2147211134.png'
import slide1 from '../assets/Frame 2147211034@2x.png'
import slide2 from '../assets/Frame 2147211034.png'
import plotIcon from '../assets/Frame 2147210723 3.png'
import reportIcon from '../assets/Frame 2147210723 4.png'
import righttIcon from '../assets/Frame 2147210723 5.png'
import climatePrediction1 from '../assets/climateprediction1.png'
import climatePrediction2 from '../assets/climateprediction2.png'
import climatePrediction3 from '../assets/climateprediction3.png'
import climatePrediction4 from '../assets/climateprediction4.png'
import ActionPlanning1 from '../assets/ActionPlanning1.png'
import ActionPlanning2 from '../assets/ActionPlanning2.png'
import ActionPlanning3 from '../assets/ActionPlanning3.png'
import ActionPlanning4 from '../assets/ActionPlanning4.png'
import cropDiagnosis1 from '../assets/cropDiagnosis1.png'
import cropDiagnosis2 from '../assets/cropDiagnosis2.png'
import cropDiagnosis3 from '../assets/cropDiagnosis3.png'
import cropDiagnosis4 from '../assets/cropDiagnosis4.png'

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

const TAB_CONTENT = [
  {
    label: "Partner In Field",
    icon: talkIcon,
    slides: [{ img: slide1 }],
    heading: "Always With You",
    description: "Always by your side. Livo guides every step—so your efforts grow into better harvests and greater income.",
    steps: [
      { title: "Ask Livo",        img: askLivoImg },
      { title: "Know your Field", img: knowFieldImg },
      { title: "Act Confident",   img: actConfidentImg },
    ],
    cta: "Talk Now →",
  },
  {
    label: "Crop Recommendation",
    icon: cropIcon,
    slides: [{ img: slide2 }],
    heading: "Meet Your Perfect Crop",
    description: "Livo provides you the right crop by understanding your soil and climate and also the market to bring you higher returns.",
    steps: [
      { title: "Plot your field", img: plotIcon },
      { title: "Add soil report", img: reportIcon },
      { title: "Get right crop",  img: righttIcon },
    ],
    cta: "Get Your Crop →",
  },
  {
    label: "Climate Prediction",
    icon: climateIcon,
    slides: [{ img: cropDiagnosis3 }],
    heading: "Stay Ahead of Weather",
    description: "No matter how the climate shifts, Livo prepares you early-helping you protect your crop and secure your income.",
    steps: [
      { title: "Get Alerts",       img: cropDiagnosis2 },
      { title: "Check Conditions", img: cropDiagnosis4 },
      { title: "Protect Crop",     img: cropDiagnosis1 },
    ],
    cta: "Try Now →",
  },
  {
    label: "Crop Diagnosis",
    icon: diagnosisIcon,
    slides: [{ img: climatePrediction4 }],
    heading: "Your Plant's Health Guide",
    description: "From uncertainty to clarity-Livo delivers the right treatment, precise dose, and clear action-leaving nothing to hope.",
    steps: [
      { title: "Scan The Plant", img: climatePrediction3 },
      { title: "Detect Issue",   img: climatePrediction2 },
      { title: "Get Treatment",  img: climatePrediction1 },
    ],
    cta: "Scan Now →",
  },
  {
    label: "Plan Your Activities",
    icon: noteIcon,
    slides: [{ img: ActionPlanning4 }],
    heading: "Plan Every Step Right",
    description: "From sowing to harvest, Livo organizes your actions so you never miss the right step at the right time.",
    steps: [
      { title: "Act Right",      img: ActionPlanning3 },
      { title: "Track Progress", img: ActionPlanning1 },
      { title: "Save More",      img: ActionPlanning2 },
    ],
    cta: "Track Now →",
  },
];

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => { setCurrent(0); }, [slides]);
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 3000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: "1rem",
      overflow: "hidden",
    }}>
      {slides.map((slide, i) => (
        <div key={i} style={{
          position: "absolute",
          inset: 0,
          opacity: i === current ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}>
          <img
            src={slide.img}
            alt={`Slide ${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      ))}
    </div>
  );
};

const LivoPage = () => {
  const headingReveal = useReveal();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(true);
  const autoPlayRef = useRef(null);
  const content = TAB_CONTENT[activeTab];

  const switchTab = (i) => {
    setShow(false);
    setTimeout(() => { setActiveTab(i); setShow(true); }, 80);
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setActiveTab(prev => (prev + 1) % TAB_CONTENT.length);
        setShow(true);
      }, 80);
    }, 3000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, []);

  const handleTab = (i) => {
    switchTab(i);
    startAutoPlay();
  };

  /* ── padding: equal on all 4 sides ── */
  const OUTER_PAD = isMobile ? "32px 24px" : "48px 24px";
  const CARD_PAD  = isMobile ? "20px"       : "24px";

  return (
    <div style={{ background: "#f0f4f2", padding: OUTER_PAD }}>
      <style>{`
        @keyframes tabProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      {/* ── Heading ── */}
      <div
        ref={headingReveal.ref}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: isMobile ? "24px" : "28px",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          opacity: headingReveal.visible ? 1 : 0,
          transform: headingReveal.visible ? "translateY(0)" : "translateY(-24px)",
        }}
      >
        <h2 style={{
          fontSize: isMobile ? "1.6rem" : "2.2rem",
          fontWeight: 700,
          textAlign: "center",
          margin: 0,
        }}>
          Livo Makes it{" "}
          <span style={{ color: "#285A48" }}>Effortless</span>
        </h2>
      </div>

      {/* ── Constrained wrapper — caps width on large screens ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Tabs ── */}
        <div style={{
          display: "flex",
          flexWrap: isMobile ? "nowrap" : "wrap",
          gap: isMobile ? "8px" : "10px",
          justifyContent: isMobile ? "flex-start" : "center",
          overflowX: isMobile ? "auto" : "visible",
          paddingBottom: isMobile ? "8px" : "0",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          marginBottom: "16px",
        }}>
          {TAB_CONTENT.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTab(index)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: isMobile ? "9px 14px" : "10px 20px",
                borderRadius: "12px",
                fontSize: isMobile ? "0.8rem" : "0.88rem",
                fontWeight: 500,
                whiteSpace: "nowrap",
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s",
                flexShrink: 0,
                background: activeTab === index ? "#285A48" : "#DDE5E2",
                color: activeTab === index ? "white" : "#6b7280",
                boxShadow: activeTab === index ? "0 2px 8px rgba(40,90,72,0.25)" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {activeTab === index && (
                <span key={activeTab} style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "3px",
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "0",
                  animation: "tabProgress 3s linear forwards",
                }} />
              )}
              <img
                src={tab.icon}
                alt={tab.label}
                style={{
                  width: isMobile ? 16 : 18,
                  height: isMobile ? 16 : 18,
                  objectFit: "contain",
                  filter: activeTab === index ? "brightness(0) invert(1)" : "opacity(0.5)",
                }}
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Card ── */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            /* FIX: equal padding on all 4 sides */
            padding: CARD_PAD,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? "20px" : "28px",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(1rem)",
          }}
        >
          {/* LEFT — image, fixed height so both sides are equal */}
          <div style={{
            width: isMobile ? "100%" : "50%",
            flexShrink: 0,
            height: isMobile ? "260px" : "360px",
            borderRadius: "14px",
            overflow: "hidden",
            background: "#e8f2ee",
          }}>
            <Carousel slides={content.slides} />
          </div>

          {/* RIGHT — content, same width so it fills the other 50% */}
          <div style={{
            width: isMobile ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: isMobile ? "16px" : "20px",
            /* no extra padding here — the card padding handles it uniformly */
          }}>

            {/* Heading */}
            <h2 style={{
              fontSize: isMobile ? "1.4rem" : "1.85rem",
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.2,
            }}>
              {content.heading.split(" ").slice(0, -2).join(" ")}{" "}
              <span style={{ color: "#285A48" }}>
                {content.heading.split(" ").slice(-2).join(" ")}
              </span>
            </h2>

            {/* Description */}
            <p style={{
              color: "#6b7280",
              maxWidth: isMobile ? "26rem" : "32rem",
              fontSize: isMobile ? "0.85rem" : "0.93rem",
              lineHeight: 1.65,
              margin: 0,
            }}>
              "{content.description}"
            </p>

            {/* Steps */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: isMobile ? "12px" : "20px",
              justifyContent: "center",
              flexWrap: "nowrap",
            }}>
              {content.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: isMobile ? "8px" : "10px",
                    width: isMobile ? "68px" : "90px",
                  }}>
                    <div
                      style={{
                        background: "#285A48",
                        width: isMobile ? 56 : 72,
                        height: isMobile ? 56 : 72,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(40,90,72,0.25)",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <img
                        src={step.img}
                        alt={step.title}
                        style={{
                          width: isMobile ? 48 : 60,
                          height: isMobile ? 48 : 60,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <p style={{
                      fontSize: isMobile ? "0.7rem" : "0.8rem",
                      color: "#4b5563",
                      fontWeight: 500,
                      lineHeight: 1.3,
                      margin: 0,
                      width: "100%",
                      textAlign: "center",
                    }}>
                      {step.title}
                    </p>
                  </div>

                  {index < content.steps.length - 1 && (
                    <span style={{
                      color: "#9ca3af",
                      fontSize: isMobile ? "0.9rem" : "1.1rem",
                      fontWeight: 700,
                      marginTop: isMobile ? "16px" : "20px",
                      flexShrink: 0,
                    }}>
                      »
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* CTA Button */}
            <button
              style={{
                border: "2px solid #15803d",
                color: "#15803d",
                background: "transparent",
                padding: isMobile ? "8px 24px" : "10px 28px",
                borderRadius: "9999px",
                fontSize: isMobile ? "0.85rem" : "0.93rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#15803d";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#15803d";
              }}
            >
              {content.cta}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LivoPage;