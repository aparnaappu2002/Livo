import React, { useState, useRef, useEffect } from "react";
import video1 from '../assets/Video 1.mp4'
import video2 from '../assets/Video2.mp4'
import video4 from '../assets/Video 4.mp4'
import video5 from '../assets/Video 5.mp4'

const VIDEOS = [
  { 
    id: 1, title: "Farmer", subtitle: "Madhu, Irinjalakuda.", src: video4,
    quote: "Livo helped me understand my soil better than ever. My yield increased by 40% this season and I finally feel confident about every decision I make on my farm."
  },
  { 
    id: 2, title: "Planter", subtitle: "Mini Shaju, Kalletumkara.", src: video5,
    quote: "As a planter, timing is everything. Livo's climate alerts and crop suggestions have saved my plants from disease multiple times. I can't imagine farming without it now."
  },
  { 
    id: 3, title: "Home Grower", subtitle: "Shaju K L, Thrissur.", src: video1,
    quote: "I grow vegetables at home and always struggled with pest problems. Livo's diagnosis feature identified the issue instantly and gave me the exact treatment. It's like having an expert always available."
  },
  { 
    id: 4, title: "Agronomist", subtitle: "Suresh, Ex professor, Kaipamangalam.", src: video2,
    quote: "From an agronomist's perspective, Livo brings scientific precision to every farmer's hand. The recommendations are accurate, timely, and genuinely make a difference in the field."
  },
];

// ── Icon components ──────────────────────────────────────────────
const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <rect x="5" y="3" width="4" height="18" rx="1"/>
    <rect x="15" y="3" width="4" height="18" rx="1"/>
  </svg>
);
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);
const MuteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
);
const UnmuteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
);

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

const VideoPage = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted,  setMuted]  = useState(true);
  const isMobile = useIsMobile();

  // One ref per video so we can mute the previous one explicitly
  const videoRefs = useRef(VIDEOS.map(() => React.createRef()));
  const prevActive = useRef(0);

  const getActiveRef = () => videoRefs.current[active]?.current;

  // When active changes: mute+pause previous, play+mute-reset new
  useEffect(() => {
    const prev = videoRefs.current[prevActive.current]?.current;
    if (prev) {
      prev.muted = true;
      prev.pause();
    }

    setPaused(false);
    setMuted(true);

    const curr = videoRefs.current[active]?.current;
    if (curr) {
      curr.muted = true;
      curr.load();
      curr.play().catch(() => {});
    }

    prevActive.current = active;
  }, [active]);

  const togglePause = (e) => {
    e.stopPropagation();
    const ref = getActiveRef();
    if (!ref) return;
    if (paused) { ref.play().catch(() => {}); }
    else        { ref.pause(); }
    setPaused(!paused);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const ref = getActiveRef();
    if (!ref) return;
    ref.muted = !muted;
    setMuted(!muted);
  };

  const currentVideo = VIDEOS[active];

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh", padding: isMobile ? "2rem 1rem" : "3rem 0.5rem" }}>

      {/* ── Heading ── */}
      <div style={{ textAlign: "center", marginBottom: isMobile ? "1.5rem" : "2.5rem" }}>
        <h1 style={{ fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 700, margin: 0 }}>
          Built For <span style={{ color: "#285A48" }}>Every Grower</span>
        </h1>
        
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* ════ DESKTOP layout ════ */}
        {!isMobile && (
          <>
            {/* Carousel */}
            <div style={{
              display: "flex",
              gap: "1rem",
              alignItems: "stretch",
              height: "620px",
              overflow: "hidden",
              borderRadius: "1.25rem",
            }}>
              {VIDEOS.map((video, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={video.id}
                    onClick={() => !isActive && setActive(i)}
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
                          ref={videoRefs.current[i]}
                          autoPlay loop muted playsInline
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
                        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: "8px", zIndex: 10 }}>
                          <button onClick={togglePause} title={paused ? "Play" : "Pause"}
                            style={{ width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", transition: "background 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.7)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.45)"}>
                            {paused ? <PlayIcon /> : <PauseIcon />}
                          </button>
                          <button onClick={toggleMute} title={muted ? "Unmute" : "Mute"}
                            style={{ width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", transition: "background 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.7)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.45)"}>
                            {muted ? <MuteIcon /> : <UnmuteIcon />}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <video muted playsInline
                          ref={videoRefs.current[i]}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem", gap: "2rem", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 400px", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "3rem", color: "#285A48", lineHeight: 1, marginTop: "-0.5rem", fontFamily: "Georgia, serif" }}>"</span>
                <p style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
                  {VIDEOS[active].quote}
                </p>
              </div>
              <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexShrink: 0 }}>
                {[
                  { value: "3500+", label: "Registered\nFarmers" },
                  { value: "350+",  label: "Active\nFarmers" },
                  { value: "98%",   label: "Satisfaction\nRate" },
                ].map((stat, i, arr) => (
                  <React.Fragment key={i}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}>{stat.value}</div>
                      <div style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "0.2rem", whiteSpace: "pre-line", lineHeight: 1.4 }}>{stat.label}</div>
                    </div>
                    {i < arr.length - 1 && <div style={{ width: "1px", height: "40px", background: "#d1d5db" }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Nav dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
              {VIDEOS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 9999, border: "none", cursor: "pointer", backgroundColor: i === active ? "#285A48" : "#d1d5db", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>
          </>
        )}

        {/* ════ MOBILE layout ════ */}
        {isMobile && (
          <>
            {/* Active video — full width */}
            <div style={{ borderRadius: "1.25rem", overflow: "hidden", position: "relative", width: "100%", aspectRatio: "9/16", maxHeight: "75vh" }}>
              <video
                ref={videoRefs.current[active]}
                autoPlay loop muted playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src={currentVideo.src} type="video/mp4" />
              </video>

              {/* Gradient overlay */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "3rem 1.25rem 1.25rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              }}>
                <h2 style={{ color: "white", fontSize: "1.4rem", fontWeight: 700, margin: "0 0 0.25rem" }}>
                  {currentVideo.title}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", margin: 0 }}>
                  {currentVideo.subtitle}
                </p>
              </div>

              {/* Controls */}
              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: "8px", zIndex: 10 }}>
                <button onClick={togglePause}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
                  {paused ? <PlayIcon /> : <PauseIcon />}
                </button>
                <button onClick={toggleMute}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
                  {muted ? <MuteIcon /> : <UnmuteIcon />}
                </button>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.75rem", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
              {VIDEOS.map((video, i) => (
                <div
                  key={video.id}
                  onClick={() => setActive(i)}
                  style={{
                    flexShrink: 0,
                    width: "72px",
                    height: "96px",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    border: i === active ? "2.5px solid #285A48" : "2.5px solid transparent",
                    transition: "border 0.2s",
                  }}
                >
                  <video muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: i === active ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "flex-end",
                    padding: "0.4rem 0.3rem",
                    transition: "background 0.2s",
                  }}>
                    <p style={{ color: "white", fontWeight: 600, fontSize: "0.65rem", margin: 0, lineHeight: 1.2 }}>
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginTop: "1.25rem" }}>
              <span style={{ fontSize: "2.5rem", color: "#285A48", lineHeight: 1, marginTop: "-0.4rem", fontFamily: "Georgia, serif", flexShrink: 0 }}>"</span>
              <p style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                {currentVideo.quote}
              </p>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "1.5rem", padding: "1rem 0.5rem", background: "white", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              {[
                { value: "3500+", label: "Registered\nFarmers" },
                { value: "350+",  label: "Active\nFarmers" },
                { value: "98%",   label: "Satisfaction\nRate" },
              ].map((stat, i, arr) => (
                <React.Fragment key={i}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#111827" }}>{stat.value}</div>
                    <div style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "0.2rem", whiteSpace: "pre-line", lineHeight: 1.4 }}>{stat.label}</div>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: "1px", height: "36px", background: "#d1d5db" }} />}
                </React.Fragment>
              ))}
            </div>

            {/* Nav dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
              {VIDEOS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 9999, border: "none", cursor: "pointer", backgroundColor: i === active ? "#285A48" : "#d1d5db", transition: "all 0.3s ease", padding: 0 }} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default VideoPage;