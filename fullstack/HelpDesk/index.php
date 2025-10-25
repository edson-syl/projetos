<?php
session_start();

define('USUARIOS_FILE', __DIR__ . '/data/usuarios.json');

function carregarUsuarios() {
    if (!file_exists(USUARIOS_FILE)) {
        $usuarios_iniciais = [
            "user1@example.com" => "1234",
            "user2@example.com" => "abcd"
        ];
        file_put_contents(USUARIOS_FILE, json_encode($usuarios_iniciais, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $usuarios_iniciais;
    }
    $json = file_get_contents(USUARIOS_FILE);
    $usuarios = json_decode($json, true);
    if (!is_array($usuarios)) {
        return [];
    }
    return $usuarios;
}

function salvarUsuarios(array $usuarios) {
    file_put_contents(USUARIOS_FILE, json_encode($usuarios, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$erro = "";
$usuarios = carregarUsuarios();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    $senha = trim($_POST["senha"] ?? "");

    if ($email === "" || $senha === "") {
        $erro = "Por favor, preencha email e senha.";
    } else {
        if (isset($usuarios[$email])) {
            // Usuário existe, verifica senha
            if ($usuarios[$email] === $senha) {
                $_SESSION["usuario"] = $email;
                header("Location: menu.php");
                exit;
            } else {
                $erro = "Senha incorreta.";
            }
        } else {
            $usuarios[$email] = $senha;
            salvarUsuarios($usuarios);
            $_SESSION["usuario"] = $email;
            header("Location: menu.php");
            exit;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>HelpDesk - Login</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
<nav class="nav bg-dark px-4 py-3">
    <a href="index.php" class="d-flex align-items-center text-decoration-none">
        <img src="images/logo.png" class="img-fluid" style="max-height: 60px;" alt="Logo HelpDesk" />
        <h3 class="text-light ms-3 mb-0">HelpDesk</h3>
    </a>
</nav>

<div class="container-sm col-12 col-sm-8 col-md-6 col-lg-4 bg-light rounded shadow p-4 my-5">
    <h4 class="text-center mb-4">Login</h4>

    <?php if ($erro): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <form method="post" action="" id="login">
        <div class="mb-3">
            <input type="email" name="email" class="form-control" placeholder="Email" required autofocus />
        </div>

        <div class="mb-3">
            <input type="password" name="senha" class="form-control" placeholder="Senha" required />
        </div>

        <button type="submit" class="btn btn-primary w-100">Entrar</button>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
