<?php 

$host = 'localhost';
$user = 'root';
$pass = 'Edson0706.';
$db = 'data';

$conexao = mysqli_connect($host, $user, $pass, $db);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $namecad = $_POST['name'] ?? '';
    $emailcad = $_POST['email'] ?? '';
    $passraw = $_POST['pass'] ?? '';

    if (empty($namecad) || empty($emailcad) || empty($passraw)) {
        echo json_encode(['status' => 'empty']);
        exit;
    }

    $passcad = password_hash($passraw, PASSWORD_DEFAULT);

    $stmt = $conexao->prepare("
        INSERT IGNORE INTO usuarios (nome, email, pass)
        VALUES (?, ?, ?)
    ");
    $stmt->bind_param('sss', $namecad, $emailcad, $passcad);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'ok']);
    } else {
        echo json_encode(['status' => 'exists']);
    }

    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeNest - Cadastro</title>
    <link rel="icon" href="assets/images/Icon-page.ico">

    <link rel="stylesheet" href="assets/css/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="assets/js/script.js"></script>
</head>
<body id="body 03" class="light-theme">
    <div class="container-fluid">

        <a href="index.php" id="arrow-back"><img src="assets/images/home.png" style="max-width: 60px;"></a>

        <div class="row">
            <div class="col-md-6 mx-auto mt-md-2 p-5"  style="color: #541e98;">
                <h2 class="fw-bold text-center mb-5">CADASTRO</h2>

                <form class="fw-bold" id="cadastro-form" method="post" action="">
                    <div class="input-group mb-4">
                        <label class="m-2">NOME</label>
                        <input type="text" class="form-control" name="name" id="namecad" placeholder="Seu nome" required>
                    </div>
                    <div class="input-group mb-4">
                        <label class="m-2">E-MAIL</label>
                        <input type="email" class="form-control" name="email" id="email" placeholder="Seu e-mail" required>
                    </div>
                    <div class="input-group mb-2">
                        <label class="m-2">SENHA</label>
                        <input type="password" class="form-control" name="pass" id="pass" placeholder="Sua senha" required>
                    </div>
                    <a href="login.php" class="text-center" id="a-register"><p> Já tenho conta</p></a>
                    <div class="text-center">
                        <button type="submit" class="btn btn-principal" id="btn-cadastro">CADASTRAR</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
    <footer class="text-center fixed-bottom">
        <p class="fw-semibold">© 2025 Edson Silva Batista. Todos os direitos reservados.</p>
    </footer>

    <script>
        $('#btn-cadastro').click((e) => {
            e.preventDefault();

            const cadastroform = $('#cadastro-form').serialize();
            const namecad = $('#namecad').val();
            const emailcad = $('#email').val();
            const passcad = $('#pass').val();

            $.ajax({
                type: 'POST',
                url: 'cadastro.php',
                data: cadastroform,
                dataType: 'json',
                success: (dados) => {
                    if (dados.status === 'ok') {
                        localStorage.setItem('username', namecad);
                        window.location.href = 'index.php';
                    } 
                    else if (dados.status === 'exists') {
                        $('#email').attr('placeholder', 'E-mail já cadastrado!').addClass('erro').val('');
                        setTimeout(() => {
                            $('#email').attr('placeholder', 'Seu e-mail').removeClass('erro');
                        }, 1500);
                    }
                    else if (dados.status === 'empty') {
                        $('#namecad').attr('placeholder', 'Preencha este campo!').addClass('erro').val('');
                        $('#email').attr('placeholder', 'Preencha este campo!').addClass('erro').val('');
                        $('#pass').attr('placeholder', 'Preencha este campo!').addClass('erro').val('');
                        setTimeout(() => {
                            $('#namecad').attr('placeholder', 'Seu nome').removeClass('erro');
                            $('#email').attr('placeholder', 'Seu e-mail').removeClass('erro');
                            $('#pass').attr('placeholder', 'Sua senha').removeClass('erro');
                        }, 1500);
                    }
                },
                error: (erro) => {
                    console.log('Erro no AJAX:', erro);
                }
            });
        });
    </script>
</body>
</html>