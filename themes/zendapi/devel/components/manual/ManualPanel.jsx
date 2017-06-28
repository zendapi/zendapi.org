import "./Manual.scss";
import React from "react";
import Catalog from "./Catalog";

export default class ManualPanel extends React.Component
{
   render()
   {
      return <div className="manual-container uk-flex uk-flex-left">
         <Catalog catalog={this.props.catalog}/>
         <div className="content uk-width-expand">content</div>
      </div>;
   }
};