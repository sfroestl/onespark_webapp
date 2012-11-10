describe( "base64 converter", function () {  
    it("converts username and password to base64", function () {  
        //expect(Convert(12, "in").to("cm")).toEqual(30.48);  
        expect(encodeBase64("bob", "testbob")).toEqual("Ym9iOnRlc3Rib2I=");
    });  
});