import React from "react";
import Logo from "../logo/Logo";
import "./Header.scss";

export default class Header extends React.Component
{
   render()
   {
      let items = this.props.items;
      return <nav className="uk-navbar-container uk-margin-remove" data-uk-navbar>
         <div className="uk-navbar-left">
            <Logo/>
         </div>
         <div className="uk-navbar-right">
            <ul className="uk-navbar-nav uk-visible@m">
               {items.map((item) => <li><a href={item.url}>{item.name}</a></li>)}
            </ul>
            <ul className="uk-navbar-nav uk-hidden@m">
               <li><button className="nav-menu" data-uk-icon="icon: menu" data-uk-toggle="target: #offcanvas-push"></button></li>
            </ul>
         </div>
      </nav>
   }
   
   
}