import React from "react";
import s from "./Footer.module.scss";

const Footer = () => (
  <footer className={s.footer}>
    &copy;{`${new Date().getFullYear()} - `}
    <a
      className={s.link}
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/Jonur"
      alt="Jonur on Github"
    >
      Jonur
    </a>
  </footer>
);

export default Footer;
