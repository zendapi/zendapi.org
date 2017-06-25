import React from "react";


export default class ChangeLog extends React.Component
{
   render()
   {
      let logs = this.getChangeLogItems();
      let me = this;
      return <div className="changelog-container">
         <h1 className="uk-text-center changelog-title">Changelog</h1>
         {logs.map(function (item, index)
         {
            return me.renderChangelogItem(item, index);
         })}
      </div>;
   }

   renderChangelogItem(item, index)
   {
      return <div key={index} className="changelog-item">
         <div className="title uk-width-1-1">{item.title}</div>
         <div>{item.logs.map(function(logItem, i){
            let key = "logitem_"+i;
            return <div className="uk-flex uk-flex-left uk-width-1-1 loginfo-item" key={key}>
               <span className={this.getLabelClassName(logItem.type)}>{logItem.type}</span>
               <span className="text">{logItem.text}</span>
            </div>;
         }, this)}
         </div>
      </div>;
   }
   
   getLabelClassName(type)
   {
      let cls = "uk-label uk-text-center ";
      switch (type) {
         case "added":
            cls += "uk-label-success";
            break;
         case "updated":
            break;
         case "removed":
            cls += "uk-label-warning";
            break;
         case "fixed":
            cls += "uk-label-danger";
            break;
      }
      return cls;
   }

   getChangeLogItems()
   {
      return [{
         title: "官网程序相关 (2017/06/25)",
         logs: [
            {type: "added", text: "开始设计官网logo"},
            {type: "added", text: "网站首页完成"},
            {type: "added", text: "关于我们完成"},
            {type: "updated", text: "修改网站布局"},
            {type: "removed", text: "移除网站无用模块"},
            {type: "fixed", text: "修复编码错误"}
         ]
      }];
   }
};