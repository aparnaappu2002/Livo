import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import img1 from "../assets/Img1.png"; 
import img2 from "../assets/Img2.png"; 
import img3 from "../assets/Img3.png"; // silhouettes sunset
import img4 from "../assets/Img4.png"; // sunset lake
import img5 from "../assets/Img5.png"; // hands sky
import img6 from "../assets/Img6.png"; // group photo
const CARDS = [
  {
    id: 1, src: img1,
    finalX: "-30vw", finalY: "-26vh",
    startX: "-2vw", startY: "1vh",
    startRotate: -8, endRotate: -2,
    width: "clamp(180px, 19vw, 300px)", aspect: "1.1", zIndex: 3,
  },
  {
    id: 2, src: img2,
    finalX: "0vw", finalY: "-26vh",
    startX: "1vw", startY: "-1vh",
    startRotate: 3, endRotate: 0,
    width: "clamp(180px, 19vw, 320px)", aspect: "0.72", zIndex: 3,
  },
  {
    id: 3, src: img3,
    finalX: "30vw", finalY: "-18vh",
    startX: "2vw", startY: "0vh",
    startRotate: 6, endRotate: 1,
    width: "clamp(180px, 19vw, 320px)", aspect: "0.78", zIndex: 3,
  },
  {
    id: 4, src: img4,
    finalX: "-30vw", finalY: "26vh",
    startX: "-2vw", startY: "-1vh",
    startRotate: -5, endRotate: -1,
    width: "clamp(150px, 16vw, 260px)", aspect: "1.3", zIndex: 3,
  },
  {
    id: 5, src: img5,
    finalX: "0vw", finalY: "28vh",
    startX: "0vw", startY: "1vh",
    startRotate: 2, endRotate: 0,
    width: "clamp(150px, 16vw, 260px)", aspect: "0.72", zIndex: 3,
  },
  {
    id: 6, src: img6,
    finalX: "30vw", finalY: "22vh",
    startX: "3vw", startY: "-1vh",
    startRotate: 7, endRotate: 2,
    width: "clamp(150px, 16vw, 260px)", aspect: "0.82", zIndex: 3,
  },
];

const AnimatedCard = ({ card, scrollYProgress }) => {
  const x = useTransform(scrollYProgress, [0, 0.40], [card.startX, card.finalX]);
  const y = useTransform(scrollYProgress, [0, 0.40], [card.startY, card.finalY]);
  const rotate = useTransform(scrollYProgress, [0, 0.40], [card.startRotate, card.endRotate]);

  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        x, y, rotate,
        width: card.width,
        height: `calc(${card.width} * ${card.aspect})`,
        zIndex: card.zIndex,
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        willChange: "transform",
      }}
    >
      <img
        src={card.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </motion.div>
  );
};

const CommunitySection = () => {
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0.30, 0.45], [0, 1]);

  return (
    <div ref={wrapperRef} style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <div className="absolute inset-0 flex items-center justify-center">
          {CARDS.map((card) => (
            <AnimatedCard key={card.id} card={card} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 1, zIndex: 20 }}
        >
          <h2
            className="text-community-heading"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textAlign: "center",
              margin: 0,
              padding: "0 1rem",
            }}
          >
            Our Community
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunitySection;
