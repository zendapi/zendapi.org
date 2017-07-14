import "../scss/BaseInfoSection.scss";
import "./ClassSection.scss";
import "./MethodInfoSection.scss";
import React from "react";
import linkSvg from "../images/link.svg";

export default class MethodInfoSection extends React.Component
{
   render()
   {
      let methods = this.props.methods || [];
      let tobeRendered = [];
      let showConstructorAndDestructor = this.props.showConstructorAndDestructor;
      if (!showConstructorAndDestructor) {
         methods.map(function (method)
         {
            if (method) {
               if (!method.isConstructor && !method.isDestructor) {
                  tobeRendered.push(method);
               }
            }
         });
      } else {
         tobeRendered = methods;
      }
      let title = this.props.title;
      return <div className={tobeRendered.length != 0 ? "uk-margin-medium-top class-info-section-item-container function-section-info-item-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>{title}</h3>
         </div>
         {tobeRendered.map((item, index) =>
            <div className="section-item uk-margin-medium-bottom" key = {"classmethodinfosectionitem"+index}>
               <a id={item.id}/>
               <div className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-margin-small-top section-item-name-wrapper">
                  <div className="uk-width-1-1 uk-width-1-2@s section-item-name">
                     <a href={"#"+item.id}><img src={linkSvg}/></a>
                     <span>{item.simpleName || item.name}()</span></div>
                  {item.tags && item.tags.length > 0 && this.renderTags(item.tags)}
               </div>
               <div className="uk-background-muted uk-text-break uk-margin-small-top method-definition definition"
                    dangerouslySetInnerHTML={{__html:item.signature}}>
               </div>
               {item.briefDescription.length > 0 && <div className="uk-margin-small-top uk-text-break"
                                                         dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>}
               {item.detailDescription.length > 0 && <div className="uk-margin-small-top uk-text-break"
                                                          dangerouslySetInnerHTML={{__html:item.detailDescription}}></div>}
               <div className="uk-margin-small-top uk-text-break">
                  在文件 <span className="uk-text-success">{item.location.file.substring(8)}</span> 的第 <span className="uk-text-success">{item.location.line}</span> 行定义
               </div>
            </div>
         )}
      </div>;
   }

   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-width-1-2@s tags uk-flex uk-flex-left uk-flex-right@s uk-text-middle uk-flex-wrap-around">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"funcsinfosectiontags"+index}>{tag}</span>)}
      </div>;
   }
};