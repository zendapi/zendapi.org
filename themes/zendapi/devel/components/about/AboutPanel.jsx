import React from "react";
import "./About.scss";
import AboutUsDescription from "./AboutUsDescription";
import Changelog from "./ChangeLog";

export default class AboutPanel extends React.Component
{
   render()
   {
      let renderType = this.props.renderType;
      return <div className="about-container">
         <div className="uk-visible@s">
            <ul className="uk-flex-left about-nav" data-uk-tab>
               <li className={renderType == "about" && "uk-active"}><a href="/about">关于我们</a></li>
               <li className={renderType == "changelog" && "uk-active"}><a href="/about/changelog.html" className="uk-text-capitalize">Changelog</a></li>
            </ul>
         </div>
         {this.renderContent()}
      </div>
   }

   renderContent()
   {
      let renderType = this.props.renderType;
      if (renderType == "about") {
         return <AboutUsDescription/> 
      } else if (renderType == "changelog") {
         return <Changelog/>;
      }
   }
};