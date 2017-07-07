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
               {item.isTemplate && <div className="uk-width-1-1"><span className="uk-label uk-label-success">template</span></div>}
               {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
               <div className="uk-width-1-1 uk-text-break signature" dangerouslySetInnerHTML={{__html:item.signature}}>
               </div>
               <div className="uk-width-1-1 uk-width-3-4@s uk-text-break"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }

   renderTemplateParams(tplParamsString)
   {
      let params = "template &lt;" +tplParamsString + "&gt";
      return <div className="uk-width-1-1 tpl-params" dangerouslySetInnerHTML={{__html:params}}/>;
   }
};