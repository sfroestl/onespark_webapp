describe("The router", function(){

    var router = null;

    App = Ember.Application.create();

    beforeEach(function(){
        router = App.Router.create();
    });

    afterEach(function(){
        router = null;
    });

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

	        it("should have an users route", function(){
	            expect(loggedInRoute.get("users")).toBeDefined();
	        });

	       	it("should have an projects route", function(){
	            expect(loggedInRoute.get("projects")).toBeDefined();
	        });

	       	it("should have an logout function", function(){
	            expect(loggedInRoute.goLoggedOut).toBeDefined();
	        });

	       	describe("its users route", function(){
	            var usersRoute = null;
	            beforeEach(function(){
	                usersRoute = loggedInRoute.get("users").create();
	            });

	            it ("should have route of /users", function(){
	                expect(usersRoute.get("route")).toEqual("/users");
	            });
        	});

	       	describe("its projects route", function(){
	            var projectsRoute = null;
	            beforeEach(function(){
	                projectsRoute = loggedInRoute.get("projects").create();
	            });

	            it ("should have route of /projects", function(){
	                expect(projectsRoute.get("route")).toEqual("/projects");
	            });
        	});
        });

		describe("its loggedOut route", function(){
			var loggedOutRoute = null;
			beforeEach(function(){
				loggedOutRoute = root.get("loggedOut").create();
			});

			it("should have an login function", function(){
	            expect(loggedOutRoute.goLoggedIn).toBeDefined();
	        });
		});
    });

});