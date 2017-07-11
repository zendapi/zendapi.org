import React from 'react';
import "./Logo.scss";
import zendApiSvg from "./images/zendapi.svg";

export default class Logo extends React.Component
{
   render()
   {
      return <div className="logo">
         <a href = "/"><img src={zendApiSvg}/></a>
      </div>
   }
};