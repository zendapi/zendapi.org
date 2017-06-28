import React from "react";
import "./Features.scss";
import GoodSvg from "./images/good.svg";
import PerformanceSvg from "./images/performance.svg";
import FreeSvg from "./images/free.svg";
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
                     <div className="uk-text-center"><img className="icon" src={ArchitectureSvg} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">合理的代码结构</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        对 Zend 引擎的一维 C 接口重新进行组织，按照不同的模块进行面向对象的组织，为第三方扩展编写提供简单稳定的 C++ 接口，通过重载和模板技术对Zend的接口进行改造，在保证灵活性的同时提供类型安全的接口。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><img className="icon" src={SimpleSvg} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">简单易用的接口</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        在设计接口的时候借鉴了 Java 和 Qt 的接口设计思想，在不改变 Zend Engine 原本语义的前提下对上层应用提供比 C 更抽象的接口，通过运算符和函数重载简化的大量的 C 的宏调用，同时我们引入了 PHP 相关的操作系统，让写扩展像写 PHP 那样舒服。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><img className="icon" src={PerformanceSvg} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">高性能</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        C++ 的性能远远高于 PHP，在计算密集的模块使用C++编写能大大提高系统的性能，zendAPI 项目在性能和开发效率上进行权衡，让您在不大量损失开发效率的情况下，编写高性能的扩展应用，为您节约成本。
                     </div>
                  </div>
               </div>
               <div className="uk-visible@s uk-width-1-1@s uk-flex uk-flex-center uk-margin-small" style={{height:40}}>
                  <hr className="uk-divider-icon uk-width-1-2 uk-margin-small-top"/>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><img className="icon" src={DocSvg} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">完善的文档支持</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        一个好的开源项目，怎么强调文档都不为过，有时候甚至比代码还重要，我们提供完善的用户手册和每个接口的开发文档，这些文档我们尽最大努力提高阅读体验，至少能在 PC，Pad 和手机上进行无缝阅读。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><img className="icon" src={GoodSvg} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">拥抱C++最新标准</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        项目采用 C++11 进行编写，最新的C++标准在程序的效率和代码的可阅读性上做了很多努力，我们会紧跟 C++ 标准步伐，将更好的编程体验带到 zendAPI 项目中，尽最大努力提高项目的效率和可阅读性，让您更胸有成竹。
                     </div>
                  </div>
               </div>
               <div className="uk-width-1-3@s">
                  <div className="uk-flex uk-flex-column uk-width-1-1 feature-item">
                     <div className="uk-text-center"><img className="icon" src={FreeSvg} /></div>
                     <div className="feature-title uk-text-center uk-margin-small-top">zendAPI是免费的！</div>
                     <div className="feature-desc uk-text-left uk-margin-small-top">
                        zendAPI 是在 Zend Engine 之上进行实现的开源项目，采用 BSD 开源协议，项目代码托管下GitHub项目库中，您可以无忧无虑的在您的项目中进行使用。Just enjoy it!
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>;
   }

};