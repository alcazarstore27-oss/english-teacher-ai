function getWords() {
  return JSON.parse(
    localStorage.getItem("words")
  ) || [];
}

function saveWords(words) {
  localStorage.setItem(
    "words",
    JSON.stringify(words)
  );
}

function wordExists(word) {

  const words = getWords();

  const normalizedWord =
    word.trim().toLowerCase();

  return words.some(
    w =>
      w.word.toLowerCase() === normalizedWord
  );
}

function addWordToStorage(word) {

  const words = getWords();

  words.push({
    id: Date.now(),
    word: word.trim().toLowerCase(),
    level: "🟡 Aprendiendo",
    correct: 0,
    incorrect: 0,
    mastery: 0
  });

  saveWords(words);
}

function deleteWordFromStorage(id) {

  let words = getWords();

  words = words.filter(
    w => w.id !== id
  );

  saveWords(words);
}
