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
        botaoExcluir.addEventListener("click", function(){
            removerItem(this);
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

    function removerItem(botao) {
        const itemLista = botao.parentNode;
        lista.removeChild(itemLista);
    }
})