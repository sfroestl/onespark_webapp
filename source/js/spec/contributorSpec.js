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
		it("removes a user when added", function(){
			var contributor;
			var user;
			var coworker;
			var coworkers;
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
			runs(function(){
				expect(newContributorController.get("possibleUsers.length")).toEqual(0);
			});			
		});
	});
	
});
