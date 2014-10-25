'use strict';

//***********************************************
// AJAX REQUEST SERVICES
//***********************************************

var app = angular.module('cloneIT');

app.service('ajaxRequest',['$http','loginHandler', function($http, loginHandler){
    this.get = function(url, callback){

		 return $http.get(url).success(function (response){
			 var responseFromGet = '';
			 callback(response);
        })
    };

	this.post = function(url, data, callback){
		$http.post(url, data).success(function (response){
			console.log('RESPONSE BACK IN AJAX SERVICE: ',response);

			if(response.newPost){
				callback(response);
			}

			else if(response.username){
				loginHandler.correct(response);
				callback(response);
			}
			else if(response[0] === 'user-added-successfully'){
				loginHandler.correct(response);
				callback(response);
			}
			else if(response[0] === 'already-taken'){
				loginHandler.taken(response);
				callback(response);
			}
			switch(response) {
				case "wrong":
					loginHandler.wrong();
					break;
				case "not-found":
					loginHandler.notFound();
					break;
				case "error":
					loginHandler.error();
					break;
				case "unknown":
					loginHandler.unknown();
					break;
			}
		})
	};

	this.update = function(url, postId, newComment){
		console.log(url +' ' + postId + ' ' + newComment);
		$http.post(url, {"_id": postId,"newComment": newComment}).success(function (response){
			console.log('Response from the other side: ');
			console.log(response);
		})
	};

	this.updateUserUpvote = function (url, postId, userId){
		console.log(url +' ' + postId + ' ' + userId);
		$http.post(url, {postId: postId, userId: userId}).success(function (response){
			console.log('Response from the other side: ');
			console.log(response);
		})

	};

	this.updateUserDownvote = function (url, postId, userId){
		console.log(url +' ' + postId + ' ' + userId);
		$http.post(url, {postId: postId, userId: userId}).success(function (response){
			console.log('Response from the other side: ');
			console.log(response);
		});
	};

	this.updateUserPost = function (url, postId, userId){
		console.log(url +' ' + postId + ' ' + userId);
		$http.post(url, {postId: postId, userId: userId}).success(function (response){
			console.log('Response from the other side: ');
			console.log(response);
		})
	};

	this.remove = function(url, postID){
		console.log('postId: ');
		console.log(postID);
		$http.delete(url).success(function (response){
			console.log(response);
		})
	};
}]);