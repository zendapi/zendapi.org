"use strict";

require("uikit");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import HotArea from "Components/hotarea/HotArea";
import Footer from "Components/footer/Footer";
import Index from "Js/pages/Index";


$(function ()
{
   ReactDOM.render(<Header/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<HotArea/>, document.getElementById("container"));
});