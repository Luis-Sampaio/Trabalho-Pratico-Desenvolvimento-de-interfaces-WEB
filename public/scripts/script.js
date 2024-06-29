// Função para buscar e atualizar informações do perfil do GitHub
function atualizarPerfilGitHub(username) {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Atualiza as informações no HTML
            document.getElementById('nome-perfil').textContent = data.name || data.login;
            document.getElementById('bio').textContent = data.bio || 'Biografia não disponível.';
            document.getElementById('local').innerHTML = `<a>Local: </a>${data.location || 'Não informado'}`;
            document.getElementById('link-github').href = data.html_url;
            document.getElementById('link-github').textContent = data.html_url;
            document.getElementById('seguidores').textContent = data.followers;

            if (data.avatar_url) {
                document.getElementById('img-perfil').src = data.avatar_url;
            }
        })
        .catch(error => console.error('Erro ao buscar dados do GitHub:', error));
}

// Chama a função para atualizar o perfil com o usuário desejado
atualizarPerfilGitHub('Luis-Sampaio'); // Substitua 'Luis-Sampaio' pelo nome de usuário desejado

// Função para carregar repositórios
function carregarRepositorios() {
    const container = document.getElementById('repo-cards');
    const username = 'Luis-Sampaio'; // Nome de usuário do GitHub

    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log('Nenhum repositório encontrado.');
                return;
            }

            let reposHTML = '';

            data.forEach(repo => {
                let descricao = repo.description || 'Descrição não disponível.';
                if (descricao.length > 500) {
                    descricao = descricao.substring(0, 500) + '...';
                }

                reposHTML += `
                    <div class="col-sm-3 mb-3 mb-sm-0 py-4">
                        <div class="card shadow-lg">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${descricao} </p>
                                <a href="repo.html?repo=${repo.name}" class="btn btn-primary">Ir para repositório</a>
                            </div>
                            <div class="d-inline-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-star m-3 pb-1" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                </svg>
                                <h3 class="pt-2">${repo.stargazers_count}</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person m-3 pb-1" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                <h3 class="pt-2">${repo.watchers_count}</h3>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = reposHTML; // Atribui o HTML completo ao container
        })
        .catch(error => console.error('Erro ao buscar repositórios:', error));
}

// Chama a função para carregar os repositórios
carregarRepositorios();

// Função para carregar colegas de trabalho
function carregarColegas() {
    fetch('http://localhost:3000/colegas')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('colegas-cards');
            let colegasHTML = '';

            data.forEach(colega => {
                colegasHTML += `
                    <div class="col-sm-2 mb-3">
                        <div class="card shadow-lg border-0 rounded-4">
                            <img src="${colega.foto}" class="card-img-top rounded-top-4" alt="${colega.nome}">
                            <div class="card-body">
                                <h5 class="card-title">${colega.nome}</h5>
                                <a href="${colega.link}" class="btn btn-primary">Perfil</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = colegasHTML;
        })
        .catch(error => console.error('Erro ao carregar colegas:', error));
}

// Chama a função para carregar colegas
carregarColegas();

// Função para carregar notícias no carrossel
function carregarNoticias() {
    fetch('http://localhost:3000/noticias')
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.getElementById('carousel-inner');
            const carouselIndicators = document.getElementById('carousel-indicators');

            let noticiasHTML = '';
            let indicatorsHTML = '';
            data.forEach((noticia, index) => {
                noticiasHTML += `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <a href="${noticia.url}" target="_blank">
                            <img src="${noticia.img}" class="d-block w-100" alt="${noticia.titulo}">
                        </a>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${noticia.titulo}</h5>
                            <p>${noticia.descricao}</p>
                        </div>
                    </div>
                `;
                indicatorsHTML += `
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-current="true" aria-label="Slide ${index + 1}"></button>
                `;
            });

            carouselInner.innerHTML = noticiasHTML;
            carouselIndicators.innerHTML = indicatorsHTML;
        })
        .catch(error => console.error('Erro ao carregar notícias:', error));
}

// Chama a função para carregar notícias
carregarNoticias();

// Função para carregar links das redes sociais
function carregarRedesSociais() {
    fetch('http://localhost:3000/redesSociais')
        .then(response => response.json())
        .then(data => {
            data.forEach(rede => {
                if (rede.linkedin) {
                    document.getElementById('link-linkedin').href = rede.linkedin;
                }
                if (rede.instagram) {
                    document.getElementById('link-instagram').href = rede.instagram;
                }
                if (rede.facebook) {
                    document.getElementById('link-facebook').href = rede.facebook;
                }
            });
        })
        .catch(error => console.error('Erro ao carregar redes sociais:', error));
}

// Chama a função para carregar as redes sociais
carregarRedesSociais();

// Função para buscar e atualizar o nome do perfil do GitHub na navbar
function atualizarNomeNav(username) {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Atualiza o nome no elemento da navbar
            document.getElementById('nomeNav').textContent = data.name || data.login;
        })
        .catch(error => console.error('Erro ao buscar dados do GitHub:', error));
}

// Chama a função para atualizar o nome na navbar com o usuário desejado
atualizarNomeNav('Luis-Sampaio'); // Substitua 'Luis-Sampaio' pelo nome de usuário desejado
