import "./ClassSection.scss";
import "./MethodSection.scss";
import React from "react";

export default class MethodSection extends React.Component
{
   render()
   {
      let title = this.props.title;
      let methods = this.props.methods;
      let showSimpleName = true;
      return <div className={methods && methods.length != 0 ? "method-class-section-item-container class-section-item-container" : "uk-hidden"}>
         <h3>{title}</h3>
         {methods && methods.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"classmethodsection"+index}>
               {item.tags && item.tags.length > 0 && this.renderTags(item.tags)}
               {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
               <div className="uk-width-1-1 uk-text-break signature" 
                    dangerouslySetInnerHTML={{__html:showSimpleName?item.simpleSignature:item.signature}}>
               </div>
               <div className="uk-width-1-1 uk-width-3-4@s uk-text-break"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }

   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-text-break">
         {tags.map((tag, index) => 
            <span className="uk-label uk-label-success" key = {"classmethodsectiontags"+index}>{tag}</span>)}
      </div>;
   }

   renderTemplateParams(tplParamsString)
   {
      let params = "template &lt;" +tplParamsString + "&gt";
      return <div className="uk-width-1-1 tpl-params" dangerouslySetInnerHTML={{__html:params}}/>;
   }
};