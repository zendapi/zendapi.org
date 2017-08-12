import "Scss/base.scss";
import "Scss/pages/api/base.scss";
import "./namespaces.scss";

const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import Footer from "Components/footer/Footer";
import SidePanel from "Components/api/sidepanel/SidePanel";
import DoxygenInfo from "Components/api/doxygen/DoxygenInfo";

class NamespacesIndexPage extends React.Component
{
   render()
   {
      let namespaces = this.props.namespaces;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-namespaces-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@m">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-width-expand apidoc-info-container apidoc-namespaces-info-container">
                  <h3 className="uk-width-1-1 title">名称空间列表</h3>
                  {namespaces.map((item, index) =>
                     <div className="uk-grid-small list-item" data-uk-grid key = {"apidocnamespaces"+index}>
                        <div className="uk-width-1-1 uk-width-1-3@s"><a  className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-2-3@s"><span>{item.description}</span></div>
                     </div>
                  )}
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
   ReactDOM.render(<NamespacesIndexPage namespaces = {API_NAMESPACES_LIST_DATA}/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
});
