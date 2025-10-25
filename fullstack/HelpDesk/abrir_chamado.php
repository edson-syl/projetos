<?php
session_start();

if (!isset($_SESSION["usuario"])) {
    header("Location: index.php");
    exit;
}

$erro = "";
$sucesso = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $titulo = trim($_POST["titulo"] ?? "");
    $descricao = trim($_POST["descricao"] ?? "");

    if ($titulo === "" || $descricao === "") {
        $erro = "Por favor, preencha todos os campos.";
    } else {
        $chamado = [
            "id" => uniqid(),
            "usuario" => $_SESSION["usuario"],
            "titulo" => $titulo,
            "descricao" => $descricao,
            "status" => "Aberto",
            "data_abertura" => date("Y-m-d H:i:s"),
        ];

        $arquivo = __DIR__ . "/data/chamados.json";

        // Lê chamados existentes ou cria array vazio
        $chamados = [];
        if (file_exists($arquivo)) {
            $json = file_get_contents($arquivo);
            $chamados = json_decode($json, true) ?: [];
        }

        // Adiciona o novo chamado
        $chamados[] = $chamado;

        // Salva no arquivo JSON
        file_put_contents($arquivo, json_encode($chamados, JSON_PRETTY_PRINT));

        $sucesso = "Chamado aberto com sucesso!";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Abrir Chamado - HelpDesk</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <a class="navbar-brand" href="menu.php">HelpDesk</a>
    <div class="ms-auto">
        <span class="navbar-text text-light me-3">
            Logado como: <strong><?= htmlspecialchars($_SESSION["usuario"]) ?></strong>
        </span>
        <a href="logout.php" class="btn btn-outline-light btn-sm">Sair</a>
    </div>
</nav>

<div class="container my-5 col-lg-6">
    <h3>Abrir Novo Chamado</h3>

    <?php if ($erro): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <?php if ($sucesso): ?>
        <div class="alert alert-success"><?= htmlspecialchars($sucesso) ?></div>
    <?php endif; ?>

    <form method="post" action="abrir_chamado.php">
        <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" name="titulo" id="titulo" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea name="descricao" id="descricao" rows="4" class="form-control" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Abrir Chamado</button>
        <a href="menu.php" class="btn btn-secondary ms-2">Voltar</a>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
