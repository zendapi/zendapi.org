import "./ClassSection.scss";
import React from "react";

export default class ClassSection extends React.Component
{
   render()
   {
      let classes = this.props.classes;
      let showSimpleName = !!this.props.showSimpleName;
      return <div className={classes.length != 0 ? "section-item-container class-section-container" : "uk-hidden"}>
         <h3>类列表</h3>
         {classes.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"classsection"+index}>
               {item.tags && item.tags.length > 0 && this.renderTags(item.tags)}
               {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
               <div className="uk-width-1-1">
                  <span className="entity-type uk-text-right">{item.isStruct?"struct":"class"}</span>
                  <a className="uk-text-break" href = {item.url}>{showSimpleName ? item.simpleName : item.name}</a></div>
               <div className="uk-width-1-1">
                  <span>{item.briefDescription}</span>
               </div>
            </div>
         )}
      </div>;
   }
   
   renderTemplateParams(tplParamsString)
   {
      let params = "template &lt;" +tplParamsString + "&gt";
      return <div className="uk-width-1-1 tpl-params desc" dangerouslySetInnerHTML={{__html:params}}/>;
   }

   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-flex uk-flex-left">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"classsectiontags"+index}>{tag}</span>)}
      </div>;
   }
};