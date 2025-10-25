<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: index.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>HelpDesk - Menu</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
<nav class="nav bg-dark px-4 py-3">
    <a href="menu.php" class="d-flex align-items-center text-decoration-none">
        <img src="images/logo.png" class="img-fluid" style="max-height: 60px;">
        <h3 class="text-light ms-3 mb-0">HelpDesk</h3>
    </a>
    <div class="ms-auto">
        <span class="text-light me-3"><?= htmlspecialchars($_SESSION["usuario"]) ?></span>
        <a href="logout.php" class="btn btn-sm btn-danger">Sair</a>
    </div>
</nav>

<div class="option container bg-light rounded shadow mt-4 py-4 px-3">
    <h4 class="text-center mb-4">Menu</h4>

    <div class="row justify-content-center text-center g-3">
        <div class="col-12 col-md-5">
            <a href="abrir_chamado.php" class="btn btn-outline-primary w-100 py-3 fs-5">Abrir Chamado</a>
        </div>
        <div class="col-12 col-md-5">
            <a href="consultar_chamado.php" class="btn btn-outline-success w-100 py-3 fs-5">Consultar Chamado</a>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
