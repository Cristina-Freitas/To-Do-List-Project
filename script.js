document.addEventListener("DOMContentLoaded", function(){

    let contadorTarefasExcluidas = 0;

    const addItem = document.getElementById("addNovoItem");
    const botaoAdd = document.querySelector(".botao-adicionar");
    const lista = document.getElementById("lista"); 
    const contadorTarefas = document.getElementById("contadorTarefas");

        // Carregar a lista do localStorage ao carregar a página
        carregarListaLocalStorage();

    botaoAdd.addEventListener('click', function(){
        novoItem();
    });

    function novoItem(){
        const textoTarefa = addItem.value.trim();

        if(textoTarefa === ""){
            alert("Insira uma tarefa!");
            return;
        }

        const addNovoItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const spanTexto = document.createElement("span");
        const botaoExcluir = document.createElement("button");
        const imgExcluir = document.createElement("img");    
    
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function(){
            marcarDesmarcarConcluido(this);

        });

        botaoExcluir.addEventListener("click", function(){
            confirmarExclusao(removerItem, this);// função callback removerItem
        });

        imgExcluir.src = 'img/excluir.png';
        imgExcluir.alt = 'Remover';

        spanTexto.textContent = textoTarefa;

        addNovoItem.appendChild(checkbox);
        addNovoItem.appendChild(spanTexto);
        addNovoItem.appendChild(botaoExcluir);
        botaoExcluir.appendChild(imgExcluir);
        lista.appendChild(addNovoItem);

        addItem.value = '';

        // Atualizar o contador de tarefas
        atualizarContador();

       // Salvar a lista no localStorage
        salvarListaLocalStorage();
    }

    function marcarDesmarcarConcluido(checkbox) {
        const itemLista = checkbox.parentNode;
        const spanTexto = itemLista.querySelector('span');

        if (checkbox.checked) {
            // Se o checkbox estiver marcado, aplica o estilo de texto concluído
            spanTexto.style.textDecoration = 'line-through';
        } else {
            // Se o checkbox estiver desmarcado, remove o estilo de texto concluído
            spanTexto.style.textDecoration = 'none';
        }

                // Atualizar o contador de tarefas
                atualizarContador();

                salvarListaLocalStorage();
    }

    function confirmarExclusao(callback, botao) {
        const confirmacao = confirm(" Essa ação é permanente. Tem certeza que deseja excluir esta tarefa?");
        
        if (confirmacao) {
            callback(botao);
            atualizarContador();
            salvarListaLocalStorage();
        }
    }

    function removerItem(botao) {
        const itemLista = botao.parentNode;
        lista.removeChild(itemLista);

        contadorTarefasExcluidas++;
        atualizarContadorExcluidas();
        atualizarContador();
    }

    function atualizarContador() {
        const numeroTarefas = lista.childElementCount;
        contadorTarefas.textContent = `Quantidade de tarefas: ${numeroTarefas}`;
    }

    function atualizarContadorExcluidas() {
        const contadorTarefasExcluidasElemento = document.getElementById('contadorTarefasExcluidas');
        contadorTarefasExcluidasElemento.textContent = `${contadorTarefasExcluidas} Tarefa${contadorTarefasExcluidas !== 1 ? 's' : ''} excluída${contadorTarefasExcluidas !== 1 ? 's' : ''}`;
    }

    function salvarListaLocalStorage() {
        const listaTarefas = Array.from(lista.children).map(item => ({
            texto: item.querySelector('span').textContent,
            concluido: item.querySelector('input').checked
        }));

        localStorage.setItem("tasks", JSON.stringify(listaTarefas));
    }

    function carregarListaLocalStorage() {
        const listaTarefas = localStorage.getItem("tasks");
        if (listaTarefas) {
            const parsedListaTarefas = JSON.parse(listaTarefas);
            parsedListaTarefas.forEach(tarefa => {
                const addNovoItem = document.createElement("li");
                const checkbox = document.createElement("input");
                const spanTexto = document.createElement("span");
                const botaoExcluir = document.createElement("button");
                const imgExcluir = document.createElement("img");
    
                checkbox.type = "checkbox";
                checkbox.checked = tarefa.concluido;
                checkbox.addEventListener("change", function(){
                    marcarDesmarcarConcluido(this);
                });
    
                botaoExcluir.addEventListener("click", function(){
                    confirmarExclusao(removerItem, this);
                });
    
                imgExcluir.src = 'img/excluir.png';
                imgExcluir.alt = 'Remover';
    
                spanTexto.textContent = tarefa.texto;
    
                addNovoItem.appendChild(checkbox);
                addNovoItem.appendChild(spanTexto);
                addNovoItem.appendChild(botaoExcluir);
                botaoExcluir.appendChild(imgExcluir);
                lista.appendChild(addNovoItem);
    
                // Atualiza o contador ao carregar a lista do localStorage
                atualizarContador();
            });
        }
    }
})
