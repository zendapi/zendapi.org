import "./NamespaceSection.scss";
import React from "react";

export default class NamespaceSection extends React.Component
{
   render()
   {
      let namespaces = this.props.namespaces;
      return <div className={namespaces.length != 0 ? "namespace-section-container" : "uk-hidden"}>
         <h3>名称空间列表</h3>
         {namespaces.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"namespacesection"+index}>
               <div className="uk-width-1-1 uk-width-1-4@s"><a className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-3-4@s"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }
};