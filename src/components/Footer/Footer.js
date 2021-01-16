import React from "react";
import s from "./Footer.module.scss";
import t from "../../i18n/en.json";

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
        alt={t["footer.creator.link.label"]}
      >
        {t["footer.creator.link.alt"]}
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
          title={t["footer.donate.title"]}
          alt={t["footer.donate.alt"]}
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
      {t["footer.donate.reason"]}
    </div>
    <p>
      <a
        className={s.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/Jonur/aow-formation-share/blob/main/PrivacyPolicy.md"
        alt={t["footer.privacy.alt"]}
      >
        {t["footer.privacy.title"]}
      </a>
      {` - `}
      <a
        className={s.link}
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/Jonur/aow-formation-share#credits"
        alt={t["footer.credits.alt"]}
      >
        {t["footer.credits.title"]}
      </a>
    </p>
  </footer>
);

export default Footer;
