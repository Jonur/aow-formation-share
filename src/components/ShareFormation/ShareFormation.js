import React, { useCallback, useRef, useState } from "react";
import { shape } from "prop-types";
import classNames from "classnames";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { formationSelectors } from "../../redux/formation";
import s from "./ShareFormation.module.scss";

const ShareFormation = ({ troopBoardElement }) => {
  const iOSImageURIRef = useRef();
  const isIOSdevice = /^iP(hone|[ao]d)/.test(navigator.platform);

  const [copyNotification, setCopyNotification] = useState(false);

  const [iOSImageURI, setIOSImageURI] = useState("");

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
    if (troopBoardElement?.current) {
      window.scrollTo(0, 0);

      const myDiv = document.getElementById("formation-board");

      html2canvas(myDiv).then((canvas) => {
        var base64String = canvas.toDataURL();

        const downloadLink = document.createElement("a");
        downloadLink.href = base64String;

        /**
         * @desciption This is a terrible workaround for iOS users, as iOS does not allow for
         * Canvas elements to be downloaded in a custom name and extension, like the .PNG below
         * and instead iPhones save an unexpected "document" file with no extension. This file is
         * in reality the image and should the user appends the PNG file extension it would work.
         * But nobody is going to do that and therefore, we got this open-in-new-tab image solution
         * where the user can download the image with a long press. Still, it does not always work.
         * @todo Remove this and figure out a better solution.
         */
        if (isIOSdevice && !!iOSImageURIRef.current) {
          setIOSImageURI(base64String);
          iOSImageURIRef.current.click();
        }

        if (!isIOSdevice) {
          downloadLink.download = `${uuidv4()}.png`;
          downloadLink.click();
        }
      });
    }
  };

  return (
    <nav className={s.shareFormation}>
      <a
        href={iOSImageURI}
        ref={iOSImageURIRef}
        target="_blank"
        rel="noopener noreferrer"
        className={s.iOSImageURI}
        aria-hidden="true"
      >
        Download Troop Formation for mobile iOS
      </a>
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

ShareFormation.propTypes = {
  troopBoardElement: shape().isRequired,
};

export default ShareFormation;
