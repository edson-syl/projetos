<?php
require_once 'conexao.php';


$sql = "SELECT * FROM tarefas_ativas WHERE status = 'pendente' ORDER BY data ASC";
$stmt = $pdo->query($sql);
$tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Tarefas Pendentes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/logo.png" rel="shortcut icon" type="image/x-icon">
</head>
<body>
<nav class="navbar navbar-light bg-light w-100">
    <a class="px-2" style="display: flex; text-decoration: none;">
        <img src="assets/logo.png" style="width: 70px;" class="my-auto" alt="Logo">
        <h2 class="my-auto text-dark">Tarefas Pendentes</h2>
    </a>
</nav>

<div class="container mt-4">
    <?php if (count($tarefas) === 0): ?>
        <div class="alert alert-info">Nenhuma tarefa pendente.</div>
    <?php else: ?>
        <ul class="list-group">
            <?php foreach ($tarefas as $tarefa): ?>
                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <strong><?= htmlspecialchars($tarefa['nome']) ?></strong>
                        <?php if ($tarefa['status'] === 'concluida'): ?>
                        <span class="badge bg-success ms-2">Concluída</span>
                        <?php else: ?>
                        <span class="badge bg-warning text-dark ms-2">Pendente</span>
                        <?php endif; ?>
                        <br>
                        <small>Data: <?= htmlspecialchars($tarefa['data']) ?></small>
                    </div>
                    <div class="btn-group" role="group" aria-label="Ações">
                        <a href="editar_tarefa.php?id=<?= $tarefa['id'] ?>" class="btn btn-sm btn-primary" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <a href="excluir_tarefa.php?id=<?= $tarefa['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Excluir esta tarefa?')" title="Excluir">
                            <i class="bi bi-trash"></i>
                        </a>
                        <a href="marcar_concluida.php?id=<?= $tarefa['id'] ?>" class="btn btn-sm btn-success" title="Concluir">
                            <i class="bi bi-check-lg"></i>
                            </a>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <button class="btn btn-dark mt-3" onclick="window.location.href='index.php'">Voltar</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
