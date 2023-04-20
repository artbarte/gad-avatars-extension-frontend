
import buttonimg from "../img/button1.png"
import refreshimg from "../img/refresh-icon.png"
import { ITabCategories } from './helpers/types'

import headtopImgIdle from "/public/img/category/CategoryButtons_idle0001.png"
import headtopImgHighlight from "/public/img/category/CategoryButtons_highlight0001.png"
import headtopImgActive from "/public/img/category/CategoryButtons_active0001.png"

const headtopButtonsImgs = [headtopImgIdle, headtopImgHighlight, headtopImgActive];

import headImgIdle from "/public/img/category/CategoryButtons_idle0002.png"
import headImgHighlight from "/public/img/category/CategoryButtons_highlight0002.png"
import headImgActive from "/public/img/category/CategoryButtons_active0002.png"

const headButtonsImgs = [headImgIdle, headImgHighlight, headImgActive];


import topImgIdle from "/public/img/category/CategoryButtons_idle0003.png"
import topImgHighlight from "/public/img/category/CategoryButtons_highlight0003.png"
import topImgActive from "/public/img/category/CategoryButtons_active0003.png"

const topButtonsImgs = [topImgIdle, topImgHighlight, topImgActive];


import armsImgIdle from "/public/img/category/CategoryButtons_idle0004.png"
import armsImgHighlight from "/public/img/category/CategoryButtons_highlight0004.png"
import armsImgActive from "/public/img/category/CategoryButtons_active0004.png"

const armsButtonsImgs = [armsImgIdle, armsImgHighlight, armsImgActive];

import legsImgIdle from "/public/img/category/CategoryButtons_idle0005.png"
import legsImgHighlight from "/public/img/category/CategoryButtons_highlight0005.png"
import legsImgActive from "/public/img/category/CategoryButtons_active0005.png"

const legsButtonsImgs = [legsImgIdle, legsImgHighlight, legsImgActive];


type TopbarProps  = {
    setCurrTab: React.Dispatch<React.SetStateAction<ITabCategories>>
    currTab: ITabCategories;
}


const ButtonBar = ({setCurrTab, currTab}: TopbarProps) => {
    return <div id="buttonbar">
        <button className={`topbutton ${currTab == "headtop" ? "active" : ""}`} id="tophead" onClick={()=> setCurrTab("headtop")}/>
        <button className={`topbutton ${currTab == "head" ? "active" : ""}`} id="head" onClick={()=> setCurrTab("head")}/>
        <button className={`topbutton ${currTab == "torso" ? "active" : ""}`} id="top" onClick={()=> setCurrTab("torso")}/>
        <button className={`topbutton ${currTab == "arms" ? "active" : ""}`} id="arms" onClick={()=> setCurrTab("arms")}/>
        <button className={`topbutton ${currTab == "legs" ? "active" : ""}`} id="legs" onClick={()=> setCurrTab("legs")}/>
        {/* <button className="topbutton" id="accesorry" onClick={()=> setCurrTab("accessory")}/> */}
    </div>
}


export default ButtonBar;