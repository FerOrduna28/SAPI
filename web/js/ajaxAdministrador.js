$(document).ready(function () {

    /////////////////// GESTION ADMINISTRADORES

    ///////Agregar un nuevo administrador

    //Esconder mensajes de error
    $('#errorNombreAdministrador').hide();
    $('#errorTelefonoAdministrador').hide();
    $('#errorApellidoPaternoAdministrador').hide();
    $('#errorApellidoMaternoAdministrador').hide();
    $('#errorCorreoAdministrador').hide();
    $('#errorCorreoRepetidoAdministrador').hide();
    $('#errorNumEmpleadoAdministrador').hide();
    $('#errorAgregarEspecialidadAdministrador').hide();
    $('#errorAgregarPosicionAdministrador').hide();
    $('#errorCedulaAdministrador').hide();
    $('#errorPass1Administrador').hide();
    $('#noEqualPasswordsErrorAdministrador').hide();



    $('#btn-agregarAdministrador').on('click', function () {

        //AQUÍ VA EL MEGAIF

        $.ajax({

            url: 'RegistraUsuarioController',
            method: "POST",
            cache: false,
            data: {
                key: "agregarAdministrador",
                nombre: $('#agregar-nombreAdministrador').val(),
                telefono: $('#agregar-telefonoAdministrador').val(),
                primerApellido: $('#agregar-primerApellidoAdministrador').val(),
                segundoApellido: $('#agregar-segundoApellidoAdministrador').val(),
                correo: $('#agregar-correoAdministrador').val(),
                noEmpleado: $('#agregar-noEmpleadoAdministrador').val(),
                especialidad: $('#agregar-especialidadAdministrador').val(),
                posicion: $('#agregar-posiciondAdministrador').val(),
                cedula: $('#agregar-cedulaAdministrador').val(),
                password: $('#agregar-passwordAdministrador').val()

            },
            success: function (response) {
                alert(response);
                if (response == "success") {

                    //mensaje de confirmacion
                    swal({
                        title: "¡Buen trabajo!",
                        text: "Administrador agregado correctamente.",
                        icon: "success",
                        buttons: [, 'Aceptar'],
                    });


                    //limpiar los campos del modal
                    $('#agregar-nombreAdministrador').val('');
                    $('#agregar-telefonoAdministrador').val('');
                    $('#agregar-primerApellidoAdministrador').val('');
                    $('#agregar-segundoApellidoAdministrador').val('');
                    $('#agregar-correoAdministrador').val('');
                    $('#agregar-noEmpleadoAdministrador').val('');
                    $('#agregar-especialidadAdministrador').val('');
                    $('#agregar-posiciondAdministrador').val('');
                    $('#agregar-cedulaAdministrador').val('');
                    $('#agregar-passwordAdministrador').val('');
                    $('#agregar-password2Administradores').val('');

                    //cerrar el modal
                    $('#modalAgregarAdministrador').modal('toggle');

                } else {
                    swal("Error", "Hubo un problema al agregar el administrador", "error");
                }

            }


        });

    });

    ///////Editar un administrador

    //Esconder mensajes de error
    $('#errorEditarNombreAdministrador').hide();
    $('#errorEditarApellidoPaternoAdministrador').hide();
    $('#errorEditarApellidoMaternoAdministrador').hide();
    $('#errorEditarCorreoAdministrador').hide();
    $('#errorEditarCorreoRepetidoAdministrador').hide();
    $('#errorEditarTelefonoAdministrador').hide();
    $('#errorEditarNumEmpleadoAdministrador').hide();
    $('#errorEditarEspecialidadAdministrador').hide();
    $('#errorEditarCedulaAdministrador').hide();
    $('#error-editarDatosRepetidosAdministrador').hide();


    //Recupera administrador
    $('.btn-editarAdministrador').on('click', function () {

        var id = $(this).data('id');

        $('#idAdministrador').val($(this).data('id'));

        $.ajax({

            url: 'AdministradorController',
            method: "POST",
            cache: false,
            data: {
                key: "recupera-administrador",
                id: id
            },
            success: function (response) {

                var data = JSON.parse(response);

                //Reemplazar los datos en el modal



            }

        });

    });

    ///////Eliminar un administrador
    $('.btn-eliminarAdministrador').on('click', function () {

        var id = $(this).data('id');

        $('#idAdministrador').val($(this).data('id'));

        swal({
            title: "¿Estás segura?",
            text: "Una vez eliminado, el administrador y sus datos ya no se podrán recuperar.",
            icon: "warning",
            buttons: true,
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
                .then((eliminar) => {

                    if (eliminar) {

                        $.ajax({

                            url: 'AdministradorController',
                            cache: false,
                            method: 'POST',
                            data: {

                                key: "eliminar-administrador",
                                id: id

                            },
                            success: function (response) {




                            }

                        });



                    }
                });

    });


    //Guarda administrador
    $('#btn-guardarAdministrador').on('click', function () {

        $.ajax({

            url: 'AdministradorController',
            method: 'POST',
            cache: false,
            data: {
                key: 'editar-administrador',
                id: $('#idAdministrador').val(),
                nombre: $('#editar-nombreAdministrador').val(),
                primerApellido: $('#editar-primerApellidoAdministrador').val(),
                segundoApellido: $('#editar-segundoApellidoAdministrador').val(),
                correo: $('#editar-correoAdministrador').val(),
                telefono: $('#editar-telefonoAdministrador').val(),
                noEmpleado: $('#editar-noEmpleadoAdministrador').val(),
                especialidad: $('#editar-especialidadAdministrador').val(),
                posicion: $('#editar-posiciondAdministrador').val(),
                cedula: $('#editar-cedulaProfesionalAdministrador').val()
            },
            success: function (response) {

            }

        });

    });

    /////////////////////////////// MI CUENTA ////////

    $('.error-correo').hide();
    $('.error-correoRepetido').hide();
    $('.error-usuario').hide();
    $('.error-usuarioRepetido').hide();
    $('#error-contrasena').hide();
    $('#noEqualPasswordsError').hide();

    //Guardar cambios

    $("#guardarCambios").on('click', function () {

        if (isValidUserName($('#username')) && isValidEmail($('#correo')) && !existeUsuario($("#username").val()) && !existeCorreo($("#correo").val())) {

            console.log("Presionó GuardarCambios");
            var form = $("form")[0];
            console.log(form);
            var data = new FormData(form);
            data.append("key", "cambiarDatos");
            data.forEach((value, key) => {
                console.log(key + " " + value);
            });

            $.ajax({
                url: "AdministradorController",
                data: data,
                method: "POST",
                enctype: 'multipart/form-data',
                processData: false, // Important!
                contentType: false,
                cache: false,
                success: function (response) {

                    swal({
                        title: "Buen trabajo!",
                        text: "Cuenta actualizada correctamente",
                        icon: "success",
                        button: "Ok",
                    })
                            .then((value) => {
                                $.post("SAPI", {
                                    file: "administrador/cuentaAdministrador.jsp"
                                },
                                        function (response, status, xhr) {
                                            console.log("El ajax fue exitoso!!-----------------------");
                                            if (status == "success") {
                                                if (response == "error") {
                                                    swal("Error", "Hubo un error actualizando tus datos", "error");
                                                } else {
                                                    document.open("text/html", "replace");
                                                    document.write(response);
                                                    document.close();

                                                }
                                            }
                                        }
                                );
                            });


                },
                error: function (xhr) {
                    //alert(xhr.statusText);
                }
            });


        } else {
            swal({
                title: "Error",
                text: "Verifica que todos los datos sean validos",
                icon: "error",
                button: "Entendido!",
            });

        }

    });


    //Cambiar imagen temporalmente en elfront
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#ImagenPerfil').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#file-input").on('change', function () {
        console.log("Llegó :)");
        readURL(this);
    });

    ////*****CAMBIAR CONTRASEÑA
    $("#btn-updatePassword").on('click', function () {


        //Modal cambiar contraseña 
        if (isValidPassword($('#password')) && isValidPassword($('#password2')) && areEqualPasswords($('#password'), $('#password2'))) {
            swal({
                title: "¿Estás segura(o) que deseas guardar los cambios de tu contraseña?",
                text: "No podras volver a usar tu contraseña anterior para ingresar",
                icon: "warning",
                buttons: true,
                buttons: ['Regresar', 'Cambiar contraseña'],
                dangerMode: true
            })
                    .then((cambiar) => {
                        if (cambiar) {
                            $.ajax({
                                url: "AdministradorController",
                                data: {
                                    key: "cambiarContrasena",
                                    idCuenta: $("#sesionPaciente").val(),
                                    password: $("#password").val(),
                                    password2: $("#password2").val()
                                },
                                method: "POST",
                                success: function (response) {
                                    if (response == "success") {
                                        swal({
                                            title: "Buen trabajo!",
                                            text: "Contraseña actualizada correctamente!",
                                            icon: "success",
                                            button: "Entendido!",
                                        });

                                        //limpia los campos y cierra el modal
                                        $("#password").val('');
                                        $("#password2").val('');
                                        $('#modalCambiarContraseña').modal('toggle');
                                    }
                                },
                                error: function (xhr) {

                                }
                            });

                        }
                    });
        }

    });

    ////*****VERIFICAR QUE EL USUARIO Y EL EMAIL NO EXISTAN
    $('#username').on('change', function () {

        $.ajax({

            url: 'RegistraUsuarioController',
            method: "POST",
            cache: false,
            data: {
                key: "repiteUsuario",
                usuario: $('#username').val()
            },
            success: function (response) {
                if (response == "UsuarioAlreadyExists") {
                    $('.error-usuarioRepetido').show();
                } else {
                    $('.error-usuarioRepetido').hide();
                }
            }

        });


    });

    $("#correo").on("change", function () {

        $.ajax({

            url: 'RegistraUsuarioController',
            method: "POST",
            cache: false,
            data: {
                key: "repiteCorreo",
                correo: $('#correo').val()
            },
            success: function (response) {

                if (response == "CorreoAlreadyExists") {
                    $('.error-correoRepetido').show();
                } else {
                    $('.error-correoRepetido').hide();
                }
            }

        });

    });

    function existeUsuario(usuario) {

        var existe = true;

        $.ajax({

            url: 'RegistraUsuarioController',
            method: "POST",
            async: false,
            cache: false,
            data: {
                key: "repiteUsuario",
                usuario: usuario
            },
            success: function (response) {

                if (response != "UsuarioAlreadyExists") {
                    existe = false;
                }
            }

        });


        return existe;
    }

    function existeCorreo(correo) {

        var existe = true;

        $.ajax({

            url: 'PacienteController',
            method: "POST",
            async: false,
            cache: false,
            data: {
                key: "repiteCorreo",
                correo: correo
            },
            success: function (response) {
                if (response != "CorreoAlreadyExists") {
                    existe = false;
                }
            }

        });


        return existe;
    }

    //1.- Usuario
    $('#username').on('change', function () {
        if (isValidUserName($('#username'))) {
            $('#error-usuario').hide();

        } else {
            $('#error-usuario').show();

        }
    });

    //2.- Correo
    $('#correo').on('change', function () {
        if (isValidEmail($('#correo'))) {
            $('.error-correo').hide();

        } else {
            $('.error-correo').show();

        }
    });

    $("#password").on('change', function () {
        if (isValidPassword($(this)))
            $("#error-contrasena").hide();
        else
            $("#error-contrasena").show();
    });

    $("#password2").on('change', function () {
        var pass1 = $('#password');
        var pass2 = $(this);

        areEqualPasswords(pass1, pass2);
    });


    /////////////////////////////// GESTION MEDICOS //////

    //Errores al agregar a un médico
    $('#errorNombreMedico').hide();
    $('#errorTelefonoMedico').hide();
    $('#errorApellidoPaternoMedico').hide();
    $('#errorApellidoMaternoMedico').hide();
    $('#errorCorreoMedico').hide();
    $('#errorCorreoRepetido').hide();
    $('#errorNumEmpleado').hide();
    $('#errorCedulaMedicos').hide();
    $('#errorPass1Medico').hide();
    $('#noEqualPasswordsError').hide();
    $('#error-campos').hide();
    $('#error-datosRepetidos').hide();
    $('#errorTerminos').hide();

    $('#errorAgregarEspecialidad').hide();
    $('#errorAgregarPosicion').hide();

    //Errores al editar a un médico
    $('#errorEditarNombreMedico').hide();
    $('#errorEditarTelefonoMedico').hide();
    $('#errorEditarApellidoPaternoMedico').hide();
    $('#errorEditarApellidoMaternoMedico').hide();
    $('#errorEditarCorreoMedico').hide();
    $('#errorEditarCorreoRepetido').hide();
    $('#errorEditarNumEmpleado').hide();
    $('#errorEditarCedulaMedicos').hide();
    $('#error-editarDatosRepetidos').hide();
    $('#errorEditarEspecialidad').hide();
    //$('#errorEditarPosicion').hide(); SHANNON


    var repiteCorreo;

    //////////////////////////////////////////////////////
    /////////////////// VALIDACIONES AGREGAR MEDICO //////
    //////////////////////////////////////////////////////
    //TELEFONO EN AGREGAR MÉDICO
    $('#agregar-telefonoMedico').on('change', function () {

        if (isValidPhoneNumber($(this))) {
            $('#errorTelefonoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorTelefonoMedico').hide();
        } else {
            $('#errorTelefonoMedico').show();
        }

    });

    //CÉDULA PROFESIONAL EN AGREGAR MÉDICO
    $('#agregar-cedulaMedico').on('change', function () {

        if (isValidCedula($(this))) {
            $('#errorCedulaMedicos').hide();
        } else if ($(this).val() == '') {
            $('#errorCedulaMedicos').hide();
        } else {
            $('#errorCedulaMedicos').show();
        }

    });

    //NÚMERO DE EMPLEADO EN AGREGAR MÉDICO
    $('#agregar-noEmpleadoMedico').on('change', function () {

        if (isValidNumEmpleado($(this))) {
            $('#errorNumEmpleado').hide();
        } else if ($(this).val() == '') {
            $('#errorNumEmpleado').hide();
        } else {
            $('#errorNumEmpleado').show();
        }

    });

    //NÚMERO DE EMPLEADO EN AGREGAR MÉDICO
    $('#agregar-especialidadMedico').on('change', function () {

        if (isValidEspecialidad($(this))) {
            $('#errorAgregarEspecialidad').hide();
        } else if ($(this).val() == '') {
            $('#errorAgregarEspecialidad').hide();
        } else {
            $('#errorAgregarEspecialidad').show();
        }

    });

    //NÚMERO DE EMPLEADO EN AGREGAR MÉDICO
    $('#editar-especialidadMedico').on('change', function () {

        if (isValidEspecialidad($(this))) {
            $('#errorEditarEspecialidad').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarEspecialidad').hide();
        } else {
            $('#errorEditarEspecialidad').show();
        }

    });

    //NÚMERO DE EMPLEADO EN AGREGAR MÉDICO
    $('#agregar-posiciondMedico').on('change', function () {

        if (isValidPosicion($(this))) {
            $('#errorAgregarPosicion').hide();
        } else if ($(this).val() == '') {
            $('#errorAgregarPosicion').hide();
        } else {
            $('#errorAgregarPosicion').show();
        }

    });

    /* SHANNON
     
     //NÚMERO DE EMPLEADO EN AGREGAR MÉDICO
     $('#editar-posiciondMedico').on('change', function () {
     
     if (isValidPosicion($(this))) {
     $('#errorEditarPosicion').hide();
     } else if ($(this).val() == '') {
     $('#errorEditarPosicion').hide();
     } else {
     $('#errorEditarPosicion').show();
     }
     
     }); */


    //NOMBRE EN AGREGAR MÉDICO
    $('#agregar-nombreMedico').on('change', function () {

        if (isValidName($(this))) {
            $('#errorNombreMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorNombreMedico').hide();
        } else {
            $('#errorNombreMedico').show();
        }
    });

    //PRIMER APELLIDO EN AGREGAR MÉDICO
    $('#agregar-primerApellidoMedico').on('change', function () {

        if (isValidLastName($(this))) {
            $('#errorApellidoPaternoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorApellidoPaternoMedico').hide();
        } else {
            $('#errorApellidoPaternoMedico').show();
        }

    });

    //SEGUNDO APELLIDO EN AGREGAR MÉDICO
    $('#agregar-segundoApellidoMedico').on('change', function () {

        if (isValidLastName($(this))) {
            $('#errorApellidoMaternoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorApellidoMaternoMedico').hide();
        } else {
            $('#errorApellidoMaternoMedico').show();
        }

    });

    //CONTRASEÑA EN AGREGAR MÉDICO
    $('#agregar-passwordMedico').on('change', function () {

        if (isValidPassword($(this))) {
            $('#errorPass1Medico').hide();
        } else if ($(this).val() == '') {
            $('#errorPass1Medico').hide();
        } else {
            $('#errorPass1Medico').show();
        }

    });


    //CONTRASEÑAS IGUALES EN AGREGAR MÉDICO
    $('#agregar-password2Medico').on('change', function () {

        var pass1 = $('#agregar-passwordMedico');
        var pass2 = $('#agregar-password2Medico');

        areEqualPasswords(pass1, pass2);

    });

    $('#terminosMedico').on('change', function () {

        if (isValidCheckbox($(this))) {
            $('#errorTerminos').hide();
        } else {
            $('#errorTerminos').show();
        }
    });

    $('#agregar-correoMedico').on('change', function () {
        $.ajax({

            url: 'RegistraUsuarioController',
            cache: false,
            method: 'POST',
            data: {

                key: "repiteCorreo",
                correo: $('#agregar-correoMedico').val()


            },
            success: function (response) {

                if (response === 'CorreoAlreadyExists') {
                    console.log("correo repetidooo")
                    $('#agregar-correoMedico').css('color', 'orange');
                    $('#errorCorreoRepetido').show();
                    repiteCorreo = true;
                } else {
                    $('#errorCorreoRepetido').hide();
                    repiteCorreo = false;
                }

            }

        });

        if (isValidEmail($(this))) {
            $('#errorCorreoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorCorreoMedico').hide();
        } else {
            $('#errorCorreoMedico').show();
        }

    });


    //GESTION PACIENTES
    //Errores al agregar a un paciente
    $('#errorNombrePaciente').hide();
    $('#errorCurpPaciente').hide();
    $('#errorCurpRepetidoPaciente').hide();
    $('#errorFechaPaciente').hide();
    $('#errorApellidoPaternoPaciente').hide();
    $('#errorApellidoMaternoPaciente').hide();
    $('#errorNombreUsuarioPaciente').hide();
    $('#errorUsuarioRepetidoPaciente').hide();
    $('#errorECivilPaciente').hide();
    $('#errorColoniaPaciente').hide();
    $('#errorCallePaciente').hide();
    $('#errorNoInteriorPaciente').hide();
    $('#errorNoExteriorPaciente').hide();
    $('#errorEstadoPaciente').hide();
    $('#errorMunicipioPaciente').hide();
    $('#errorTelefonoPaciente').hide();
    $('#errorCorreoPaciente').hide();
    $('#errorPass1Paciente').hide();
    $('#errorPass2Paciente').hide();
    $('#error-CPexistePaciente').hide();
    $('#errorCodigoPostalPaciente').hide();
    $('#noEqualPasswordsErrorPaciente').hide();
    $('#error-terminos').hide();

    $('#error-editar-NombrePaciente').hide();
    $('#error-editar-ApellidoPaternoPaciente').hide();
    $('#error-editar-ApellidoMaternoPaciente').hide();
    $('#error-editar-NombreUsuarioPaciente').hide();
    $('#error-editar-CorreoPaciente').hide();
    $('#error-editar-CurpPaciente').hide();
    $('#error-editar-ColoniaPaciente').hide();
    $('#error-editar-CallePaciente').hide();
    $('#error-editar-NoExteriorPaciente').hide();
    $('#error-editar-NoInteriorPaciente').hide();
    $('#error-editar-CurpRepetidoPaciente').hide();
    $('#error-editar-TelefonoPaciente').hide();
    $('#error-editar-ECivilPaciente').hide();
    $('#error-editar-FechaPaciente').hide();
    $('#error-editar-EstadoPaciente').hide();
    $('#error-editar-MunicipioPaciente').hide();
    $('#error-editar-UsuarioRepetidoPaciente').hide();


    //////////////////////////////////////////////////////
    ///////////////// VALIDACIONES AGREGAR PACIENTE //////
    //////////////////////////////////////////////////////
    //NOMBRE EN AGREGAR PACIENTE
    $('#nombrePaciente').on('change', function () {

        if (isValidName($(this))) {
            $('#errorNombrePaciente').hide();
        } else if ($(this).val() == '') {
            $('#errorNombrePaciente').hide();
        } else {
            $('#errorNombrePaciente').show();
        }

    });

    //PRIMER APELLIDO EN AGREGAR PACIENTE
    $('#primer-apellidoPaciente').on('change', function () {

        if (isValidLastName($(this))) {
            $('#errorApellidoPaternoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#errorApellidoPaternoPaciente').hide();
        } else {
            $('#errorApellidoPaternoPaciente').show();
        }

    });

    //SEGUNDO APELLIDO EN AGREGAR PACIENTE
    $('#segundo-apellidoPaciente').on('change', function () {

        if (isValidLastName($(this))) {
            $('#errorApellidoMaternoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#errorApellidoMaternoPaciente').hide();
        } else {
            $('#errorApellidoMaternoPaciente').show();
        }

    });

    //NOMBRE DE USUARIO EN AGREGAR PACIENTE
    $('#usuarioPaciente').on('change', function () {

        $.ajax({

            url: 'RegistraUsuarioController',
            cache: false,
            method: 'POST',
            data: {

                key: "repiteUsuario",
                usuario: $('#usuarioPaciente').val()


            },
            success: function (response) {

                if (response == 'UsuarioAlreadyExists') {
                    $('#usuarioPaciente').css('color', 'orange');
                    $('#errorUsuarioRepetidoPaciente').show();
                } else {
                    $('#errorUsuarioRepetidoPaciente').hide();
                }

            }

        });

        if (isValidUserName($(this))) {
            $('#errorNombreUsuarioPaciente').hide();
        } else if ($(this).val() == '') {
            $('#errorNombreUsuarioPaciente').hide();
        } else {
            $('#errorNombreUsuarioPaciente').show();
        }

    });


    //CORREO EN AGREGAR PACIENTE
    $('#correoPaciente').on('change', function () {

        if (isValidEmail($(this))) {
            $('#errorCorreoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#errorCorreoPaciente').hide();
        } else {
            $('#errorCorreoPaciente').show();
        }

    });

    //CONTRASEÑA1 EN AGREGAR PACIENTE
    $('#contraPaciente').on('change', function () {

        if (isValidPassword($(this))) {
            $('#errorPass1Paciente').hide();
        } else if ($(this).val() == '') {
            $('#errorPass1Paciente').hide();
        } else {
            $('#errorPass1Paciente').show();
        }

    });

    //CONTRASEÑA2 EN AGREGAR PACIENTE
    $('#confContraPaciente').on('change', function () {

        if (areEqualPasswords($('#contraPaciente'), $(this))) {
            $('#noEqualPasswordsErrorPaciente').hide();
        } else if ($(this).val() == '') {
            $('#noEqualPasswordsErrorPaciente').hide();
        } else {
            $('#noEqualPasswordsErrorPaciente').show();
        }

    });

    //CURP EN AGREGAR PACIENTE
    $('#curpPaciente').on('change', function () {

        $.ajax({
            url: 'RegistraUsuarioController',
            cache: false,
            method: 'POST',
            data: {
                key: "repiteCurp",
                curp: $('#curpPaciente').val()
            },
            success: function (response) {

                if (response === 'CurpAlreadyExists') {
                    $('#curpPaciente').css('color', 'orange');
                    $('#errorCurpRepetidoPaciente').show();
                } else {
                    $('#errorCurpRepetidoPaciente').hide();
                }
            }
        });

        if (isValidCURP($(this))) {
            $('#errorCurpPaciente').hide();
        } else if ($(this).val() == '') {
            $('#errorCurpPaciente').hide();
        } else {
            $('#errorCurpPaciente').show();
        }
    });

    //TELEFONO EN AGREGAR PACIENTE
    $('#telPaciente').on('change', function () {

        if (isValidPhoneNumber($(this))) {
            $('#errorTelefonoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#errorTelefonoPaciente').hide();
        } else {
            $('#errorTelefonoPaciente').show();
        }

    });

    //ESTADO CIVIL EN AGREGAR PACIENTE
    $('#estado-civilPaciente').on('change', function () {

        if (isValidSelect($(this))) {
            $('#errorECivilPaciente').hide();
        } else {
            $('#errorECivilPaciente').show();
        }

    });

    //FECHA DE NACIMIENTO EN AGREGAR PACIENTE
    $('#cumplePaciente').on('change', function () {

        if (isValidDate($(this))) {
            $('#errorFechaPaciente').hide();
        } else {
            $('#errorFechaPaciente').show();
        }

    });

    //ESTADO EN AGREGAR PACIENTE
    $('#estadoPaciente').on('change', function () {

        if (isValidSelect($(this))) {
            $('#errorEstadoPaciente').hide();
        } else {
            $('#errorEstadoPaciente').show();
        }

    });

    //MUNICIPIO EN AGREGAR PACIENTE
    $('#municipioPaciente').on('change', function () {

        if (isValidSelect($(this))) {
            $('#errorMunicipioPaciente').hide();
        } else {
            $('#errorMunicipioPaciente').show();
        }

    });

    //COLONIA EN AGREGAR PACIENTE
    $('#colPaciente').on('change', function () {

        if (isValidColonia($(this))) {
            $('#errorColoniaPaciente').hide();
        } else {
            $('#errorColoniaPaciente').show();
        }

    });

    //CALLE EN AGREGAR PACIENTE
    $('#callePaciente').on('change', function () {

        if (isValidStreet($(this))) {
            $('#errorCallePaciente').hide();
        } else {
            $('#errorCallePaciente').show();
        }

    });

    //NUMERO EXTERIOR EN AGREGAR PACIENTE
    $('#numExtPaciente').on('change', function () {

        if (isValidExtNumber($(this))) {
            $('#errorNoExteriorPaciente').hide();
        } else {
            $('#errorNoExteriorPaciente').show();
        }

    });

    //NUMERO INTERIOR EN AGREGAR PACIENTE
    $('#numIntPaciente').on('change', function () {

        if (isValidIntNumber($(this))) {
            $('#errorNoInteriorPaciente').hide();
        } else {
            $('#errorNoInteriorPaciente').show();
        }


    });

    //NOMBRE AL EDITAR
    $('#editarNombreAdministradorAPaciente').on('change', function () {

        if (isValidName($(this))) {
            $('#error-editar-NombrePaciente').hide();
        } else if ($(this).val() == '') {
            $('#error-editar-NombrePaciente').hide();
        } else {
            $('#error-editar-NombrePaciente').show();
        }

    });

    //PRIMER APELLIDO AL EDITAR PACIENTE
    $('#editarPrimer-apellidoAdministradorAPaciente').on('change', function () {

        if (isValidLastName($(this))) {
            $('#error-editar-ApellidoPaternoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#error-editar-ApellidoPaternoPaciente').hide();
        } else {
            $('#error-editar-ApellidoPaternoPaciente').show();
        }

    });

    //SEGUNDO APELLIDO AL EDITAR PACIENTE
    $('#editarSegundo-apellidoAdministradorAPaciente').on('change', function () {

        if (isValidLastName($(this))) {
            $('#error-editar-ApellidoMaternoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#error-editar-ApellidoMaternoPaciente').hide();
        } else {
            $('#error-editar-ApellidoMaternoPaciente').show();
        }

    });

    //NOMBRE DE USUARIO AL EDITAR PACIENTE
    $('#editarUsuarioAdministradorAPaciente').on('change', function () {

        $.ajax({

            url: 'RegistraUsuarioController',
            cache: false,
            method: 'POST',
            data: {

                key: "repiteUsuario",
                usuario: $('#editarUsuarioAdministradorAPaciente').val()


            },
            success: function (response) {

                if (response === 'UsuarioAlreadyExists') {
                    $('#editarUsuarioAdministradorAPaciente').css('color', 'orange');
                    $('#error-editar-UsuarioRepetidoPaciente').show();
                } else {
                    $('#error-editar-UsuarioRepetidoPaciente').hide();
                }

            }

        });

        if (isValidUserName($(this))) {
            $('#error-editar-NombreUsuarioPaciente').hide();
        } else if ($(this).val() == '') {
            $('#error-editar-NombreUsuarioPaciente').hide();
        } else {
            $('#error-editar-NombreUsuarioPaciente').show();
        }

    });

    //CORREO AL EDITAR PACIENTE
    $('#editarCorreoAdministradorAPaciente').on('change', function () {

        if (isValidEmail($(this))) {
            $('#error-editar-CorreoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#error-editar-CorreoPaciente').hide();
        } else {
            $('#error-editar-CorreoPaciente').show();
        }

    });



    //CURP AL EDITAR PACIENTE
    $('#editarCurpAdministradorAPaciente').on('change', function () {

        $.ajax({
            url: 'RegistraUsuarioController',
            cache: false,
            method: 'POST',
            data: {
                key: "repiteCurp",
                curp: $('#editarCurpAdministradorAPaciente').val()
            },
            success: function (response) {

                if (response === 'CurpAlreadyExists') {
                    $('#editarCurpAdministradorAPaciente').css('color', 'orange');
                    $('#error-editar-CurpRepetidoPaciente').show();
                } else {
                    $('#error-editar-CurpRepetidoPaciente').hide();
                }

            }
        });


        if (isValidCURP($(this))) {
            $('#error-editar-CurpPaciente').hide();
        } else if ($(this).val() == '') {
            $('#error-editar-CurpPaciente').hide();
        } else {
            $('#error-editar-CurpPaciente').show();
        }

    });

    //TELEFONO AL EDITAR PACIENTE
    $('#editarTelAdministradorAPaciente').on('change', function () {

        if (isValidPhoneNumber($(this))) {
            $('#error-editar-TelefonoPaciente').hide();
        } else if ($(this).val() == '') {
            $('#error-editar-TelefonoPaciente').hide();
        } else {
            $('#error-editar-TelefonoPaciente').show();
        }

    });

    //ESTADO CIVIL AL EDITAR PACIENTE
    $('#editarEstado-civilPaciente').on('change', function () {

        if (isValidSelect($(this))) {
            $('#error-editar-ECivilPaciente').hide();
        } else {
            $('#error-editar-ECivilPaciente').show();
        }

    });

    //FECHA DE NACIMIENTO AL EDITAR PACIENTE
    $('#editarCumpleAdministradorAPaciente').on('change', function () {

        if (isValidDate($(this))) {
            $('#error-editar-FechaPaciente').hide();
        } else {
            $('#error-editar-FechaPaciente').show();
        }

    });

    //ESTADO AL EDITAR PACIENTE
    $('#editarEstadoAdministradorAPaciente').on('change', function () {

        if (isValidSelect($(this))) {
            $('#error-editar-EstadoPaciente').hide();
        } else {
            $('#error-editar-EstadoPaciente').show();
        }

    });

    //MUNICIPIO AL EDITAR PACIENTE
    $('#editarMunicipioAdministradorAPaciente').on('change', function () {

        if (isValidSelect($(this))) {
            $('#error-editar-MunicipioPaciente').hide();
        } else {
            $('#error-editar-MunicipioPaciente').show();
        }

    });

    //COLONIA AL EDITAR PACIENTE
    $('#editarColAdministradorAPaciente').on('change', function () {

        if (isValidColonia($(this))) {
            $('#error-editar-ColoniaPaciente').hide();
        } else {
            $('#error-editar-ColoniaPaciente').show();
        }

    });

    //CALLE AL EDITAR PACIENTE
    $('#editarCalleAdministradorAPaciente').on('change', function () {

        if (isValidStreet($(this))) {
            $('#error-editar-CallePaciente').hide();
        } else {
            $('#error-editar-CallePaciente').show();
        }

    });

    //NUMERO EXTERIOR AL EDITAR PACIENTE
    $('#editarNumExtAdministradorAPaciente').on('change', function () {

        if (isValidExtNumber($(this))) {
            $('#error-editar-NoExteriorPaciente').hide();
        } else {
            $('#error-editar-NoExteriorPaciente').show();
        }

    });

    //NUMERO INTERIOR AL EDITAR PACIENTE
    $('#editarNumIntAdministradorAPaciente').on('change', function () {

        if (isValidIntNumber($(this))) {
            $('#error-editar-NoInteriorPaciente').hide();
        } else {
            $('#error-editar-NoInteriorPaciente').show();
        }

    });

    //////////////////////////////////////////////////////
    /////////////////////////////// GESTION MEDICOS //////
    //////////////////////////////////////////////////////
    /**AGREGAR MEDICO */
    $('#btn-agregarMedico').on('click', function () {
        configureLoadingScreen($('.cargandoAgregarMedico'));
        if (!repiteCorreo) {

            $("#error-datosRepetidos").hide();

            if (isValidName($('#agregar-nombreMedico')) && isValidLastName($('#agregar-primerApellidoMedico')) && isValidLastName($('#agregar-segundoApellidoMedico'))
                    && isValidNumEmpleado($('#agregar-noEmpleadoMedico')) && isValidEmail($('#agregar-correoMedico')) && isValidPassword($('#agregar-passwordMedico')) && isValidCedula($('#agregar-cedulaMedico'))
                    && isValidPhoneNumber($('#agregar-telefonoMedico')) && isValidCheckbox($('#terminosMedico')) && isValidEspecialidad($('#agregar-especialidadMedico')) && isValidPosicion($('#agregar-posiciondMedico'))
                    && areEqualPasswords($('#agregar-passwordMedico'), $('#agregar-password2Medico'))
                    && $('#errorCorreoRepetido').hide()) {

                $("#error-campos").hide();

                var nombre = $('#agregar-nombreMedico');
                var telefono = $('#agregar-telefonoMedico');
                var primerApellido = $('#agregar-primerApellidoMedico');
                var segundoApellido = $('#agregar-segundoApellidoMedico');
                var correo = $('#agregar-correoMedico');
                var noEmpleado = $('#agregar-noEmpleadoMedico');
                var especialidad = $('#agregar-especialidadMedico');
                var posicion = $('#agregar-posiciondMedico');
                var cedula = $('#agregar-cedulaMedico');
                var password = $('#agregar-passwordMedico');

                $.ajax({

                    url: 'RegistraUsuarioController',
                    cache: false,
                    method: 'POST',
                    data: {
                        key: 'agregarMedico',
                        nombre: nombre.val(),
                        primerApellido: primerApellido.val(),
                        segundoApellido: segundoApellido.val(),
                        telefono: telefono.val(),
                        correo: correo.val(),
                        noEmpleado: noEmpleado.val(),
                        especialidad: especialidad.val(),
                        posicion: posicion.val(),
                        cedula: cedula.val(),
                        password: password.val()
                    },
                    success: function (response) {

                        console.log(response);
                        swal({
                            title: "¡Buen trabajo!",
                            text: "Se ha agregado correctamente al médico.",
                            icon: "success",
                            buttons: [, 'Aceptar'],
                        });

                        //Limpiar los campos después de registrarse 

                        $("#agregar-nombreMedico").val("");
                        $("#agregar-telefonoMedico").val("");
                        $("#agregar-primerApellidoMedico").val("");
                        $("#agregar-segundoApellidoMedico").val("");
                        $("#agregar-correoMedico").val("");
                        $("#agregar-noEmpleadoMedico").val("");
                        $("#agregar-especialidadMedico").val("");
                        $("#agregar-posiciondMedico").val("");
                        $("#agregar-cedulaMedico").val("");
                        $("#agregar-passwordMedico").val("");
                        $("#agregar-password2Medico").val("");

                        //Cerrar el modal
                        $('#modalAgregarMedico').modal('toggle');
                    }
                })
                        .done(function (response) {


                        });
            } else {
                console.log("Entro al segundo else");
                $("#error-campos").show(); //No se llenaron los campos obligatorios
            }
        } else {
            console.log("Entro al segundo else");
            $("#error-datosRepetidos").show(); //ya existe un campo
        }
    });

    ////////////////////////////////////////////////////////////// VALIDACIONES EDITAR UN MÉDICO

    //TELEFONO EN EDITAR MÉDICO
    $('#editar-telefonoMedico').on('change', function () {

        if (isValidPhoneNumber($(this))) {
            $('#errorEditarTelefonoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarTelefonoMedico').hide();
        } else {
            $('#errorEditarTelefonoMedico').show();
        }

    });

    //CÉDULA PROFESIONAL EN EDITAR MÉDICO
    $('#editar-cedulaProfesionalMedico').on('change', function () {

        if (isValidCedula($(this))) {
            $('#errorEditarCedulaMedicos').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarCedulaMedicos').hide();
        } else {
            $('#errorEditarCedulaMedicos').show();
        }

    });

    //NÚMERO DE EMPLEADO EN EDITAR MÉDICO
    $('#editar-noEmpleadoMedico').on('change', function () {

        if (isValidNumEmpleado($(this))) {
            $('#errorEditarNumEmpleado').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarNumEmpleado').hide();
        } else {
            $('#errorEditarNumEmpleado').show();
        }

    });

    //NOMBRE EN EDITAR MÉDICO
    $('#editar-nombreMedico').on('change', function () {

        if (isValidName($(this))) {
            $('#errorEditarNombreMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarNombreMedico').hide();
        } else {
            $('#errorEditarNombreMedico').show();
        }
    });

    //PRIMER APELLIDO EN EDITAR MÉDICO
    $('#editar-primerApellidoMedico').on('change', function () {

        if (isValidLastName($(this))) {
            $('#errorEditarApellidoPaternoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarApellidoPaternoMedico').hide();
        } else {
            $('#errorEditarApellidoPaternoMedico').show();
        }

    });

    //SEGUNDO APELLIDO EN EDITAR MÉDICO
    $('#editar-segundoApellidoMedico').on('change', function () {

        if (isValidLastName($(this))) {
            $('#errorEditarApellidoMaternoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarApellidoMaternoMedico').hide();
        } else {
            $('#errorEditarApellidoMaternoMedico').show();
        }

    });

    $('#editar-correoMedico').on('change', function () {
        $.ajax({

            url: 'RegistraUsuarioController',
            cache: false,
            method: 'POST',
            data: {

                key: "repiteCorreo",
                correo: $('#editar-correoMedico').val()


            },
            success: function (response) {

                if (response === 'CorreoAlreadyExists') {
                    console.log("correo repetidooo")
                    $('#editar-correoMedico').css('color', 'orange');
                    $('#errorEditarCorreoRepetido').show();
                    repiteCorreo = true;
                } else {
                    $('#errorEditarCorreoRepetido').hide();
                    repiteCorreo = false;
                }

            }

        });

        if (isValidEmail($(this))) {
            $('#errorEditarCorreoMedico').hide();
        } else if ($(this).val() == '') {
            $('#errorEditarCorreoMedico').hide();
        } else {
            $('#errorEditarCorreoMedico').show();
        }

    });

    /**EDITAR MEDICO */
    //RECUPERA EL MEDICO PARA PONERLO EN EL MODAL
    $('body').on('click', '.btn-editarMedico', function () {

        var idMedico = $(this).data('id');
        console.log("idMédico " + idMedico);


        $.ajax({

            url: 'AdministradorController',
            cache: false,
            dataType: 'JSON',
            method: "POST",
            data: {
                key: 'obtener-medico',
                idMedicoAdministrador: idMedico
            },
            beforeSend: function () {

            },
            success: function (response) {

                //$("#idMedico").val(response.id);
                console.log(response);

                var json = response;
                $('#idMedico').val(json.idEmpleado);
                $('#editar-nombreMedico').val(json.nombre);
                $('#editar-primerApellidoMedico').val(json.primerApellido);
                $('#editar-segundoApellidoMedico').val(json.segundoApellido);
                $('#editar-correoMedico').val(json.correo);
                $('#editar-telefonoMedico').val(json.telefono);
                $('#editar-noEmpleadoMedico').val(json.noEmpleado);
                $('#editar-especialidadMedico').val(json.nombreEspecialidad);
                //$('#editar-posicionMedico').val(json.nombrePosicion); SHANNON
                $('#editar-cedulaProfesionalMedico').val(json.cedulaProfesional);

            }

        });
    });

    $('#irAInicioAdministrador').on('click', function () {
        $.post("SAPI", {
            file: "administrador/index.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });


    $('#IrAGestionMedicos').on('click', function () {
        $.post("SAPI", {
            file: "administrador/gestionMedicos.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });

    $('#IrAGestionNavegadora').on('click', function () {
        $.post("SAPI", {
            file: "administrador/gestionNavegadora.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });
    $('#IrAGestionPaciente').on('click', function () {
        console.log("VE!");
        $.post("SAPI", {
            file: "administrador/gestionPacientes.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });
    $('#IrAGestionAdministrador').on('click', function () {
        $.post("SAPI", {
            file: "administrador/gestionarAdministradores.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });
    $('#IrAReasignarMedico').on('click', function () {
        $.post("SAPI", {
            file: "administrador/reAsignarMedico.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });

    $('#IrAInicio').on('click', function () {
        $.post("SAPI", {
            file: "administrador/gestionMedicos.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });



    $('.btn-success').on('click', function () {

        console.log("VerNavegadora");
        var idNavegadora = $(this).data('id');

        $.post("SAPI", {
            file: "administrador/rendimientoNavegadora.jsp",
            idNavegadora: idNavegadora
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });


    $('#IrAMiCuenta').on('click', function () {
        $.post("SAPI", {
            file: "administrador/cuentaAdministrador.jsp"
        },
                function (response, status, xhr) {
                    console.log("El ajax fue exitoso!!-----------------------");
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });



    $('#salirCuenta').on('click', function () {
        console.log("Salir cuenta");
        $.post("LoginController", {
            key: "cerrar-sesion"
        },
                function (response, status, xhr) {
                    console.log(response);
                    if (status == "success") {
                        if (response == "error") {
                            $("#msj-error").show();
                        } else {
                            document.open("text/html", "replace");
                            document.write(response);
                            document.close();
                        }
                    }
                }
        );
    });



    //GUARDA EL MEDICO DESDE EL MODAL
    $('#btn-guardarMedico').on('click', function () {

        if (!repiteCorreo) {
            $("#error-editarDatosRepetidos").hide();

            if (isValidName($('#editar-nombreMedico')) && isValidLastName($('#editar-primerApellidoMedico')) && isValidLastName($('#editar-segundoApellidoMedico'))
                    && isValidNumEmpleado($('#editar-noEmpleadoMedico')) && isValidEmail($('#editar-correoMedico')) && isValidCedula($('#editar-cedulaProfesionalMedico'))
                    && isValidPhoneNumber($('#editar-telefonoMedico')) && isValidEspecialidad($('#editar-especialidadMedico')) /*&& isValidPosicion($('#editar-posicionMedico'))*/
                    && $('#errorCorreoRepetido').hide()) {

                var idMedico = $('#idMedico').val();
                var nombre = $('#editar-nombreMedico').val();
                var telefono = $('#editar-telefonoMedico').val();
                var primerApellido = $('#editar-primerApellidoMedico').val();
                var segundoApellido = $('#editar-segundoApellidoMedico').val();
                var correo = $('#editar-correoMedico').val();
                var noEmpleado = $('#editar-noEmpleadoMedico').val();
                var especialidad = $('#editar-especialidadMedico').val();
                var cedula = $('#editar-cedulaProfesionalMedico').val();

                console.log("idMédicoooo " + idMedico);
                console.log("nombre " + nombre);
                console.log("phone " + telefono);
                console.log("ape 1 " + primerApellido);
                console.log("ape 2 " + segundoApellido);
                console.log("mail " + correo);
                console.log("empleado no " + noEmpleado);
                console.log("especiliad  " + especialidad);
                console.log("cedula " + cedula);


                console.log("Holi, hará el ajax");

                $.ajax({

                    url: 'AdministradorController',
                    cache: false,
                    method: 'POST',
                    data: {
                        key: 'actualizar-medico',
                        idMedico: idMedico,
                        nombre: nombre,
                        telefono: telefono,
                        primerApellido: primerApellido,
                        segundoApellido: segundoApellido,
                        correo: correo,
                        noEmpleado: noEmpleado,
                        especialidad: especialidad,
                        cedula: cedula
                    },
                    success: function (response) {
                        $('#modalEditarMedico').modal('toggle'); //cerrar modal
                        console.log("Cierra el modal");
                        swal({
                            title: "Cambios guardados correctamente",
                            icon: "success",
                            buttons: true,
                            buttons: [, 'Aceptar']
                        });
                        console.log("ESTOY EN EL SUCCESS!! :o");
                        $('#nombre-' + idMedico).html(nombre + " " + primerApellido + " " + segundoApellido);
                        $('#correo-' + idMedico).html(correo);
                        $('#telefono-' + idMedico).html(telefono);
                        $('#noEmpleado-' + idMedico).html(noEmpleado);
                        $('#nombreEspecialidad-' + idMedico).html(especialidad);
                        $('#cedulaProfesional-' + idMedico).html(cedula);
                    }

                });

            }
        } else {
            console.log("Entro al segundo else");
            $("#error-datosRepetidos").show(); //ya existe un campo
        }

    });

    /** ELIMINAR MEDICO */
    $('body').on('click', '#btn-eliminarMedico', function () {

        var idMedico = $(this).data('id');

        //Modal editar medicos
        swal({
            title: "Estas segura(o)?",
            text: "Los datos se eliminarán y no podrás recuperarlos.",
            icon: "warning",
            buttons: true,
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
                .then((eliminar) => {
                    if (eliminar) {

                        $.ajax({

                            url: 'AdminController',
                            cache: false,
                            method: 'POST',
                            data: {
                                key: 'eliminarMedico',
                                idMedico: idMedico
                            },
                            success: function (response) {

                            }


                        });

                    } else {

                    }
                });

    });

    ///////////////////////////////GESTIÓN NAVEGADORAS

    /**AGREGAR NAVEGADORA */
    $('#btn-agregarNavegadora').on('click', function () {

        var nombre = $('#agregar-nombreNavegadora');
        var telefono = $('#agregar-telefonoNavegadora');
        var primerApellido = $('#agregar-primerApellidoNavegadora');
        var segundoApellido = $('#agregar-segundoApellidoNavegadora');
        var correo = $('#agregar-correoNavegadora');
        var noEmpleado = $('#agregar-noEmpleadoNavegadora');
        var especialidad = $('#agregar-especialidadNavegadora');
        var cedula = $('#agregar-cedulaNavegadora');
        var password = $('#agregar-passwordNavegadora');

        console.log(nombre);
        console.log(telefono);
        console.log(primerApellido);
        console.log(segundoApellido);
        console.log(correo);
        console.log(noEmpleado);
        console.log(especialidad);
        console.log(cedula);
        console.log(password);

        $.ajax({

            url: 'RegistraUsuarioController',
            cache: false,
            method: 'POST',
            data: {
                key: 'agregarNavegadora',
                nombre: nombre.val(),
                telefono: telefono.val(),
                primerApellido: primerApellido.val(),
                segundoApellido: segundoApellido.val(),
                correo: correo.val(),
                noEmpleado: noEmpleado.val(),
                especialidad: especialidad.val(),
                cedula: cedula.val(),
                password: password.val()
            },
            success: function (response) {
                $('#modalAgregarNavegadora').modal('toggle'); //cerrar modal
                swal({
                    title: "Cambios guardados correctamente",
                    icon: "success",
                    buttons: true,
                    buttons: [, 'Aceptar']
                });
            }
        });
    });

    /**EDITAR NAVEGADORA */
    //RECUPERA LA NAVEGADORA PARA PONERLO EN EL MODAL
    $('body').on('click', '.btn-editarNavegadora', function () {

        var idNavegadora = $(this).data('id');
        console.log(idNavegadora);

        $.ajax({

            url: 'AdministradorController',
            cache: false,
            dataType: 'JSON',
            method: "POST",
            data: {
                key: 'obtener-navegadora',
                idNavegadora: idNavegadora,
            },
            beforeSend: function () {

            },
            success: function (response) {

                console.log(response);
                $('#idNavegadora').val(response.idEmpleado);
                $('#editar-nombreNavegadora').val(response.nombre);
                $('#editar-telefonoNavegadora').val(response.telefono);
                $('#editar-primerApellidoNavegadora').val(response.primerApellido);
                $('#editar-segundoApellidoNavegadora').val(response.segundoApellido);
                $('#editar-correoNavegadora').val(response.correo);
                $('#editar-no-empleadoNavegadora').val(response.noEmpleado);
                $('#editar-especialidad').val(response.nombreEspecialidad);
                $('#editar-cedulaNavegadora').val(response.cedulaProfesional);
            }

        });

    });

    //GUARDA LA NAVEGADORA DESDE EL MODAL
    $('#btn-guardarNavegadora').on('click', function () {

        var idNavegadora = $('#idNavegadora').val();

        var nombre = $('#editar-nombreNavegadora').val();
        var telefono = $('#editar-telefonoNavegadora').val();
        var primerApellido = $('#editar-primerApellidoNavegadora').val();
        var segundoApellido = $('#editar-segundoApellidoNavegadora').val();
        var correo = $('#editar-correoNavegadora').val();
        var noEmpleado = $('#editar-no-empleadoNavegadora').val();
        var especialidad = $('#editar-especialidad').val();
        var cedula = $('#editar-cedulaNavegadora').val();

        console.log("idNavegadoraaaaa " + idNavegadora);
        console.log("nombre " + nombre);
        console.log("phone " + telefono);
        console.log("ape 1 " + primerApellido);
        console.log("ape 2 " + segundoApellido);
        console.log("mail " + correo);
        console.log("empleado no " + noEmpleado);
        console.log("especiliad  " + especialidad);
        console.log("cedula " + cedula);

        console.log("Holi, hará el ajax");

        $.ajax({

            url: 'AdministradorController',
            cache: false,
            method: 'POST',
            data: {
                key: 'actualiza-navegadora',
                idNavegadora: idNavegadora,
                nombre: nombre,
                telefono: telefono,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                correo: correo,
                noEmpleado: noEmpleado,
                especialidad: especialidad,
                cedula: cedula,
            },
            success: function (response) {
                $('#modalEditarNavegadora').modal('toggle'); //cerrar modal
                console.log("Cierra el modal");
                swal({
                    title: "Cambios guardados correctamente",
                    icon: "success",
                    buttons: true,
                    buttons: [, 'Aceptar']
                });
                console.log("ESTOY EN EL SUCCESS!! :o");
                $('#nombre-' + idNavegadora).html(nombre + " " + primerApellido + " " + segundoApellido);
                $('#correo-' + idNavegadora).html(correo);
                $('#telefono-' + idNavegadora).html(telefono);
                $('#noEmpleado-' + idNavegadora).html(noEmpleado);
                $('#nombreEspecialidad-' + idNavegadora).html(especialidad);
                $('#cedulaProfesional-' + idNavegadora).html(cedula);
            }
        });

    });

    /** ELIMINAR NAVEGADORA */
    $('body').on('click', '#btn-eliminarNavegadora', function () {

        var idNavegadora = $(this).data('id');

        //Modal editar medicos
        swal({
            title: "Estas seguro?",
            text: "Los datos se eliminarán y no podrás recuperarlos.",
            icon: "warning",
            buttons: true,
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
                .then((eliminar) => {
                    if (eliminar) {

                        $.ajax({

                            url: 'AdminController',
                            cache: false,
                            method: 'POST',
                            data: {
                                key: 'eliminarNavegadora',
                                idNavegadora: idNavegadora
                            },
                            success: function (response) {

                            }


                        });

                    } else {

                    }
                });

    });

    //////////////////////////////////////////////////////
    ///////////////////////////// GESTION PACIENTES //////
    //////////////////////////////////////////////////////
    //  Recupera paciente
    $('body').on('click', '.btn-editarPaciente', function () {

        var idPaciente = $(this).data('id');

        $('#idPacienteAEditar').val($(this).data('id'));

        //alert($('#idPacienteAEditar').val());

        console.log("idPaciente: " + idPaciente);

        $.ajax({

            url: 'AdministradorController',
            cache: false,
            method: 'POST',
            data: {

                key: "obtener-paciente",
                idPaciente: idPaciente

            },
            success: function (response) {

                var data = JSON.parse(response);

                console.log(data);

                /*alert(data.fechaNacimiento);
                 alert(new Date(data.fechaNacimiento));
                 alert(convertDate(new Date(data.fechaNacimiento)));*/

                $('#editarNombreAdministradorAPaciente').val(data.nombre);
                $('#editarCurpAdministradorAPaciente').val(data.curp);
                $('#editarCumpleAdministradorAPaciente').val(convertDate(new Date(data.fechaNacimiento)));
                $('#editarPrimer-apellidoAdministradorAPaciente').val(data.primerApellido);
                $('#editarSegundo-apellidoAdministradorAPaciente').val(data.segundoApellido);
                $('#editarSegundo-apellidoAdministradorAPaciente').val(data.segundoApellido);
                $('#editarUsuarioAdministradorAPaciente').val(data.usuario);
                $('#editarEstado-civilPaciente').val(data.idEstadoCivil);
                $('#editarColAdministradorAPaciente').val(data.colonia);
                $('#editarCalleAdministradorAPaciente').val(data.calle);
                $('#editarNumIntAdministradorAPaciente').val(data.noInt);
                $('#editarNumExtAdministradorAPaciente').val(data.noExt);
                $('#editarEstadoAdministradorAPaciente').val(data.idEstado);
                $('#editarTelAdministradorAPaciente').val(data.telefono);
                $('#editarCorreoAdministradorAPaciente').val(data.correo);

                $.ajax({

                    url: 'ZonaController',
                    cache: false,
                    method: 'POST',
                    data: {

                        key: "getByEstado",
                        idEstado: data.idEstado

                    },
                    success: function (response) {

                        //Limpiar el select antes de que haga una consulta para que no se emapalmen los municipios
                        $(".editarMunicipios select").each(function () {
                            $(this).children().remove();
                        });
                        var json = JSON.parse(response);
                        for (var i = 0; i < json.length; i++) {
                            $('.editarMunicipios select').append("<option value=" + json[i].idMunicipio + ">" + json[i].nombre + "</option>");
                        }
                        $('.editarMunicipios select').prop('selectedIndex', 0);
                        console.log(json);
                        $('#editarMunicipioAdministradorAPaciente').val(data.idMunicipio);
                    }

                });
            }

        });

    });

    //Guarda el paciente
    $('#btn-guardarCambios').on('click', function () {

        var btn = $(this);

        $.ajax({

            url: "AdministradorController",
            method: "POST",
            cache: false,
            data: {
                key: "actualizar-paciente",
                idPaciente: $('#idPacienteAEditar').val(),
                nombre: $('#editarNombreAdministradorAPaciente').val(),
                apellido1: $('#editarPrimer-apellidoAdministradorAPaciente').val(),
                apellido2: $('#editarSegundo-apellidoAdministradorAPaciente').val(),
                usuario: $("#editarUsuarioAdministradorAPaciente").val(),
                correo: $('#editarCorreoAdministradorAPaciente').val(),
                curp: $('#editarCurpAdministradorAPaciente').val(),
                colonia: $('#editarColAdministradorAPaciente').val(),
                calle: $('#editarCalleAdministradorAPaciente').val(),
                noExterior: $("#editarNumExtAdministradorAPaciente").val(),
                noInterior: $("#editarNumIntAdministradorAPacient").val(),
                telefono: $("#editarTelAdministradorAPaciente").val(),
                estadoCivil: $("#editarEstado-civilPaciente").val(),
                fechaNacimiento: $("#editarCumpleAdministradorAPaciente").val(),
                estado: $("#editarEstadoAdministradorAPaciente").val(),
                municipio: $("#editarMunicipioAdministradorAPaciente").val()


            },
            success: function (response) {

                swal("Buen trabajo", "Cuenta editada satisfactoriamente", "success");

                //Cerrar modal
                $("#modalEditarPaciente").modal('toggle');

                //Actualizar informacion de la tabla
                $("#nombre-" + $('#idPacienteAEditar').val()).html($("#editarNombreAdministradorAPaciente").val() + ' ' + $('#editarPrimer-apellidoAdministradorAPaciente').val() + ' ' + $('#editarSegundo-apellidoAdministradorAPaciente').val());
                $("#telefono-" + $('#idPacienteAEditar').val()).html($("#editarTelAdministradorAPaciente").val());
                $("#estado-" + $('#idPacienteAEditar').val()).html($("#editarEstadoAdministradorAPaciente option:selected").text());

            }

        });

    });

    //Agregar Paciente
    $('#btn-agregarPaciente').on('click', function (e) {

        console.log("Entró");

        if (isValidName($('#nombrePaciente')) && isValidLastName($('#primer-apellidoPaciente')) && isValidUserName($('#usuarioPaciente')) && isValidEmail($('#correoPaciente')) && isValidPassword($('#contraPaciente')) && isValidCURP($('#curpPaciente')) && isValidPhoneNumber($('#telPaciente')) && isValidSelect($('#estado-civilPaciente')) && isValidDate($('#cumplePaciente')) && isValidSelect($('#estadoPaciente')) && isValidSelect($('#municipioPaciente')) && areEqualPasswords($('#contraPaciente'), $('#confContraPaciente'))) {
            if (!isValidCheckbox($('#acepto-terminos'))) {
                $('#error-terminos').show();
            } else {
                $('#error-terminos').hide();
                console.log("TODO BIEN");


                $.ajax({
                    url: 'RegistraUsuarioController',
                    cache: false,
                    method: 'POST',
                    data: {

                        key: "registraUsuario",
                        nombre: $('#nombrePaciente').val(),
                        curp: $('#curpPaciente').val(),
                        fechaNacimiento: $('#cumplePaciente').val(),
                        apellido1: $('#primer-apellidoPaciente').val(),
                        apellido2: $('#segundo-apellidoPaciente').val(),
                        usuario: $('#usuarioPaciente').val(),
                        estadoCivil: $('#estado-civilPaciente').val(),
                        calle: $('#callePaciente').val(),
                        noInterior: $('#numIntPaciente').val(),
                        noExterior: $('#numExtPaciente').val(),
                        codigoPostal: $('#codigo-postalPaciente').val(),
                        estado: $('#estadoPaciente').val(),
                        municipio: $('#municipioPaciente').val(),
                        telefono: $('#telPaciente').val(),
                        correo: $('#correoPaciente').val(),
                        colonia: $('#colPaciente').val(),
                        pass1: $('#contraPaciente').val(),
                        pass2: $('#confContraPaciente').val(),
                        terminos: $('#acepto-terminos').val()

                    },
                    success: function (response) {
                        console.log("Response!" + response);
                        console.log("FUNCIONÓ! (creo)");
                        var t = $('#tablaPacientes').DataTable();

                        t.row.add([
                            '',
                            $("#nombrePaciente").val() + " " + $("#primer-apellidoPaciente").val() + " " + $("#segundo-apellidoPaciente").val(),
                            '',
                            '',
                            $("#telPaciente").val(),
                            $("#estadoPaciente option:selected").text(),
                            '',
                            "<button class='btn btn-primary btn-editarPaciente m-1' data-toggle='modal' data-target='#modalEditarPaciente' data-id='" + response + "'><i class='fas fa-edit'></i></button>" +
                                    "<button class='btn btn-primary descargarFormulario m-1' data-id='" + response + "'><i class='fas fa-cloud-download-alt'></i></button>" +
                                    "<button class='btn btn-danger btn-eliminarPaciente m-1' data-id='" + response + "'><i class='fas fa-trash-alt'></i></button>"
                        ]).draw(false);
                    }
                });
            }
        } else {
            console.log("ALGO MAL");
        }
    });


    //GUARDA EL PACIENTE DESDE EL MODAL
    $('#btn-guardarPaciente').on('click', function () {

        var idPaciente = $('#idPaciente');

        var prz = $('#editar-przPaciente');
        var nombre = $('#editar-nombrePaciente');
        var primerApellido = $('#editar-primerApellidoMedico');
        var segundoApellido = $('#editar-segundoApellidoMedico');
        var usuario = $('#editar-usuarioPaciente');
        var estadoCivil = $('#editar-estadoCivilPaciente');
        var fechaNacimiento = $('#editar-fechaNacimientoPaciente');
        var tratamiento = $('#editar-tratamientoPaciente');
        var estadio = $('#editar-estadioPaciente');
        var calle = $('#editar-callePaciente');
        var noInt = $('#editar-noIntPaciente');
        var noExt = $('#editar-noExtPaciente');
        var telefono = $('#editar-telefonoPaciente');
        var correo = $('#editarcorreoPaciente');

        $.ajax({

            url: 'AdminController',
            cache: false,
            method: 'POST',
            data: {
                key: 'recuperaPaciente',
                idPaciente: idPaciente.val(),
                prz: prz.val(),
                nombre: nombre.val(),
                primerApellido: primerApellido.val(),
                segundoApellido: segundoApellido.val(),
                usuario: usuario.val(),
                estadoCivil: estadoCivil.val(),
                fechaNacimiento: fechaNacimiento.val(),
                tratamiento: tratamiento.val(),
                estadio: estadio.val(),
                calle: calle.val(),
                noInt: noInt.val(),
                noExt: noExt.val(),
                telefono: telefono.val(),
                correo: correo.val()


            }
        })
                .done(function (response) {


                });

    });

    //Codigo Postal en Agregar Paciente
    $('#codigo-postalPaciente').on('change', function () {

        if ($(this).val().length === 0) {
            //Obtener estados
            $.ajax({
                url: 'ZonaController',
                cache: false,
                method: 'POST',
                data: {
                    key: "getEstados"
                },
                success: function (response) {
                    var data = JSON.parse(response);
                    //Limpia los campos de estado 
                    $("#estadoPaciente").each(function () {
                        $(this).children().remove();
                    });
                    //Limpia los campos de municipio 
                    $("#municipioPaciente").each(function () {
                        $(this).children().remove();
                    });
                    //Primera opcion de estado
                    $('#estadoPaciente').append("<option disabled selected>" + "Seleccione un estado" + "</option>");
                    //Primera opcion de municipio
                    $('#municipioPaciente').append("<option disabled selected>" + "Seleccione un municipio" + "</option>");
                    for (var i = 0; i < data.length; i++) {
                        //Carga estado
                        $('#estadoPaciente').append("<option value='" + data[i].idEstado + "'>" + data[i].nombre + "</option>");
                    }
                    $('#estadoPaciente').prop('selectedIndex', 0);
                    $('#municipioPaciente').prop('selectedIndex', 0);
                    console.log(data);
                }
            });
        } else if ($(this).val().length === 5) {
            $.ajax({
                url: 'ZonaController',
                cache: false,
                method: 'POST',
                data: {
                    key: "getEstadoyMunicipio",
                    numeroCP: $('#codigo-postalPaciente').val()
                },
                success: function (response) {
                    if (response == 'postalCodeDoesntExist') {
                        $('#error-CPexiste').show();
                    } else {
                        $('#error-CPexiste').hide();
                        var json = JSON.parse(response);
                        if ($('#codigo-postalPaciente').val().length === 5) {
                            //Limpia los campos 
                            $("#estadoPaciente").each(function () {
                                $(this).children().remove();
                            });
                            $("#municipioPaciente").each(function () {
                                $(this).children().remove();
                            });
                            //Carga estado
                            $('#estadoPaciente').append("<option value='" + json[0] + "'>" + json[1] + "</option>");
                            //Carga Municipio
                            $('#municipioPaciente').append("<option value='" + json[2] + "'>" + json[3] + "</option>");
                        } else {
                            $('#estadoPaciente').removeAttr('disabled');
                            $('#estadoPaciente').removeAttr('selected');
                        }
                        console.log(json);
                    }
                }
            });
        }
    });

    //Cargar los municipios con base en el estado
    $('#estadoPaciente').on('change', function () {
        $.ajax({
            url: 'ZonaController',
            data: {
                key: "getByEstado",
                idEstado: $('#estadoPaciente').val()
            },
            method: 'POST',
            success: function (response) {

                //Limpiar el select antes de que haga una consulta para que no se emapalmen los municipios
                $(".municipios select").each(function () {
                    $(this).children().remove();
                });
                var json = JSON.parse(response);
                for (var i = 0; i < json.length; i++) {
                    $('.municipios select').append("<option value=" + json[i].idMunicipio + ">" + json[i].nombre + "</option>");
                }
                $('.municipios select').prop('selectedIndex', 0);
                console.log(json);
            }
        });
    });

    $('#editarEstadoAdministradorAPaciente').on('change', function () {
        $.ajax({
            url: 'ZonaController',
            data: {
                key: "getByEstado",
                idEstado: $('#editarEstadoAdministradorAPaciente').val()
            },
            method: 'POST',
            success: function (response) {

                //Limpiar el select antes de que haga una consulta para que no se emapalmen los municipios
                $(".editarMunicipios select").each(function () {
                    $(this).children().remove();
                });
                var json = JSON.parse(response);
                for (var i = 0; i < json.length; i++) {
                    $('.editarMunicipios select').append("<option value=" + json[i].idMunicipio + ">" + json[i].nombre + "</option>");
                }
                $('.editarMunicipios select').prop('selectedIndex', 0);
                console.log(json);
            }
        });
    });

    /** ELIMINAR MEDICO */
    $('body').on('click', '#btn-eliminarPaciente', function () {

        var idPaciente = $(this).data('id');

        //Modal editar medicos
        swal({
            title: "Estas seguro?",
            text: "Los datos se eliminarán y no podrás recuperarlos.",
            icon: "warning",
            buttons: true,
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
                .then((eliminar) => {
                    if (eliminar) {

                        $.ajax({

                            url: 'AdminController',
                            cache: false,
                            method: 'POST',
                            data: {
                                key: 'eliminarPaciente',
                                idPaciente: idPaciente
                            },
                            success: function (response) {

                            }
                        });

                    } else {

                    }
                });
    });

    //AUTOCOMPLETAR Especialidades
    var especialidades = $('#listEspecialidades');

    $.ajax({
        url: 'AdministradorController',
        cache: false,
        method: 'POST',
        data: {key: "autocompletarEspecialidades"}
    })

            .done(function (response) {

                var json = JSON.parse(response);
                for (var i = 0; i < json.length; i++) {

                    var newObjeto = $('<option value="' + json[i].nombre + '"></option>');
                    especialidades.append(newObjeto);
                }


                console.log(JSON.stringify(especialidades));

            });


    // AUTOCOMPLETAR POSICIONES

    var posiciones = $('#listPosiciones');


    $.ajax({
        url: 'AdministradorController',
        cache: false,
        method: 'POST',
        data: {key: "autocompletarPosiciones"}
    })
            .done(function (response) {

                var json = JSON.parse(response);
                for (var i = 0; i < json.length; i++) {

                    var newObjeto = $('<option value="' + json[i].nombre + '"></option>');
                    posiciones.append(newObjeto);
                }

                console.log(JSON.stringify(posiciones));

            });

    //VALIDACIONES
    function formatDate(date) {
        var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    function convertDate(date) {

        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
    }


    function isValidPassword(input) {

        var m = input.val();

        var expreg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,14}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidIntNumber(input) {

        var m = input.val();

        var expreg = /^[#a-zA-Z0-9]{1,100000}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;


    }

    function isValidExtNumber(input) {

        var m = input.val();

        var expreg = /^[#0-9]{1,100000}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;

    }

    function areEqualPasswords(pass1, pass2) {

        if (pass1.val() != pass2.val()) {

            pass2.css('border', '1px solid red');
            pass1.css('border', '1px solid red');
            $('#noEqualPasswordsError').show();

            return false;

        } else {

            pass2.css('border', '');
            pass1.css('border', '');
            $('#noEqualPasswordsError').hide();

        }

        return true;
    }

    function isValidName(input) {

        var m = input.val();

        var expreg = /^[-a-zA-Z\u00E0-\u00FCñÑ. ]{2,255}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidPosicion(input) {

        var m = input.val();

        var expreg = /^[-a-zA-Z\u00E0-\u00FCñÑ. ]{2,255}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidEspecialidad(input) {

        var m = input.val();

        var expreg = /^[-a-zA-Z\u00E0-\u00FCñÑ. ]{2,255}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidLastName(input) {

        var m = input.val();

        var expreg = /^[-a-zA-Z\u00E0-\u00FCñÑ. ]{2,127}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidUserName(input) {

        var m = input.val();

        var expreg = /^[a-zA-Z0-9]{4,16}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidEmail(input) {

        var m = input.val();

        var expreg = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidPhoneNumber(input) {

        var m = input.val();

        var expreg = /^[0-9]{10,10}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidDate(input) {

        //Obtener fecha
        let today = new Date();

        //Valor seleccionado del input
        let date_from = input.val();
        date_from = new Date(date_from);

        //Tomar los valores de hoy
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();

        //Hoy hace 16 años y hoy hace 115 años
        var maxDate = new Date(year - 16, month, day);
        var minDate = new Date(year - 115, month, day);

        let event = true;

        if (maxDate > date_from && date_from > minDate) {
            event = false;
        }

        if (!input.val() || event) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidSelect(input) {

        if (!input.val()) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidNumEmpleado(input) {

        var m = input.val();

        var expreg = /^[0-9]{6,6}$/;


        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidStreet(input) {

        var m = input.val();

        var expreg = /^[a-zA-Z\u00E0-\u00FCñÑ.0-9 ]{1,255}$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;


    }

    function isValidColonia(input) {

        var m = input.val();

        var expreg = /^[a-zA-Z\u00E0-\u00FCñÑ.0-9 ]{1,500}$/;


        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidCURP(input) {

        var m = input.val();

        var expreg = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidCedula(input) {

        var m = input.val();

        var expreg = /^[0-9]{7,7}$/;


        if (!expreg.test(m)) {

            input.css('border', '1px solid red');
            input.css('color', 'red');
            return false;

        } else {
            input.css('border', '');
            input.css('color', '');
        }

        return true;
    }

    function isValidCheckbox(input) {

        if (input.is(':checked')) {
            return true;
        }

        return false;
    }
});

function configureLoadingScreen(screen) {
    $(document)
            .ajaxStart(function () {
                screen.fadeIn();
            })
            .ajaxStop(function () {
                screen.fadeOut();
            })
}