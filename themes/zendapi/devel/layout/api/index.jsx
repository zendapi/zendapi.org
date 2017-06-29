"use strict";
import "Scss/base.scss";
import "Scss/pages/api/base.scss"
const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";

class ApiIndexPage extends React.Component
{
   render()
   {
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container">
            <div className="manual-container uk-flex uk-flex-left">
               <SidePanel/>
               <div className="uk-width-expand apidoc-info-container">
                  content
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
   ReactDOM.render(<ApiIndexPage/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
});
