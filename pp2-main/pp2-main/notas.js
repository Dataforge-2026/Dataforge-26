async function carregarAlunos() {
  const resposta = await fetch("/alunos");

  const alunos = await resposta.json();

  const lista = document.getElementById("lista-alunos");

  lista.innerHTML = "";

  alunos.forEach((aluno) => {
    lista.innerHTML += `
      <tr>
        <td>${aluno.nome}</td>

        <td>${aluno.matricula}</td>

        <td>
          <label for="disciplina-${aluno.id}">
            Disciplina de ${aluno.nome}
          </label>

          <input
            type="text"
            id="disciplina-${aluno.id}"
            name="disciplina-${aluno.id}"
            class="disciplina"
            placeholder="Disciplina"
          >
        </td>

        <td>
          <label for="nota-${aluno.id}">
            Nota de ${aluno.nome}
          </label>

          <input
            type="number"
            id="nota-${aluno.id}"
            name="nota-${aluno.id}"
            class="nota"
            min="0"
            max="10"
            step="0.1"
            data-id="${aluno.id}"
            aria-label="Nota de ${aluno.nome}"
          >
        </td>
      </tr>
    `;
  });
}

document.getElementById("salvar").addEventListener("click", async () => {
  const linhas = document.querySelectorAll("#lista-alunos tr");

  for (const linha of linhas) {
    const disciplina = linha.querySelector(".disciplina").value;
    const nota = linha.querySelector(".nota").value;
    const aluno_id = linha.querySelector(".nota").dataset.id;

    if (disciplina !== "" && nota !== "") {
      await fetch("/notas", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          aluno_id,
          disciplina,
          nota,
        }),
      });
    }
  }

  alert("Notas salvas com sucesso!");
});

carregarAlunos();
