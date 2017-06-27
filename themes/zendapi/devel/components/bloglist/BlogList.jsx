import React from "react";
import "./BlogList.scss";
import news from "./images/news.png";

export default class BlogList extends React.Component
{
   render()
   {
      const data = this.props.listData;
      const items = data.items;
      return <div className="blog-list-container">
         {items.map((item, index) => this.renderListItem(item, index))}
         {this.renderPageBar(data.prev, data.next)}
      </div>;
   }
   
   renderListItem(info, index)
   {
      let key = "bloglist"+index;
      let me = this;
      return <div className="blog-list-item" key = {key}>
         <div className="title"><a href={info.link}>{info.title}</a></div>
         <div className="uk-flex uk-flex-left meta">{info.date}</div>
         {info.coverImage &&  <div className="meta-img uk-margin-medium-top uk-text-center"><img src={info.coverImage}/></div>}
         {info.excerpt != "" && <div className="excerpt uk-margin-medium-top uk-text-break" dangerouslySetInnerHTML={{__html:info.excerpt}}></div>}
         <div>
            <button className="uk-button uk-button-default goto-detail-btn uk-margin-medium-top" 
                    onClick={function(){me.visitHandler(info)}}>
               进一步阅读</button>
         </div>
      </div>;
   }

   visitHandler(info) 
   {
      window.location.assign(info.link);
   }
   
   renderPageBar(prev, next)
   {
      return <div className="uk-navbar-container uk-margin-small-bottom uk-margin-small-top page-nav" data-uk-navbar>
         <div className="uk-navbar-left">
            {prev && <a data-uk-icon="icon: chevron-left" href={prev}></a>}
         </div>
         <div className="uk-navbar-right">
            {next && <a data-uk-icon="icon: chevron-right" href={next}></a>}
         </div>
      </div>;
   }
};

