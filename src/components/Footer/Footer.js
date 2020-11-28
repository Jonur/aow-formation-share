import React from "react";
import s from "./Footer.module.scss";

const Footer = () => (
  <footer className={s.footer}>
    <p>
      &copy;{`${new Date().getFullYear()} - `}
      <a
        className={s.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/Jonur"
        alt="Jonur on Github"
      >
        Created by GRL Jonur
      </a>
    </p>
    <p>Made with &#10084; by the Greek Legends clan</p>
    <p>
      <a
        className={s.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/Jonur/aow-formation-share/blob/main/PrivacyPolicy.md"
        alt="Application Privacy Policy"
      >
        Privacy
      </a>
      {` - `}
      <a
        className={s.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/Jonur/aow-formation-share#credits"
        alt="Credits"
      >
        Credits
      </a>
    </p>
  </footer>
);

export default Footer;
