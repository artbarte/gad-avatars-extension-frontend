import { useEffect, useRef, useState } from "react";
import AvatarPreview from "../AvatarPreview";
import { partNameToIndex } from "../helpers/helper";
import { ITabCategories, IUserData } from "../helpers/types";
import PartChooser from "../PartChooser";
import Stats from "../Stats";
import ButtonBar from "../Topbar";

// import "./App.css";


const ROOT_URL = "https://avatar.rzulty.monster/garderoba-v3/";

interface AvatarParts {
  headtop: string
    head: string
    torso: string
    arms: string
    legs: string
}

const App = () => {
  const [userAuth, setUserAuth] = useState<Twitch.ext.Authorized | undefined>(undefined);


  const [cooldown, setCooldown] = useState(0);
  const [flashPart, setFlashPart] = useState("");

  useEffect(() => {
    // exit early when we reach 0
    if (!cooldown) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setCooldown(cooldown - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [cooldown]);


  useEffect(()=>{
    window.Twitch.ext.onAuthorized(function (auth: Twitch.ext.Authorized) {
      console.log("The JWT that will be passed to the EBS is", auth.token);
      console.log("The channel ID is", auth.channelId);
      setUserAuth(auth);
      console.log(auth);
    });

    FetchUserData();
  },[userAuth])
  

  const [userData, setUserData] = useState<IUserData | undefined>(undefined);
  const [dataFetching, setDataFetching] = useState<boolean>(false);

  const avatarStructTemplate:AvatarParts = {
    headtop: "",
    head: "",
    torso: "",
    arms: "",
    legs: "",
  };

  const [previewParts, setPreviewParts] = useState<AvatarParts>(avatarStructTemplate)

  const savedUserData = useRef(null);
  
  // useEffect(()=>{
  //   savedUserData.current = userData;
  // },[])

  function FetchUserData(): IUserData | void {
    if (!userAuth) {
      requestIDShare();
      return;
    }
    const apiURL = `${ROOT_URL}api.php?operation=fetchparts`;

    // setCooldown(10);
    setDataFetching(true);
    fetch(apiURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userAuth.token,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUserData(data);
        savedUserData.current = data;
      })
      .catch((error) => {
        console.log("Error:", error);
      })
      .finally(()=>{
        setDataFetching(false);

      });

  }

  function requestIDShare() {
    window.Twitch.ext.actions.requestIdShare();
  }

  

  const currentAvatar = userData ? {
    headtop: userData.currentheadtop,
    head: userData.currenthead,
    arms: userData.currentarms,
    legs: userData.currentlegs,
    torso: userData.currenttorso,
  }
  : {
    headtop: undefined,
    head: undefined,
    arms: undefined,
    legs: undefined,
    torso: undefined
  };


  
  const [currentPartTab, setCurrentPartTab] = useState<ITabCategories>("headtop");


  const availableParts = userData
    ? {
        headtop: userData["headtops"],
        head: userData["heads"],
        torso: userData["torsos"],
        legs: userData["legs"],
        arms: userData["arms"],
      }
    : { headtop: [], head: [], torso: [], legs: [], arms: [] };

  function setAvatarPart(partname, type) {
    setFlashPart(type)
    setTimeout(() => {
      setFlashPart("")
    }, 300);


    switch (type) {
      case "head":
        setUserData({
          ...userData,
          currenthead: partname,
        });
        break;
      case "headtop":
        setUserData({
          ...userData,
          currentheadtop: partname,
        });
        break;
      case "torso":
        setUserData({
          ...userData,
          currenttorso: partname,
        });
        break;
      case "arms":
        setUserData({
          ...userData,
          currentarms: partname,
        });
        break;
      case "legs":
        setUserData({
          ...userData,
          currentlegs: partname,
        });
        break;

      default:
        break;
    }
  }

  function requestAvatarChange(partsToChange) {
    if (cooldown != 0) return;

    const apiURL = `${ROOT_URL}api.php?operation=setavatar&parts=`;

    const headTopIndex = partNameToIndex(partsToChange.headtop, "headtop", userData)
    const headIndex = partNameToIndex(partsToChange.head, "head", userData)
    const torsoIndex = partNameToIndex(partsToChange.torso, "torso", userData)
    const armsIndex = partNameToIndex(partsToChange.arms, "arms", userData)
    const legsIndex = partNameToIndex(partsToChange.legs, "legs", userData)

    const partsString = [headTopIndex, headIndex, torsoIndex, armsIndex, legsIndex].join(",");

    // setCooldown(10);
    fetch(apiURL+partsString, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userAuth.token,
    })
    savedUserData.current = userData;
  }

  function resetAvatar() {
    setUserData(savedUserData.current);
  }

  function setPreview(partname, type) {
    const obj = {...avatarStructTemplate}
    obj[type] = partname;
    setPreviewParts(obj)
    
    // setAvatarPart(partname,type, true)
  }
  function removePreview(partname, type) {
    setPreviewParts(avatarStructTemplate)
    // setAvatarPart(previewHelper.current[0], previewHelper.current[1])
  }


  if (!userData) {
    return     <div className="App">
      <div id="placeholder">
        <h3 id="placeholder-text">Nie masz jeszcze swojego ludzika. Napisz cos na chatcie albo przyznaj uprawnienia</h3>
        <img id="placeholder-img" src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_9d1a0138756d4ece8857981e5301a7ea/animated/light/3.0"/>
      </div>
    </div>
  }

  return (
    <div className="App">
      <Stats data={userData} />
      <AvatarPreview flashPart={flashPart} setAvatar={requestAvatarChange} partsOnAvatar={currentAvatar} previewParts={previewParts} cooldown={cooldown} refreshing={dataFetching} resetAvatar={FetchUserData} />
      <PartChooser
        parts={availableParts}
        tab={currentPartTab}
        setavatar={setAvatarPart}
        setPreview={setPreview}
        removePreview={removePreview} 
        partsOnAvatar={currentAvatar}
      />
      <ButtonBar setCurrTab={setCurrentPartTab} currTab={currentPartTab}/>
    </div>
  );
};
export default App;
