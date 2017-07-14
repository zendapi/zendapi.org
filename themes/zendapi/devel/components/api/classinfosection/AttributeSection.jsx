import "../scss/BaseInfoSection.scss";
import "./ClassSection.scss";
import "./AttributeSection.scss";
import React from "react";

export default class AttributeSection extends React.Component
{
   render()
   {
      let attributes = this.props.attributes || [];
      let title = this.props.title;
      let inherits = this.props.inherits || {};
      let baseClasses = this.props.baseClasses || [];
      return  <div className={attributes && attributes.length != 0 ? "attribute-class-section-item-container class-section-item-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>{title}</h3>
         </div>
         {attributes && this.renderAttributes(attributes)}
         {inherits && this.renderInherits(inherits, baseClasses)}
      </div>
   }

   renderAttributes(attributes)
   {
      return attributes.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key = {"classpropertysection"+index}>
            <div className="uk-width-1-1">
               <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:item.simpleDefineStr}}></div>
               <div className="uk-text-break"
                    dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>
            </div>
         </div>
      )
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
            ret.push(<li className="inherit-item" key = {"classattributesinherititems"+key+i}>
               <div className="uk-accordion-title uk-width-1-1 uk-text-middle uk-text-left">
               <span className="uk-text-break">
                  查看继承自 {key} 类的字段
               </span>
               </div>
               <div className="uk-accordion-content">
                  {this.renderAttributes(inherits[key], true)}
               </div>
            </li>);
         }
      }
      return ret;
   }
};