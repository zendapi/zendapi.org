import React from "react";
import "./Features.scss";
import GoodSvg from "./images/good.svg";
import PerformanceSvg from "./images/performance.svg";
import SecuritySvg from "./images/security.svg";
import DocSvg from "./images/docs.svg";
import SimpleSvg from "./images/simple.svg";
import ArchitectureSvg from "./images/architecture.svg";

export default class Features extends React.Component
{
   render()
   {
      return <div className="uk-container features uk-margin-large-top uk-flex uk-flex-column">
         <div className="uk-flex uk-flex-center uk-margin-medium-bottom uk-visible@s"><div className="title uk-text-center">项目特性</div></div>
         <div className="uk-flex uk-flex-center">
            <div className="uk-grid-divider uk-child-width-expand@s grid" data-uk-grid>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><span className="icon" dangerouslySetInnerHTML={{__html: ArchitectureSvg}} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">合理的代码结构</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织，为第三方扩展编写提供简单稳定的C++接口，通过重载和模板技术对Zend的接口进行改造，在保证灵活性的同时提供类型安全的接口。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><span className="icon" dangerouslySetInnerHTML={{__html: SimpleSvg}} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">合理的代码结构</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织，为第三方扩展编写提供简单稳定的C++接口，通过重载和模板技术对Zend的接口进行改造，在保证灵活性的同时提供类型安全的接口。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><span className="icon" dangerouslySetInnerHTML={{__html: PerformanceSvg}} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">合理的代码结构</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织，为第三方扩展编写提供简单稳定的C++接口，通过重载和模板技术对Zend的接口进行改造，在保证灵活性的同时提供类型安全的接口。
                     </div>
                  </div>
               </div>
               <div className="uk-visible@s uk-width-1-1@s uk-flex uk-flex-center uk-margin-small" style={{height:40}}>
                  <hr className="uk-divider-icon uk-width-1-2 uk-margin-small-top"/>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><span className="icon" dangerouslySetInnerHTML={{__html: DocSvg}} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">合理的代码结构</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织，为第三方扩展编写提供简单稳定的C++接口，通过重载和模板技术对Zend的接口进行改造，在保证灵活性的同时提供类型安全的接口。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><span className="icon" dangerouslySetInnerHTML={{__html: GoodSvg}} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">合理的代码结构</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织，为第三方扩展编写提供简单稳定的C++接口，通过重载和模板技术对Zend的接口进行改造，在保证灵活性的同时提供类型安全的接口。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><span className="icon" dangerouslySetInnerHTML={{__html: SecuritySvg}} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">合理的代码结构</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        对Zend引擎的一维C接口重新进行组织，按照不同的模块进行面向对象的组织，为第三方扩展编写提供简单稳定的C++接口，通过重载和模板技术对Zend的接口进行改造，在保证灵活性的同时提供类型安全的接口。
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>;
   }

};