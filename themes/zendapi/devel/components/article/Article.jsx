import React from "react";
import "./Article.scss";
export default class Article extends React.Component
{
   render()
   {
      let data = this.props.articleInfo;
      return <div>
         <div className="article-container">
            <h1 className="uk-article-title article-title">{data.title}</h1>
            <div className="uk-flex uk-flex-left uk-article-meta article-meta">{data.date}</div>
            <div className="uk-article article-content uk-margin-medium-bottom" dangerouslySetInnerHTML={{__html:data.content.join("\n")}}>
            </div>
         </div>
         {this.renderPageNav(data)}
      </div>;
   }
   
   renderPageNav(data)
   {
      return <div className="uk-grid-small uk-child-width-expand@s uk-text-center page-nav" data-uk-grid>
         <div className="uk-width-1-1@s uk-width-1-2@m uk-flex uk-flex-left nav-item">
           <span data-uk-icon="icon: chevron-left"></span>
            <div className="uk-text-break uk-text-left">{this.renderLinkItem(data.prev)}</div>
         </div>
         <div className="uk-width-1-1@s uk-width-1-2@m uk-width-1-2@m uk-flex uk-flex-right nav-item nav-item-right">
            <div className="uk-text-break uk-text-right">{this.renderLinkItem(data.next)}</div>
            <span data-uk-icon="icon: chevron-right"></span>
         </div>
      </div>;
   }
   
   renderLinkItem(info) {
      if (info) {
         return <a href={info.url}>{info.title}</a>;
      } else {
         return <a>没有数据啦</a>;
      }
   }
};