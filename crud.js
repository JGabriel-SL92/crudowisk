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
    console.log('A lista de pessoas possui:')
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
        const pessoaRemovida = pessoa.splice(index,1) [0]
        console.log('Pessoa removida: ', pessoaRemovida)
        return true
    }
    console.log('Pessoa não encontrada para remoção')
    return false
}
