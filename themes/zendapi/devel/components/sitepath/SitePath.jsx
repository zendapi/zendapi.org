import React from "react";
import "./SitePath.scss";

export default class SitePath extends React.Component
{
   render()
   {
      return <div className="uk-margin-small-bottom site-path uk-visible@s uk-flex uk-flex-left">
         <div data-uk-icon="icon: home"/>
         <ul className="uk-breadcrumb">
            {this.props.pathList.map((item, index)=>{
               if(item.url) {
                  return <li key={index}><a href={item.url}>{item.name}</a></li>;
               } else {
                  return <li key={index} className="uk-disabled"><a href="#">{item.name}</a></li>;
               }
               }
            )}
         </ul>
      </div>;
   }
};