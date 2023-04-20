import React, { useState } from "react";

import { convertPartNametoURLs } from "./helpers/helper";

const HeadTopPart = ({ image, partname, onClick, onMouseEnter, active }) => {
  const headTopURL = convertPartNametoURLs(partname, "headtop");

  return (
    <div className={`part headtop ${active ? "active" : ""}`} onClick={onClick} data-partname={partname} onMouseEnter={onMouseEnter} >
      <div className="scaler">
        <img src={headTopURL} />
      </div>
    </div>
  );
};
const HeadPart = ({ image, partname, onClick, onMouseEnter, active }) => {
  const headURL = convertPartNametoURLs(partname, "head");

  return (
    <div className={`part head ${active ? "active" : ""}`} onClick={onClick} data-partname={partname} onMouseEnter={onMouseEnter}>
      <div className="scaler">
        <img src={headURL} />
      </div>
    </div>
  );
};

const TorsoPart = ({ image, partname, onClick, onMouseEnter, active }) => {
  const torsoURL = convertPartNametoURLs(partname, "torso");

  return (
    <div className={`part torso ${active ? "active" : ""}`} onClick={onClick} data-partname={partname} onMouseEnter={onMouseEnter}>
      <div className="scaler">
        <img src={torsoURL} />
      </div>
    </div>
  );
};

const ArmsPart = ({ image, partname, onClick, onMouseEnter, active }) => {
  const parts = convertPartNametoURLs(partname, "arms");
  const armsLeftURL = parts[0];
  const armsRightURL = parts[1];

  return (
    <div className={`part arms ${active ? "active" : ""}`} onClick={onClick} data-partname={partname} onMouseEnter={onMouseEnter}>
      <div className="scaler">
        <img className="arm armleft" src={armsLeftURL} />
        <img className="arm armright" src={armsRightURL} />
      </div>
    </div>
  );
};

const LegsPart = ({ image, partname, onClick, onMouseEnter, active }) => {
  const parts = convertPartNametoURLs(partname, "legs");

  const legLeftURL = parts[0];
  const legRightURL = parts[1];
  const legBeltURL = parts[2];
  const legCrotchURL = parts[3];

  return (
    <div className={`part legs ${active ? "active" : ""}`} onClick={onClick} data-partname={partname} onMouseEnter={onMouseEnter}>
      <div className="scaler">
        <img className="leg legleft" src={legLeftURL} />
        <img className="leg crotch" src={legCrotchURL} />
        <img className="leg legright" src={legRightURL} />
        <img className="leg belt" src={legBeltURL} />
      </div>
    </div>
  );
};

const partsKeys = {
  head: {
    component: HeadPart,
  },
  headtop: {
    component: HeadTopPart,
  },
  torso: {
    component: TorsoPart,
  },
  arms: {
    component: ArmsPart,
  },
  legs: {
    component: LegsPart,
  },
};

const PartChooser = ({ parts, tab, setavatar, setPreview, removePreview, partsOnAvatar  }) => {
  if (!parts || !tab || !parts[tab]) return <div id="partchooser"></div>;


  function clickHandler(e) {
    setavatar(e.currentTarget.dataset["partname"], tab);
  }
  function previewEnterHandler(e) {
    setPreview(e.currentTarget.dataset["partname"], tab);
  }
  function previewLeaveHandler(e) {
    removePreview(e.currentTarget.dataset["partname"], tab);
  }

  const PartComponent = partsKeys[tab].component;

  return (
    <div id="partchooser" onMouseLeave={previewLeaveHandler}>
      {parts[tab].map((i) => (
        <PartComponent active={i == partsOnAvatar[tab]}  key={i} partname={i} onClick={clickHandler} onMouseEnter={previewEnterHandler} />
      ))}
    </div>
  );
};

export default PartChooser;
