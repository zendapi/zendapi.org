import React from "react";
import "./BlogList.scss";
import news from "./images/news.png";

export default class BlogList extends React.Component
{
   render()
   {
      return <div className="blog-list-container">
         {this.renderListItem()}
         {this.renderListItem()}
         {this.renderListItem()}
         {this.renderPageBar()}
      </div>;
   }
   
   renderListItem()
   {
      return <div className="blog-list-item">
         <div className="title">受广电要求影响 微博股价大跌逾6%</div>
         <div className="uk-flex uk-flex-left meta">2017/06/23</div>
         <div className="meta-img uk-margin-medium-top"><img src={news} className="uk-border-rounded"/></div>
         <div className="excerpt uk-margin-medium-top">腾讯科技讯 6月23日消息，广电总局昨日发函要求“新浪微博”等网站关停视听节目服务。受此影响，截至美股周四收盘，微博股价大跌6.12%，新浪股价大跌4.83%。
            6月22日晚间，广电总局要求“新浪微博”等网站关停视听节目服务。对此微博回应称，微博用户上传非节目类视频不受影响，将按照国家相关法律法规和管理要求，严格加强视听节目的管理，进一步规范视频服务。腾讯科技讯 6月23日消息，广电总局昨日发函要求“新浪微博”等网站关停视听节目服务。</div>
         <div><button className="uk-button uk-button-default goto-detail-btn uk-margin-medium-top">进一步阅读</button></div>
      </div>;
   }
   
   renderPageBar()
   {
      return <div className="uk-navbar-container uk-margin-small-bottom uk-margin-small-top page-nav" data-uk-navbar>
         <div className="uk-navbar-left">
            <a data-uk-icon="icon: chevron-left"></a>
         </div>
         <div className="uk-navbar-right">
            <a data-uk-icon="icon: chevron-right"></a>
         </div>
      </div>;
   }
};

