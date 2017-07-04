import React from "react";
import "./Path.scss";

export default class Path extends React.Component
{
   render()
   {
      return <div>
         <div className="nav-path uk-flex uk-flex-left uk-text-break uk-visible@s">
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
         </div>
         <div className="nav-path-grid uk-hidden@s uk-grid-collapse uk-margin-small-bottom" data-uk-grid>
            {this.props.pathList.map((item, index)=>{
                  if(item.url) {
                     return <div className="uk-width-1-1" key={index}><span data-uk-icon="icon: link"></span><a href={item.url}>{item.name}</a></div>;
                  } else {
                     return <div key={index} className="uk-width-1-1 uk-disabled"><a href="#">{item.name}</a></div>;
                  }
               }
            )}
         </div>
      </div>;
   }
};