function checkEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(email) == false) {
        return false;
     } else {
        return true;
     }
  }

   /* ### Validation ### */

  function isEmptyValidation(emptyArray) {
    for (i=0;i<emptyArray.length;++i) {
      if(emptyArray[i] == '') {
        App.FlashMessage.create({text: "Fill up everything"});
        return false;
      }
    }
    console.log("testest");
    return true
  }

  function usernameLength(name) {
    if(name.length < 3) {
      App.FlashMessage.create({text: "Username " + name + " is too short."});
      return false;
    } else {
      return true;
    }
  }

  function  matchPwValidation(pw1, pw2) {
    if(pw1 != pw2) {
      App.FlashMessage.create({text:"Your passwords don't match."});
      return false;
    } else {
      return true;
    }
  }

  function  pwLengthValidation(pw) {
    if(pw.length < 6) {
      App.FlashMessage.create({text:"Password to short."});
      return false;
    } else {
      return true;
    }
  }

  function isEmailValid(email) {
    if(checkEmail(email) == false) {
      App.FlashMessage.create({text:"Invalid Email address."});
      return false;
    } else {
      return true;
    }
  }