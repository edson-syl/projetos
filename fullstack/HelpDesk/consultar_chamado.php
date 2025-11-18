<?php
session_start();

if (!isset($_SESSION["usuario"])) {
    header("Location: index.php");
    exit;
}

$arquivo = __DIR__ . "/data/chamados.json";
$chamados = [];

if (file_exists($arquivo)) {
    $json = file_get_contents($arquivo);
    $chamados = json_decode($json, true) ?: [];
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Consultar Chamados - HelpDesk</title>
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

<div class="container my-5 col-lg-8">
    <h3>Chamados Abertos</h3>
    <a href="menu.php" class="btn btn-secondary mb-3">Voltar</a>

    <?php if (empty($chamados)): ?>
        <div class="alert alert-info">Nenhum chamado encontrado.</div>
    <?php else: ?>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Usuário</th>
                    <th>Data de Abertura</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($chamados as $c): ?>
                    <tr>
                        <td><?= htmlspecialchars($c["id"]) ?></td>
                        <td><?= htmlspecialchars($c["titulo"]) ?></td>
                        <td><?= nl2br(htmlspecialchars($c["descricao"])) ?></td>
                        <td><?= htmlspecialchars($c["status"]) ?></td>
                        <td><?= htmlspecialchars($c["usuario"]) ?></td>
                        <td><?= htmlspecialchars($c["data_abertura"]) ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
