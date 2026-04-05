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

const TAB_CONTENT = [
  {
    label: "Talk With Livo",
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
    slides: [{ img: climatePrediction4 }],
    heading: "Stay Ahead of Weather",
    description: "Get hyper-local weather forecasts and rain alerts so you can plan irrigation, spraying, and harvests perfectly.",
    steps: [
      { title: "Scan The Plant",  img: climatePrediction3 },
      { title: "Detect Issue", img: climatePrediction2 },
      { title: "Get Treatment", img: climatePrediction1 },
    ],
    cta: "Scan Now →",
  },
  {
    label: "Crop Diagnosis",
    icon: diagnosisIcon,
    slides: [{ img: cropDiagnosis3 }],
    heading: "Stay Ahead Of Weather",
    description: "Just snap a photo of your crop. Livo's AI instantly identifies diseases, pests, and deficiencies—and tells you exactly what to do.",
    steps: [
      { title: "Get Alerts",    img: cropDiagnosis2 },
      { title: "Check Conditions",    img: cropDiagnosis4 },
      { title: "Protect Crop", img: cropDiagnosis1 },
    ],
    cta: "Try Now →",
  },
  {
    label: "Note Your Activities",
    icon: noteIcon,
    slides: [{ img: ActionPlanning4 }],
    heading: "Plan Every Step Right",
    description: "From sowing to harvest, Livo organizes your actions so you never miss the right step at the right time.",
    steps: [
      { title: "Act Right",     img: ActionPlanning3 },
      { title: "Track Progress",   img: ActionPlanning1 },
      { title: "Save More", img: ActionPlanning2 },
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
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1rem", overflow: "hidden" }}>
      {slides.map((slide, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === current ? 1 : 0, transition: "opacity 0.7s ease" }}>
          <img src={slide.img} alt={`Slide ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
        </div>
      ))}
    </div>
  );
};

const LivoPage = () => {
  const headingReveal = useReveal();
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(true);
  const content = TAB_CONTENT[activeTab];

  const handleTab = (i) => {
    setShow(false);
    setTimeout(() => { setActiveTab(i); setShow(true); }, 80);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      {/* Heading */}
      <div
  ref={headingReveal.ref}
  className={`flex justify-center mb-8 transition-all duration-700 ${headingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}
>
  <h2 style={{ fontSize: "4rem", fontWeight: 700, textAlign: "center", margin: 0 }}>
    Livo Makes it{" "}
    <span style={{ color: "#285A48" }}>Effortless</span>
  </h2>
</div>

      {/* ── Constrained wrapper — tabs + card share same width ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Tabs — single row, no wrap, smaller padding so all fit */}
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",        /* force single line */
            gap: "12px",
            justifyContent: "center",
            overflowX: "auto",         /* scroll on very small screens */
            paddingBottom: "4px",
          }}
        >
          {TAB_CONTENT.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTab(index)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 22px",
                borderRadius: "14px",
                fontSize: "0.92rem",
                fontWeight: 500,
                whiteSpace: "nowrap",   /* never break label */
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s",
                flexShrink: 0,
                background: activeTab === index ? "#285A48" : "#DDE5E2 ",
                color: activeTab === index ? "white" : "#6b7280",
                boxShadow: activeTab === index ? "0 2px 8px rgba(40,90,72,0.25)" : "none",
              }}
            >
              <img
                src={tab.icon}
                alt={tab.label}
                style={{
                  width: 20, height: 20,
                  objectFit: "contain",
                  filter: activeTab === index ? "brightness(0) invert(1)" : "opacity(0.5)",
                }}
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Card — same width as the tab row above */}
        <div
          style={{
            background: "white",
            borderRadius: "1.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            padding: "1.75rem",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            minHeight: "460px",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(1rem)",
          }}
        >
          {/* LEFT — image */}
          <div style={{ width: "55%", flexShrink: 0, minHeight: "420px" }}>
            <Carousel slides={content.slides} />
          </div>

          {/* RIGHT — content */}
          <div
            style={{
              width: "45%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "1.5rem 2rem",
              gap: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.9rem", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
              {content.heading.split(" ").slice(0, -2).join(" ")}{" "}
              <span style={{ color: "#285A48" }}>{content.heading.split(" ").slice(-2).join(" ")}</span>
            </h2>

            <p style={{ color: "#6b7280", maxWidth: "26rem", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              "{content.description}"
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {content.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                    <div
                      style={{
                        background: "#285A48", width: 68, height: 68, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(40,90,72,0.25)", cursor: "pointer", transition: "transform 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <img src={step.img} alt={step.title} style={{ width: 34, height: 34, objectFit: "contain" }} />
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "#4b5563", fontWeight: 500, lineHeight: 1.3, margin: 0 }}>
                      {step.title.split(" ").map((word, i) => <span key={i} style={{ display: "block" }}>{word}</span>)}
                    </p>
                  </div>
                  {index < content.steps.length - 1 && (
                    <span style={{ color: "#9ca3af", fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>»</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              style={{
                border: "2px solid #15803d", color: "#15803d", background: "transparent",
                padding: "0.65rem 2rem", borderRadius: "9999px", fontSize: "0.95rem",
                fontWeight: 600, cursor: "pointer", transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#15803d"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#15803d"; }}
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