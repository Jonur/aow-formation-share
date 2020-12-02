import React, { useCallback, useState } from "react";
import classNames from "classnames";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { formationSelectors } from "../../redux/formation";
import s from "./ShareFormation.module.scss";

const ShareFormation = () => {
  const [copyNotification, setCopyNotification] = useState(false);

  const isFormationEmpty = useSelector(formationSelectors.getIsFormationEmpty);
  const formationLink = useSelector(formationSelectors.getFormationLink);

  const createShareableLink = useCallback(() => {
    const newTextarea = document.createElement("textarea");
    newTextarea.id = "formation-link";
    newTextarea.value = formationLink;
    document.body.appendChild(newTextarea);
    newTextarea.select();
    document.execCommand("copy");
    newTextarea.remove();

    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 4000);
  }, [formationLink]);

  const screenshotAndDownload = () => {
    const myDiv = document.getElementById("formation-board");

    html2canvas(myDiv).then((canvas) => {
      var base64String = canvas.toDataURL();

      const downloadLink = document.createElement("a");
      downloadLink.href = base64String;
      downloadLink.download = `${uuidv4()}.png`;
      downloadLink.click();
    });
  };

  return (
    <nav className={s.shareFormation}>
      <button
        className={classNames(s.btn, s.shareBtn)}
        disabled={isFormationEmpty}
        onClick={createShareableLink}
      >
        Share Formation
      </button>
      <button
        className={classNames(s.btn, s.screenAndDl)}
        onClick={screenshotAndDownload}
        disabled={isFormationEmpty}
      >
        Screenshot &amp; Download
      </button>

      {copyNotification && (
        <span className={s.copyNotification}>
          The shareable link has been <strong>copied to your clipboard</strong>.
          You can paste it anywhere to share it!
        </span>
      )}
    </nav>
  );
};

export default ShareFormation;
