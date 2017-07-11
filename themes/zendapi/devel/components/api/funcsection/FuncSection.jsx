import "./FuncSection.scss";
import React from "react";

export default class FuncSection extends React.Component
{
   render()
   {
      let funcs = this.props.funcs;
      let showSimpleName = !!this.props.showSimpleName;
      return <div className={funcs.length != 0 ? "section-item-container func-section-container" : "uk-hidden"}>
         <h3>函数列表</h3>
         {funcs.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"funcsection"+index}>
               {item.tags.length > 0 && this.renderTags(item.tags)}
               {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
               <div className="uk-width-1-1 uk-text-break signature" dangerouslySetInnerHTML={{__html:showSimpleName?item.simpleSignature:item.signature}}>
               </div>
               <div className="uk-width-1-1 uk-width-3-4@s uk-text-break"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }

   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-text-break">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"funcsectiontags"+index}>{tag}</span>)}
      </div>;
   }

   renderTemplateParams(tplParamsString)
   {
      let params = "template &lt;" +tplParamsString + "&gt";
      return <div className="uk-width-1-1 tpl-params" dangerouslySetInnerHTML={{__html:params}}/>;
   }
};