document.addEventListener("DOMContentLoaded", function(){
    const addItem = document.getElementById("addNovoItem");
    const botaoAdd = document.querySelector(".botao-adicionar");
    const lista = document.getElementById("lista"); 

    botaoAdd.addEventListener('click', function(){
        novoItem();
    });

    function novoItem(){
        const textoTarefa = addItem.value.trim();

        if(textoTarefa === ""){
            alert("Insira uma atividade!");
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
    }

    function confirmarExclusao(callback, botao) {
        const confirmacao = confirm("Tem certeza que deseja excluir esta tarefa?");
        
        if (confirmacao) {
            callback(botao);
        }
    }


    function removerItem(botao) {
        const itemLista = botao.parentNode;
        lista.removeChild(itemLista);
    }
})