$(document).ready(function () {

    $("#msj-error").hide();
    $("#msj-cargando").hide();

    $(document).on('click', function () {
        $("#msj-error").hide();
    });
    
    //Al dar enter te puedes loguear
    var elem = document.getElementById("password");

    elem.onkeyup = function (e) {
        if (e.keyCode == 13) {
            var usu = $("#user");
            var pass = $("#password");
            $.get("LoginController", {
                key: "verificar",
                usuario: usu.val(),
                password: pass.val()
            },
                    function (response, status, xhr) {
                        //console.log(response);
                        if (status == "success") {
                            if (response == "error") {
                                $("#msj-error").show();
                            } else {
                                $("#msj-cargando").show();
                                document.open("text/html", "replace");
                                document.write(response);
                                document.close();
                            }
                        }
                    }
            );
        }
    }

    /*
     $('#btn-login').on('click', function () {
     
     var usuario = $('#user');
     var password = $('#password');
     
     $.ajax({
     
     url: 'LoginController',
     cache: false,
     method: 'POST',
     data: {
     key: 'verificar',
     usuario: usuario.val(),
     password: password.val()
     },
     success: function (response) {                                
     
     console.log(response);
     
     if (response === 'success') {
     
     $('#msj-error').hide();
     console.log("succes 2");
     } else {
     $('#msj-error').show();
     console.log("response 3");
     }
     
     
     }
     
     
     });
     
     });
     */

    $('#btn-login').on('click', function () {
        var usu = $("#user");
        var pass = $("#password");
        $.get("LoginController", {
            key: "verificar",
            usuario: usu.val(),
            password: pass.val()
        },
                function (response, status, xhr) {
                    //console.log(response);
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            $("#msj-cargando").show();
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });



    $('#registrate').click(function () {
        $.postGo("ZonaController", {
            key: "getRegistro"
        });
    });

});


