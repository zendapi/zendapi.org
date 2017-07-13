import "../scss/BaseInfoSection.scss";
import "./ClassSection.scss";
import "./TypeInfoSection.scss";
import React from "react";
import linkSvg from "../images/link.svg";

export default class TypeInfoSection extends React.Component
{
   render()
   {
      let types = this.props.types || [];
      let title = this.props.title;
      return <div className={types.length != 0 ? "uk-margin-medium-top class-info-section-item-container type-class-info-section-item-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>{title}</h3>
         </div>
         {types.map((item, index) =>
            <div className="section-item uk-margin-medium-bottom" key = {"typedefinfosectionitem"+index}>
               <a id={item.id}/>
               <div className="uk-flex uk-flex-wrap section-item-name-wrapper">
                  <div className="uk-width-1-1 section-item-name">
                     <a href={"#"+item.id}><img src={linkSvg}/></a>
                     <span>{item.simpleName}</span></div>
               </div>
               <div className="uk-background-muted uk-text-break uk-margin-small-top typedef-definition definition uk-flex uk-flex-left uk-flex-wrap">
                  <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:item.definitionWithoutSelfLink}}></div>
               </div>
               {item.briefDescription.length > 0 && <div className="uk-margin-small-top uk-text-break">{item.briefDescription}</div>}
               {item.detailDescription.length > 0 && <div className="uk-margin-small-top uk-text-break">{item.detailDescription}</div>}
               <div className="uk-margin-small-top uk-text-break">
                  在文件 <span className="uk-text-success">{item.location.file.substring(8)}</span> 的第 <span className="uk-text-success">{item.location.line}</span> 行定义
               </div>
            </div>
         )}
      </div>;
   }
};