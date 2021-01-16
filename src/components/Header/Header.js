import React from "react";
import t from "../../i18n/en.json";
import s from "./Header.module.scss";

const Header = () => (
  <header className={s.header}>
    <h1>{t["header.title"]}</h1>
    <h2>{t["header.subtitle"]}</h2>
  </header>
);

export default Header;
