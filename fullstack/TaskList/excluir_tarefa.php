<?php
require_once 'conexao.php';

$id = $_GET['id'] ?? null;

if ($id) {
    $sql = "DELETE FROM tarefas_ativas WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);
}

header("Location: " . ($_SERVER['HTTP_REFERER'] ?? 'index.php'));
exit;
