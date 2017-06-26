"use strict";
/*
 * TopJs Framework (http://www.topjs.org/)
 *
 * @link      http://github.com/qcoreteam/topjs for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.topjs.org/license/new-bsd New BSD License
 */
import "Scss/base.scss";
import "Scss/pages/article.scss"
const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";

import Article from "Components/article/Article";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SitePath from "Components/sitepath/SitePath";
import PerfectScroller from "perfect-scrollbar";
class ArticlePage extends React.Component
{
   render()
   {
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom article-page-container">
            <SitePath pathList = {this.getPathList()}/>
            <Article articleInfo = {ARTICLE_DATA}/>
         </div>
      </div>;
   }
   getPathList()
   {
      return [{
         name: "网站首页",
         url : '/'
      }, {
         name: "博客",
         url: '/blog'
      }, {
         name: "文章正文"
      }]
   }
}

$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<ArticlePage/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
   let navItems = $(".page-nav .nav-item a");
   navItems.hover(function ()
   {
      $(".page-nav .nav-item svg").addClass("page-nav-link-hover");
   }, function ()
   {
      $(".page-nav .nav-item svg").removeClass("page-nav-link-hover");
   });
   $(".highlight").each(function(){
      PerfectScroller.initialize(this, {
         wheelSpeed: 2,
         wheelPropagation: true,
         minScrollbarLength: 20
      });
   });
});
