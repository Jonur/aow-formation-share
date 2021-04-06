import React from "react";
import { useSelector } from "react-redux";
import { appSelectors } from "../../redux/app";
import s from "./Header.module.scss";

const Header = () => {
  const content = useSelector(appSelectors.getLocalisedContent);

  return (
    <header className={s.header}>
      <h1>{content["header.title"]}</h1>
      <h2>{content["header.subtitle"]}</h2>
    </header>
  );
};

export default Header;
