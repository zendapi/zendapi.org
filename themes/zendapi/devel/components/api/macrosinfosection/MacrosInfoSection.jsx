import "../scss/BaseInfoSection.scss";
import "./MacrosInfoSection.scss";
import React from "react";
import linkSvg from "../images/link.svg";

export default class MacrosInfoSection extends React.Component
{
   render()
   {
      let defines = this.props.defines;
      let cid = this.props.containerId;
      let tobeRendered = [];
      defines.map(function (item)
      {
         if (item.containerId == cid) {
            tobeRendered.push(item);
         }
      });
      return <div className={tobeRendered.length != 0 ? "uk-margin-medium-top section-info-item-container macro-section-info-item-container " : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>宏定义详细文档</h3>
         </div>
         {tobeRendered.map((item, index) =>
            <div className="section-item uk-margin-medium-bottom" key = {"macroinfosectionitem"+index}>
               <a id={item.id}/>
               <div className="uk-flex uk-flex-wrap section-item-name-wrapper uk-margin-small-top">
                  <div className="uk-width-1-1 section-item-name">
                     <a href={"#"+item.id}><img src={linkSvg}/></a>
                     <span className="uk-text-break">{item.name}</span></div>
               </div>
               <div className="uk-background-muted uk-margin-small-top uk-text-break macro-definition definition uk-flex uk-flex-left uk-flex-wrap">
                  <span className="define-keyword">#define</span>
                  <div className="uk-text-break name">
                     <span>
                     {item.name}
                        {item.params && item.params.length > 0 && "( " +item.paramsString + " )"}
                  </span>
                  </div>
                  {this.shouldRenderInitializer(item.initializer) && <div className="define uk-text-primary">
                     <span dangerouslySetInnerHTML={{__html:item.initializer}}/>
                  </div>}
               </div>
               <div className="uk-text-break uk-margin-small-top">
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
   shouldRenderInitializer(initializer)
   {
      return initializer && initializer.indexOf("\n") == -1;
   }
};