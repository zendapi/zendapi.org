import "../scss/BaseInfoSection.scss";
import "./EnumsInfoSection.scss";
import React from "react";
import linkSvg from "../images/link.svg";

export default class EnumsInfoSection extends React.Component
{
   render()
   {
      let enums = this.props.enums;
      return <div className={enums.length != 0 ? "uk-margin-medium-top info-section-container enum-info-section-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>枚举类型详细文档</h3>
         </div>
         {enums.map((item, index) =>
            <div className="section-item uk-margin-medium-bottom" key = {"enuminfosectionitem"+index}>
               <a id={item.id}/>
               <div className="uk-flex uk-flex-wrap section-item-name">
                  <div className="uk-width-1-2">
                     <a href={"#"+item.id}><img src={linkSvg}/></a>
                     <span>{item.name}</span></div>
                  {item.tags && item.tags.length > 0 && this.renderTags(item.tags)}
               </div>
               <div className="uk-background-muted uk-text-break enum-definition definition uk-flex uk-flex-left uk-flex-wrap">
                  enum&nbsp;{item.name}&nbsp;{item.isStrong && " : "+item.underType}
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
      return <div className="uk-width-1-2 tags uk-flex uk-flex-right uk-text-middle">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"enumsinfosectiontags"+index}>{tag}</span>)}
      </div>;
   }
};