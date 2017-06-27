"use strict";
import "Scss/base.scss";
import "Scss/pages/index.scss"
const Uikit = require("uikit");
const UikitIcons = require("uikit/dist/js/uikit-icons");
import React from "react";
import ReactDOM from "react-dom";
import Header from "Components/header/Header";
import HotArea from "Components/hotarea/HotArea";
import Features from "Components/features/Features"
import Footer from "Components/footer/Footer";
import InfoList from "Components/infolist/InfoList";
import Sponsor from "Components/sponsors/Sponsor";
import Teamwork from "Components/teamwork/Teamwork";


class IndexPage extends React.Component
{
   render()
   {
      return <div style={{width:"100%"}}>
         <HotArea/>
         <Features/>
         <InfoList newsItems = {INDEX_PAGE_DATA.newsList}/>
         <Sponsor/>
         <Teamwork/>
         <Footer/>
      </div>;
   }
}

$(function ()
{
   Uikit.use(UikitIcons);
   ReactDOM.render(<Header/>, document.getElementById("header-wrapper"));
   ReactDOM.render(<IndexPage/>, document.getElementById("container"));
});
