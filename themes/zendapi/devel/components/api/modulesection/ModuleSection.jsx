import "./ModuleSection.scss";
import React from "react";

export default class ModuleSection extends React.Component
{
   render()
   {
      let modules = this.props.modules;
      return <div className={modules.length != 0 ? "module-section-container": "uk-hidden"}>
         <h3>子模块列表</h3>
         {modules.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"modulesection"+index}>
               <div className="uk-width-1-1 uk-width-1-4@s"><a className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-3-4@s"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }
};