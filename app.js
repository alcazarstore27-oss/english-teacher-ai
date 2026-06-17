function deleteWord(id) {

  const confirmDelete =
    confirm("¿Deseas eliminar esta palabra?");

  if (!confirmDelete) return;

  deleteWordFromStorage(id);

  showPage("words");
}

function showPage(page) {

  const content =
    document.getElementById("content");

  if (page === "words") {

    const words = getWords();

    content.innerHTML = `
      <h2>📚 Mis Palabras</h2>

      <p>
        Total de palabras:
        <strong>${words.length}</strong>
      </p>

      <input
        id="newWord"
        placeholder="Write a word..."
      >

      <button onclick="addWord()">
        Guardar Palabra
      </button>

      <hr>

      <input
        id="searchWord"
        placeholder="Buscar palabra..."
        onkeyup="filterWords()"
      >

      <div id="wordList">
        ${renderWords(words)}
      </div>
    `;
  }

  if (page === "practice") {

    const words = getWords();

    content.innerHTML = `
      <h2>🎯 Práctica con la Profesora</h2>

      <p>
        Palabras disponibles:
        <strong>${words.length}</strong>
      </p>

      <p>
        Próximamente la profesora creará conversaciones usando tu vocabulario.
      </p>
    `;
  }

  if (page === "explanations") {

    content.innerHTML = `
      <h2>👩‍🏫 Explicaciones</h2>

      <textarea
        id="question"
        placeholder="Escribe tu pregunta..."
        rows="5"
      ></textarea>

      <button onclick="showExplanation()">
        Preguntar
      </button>

      <div id="answer"></div>
    `;
  }
}

function renderWords(words) {

  return words.map(w => `
    <div class="word">

      <strong>${w.word}</strong><br>

      ${w.level}<br>

      ✅ ${w.correct}
      &nbsp;&nbsp;
      ❌ ${w.incorrect}

      <br><br>

      <button onclick="deleteWord(${w.id})">
        🗑️ Eliminar
      </button>

    </div>
  `).join("");
}

function filterWords() {

  const search =
    document
      .getElementById("searchWord")
      .value
      .toLowerCase();

  const words = getWords();

  const filtered =
    words.filter(
      w =>
      w.word.toLowerCase().includes(search)
    );

  document.getElementById(
    "wordList"
  ).innerHTML =
    renderWords(filtered);
}

async function addWord() {

  const input =
    document.getElementById("newWord");

  const word =
    input.value.trim();

  if (!word) {

    alert(
      "Debes escribir una palabra."
    );

    return;
  }

  if (wordExists(word)) {

    alert(
      `La palabra "${word}" ya está guardada.`
    );

    return;
  }

  alert("Verificando palabra...");

  const result =
    await validateWord(word);

  if (!result.valid) {

    alert(
      "❌ No encontré esa palabra en el diccionario."
    );

    return;
  }

  addWordToStorage(word);

  alert(
    "✅ Palabra válida y guardada."
  );

  input.value = "";

  showPage("words");
}

function showExplanation() {

  const answer =
    document.getElementById("answer");

  answer.innerHTML = `
    <hr>

    <h3>Respuesta de la Profesora</h3>

    <p>
      Próximamente conectaremos la Profesora IA.
    </p>
  `;
}
