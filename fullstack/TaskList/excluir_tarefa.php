<<<<<<< HEAD
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
=======
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
>>>>>>> f6147817db8da2f863618685ca5959e99c21c5c8
