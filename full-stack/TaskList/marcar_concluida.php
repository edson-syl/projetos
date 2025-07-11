<?php
require_once 'conexao.php';

$id = $_GET['id'] ?? null;

if ($id) {
    $sql = "UPDATE tarefas_ativas SET status = 'concluida' WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
}

header("Location: " . ($_SERVER['HTTP_REFERER'] ?? 'index.php'));
exit;
