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
      return  <div className={types.length != 0 ? "type-section-container class-section-item" : "uk-hidden"}>
         <h3>{title}</h3>
         {types && types.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"classtypesection"+index}>
               <div className="uk-width-1-1">
                  <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:showSimpleName? item.simpleDefinition : item.definition}}></div>
                  <div className="uk-text-break">{item.briefDescription}</div>
               </div>
            </div>
         )}
      </div>
   }
};