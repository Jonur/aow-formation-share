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
      Created by Jonur
    </a>
    {` - `}
    <a
      className={s.link}
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/Jonur/aow-formation-share/blob/main/PrivacyPolicy.md"
      alt="Application Privacy Policy"
    >
      Privacy Policy
    </a>
    {` - `}
    <a
      className={s.link}
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/Jonur/aow-formation-share#credits"
      alt="Credits"
    >
      Credit Info
    </a>
  </footer>
);

export default Footer;
