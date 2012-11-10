//= require ../../libs/jquery/jquery.base64.min.js
function encodeBase64(user, pw) {
  var base = user + ':' + pw;
  var encoded = $.base64.encode(base);
  return encoded;
}
