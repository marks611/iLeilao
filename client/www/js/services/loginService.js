(function() {
'use strict';

    angular
        .module('starter.services')
        .value('auth', {
            done: false,
            data: null,
            id: null,
            token: null,
            participante: null
        })
        .service('LoginService', LoginService);

    LoginService.$inject = ['api', '$http', 'auth', '$ionicPopup', '$rootScope'];
    function LoginService(api, $http, auth, $ionicPopup, $rootScope) {
        this.doLogin = doLogin;
        this.recover = recover;
        
        ////////////////

        function doLogin(user, pass, cb) {
            if (!api.on()) {
                auth.done = true;
                cb(true);
                return;
            }
            $http({
                method: 'POST',
                url: api.url() + 'logins',
                data: { email: user, senha: pass }
            }).success(function (data) {
                auth.data = data;
                auth.done = true;
                auth.token = data.tokenUsuario.tokenUsuario;
                auth.id = '1ff83f28-8d42-4fb0-a976-c13344d70917';
                $rootScope.participante = true;
                auth.participante = true;
                // auth.id = data.id;
                // $rootScope.participante = data.tipo == 0;
                cb(true);
            }).error(function (data) {
                auth.done = false;
                console.log(data);
                $ionicPopup.alert({
                    title: 'Ops!',
                    template: data[0].errorMessage
                });
                cb(false);
            });
        }

        function recover(email) {
            
        }
    }
})();