import React from "react";

export default class Catalog extends React.Component
{ 
   render()
   {
      return <div className="catalog uk-visible@m uk-margin-small-right">
         <ul className="uk-nav-default uk-nav-parent-icon" data-uk-nav="multiple: false">
            <li className="uk-active"><a href="#">Active</a></li>
            <li className="uk-parent">
               <a href="#">Parent</a>
               <ul className="uk-nav-sub">
                  <li><a href="#">Sub item</a></li>
                  <li>
                     <a href="#">Sub item</a>
                     <ul>
                        <li><a href="#">Sub item</a></li>
                        <li><a href="#">Sub item</a></li>
                     </ul>
                  </li>
               </ul>
            </li>
            <li className="uk-parent">
               <a href="#">Parent</a>
               <ul className="uk-nav-sub">
                  <li><a href="#">Sub item</a></li>
                  <li><a href="#">Sub item</a></li>
               </ul>
            </li>
         </ul>
      </div>;
   }
};