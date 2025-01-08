async function decodeSecretMessage(url) {
  try {
    // Fetch the content of the Google Doc
    const response = await fetch(url);
    const docText = await response.text();
    // Parse the HTML string into a DOM object
    const parser = new DOMParser();
    const doc = parser.parseFromString(docText, "text/html");

    // Initialize an empty array to store the coordinates and characters
    let coordinates = [];
    getCoordinates(coordinates, doc);

    coordinates.shift(); // removing first element i.e. the heading from the table x-coordinate, Character and y-coordinate
    coordinates = reverseCoordinatesVertically(coordinates); // Reverse the y-coordinates vertically

    drawTextFromCoordinates(coordinates);
  } catch (error) {
    console.error("Error fetching or processing the Google Doc:", error);
  }
}

function getCoordinates(coordinates, doc) {
  // Get all table rows
  const rows = doc.querySelectorAll("tr");

  // Iterate through each row and extract data
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length === 3) {
      // Extract the x, character symbol, and y coordinates
      const x = parseInt(cells[0].textContent.trim());
      const character = cells[1].textContent.trim();
      const y = parseInt(cells[2].textContent.trim());

      // Add the extracted data as an object to the array
      coordinates.push({ x, y, character });
    }
  });
}

function drawTextFromCoordinates(coordinates) {
  // Get the canvas element
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Set font size for drawing the text
  ctx.font = "20px monospace";

  // Loop through the coordinates array and draw the character at each (x, y)
  coordinates.forEach(({ x, y, character }, index) => {
    // Set the drawing position
    ctx.fillText(character, x * 10, y * 20 + 40); // Multiply x and y for spacing and letter alignment.
  });
}

function reverseCoordinatesVertically(coordinates) {
  // Find the maximum y-value (this will be the bottom-most row)
  const maxY = Math.max(...coordinates.map((coord) => coord.y));
  // Reverse the y-coordinates
  return coordinates.map((coord) => ({
    x: coord.x,
    y: maxY - coord.y, // Flip the y-coordinate
    character: coord.character,
  }));
}

// Example usage:
// Call the function with the URL of the Google Doc
const finalTestDocUrl =
  "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub";
const exampleDocUrl =
  "https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub";
decodeSecretMessage(finalTestDocUrl);
