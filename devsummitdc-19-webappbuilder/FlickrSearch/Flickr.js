define(['dojo/_base/declare', "esri/geometry/webMercatorUtils"], function (declare, webMercatorUtils) {
    return declare(null, {
        constructor: function (key) {
            this.key = key
            console.log(key, this.key)
        },
        getImages: async function (point) {
            let geom = webMercatorUtils.webMercatorToGeographic(point)
            let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.key}&lat=${geom.y}&lon=${geom.x}&radius=1&format=json&content_type=1&safe_search=1&has_geo=1`
            let result = await this.asyncFetch(url)
            if (result.stat != "ok") return
            let photos = result.photos.photo
            let urls = []
            for (const p of photos) {
                urls.push({
                    small: this.getImageUrl(p, "s"),
                    medium: this.getImageUrl(p, "m"),
                    large: this.getImageUrl(p, "l"),
                    flickr: this.getFlickrUrl(p),
                    photo: p
                })
            }
            return urls
        },
        getPhotoLocation: async function(photo) {
            let url = `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${this.key}&photo_id=${photo.id}&format=json`
            let result = await this.asyncFetch(url)
            
            if (result.stat != 'ok') return null
            
            return result.photo
        },
        asyncFetch: async function (theUrl) {
            try {
                let response = await fetch(theUrl)
                let responseText = await response.text()

                responseText = responseText.replace("jsonFlickrApi(", "");
                responseText = responseText.slice(0, -1)

                return JSON.parse(responseText);

            } catch (e) {
                console.error(e)
            }
        },
        getImageUrl: function (photo, size) {
            return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`
        },
        getFlickrUrl: function (photo) {
            return `https://www.flickr.com/photos/${photo.owner}/${photo.id}`
        },

    });
});