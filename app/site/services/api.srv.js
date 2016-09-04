(function(){
    
    angular
        .module('myApp')
        .service('api', ApiService)

    function ApiService($http) {
        var self = this;

        self.request = request;

        function request(endpoint,data,method) {
        	var res;
          //build request
            if(method == 'POST'){
                data = JSON.stringify(data);
                res = $http.post(endpoint,data)
                return res
            }
            else if(method == 'GET'){
                data = formatGetData(data);
                res = $http.get(endpoint+data);
                return res
            }
            else if(method == 'PUT'){
                data = JSON.stringify(data);
                res = $http.put(endpoint,data);
                return res
            }
            else if(method == 'DEL'){
                res = $http.delete(endpoint);
                return res
            }
        };

        function formatGetData(data){
            var data_string = '?';
            for(item in data){
                if(data_string == '?'){
                    data_string += item+'='+encodeURIComponent(data[item]);
                }
                else{
                    data_string +='&'+item+'='+encodeURIComponent(data[item]);
                }
            }
            if(data_string == '?'){return '';}
            return data_string;
        }
    }

})();