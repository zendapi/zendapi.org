import "../scss/BaseInfoSection.scss";
import "./FuncsInfoSection.scss";
import React from "react";
import linkSvg from "../images/link.svg";

export default class FuncsInfoSection extends React.Component
{
   render()
   {
      let funcs = this.props.funcs;
      let cid = this.props.containerId;
      let tobeRendered = [];
      funcs.map(function (item)
      {
         if (item.containerId == cid) {
            tobeRendered.push(item);
         }
      });
      return <div className={tobeRendered.length != 0 ? "uk-margin-medium-top info-section-container funcs-info-section-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>函数类型详细文档</h3>
         </div>
         {tobeRendered.map((item, index) =>
            <div className="section-item uk-margin-medium-bottom" key = {"funcsinfosectionitem"+index}>
               <a id={item.id}/>
               <div className="uk-flex uk-flex-wrap uk-flex-wrap-around section-item-name-wrapper">
                  <div className="uk-width-1-1 uk-width-1-2@s section-item-name">
                     <a href={"#"+item.id}><img src={linkSvg}/></a>
                     <span>{item.simpleName || item.name}()</span></div>
                  {item.tags && item.tags.length > 0 && this.renderTags(item.tags)}
               </div>
               <div className="uk-background-muted uk-text-break func-definition definition"
                  dangerouslySetInnerHTML={{__html:item.signature}}>
               </div>
               <div className="uk-text-break">
                  #include &lt;<a href={item.containerRef.url}>{item.location.file}</a>&gt;
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
   
   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-width-1-2@s tags uk-flex uk-flex-right uk-text-middle">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"funcsinfosectiontags"+index}>{tag}</span>)}
      </div>;
   }
};