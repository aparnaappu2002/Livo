import React, { useState, useRef, useEffect } from "react";
import video1 from '../assets/Video 1.mp4'
import video2 from '../assets/Video2.mp4'
import video3 from '../assets/Video 3.mp4'
import video4 from '../assets/Video 4.mp4'
import video5 from '../assets/Video 5.mp4'
import  headImage from '../assets/Build for Every Grower.png'

const VIDEOS = [
  { id: 1, title: "Farmer",        subtitle: "Make Smarter Crop Decisions With AI-Powered Insights, Climate Forecasts, And Early Pest Detection.", src: video1 },
  { id: 2, title: "Agronomist",    subtitle: "Access Advanced Field Analytics And Precision Tools Built For Professional Crop Management.", src: video2 },
  { id: 3, title: "Home Gardener", subtitle: "Grow Healthier Plants At Home With Personalized Tips And Smart Watering Reminders.", src: video3 },
  { id: 4, title: "Researcher",    subtitle: "Leverage Real-Time Data And AI Models To Drive Agricultural Innovation Forward.", src: video4 },
  { id: 5, title: "Agri Business", subtitle: "Scale Your Operations With Market Insights And Supply Chain Optimization Tools.", src: video5 },
];

const VideoPage = () => {
  const [active, setActive] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh", padding: "3rem 2rem" }}>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 700, margin: 0 }}>
          Build for <span style={{ color: "#285A48" }}>Every Grower</span>
        </h1>
        <p style={{ color: "#6b7280", marginTop: "0.5rem", fontSize: "1rem" }}>
          From Farmers To Agronomists And Home Gardeners Etc...
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Carousel — videos stay in fixed order, active expands in place */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "stretch",
            height: "420px",
            overflow: "hidden",
            borderRadius: "1.25rem",
          }}
        >
          {VIDEOS.map((video, i) => {
            const isActive = i === active;
            return (
              <div
                key={video.id}
                onClick={() => setActive(i)}
                style={{
                  flex: isActive ? "0 0 68%" : "1 1 0",
                  minWidth: isActive ? "68%" : "80px",
                  maxWidth: isActive ? "68%" : "160px",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  position: "relative",
                  cursor: isActive ? "default" : "pointer",
                  transition: "all 0.5s ease",
                  flexShrink: 0,
                }}
              >
                {isActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                
                      loop
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      padding: "2rem 1.5rem 1.5rem",
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                    }}>
                      <h2 style={{ color: "white", fontSize: "1.8rem", fontWeight: 700, margin: "0 0 0.4rem" }}>
                        {video.title}
                      </h2>
                      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
                        {video.subtitle}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <video
                      muted
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "rgba(0,0,0,0.35)",
                      display: "flex", alignItems: "flex-end",
                      padding: "1rem 0.75rem",
                    }}>
                      <p style={{ color: "white", fontWeight: 600, fontSize: "0.85rem", margin: 0, lineHeight: 1.3 }}>
                        {video.title}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom row: quote + stats */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2rem",
          gap: "2rem",
          flexWrap: "wrap",
        }}>
          {/* Quote */}
          <div style={{ flex: "1 1 400px", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "3rem", color: "#285A48", lineHeight: 1, marginTop: "-0.5rem", fontFamily: "Georgia, serif" }}>"</span>
            <p style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 700, float: "left", marginRight: "2px", lineHeight: 1 }}>
                {VIDEOS[active].subtitle.charAt(0)}
              </span>
              {VIDEOS[active].subtitle.slice(1)}
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexShrink: 0 }}>
            {[
              { value: "3500+", label: "Registered\nFarmers" },
              { value: "350+",  label: "Active\nFarmers" },
              { value: "98%",   label: "Satisfaction\nRate" },
            ].map((stat, i, arr) => (
              <React.Fragment key={i}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.2rem", whiteSpace: "pre-line", lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: "1px", height: "40px", background: "#d1d5db" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Nav dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                border: "none",
                cursor: "pointer",
                backgroundColor: i === active ? "#285A48" : "#d1d5db",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default VideoPage;