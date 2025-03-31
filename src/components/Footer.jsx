import React, { useEffect, useState } from "react";
import "@/styles/Footer.css";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub, FaInstagramSquare, FaItchIo, FaYoutube } from "react-icons/fa";

const Iconmap = {
  X: FaSquareXTwitter,
  Github: FaGithub,
  Instagram: FaInstagramSquare,
  Itch: FaItchIo,
  Youtube: FaYoutube,
};

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState([]);

  useEffect(() => {
    fetch("/data/footer_links.json") // Adjust the path if needed
      .then((response) => response.json())
      .then((data) => setFooterLinks(data))
      .catch((error) => console.error("Error loading footer links:", error));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-icons">
        {footerLinks.map((link) => {
          const IconComponent = Iconmap[link.icon]; // Get the corresponding React Icon
          return (
            <a
              key={link.id}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-link"
            >
              {IconComponent && <IconComponent className="footer-icon t-color-gray" />}
            </a>
          );
        })}
      </div>
      <p className="footer-text">© 2025 Maziminds. All rights reserved.</p>
    </footer>
  );
}
