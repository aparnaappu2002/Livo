import React from "react";
import logoIcon from '../assets/image-Photoroom (4) 1.png'
import livoLogo from '../assets/livo.png'
import farmer from '../assets/Whisk_1289d52448de9ea80364fd0cb47cd654eg-Photoroom 1.png'
import whisk from '../assets/Whisk_234bd7dfe2c1e40acf441108695808f9dr-Photoroom 1.png'
import brown from '../assets/image 1168.png'
import green from '../assets/Whisk_daaea36240bbd8f814c496d1f4f3c38feg-Photoroom 1.png'
import apple from '../assets/image-Photoroom (36) 1.png'
import playstore from '../assets/image-Photoroom (35) 1.png'
import plant from '../assets/Frame 2147211003.png'
import fadeplant from '../assets/Frame 2147211011.png'
import wheat from '../assets/Frame 2147211016.png'
import fadewheat from '../assets/Frame 2147211020.png'
import chilli from '../assets/Frame 2147210967.png'
import fadechilli from '../assets/Frame 2147210977.png'

const Hero = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200 pt-20">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-12 py-4">

        {/* Logo — mascot icon + LIVO wordmark */}
        <div className="flex items-center gap-2">
          <img
            src={logoIcon}
            alt="Livo icon"
            className="w-10 h-10 object-contain"
          />
          <img
            src={livoLogo}
            alt="LIVO"
            className="h-7 object-contain"
          />
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-10 text-gray-600 font-medium">
          <li className="text-green-600">Home</li>
          <li className="hover:text-green-600 cursor-pointer">Features</li>
          <li className="hover:text-green-600 cursor-pointer">Pricing</li>
          <li className="hover:text-green-600 cursor-pointer">Community</li>
        </ul>

        {/* Button */}
        <button className="border border-green-600 text-green-600 px-5 py-2 rounded-lg hover:bg-green-600 hover:text-white transition">
          Download App
        </button>

      </nav>

      {/* Hero Section */}
      <div className="relative h-170 px-12 overflow-hidden">

        {/* ── LIVO logo — large, centred, behind everything ── */}
        <div className="absolute inset-x-0 top-16 flex justify-center z-0 pointer-events-none">
          <img
            src={livoLogo}
            alt="LIVO"
            style={{ height: "80px", opacity: 1 }}
            className="object-contain select-none"
          />
        </div>

        {/* Farmer - Left */}
        <img
          src={farmer}
          alt="farmers"
          className="absolute bottom-0 left-12 h-100 object-contain z-20"
        />

        {/* Wheat plants */}
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

        {/* Plants section */}
        <div className="absolute bottom-0 left-0 w-full flex items-end">
          <div className="relative flex-1 flex items-end justify-center">

            {/* Fade plants */}
            <div className="absolute bottom-0 flex items-end justify-center gap-4 w-full pl-24">
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={fadeplant} alt="fade-corn" className="h-40 object-contain" />
              ))}
            </div>

            {/* Front plants */}
            <div className="relative flex items-end justify-center gap-0 w-full px-8 pl-54">
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={plant} alt="corn" className="h-58 object-contain" />
              ))}
            </div>

            {/* Chilli - Right */}
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

        {/* Drone - Right */}
        <img
          src={whisk}
          alt="drone"
          className="absolute bottom-24 right-12 h-65 object-contain"
        />

      </div>

      {/* Bottom Store Buttons */}
      <div className="relative w-full">
        <img src={green} alt="green" className="w-full" />
        <div className="relative">
          <img src={brown} alt="soil" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center gap-6">

            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:scale-105 transition"
            >
              <img src={apple} alt="apple" className="w-6 h-6" />
              <div className="leading-tight">
                <p className="text-xs text-gray-600">Download on the</p>
                <p className="text-lg font-semibold text-black">App Store</p>
              </div>
            </a>

            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md hover:scale-105 transition"
            >
              <img src={playstore} alt="playstore" className="w-6 h-6" />
              <div className="leading-tight">
                <p className="text-xs text-gray-600">GET IT ON</p>
                <p className="text-lg font-semibold text-black">Play Store</p>
              </div>
            </a>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;