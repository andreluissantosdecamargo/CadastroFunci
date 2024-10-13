const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let id;

// Função para abrir o modal, podendo ser no modo de edição ou inclusão
function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  };

  // Se for para editar, preenche os campos com os dados existentes
  if (edit) {
    sNome.value = itens[index].nome;
    sFuncao.value = itens[index].funcao;
    sSalario.value = itens[index].salario;
    id = itens[index].id;
  } else {
    sNome.value = '';
    sFuncao.value = '';
    sSalario.value = '';
    id = undefined;
  }
}

// Função para inserir um funcionário na tabela HTML
function insertItem(item, index) {
  let tr = document.createElement('tr');

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
  `;
  tbody.appendChild(tr);
}

// Função para carregar os funcionários da API
function loadItens() {
  fetch('http://localhost:3000/funcionarios')
    .then(response => response.json())
    .then(data => {
      itens = data;
      tbody.innerHTML = '';
      itens.forEach((item, index) => {
        insertItem(item, index);
      });
    })
    .catch(error => console.error('Erro ao carregar os funcionários:', error));
}

// Função para editar um funcionário (abre o modal com os dados)
function editItem(index) {
  openModal(true, index);
}

// Função para validar o salário
function isSalarioValido(salario) {
  return !isNaN(salario) && salario > 0;
}

// Função para adicionar ou editar um funcionário
btnSalvar.onclick = e => {
  e.preventDefault();

  // Validação dos campos
  if (sNome.value === '' || sFuncao.value === '' || !isSalarioValido(sSalario.value)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const funcionario = {
    nome: sNome.value,
    funcao: sFuncao.value,
    salario: parseFloat(sSalario.value)
  };

  const method = id !== undefined ? 'PUT' : 'POST';
  const url = id !== undefined ? `http://localhost:3000/funcionarios/${id}` : 'http://localhost:3000/funcionarios';

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(funcionario)
  })
    .then(response => response.json())
    .then(() => {
      loadItens();
      modal.classList.remove('active');
      showAlert(id !== undefined ? 'Funcionário atualizado com sucesso!' : 'Funcionário adicionado com sucesso!');
      id = undefined;
    })
    .catch(error => console.error('Erro ao salvar funcionário:', error));
};

// Função para excluir um funcionário
function deleteItem(index) {
  const id = itens[index].id;

  fetch(`http://localhost:3000/funcionarios/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(() => {
      loadItens();
      showAlert('Funcionário removido com sucesso!');
    })
    .catch(error => console.error('Erro ao excluir funcionário:', error));
}

// Função para mostrar alertas visuais
function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.className = 'alert-box';
  alertBox.innerText = message;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    document.body.removeChild(alertBox);
  }, 3000);
}

// Carrega os itens quando a página é aberta
loadItens();
