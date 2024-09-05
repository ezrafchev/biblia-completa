
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import uvicorn
import requests

app = FastAPI()

# Permitir CORS para todas as origens
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dados da Bíblia (exemplo simplificado)
biblia = {
    "Gênesis": {
        1: ["No princípio, criou Deus os céus e a terra.", "E a terra era sem forma e vazia..."],
        2: ["Assim, pois, foram acabados os céus e a terra, e todo o seu exército.", "E havendo Deus terminado..."]
    },
    "Êxodo": {
        1: ["Estes são os nomes dos filhos de Israel que entraram no Egito...", "E José morreu, e todos os seus irmãos..."],
        2: ["E foi-se um homem da casa de Levi, e casou com uma filha de Levi.", "E a mulher concebeu, e deu à luz um filho..."]
    }
}

@app.get("/versiculo-diario")
def versiculo_diario():
    livro = random.choice(list(biblia.keys()))
    capitulo = random.choice(list(biblia[livro].keys()))
    versiculo = random.choice(biblia[livro][capitulo])
    return JSONResponse(content={"versiculo": versiculo})

@app.get("/buscar")
def buscar(query: str):
    resultados = []
    for livro, capitulos in biblia.items():
        for capitulo, versiculos in capitulos.items():
            for versiculo in versiculos:
                if query.lower() in versiculo.lower():
                    resultados.append(f"{livro} {capitulo}:{versiculo}")
    return JSONResponse(content={"resultados": resultados})

@app.get("/comentario")
def comentario(versiculo: str):
    try:
        response = requests.post(
            "https://api-inference.huggingface.co/models/gpt2",
            headers={"Authorization": "Bearer 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"},
            json={"inputs": versiculo, "parameters": {"max_length": 50}}
        )
        response.raise_for_status()
        comentario = response.json()[0].get("generated_text", "Comentário não disponível.")
        return JSONResponse(content={"comentario": comentario})
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
