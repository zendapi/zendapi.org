import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./globals.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";

class GlobalsIndexPage extends React.Component
{
   render()
   {
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-globals-page">
            <div className="manual-container uk-flex uk-flex-left">
               <SidePanel items = {API_CATALOG_CATEGORIES}/>
               <div className="uk-width-expand apidoc-info-container apidoc-globals-info-container">
                  <h3 className="uk-width-1-1">类定义</h3>
                  类定义
                  <h3 className="uk-width-1-1">结构定义</h3>
                  结构定义
                  <h3 className="uk-width-1-1">枚举定义</h3>
                  枚举定义
                  <h3 className="uk-width-1-1">宏定义</h3>
                  宏定义
                  <h3 className="uk-width-1-1">函数定义</h3>
                  函数定义
                  <h3 className="uk-width-1-1">变量/常量定义</h3>
                  变量定义
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
   ReactDOM.render(<GlobalsIndexPage/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
});
