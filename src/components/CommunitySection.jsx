import { useEffect, useRef } from "react";

import img1 from "../assets/Img1.png";
import img2 from "../assets/Img2.png";
import img3 from "../assets/Img3.png";
import img4 from "../assets/Img4.png";
import img5 from "../assets/Img5.png";
import img6 from "../assets/Img6.png";

const lerp = (p, inMin, inMax, outMin, outMax) => {
  const t = Math.min(1, Math.max(0, (p - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
};

const CARDS = [
  { id: 1, src: img1, startX:  -2, startY:  1, finalX: -30, finalY: -26, startR: -8, endR: -2, width: "clamp(180px,19vw,300px)", aspect: 1.10 },
  { id: 2, src: img2, startX:   1, startY: -1, finalX:   0, finalY: -26, startR:  3, endR:  0, width: "clamp(180px,19vw,320px)", aspect: 0.72 },
  { id: 3, src: img3, startX:   2, startY:  0, finalX:  30, finalY: -18, startR:  6, endR:  1, width: "clamp(180px,19vw,320px)", aspect: 0.78 },
  { id: 4, src: img4, startX:  -2, startY: -1, finalX: -30, finalY:  26, startR: -5, endR: -1, width: "clamp(150px,16vw,260px)", aspect: 1.30 },
  { id: 5, src: img5, startX:   0, startY:  1, finalX:   0, finalY:  28, startR:  2, endR:  0, width: "clamp(150px,16vw,260px)", aspect: 0.72 },
  { id: 6, src: img6, startX:   3, startY: -1, finalX:  30, finalY:  22, startR:  7, endR:  2, width: "clamp(150px,16vw,260px)", aspect: 0.82 },
];

const CommunitySection = () => {
  const wrapperRef = useRef(null);
  const cardRefs   = useRef([]);
  const headingRef = useRef(null);
  const rafRef     = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const rect       = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - window.innerHeight;
        const p          = scrollable > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollable))
          : 0;

        // Cards spread out slowly over full scroll range (p: 0 → 0.85)
        CARDS.forEach((card, i) => {
          const el = cardRefs.current[i];
          if (!el) return;
          const x = lerp(p, 0, 0.85, card.startX, card.finalX);
          const y = lerp(p, 0, 0.85, card.startY, card.finalY);
          const r = lerp(p, 0, 0.85, card.startR,  card.endR);
          el.style.transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh)) rotate(${r}deg)`;
        });

        // Heading fades in once cards are reasonably spread (p: 0.55 → 0.75)
        if (headingRef.current) {
          headingRef.current.style.opacity   = lerp(p, 0.55, 0.75, 0, 1);
          headingRef.current.style.transform = `translateY(${lerp(p, 0.55, 0.75, 16, 0)}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll,  { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // Reduced from 200vh to 150vh — enough scroll room to see the animation
    // without a massive dead gap after it finishes
    <div ref={wrapperRef} style={{ height: "150vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        overflow: "hidden", backgroundColor: "var(--background, #fff)",
      }}>

        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={el => { cardRefs.current[i] = el; }}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: card.width,
              height: `calc(${card.width} * ${card.aspect})`,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              willChange: "transform",
              transform: `translate(calc(-50% + ${card.startX}vw), calc(-50% + ${card.startY}vh)) rotate(${card.startR}deg)`,
              zIndex: 3,
            }}
          >
            <img
              src={card.src} alt="" aria-hidden="true" loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}

        <div
          ref={headingRef}
          style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none", zIndex: 20,
            opacity: 0, transform: "translateY(16px)",
            willChange: "opacity, transform",
          }}
        >
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 700, textAlign: "center", margin: 0,
          }}>
            Our <span style={{ color: "#285A48" }}>Community</span>
          </h2>
        </div>

      </div>
    </div>
  );
};

export default CommunitySection;