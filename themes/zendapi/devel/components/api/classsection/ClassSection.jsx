import "./ClassSection.scss";
import React from "react";

export default class ClassSection extends React.Component
{
   render()
   {
      let classes = this.props.classes;
      return <div className={classes.length != 0 ? "class-section-container" : "uk-hidden"}>
         <h3>类列表</h3>
         {classes.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"classsection"+index}>
               <div className="uk-width-1-1 uk-width-1-4@s"><span className="entity-type uk-text-right">{item.isStruct?"struct":"class"}</span><a className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-3-4@s"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }
};