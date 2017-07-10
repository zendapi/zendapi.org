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
               <div className="uk-width-1-1 uk-flex uk-flex-left uk-text-break uk-flex-wrap">
                  <a className="uk-text-break name page-scroll-trigger" href = {item.url}>{item.name}{item.params && item.params.length > 0 && this.renderParams(item.paramsString)}</a>
                  {this.shouldRenderInitializer(item.initializer) && <div className="define uk-text-break uk-text-primary" dangerouslySetInnerHTML={{__html:item.initializer}}></div>}
               </div>
               <div className="uk-width-1-1">
                  <div className="uk-text-break">{item.briefDescription}</div>
               </div>
            </div>
         )}
      </div>;
   }
   
   
   renderParams(params)
   {
      return <span> ({params})</span>;
   }
   
   shouldRenderInitializer(initializer)
   {
      return initializer && initializer.indexOf("\n") == -1;
   }
};