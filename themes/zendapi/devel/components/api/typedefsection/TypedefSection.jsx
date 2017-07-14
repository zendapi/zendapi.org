import "./TypedefSection.scss";
import React from "react";

export default class TypedefSection extends React.Component
{
   render()
   {
      let typedefs = this.props.typedefs;
      let showSimpleName = !!this.props.showSimpleName;
      return <div className={typedefs.length != 0 ? "section-item-container typedef-section-container" : "uk-hidden"}>
         <h3>Typedef 定义列表</h3>
         {typedefs.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"typedefsection"+index}>
               <div className="uk-width-1-1">
                  <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:showSimpleName? item.simpleDefinition : item.definition}}></div>
                  <div className="uk-text-break"
                       dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>
               </div>
            </div>
         )}
      </div>;
   }
};