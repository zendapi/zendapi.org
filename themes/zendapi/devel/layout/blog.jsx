"use strict";
/*
 * TopJs Framework (http://www.topjs.org/)
 *
 * @link      http://github.com/qcoreteam/topjs for the canonical source repository
 * @copyright Copyright (c) 2016-2017 QCoreTeam (http://www.qcoreteam.org)
 * @license   http://www.topjs.org/license/new-bsd New BSD License
 */
const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import BlogList from "Components/bloglist/BlogList";
import SitePath from "Components/sitepath/SitePath";
import "Scss/base.scss";
import "Scss/pages/blog.scss"

class BlogPage extends React.Component
{
   render()
   {
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom blog-page-container">
            <SitePath pathList = {this.getPathList()}/>
            <BlogList/>
         </div>
         <Footer/>
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
      }]
   }
}

$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<BlogPage/>, document.getElementById("container"));
});
