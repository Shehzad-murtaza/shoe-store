import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';  // Import Link from next/link

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            StepHub is your ultimate destination for stylish and comfortable footwear. We offer a wide range of shoes for every occasion, ensuring quality and satisfaction.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors duration-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors duration-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              className="hover:text-white transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://wa.me/923247611208?text=Hello%20there!"
              className="hover:text-white transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href="https://www.instagram.com/sh_e_h_za_d/?utm_source=ig_web_button_share_sheet"
              className="hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com"
              className="hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>Faisalabad, Pakistan</p>
          <p>Faisalabad 38000</p>
          <p>Email: support@stephub.com</p>
          <p>Phone: (+92) 324-7611-208</p>
        </div>
      </div>
      <p className="text-center text-xs pt-8">© {new Date().getFullYear()} StepHub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
