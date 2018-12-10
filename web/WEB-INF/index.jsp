<%-- 
    Document   : index
    Author     : julioguzman
--%>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Inicio de Sesi�n</title>
        <link rel="icon" href="img/logo-cancer.ico">


        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
        <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href="css/styleLogin.css">

    </head>
    <body>

        <form class="formulario">

            <h1 class="h3 mb-4 titulo-login text-center">Bienvenido</h1>

            <!-- Input usuario -->
            <div class="input-group">
                <input id="user" type="text" value="" class="form-control input-usuario mb-2 useFontAwesomeFamily effect3" placeholder="&#xf007; USUARIO" autofocus>

            </div>

            <!-- Input contraseña -->
            <div class="input-group">

                <input id="password" type="password" value="" class="form-control input-pass mb-4 useFontAwesomeFamily" placeholder="&#xf023; CONTRASE�A">
                <div id="loginContrasena"><i class="inputGlobal far fa-eye mt-3 mr-1"></i></div>

            </div>

            <!-- Input submit -->
            <input type="button" id="btn-login" class="btn btn-lg btn-secondary btn-block btn-login" value="INICIAR SESI�N">

            <!-- Mensaje de cargando -->
            <div class="row mt-3">
                <div class="col-12 text-center">
                    <span id="msj-cargando" class="text-success"> <i class="fas fa-spinner fa-spin mr-1"></i> Iniciando Sesi�n</span>
                </div>
            </div>

            <!-- MENSAJE DE ERROR -->
            <div class="row mt-3" id="msj-error">
                <div class="col-12 text-center">
                    <span class="text-center text-danger">El usuario o contrase�a son incorrectos</span>
                </div>
            </div>

            <h6 class="text-center mt-3 texto-pass"><span>�Olvidaste tu contrase�a?</span> <a href="#" id="recuperarContra" >Recup�rala aqu�</a></h6>

            <h6 class="text-center mt-2 texto-cuenta mb-0"><span>�No tienes cuenta?</span> <a href="#" id="registrate">Reg�strate aqu�</a></h6>

        </form>

        <div id="loading-screen" style="display: none">
            <img src="img/loading.svg">
            <p class="clear">Iniciando sesi�n, por favor espere...</p>
        </div>

        <script src="lib/jquery/jquery-3.3.1.js"></script>
        <script src="js/appLogin.js"></script>
        <script src="lib/jquery/jqueryPostGo.js"></script>
        <script src="lib/bootstrap/js/bootstrap.js"></script>
        <script src="lib/popper/popper.min.js"></script>
        <!--<script src="js/ajaxRecuperar.js"></script> -->
        <!--<script type="module" src="js/asincrono.js"></script>-->

    </body>
</html>