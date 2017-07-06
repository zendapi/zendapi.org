import "./VariableSection.scss";
import React from "react";

export default class VariableSection extends React.Component
{
   render()
   {
      let variables = this.props.variables;
      return <div className={variables.length != 0 ? "typedef-section-container" : "uk-hidden"}>
         <h3>变量定义列表</h3>
         {variables.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"variablesection"+index}>
               <div className="uk-width-1-1">
                  <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:item.defineStr}}></div>
                  <div className="uk-text-break">{item.briefDescription}</div>
               </div>
            </div>
         )}
      </div>;
   }
};