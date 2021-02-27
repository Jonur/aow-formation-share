import React, { useCallback, useRef, useState } from "react";
import { shape } from "prop-types";
import classNames from "classnames";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { barracksSelectors } from "../../redux/barracks";
import { appActions, appSelectors } from "../../redux/app";
import { formationActions, formationSelectors } from "../../redux/formation";
import s from "./FormationToolbar.module.scss";

const FormationToolbar = ({ troopBoardElement }) => {
  const dispatch = useDispatch();
  const iOSImageURIRef = useRef();
  const isIOSdevice = /^iP(hone|[ao]d)/.test(navigator.platform);

  const [iOSImageURI, setIOSImageURI] = useState("");

  const isFormationEmpty = useSelector(formationSelectors.getIsFormationEmpty);
  const content = useSelector(appSelectors.getLocalisedContent);
  const barracksTroops = useSelector(barracksSelectors.getBarracksTroops);

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

  const handleClearFormation = useCallback(
    () => dispatch(formationActions.emptyFormationBoard()),
    [dispatch]
  );

  return (
    <nav className={s.formationToolbar}>
      {isIOSdevice && (
        <a
          href={iOSImageURI}
          ref={iOSImageURIRef}
          target="_blank"
          rel="noopener noreferrer"
          className={s.iOSImageURI}
          aria-hidden="true"
        >
          {content["button.label.iosImageDownload"]}
        </a>
      )}

      <div className={s.primaryTools}>
        <button
          aria-label={content["button.label.formationAndBarracksShare"]}
          className={classNames(s.btn, s.shareBtn)}
          disabled={isFormationEmpty && !barracksTroops.length}
          onClick={() => dispatch(appActions.createShareableLink())}
        >
          <i className="fas fa-share-square"></i>
        </button>
        <button
          aria-label={content["button.label.screenshotDownload"]}
          className={classNames(s.btn, s.screenAndDl)}
          onClick={screenshotAndDownload}
          disabled={isFormationEmpty}
        >
          <i className="fas fa-download"></i>
        </button>
      </div>

      <div className={s.secondaryTools}>
        <button
          aria-label={content["button.label.emptyFormation"]}
          className={classNames(s.btn, s.emptyFormation)}
          disabled={isFormationEmpty}
          onClick={handleClearFormation}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </nav>
  );
};

FormationToolbar.propTypes = {
  troopBoardElement: shape().isRequired,
};

export default FormationToolbar;
