import React from "react";
import "./InfoList.scss";
import ManualSvg from "./images/manual.svg";
import NewsSvg from "./images/news.svg";

export default class InfoList extends React.Component
{
   render()
   {
      return <div className="info-list-panel uk-margin-medium-top uk-flex uk-flex-center">
         <div className="uk-child-width-expand@s" data-uk-grid>
            <div className="uk-width-1-2@s">
               <div className="uk-flex uk-flex-column uk-width-1-1">
                  <div className="panel-title uk-text-left uk-margin-small-top">
                     <img className="title-icon" src={ManualSvg} />推荐阅读</div>
                  <ul className="info-list uk-text-left uk-margin-medium-top uk-list uk-list-divider">
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块,asdasdasdads")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                  </ul>
               </div>
            </div>
            <div className="uk-width-1-2@s">
               <div className="uk-flex uk-flex-column uk-width-1-1">
                  <div className="panel-title uk-text-left uk-margin-small-top">
                     <img className="title-icon" src={NewsSvg} />开发动态</div>
                  <ul className="info-list uk-text-left uk-margin-medium-top uk-list uk-list-divider">
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                     {this.renderInfoItem("对Zend引擎的一维C接口重新进行组织，按照不同的模块")}
                  </ul>
               </div>
            </div>
         </div>
      </div>;
   }


   renderInfoItem(title, url)
   {
      return <li><a href="#">{title}</a></li>
   }
};