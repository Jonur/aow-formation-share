import React from "react";
import s from "./Footer.module.scss";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className={s.footer}>
    <p>
      &copy;{`${currentYear} - `}
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
    <div className={s.donateRow}>
      <form
        action="https://www.paypal.com/donate"
        method="post"
        target="_top"
        className={s.donateForm}
      >
        <input type="hidden" name="hosted_button_id" value="Z9FMXSQ847WW4" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
      and help me pay for the server!
    </div>
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
