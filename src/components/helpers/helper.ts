import { ITabCategories, IUserData } from "./types";

const rootImgURL = "https://avatar.rzulty.monster/garderoba-v2/brickparts_prv/";

export function convertPartNametoURLs(partname: string, type: ITabCategories) {
  switch (type) {
    case "head":

      return [`${rootImgURL}heads/&head_${partname}_.png`];
    case "headtop":
      return [`${rootImgURL}headtops/&headtop_${partname}_.png`];
    case "torso":
      return [`${rootImgURL}torsos/&torso_${partname}_.png`];
    case "arms":
      return [
        `${rootImgURL}arms_L/&armL_${partname}_.png`,
        `${rootImgURL}arms_R/&armR_${partname}_.png`,
      ];
    case "legs":
      return [
        `${rootImgURL}legs_L/&legL_${partname}_.png`,
        `${rootImgURL}legs_R/&legR_${partname}_.png`,
        `${rootImgURL}belts/&belt_${partname}_.png`,
        `${rootImgURL}crotch/&crotch_${partname}_.png`,
      ];

    default:
      return [""];
  }
}

export function partNameToIndex(
  partname: string,
  type: ITabCategories,
  userdata: IUserData
) {
  switch (type) {
    case "head":
      return userdata.heads.indexOf(partname);
    case "headtop":
      return userdata.headtops.indexOf(partname);
    case "torso":
      return userdata.torsos.indexOf(partname);
    case "arms":
      return userdata.arms.indexOf(partname);
    case "legs":
      return userdata.legs.indexOf(partname);
    default:
      return 0;
  }
}


export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}