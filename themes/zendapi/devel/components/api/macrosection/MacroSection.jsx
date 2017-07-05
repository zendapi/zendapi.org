import "./MacroSection.scss";
import React from "react";

export default class MacroSection extends React.Component
{
   render()
   {
      let defines = this.props.defines;
      return <div className={defines.length != 0 ? "macro-section-container" : "uk-hidden"}>
         <h3>宏定义列表</h3>
         {defines.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"macrosection"+index}>
               <div className="uk-width-1-1 uk-width-1-4@s">
                  <a className="uk-text-break" href = {item.url}>{item.name}{item.params.length > 0 && this.renderParams(item.params)}</a>
               </div>
               <div className="uk-width-1-1 uk-width-3-4@s">
                  {this.shouldRenderInitializer(item.initializer) && <div className="define uk-text-primary">{item.initializer}</div>}
                  <div>{item.briefDescription}</div>
               </div>
            </div>
         )}
      </div>;
   }

   renderParams(params)
   {
      return <span> ({params.join(", ")})</span>;
   }
   
   shouldRenderInitializer(initializer)
   {
      return initializer.indexOf("\n") == -1;
   }
};