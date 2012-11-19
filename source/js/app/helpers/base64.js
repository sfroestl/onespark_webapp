//= require ../../libs/jquery/jquery.base64.min.js
function encodeBase64(user, pw) {
  if (!user && !pw) return null;
  var base = user + ':' + pw;
  var encoded = $.base64.encode(base);
  return encoded;
}
function decodeBase64Credentials(encoded) {
  if (!encoded) return {};
  var original = $.base64.decode(encoded);
  if (!original) return {};
  credentials = original.split(":");
  return {username:credentials[0],password:credentials[1]};
}
