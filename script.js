const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

// Função para abrir o modal
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target === modal) {
      modal.classList.remove('active')
    }
  }

  // Se estiver em modo de edição, preenche os campos com os dados do item a ser editado
  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
}

// Função para editar um item
function editItem(index) {
  openModal(true, index)
}

// Função para deletar um item
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
  showAlert('Funcionário removido com sucesso!')
}

// Função para inserir um item na tabela
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

// Função para validar o salário
function isSalarioValido(salario) {
  return !isNaN(salario) && salario > 0
}

// Função para mostrar alertas visuais
function showAlert(message) {
  const alertBox = document.createElement('div')
  alertBox.className = 'alert-box'
  alertBox.innerText = message
  document.body.appendChild(alertBox)

  setTimeout(() => {
    document.body.removeChild(alertBox)
  }, 3000)
}

// Função para salvar (inserir ou editar) os dados no localStorage
btnSalvar.onclick = e => {
  e.preventDefault()

  // Validação dos campos
  if (sNome.value == '' || sFuncao.value == '' || !isSalarioValido(sSalario.value)) {
    alert("Por favor, preencha todos os campos corretamente.")
    return
  }

  // Se estiver em modo de edição, atualiza os dados
  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
    showAlert('Funcionário editado com sucesso!')
  } else {
    // Se não, insere um novo item
    itens.push({
      'nome': sNome.value,
      'funcao': sFuncao.value,
      'salario': sSalario.value
    })
    showAlert('Funcionário adicionado com sucesso!')
  }

  setItensBD() // Atualiza os dados no localStorage
  modal.classList.remove('active') // Fecha o modal
  loadItens() // Recarrega os itens na tabela
  id = undefined // Reseta o ID para futuras inclusões
}

// Função para carregar os itens do localStorage e exibi-los na tabela
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

// Função para obter os itens do localStorage
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

// Função para salvar os itens no localStorage
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// Carrega os itens quando a página é aberta
loadItens()
