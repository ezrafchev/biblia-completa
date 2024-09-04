
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import random

app = FastAPI()

bible_data = {
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
}

@app.get("/daily-verse")
def get_daily_verse():
    book = random.choice(list(bible_data.keys()))
    chapter = random.choice(list(bible_data[book].keys()))
    verse = random.choice(bible_data[book][chapter])
    return JSONResponse(content={"book": book, "chapter": chapter, "verse": verse})

@app.get("/search")
def search_bible(book: str, chapter: str, verse: str):
    if book in bible_data and chapter in bible_data[book] and int(verse) - 1 < len(bible_data[book][chapter]):
        return JSONResponse(content={"book": book, "chapter": chapter, "verse": bible_data[book][chapter][int(verse) - 1]})
    return JSONResponse(content={"error": "Versículo não encontrado"}, status_code=404)
