function getWords(){
  return JSON.parse(
    localStorage.getItem("words")
  ) || [];
}

function saveWord(word){

  const words = getWords();

  words.push({
    word: word,
    level: 0
  });

  localStorage.setItem(
    "words",
    JSON.stringify(words)
  );
}

function showPage(page){

  const content =
    document.getElementById("content");

  if(page === "words"){

    const words = getWords();

    content.innerHTML = `
      <h2>Mis Palabras</h2>

      <input
        id="newWord"
        placeholder="Write a word..."
      >

      <button onclick="addWord()">
        Guardar
      </button>

      <div id="wordList">
        ${
          words
            .map(
              w =>
              `<div class="word">${w.word}</div>`
            )
            .join("")
        }
      </div>
    `;
  }

  if(page === "practice"){
    content.innerHTML = `
      <h2>Práctica</h2>

      <p>
      Aquí hablaremos con la profesora.
      </p>
    `;
  }

  if(page === "explanations"){
    content.innerHTML = `
      <h2>Explicaciones</h2>

      <p>
      Aquí podrás preguntarle a la profesora.
      </p>
    `;
  }
}

function addWord(){

  const input =
    document.getElementById("newWord");

  if(!input.value.trim()) return;

  saveWord(input.value);

  showPage("words");
}