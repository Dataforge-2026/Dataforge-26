async function carregarAlunos() {
  const resposta = await fetch("/frequencia/alunos");

  const alunos = await resposta.json();

  const lista = document.getElementById("lista-alunos");

  lista.innerHTML = "";

  alunos.forEach((aluno) => {
    lista.innerHTML += `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.matricula}</td>
        <td>${aluno.turma}</td>
        <td>
          <input
            type="checkbox"
            id="presenca-${aluno.id}"
            name="presenca-${aluno.id}"
            class="presenca"
            data-id="${aluno.id}"
            aria-label="Presença de ${aluno.nome}">
        </td>
      </tr>
    `;
  });
}

document.getElementById("salvar").addEventListener("click", async () => {
  const hoje = new Date().toLocaleDateString("pt-BR");

  const checkboxes = document.querySelectorAll(".presenca");

  for (const checkbox of checkboxes) {
    await fetch("/frequencia", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        aluno_id: checkbox.dataset.id,

        data: hoje,

        presente: checkbox.checked ? 1 : 0,
      }),
    });
  }

  alert("Frequência salva com sucesso!");
});

carregarAlunos();

async function carregarFrequencia() {
  const resposta = await fetch("/frequencia");

  const frequencias = await resposta.json();

  const lista = document.getElementById("lista-frequencia");

  lista.innerHTML = "";

  frequencias.forEach((item) => {
    lista.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.matricula}</td>
        <td>${item.turma}</td>
        <td>${item.data}</td>
        <td>${item.presente == 1 ? "Presente" : "Falta"}</td>
      </tr>
    `;
  });
}

carregarFrequencia();
