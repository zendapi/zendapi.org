import "./Manual.scss";
import React from "react";
import Catalog from "./Catalog";

export default class ManualPanel extends React.Component
{
   render()
   {
      let doc = this.props.doc;
      return <div className="manual-container uk-flex uk-flex-left">
         <Catalog catalog={this.props.catalog}/>
         <div className="uk-width-expand manual-doc-container">
            <h1 className="uk-article-title manual-title">{doc.title}</h1>
            <div className="uk-article manual-content uk-margin-medium-bottom uk-text-break" dangerouslySetInnerHTML={{__html:doc.content.join("\n")}}></div>
         </div>
      </div>;
   }
};