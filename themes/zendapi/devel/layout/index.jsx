  "use strict";
const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import HotArea from "Components/hotarea/HotArea";
import Footer from "Components/footer/Footer";
import Index from "Js/pages/index";
import "Scss/base.scss";
import "Scss/pages/index.scss"

class IndexPage extends React.Component
{
   render()
   {
       return <div style={{width:"100%"}} className="uk-box-shadow-large">
           <HotArea/>
       </div>;
   }
}


$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<IndexPage/>, document.getElementById("container"));
});



