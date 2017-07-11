import "./ClassSection.scss";
import "./TypeSection.scss";
import React from "react";

export default class FriendSection extends React.Component
{
   render()
   {
      let friends = this.props.friends;
      return  <div className={friends && friends.length != 0 ? "friend-class-section-item-container class-section-item-container" : "uk-hidden"}>
         <h3>友元列表</h3>
         {friends && friends.map((item, index) =>
            <div className="uk-grid-small list-item" data-uk-grid key = {"classtypesection"+index}>
               <div className="uk-width-1-1">
                  {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
                  <div className={item.isTemplate ? "define uk-text-break uk-margin-small-top" : "define uk-text-break"}
                     dangerouslySetInnerHTML={{__html:item.defineStr}}></div>
                  <div className="uk-text-break uk-margin-small-top">{item.briefDescription}</div>
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