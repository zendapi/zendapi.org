import React from "react";

export default class Catalog extends React.Component
{ 
   render()
   {
      let catalog = this.props.catalog;
      let me = this;
      return <div className="catalog uk-visible@m uk-margin-small-right">
         <ul className="uk-nav-default uk-nav-parent-icon" data-uk-nav="multiple: false">
            {catalog.map(function(parent) {
               let titleCls = "";
               if (parent.children && parent.children.length != 0) {
                  titleCls = "uk-parent";
                  if (parent.isOpen) {
                     titleCls += " uk-open"
                  }
               }
               return <li className={titleCls}>
                     <a>{parent.text}</a>
                  {parent.children && parent.children.length != 0 && me.renderChildren(parent.children)}
                  </li>
            })}
         </ul>
      </div>;
   }
   renderChildren(children)
   {
      return <ul className="uk-nav-sub">
         {children.map((item) => <li className={item.isActive && "uk-active"}><a href="#">{item.text}</a></li>)}
      </ul>;
   }
};