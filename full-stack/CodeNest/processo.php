<?php

$host = 'localhost';
$user = 'root';
$pass = 'Edson0706.';
$dashboard = 'data';

$conexao = mysqli_connect($host, $user, $pass, $dashboard);

$email = $_POST['email'] ?? '';
$passLogin = $_POST['pass'] ?? '';

if (!$email || !$passLogin) {
    echo json_encode(['status' => 'erro', 'msg' => 'Preencha todos os campos']);
    exit;
}

$stmt = $conexao->prepare("SELECT pass, nome FROM usuarios WHERE email = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(['status' => 'erro', 'msg' => 'Usuário não encontrado']);
    exit;
}

$stmt->bind_result($hash, $nome);
$stmt->fetch();

if (password_verify($passLogin, $hash)) {
    echo json_encode(['status' => 'ok', 'msg' => 'Login realizado com sucesso', 'nome' => $nome]);
} else {
    echo json_encode(['status' => 'erro', 'msg' => 'Senha incorreta']);
}

$stmt->close();
$conexao->close();
?>