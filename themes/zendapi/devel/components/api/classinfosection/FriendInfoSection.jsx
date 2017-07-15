import "../scss/BaseInfoSection.scss";
import "./ClassSection.scss";
import "./FriendInfoSection.scss";
import linkSvg from "../images/link.svg";
import React from "react";

export default class FriendInfoSection extends React.Component
{
   render()
   {
      let friends = this.props.friends;
      console.log(friends)
      return  <div className={friends && friends.length != 0 ? "uk-margin-medium-top class-info-section-item-container friend-section-info-item-container" : "uk-hidden"}>
         <div className="section-title uk-margin-medium-bottom">
            <h3>友元详细文档</h3>
         </div>
         {friends && friends.map((item, index) =>
            <div className="section-item uk-margin-medium-bottom" key = {"classfriendinfosectionitem"+index}>
               <a id={item.id}/>
               <div className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-margin-small-top section-item-name-wrapper">
                  <div className="uk-width-1-1 uk-width-1-2@s section-item-name">
                     <a href={"#"+item.id}><img src={linkSvg}/></a>
                     <span>{item.simpleName || item.name}{item.friendType == "function" && "()"}</span></div>
                  {this.renderTags(["friend"])}
               </div>
               <div className="uk-background-muted uk-text-break uk-margin-small-top friend-definition definition">
                  {item.isTemplate && this.renderTemplateParams(item.tplParamsString)}
                  <div className={item.isTemplate ? "define uk-text-break" : "define uk-text-break"}
                       dangerouslySetInnerHTML={{__html:item.infoDefineStr}}></div>
               </div>
               {item.briefDescription.length > 0 && <div className="uk-margin-small-top uk-text-break"
                                                         dangerouslySetInnerHTML={{__html:item.briefDescription}}></div>}
               {item.detailDescription.length > 0 && <div className="uk-margin-small-top uk-text-break"
                                                          dangerouslySetInnerHTML={{__html:item.detailDescription}}></div>}
               <div className="uk-margin-small-top uk-text-break">
                  在文件 <span className="uk-text-success">{item.location.file.substring(8)}</span> 的第 <span className="uk-text-success">{item.location.line}</span> 行定义
               </div>
            </div>
         )}
      </div>
   }

   renderTags(tags)
   {
      return <div className="uk-width-1-1 uk-width-1-2@s tags uk-flex uk-flex-left uk-flex-right@s uk-text-middle uk-flex-wrap-around">
         {tags.map((tag, index) => <span className="uk-label uk-label-success" key = {"friendsinfosectiontags"+index}>{tag}</span>)}
      </div>;
   }

   renderTemplateParams(tplParamsString)
   {
      let params = "template &lt;" +tplParamsString + "&gt";
      return <div className="uk-width-1-1 tpl-params" dangerouslySetInnerHTML={{__html:params}}/>;
   }
};