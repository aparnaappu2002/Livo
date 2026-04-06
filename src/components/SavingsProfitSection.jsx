import React, { useState } from "react";
import farmerImg from "../assets/farmerimage.png";

const Slider = ({ value, setValue, min, max, color }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative w-full h-5 flex items-center">
      <div className="absolute w-full h-0.75 rounded-full bg-gray-200" />
      <div className="absolute h-0.75 rounded-full" style={{ width: `${pct}%`, background: color }} />
      <div
        className="absolute w-5 h-5 rounded-full border-[3px] border-white shadow-md"
        style={{ left: `calc(${pct}% - 10px)`, background: color }}
      />
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="absolute w-full opacity-0 cursor-pointer h-5"
      />
    </div>
  );
};

const CalculatorCard = ({ land, setLand, cost, setCost, yieldKg, setYield, price, setPrice }) => (
  <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: "#F5F5F0" }}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-lg font-bold text-gray-900">Land size</p>
        <p className="text-xs text-gray-400 mt-0.5">Enter your field size</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setLand(Math.max(1, land - 1))} className="w-8 h-8 rounded-full bg-white text-gray-700 text-lg font-bold shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50">−</button>
        <span className="font-bold text-gray-900 w-10 text-center">{land} Ac</span>
        <button onClick={() => setLand(land + 1)} className="w-8 h-8 rounded-full bg-white text-gray-700 text-lg font-bold shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50">+</button>
      </div>
    </div>

    <div className="border-t border-gray-200" />
    <div>
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-base font-bold text-gray-900">Input cost</p>
          <p className="text-xs text-gray-400 mt-0.5">Seeds, fertilizer &amp; labour</p>
        </div>
        <p className="text-xl font-bold text-gray-900">₹ {Math.round(cost / 1000)}k</p>
      </div>
      <Slider value={cost} setValue={setCost} min={2000} max={50000} color="#E8A838" />
      <div className="flex justify-between text-xs text-gray-400 mt-2"><span>₹2k / ac</span><span>₹50k / ac</span></div>
    </div>

    <div className="border-t border-gray-200" />
    <div>
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-base font-bold text-gray-900">Current yield</p>
          <p className="text-xs text-gray-400 mt-0.5">How much you harvest</p>
        </div>
        <p className="text-xl font-bold text-gray-900">{yieldKg * land} kg</p>
      </div>
      <Slider value={yieldKg} setValue={setYield} min={300} max={4000} color="#1A9E75" />
      <div className="flex justify-between text-xs text-gray-400 mt-2"><span>300 kg / ac</span><span>4000kg / ac</span></div>
    </div>

    <div className="border-t border-gray-200" />
    <div>
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-base font-bold text-gray-900">Selling price</p>
          <p className="text-xs text-gray-400 mt-0.5">What you get per kg</p>
        </div>
        <p className="text-xl font-bold text-gray-900">₹ {price}</p>
      </div>
      <Slider value={price} setValue={setPrice} min={5} max={80} color="#3DB54A" />
      <div className="flex justify-between text-xs text-gray-400 mt-2"><span>₹5 / kg</span><span>₹80 / Kg</span></div>
    </div>
  </div>
);

const ResultCard = ({ cost, yieldKg, price }) => {
  const revenue     = yieldKg * price;
  const withoutCost = cost;
  const withoutRev  = Math.max(revenue - cost, 0);
  const withCost    = Math.round(cost * 0.8);
  const withRev     = Math.max(Math.round(revenue * 1.2 - cost * 0.8), 0);
  const savings     = Math.round(withRev - withoutRev);

  // ─── Layout constants ───────────────────────────────────────────
  // BAR_ZONE: where bars + gridlines + farmer live (above the 0-line)
  // LABEL_ZONE: where "without livo" / "with livo" text lives (below 0-line)
  // These two zones are SEPARATE — labels never push bars up.
  const BAR_ZONE   = 220;  // px — bars and farmer grow within this height
  const LABEL_ZONE = 24;   // px — text below the 0-line
  const BAR_W      = 56;
  const BAR_GAP    = 14;
  const Y_AXIS_W   = 34;

  // ─── Dynamic Y scale ────────────────────────────────────────────
  const tallest   = Math.max(withoutCost + withoutRev, withCost + withRev, 10000);
  const rawMax    = tallest * 1.12;
  const exp       = Math.floor(Math.log10(rawMax));
  const magnitude = Math.pow(10, exp);
  const MAX_VAL   = Math.ceil(rawMax / magnitude) * magnitude;

  // 5 evenly-spaced ticks: index 0 = top (MAX_VAL), index 4 = bottom (0)
  const TICKS    = 5;
  const Y_LABELS = Array.from({ length: TICKS }, (_, i) =>
    Math.round(MAX_VAL * (TICKS - 1 - i) / (TICKS - 1))
  );
  // Y_LABELS[0] = MAX_VAL (top), Y_LABELS[4] = 0 (bottom)

  // Convert rupee value → px height measured from the 0-line upward
  const toPx = (val) => Math.max(0, (val / MAX_VAL) * BAR_ZONE);

  const fmtTick = (v) => {
    if (v === 0) return "0";
    if (v >= 1000) return `${Math.round(v / 1000)}k`;
    return String(v);
  };

  const barDefs = [
    { costVal: withoutCost, revVal: withoutRev, label: "without livo" },
    { costVal: withCost,    revVal: withRev,    label: "with livo"    },
  ];

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#F5F5F0" }}>
      <div style={{ padding: "20px 20px 0 20px", flex: 1 }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#111", margin: 0 }}>Your profit with livo</p>
          <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#555" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E8A838", display: "inline-block" }} />
              input cost
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#1A9E75", display: "inline-block" }} />
              Current Yield
            </span>
          </div>
        </div>

        {/* ── Chart: y-axis column + canvas column ── */}
        <div style={{ display: "flex",paddingTop:'83px' }}>

          {/*
            Y-AXIS COLUMN
            Height = BAR_ZONE exactly.
            Labels spaced top→bottom matching tick positions.
            marginBottom = LABEL_ZONE so its baseline aligns with the 0-line.
          */}
          <div style={{
            width: Y_AXIS_W,
            height: BAR_ZONE,
            marginBottom: LABEL_ZONE,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingRight: 6,
            fontSize: 11,
            color: "#9ca3af",
          }}>
            {Y_LABELS.map((v) => (
              <span key={v} style={{ lineHeight: 1 }}>{fmtTick(v)}</span>
            ))}
          </div>

          {/*
            CANVAS COLUMN
            Total height = BAR_ZONE + LABEL_ZONE.
            ┌─────────────────────────────┐ top: 0
            │  BAR_ZONE (220px)           │ gridlines, bars, farmer
            ├─────────────────────────────┤ top: BAR_ZONE  ← 0-line
            │  LABEL_ZONE (24px)          │ "without livo" / "with livo"
            └─────────────────────────────┘
          */}
          <div style={{
            flex: 1,
            position: "relative",
            height: BAR_ZONE + LABEL_ZONE,
          }}>

            {/*
              GRIDLINES
              Tick i=0 → top: 0 (MAX_VAL line)
              Tick i=4 → top: BAR_ZONE (0-line)
              Each gridline top = (i / (TICKS-1)) * BAR_ZONE  px
            */}
            {Y_LABELS.map((v, i) => (
              <div key={`grid-${v}`} style={{
                position: "absolute",
                top:   (i / (TICKS - 1)) * BAR_ZONE,
                left:  0,
                right: 0,
                borderTop: "1.5px dashed #d1d5db",
                zIndex: 0,
              }} />
            ))}

            {/*
              BARS
              Each bar group is absolutely positioned.
              - Its container spans from top:0 to top:BAR_ZONE (height = BAR_ZONE).
              - justifyContent:"flex-end" makes the bar stack grow from the bottom
                of that container — which is exactly at the 0-gridline.
              - The container does NOT include LABEL_ZONE, so labels can't push bars up.
            */}
            {barDefs.map(({ costVal, revVal, label }, idx) => {
              const cH = Math.max(4, toPx(costVal));
              const rH = toPx(revVal);
              const leftPx = idx * (BAR_W + BAR_GAP);
              return (
                <div key={label} style={{
                  position: "absolute",
                  left:   leftPx,
                  top:    0,
                  width:  BAR_W,
                  height: BAR_ZONE,         // only the bar zone — NOT including label zone
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end", // bars grow up from the 0-line
                  zIndex: 1,
                }}>
                  {rH > 0 && (
                    <div style={{
                      width: BAR_W, height: rH, flexShrink: 0,
                      background: "#1A9E75",
                      borderRadius: "6px 6px 0 0",
                    }} />
                  )}
                  <div style={{
                    width: BAR_W, height: cH, flexShrink: 0,
                    background: "#E8A838",
                    borderRadius: rH > 0 ? "0 0 6px 6px" : "6px",
                  }} />
                </div>
              );
            })}

            {/*
              BAR LABELS
              Sit in the LABEL_ZONE strip — top: BAR_ZONE.
              Completely outside the bar container so they never affect bar heights.
            */}
            {barDefs.map(({ label }, idx) => (
              <p key={`lbl-${label}`} style={{
                position:  "absolute",
                top:       BAR_ZONE,           // starts right at the 0-line
                left:      idx * (BAR_W + BAR_GAP),
                width:     BAR_W,
                height:    LABEL_ZONE,
                margin:    0,
                display:   "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize:  11,
                color:     "#6b7280",
                whiteSpace: "nowrap",
                zIndex:    1,
              }}>
                {label}
              </p>
            ))}

            {/*
              FARMER IMAGE
              - Spans top:0 → height:BAR_ZONE (same as bar containers).
              - objectPosition:"bottom" places feet at the bottom of that zone,
                which is exactly the 0-line.
              - right:0 keeps it flush to the right edge.
            */}
            <div style={{
              position: "absolute",
              top:    0,
              right:  0,
              height: BAR_ZONE,    // same height as bar zone → feet on 0-line
              width:  "auto",
              zIndex: 1,
              pointerEvents: "none",
            }}>
              <img
                src={farmerImg}
                alt="Farmer"
                style={{
                  height:          "105%",
                  width:           "auto",
                  objectFit:       "contain",
                  objectPosition:  "bottom",  // feet anchored to bottom = 0-line
                  display:         "block",
                }}
              />
            </div>

          </div>
        </div>

        {/* spacer so the savings banner isn't crammed */}
        <div style={{ height: 12 }} />
      </div>

      {/* ── Total savings ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 20px", background: "#D4EFDF",
      }}>
        <p style={{ fontWeight: 700, color: "#166534", fontSize: 14, margin: 0 }}>Total Savings</p>
        <p style={{ fontWeight: 700, color: "#15803d", fontSize: 16, margin: 0 }}>
          ₹ {Math.max(0, savings).toLocaleString()}
        </p>
      </div>

      <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280", padding: "12px 16px 16px", margin: 0 }}>
        "That's enough to cover a full month of farm labor"
      </p>
    </div>
  );
};

const SavingsPage = () => {
  const [land,    setLand]   = useState(1);
  const [cost,    setCost]   = useState(12000);
  const [yieldKg, setYield]  = useState(1200);
  const [price,   setPrice]  = useState(22);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">More Savings. More Profit.</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Track Your Present. Transform Your Future With Livo.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
        <CalculatorCard
          land={land}       setLand={setLand}
          cost={cost}       setCost={setCost}
          yieldKg={yieldKg} setYield={setYield}
          price={price}     setPrice={setPrice}
        />
        <ResultCard
          cost={cost * land}
          yieldKg={yieldKg * land}
          price={price}
        />
      </div>
    </div>
  );
};

export default SavingsPage;