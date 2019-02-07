 define([
 'dojo/_base/declare',
 'jimu/BaseWidget',
 'esri/symbols/TextSymbol'
 ],
 function(declare, BaseWidget, TextSymbol) {
 //To create a widget, you need to derive from BaseWidget.
 return declare([BaseWidget], {
    baseClass: 'jimu-widget-demo',
    postCreate: function() {
    this.inherited(arguments);
 },
 startup: function() {
 this.inherited(arguments);
 console.log('startup');
 },
 onOpen: function(){
 this._drawTimeStamp()
 console.log('onOpen');
 },
 _drawTimeStamp: function(){
 let d = new Date();
 this.tsTimeStamp = new TextSymbol({
 text: 'Last Map Update ' + d.toLocaleString(),
 });
 this.mapIdNode.innerHTML = this.tsTimeStamp.text;
 },



 });
 });