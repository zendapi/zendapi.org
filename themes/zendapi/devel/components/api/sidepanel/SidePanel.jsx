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
      return <div className="side-panel uk-visible@m uk-margin-medium-right">
         <ul>
            {items.map((item, index)=> <li key = {"apicatalog"+index}><img src ={imgs[index]}/><a href={item.url}>{item.name}</a></li>)}
         </ul>
      </div>;
   }
};