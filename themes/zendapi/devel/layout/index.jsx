  "use strict";
+
require("uikit");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import HotArea from "Components/hotarea/HotArea";
import Footer from "Components/footer/Footer";
import Index from "Js/pages/index";

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
   ReactDOM.render(<Header/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<IndexPage/>, document.getElementById("container"));
});



