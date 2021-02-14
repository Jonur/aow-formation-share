import React from "react";
import LanguagePicker from "../LanguagePicker";
import Footer from "../Footer";
import s from "./Settings.module.scss";

const Settings = () => {
  return (
    <div className={s.settings}>
      <LanguagePicker />
      <Footer />
    </div>
  );
};

export default Settings;
