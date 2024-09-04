
document.addEventListener('DOMContentLoaded', function() {
    const verseContainer = document.getElementById('verse-container');
    const dailyVerse = 'João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.';

    const verseElement = document.createElement('div');
    verseElement.className = 'verse';
    verseElement.textContent = dailyVerse;

    verseContainer.appendChild(verseElement);
    getAICommentary(dailyVerse);
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    searchBible(query);
});

function searchBible(query) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    // Simulação de busca na Bíblia
    const results = [
        'Gênesis 1:1 - No princípio, criou Deus os céus e a terra.',
        'João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.'
    ];

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'verse';
        resultElement.textContent = result;
        searchResults.appendChild(resultElement);
    });
}

function getAICommentary(verse) {
    const apiUrl = 'https://api-inference.huggingface.co/models/llama-3.1-405B';
    const apiKey = 'YOUR_HUGGING_FACE_API_KEY';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: verse
        })
    })
    .then(response => response.json())
    .then(data => {
        const commentary = data[0].generated_text;
        const commentaryElement = document.createElement('div');
        commentaryElement.className = 'commentary';
        commentaryElement.textContent = commentary;
        verseContainer.appendChild(commentaryElement);
    })
    .catch(error => console.error('Error:', error));
}
