import "./ClassSection.scss";
import "./TypeSection.scss";
import React from "react";

export default class TypeSection extends React.Component
{
   render()
   {
      let types = this.props.types;
      let showSimpleName = true;
      let title = this.props.title;
      let inherits = this.props.inherits || {};
      let baseClasses = this.props.baseClasses || [];
      return  <div className={types && types.length != 0 ? "type-class-section-item-container class-section-item-container" : "uk-hidden"}>
         <h3>{title}</h3>
         {types && this.renderTypes(types, showSimpleName)}
         {inherits && this.renderInherits(inherits, baseClasses)}
      </div>
   }

   renderTypes(types, showSimpleName)
   {
      return types.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key = {"classtypesection"+index}>
            <div className="uk-width-1-1">
               <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:showSimpleName? item.simpleDefinition : item.definition}}></div>
               <div className="uk-text-break">{item.briefDescription}</div>
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
            ret.push(<li className="inherit-item" key = {"classtypesinherititems"+key+i}>
               <div className="uk-accordion-title uk-width-1-1 uk-text-middle uk-text-left">
               <span className="uk-text-break">
                  查看继承自 {key} 类的类型
               </span>
               </div>
               <div className="uk-accordion-content">
                  {this.renderTypes(inherits[key], true)}
               </div>
            </li>);
         }
      }
      return ret;
   }
};