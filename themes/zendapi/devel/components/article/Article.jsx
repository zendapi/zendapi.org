import React from "react";
import "./Article.scss";
export default class Article extends React.Component
{
   render()
   {
      return <div>
         <div className="article-container">
            <h1 className="uk-article-title article-title">微博回应视听节目被关停：上传非节目类视频不受影响</h1>
            <div className="uk-flex uk-flex-left uk-article-meta article-meta">2017/06/23</div>
            <div className="uk-article article-content uk-margin-medium-bottom">
               <p>腾讯科技讯 The Outline网站获得的消息显示，本月早些时候，苹果的一次内部通气会透露了苹果如何防止新品的消息泄密。

                  此次会议的主题为“阻止泄密者：苹果公司的保密”，发言人包括苹果全球信息安全总监大卫·莱斯（David Rice）、全球调查总监李·弗里德曼（Lee Freedman），以及全球信息安全沟通和培训团队的珍妮·休伯特（Jenny Hubbert）。

                  1小时的会议显示，苹果全球信息安全团队雇佣了大量调查人员，防止信息泄露给竞争对手、山寨厂商和媒体，并在信息泄露事故发生时查找源头。其中某些调查人员曾供职于美国情报部门，例如国家安全局（NSA）、联邦调查局（FBI）和美国特勤局，以及美国军方。


                  在第一段视频结束后，休伯特进行了发言。“你会听到库克说，‘还有一件事’。那么这会是什么？”他表示，“惊喜和愉悦。当我们向世界公布一款从未被泄露的产品时，我们会感到惊喜和愉悦。这会带来很大的影响力，以非常积极的方式。这是我们的基因，我们的品牌。但如果消息泄密，这就会更有影响。这将是对我们所有人的直接打击。”

                  她表示：“所以今天，我们想要分享一些在供应链中发生的泄密事件的幕后情况，以及某些发生在库比蒂诺总部的事件。”

                  她随后让莱斯来介绍“新产品信息安全”团队，而这是规模更庞大的全球信息安全团队的一部分。莱斯表示，“这是个秘密部门，我们可能有点取名不当”。莱斯曾在NSA工作4年，担任全球网络漏洞分析师。在此之前，他曾是美国海军的特别任务密码专家。根据LinkedIn页面的介绍，他带领苹果的全球信息安全团队已有6年多时间。

               </p>
               <p>
                  这让外界了解到，苹果如何对消息进行保密。这也是苹果计划在员工中举办的多场类似活动的第一次。在此次会议上，莱斯和弗里德曼介绍了苹果为防止泄密做出的努力，介绍了此前如何抓住泄密者，并回答了100名参会者的提问。

                  会议由视频开场，也由视频结束，其中还展示了苹果CEO蒂姆·库克（Tim Cook）在一次主题演讲中发布新产品的画面。会议强调了保密对苹果的重要性。在第一段视频中，一名苹果员工表示：“当我看到媒体上出现泄密消息时，我感到痛苦。这让我恶心。”另一名员工则表示：“当你泄密时，你会让所有人失望。这是属于我们的公司，涉及到公司的声誉，以及开发同一款产品不同团队的努力工作。”

                  在史蒂夫·乔布斯（Steve Jobs）担任苹果CEO期间，苹果以保密的文化著称。2004年，苹果甚至直接联系科技博客作者，要求他们提供消息来源，但未能成功。在2012年的一次科技行业大会上，库克首次公开提到对保密的加强。

                  苹果iPod、iPhone和iOS产品营销副总裁格雷格·约斯威亚克（Greg Joswiak）在视频中表示：“这对库克来说是件大事。事实上，对于苹果的每个员工，我们都不能再容忍这样的现象。这点很重要。”他随后还表示：“我深深地相信，如果我们招聘聪明人，他们会想到这点，会理解这点，最终采取正确的做法，紧守秘密。”

                  他指出，为了确保实现这样的目标，苹果已经建设了基础设施和团队，“追踪这些泄密者”。“他们非常高效。”
               </p>
               <p>
                  休伯特同时还介绍了弗里德曼，后者曾在布鲁克林的美国检察官办公室担任计算机黑客犯罪负责人，以及助理检察长。他于2011年加入苹果，负责全球调查活动。
               </p>
            </div>
         </div>
         {this.renderPageNav()}
      </div>;
   }
   
   renderPageNav()
   {
      return <div className="uk-grid-small uk-child-width-expand@s uk-text-center page-nav" data-uk-grid>
         <div className="uk-width-1-1@s uk-width-1-2@m uk-flex uk-flex-left nav-item">
           <span data-uk-icon="icon:  chevron-left"></span>
            <div className="uk-text-break uk-text-left"><a>苹果大战泄密者内幕：从中国工厂到美国总部苹果大战泄密者内幕：从中国工厂到美国总部</a></div>
         </div>
         <div className="uk-width-1-1@s uk-width-1-2@m uk-width-1-2@m uk-flex uk-flex-right nav-item">
            <div className="uk-text-break uk-text-right"><a>电子竞技真能名利双收？其实难度远远高于考上清华</a></div>
            <span data-uk-icon="icon:  chevron-right"></span>
         </div>
      </div>;
   }
};