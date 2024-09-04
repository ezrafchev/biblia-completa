
document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar o versículo diário
    function fetchDailyVerse() {
        // Exemplo de versículo diário
        const dailyVerse = "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. - João 3:16";
        document.getElementById('verse').innerText = dailyVerse;
    }

    // Função para buscar capítulos e versículos
    function searchVerse() {
        const query = document.getElementById('search-input').value;
        // Exemplo de resultado de busca
        const searchResult = `Resultado da busca para "${query}": João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.`;
        document.getElementById('search-results').innerText = searchResult;
    }

    // Buscar o versículo diário ao carregar a página
    fetchDailyVerse();

    // Adicionar evento de clique ao botão de busca
    document.getElementById('search-button').addEventListener('click', searchVerse);
});
