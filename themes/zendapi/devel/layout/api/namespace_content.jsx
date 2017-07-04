"use strict";
import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./namespace_content.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";

class ApiNamespaceConetentPage extends React.Component
{
   render()
   {
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-index-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-width-expand apidoc-info-container apidoc-namespace-content-info-container">
                  namespace detail
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
   ReactDOM.render(<ApiNamespaceConetentPage/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
});
