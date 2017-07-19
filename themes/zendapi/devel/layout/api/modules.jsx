import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./modules.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
require("Js/fakeloader");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";

class ModulesIndexPage extends React.Component
{
   render()
   {
      let modules = this.props.modules;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-modules-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@m">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-width-expand apidoc-info-container apidoc-modules-info-container">
                  <h3 className="uk-width-1-1 title">模块列表</h3>
                  {modules.map((item, index) =>
                  <div className="uk-grid-small list-item" data-uk-grid key = {"apidocmodules"+index}>
                     <div className="uk-width-1-1 uk-width-1-4@s"><a className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-3-4@s"><span>{item.description}</span></div>
                  </div>
                  )}
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
   ReactDOM.render(<ModulesIndexPage modules = {API_MODULES_LIST_DATA}/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
   $(document).ready(function ()
   {
      loader.fadeOut();
   });
});
