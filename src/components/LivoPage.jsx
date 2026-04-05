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

/* ── Scroll Reveal Hook ── */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
};

/* ── Tab Content Data ── */
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
    slides: [{ img: slide1 }],
    heading: "Stay Ahead of Weather",
    description: "Get hyper-local weather forecasts and rain alerts so you can plan irrigation, spraying, and harvests perfectly.",
    steps: [
      { title: "Check Forecast",  img: askLivoImg },
      { title: "Plan Activities", img: knowFieldImg },
      { title: "Avoid Crop Loss", img: actConfidentImg },
    ],
    cta: "View Forecast →",
  },
  {
    label: "AI Crop Diagnosis",
    icon: diagnosisIcon,
    slides: [{ img: slide1 }],
    heading: "Diagnose in Seconds",
    description: "Just snap a photo of your crop. Livo's AI instantly identifies diseases, pests, and deficiencies—and tells you exactly what to do.",
    steps: [
      { title: "Snap a Photo",    img: askLivoImg },
      { title: "AI Diagnosis",    img: knowFieldImg },
      { title: "Treat & Recover", img: actConfidentImg },
    ],
    cta: "Diagnose Now →",
  },
  {
    label: "Note Your Activities",
    icon: noteIcon,
    slides: [{ img: slide2 }],
    heading: "Track Every Step",
    description: "Log spraying, irrigation, harvests, and expenses in seconds. Livo keeps your farm diary organized so nothing slips through the cracks.",
    steps: [
      { title: "Log Activity",     img: askLivoImg },
      { title: "Track Progress",   img: knowFieldImg },
      { title: "Review & Improve", img: actConfidentImg },
    ],
    cta: "Start Logging →",
  },
];

/* ── Image Carousel ── */
const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => { setCurrent(0); }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "1.25rem", overflow: "hidden" }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute", inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          <img
            src={slide.img}
            alt={`Slide ${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      ))}

      {slides.length > 1 && (
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer",
                backgroundColor: i === current ? "#285A48" : "#a0c4b5",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Hero Section ── */
const HeroSection = ({ activeTab }) => {
  const { ref, visible } = useReveal();
  const content = TAB_CONTENT[activeTab];
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, [activeTab]);

  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: "1.5rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        padding: "1.25rem",
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "row",
        gap: 0,
        alignItems: "stretch",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(2rem)",
      }}
    >
      {/* LEFT — Image with rounded corners inside white card */}
      <div style={{ width: "55%", flexShrink: 0, flexGrow: 0, minHeight: "380px" }}>
        <Carousel slides={content.slides} />
      </div>

      {/* RIGHT — Feature Steps */}
      <div
        style={{
          width: "45%",
          flexShrink: 0,
          flexGrow: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "1.5rem 2rem",
          gap: "1.1rem",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(1rem)",
        }}
      >
        <h2 style={{ fontSize: "1.9rem", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
          {content.heading.split(" ").slice(0, -2).join(" ")}{" "}
          <span style={{ color: "#285A48" }}>{content.heading.split(" ").slice(-2).join(" ")}</span>
        </h2>

        <p style={{ color: "#6b7280", maxWidth: "26rem", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
          "{content.description}"
        </p>

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
          {content.steps.map((step, index) => (
            <React.Fragment key={index}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                <div
                  style={{
                    background: "#285A48",
                    width: 68, height: 68,
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(40,90,72,0.25)",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <img src={step.img} alt={step.title} style={{ width: 34, height: 34, objectFit: "contain" }} />
                </div>
                <p style={{ fontSize: "0.78rem", color: "#4b5563", fontWeight: 500, lineHeight: 1.3, margin: 0 }}>
                  {step.title.split(" ").map((word, i) => (
                    <span key={i} style={{ display: "block" }}>{word}</span>
                  ))}
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
            marginTop: "0.25rem",
            border: "2px solid #15803d",
            color: "#15803d",
            background: "transparent",
            padding: "0.65rem 2rem",
            borderRadius: "9999px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#15803d"; e.currentTarget.style.color = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#15803d"; }}
        >
          {content.cta}
        </button>
      </div>
    </div>
  );
};

/* ── Navbar Tabs ── */
const NavbarTabs = ({ active, setActive }) => {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`flex flex-wrap gap-3 justify-center mt-10 transition-all duration-700 delay-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {TAB_CONTENT.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActive(index)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
            active === index
              ? "bg-[#285A48] text-white shadow-md"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <img
            src={tab.icon}
            alt={tab.label}
            className={`w-5 h-5 object-contain ${
              active === index ? "brightness-0 invert" : "opacity-60"
            }`}
          />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

/* ── Main Page ── */
const LivoPage = () => {
  const headingReveal = useReveal();
  const contentReveal = useReveal();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      {/* Heading Image */}
      <div
        ref={headingReveal.ref}
        className={`flex justify-center transition-all duration-700 ${
          headingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <img
          src={headingImage}
          alt="Livo Makes it Effortless"
          className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl object-contain"
        />
      </div>

      {/* Tabs + Content — constrained to same width */}
      <div
        ref={contentReveal.ref}
        style={{ maxWidth: "900px", margin: "0 auto" }}
        className={`transition-all duration-700 delay-300 ${
          contentReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <NavbarTabs active={activeTab} setActive={setActiveTab} />
        <HeroSection activeTab={activeTab} />
      </div>

    </div>
  );
};

export default LivoPage;