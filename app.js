function getWords() {
  return JSON.parse(localStorage.getItem("words")) || [];
}

function saveWord(word) {

  const words = getWords();

  const normalizedWord =
    word.trim().toLowerCase();

  const exists = words.some(
    w => w.word.toLowerCase() === normalizedWord
  );

  if (exists) {
    alert(
      `La palabra "${normalizedWord}" ya está guardada.`
    );
    return false;
  }

  words.push({
    id: Date.now(),
    word: normalizedWord,
    level: "🟡 Aprendiendo",
    correct: 0,
    incorrect: 0
  });

  localStorage.setItem(
    "words",
    JSON.stringify(words)
  );

  return true;
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
        placeholder="Write a word..."
      >

      <button onclick="addWord()">
        Guardar Palabra
      </button>

      <hr>

      <h3>Mi Vocabulario (${words.length})</h3>

      ${
        words.map(w => `
          <div class="word">
            <strong>${w.word}</strong><br>
            ${w.level}<br>
            ✅ ${w.correct}
            &nbsp;&nbsp;
            ❌ ${w.incorrect}
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
      Palabras guardadas:
      <strong>${words.length}</strong>
      </p>

      <p>
      Próximamente la profesora utilizará estas palabras para conversar contigo.
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

function addWord() {

  const input =
    document.getElementById("newWord");

  const word =
    input.value.trim();

  if (!word) {
    alert("Debes escribir una palabra.");
    return;
  }

  const saved =
    saveWord(word);

  if (saved) {
    input.value = "";
    showPage("words");
  }
}

function showExplanation() {

  const answer =
    document.getElementById("answer");

  answer.innerHTML = `
    <hr>

    <h3>Respuesta de la Profesora</h3>

    <p>
    Próximamente conectaremos la profesora IA aquí.
    </p>
  `;
}
