import React from "react";
import "./Footer.scss";

export default class Footer extends React.Component
{
   render()
   {
      return <div className="footer uk-text-center">
         <div>Copyright © 2016-2017 ZZU_SOFTBOY</div>
         <div><a href = "http://www.miitbeian.gov.cn/" target="_Blank">京ICP备17044371号-1</a></div>
      </div>
   }
}