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
               <a id={item.id}/>
               <div className="uk-flex uk-flex-wrap section-item-name">
                  <div className="uk-width-1-1">
                     <a href={"#"+item.id}><img src={linkSvg}/></a>
                     <span>{item.name}</span></div>
               </div>
               <div className="uk-background-muted uk-text-break macro-definition definition uk-flex uk-flex-left uk-flex-wrap">
                  <span className="define-keyword">#define</span> 
                  <span className="uk-text-break name">
                     {item.name}
                     {item.params && item.params.length > 0 && "( " +item.paramsString + " )"}
                  </span>
                  {this.shouldRenderInitializer(item.initializer) && <div className="define uk-text-primary" dangerouslySetInnerHTML={{__html:item.initializer}}></div>}
               </div>
            </div>
         )}
      </div>;
   }
   shouldRenderInitializer(initializer)
   {
      return initializer && initializer.indexOf("\n") == -1;
   }
};