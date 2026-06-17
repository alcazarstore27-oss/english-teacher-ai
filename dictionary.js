// Dictionary module

async function validateWord(word) {

  const cleanWord =
    word.trim().toLowerCase();

  try {

    const response =
      await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`
      );

    if (!response.ok) {
      return {
        valid: false
      };
    }

    const data =
      await response.json();

    return {
      valid: true,
      data: data
    };

  } catch (error) {

    console.error(error);

    return {
      valid: false
    };
  }
}
