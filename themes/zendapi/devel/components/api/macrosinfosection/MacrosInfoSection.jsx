import "../scss/BaseInfoSection.scss";
import "./MacrosInfoSection.scss";
import React from "react";
import linkSvg from "../images/link.svg";

export default class MacrosInfoSection extends React.Component
{
   render()
   {
      let macros = this.props.macros;
      return <div className={macros.length != 0 ? "uk-margin-medium-top info-section-container macro-info-section-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>宏定义详细文档</h3>
         </div>
         {macros.map((item, index) => 
            <div className="section-item uk-margin-medium-bottom" key = {"macroinfosectionitem"+index}>
               <div className="uk-flex uk-flex-wrap section-item-name">
                  <div className="uk-width-1-1"><img src={linkSvg}/><span>{item.name}</span></div>
               </div>
               <div className="uk-background-muted uk-text-break definition">
                  dsalkfjalskdjfaksjdflkasjdflasd
                  kshjdfkjahsdfkjhsajdfhas
               </div>
            </div>
         )}
      </div>;
   }
};