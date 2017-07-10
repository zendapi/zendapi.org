"use strict";
let PathUtils = require("path");
let Clone = require("clone");
let _ = require('lodash');

hexo.extend.helper.register('setup_func_info_obj', function(func){
   let url_for_entity_detail = hexo.extend.helper.get('url_for_entity_detail');
   func.url = url_for_entity_detail.call(hexo, func.containerId, func.id);
   func.tags = [];
   if (func.isTemplate) {
      func.tplParamsString = [];
      func.templateParams.map(function(param){
         if (param.defValue) {
            func.tplParamsString.push(param.type + " = " + param.defValue);
         } else {
            func.tplParamsString.push(param.type);
         }
      });
      func.tplParamsString = func.tplParamsString.join(", ");
      func.tplParamsString = func.tplParamsString.replace(/\{cls\}/g, "");
   }
   if (func.isTemplate) {
      func.tags.push("template");
   }
   if (func.isStatic) {
      func.tags.push("static");
   }
   if (func.isConst) {
      func.tags.push("const");
   }
   if (func.isInline) {
      func.tags.push("inline");
   }
   if (func.isConstExpr) {
      func.tags.push("constexpr");
   }
});


hexo.extend.helper.register('setup_class_info_obj', function(cls){
   let url_for_api_entity = hexo.extend.helper.get('url_for_api_entity');
   cls.url = url_for_api_entity.call(hexo, cls.refid);
   cls.tags = [];
   if (cls.isTemplate) {
      cls.tags.push("template");
   }
   if (cls.isTemplate) {
      cls.tplParamsString = [];
      cls.templateParams.map(function(param){
         if (param.defValue) {
            cls.tplParamsString.push(param.type + " = " + param.defValue);
         } else {
            cls.tplParamsString.push(param.type);
         }
      });
      cls.tplParamsString = cls.tplParamsString.join(", ");
   }
});

hexo.extend.helper.register('setup_typedef_info_obj', function(typedef){
   let url_for_entity_detail = hexo.extend.helper.get('url_for_entity_detail');
   let url_for_api_entity = hexo.extend.helper.get('url_for_api_entity');
   let is_array = hexo.extend.helper.get('is_array');
   typedef.url = url_for_entity_detail.call(hexo, typedef.containerId, typedef.id);
   typedef.rawDefinition = typedef.definition;
   typedef.definitionWithoutSelfLink = typedef.rawDefinition;
   typedef.definition = typedef.definition.replace(typedef.name,
      "<a href='"+typedef.url+"' class='page-scroll-trigger'>"+typedef.name+"</a>");
   // 替换type
   if (typedef.refs && is_array.call(hexo, typedef.refs)) {
      typedef.refs.map(function(item){
         if (item.kindref == "member") {
            item.url = url_for_entity_detail.call(hexo, item.containerId, item.id)
         } else {
            item.url = url_for_api_entity.call(hexo, item.refid);
         }
         typedef.definition = typedef.definition.replace(item.name,
            "<a href='"+item.url+"'>"+item.name+"</a>");
         typedef.definitionWithoutSelfLink = typedef.definitionWithoutSelfLink.replace(item.name,
            "<a href='"+item.url+"'>"+item.name+"</a>");
      });
   }
});

hexo.extend.helper.register('setup_macro_info_obj', function(macro){
   let url_for_entity_detail = hexo.extend.helper.get('url_for_entity_detail');
   macro.url = url_for_entity_detail.call(hexo, macro.containerId, macro.id);
   if (macro.params) {
      macro.paramsString = [];
      macro.params.map(function (param)
      {
         macro.paramsString.push(param.defname);
      });
      macro.paramsString = macro.paramsString.join(", ");
   }
});
hexo.extend.helper.register('setup_var_info_obj', function(variable){
   // let tpl = '<a href = "{url}" " class = "page-scroll-trigger">{name}</a>';
   // let url_for_entity_detail = hexo.extend.helper.get('url_for_entity_detail');
   // let name = tpl.replace(/\{url\}/g, url_for_entity_detail.call(hexo, variable.containerId, variable.id)).
   // replace("{name}", variable.name);
   // variable.defineStr = variable.type + " " + name;
});


