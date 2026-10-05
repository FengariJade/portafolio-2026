export const uuid = () => {
  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    return ([1e7] + "-1e3-4e3-8e3-1e11").replace(/[018]/g, (c) =>
      (
        Number(c) ^
        (window.crypto.getRandomValues(new Uint8Array(1))[0] &
          (15 >> (Number(c) / 4)))
      ).toString(16)
    );
  } else {
    const crypto = require("crypto");
    return ([1e7] + "-1e3-4e3-8e3-1e11").replace(/[018]/g, (c) =>
      (
        Number(c) ^
        (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))
      ).toString(16)
    );
  }
};

export const splitTextIntoChunks = (
  text: string,
  maxChars?: number,
  title: boolean = false
): string[] => {
  let chunks: string[] = [];

  // Dividir el texto en líneas según los saltos de línea existentes
  const lines: string[] = text.split("\n");

  if (maxChars) {
    lines.forEach((line) => {
      const words = line.split(" ");
      if (
        title &&
        lines.length === 1 &&
        words.length === 3 &&
        words.every((w) => w.length <= maxChars / 2)
      ) {
        chunks.push(words[0]); // Primera palabra en una línea
        chunks.push(words.slice(1).join(" ")); // Las dos restantes en otra línea
      } else {
        // Lógica original para dividir en chunks
        let currentChunk = "";

        words.forEach((word) => {
          if (currentChunk.length + word.length + 1 > maxChars) {
            chunks.push(currentChunk.trim());
            currentChunk = "";
          }

          currentChunk += word + " ";
        });

        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
      }
    });
  } else {
    chunks = lines;
  }
  return chunks.filter((line) => line.length != 0);
};

export const esPar = (numero: number) => {
  return numero % 2 === 0;
};

export const separateText = (text: string, chars: string[]) => {
  const newText = String(text).toLowerCase();

  // Escapa cada carácter del array y crea un patrón regex
  const escapedChars = chars.map((char) =>
    char.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  );
  // Une los caracteres escapados en un patrón alternativo
  const regexPattern = `(${escapedChars.join("|")})`;

  // Regex para dividir el texto por cualquier carácter dado en el array, incluyendo los caracteres en el resultado
  return newText
    .split(new RegExp(regexPattern, "gi"))
    .filter((segment) => segment !== "");
};

/**
 * Divide un array en lotes de tamaño especificado.
 * @param {Array} array - El array que deseas dividir en lotes.
 * @param {number} batchSize - El tamaño de cada lote.
 * @returns {Array<Array>} Un array de lotes.
 */
export const batch = (array: any[], size: number) => {
  if (size <= 0) {
    throw new RangeError("El tamaño del lote debe ser un número mayor que 0.");
  }

  const batches = [];
  for (let i = 0; i < array.length; i += size) {
    batches.push(array.slice(i, i + size));
  }
  return batches;
};
