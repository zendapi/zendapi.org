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
import MacroSection from "Components/api/macrosection/MacroSection";
import TypedefSection from "Components/api/typedefsection/TypedefSection";
import EnumSection from "Components/api/enumsection/EnumSection";
import FuncSection from "Components/api/funcsection/FuncSection";
import VariableSection from "Components/api/variablesection/VariableSection";
import MacrosInfoSection from "Components/api/macrosinfosection/MacrosInfoSection";
import TypedefsInfoSection from "Components/api/typedefsinfosection/TypedefsInfoSection";
import EnumsInfoSection from "Components/api/enumsinfosection/EnumsInfoSection";
import FuncsInfoSection from "Components/api/funcsinfosection/FuncsInfoSection";
import VariableInfoSection from "Components/api/VariableInfoSection/VariableInfoSection";

class ApiModuleConetentPage extends React.Component
{
   render()
   {
      let content = this.props.content;
      let mpaths = content.mpaths;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-modeule-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@m">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-width-expand apidoc-info-container apidoc-module-content-info-container">
                  {mpaths && <Path pathList = {mpaths}/>}
                  <h3 className="title uk-text-break">{content.name}</h3>
                  <div className="uk-text-small uk-text-break uk-margin-small-bottom uk-margin-small-top">
                     {content.briefDescription.trim() != "" ? content.briefDescription : "暂无描述"}
                  </div>
                  <div className="uk-text-small uk-text-break uk-margin-small-bottom uk-margin-small-top">
                     {content.detailDescription.trim() != "" ? content.detailDescription : "暂无描述"}
                  </div>
                  <ModuleSection modules = {content.modules}/>
                  <NamespaceSection namespaces = {content.namespaces}/>
                  <ClassSection classes = {content.classes}/>
                  <MacroSection defines = {content.defines}/>
                  <TypedefSection typedefs = {content.typedefs}/>
                  <EnumSection enums = {content.enums}/>
                  <FuncSection funcs = {content.funcs}/>
                  <VariableSection variables = {content.variables}/>
                  <MacrosInfoSection macros = {content.defines}/>
                  <TypedefsInfoSection typedefs = {content.typedefs}/>
                  <EnumsInfoSection enums = {content.enums}/>
                  <FuncsInfoSection funcs = {content.funcs}/>
                  <VariableInfoSection variables = {content.variables}/>
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
   });
});
