<<<<<<< HEAD
<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=task_list', 'root', 'vD7#pLr9!XzQ@8mW');
}
catch (PDOException $e) {
    echo "Erro: ", $e ->getMessage();
=======
<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=task_list', 'root', 'vD7#pLr9!XzQ@8mW');
}
catch (PDOException $e) {
    echo "Erro: ", $e ->getMessage();
>>>>>>> f6147817db8da2f863618685ca5959e99c21c5c8
};