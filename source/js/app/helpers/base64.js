//= require ../../libs/jquery/jquery.base64.min.js
function encodeBase64(user, pw) {
  if (!user && !pw) return null;
  var base = user + ':' + pw;
  var encoded = $.base64.encode(base);
  return encoded;
}
