// 第一种：直接调用 eval
function jsonParse(json) {
  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three =
    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  if (
    rx_one.test(
      json.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
    )
  ) {
    var obj = eval("(" + json + ")");
  }
  return obj;
}
// 第二种：Function
var jsonStr = '{ "age": 20, "name": "jack" }'
var json = (new Function('return ' + jsonStr))();
