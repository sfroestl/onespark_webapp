describe("The router", function(){

    var router = App.Router.create();


    it("Should be defined", function(){
        expect(router).toBeDefined();
    });

    it("Should have an root route", function(){
        expect(router.get("root")).toBeDefined();
    });
    
    describe("its root route", function(){
        var root = null;
        beforeEach(function(){
            root = router.get("root").create();
        });

        afterEach(function(){
            root = null;
        });

        it("should have an index route", function(){
            expect(root.get("index")).toBeDefined();
        });

        it("should have an loggedIn route", function(){
            expect(root.get("loggedIn")).toBeDefined();
        });

        it("should have an loggedOut route", function(){
            expect(root.get("loggedOut")).toBeDefined();
        });
        

        describe("its index route", function(){
            var indexRoute = null;
            beforeEach(function(){
                indexRoute = root.get("index").create();
            });

            it ("should have route of /", function(){
                expect(indexRoute.get("route")).toEqual("/");
            });
        });

        describe("its loggedIn route", function(){
        	var loggedInRoute = null;
            beforeEach(function(){
                loggedInRoute = root.get("loggedIn").create();
            });

	        it("should have an user route", function(){
	            expect(loggedInRoute.get("user")).toBeDefined();
	        });

	       	it("should have an logout function", function(){
	            expect(loggedInRoute.goLoggedOut).toBeDefined();
	        });

	       	describe("its user route", function(){
	            var userRoute = null;
	            beforeEach(function(){
	                userRoute = loggedInRoute.get("user").create();
	            });

	            it ("should have route of /user", function(){
	                expect(userRoute.get("route")).toEqual("/user");
	            });

                describe("its profile route", function(){
                    var profileRoute = null;
                    beforeEach(function(){
                        profileRoute = userRoute.get("profile").create();
                    });

                    it ("should have route of /profile", function(){
                        expect(profileRoute.get("route")).toEqual("/profile");
                    });  

                    it("should have an update function", function(){
                        expect(profileRoute.goUpdate).toBeDefined();
                    });

                    it("should have a delete function", function(){
                        expect(profileRoute.goDelete).toBeDefined();
                    });
                });

                describe("its contacts route", function(){
                    var contactsRoute = null;
                    beforeEach(function(){
                        contactsRoute = userRoute.get("contacts.index").create();
                    });

                    it ("should have route of /contacts", function(){
                        expect(contactsRoute.get("route")).toEqual("/contacts");
                    });

                    it("should have a add function", function(){
                        expect(contactsRoute.goAddContact).toBeDefined();
                    });   

                    it("should have a remove function", function(){
                        expect(contactsRoute.goRemove).toBeDefined();
                    });  

                    it("should have a accept function", function(){
                        expect(contactsRoute.goAccept).toBeDefined();
                    });    
                });
        	});
        });

		describe("its loggedOut route", function(){
			var loggedOutRoute = null;
			beforeEach(function(){
				loggedOutRoute = root.get("loggedOut").create();
			});

            describe("its login route", function(){
                var loginRoute = null;
                beforeEach(function(){
                    loginRoute = loggedOutRoute.get("login").create();
                });

    			it("should have an login function", function(){
    	            expect(loginRoute.goLoggedIn).toBeDefined();
    	        });
            });
		});
    });
});
