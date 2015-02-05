module.exports = function (contentString, dataStores) {
  var script = '';
  var args;
  if (arguments.length > 1) {
    var i = 1;
    var argumentsLength = arguments.length;
    script = '<script>window.__preloadedData = {};';
    for (i; i < argumentsLength; i++) {
      dataStores = arguments[i];
      script += 'window.__preloadedData["' + datastores.key + '"] = ' + datastores.data + ';';
    }
    script += '</script>';
  }
  return (
    "<!DOCTYPE html>" +
    "<html lang='en'>" +
      "<head>" +
        "<title>Isomorphic App</title>" +
        "<link rel='stylesheet' href='./stylesheets/style.css'>" +
      "</head>" +
      "<body>" +
        "<h1>Hello Todo</h1>" +
        "<div id='content'>" +
          contentString +
        "</div>" +
        "<script src='./javascripts/bundle.js' async></script>" +
        script +
      "</body>" +
    "</html>"
  );
};
