app.controller('profile_controller', function($scope, $location, $http,
		$rootScope) {
	$scope.followerFlag = true;
	$scope.onInit = function() {
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	     var login = hashes[0].split('=');
		$http.get("https://api.github.com/users/" + login[1]).then(
				function(response) {
					$scope.profileData = response.data;

					$scope.imagePath = $scope.profileData.avatar_url;
					$scope.followersUrl = $scope.profileData.followers_url;
					$scope.reposUrl = $scope.profileData.repos_url;

					$http.get($scope.followersUrl).then(function(response) {
						$scope.followers = response.data;

					});

					$http.get($scope.reposUrl).then(function(response) {
						$scope.repos = response.data;

					});

				});
	}
	$scope.onInit();
	$scope.showFollowersRepos = function() {

		$scope.followerFlag = !$scope.followerFlag;

	}
})