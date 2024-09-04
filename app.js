
document.addEventListener('DOMContentLoaded', function() {
    const verseContainer = document.getElementById('verse-container');
    const dailyVerse = 'João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.';

    const verseElement = document.createElement('div');
    verseElement.className = 'verse';
    verseElement.textContent = dailyVerse;

    verseContainer.appendChild(verseElement);
});
