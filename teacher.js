function generatePracticeQuestion() {

  const words = getWords();

  if (words.length === 0) {

    return {
      english: "Add some words first.",
      spanish: "Primero agrega algunas palabras."
    };
  }

  const randomWord =
    words[Math.floor(Math.random() * words.length)];

  const word = randomWord.word;

  const questions = {

    family: {
      english: "Tell me about your family.",
      spanish: "Háblame de tu familia."
    },

    children: {
      english: "How many children do you have?",
      spanish: "¿Cuántos hijos tienes?"
    },

    church: {
      english: "Tell me about your church.",
      spanish: "Háblame de tu iglesia."
    },

    welcome: {
      english: "When do you say welcome?",
      spanish: "¿Cuándo dices de nada?"
    },

    nice: {
      english: "What is something nice today?",
      spanish: "¿Qué fue algo agradable hoy?"
    }
  };

  return (
    questions[word] || {
      english: `Create a sentence using "${word}".`,
      spanish: `Crea una oración usando "${word}".`
    }
  );
}
