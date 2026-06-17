function getWords() {
  return JSON.parse(localStorage.getItem("words")) || [];
}

function saveWord(word, translation) {
  const words = getWords();

  words.push({
    id: Date.now(),
    word: word,
    translation: translation,
    level: "🟡 Aprendiendo"
  });

  localStorage.setItem(
    "words",
    JSON.stringify(words)
  );
}

function showPage(page) {

  const content =
    document.getElementById("content");

  if (page === "words") {

    const words = getWords();

    content.innerHTML = `
      <h2>📚 Mis Palabras</h2>

      <input
        id="newWord"
        placeholder="Word in English"
      >

      <input
        id="translation"
        placeholder="Traducción en Español"
      >

      <button onclick="addWord()">
        Guardar Palabra
      </button>

      <hr>

      <h3>Mi Vocabulario</h3>

      ${
        words.map(w => `
          <div class="word">
            <strong>${w.word}</strong><br>
            ${w.translation}<br>
            ${w.level}
          </div>
        `).join("")
      }
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
      Muy pronto la profesora utilizará estas palabras para crear conversaciones.
      </p>
    `;
  }

  if (page === "explanations") {

    content.innerHTML = `
      <h2>👩‍🏫 Explicaciones</h2>

      <textarea
        id="question"
        placeholder="Escribe aquí tu pregunta..."
        rows="5"
        style="width:100%;"
      ></textarea>

      <button onclick="showExplanation()">
        Preguntar
      </button>

      <div id="answer"></div>
    `;
  }
}

function addWord() {

  const word =
    document.getElementById("newWord").value;

  const translation =
    document.getElementById("translation").value;

  if (!word.trim()) {
    alert("Debes escribir una palabra.");
    return;
  }

  saveWord(word, translation);

  showPage("words");
}

function showExplanation() {

  const answer =
    document.getElementById("answer");

  answer.innerHTML = `
    <hr>
    <h3>Respuesta de la Profesora</h3>

    <p>
    Próximamente conectaremos la IA aquí.
    </p>
  `;
}
