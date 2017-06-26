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
            <div className="uk-article article-content uk-margin-medium-bottom" dangerouslySetInnerHTML={{__html:data.content}}>
            </div>
         </div>
         {this.renderPageNav()}
      </div>;
   }
   
   renderPageNav()
   {
      return <div className="uk-grid-small uk-child-width-expand@s uk-text-center page-nav" data-uk-grid>
         <div className="uk-width-1-1@s uk-width-1-2@m uk-flex uk-flex-left nav-item">
           <span data-uk-icon="icon:  chevron-left"></span>
            <div className="uk-text-break uk-text-left"><a>苹果大战泄密者内幕：从中国工厂到美国总部苹果大战泄密者内幕：从中国工厂到美国总部</a></div>
         </div>
         <div className="uk-width-1-1@s uk-width-1-2@m uk-width-1-2@m uk-flex uk-flex-right nav-item">
            <div className="uk-text-break uk-text-right"><a>电子竞技真能名利双收？其实难度远远高于考上清华</a></div>
            <span data-uk-icon="icon:  chevron-right"></span>
         </div>
      </div>;
   }
};