"use strict";
import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./namespace_content.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
require("Js/fakeloader");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import Path from "Components/api/path/Path";
import SidePanel from "Components/api/sidepanel/SidePanel";
import NamespaceSection from "Components/api/namespacesection/NamespaceSection";
import ClassSection from "Components/api/classsection/ClassSection";
import TypedefSection from "Components/api/typedefsection/TypedefSection";
import EnumSection from "Components/api/enumsection/EnumSection";
import FuncSection from "Components/api/funcsection/FuncSection";
import VariableSection from "Components/api/variablesection/VariableSection";
import TypedefsInfoSection from "Components/api/typedefsinfosection/TypedefsInfoSection";
import EnumsInfoSection from "Components/api/enumsinfosection/EnumsInfoSection";
import FuncsInfoSection from "Components/api/funcsinfosection/FuncsInfoSection";
import VariableInfoSection from "Components/api/VariableInfoSection/VariableInfoSection";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";

class ApiNamespaceConetentPage extends React.Component
{
   render()
   {
      let content = this.props.content;
      let npaths = content.npaths;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-namespace-content-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@m">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-width-expand apidoc-info-container apidoc-namespace-content-info-container">
                  {npaths && <Path pathList = {npaths}/>}
                  <h3 className="title uk-text-break">{content.name}</h3>
                  {content.briefDescription.trim() != "" && <div className="uk-text-small uk-text-break uk-margin-small-bottom uk-margin-small-top">
                     {content.briefDescription.trim()}
                  </div>}
                  {content.detailDescription.trim() != "" && <div className="uk-text-small uk-text-break uk-margin-small-bottom uk-margin-small-top">
                     {content.detailDescription.trim()}
                  </div>}
                  <NamespaceSection namespaces = {content.namespaces} showSimpleName = {true}/>
                  <ClassSection classes = {content.classes} showSimpleName = {true}/>
                  <TypedefSection typedefs = {content.typedefs} showSimpleName = {true}/>
                  <EnumSection enums = {content.enums} showSimpleName = {true}/>
                  <FuncSection funcs = {content.funcs} showSimpleName = {true}/>
                  <VariableSection variables = {content.variables} showSimpleName = {true}/>
                  <TypedefsInfoSection typedefs = {content.typedefs} containerId = {content.refid}/>
                  <EnumsInfoSection enums = {content.enums} containerId = {content.refid}/>
                  <FuncsInfoSection funcs = {content.funcs} containerId = {content.refid}/>
                  <VariableInfoSection variables = {content.variables} containerId = {content.refid}/>
                  <DoxygenInfo version = {API_DOXYGEN_VERSION}/>
               </div>
            </div>
         </div>
      </div>;
   }
}

let loader = $("#fakeLoader").fakeLoader({
   zIndex:"999",//Default zIndex
   spinner:"spinner6",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
   bgColor:"#00AB6B", //Hex, RGB or RGBA colors
});

$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header items = {SITE_CATEGORIES}/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<ApiNamespaceConetentPage content = {API_NAMESPACE_CONTENT_DATA}/>, document.getElementById("container"));
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
         let parts = targetUrl.split('#');
         if (parts) {
            targetUrl = parts[0];
         }
         if (targetUrl == location.pathname) {
            Uikit.scroll(this);
            $(this).on('scrolled', function () {
               location.hash = parts[1];
            });
         }
      });
      $(".detail-description table").each(function ()
      {
         $(this).addClass("uk-table uk-table-divider uk-table-small uk-table-striped");
      });
      loader.fadeOut();
   });
});
