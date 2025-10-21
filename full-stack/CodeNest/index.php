<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeNest</title>
    <link rel="icon" href="assets/images/Icon-page.ico">
    
    <link rel="stylesheet" href="assets/css/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="assets/js/script.js"></script>
</head>
<body id="body01" class="light-theme">
    
    <nav class="navbar navbar-expand-lg" style="top: 0;">
        <span class="navbar-brand mt-1"><a href="index.html"><img style="max-width: 200px;" src="assets/images/Icon.png" class="ms-md-5"></a></span>
        <button class="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#conteudo-nav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse me-md-4" id="conteudo-nav">
            <ul class="navbar-nav ms-auto p-4">
                <li class="nav-item"><a class="nav-link fw-bold" href="#home"><p class="nav-link-style">INÍCIO</p></a></li>
                <li class="nav-item"><a class="nav-link fw-bold" href="#about-us"><p class="nav-link-style">SOBRE NÓS</p></a></li>
                <li class="nav-item"><a class="nav-link fw-bold" href="#contact"><p class="nav-link-style">CONTATO</p></a></li>
                <li class="nav-item" id="user"><a class="nav-link fw-bold btn-nav" href="login.php" style="color: blueviolet;">LOGIN</a></li>
                <li class="nav-item" id="btn-quit"><a class="nav-link fw-bold btn-nav" href="index.php" style="color: #FF6666;">SAIR</a></li>
                <li class="nav-item"><a class="nav-link fw-bold btn-nav" href="#"  style="color: blueviolet;" id="btn-theme">TEMA ESCURO</a></li>
            </ul>
        </div>
    </nav>

    <!--Home-->
    <div class="container-fluid" id="home">
        <div class="row">
            <div class="col-md-6" style="margin-top: 10%; padding-left: 4%;">
                <h2 style="color: #541e98;" class="fw-bold">Bem-vindo ao CodeNest: Onde ideias viram código</h2>
                <p class="fw-semibold">
                    Na CodeNest, transformamos conceitos em soluções digitais inteligentes. Nosso ninho é feito de inovação, tecnologia e pessoas apaixonadas por criar experiências que fazem a diferença.
                    Seja um site, um sistema ou uma aplicação sob medida — aqui suas ideias ganham vida com qualidade e propósito.
                    
                </p>
                <a href="#about-us"><button class="btn btn-principal">Descubra mais</button></a>
                
            </div>
            <div class="col-md-6 my-auto">
                 <img src="assets/images/meeting-animate.svg"  class="img-fluid ms-auto d-none d-md-block" style="display: block; margin-top: 10px; margin-left: auto;">
            </div>
            <p style="margin-bottom: 5%;"></p>
        </div>
        
    </div>

    <!--About us-->
    <div class="container-fluid" id="about-us" style="background-color: #541e98;">
        <div class="row">
            <div class="col-md-6 mx-auto"><img src="assets/images/about-us-page-animate.svg"></div>
        </div>
        <div class="row">
            <div class="col-md-6 mx-auto">
                <h2 class="text-center fw-bold" style="color: aliceblue;">Quem somos</h2>
                <p style="color: aliceblue;" class="fw-bold text-center">Na CodeNest, somos um time que vive e respira tecnologia — mas o que realmente nos move é ver ideias ganhando vida.
                Unimos criatividade, estratégia e código limpo para entregar soluções que fazem sentido e geram impacto.
                Mais do que desenvolvedores, somos construtores de experiências digitais com propósito.
                Aqui, cada linha de código é escrita com dedicação, cada projeto é tratado como único, e cada cliente faz parte do nosso ninho.</p>
            </div>
            <p style="margin-bottom: 5%;"></p>
        </div>
        <p style="margin-bottom: 5%;"></p>
    </div>

    <!--Contact-->
    <div class="container-fluid" id="contact">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <h2 class="fw-bold text-center" style="color: #541e98; margin-bottom: 35px;">Contato</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mx-auto fw-bold">
                <form>
                    <div class="input-group mb-4">
                        <label class="p-2">Contato</label>
                        <input class="form-control" placeholder="(XX) XXXXX-XXXX" type="tel" required>
                    </div>
                    <div class="input-group mb-4">
                        <label class="p-2">Mensagem</label>
                        <textarea class="form-control" maxlength="200" style="resize: none;" placeholder="Escreva aqui"></textarea>
                    </div>
                    <div class="text-center"><button type="submit" class="btn center btn-principal">Enviar formulário</button></div>
                    
                </form>
            </div>
        </div>
        <p style="margin-bottom: 5%;"></p>
    </div>

    <footer class="text-center">
        <p class="fw-semibold">© 2025 Edson Silva Batista. Todos os direitos reservados.</p>
    </footer>

    <script>
        $(document).ready(() => {
            $('#btn-quit').hide();
            let user = localStorage.getItem('username')
            if(user) {
                $('#btn-quit').show();
                $('#user').html(`<li class="nav-item fw-bold mt-2" id="user" style="color: ">${user.toUpperCase().split(' ')[0]}</li>`)
                localStorage.removeItem('username');
            }
        })
    </script>
</body>
</html>