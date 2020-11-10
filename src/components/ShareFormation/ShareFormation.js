import React, { useCallback, useState } from "react";
import classNames from "classnames";
import * as htmlToImage from "html-to-image";
import { v4 as uuidv4 } from "uuid";
import download from "downloadjs";
import { TYPE_FORMATION } from "../../utils/propTypes";
import troopHashMap from "../../utils/getTroopHashMap";
import s from "./ShareFormation.module.scss";

const ShareFormation = ({ formation }) => {
  const [copyNotification, setCopyNotification] = useState(false);
  const troopsInFormation = Object.keys(formation);

  const createShareableLink = useCallback(() => {
    const formationLink = troopsInFormation.reduce(
      (acc, square) =>
        `${acc}&${square}=${troopHashMap[formation[square].troop].id},${
          formation[square].level
        }`,
      `${window.location.origin}?v=2`
    );

    const newTextarea = document.createElement("textarea");
    newTextarea.id = "formation-link";
    newTextarea.value = formationLink;
    document.body.appendChild(newTextarea);
    newTextarea.select();
    document.execCommand("copy");
    newTextarea.remove();

    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 3000);
  }, [formation, troopsInFormation]);

  const screenshotAndDownload = useCallback(
    () =>
      htmlToImage
        .toJpeg(document.getElementById("formation-board"), {
          width: 800,
          height: 800,
        })
        .then((dataUrl) => download(dataUrl, uuidv4())),
    []
  );

  return (
    <nav className={s.shareFormation}>
      <button
        className={classNames(s.btn, s.shareBtn)}
        disabled={!troopsInFormation.length}
        onClick={createShareableLink}
      >
        Share Formation
      </button>
      <button
        className={classNames(s.btn, s.screenAndDl)}
        onClick={screenshotAndDownload}
        disabled={!troopsInFormation.length}
      >
        Screenshot &amp; Download
      </button>
      {copyNotification && (
        <span className={s.copyNotification}>Link copied!</span>
      )}
    </nav>
  );
};

ShareFormation.propTypes = {
  formation: TYPE_FORMATION,
};

export default ShareFormation;
