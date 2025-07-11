<?php
require_once 'conexao.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $data = $_POST['data'] ?? '';

    if (!empty($nome) && !empty($data)) {
        $sql = "UPDATE tarefas_ativas SET nome = :nome, data = :data WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['nome' => $nome, 'data' => $data, 'id' => $id]);

        header('Location: tarefas_pendentes.php');
        exit;
    } else {
        $erro = "Preencha todos os campos.";
    }
} else {
    $sql = "SELECT * FROM tarefas_ativas WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
    $tarefa = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$tarefa) {
        header('Location: index.php');
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Editar Tarefa</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-light bg-light w-100">
    <a class="px-2" style="display: flex; text-decoration: none;">
        <img src="assets/logo.png" style="width: 70px;" class="my-auto" alt="Logo">
        <h2 class="my-auto text-dark">Editar Tarefa</h2>
    </a>
</nav>

<div class="container mt-4" style="max-width: 500px;">
    <?php if (!empty($erro)): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <form method="POST">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" id="nome" name="nome" class="form-control" value="<?= htmlspecialchars($tarefa['nome']) ?>" required>
        </div>
        <div class="mb-3">
            <label for="data" class="form-label">Data</label>
            <input type="date" id="data" name="data" class="form-control" value="<?= htmlspecialchars($tarefa['data']) ?>" required>
        </div>
        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
        <button type="button" class="btn btn-secondary" onclick="window.location.href='tarefas_pendentes.php'">Cancelar</button>
    </form>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
