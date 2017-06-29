import "./SidePanel.scss";
import React from "react";
import homeSvg from "./images/home.svg";
import moduleSvg from "./images/module.svg";
import namespaceSvg from "./images/namespace.svg";
import globalSvg from "./images/global.svg";

export default class SidePanel extends React.Component
{
   render()
   {
      return <div className="side-panel uk-visible@m uk-margin-medium-right">
         <ul>
            <li><img src ={homeSvg}/><a>API手册首页</a></li>
            <li><img src ={moduleSvg}/><a>所有模块</a></li>
            <li><img src ={namespaceSvg}/><a>所有名称空间</a></li>
            <li><img src ={globalSvg}/><a>全局定义</a></li>
         </ul>
      </div>;
   }
};