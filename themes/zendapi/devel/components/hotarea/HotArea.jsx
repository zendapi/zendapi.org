import React from 'react';

export default class HotArea extends React.Component
{
   render()
   {
      return <div className="hot-area uk-box-shadow-large">
         <div className="uk-width-1-1 uk-text-center">
            <div className="zendapi">zendAPI</div>
         </div>
         <div className="uk-width-1-1 uk-text-center uk-margin-small">
            <div className="slogan uk-padding-small">Redefined The API of Zend Engine</div>
         </div>
         <div className="btn uk-grid-small uk-child-width-expand@s" data-uk-grid>
            <div className="uk-width-1-1 uk-width-1-3@s uk-text-center uk-text-left@s">
               <button onClick={this.gotoManual} className="uk-button uk-button-default uk-margin-medium-right@s uk-box-shadow-hover-large start-btn">开始学习</button>
            </div>
            <div className="uk-width-1-1 uk-width-1-3@s uk-text-center uk-text-left@s">
               <button className="uk-button uk-button-default github-repo-btn" onClick={this.gotoGitee}>码云官方库</button>
            </div>
            <div className="uk-width-1-1 uk-width-1-3@s uk-text-center uk-text-left@s">
               <button className="uk-button uk-button-default github-repo-btn" onClick={this.gotoGithub}>GitHub 仓库</button>
            </div>
         </div>
      </div>;
   }
   
   gotoGithub()
   {
      window.open("https://www.github.com/qcoreteam/zendapi");
   }

   gotoGitee()
   {
      window.open("https://gitee.com/zendapi/zendapi");
   }

   gotoManual()
   {
      window.open("/manual");
   }
};