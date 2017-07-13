import "./ClassSection.scss";
import "./MethodSection.scss";
import React from "react";

export default class MethodSection extends React.Component
{
   render()
   {
      let title = this.props.title;
      let methods = this.props.methods;
      let inherits = this.props.inherits || {};
      let showSimpleName = true;
      let baseClasses = this.props.baseClasses || [];
      return <div className={methods && methods.length != 0 ? "method-class-section-item-container class-section-item-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>{title}</h3>
         </div>
         {methods && this.renderMethods(methods, showSimpleName)}
         {inherits && this.renderInherits(inherits, baseClasses)}
      </div>;
   }

   renderMethods(methods, showSimpleName)
   {
      return methods.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key = {"classmethodsection"+index}>

            {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
            <div className="uk-width-1-1 uk-text-break signature"
                 dangerouslySetInnerHTML={{__html:showSimpleName?item.simpleSignature:item.signature}}>
            </div>
            <div className="uk-width-1-1 uk-width-3-4@s uk-text-break"><span>{item.briefDescription}</span></div>
         </div>
      );
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

   renderInherits(inherits, baseClasses)
   {
      return <ul data-uk-accordion="multiple: true" className="uk-margin-medium-top inherits-container">
         {this.renderInheritItems(inherits, baseClasses)}
      </ul>
   }

   renderInheritItems(inherits, baseClasses)
   {
      let ret = [];
      for (let i = 0; i < baseClasses.length; i++) {
         let baseCls = baseClasses[i];
         let key = baseCls.name;
         if (inherits[key]) {
            ret.push(<li className="inherit-item" key = {"classmethodinherititems"+key+i}>
               <div className="uk-accordion-title uk-width-1-1 uk-text-middle uk-text-left">
               <span className="uk-text-break">
                  查看继承自 {key} 类的方法
               </span>
               </div>
               <div className="uk-accordion-content">
                  {this.renderMethods(inherits[key], true)}
               </div>
            </li>);
         }
      }
      return ret;
   }
};