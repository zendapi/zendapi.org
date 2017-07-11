"use strict";
import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./class_content.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";
import TypeSection from "Components/api/classinfosection/TypeSection";
import BaseClassSection from "Components/api/classinfosection/BaseClassSection";
import MethodSection from "Components/api/classinfosection/MethodSection";
import AttributeSection from "Components/api/classinfosection/AttributeSection";
import FriendSection from "Components/api/classinfosection/FriendSection";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";

class ApiClassConetentPage extends React.Component
{
   render()
   {
      let content = this.props.content;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-class-content-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@m">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-width-expand apidoc-info-container apidoc-class-content-info-container">
                  <h3 className="title uk-text-break">{content.name}</h3>
                  {content.includes && content.includes.length > 0 && this.renderIncludesList(content.includes)}
                  {content.briefDescription.trim() != "" && <div className="uk-text-small uk-text-break uk-margin-small-bottom uk-margin-small-top">
                     {content.briefDescription.trim()}
                  </div>}
                  {content.detailDescription.trim() != "" && <div className="uk-text-small uk-text-break uk-margin-small-bottom uk-margin-small-top">
                     {content.detailDescription.trim()}
                  </div>}
                  <BaseClassSection baseClasses = {content.baseClasses}/>
                  <TypeSection types = {content.publicTypes} title = {"公有类型定义"}/>
                  <MethodSection title = "公有方法列表" methods = {content.publicFuncs}/>
                  <MethodSection title = "公有静态方法列表" methods = {content.publicStaticFuncs}/>
                  <AttributeSection title = "公有字段列表" attributes = {content.publicAttributes}/>
                  <AttributeSection title = "公有静态字段列表" attributes = {content.publicStaticAttributes}/>
                  <TypeSection types = {content.protectedTypes} title = {"保护类型定义"}/>
                  <MethodSection title = "保护方法列表" methods = {content.protectedFuncs}/>
                  <MethodSection title = "保护静态方法列表" methods = {content.protectedStaticFuncs}/>
                  <AttributeSection title = "保护字段列表" attributes = {content.protectedAttributes}/>
                  <AttributeSection title = "保护静态字段列表" attributes = {content.protectedStaticAttributes}/>
                  <FriendSection friends = {content.friends}/>
                  <h3>详细描述文档</h3>
                  <div className="uk-margin-small-top uk-text-break">
                     在文件&nbsp;<span className="uk-text-success">{content.location.file.substring(8)}</span>&nbsp;的第 
                     &nbsp;<span className="uk-text-success">{content.location.line}</span>&nbsp;行定义
                  </div>
                  <DoxygenInfo version = {API_DOXYGEN_VERSION}/>
               </div>
            </div>
         </div>
      </div>;
   }

   renderIncludesList(includes)
   {
      return <ul className="include-files">
         {includes.map((include, index) =>
            <li key = {"apiclasscontentincludes"+index} className="uk-text-break">
               #include {include.local ? '"' : "<"}
               {include.url ? <a href={include.url}>{include.name}</a>:<span>{include.name}</span>}
               {include.local ? '"': ">"}
            </li>
         )}
      </ul>
   }
}

$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header items = {SITE_CATEGORIES}/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<ApiClassConetentPage content = {API_CLASS_CONTENT_DATA}/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
   $(document).ready(function ()
   {
      if (location.hash.trim().length > 0) {
         let target = $(location.hash);
         if (target.length > 0) {
            $('html,body')
            .stop()
            .animate({scrollTop: Math.round($(location.hash).offset().top)}, 0);
         }
      }
      $(".page-scroll-trigger").each(function(){
         let targetUrl = $(this).attr('href');
         targetUrl = targetUrl.split('#');
         if (targetUrl) {
            targetUrl = targetUrl[0];
         }
         if (targetUrl == location.pathname) {
            Uikit.scroll(this)
         }
      });
   });
});
