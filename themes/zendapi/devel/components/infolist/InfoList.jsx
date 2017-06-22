import React from "react";
import "./InfoList.scss";
import ManualSvg from "./images/manual.svg";

export default class InfoList extends React.Component
{
   render()
   {
      return <div className="uk-container info-list-panel uk-margin-medium-top uk-flex uk-flex-center">
         <div className="uk-grid-divider uk-child-width-expand@s" data-uk-grid>
            <div className="uk-width-1-2@s">
               <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                  <div className="panel-title uk-text-left uk-margin-small-top">
                     <span className="title-icon" dangerouslySetInnerHTML={{__html: ManualSvg}} />推荐阅读</div>
                  <ul className="feature-list uk-text-left uk-margin-small-top uk-list uk-list-divider">
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                  </ul>
               </div>
            </div>
            <div className="uk-width-1-2@s">
               <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                  <div className="panel-title uk-text-left uk-margin-small-top">
                     <span className="title-icon" dangerouslySetInnerHTML={{__html: ManualSvg}} />开发动态</div>
                  <ul className="feature-list uk-text-left uk-margin-small-top uk-list uk-list-divider">
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                     <li><a href="#">对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织</a></li>
                  </ul>
               </div>
            </div>
         </div>
      </div>;
   }


   renderInfoItem()
   {

   }
};