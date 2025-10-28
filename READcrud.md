documentação crud.js 

Para validar se o nome foi digitado, é usado o if(!nome), se não tiver, ele retorna null.
o id utiliza o Date.now() para gerar um id único.
o pessoas.push(pessoa) armazena a o nome e adiciona ele no array.
a function listarPessoas() retorna o array e lista os nomes.
a função function buscarPessoa() com id dentro, busca uma pessoa específica por seu id e usa o find() para procurá-las.
o p => p.id === id é uma função que compara os id's organizados, se ele não encontra o id, ele não retorna nenhuma pessoa .
o novoNome ,dentro de function atualizarPessoas(), é a variável que armazena e atualiza o noo nome para um id já utilizado.
o findIndex() é usado para localizar a sua posição no array, se ele encontrou index !== -1, então o nome é atualizado para o fornecido, se não ele retorna como falso.
a function removerPessoa(), por meio do id e usando o findIndex, localiza a pessoa e usa o splice(index,1) para removê-lá, sendo o 0 usado para pegar o item removido.