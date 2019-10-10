/**
 * chips
 * chips directive for AngularJS
 * By Bhaskar Bhattachariya
 */

angular.module('chips', [] )
    .directive('chips', function ($http) {
    return {
    	restrict: 'E',
    	
    	scope: {
    		"name": "@name",
    		"placeholder": "@placeholder",
            "id": "@id",
            "url": "@url",
            "chipdataarray": "=chipdataarray",
            "class": "@class",
            "value": "@value"
           
        },
        
        template: '<div><div class="chip {{class}}" id="{{id}}" data-url="{{url}}" ng-repeat="(ke, val) in chipdataarray'
			+ '">{{val}}<span class="closebtn" ng-click="closechip(ke)" >'
			+'<i class="fas fa-times-circle"></i></span></div></div>'
			+'<input type="text" class="form-control form-control-sm " id="{{id}}_chip" placeholder="{{placeholder}}" '
			+'name="{{name}}_show" list="list_{{id}}" ng-blur="addkeys()" ng-model="model" />'
			+'<input type="hidden" name="{{name}}" value="{{chipdataarray.toString()}}" />'
			+'<datalist id="list_{{id}}"><option ng-repeat="x in tags" value="{{x}}">{{x}}</option></datalist>',

			
		controller:function($scope){
			if($scope.chipdataarray.length==0 && $scope.value.length>0)
				$scope.chipdataarray = $scope.value.split(",");
			
	        $http({method: 'GET', url:$scope.url}).then(
	        		function (result) {
	        			console.log(result); 
	        			$scope.tags = result.data;
        			}, function (result) {
                        alert("Error: No data returned");
        			}	
    			);
	    },
        
        link: function($scope, elem, attrs) {      
        	$scope.tags = null;
        	$scope.model = '';
        	
        	$scope.closechip = function(key){
        		$scope.chipdataarray.splice(key, 1);
        	};
        	
        	$scope.addkeys=function(){
        		var ki = $scope.model;
        		if($scope.model ==''){
        			return;
        		}
        		if ($scope.chipdataarray.includes(ki)) {
        			return;
        		}
        		
        		$scope.chipdataarray.push(ki);
        		$scope.model = '';
        	}
        	
        },        
    }
});