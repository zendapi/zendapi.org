/**
 * Created by softboy on 6/22/17.
 */
import React from "react";
import "./Partner.scss";
import partnerSvg from "./images/partner.svg";
import hulk from "./images/hulk.png";
import qihooOpensource from "./images/qihooopensource.png"
import infosecSvg from "./images/infosec.svg"
import oscSvg from "./images/osc.svg"
import giteeSvg from "./images/gitee.svg"
export default class Partner extends React.Component
{
   render()
   {
      return <div className="partner-panel uk-container uk-margin-large-top uk-flex uk-flex-column">
         <div className="uk-flex uk-flex-center">
            <div className="partner-title uk-flex uk-flex-center">
               <img src={partnerSvg}/>合作伙伴
            </div>
         </div>
         <div className="uk-margin-medium-top uk-flex uk-flex-center" data-uk-grid>
            <a className="partner-logo uk-width-auto"><img src={qihooOpensource}/></a>
            <a className="partner-logo uk-width-auto"><img src={oscSvg}/></a>
            <a className="partner-logo uk-width-auto"><img src={giteeSvg}/></a>
            <a className="partner-logo uk-width-auto"><img src={infosecSvg}/></a>
            <a className="partner-logo uk-width-auto"><img src={hulk} style={{width:200,height:25,marginTop:15}}/></a>
         </div>
         <div className="uk-flex uk-flex-center uk-margin-medium-top">
            <div className="partner-title uk-flex uk-flex-center">
               <button className="uk-button uk-button-default become-partner-btn" onClick={this.gotoTargetUrl}>如何成为合作伙伴</button>
            </div>
         </div>
      </div>;
   }
   gotoTargetUrl()
   {
      window.location.assign("/about/becomedeveloper.html")
   }
};