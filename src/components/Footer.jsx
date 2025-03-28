import React, { useEffect, useState } from "react";
import "@/styles/Footer.css";

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
        {footerLinks.map((link) => (
          <a key={link.id} href={link.link} target="_blank" rel="noopener noreferrer">
            <img src={link.icon} alt="Footer Icon" className="footer-icon" />
          </a>
        ))}
      </div>
      <p className="footer-text">© 2025 Maziminds. All rights reserved.</p>
    </footer>
  );
}
