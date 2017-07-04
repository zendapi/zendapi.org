import "./MacroSection.scss";
import React from "react";

export default class MacroSection extends React.Component
{
   render()
   {
      let defines = this.props.defines;
      return <div className={defines.length != 0 ? "macro-section-container" : "uk-hidden"}>
         <h3>宏定义列表</h3>
         {defines.length != 0 ? defines.map((item, index) =>
               <div className="uk-grid-small list-item" data-uk-grid key = {"macrosection"+index}>
                  <div className="uk-width-1-1 uk-width-1-4@s"><a className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-3-4@s"><span>{item.briefDescription}</span></div>
               </div>
            ) : "宏定义为空"}
      </div>;
   }
};