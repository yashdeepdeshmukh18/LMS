import React from "react";
import facebookIcon from "../assets/icons/facebookHome.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#FBF5FF] border border-[#8300C4]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        
        {/* Left: Logo + Social */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="SmaranAI Logo"
              className="h-24 w-24"
            />
            <div>
              <h2 className="font-semibold text-purple-700">
                SmaranAI.in
              </h2>
              <p className="text-sm text-gray-500">
                Learn Smart with Smaran AI
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-gray-600">
            <img src={facebookIcon} alt="Facebook" className="w-5 h-5 cursor-pointer hover:text-purple-600" />
            <img src={instagramIcon} alt="Instagram" className="w-5 h-5 cursor-pointer hover:text-purple-600" />
            <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 cursor-pointer hover:text-purple-600" />
            <img src={twitterIcon} alt="Twitter" className="w-5 h-5 cursor-pointer hover:text-purple-600" />
          </div>
        </div>

        {/* Middle: About */}
        <div>
          <h3 className="text-[#8300C4] font-semibold mb-3 font-openSans text-xl sm:text-sm md:text-xl 
  leading-[1] tracking-normal">
            About Company
          </h3>
          <ul className="space-y-2 text-[black] text-sm font-poppins font-normal sm:text-sm md:text-md leading-[1] tracking-normal 
  underline decoration-solid">
            <li className="hover:text-purple-600 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-purple-600 cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Right: Community */}
        <div>
          <h3 className="text-[#8300C4] font-semibold mb-3 font-openSans text-xl sm:text-sm md:text-xl 
  leading-[1] tracking-normal">
            Community
          </h3>
          <ul className="space-y-2 text-[black] text-sm font-poppins font-normal sm:text-sm md:text-md leading-[1] tracking-normal 
  underline decoration-solid">
            <li className="hover:text-purple-600 cursor-pointer">
              Learners
            </li>
            <li className="hover:text-purple-600 cursor-pointer">
              Partners
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#8300C4] text-center py-4 text-[#8300C4] font-openSans font-semibold text-base md:text-sm leading-[1] tracking-normal">
        © 2025, All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
