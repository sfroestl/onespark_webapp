describe("The Validator", function(){

	beforeEach(function() {
       validUsername = "bob";
       invalidUsername = "bo";

       validPassword = "asdasd";
       invalidPassword = "asd";

       invalidMatchingPassword = "asdass";

       validEmail = "bob@gmx.de";
       invalidEmail = "bob.de";

       emptyArray = new Array("", "", "", "");
       fullArray = new Array(validUsername, validEmail, validPassword, validPassword);
    });

	it("should have a isEmptyValidation function", function(){
		expect(isEmptyValidation).toBeDefined();
	});

	it("should have a matchPwValidation function", function(){
		expect(matchPwValidation).toBeDefined();
	});

	it("should have a pwLengthValidation function", function(){
		expect(pwLengthValidation).toBeDefined();
	});

	it("should have a isEmailValid function", function(){
		expect(isEmailValid).toBeDefined();
	});

	it("should have a usernameLength function", function(){
		expect(usernameLength).toBeDefined();
	});

	it("should validate empty textfields", function () {  
        expect(isEmptyValidation(emptyArray)).toEqual(false);
        expect(isEmptyValidation(fullArray)).toEqual(true);
    }); 

    it("should validate emails", function () {  
        expect(isEmailValid(invalidEmail)).toEqual(false);
        expect(isEmailValid(validEmail)).toEqual(true);
    }); 

    it("should validate username length", function () {  
        expect(usernameLength(invalidUsername)).toEqual(false);
        expect(usernameLength(validUsername)).toEqual(true);
    });

    it("should validate password length", function () {  
        expect(pwLengthValidation(invalidPassword)).toEqual(false);
        expect(pwLengthValidation(validPassword)).toEqual(true);
    });  

    it("should validate matching passwords", function () {  
        expect(matchPwValidation(invalidMatchingPassword, validPassword)).toEqual(false);
        expect(matchPwValidation(validPassword, validPassword)).toEqual(true);
    });  
});