
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
    
    // Nova funcionalidade para buscar versículo diário do backend
    const verseContainer = document.getElementById('verse-container');
    fetch('http://127.0.0.1:8000/daily-verse')
        .then(response => response.json())
        .then(data => {
            const dailyVerse = `${data.book} ${data.chapter}:${data.verse}`;
            const verseElement = document.createElement('div');
            verseElement.className = 'verse';
            verseElement.textContent = dailyVerse;
            verseContainer.appendChild(verseElement);
            getAICommentary(dailyVerse);
        })
        .catch(error => console.error('Error fetching daily verse:', error));
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    searchBible(query);
});

function searchBible(query) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    // Simulação de busca na Bíblia
    const bibleData = {
        'Gênesis': {
            '1': [
                'No princípio, criou Deus os céus e a terra.',
                'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.'
            ],
            '2': [
                'Assim, pois, foram acabados os céus e a terra, e todo o seu exército.',
                'E havendo Deus acabado no dia sétimo a obra que fizera, descansou no sétimo dia de toda a sua obra, que tinha feito.'
            ]
        },
        'João': {
            '3': [
                'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
                'Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.'
            ]
        }
    };

    const [book, chapterVerse] = query.split(' ');
    const [chapter, verse] = chapterVerse.split(':');

    if (bibleData[book] && bibleData[book][chapter] && bibleData[book][chapter][verse - 1]) {
        const result = `${book} ${chapter}:${verse} - ${bibleData[book][chapter][verse - 1]}`;
        const resultElement = document.createElement('div');
        resultElement.className = 'verse';
        resultElement.textContent = result;
        searchResults.appendChild(resultElement);
        getAICommentary(result);
    } else {
        const noResultElement = document.createElement('div');
        noResultElement.className = 'verse';
        noResultElement.textContent = 'Nenhum resultado encontrado.';
        searchResults.appendChild(noResultElement);
    }
}

function getAICommentary(verse) {
    fetch('http://127.0.0.1:8000/ai-commentary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verse: verse })
    })
    .then(response => response.json())
    .then(data => {
        const commentaryElement = document.createElement('div');
        commentaryElement.className = 'commentary';
        commentaryElement.textContent = data.commentary;
        document.getElementById('search-results').appendChild(commentaryElement);
    })
    .catch(error => console.error('Error fetching AI commentary:', error));
}
