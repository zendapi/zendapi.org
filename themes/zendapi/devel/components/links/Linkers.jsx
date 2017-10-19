import React from "react";
import "./Linkers.scss";
import linkSvg from "./images/link.svg";

export default class Linkers extends React.Component
{
   render()
   {
      return <div className="linkers-panel uk-container uk-margin-large-top uk-flex uk-flex-column">
         <div className="uk-flex uk-flex-center">
            <div className="linker-title uk-flex uk-flex-center">
               <img src={linkSvg}/>友情链接
            </div>
         </div>
         <div className="uk-margin-medium-top uk-grid-collapse uk-child-width-expand@s uk-flex uk-flex-center" data-uk-grid>
            <ul className="uk-text-center uk-text-left@s">
               <li><a href="http://unicorn.360.cn/" target="_blank">360无线电安全研究部</a></li>
            </ul>
            <ul className="uk-text-center uk-text-left@s">
               <li><a href="https://www.75team.com/" target="_blank">360奇舞团</a></li>
            </ul>
            <ul className="uk-text-center uk-text-left@s">
               <li><a href="https://thinkjs.org/" target="_blank">ThinkJS项目官网</a></li>
            </ul>
            <ul className="uk-text-center uk-text-left@s">
               <li><a href="http://www.0xroot.cn/" target="_blank">0xroot (雪碧)</a></li>
            </ul>
         </div>
      </div>;
   }
};