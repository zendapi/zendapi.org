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
      let classes = this.props.data.classes;
      let defines = this.props.data.defines;
      let variables = this.props.data.variables;
      let structs = this.props.data.structs;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-globals-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@s">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-nav-default uk-nav-parent-icon uk-width-expand apidoc-info-container apidoc-globals-info-container" data-uk-nav>
                  {classes.length > 0 && <li className="uk-parent uk-open">
                     <a className="uk-width-1-1 title uk-active">全局类定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderClasses(classes)}
                     </ul>
                  </li>}
                  {structs.length > 0 && <li className="uk-parent uk-open">
                     <a className="uk-width-1-1 title uk-active">全局结构定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderClasses(structs)}
                     </ul>
                  </li>}
                  <li className={classes.length > 0 ? "uk-parent" : "uk-parent uk-open"}>
                     <a className="uk-width-1-1 title uk-active">全局宏定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderNormalItems(defines)}
                     </ul>
                  </li>
                  <li className={classes.length > 0 ? "uk-parent" : "uk-parent"}>
                     <a className="uk-width-1-1 title uk-active">全局变量/常量定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderNormalItems(variables)}
                     </ul>
                  </li>
                  <DoxygenInfo version = {API_DOXYGEN_VERSION}/>
               </div>
            </div>
         </div>
      </div>;
   }
   
   renderNormalItems(items)
   {
      return items.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid>
            <div className="uk-width-1-1 uk-width-1-3@s"><a className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-2-3@s"><span>{item.briefDescription}</span></div>
         </div>
      );
   }
   
   renderClasses(classes)
   {
      return classes.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid>
            <div className="uk-width-1-1 uk-width-1-3@s"><a className="uk-text-break" href = {item.url}>{item.name}</a></div><div className="uk-width-1-1 uk-width-2-3@s"><span>{item.briefDescription}</span></div>
         </div>
      );
   }
   
   renderVariables(vars)
   {
      
   }
   
   renderFunctions(funcs)
   {
      
   }
}

$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header items = {SITE_CATEGORIES}/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<GlobalsIndexPage data = {API_GLOBAL_LIST_DATA}/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
});
