
document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar o versículo diário
    function fetchVersiculoDiario() {
        fetch('/versiculo-diario')
            .then(response => response.json())
            .then(data => {
                document.getElementById('versiculo').innerText = data.versiculo;
            })
            .catch(error => console.error('Erro ao buscar o versículo diário:', error));
    }

    // Função para buscar versículos
    function buscarVersiculos() {
        const query = document.getElementById('busca-input').value;
        fetch(`/buscar?query=${query}`)
            .then(response => response.json())
            .then(data => {
                const resultadosDiv = document.getElementById('resultados');
                resultadosDiv.innerHTML = '';
                data.resultados.forEach(versiculo => {
                    const p = document.createElement('p');
                    p.innerText = versiculo;
                    resultadosDiv.appendChild(p);
                });
            })
            .catch(error => console.error('Erro ao buscar versículos:', error));
    }

    // Adicionar evento ao botão de busca
    document.getElementById('busca-button').addEventListener('click', buscarVersiculos);

    // Buscar o versículo diário ao carregar a página
    fetchVersiculoDiario();
});
