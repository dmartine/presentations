 define([
 'dojo/_base/declare',
 'jimu/BaseWidget',
 'esri/dijit/Search',
 './Flickr',
 'esri/graphic'
 ],
 function(declare, BaseWidget, Search, Flickr, Graphic) {
 //To create a widget, you need to derive from BaseWidget.
 return declare([BaseWidget], {
 // Custom widget code goes here
    
     baseClass: 'flickr-search',
     postCreate: function () {
     this.inherited(arguments)
     this.search = new Search({
     map: this.map
     }, this.searchNode)
     this.search.startup()
     this.flickr = new Flickr(this.config.apiKey)

      this.search.on('select-result', ({result}) => {
      if (!result) return
      this.showImages(result.feature.geometry)
      })
     },

      showImages: async function (point) {
      this.imageNode.innerHTML = ''
      let images = await this.flickr.getImages(point)
      if (!images) return
      for (const p of images) {
      let img = document.createElement('img')
      img.src = p.small
      img.className = 'flickr-image'
      img.onclick = function () {
      window.open(p.flickr, '_blank')
      }
      img.onmouseover = this.showImageOnMap.bind(this, p.photo)
      this.imageNode.append(img)
      }
      },

     showImageOnMap: async function (point) {
     let geocoded = await this.flickr.getPhotoLocation(point)
     let graphic = new Graphic({
     geometry: {
     x: geocoded.location.longitude,
     y: geocoded.location.latitude
     },
     symbol: {
     type: "esriPMS",
     url: 'https://static.arcgis.com/images/Symbols/Firefly/FireflyB20.png',
     width: 24,
     height: 24
     }
     })
     this.map.graphics.clear()
     this.map.graphics.add(graphic)
     }

});
 });