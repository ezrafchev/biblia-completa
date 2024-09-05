
# Bíblia Completa

Este projeto é uma aplicação web interativa que oferece uma experiência completa de leitura da Bíblia, incluindo funcionalidades como versículos diários, comentários dinâmicos e integração com um modelo de IA para insights adicionais.

## Funcionalidades

- **Exibição de capítulos e versículos da Bíblia**: Permite que os usuários naveguem por livros, capítulos e versículos da Bíblia.
- **Versículo diário**: Apresenta automaticamente um versículo da Bíblia por dia.
- **Busca avançada**: Funcionalidade para buscar capítulos e versículos específicos.
- **Comentário Dinâmico com IA**: Integração com um modelo de IA hospedado no Hugging Face para gerar comentários dinâmicos e insights sobre os versículos exibidos.

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: FastAPI
- **IA**: Modelo GPT-2 da Hugging Face
- **Hospedagem**: GitHub Pages

## Instalação e Configuração

1. Clone o repositório:
    ```bash
    git clone https://github.com/ezrafchev/biblia-completa.git
    cd biblia-completa
    ```

2. Instale as dependências:
    ```bash
    pip install fastapi uvicorn requests
    ```

3. Execute a aplicação:
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```

4. Acesse a aplicação em `http://localhost:8000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT.
