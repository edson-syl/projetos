<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeNest - Login</title>
    <link rel="icon" href="assets/images/Icon-page.ico">

    <link rel="stylesheet" href="assets/css/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="assets/js/script.js"></script>
</head>
<body id="body02" class="light-theme">
    <div class="container-fluid">

        <a href="index.php" id="arrow-back" ><img src="assets/images/home.png" style="max-width: 60px;"></a>

        <div class="row">
            <div class="col-md-6 mx-auto mt-md-2 p-5"  style="color: #541e98;">
                <h2 class="fw-bold text-center mb-5">LOGIN</h2>

                <form class="fw-bold" id="login-form" method="post" action="">
                    <div class="input-group mb-4">
                        <label class="m-2">E-MAIL</label>
                        <input type="email" name="email" id="email" class="form-control" placeholder="Seu e-mail" required>
                    </div>
                    <div class="input-group mb-2">
                        <label class="m-2">SENHA</label>
                        <input type="password" name="pass" id="pass" class="form-control" placeholder="Sua senha" required>
                    </div>
                    <a href="cadastro.php" class="text-center" id="a-register"><p>Não tenho conta</p></a>
                    
                    <div class="text-center">
                        <button type="submit" id="btn-login" class="btn btn-principal">ENTRAR</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
    <footer class="text-center fixed-bottom">
        <p class="fw-semibold">© 2025 Edson Silva Batista. Todos os direitos reservados.</p>
    </footer>


    <script>
        $('#btn-login').click((e) => {
        e.preventDefault();
        var loginform = $('#login-form').serialize();
        var emailInput = $('#email');
        var passInput = $('#pass');

        $.ajax({
            type: 'POST',
            url: 'processo.php',
            data: loginform,
            dataType: 'json',
            success: dados => {
                if(dados.status === 'ok') {
                    localStorage.setItem('username', dados.nome);
                    window.location.href = 'index.php';
                } else {
                    emailInput.val('').attr('placeholder', dados.msg).addClass('erro');
                    passInput.val('').addClass('erro');

                    setTimeout(() => {
                        emailInput.attr('placeholder', 'Seu e-mail').removeClass('erro');
                        passInput.removeClass('erro');
                    }, 2500);
                }
            },
            error: erro => {
                console.log(erro);
            }
            });
        });
    </script>
</body>
</html>