let pessoas = []

function Pessoa(nome) {
    if(!nome) { 
        console.log('Digite um nome')
        return null
    }
    const pessoa ={
        id: Date.now(),
        nome: nome
    }

    pessoas.push(pessoa)
    console.log('Pessoa adicionada: ', pessoa)
    return pessoa
}

function listarPessoas(){
    // não logar o array todo em produção; aqui é útil para depuração
    console.log('A lista de pessoas possui:', pessoas.length, 'item(s)')
    return pessoas
}
function buscarPessoa(id){
    const pessoa = pessoas.find(p => p.id === id)
    if (pessoa){
        console.log('Pessoa encontrada: ', pessoa)
    } else {
        console.log('Pessoa não encontrada')
    }
    return pessoa
}
function atualizarPessoas(id, novoNome){
    const index = pessoas.findIndex(p => p.id === id)
    if (index !== -1){
        if (novoNome) pessoas[index].nome = novoNome
        console.log('Pessoa atualizada: ', pessoas[index])
        return true
    }
    console.log('Pessoa não encontrada para atualização')
    return false
}

function removerPessoa(id){
    const index = pessoas.findIndex( p => p.id === id)
    if (index !== -1){
        const pessoaRemovida = pessoas.splice(index, 1)[0]
        console.log('Pessoa removida: ', pessoaRemovida)
        return true
    }
    console.log('Pessoa não encontrada para remoção')
    return false
}

let editingId = null

function renderPessoas() {
    const lista = document.getElementById('listaItens')
    if (!lista) return
    const arr = listarPessoas() || []
    lista.innerHTML = ''
    if (arr.length === 0) {
        lista.innerHTML = '<div>Nenhuma pessoa cadastrada</div>'
        return
    }

    arr.forEach(p => {
        const row = document.createElement('div')
        row.style.display = 'flex'
        row.style.justifyContent = 'space-between'
        row.style.alignItems = 'center'
        row.style.padding = '6px 0'

        const info = document.createElement('div')
        info.innerHTML = `<span class="nome">${escapeHtml(p.nome)}</span>` + (p.idade ? `<span class="idade"> — ${escapeHtml(String(p.idade))}</span>` : '')

        const actions = document.createElement('div')
        actions.className = 'acoes'

        const btnEdit = document.createElement('button')
        btnEdit.textContent = 'Editar'
        btnEdit.onclick = () => startEdit(p.id)

        const btnDel = document.createElement('button')
        btnDel.textContent = 'Deletar'
        btnDel.onclick = () => {
            if (confirm('Deseja deletar este registro?')) {
                removerPessoa(p.id)
                renderPessoas()
            }
        }

        actions.appendChild(btnEdit)
        actions.appendChild(btnDel)

        row.appendChild(info)
        row.appendChild(actions)
        lista.appendChild(row)
    })
}

function startEdit(id) {
    const p = buscarPessoa(id)
    if (!p) return
    const nomeInput = document.getElementById('nomeItem')
    const idadeInput = document.getElementById('idadeItem')
    if (!nomeInput || !idadeInput) return
    nomeInput.value = p.nome
    idadeInput.value = p.idade || ''
    editingId = id
    const saveBtn = document.getElementById('saveBtn')
    if (saveBtn) saveBtn.textContent = 'Atualizar'
}

function handleSave() {
    const nomeInput = document.getElementById('nomeItem')
    const idadeInput = document.getElementById('idadeItem')
    if (!nomeInput) return
    const nome = nomeInput.value.trim()
    const idadeStr = (idadeInput && idadeInput.value) ? idadeInput.value.trim() : ''
    const idade = idadeStr === '' ? undefined : (isNaN(Number(idadeStr)) ? idadeStr : Number(idadeStr))
    if (!nome) { alert('Por favor digite um nome'); return }

    if (editingId) {
        // mantemos a função existente atualizarPessoas (conceito inalterado)
        atualizarPessoas(editingId, nome)
        editingId = null
        const saveBtn = document.getElementById('saveBtn')
        if (saveBtn) saveBtn.textContent = 'Salvar'
    } else {
        Pessoa(nome, idade)
    }

    // limpar campos e rerender
    nomeInput.value = ''
    if (idadeInput) idadeInput.value = ''
    renderPessoas()
}

// escape simples para inserir texto seguro no innerHTML
function escapeHtml(str) {
    return String(str).replace(/[&<>"'`]/g, function (s) {
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'})[s]
    })
}

// inicializa listener e render quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
    const saveBtn = document.getElementById('saveBtn')
    if (saveBtn) saveBtn.addEventListener('click', handleSave)
    renderPessoas()
})
