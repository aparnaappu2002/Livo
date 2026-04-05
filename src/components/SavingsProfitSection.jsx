import React, { useState } from "react";
import farmerImg from "../assets/farmerimage.png"; // 👈 replace with your actual farmer image

/* ─────────────────────────────────────────────────────────
   CUSTOM SLIDER — matches the design's colored track + dot thumb
───────────────────────────────────────────────────────── */
const Slider = ({ value, setValue, min, max, color }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative w-full h-5 flex items-center">
      {/* Track background */}
      <div className="absolute w-full h-[3px] rounded-full bg-gray-200" />
      {/* Filled portion */}
      <div
        className="absolute h-[3px] rounded-full"
        style={{ width: `${pct}%`, background: color }}
      />
      {/* Thumb */}
      <div
        className="absolute w-5 h-5 rounded-full border-[3px] border-white shadow-md"
        style={{ left: `calc(${pct}% - 10px)`, background: color }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="absolute w-full opacity-0 cursor-pointer h-5"
      />
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   LEFT CARD — calculator inputs
───────────────────────────────────────────────────────── */
const CalculatorCard = ({ land, setLand, cost, setCost, yieldKg, setYield, price, setPrice }) => {
  const fmt = (v) =>
    v >= 1000 ? `₹${Math.round(v / 1000)}k` : `₹${v}`;

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{ background: "#F5F5F0" }}
    >
      {/* Land size */}
      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-bold text-gray-900">Land size</p>
            <p className="text-xs text-gray-400 mt-0.5">Enter your field size</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLand(Math.max(1, land - 1))}
              className="w-8 h-8 rounded-full bg-white text-gray-700 text-lg font-bold shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50"
            >−</button>
            <span className="font-bold text-gray-900 w-10 text-center">{land} Ac</span>
            <button
              onClick={() => setLand(land + 1)}
              className="w-8 h-8 rounded-full bg-white text-gray-700 text-lg font-bold shadow-sm flex items-center justify-center border border-gray-200 hover:bg-gray-50"
            >+</button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Input cost */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-base font-bold text-gray-900">Input cost</p>
            <p className="text-xs text-gray-400 mt-0.5">Seeds, fertilizer &amp; labour</p>
          </div>
          <p className="text-xl font-bold text-gray-900">₹ {Math.round(cost / 1000)}k</p>
        </div>
        <Slider value={cost} setValue={setCost} min={2000} max={50000} color="#E8A838" />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>₹2k / ac</span>
          <span>₹50k / ac</span>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Current yield */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-base font-bold text-gray-900">Current yield</p>
            <p className="text-xs text-gray-400 mt-0.5">How much you harvest</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{yieldKg * land} kg</p>
        </div>
        <Slider value={yieldKg} setValue={setYield} min={300} max={4000} color="#1A9E75" />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>300 kg / ac</span>
          <span>4000kg / ac</span>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Selling price */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-base font-bold text-gray-900">Selling price</p>
            <p className="text-xs text-gray-400 mt-0.5">What you get per kg</p>
          </div>
          <p className="text-xl font-bold text-gray-900">₹ {price}</p>
        </div>
        <Slider value={price} setValue={setPrice} min={5} max={80} color="#3DB54A" />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>₹5 / kg</span>
          <span>₹80 / Kg</span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   STACKED BAR CHART — matches design exactly
───────────────────────────────────────────────────────── */
const StackedBar = ({ inputCost, revenue, maxVal, label }) => {
  const chartH = 160; // px height of chart area
  const costH  = Math.max(4, (inputCost / maxVal) * chartH);
  const revH   = Math.max(0, (revenue  / maxVal) * chartH);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex flex-col-reverse" style={{ height: chartH }}>
        {/* Cost (bottom, amber) */}
        <div
          className="w-14 rounded-b"
          style={{ height: costH, background: "#E8A838" }}
        />
        {/* Revenue (top, teal) */}
        <div
          className="w-14 rounded-t"
          style={{ height: revH, background: "#1A9E75" }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   RIGHT CARD — profit chart
───────────────────────────────────────────────────────── */
const ResultCard = ({ cost, yieldKg, price }) => {
  const revenue     = yieldKg * price;
  const withoutCost = cost;
  const withoutRev  = revenue - cost;

  const withCost    = cost * 0.8;
  const withRev     = revenue * 1.2 - cost * 0.8;

  const savings     = Math.round((withRev - withoutRev));
  const maxVal      = Math.max(withoutCost + Math.max(withoutRev, 0), withCost + Math.max(withRev, 0), 1);

  // y-axis labels (0, 1k, 5k, 7k, 10k style from design)
  const yLabels = [10000, 7000, 5000, 1000, 0];

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ background: "#F5F5F0" }}
    >
      {/* Chart area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-gray-900">Your profit with livo</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#E8A838" }} />
              input cost
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#1A9E75" }} />
              Current Yield
            </span>
          </div>
        </div>

        {/* Chart + y-axis */}
        <div className="flex flex-1 gap-3">
          {/* Y-axis */}
          <div className="flex flex-col justify-between text-xs text-gray-400 text-right pr-1" style={{ height: 160 }}>
            {yLabels.map((v) => (
              <span key={v}>{v >= 1000 ? `${v / 1000}k` : v}</span>
            ))}
          </div>

          {/* Bars + farmer image */}
          <div className="flex items-end gap-4 flex-1 relative">
            {/* Horizontal grid lines */}
            <div className="absolute inset-x-0 top-0" style={{ height: 160 }}>
              {yLabels.map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-dashed border-gray-200"
                  style={{ top: `${(i / (yLabels.length - 1)) * 100}%` }}
                />
              ))}
            </div>

            {/* Without Livo bar */}
            <StackedBar
              inputCost={withoutCost}
              revenue={Math.max(withoutRev, 0)}
              maxVal={maxVal}
              label="without livo"
            />

            {/* With Livo bar */}
            <StackedBar
              inputCost={withCost}
              revenue={Math.max(withRev, 0)}
              maxVal={maxVal}
              label="with livo"
            />

            {/* Farmer illustration */}
            <div className="flex-1 flex items-end justify-end" style={{ height: 180 }}>
              <img
                src={farmerImg}
                alt="Farmer illustration"
                className="h-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Total savings footer */}
      <div
        className="flex justify-between items-center px-5 py-3 rounded-b-2xl"
        style={{ background: "#D4EFDF" }}
      >
        <p className="font-bold text-green-800 text-sm">Total Savings</p>
        <p className="font-bold text-green-700 text-base">₹ {savings.toLocaleString()}</p>
      </div>

      {/* Quote */}
      <p className="text-center text-xs text-gray-500 py-3 px-4">
        "That's enough to cover a full month of farm labor"
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
const SavingsPage = () => {
  const [land, setLand]     = useState(1);
  const [cost, setCost]     = useState(12000);
  const [yieldKg, setYield] = useState(1200);
  const [price, setPrice]   = useState(22);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          More Savings. More Profit.
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Track Your Present. Transform Your Future With Livo.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
        <CalculatorCard
          land={land}
          setLand={setLand}
          cost={cost}
          setCost={setCost}
          yieldKg={yieldKg}
          setYield={setYield}
          price={price}
          setPrice={setPrice}
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