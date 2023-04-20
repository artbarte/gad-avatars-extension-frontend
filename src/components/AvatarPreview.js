import React from "react";

import debounce from "lodash.debounce"

import { convertPartNametoURLs } from "./helpers/helper";

import reset from "/public/img/buttons_vx0001.png"
import confirm from "/public/img/buttons_vx0002.png"


const AvatarPreview = ({ partsOnAvatar,previewParts, setAvatar, cooldown, resetAvatar, refreshing, flashPart}) => {

  const avatarParts = previewParts;
  Object.keys(avatarParts).forEach(function(key, index) {
    if (!avatarParts[key]) {
      avatarParts[key] = partsOnAvatar[key];
    }
  });
  
 

  
  let headtop = convertPartNametoURLs(avatarParts.headtop, "headtop")[0];
  // SPECIAL CASE
  if (avatarParts.headtop == "none") headtop =  "" ;
  
  const head = convertPartNametoURLs(avatarParts.head, "head")[0];
  
  const armsParts = convertPartNametoURLs(avatarParts.arms, "arms");
  const armL = armsParts[0];
  const armR = armsParts[1];

  const torso = convertPartNametoURLs(avatarParts.torso, "torso")[0];

  const legsParts = convertPartNametoURLs(avatarParts.legs, "legs");
  const legL = legsParts[0];
  const legR = legsParts[1];
  const belt = legsParts[2];
  const crotch = legsParts[3];

  // const flashHandler = (e, type) => {
    
  //   console.log(flashPart)
  //   if (flashPart != type) return
    
  //   console.log("flash"); 
  //   e.target.classList.add("flash"); 
  //   setTimeout(() => {
  //     e.target.classList.remove("flash");
  // }, 300);}

  function shouldFlash(type) {
    if (flashPart == type) return "flash";
    else return "";
  }

  const debouncedSetAvatar = React.useCallback(
    debounce(setAvatar, 500)
  , []);
  
  const debouncedResetAvatar = React.useCallback(
    debounce(resetAvatar, 500)
  , []);


  return (
    <div id="avatarpreview" >
      <div id="preview-scaler">
        {!avatarParts.head ? (
          <div></div>
        ) : (
          <>
            <img className={`part-preview armL ${shouldFlash("arms")}`} src={armL} />
            <img className={`part-preview legL ${shouldFlash("legs")}`} src={legL}/>
            <img className={`part-preview crotch ${shouldFlash("legs")}`} src={crotch}/>
            <img className={`part-preview legR ${shouldFlash("legs")}`} src={legR}/>
            <img className={`part-preview belt ${shouldFlash("legs")}`} src={belt}/>
            <img className={`part-preview torso ${shouldFlash("torso")}`} src={torso}/>
            <img className={`part-preview head ${shouldFlash("head")}`} src={head}/>
            <img className={`part-preview headtop ${shouldFlash("headtop")}`} src={headtop}/>
            <img className={`part-preview armR ${shouldFlash("arms")}`} src={armR}/>
          </>
        )}
      </div>
      <div id="avatar-button-bar">
        <button id="confirmbutton" className={`action-button ${cooldown != 0 ? "disabled" : ""}`} onClick={() => debouncedSetAvatar(partsOnAvatar)}>
          <img src={confirm}/>
        </button>
        <button id="reset-button" className={`action-button ${refreshing ? "refreshing" : ""} ${cooldown != 0 ? "disabled" : ""}`} onClick={() => debouncedResetAvatar()}>
        <img src={reset}/>
        </button>
      </div>
    </div>
  );
};

export default AvatarPreview;
