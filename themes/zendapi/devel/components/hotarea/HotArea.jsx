import React from 'react';

export default class HotArea extends React.Component
{
   render()
   {
      return <div className="uk-container uk-container-expand hot-area uk-text-center">
         <div className="zendapi">zendAPI</div>
         <div className="slogan">Redefined The API of Zend Engine</div>
         <div className="btn uk-margin-small">
            <button className="uk-button uk-button-default uk-margin-medium-right uk-box-shadow-hover-large">开始学习</button>
            <button className="uk-button uk-button-default">GitHub仓库</button>
         </div>
      </div>;
   }
};