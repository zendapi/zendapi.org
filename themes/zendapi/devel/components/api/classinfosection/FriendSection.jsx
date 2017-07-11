import "./ClassSection.scss";
import "./TypeSection.scss";
import React from "react";

export default class FriendSection extends React.Component
{
   render()
   {
      let friends = this.props.friends;
      return  <div className={friends.length != 0 ? "type-section-container class-section-item" : "uk-hidden"}>
         <h3>友元列表</h3>
         {friends && friends.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"classtypesection"+index}>
               <div className="uk-width-1-1">
                  {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
                  <div className="define uk-text-break" dangerouslySetInnerHTML={{__html:item.defineStr}}></div>
                  <div className="uk-text-break">{item.briefDescription}</div>
               </div>
            </div>
         )}
      </div>
   }

   renderTemplateParams(tplParamsString)
   {
      let params = "template &lt;" +tplParamsString + "&gt";
      return <div className="uk-width-1-1 tpl-params" dangerouslySetInnerHTML={{__html:params}}/>;
   }
};