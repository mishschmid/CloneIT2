//***********************************************
// NEWPOST CONTROLLER
//***********************************************

(function() {
    var app = angular.module('cloneIT').controller('NewPostController', ['$scope', '$http', 'ajaxRequest', 'sharedProperties', function($scope, $http, ajaxRequest, sharedProperties) {
	    var userId = '';
	    var items = '';
	    console.log('userId im Newpost Ctrl: ', userId);
	    console.log('items im Newpost Ctrl: ', items);
        $scope.newPostCtrl = {};
	    var newPost = {};
	    $scope.tags = [{tag: 'Fun'}, {tag: 'Scary'}, {tag: 'Movies'}, {tag: 'Games'}, {tag: 'Nature'}];
        $scope.addPost = function () {
	        newPost = {};
	        newPost.title = $scope.newPostCtrl.title;
	        newPost.url = $scope.newPostCtrl.url;
	        newPost.tag = $scope.newPostCtrl.tag.tag;
	        newPost.imgurl = "images/bunny.png";
	        newPost.upvotes = 0;
	        newPost.downvotes = 0;
	        newPost.commented = 0;
//	        newPost.createdBy = userId;
		    newPost.creadtedBy = userId = sharedProperties.getUserId();
	        newPost.createdOn = Date.now();
	        newPost.comments = [];
	        newPost.newpostclass = "is-new";
	        $scope.newPostCtrl = {};
	        $('.big-nav input').removeClass('ng-dirty');


	        // Posting a new post using the ajaxRequest service
	        ajaxRequest.post('/addpost', newPost, function (response) {
		        newPost._id = response._id;
		        ajaxRequest.updateUserPost('/post-by-user', newPost._id, userId);
	        });

		    sharedProperties.addItem(newPost);
	        setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 100);
        };
    }]);
})();