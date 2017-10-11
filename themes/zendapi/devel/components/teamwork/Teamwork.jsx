import React from "react";
import teamSvg from "./images/team.svg";
import "./Teamwork.scss";
import zzusoftboy from "./images/zzu_softboy.jpeg";
import shies from "./images/shies.jpeg";
import liuzhicun from "./images/liuzhicun.png";
import liushuai from "./images/liushuai.png";

export default class Teamwork extends React.Component
{
   render()
   {
      return <div className="teamwork-panel uk-container uk-margin-medium-top uk-margin-medium-bottom uk-flex uk-flex-column">
         <div className="uk-flex uk-flex-center">
            <div className="teamwork-title uk-flex uk-flex-center">
               <img src={teamSvg}/>开发者
            </div>
         </div>
         <div className="uk-flex uk-flex-center uk-margin-small-top">
            <div className="uk-margin-medium-top uk-flex uk-flex-center" data-uk-grid>
               <a className="developer-logo uk-width-auto"><img src={zzusoftboy}/></a>
               <a className="developer-logo uk-width-auto"><img src={liushuai}/></a>
               <a className="developer-logo uk-width-auto"><img src={liuzhicun}/></a>
               <a className="developer-logo uk-width-auto"><img src={shies}/></a>
            </div>
         </div>
         <div className="sponsor-title uk-flex uk-flex-center uk-margin-medium-top">
            <button className="uk-button uk-button-default become-developer-btn">如何成为开发者</button>
         </div>
      </div>;
   }
};