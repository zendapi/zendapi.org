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
      let items = this.props.items;
      let imgs = [
         homeSvg,
         moduleSvg,
         namespaceSvg,
         globalSvg
      ];
      return <ul className="side-panel uk-visible@m" data-uk-sticky="offset: 70">
         {items.map((item, index)=> <li key = {"apicatalog"+index} className={item.isActive && "active-item"}><img src ={imgs[index]}/><a href={item.url}>{item.name}</a></li>)}
      </ul>;
   }
};