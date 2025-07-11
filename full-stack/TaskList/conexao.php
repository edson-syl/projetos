<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=task_list', 'root', 'vD7#pLr9!XzQ@8mW');
}
catch (PDOException $e) {
    echo "Erro: ", $e ->getMessage();
};