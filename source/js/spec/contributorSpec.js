describe("The ContributorsController for a sample Project", function(){
    var server;
    var project;
    var contributorsController;
	var login= function() {
		if (App.get("session.SessionUserId")==1) return;
		runs(function () {
			App.get("session").login("bob","testbob");
		});
		
		waitsFor(function() {
			return App.get("session.signedIn");
		}, "login didn't work", 5000);

	};
	beforeEach(function(){
	   var server = serverMock();
       
       login();
       runs(function(){
	        project = App.Project.find(1);
	   });
		waitsFor(function() {
			return project.get("isLoaded");
		}, "loading project", 5000);
	   
	   runs(function() {
		   contributorsController = App.ContributorsController.create({content: project});
       });
    });

	it("should be defined", function(){
        expect(contributorsController).toBeDefined();
    });
	it("should have a list of readers", function(){
        expect(contributorsController.get("readers")).toBeDefined();
    });
	it("should have a list of writers", function(){
        expect(contributorsController.get("writers")).toBeDefined();
    });
	it("should have a list of admins", function(){
        expect(contributorsController.get("admins")).toBeDefined();
    });
});
describe("The NewContributorController for a sample Project", function(){
    var server;
    var project;
    var newContributorController;
	var login= function() {
		if (App.get("session.SessionUserId")==1) return;
		runs(function () {
			App.get("session").login("bob","testbob");
		});
		
		waitsFor(function() {
			return App.get("session.signedIn");
		}, "login didn't work", 5000);

	};
	beforeEach(function(){
	   var server = serverMock();
       
       login();
       runs(function(){
	        project = App.get("session.sessionUser.ownedProjects.firstObject");
	   });
		waitsFor(function() {
			return project.get("isLoaded");
		}, "loading project", 5000);
	   
	   runs(function() {
		   newContributorController = App.NewContributorController.create({project: project});
       });
    });

	it("should be defined", function(){
        expect(newContributorController).toBeDefined();
    });
	it("should have a list of three possible Permissions", function(){
        expect(newContributorController.get("possiblePermissions")).toBeDefined();
        expect(newContributorController.get("possiblePermissions.length")).toEqual(3);
    });
    describe("The List of Users to be added",function() {
		it("should be defined", function(){
			expect(newContributorController.get("possibleUsers")).toBeDefined();
		});
		it("does not contain a current contributor", function(){
			expect(newContributorController.get("possibleUsers.0.id")).toNotEqual(null);
			expect(newContributorController.get("possibleUsers.0.id")).toNotEqual("2");
		});
		it("does not contain a current contributor", function(){
			expect(newContributorController.get("possibleUsers.0.id")).toNotEqual(null);
			expect(newContributorController.get("possibleUsers.0.id")).toNotEqual("1");
		});
		it("does contain only the accepted contacts", function(){
			expect(newContributorController.get("possibleUsers.0.id")).toEqual("3");
			expect(newContributorController.get("possibleUsers.length")).toEqual(1);
		});
	});
	describe("when adding a user", function(){
		var user;
		runs(function() {
			user = App.get("session.sessionUser.acceptedContacts.firstObject");
		});
		waitsFor(function() {
			return user.get("isLoaded");
		}, "loading user", 5000);
		runs(function(){
			expect(newContributorController.get("possibleUsers.length")).toEqual(1);
			contributor = newContributorController.save(user,3);
		});
		waitsFor(function() {
			return contributor.get("stateManager.currentPath")=="rootState.loaded.saved";
		}, "saving contributor", 5000);
		it("the candidate list is empty", function(){
			runs(function(){
				expect(newContributorController.get("possibleUsers.length")).toEqual(0);
			});			
		});
		it("he is visible in admins list", function(){
			runs(function(){
				var contributorsController  = App.ContributorsController.create({content: project});
				expect(contributorsController.get("admins.length")).toEqual(1);
			});			
		});		
	})
});
describe("The EditContributorController for a sample Project", function(){
    var server;
    var project;
    var editContributorsController;
    var contributorsController;
	var login= function() {
		if (App.get("session.SessionUserId")==1) return;
		runs(function () {
			App.get("session").login("bob","testbob");
		});
		
		waitsFor(function() {
			return App.get("session.signedIn");
		}, "login didn't work", 5000);

	};
	beforeEach(function(){
	   var server = serverMock();
       
       login();
       runs(function(){
	        project = App.get("session.sessionUser.ownedProjects.firstObject");
	   });
		waitsFor(function() {
			return project.get("isLoaded");
		}, "loading project", 5000);
	   
	   runs(function() {
		   editContributorsController = App.EditContributorsController.create({project: project});
       });
    });

	it("should be defined", function(){
        expect(editContributorsController).toBeDefined();
    });
	it("should have a list of three possible Permissions", function(){
        expect(editContributorsController.get("possiblePermissions")).toBeDefined();
        expect(editContributorsController.get("possiblePermissions.length")).toEqual(3);
    });
    
	describe("when making a writer a reader", function(){
		var coworker;
		var view;
		
		runs(function() {
			coworker = project.get("contributors.firstObject");
			contributorsController = App.ContributorsController.create({content: project});
			view = App.EditContributorsControlsView.create({record: coworker});
		});
		waitsFor(function() {
				return coworker.get("isLoaded");
		}, "loading coworker", 5000);

		it("has a list of one writer initially", function() {
			expect(contributorsController.get("writers.length")).toEqual(1);
		});
			
		runs(function(){
			view.set("permission",1);
		});
		waitsFor(function() {
			return coworker.get("projectCoworker.stateManager.currentPath")=="rootState.loaded.saved";
		}, "saving coworker", 5000);
		it("the writer list is empty", function(){
			runs(function(){
				expect(contributorsController.get("writers.length")).toEqual(0);
			});			
		});
		it("the readerslist was filled", function(){
			runs(function(){
				expect(contributorsController.get("readers.length")).toEqual(1);
			});			
		});		
	});
});
