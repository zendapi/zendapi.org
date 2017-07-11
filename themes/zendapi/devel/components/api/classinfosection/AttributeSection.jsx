import "./ClassSection.scss";
import "./AttributeSection.scss";
import React from "react";

export default class AttributeSection extends React.Component
{
   render()
   {
      let attributes = this.props.attributes;
      let title = this.props.title;
      return  <div className={attributes && attributes.length != 0 ? "attribute-class-section-item-container class-section-item-container" : "uk-hidden"}>
         <h3>{title}</h3>
         {attributes && attributes.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"classpropertysection"+index}>
               <div className="uk-width-1-1">
                  <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:item.simpleDefineStr}}></div>
                  <div className="uk-text-break">{item.briefDescription}</div>
               </div>
            </div>
         )}
      </div>
   }
};