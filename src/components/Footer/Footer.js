import React from "react";
import { useSelector } from "react-redux";
import { appSelectors } from "../../redux/app";
import s from "./Footer.module.scss";

const currentYear = new Date().getFullYear();

const Footer = () => {
  const content = useSelector(appSelectors.getLocalisedContent);

  return (
    <footer className={s.footer}>
      <p>
        &copy;{`${currentYear} - `}
        <a
          className={s.link}
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/Jonur"
          alt={content["footer.creator.link.label"]}
        >
          {content["footer.creator.link.alt"]}
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
            title={content["footer.donate.title"]}
            alt={content["footer.donate.alt"]}
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
        {content["footer.donate.reason"]}
      </div>
      <p>
        <a
          className={s.link}
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/Jonur/aow-formation-share/blob/main/PrivacyPolicy.md"
          alt={content["footer.privacy.alt"]}
        >
          {content["footer.privacy.title"]}
        </a>
        {` - `}
        <a
          className={s.link}
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/Jonur/aow-formation-share#credits"
          alt={content["footer.credits.alt"]}
        >
          {content["footer.credits.title"]}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
