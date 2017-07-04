"use strict";
import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./module_content.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";
import Path from "Components/api/path/Path";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";
import ModuleSection from "Components/api/modulesection/ModuleSection";
import NamespaceSection from "Components/api/namespacesection/NamespaceSection";
import ClassSection from "Components/api/classsection/ClassSection";

class ApiModuleConetentPage extends React.Component
{
   render()
   {
      let content = this.props.content;
      let mpaths = content.mpaths;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-index-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@s">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-width-expand apidoc-info-container apidoc-module-content-info-container">
                  {mpaths && <Path pathList = {mpaths}/>}
                  <h3 className="title">{content.name}</h3>
                  <div className="uk-text-small uk-text-break uk-margin-small-bottom uk-margin-small-top">
                     {content.briefDescription.trim() != "" ? content.briefDescription : "暂无描述"}
                  </div>
                  <ModuleSection modules = {content.modules}/>
                  <NamespaceSection namespaces = {content.namespaces}/>
                  <ClassSection classes = {content.classes}/>
                  <hr className="uk-divider-icon"/>
                  <DoxygenInfo version = {API_DOXYGEN_VERSION}/>
               </div>
            </div>
         </div>
      </div>;
   }
}

$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header items = {SITE_CATEGORIES}/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<ApiModuleConetentPage content = {API_MODULE_CONTENT_DATA}/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
});
