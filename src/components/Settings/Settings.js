import React from "react";
import LanguagePicker from "../LanguagePicker";
import Footer from "../Footer";
import ViewPicker from "../ViewPicker";
import s from "./Settings.module.scss";

const Settings = () => {
  return (
    <div className={s.settings}>
      <ViewPicker />
      <LanguagePicker />
      <Footer />
    </div>
  );
};

export default Settings;
