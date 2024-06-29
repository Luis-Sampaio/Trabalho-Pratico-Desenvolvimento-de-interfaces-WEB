// Função para obter os parâmetros da URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

// Função para carregar os detalhes do repositório
function carregarDetalhesDoRepositorio() {
    const params = getQueryParams();
    const repoName = params.repo;
    const username = 'Luis-Sampaio';
    const url = `https://api.github.com/repos/${username}/${repoName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('titulo').textContent = data.name;
            document.getElementById('descricao').textContent = data.description || 'Descrição não disponível.';
            document.getElementById('dataCriacao').textContent = new Date(data.created_at).toLocaleDateString();
            document.getElementById('stargazers_count').textContent = data.stargazers_count;
            document.getElementById('watchers_count').textContent = data.watchers_count;
            document.getElementById('linguagem').textContent = data.language || 'Não informado';
            document.getElementById('link-repositorio').href = data.html_url;

            const topicosContainer = document.getElementById('topicos');
            let topicosHTML = '';
            if (data.topics && data.topics.length > 0) {
                data.topics.forEach(topic => {
                    topicosHTML += `<button type="button" class="btn btn-primary m-1">${topic}</button>`;
                });
            } else {
                topicosHTML = 'Nenhum tópico encontrado.';
            }
            topicosContainer.innerHTML = topicosHTML;
        })
        .catch(error => console.error('Erro ao carregar detalhes do repositório:', error));
}

// Chama a função para carregar os detalhes do repositório
carregarDetalhesDoRepositorio();

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
