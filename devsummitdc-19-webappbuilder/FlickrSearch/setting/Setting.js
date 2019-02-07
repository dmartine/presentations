define([
  'dojo/_base/declare',
  'jimu/BaseWidgetSetting'
],
function(declare, BaseWidgetSetting) {

  return declare([BaseWidgetSetting], {

    postCreate: function(){
      //the config object is passed in
      this.setConfig(this.config);
    },

    setConfig: function(config){
      this.textNode.value = config.apiKey;
    },

    getConfig: function(){
      //WAB will get config object through this method
      return {
        apiKey: this.textNode.value
      };
    }
  });
});