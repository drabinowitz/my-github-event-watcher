module.exports = function (contentString, dataStores) {
  var script = '';
  var args;
  if (arguments.length > 1) {
    var i = 1;
    var argumentsLength = arguments.length;
    script = '<script>window.__preloadedData = {};';
    for (i; i < argumentsLength; i++) {
      dataStores = arguments[i];
      script += 'window.__preloadedData["' + dataStores.key + '"] = ' + dataStores.data + ';';
    }
    script += '</script>';
  }
  return (
    "<!DOCTYPE html>" +
    "<html lang='en'>" +
      "<head>" +
        "<title>Github Event Chart</title>" +
        "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'>" +
      "</head>" +
      "<body>" +
        "<div id='content'>" +
          contentString +
        "</div>" +
        script +
        "<script src='./javascripts/bundle.js' async></script>" +
      "</body>" +
    "</html>"
  );
};
