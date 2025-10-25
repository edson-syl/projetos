<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <link href="assets/logo.png" rel="shortcut icon" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskList</title>
</head>
<body>
    <nav class="navbar navbar-light bg-light" style="width: 100%;">
        <a style="display: flex; text-decoration: none;" class="px-2"><img class="my-auto" style="width: 70px;" src="assets/logo.png"><h2 class="my-auto text-dark">Lista de tarefas</h2></a>
    </nav>

    <div id="controle_menu" class="container mt-5">
        <div class="d-flex flex-column align-items-center w-100 w-md-25 mx-auto px-3" style="max-width: 400px;">
            <h1 class="fw-bold text-center">MENU</h1>
            <button class="btn btn-success w-100 my-1" onclick="window.location.href='nova_tarefa.php'">Nova tarefa</button>
            <button class="btn btn-light w-100 my-1" onclick="window.location.href='tarefas_pendentes.php'">Tarefas pendentes</button>
            <button class="btn btn-light w-100 my-1" onclick="window.location.href='todas_tarefas.php'">Todas as tarefas</button>
        </div>
    </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></script>
</body>
</html>