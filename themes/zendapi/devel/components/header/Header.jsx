import React from "react";
import Logo from "../logo/Logo";
import "./Header.scss";

export default class Header extends React.Component
{
   render()
   {
      return <nav className="uk-navbar-container uk-margin-remove" data-uk-navbar>
         <div className="uk-navbar-left">
            <Logo/>
         </div>
         <div className="uk-navbar-right">
            <ul className="uk-navbar-nav uk-visible@m">
               <li className="uk-active"><a href="/">网站首页</a></li>
               <li><a href="#">手册</a></li>
               <li><a href="#">API文档</a></li>
               <li><a href="/blog">博客</a></li>
               <li><a href="/about">关于我们</a></li>
            </ul>
            <ul className="uk-navbar-nav uk-hidden@m">
               <li><button className="nav-menu" data-uk-icon="icon: menu" data-uk-toggle="target: #offcanvas-push"></button></li>
            </ul>
         </div>
      </nav>
   }
}