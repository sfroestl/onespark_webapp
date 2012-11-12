describe( "The base64 converter", function () {  
    it("should convert username and password to base64", function () {  
        expect(encodeBase64("bob", "testbob")).toEqual("Ym9iOnRlc3Rib2I=");
    });  
});
