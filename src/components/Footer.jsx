import React, { useEffect, useState } from "react";
import "@/styles/Footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaInstagram, FaItchIo, FaYoutube } from "react-icons/fa";

const Iconmap = {
  X: FaXTwitter,
  Github: FaGithub,
  Instagram: FaInstagram,
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
              className="special-icon-link"
            >
              {IconComponent && <IconComponent className="special-icon" />}
            </a>
          );
        })}
      </div>
      <p className="footer-text">© 2025 Maziminds. All rights reserved.</p>
    </footer>
  );
}
