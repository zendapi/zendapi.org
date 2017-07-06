import "./FuncSection.scss";
import React from "react";

export default class FuncSection extends React.Component
{
   render()
   {
      let funcs = this.props.funcs;
      return <div className={funcs.length != 0 ? "func-section-container" : "uk-hidden"}>
         <h3>函数列表</h3>
         {funcs.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"funcsection"+index}>
               {item.isTemplate && this.renderTemplateParams(item.templateParams)}
               <div className="uk-width-1-1 uk-text-break" dangerouslySetInnerHTML={{__html:item.signature}}>
               </div>
               <div className="uk-width-1-1 uk-width-3-4@s"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }

   renderTemplateParams(templateParams)
   {
      let params = templateParams.map((item) => item.type);
      params = params.join(", ");
      return <div className="uk-width-1-1 uk-text-primary">
         template &lt; {params} &gt;
      </div>;
   }
};