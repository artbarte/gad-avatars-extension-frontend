import React from "react";

import bricks from "/public/img/block.png"
import starsImg from "/public/img/star.png"
import { nFormatter } from "./helpers/helper";

import { IUserData } from "./helpers/types";

type StatsProps = {
    data: IUserData
}

const Stats = ({data}: StatsProps) => {
    
    const {cash, stars} = data || {};
    
    return <div id="stats">
        <div className="stat-item">
            <img id="bricks-img" src={bricks}/>
            <span>{nFormatter(cash, 1) || 0}</span>
        </div>
        <button className="stat-item stars">
            <span>{stars || 0}</span>
            <img id="stars-img" src={starsImg}/>
        </button>
    </div>
    
}

export default Stats;