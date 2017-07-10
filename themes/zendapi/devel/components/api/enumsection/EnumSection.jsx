import "./EnumSection.scss";
import React from "react";

export default class EnumSection extends React.Component
{
   render()
   {
      let enums = this.props.enums;
      let showSimpleName = !!this.props.showSimpleName;
      return <div className={enums.length != 0 ? "enum-section-container" : "uk-hidden"}>
         <h3>枚举类型列表</h3>
         {enums.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"enumsection"+index}>
               {item.tags && item.tags.length > 0 && this.renderTags(item.tags)}
               <div className="uk-width-1-1 uk-width-1-4@s">
                  enum {item.isStrong && "class"} <a className="uk-text-break page-scroll-trigger" href = {item.url}>{showSimpleName ? item.simpleName : item.name}
                  </a>
                  {item.underType && " : "+item.underType}
               </div>
               <div className="uk-width-1-1 uk-width-3-4@s"><span>{item.briefDescription}</span></div>
            </div>
         )}
      </div>;
   }
   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-flex uk-flex-left">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"enumsectiontags"+index}>{tag}</span>)}
      </div>;
   }
};