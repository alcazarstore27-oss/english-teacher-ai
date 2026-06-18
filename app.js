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

  const question =
    generatePracticeQuestion();

  content.innerHTML = `
    <h2>🎯 Práctica con la Profesora</h2>

    <div class="word">

      <h3>English</h3>

      <p>
        ${question.english}
      </p>

      <h3>Español</h3>

      <p>
        ${question.spanish}
      </p>

    </div>

    <textarea
      id="practiceAnswer"
      rows="5"
      placeholder="Write your answer in English..."
    ></textarea>

    <button onclick="checkPractice()">
      Enviar Respuesta
    </button>

    <button onclick="showPage('practice')">
      Nueva Pregunta
    </button>

    <div id="practiceResult"></div>
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
function checkPractice() {

  const answer =
    document
      .getElementById("practiceAnswer")
      .value
      .trim();

  const result =
    document.getElementById(
      "practiceResult"
    );

  if (!answer) {

    result.innerHTML = `
      <div class="word">
        Escribe una respuesta primero.
      </div>
    `;

    return;
  }

  result.innerHTML = `
    <div class="word">

      <h3>Tu respuesta</h3>

      <p>${answer}</p>

      <p>
      ✅ Muy bien Daniel.
      </p>

      <p>
      Más adelante la profesora revisará gramática, vocabulario y errores.
      </p>

    </div>
  `;
}
