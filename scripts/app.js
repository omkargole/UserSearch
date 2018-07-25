var app = angular.module('app', [ 'ngRoute' ]);
app
		.controller(
				'app_controller',
				function($scope, $location, $http, $rootScope) {
					$scope.userProfile = function(login) {
						$rootScope.login = login;
						$location.path('/profile/').search({param: login});
						//$location.path("\profile\"+ $rootScope.login);
					}
					$scope.barChart = function(data) {
						$scope.showChart = true;
						$scope.data = data;
						$scope.options = {
							width : 800,
							height : 500,
							'bar' : 'aaa'
						};
						$scope.hovered = function(d) {
							$scope.barValue = d;
							$scope.$apply();
							$scope.barValue = 'None';
						};
					}
					$scope.searchUsers = function(form) {
						if (form.$valid) {
							$http
									.get(
											"https://api.github.com/search/users?q="
													+ $scope.search)
									.then(
											function(response) {
												$scope.data = [];
												$scope.chartData = [];
												$scope.responseData = response.data;

												if ($scope.responseData.incomplete_results == false) {
													$scope.userList = $scope.responseData.items;
													$scope.totalNumberOfUsers = $scope.userList.length;

													for (var i = 0; i < 10; i++) {
														$http
																.get(
																		"https://api.github.com/users/"
																				+ $scope.userList[i].login)
																.then(
																		function(
																				response) {
																			$scope.userData = response.data;
																			$scope.chartData
																					.push($scope.userData.followers);
																			if ($scope.chartData.length == "10") {
																				$scope
																						.barChart($scope.chartData);
																			}

																		});
													}

													console
															.log("Data Fetch Successfully");
												} else {
													alert("Fail to fetch users");
												}
											});
						} else {
							alert("Please enter key");
						}
					}

				})