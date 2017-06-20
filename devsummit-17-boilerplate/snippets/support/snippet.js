function create(tag, attr) {
  var elem = document.createElement(tag);

  for (var k in attr) {
    elem[k] = attr[k];
  }

  return elem;
}

document.head.appendChild(create("link", {
  rel: "stylesheet",
  href: "//js.arcgis.com/4.2/esri/css/main.css"
}));

document.head.appendChild(create("link", {
  rel: "stylesheet",
  href: "./support/style.css"
}));

document.head.appendChild(create("script", {
  src: "//js.arcgis.com/4.2/"
}));

window.log = function() {
  var message = Array.prototype.join.call(arguments, " ");
  var viewLog = document.getElementById("viewLog");
  viewLog.textContent = message;
};

(function(modules) {
  modules.push("esri/WebScene", "esri/Map", "esri/views/SceneView", "esri/views/MapView", "dojo/domReady!");

  var settings = window.settings || {};

  window.addEventListener("load", function() {
    require(modules, function() {
      if (!settings.disableViewDiv) {
        var viewDiv = create("div", {
          id: "viewDiv"
        });

        if (!settings.disableLog)
        viewDiv.appendChild(create("div", {
          id: "viewLog"
        }));

        if (!settings.disableOverviewMap) {
          viewDiv.appendChild(create("div", {
            id: "overviewDiv"
          }));
        }

        document.body.appendChild(viewDiv);
      }

      for (var i = 0; i < modules.length; i++) {
        var names = modules[i].split("/");
        var name = names[names.length - 1];

        // Avoid ES6 Map conflict
        if (name === "Map") {
          name = "EsriMap";
        }

        window[name] = arguments[i];
      }

      window.snippet(Array.prototype.slice.apply(arguments));

      if (!settings.disableOverviewMap) {
        var mapView = new window.MapView({
          map: new window.EsriMap({
            basemap: "streets"
          }),

          container: "overviewDiv",

          ui: {
            components: []
          }
        });

        mapView.then(function() {
          mapView.constraints.snapToZoom = false;
        });

        window.view.watch("extent", function(extent) {
          mapView.extent = extent;
        });
      }
    });
  });
})((window.modules || []).slice());

window.addEventListener("message", function(m) {
  if (m.data && m.data.play) {
    window.play();
  }
}, false);
