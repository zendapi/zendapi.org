import React from "react";
import "./InfoList.scss";
import ManualSvg from "./images/manual.svg";
import NewsSvg from "./images/news.svg";

export default class InfoList extends React.Component
{
   render()
   {
      let news = this.props.newsItems;
      let manuals = this.props.manualItems;
      return <div className="info-list-panel uk-margin-medium-top uk-flex uk-flex-center uk-box-shadow-medium">
         <div className="uk-child-width-expand@s grid-wrapper" data-uk-grid>
            <div className="uk-width-1-1 uk-width-1-2@s info-item">
               <div className="uk-flex uk-flex-column">
                  <div className="panel-title uk-text-center uk-text-left@s uk-margin-small-top">
                     <img className="title-icon" src={ManualSvg} />推荐阅读</div>
                  <ul className="info-list uk-text-left uk-margin-small-top uk-list uk-list-divider">
                     {(manuals && manuals.length != 0) && manuals.map((item, index) => this.renderInfoItem(item.title, item.url, index))}
                     {(!manuals || manuals.length == 0) && this.renderEmpty()}
                  </ul>
               </div>
            </div>
            <div className="uk-width-1-1 uk-width-1-2@s info-item">
               <div className="uk-flex uk-flex-column">
                  <div className="panel-title uk-text-center uk-text-left@s uk-margin-small-top">
                     <img className="title-icon" src={NewsSvg} />最新博文</div>
                  <ul className="info-list uk-text-left uk-margin-small-top uk-list uk-list-divider">
                     {news.length != 0 && news.map((item, index) => this.renderInfoItem(item.title, item.url, index))}
                     {(!news || news.length == 0) && this.renderEmpty()}
                  </ul>
               </div>
            </div>
         </div>
      </div>;
   }

   renderInfoItem(title, url, index)
   {
      return <li key={index}><a href={url}>{title}</a></li>;
   }
   
   renderEmpty()
   {
      return <li>暂无数据</li>;
   }
};