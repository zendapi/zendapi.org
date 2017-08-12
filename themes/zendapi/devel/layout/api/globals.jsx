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
      let defines = this.props.data.defines;
      let variables = this.props.data.variables;
      let classes = this.props.data.classes;
      let structs = this.props.data.structs;
      let funcs = this.props.data.funcs;
      let enums = this.props.data.enums;
      return <div style={{width:"100%"}}>
         <div className="uk-container uk-margin-small-top uk-margin-small-bottom apidoc-page-container apidoc-globals-page">
            <div className="manual-container uk-flex uk-flex-left">
               <div className="side-panel-container uk-visible@m">
                  <SidePanel items = {API_CATALOG_CATEGORIES}/>
               </div>
               <div className="uk-nav-default uk-nav-parent-icon uk-width-expand apidoc-info-container apidoc-globals-info-container" data-uk-nav>
                  {classes.length > 0 && <li className="uk-parent uk-open">
                     <a className="uk-width-1-1 title uk-active">全局类定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderClasses(classes, "apidocglobalsclasses")}
                     </ul>
                  </li>}
                  {structs.length > 0 && <li className="uk-parent">
                     <a className="uk-width-1-1 title uk-active">全局结构定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderClasses(structs, "apidocglobalsstructs")}
                     </ul>
                  </li>}
                  {enums.length > 0 && <li className="uk-parent">
                     <a className="uk-width-1-1 title uk-active">全局枚举定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderEnums(enums)}
                     </ul>
                  </li>}
                  {defines.length > 0 && <li className="uk-parent">
                     <a className="uk-width-1-1 title uk-active">全局宏定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderMacros(defines)}
                     </ul>
                  </li>}
                  {funcs.length > 0 && <li className="uk-parent">
                     <a className="uk-width-1-1 title uk-active">全局函数定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderFuncs(funcs)}
                     </ul>
                  </li>}
                  {variables.length > 0 && <li className="uk-parent">
                     <a className="uk-width-1-1 title uk-active">全局变量/常量定义</a>
                     <ul className="uk-nav-sub uk-margin-small-bottom">
                        {this.renderVariables(variables)}
                     </ul>
                  </li>}
                  <DoxygenInfo version = {API_DOXYGEN_VERSION}/>
               </div>
            </div>
         </div>
      </div>;
   }

   renderFuncs(funcs)
   {
      return funcs.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key = {"apidocglobalsfuncs"+index}>
            {item.tags && item.tags.length > 0 && this.renderTags(item.tags)}
            {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
            <div className="uk-width-1-1 uk-text-break signature" dangerouslySetInnerHTML={{__html:item.signature}}>
            </div>
            <div className="uk-width-1-1 uk-width-3-4@s uk-text-break desc"
                 dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>
         </div>
      )
   }

   renderTemplateParams(tplParamsString)
   {
      let params = "template &lt;" +tplParamsString + "&gt";
      return <div className="uk-width-1-1 tpl-params desc" dangerouslySetInnerHTML={{__html:params}}/>;
   }
   
   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-flex uk-text-break">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"apidocglobalstags"+index}>{tag}</span>)}
      </div>;
   }

   renderEnums(enums) 
   {
      return enums.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key = {"apidocglobalsenums"+index}>
            {item.tags&& item.tags.length > 0 && this.renderTags(item.tags)}
            <div className="uk-width-1-1 uk-width-1-4@s">
               <a className="uk-text-break" href = {item.url}>{item.name}</a>
               {item.underType && " : "+item.underType}
            </div>
            <div className="uk-width-1-1 uk-width-3-4@s desc uk-text-break"
                 dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>
         </div>
      )
   }
   
   renderClasses(classes, key)
   {
      return classes.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key={key+index}>
            {item.tags&& item.tags.length > 0 && this.renderTags(item.tags)}
            {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
            <div className="uk-width-1-1 uk-width-1-3@s"><a className="uk-text-break" href = {item.url}>{item.name}</a></div>
            <div className="uk-width-1-1 uk-width-2-3@s desc uk-text-break"
               dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>
         </div>
      );
   }
   renderMacros(macros)
   {
      return macros.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key = {"apidocglobalsmacros"+index}>
            <div className="uk-width-1-1 uk-width-1-4@s">
               <a className="uk-text-break" href = {item.url}>{item.name}{item.paramsString && item.paramsString.trim() != "" && <span> ({item.paramsString})</span>}</a>
            </div>
            <div className="uk-width-1-1 uk-width-3-4@s">
               {(item.initializer && item.initializer.indexOf("\n") == -1) && <div className="define uk-text-break uk-text-primary" dangerouslySetInnerHTML={{__html:item.initializer}}></div>}
               <div className="desc uk-text-break"
                    dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>
            </div>
         </div>
      );
   }
   
   renderVariables(vars)
   {
      return vars.map((item, index) =>
         <div className="uk-grid-small list-item" data-uk-grid key = {"apidocglobalsvariables"+index}>
            <div className="uk-width-1-1">
               <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:item.defineStr}}></div>
               <div className="uk-text-break desc"
                    dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>
            </div>
         </div>
      )
   }
}


$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header items = {SITE_CATEGORIES}/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<GlobalsIndexPage data = {API_GLOBAL_LIST_DATA}/>, document.getElementById("container"));
   ReactDOM.render(<Footer/>, document.getElementById("footer-wrapper"));
   $(document).ready(function ()
   {
      $(".detail-description table").each(function ()
      {
         $(this).addClass("uk-table uk-table-divider uk-table-small uk-table-striped");
      });
   });
});
