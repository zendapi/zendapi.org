import React from "react";
import "./About.scss";
import AboutUsDescription from "./AboutUsDescription";
import Changelog from "./ChangeLog";
import BecomeSponsor from "./BecomeSponsor";
import BecomeDeveloper from "./BecomeDeveloper";
import BecomePartner from "./BecomePartner";

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
               <li className={renderType == "becomesponsor" && "uk-active"}><a href="/about/becomesponsor.html">成为赞助者</a></li>
               <li className={renderType == "becomedeveloper" && "uk-active"}><a href="/about/becomedeveloper.html">成为开发者</a></li>
               <li className={renderType == "becomepartner" && "uk-active"}><a href="/about/becomepartner.html">成为合作伙伴</a></li>
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
      } else if (renderType == "becomesponsor") {
         return <BecomeSponsor/>;
      } else if (renderType == "becomedeveloper") {
         return <BecomeDeveloper/>;
      } else if (renderType == "becomepartner") {
         return <BecomePartner/>;
      }
   }
};