import React from 'react';

export default class Header extends React.Component
{
   render()
   {
      return <nav className="uk-navbar-container uk-margin-remove" data-uk-navbar>
         <div className="uk-navbar-left">
         </div>
         <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
               <li className="uk-active"><a href="#">网站首页</a></li>
               <li><a href="#">手册</a></li>
               <li><a href="#">API文档</a></li>
               <li><a href="#">博客</a></li>
               <li><a href="#">关于我们</a></li>
            </ul>
         </div>
      </nav>
   }
   
   renderPcAndPadUi()
   {
      
   }
   
   renderMobileUi()
   {
      
   }
}