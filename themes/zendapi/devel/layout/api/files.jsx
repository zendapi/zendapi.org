import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./files.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";

class FilesIndexPage extends React.Component
{
   render()
   {
      let files = this.props.files;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-files-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@s">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-nav-default uk-nav-parent-icon uk-width-expand apidoc-info-container apidoc-files-info-container">
                  <h3 className="uk-width-1-1 title">框架头文件列表</h3>
                  {files.map((item, index)=><div className="uk-text-break list-item" key = {"apidocfileslist"+index}><a href={item.url}>{item.path}</a></div>)}
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
   ReactDOM.render(<FilesIndexPage files = {API_FILES_LIST_DATA}/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
});
