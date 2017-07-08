import React from "react";
import qcoreteam from "./images/qcoreteam.svg";

export default class AboutUsDescription extends React.Component
{
   render()
   {
      return <div className="about-info-item">
         <div className="uk-text-center logo"><img src={qcoreteam}/></div>
         <div className="text uk-margin-medium-top">
            qcoreteam 是由一群喜欢开源的程序员组成的组织，由2016年10月1日成立，目前地点在北京，所有成员均是兼职参与开发，我们立志打造 一个优秀的开源组织。
            <br/>
            <span className="uk-label uk-label-success">官方 github 库</span>
            <a href="https://www.github.com/qcoreteam">qcoreteam 项目库</a>
         </div>
         <hr className="uk-divider-icon"/>
         <div className="uk-text-center zendapi-logo">zendAPI</div>
         <div className="text uk-margin-medium-top">
            zendAPI 项目是针对 Zend Engine 的 C 接口使用 C++11 进行而面向对象的封装，从而屏蔽了底层 Zend Engine API 的接口复杂性，加快开发 PHP 扩展的效率。我们不是对 Zend Engine 进行重新实现
            只是在它的基础上对其接口进行分类简化，对上层应用提供一个易用的编程接口。<br/>
            <span className="uk-label uk-label-success">项目 github </span> 
            <a href="https://www.github.com/qcoreteam/zendapi">zendAPI 项目库</a>
         </div>
      </div>;
   }
};