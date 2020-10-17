import React, { useCallback, useState } from "react";
import { TYPE_FORMATION } from "../../utils/propTypes";
import s from "./ShareFormation.module.scss";

const ShareFormation = ({ formation }) => {
  const [copyNotification, setCopyNotification] = useState(false);
  const troopsInFormation = Object.keys(formation);

  const createShareableLink = useCallback(() => {
    const formationLink = troopsInFormation.reduce(
      (acc, square, index) =>
        `${acc}${index === 0 ? "?" : "&"}${square}=${formation[square].troop},${
          formation[square].level
        }`,
      `${window.location.origin}`
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

  return (
    <div className={s.shareFormation}>
      <button
        className={s.shareBtn}
        disabled={!troopsInFormation.length}
        onClick={createShareableLink}
      >
        Share Formation
      </button>
      {copyNotification && (
        <span className={s.copyNotification}>Link copied!</span>
      )}
    </div>
  );
};

ShareFormation.propTypes = {
  formation: TYPE_FORMATION,
};

export default ShareFormation;
