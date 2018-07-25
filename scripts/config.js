app.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'partials/User.html',
        controller: 'app_controller',
	}).when('/profile',{
		templateUrl: 'partials/Profile.html',
        controller: 'profile_controller',
	});
});