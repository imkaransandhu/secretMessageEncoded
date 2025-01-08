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
    document.getElementById("secret-error").innerHTML =
      "<h2>Error! Unable to fetch co-ordinates from URL because of CORS.</h2>" +
      "<p>You can use this link to enable CORS: <a href='https://mybrowseraddon.com/access-control-allow-origin.html' target='_blank' class='info-link'>Access Control Allow Origin</a></p>" +
      "<p>But the below secret message is created through the existing co-ordinates and character provided in the code.</p>";

    let coordinates = finalTestCoordinates; // getting the ore definded coordinates.
    coordinates.shift(); // removing first element i.e. the heading from the table x-coordinate, Character and y-coordinate
    coordinates = reverseCoordinatesVertically(coordinates); // Reverse the y-coordinates vertically
    drawTextFromCoordinates(coordinates);
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

const finalTestCoordinates = [
  {
    x: 93,
    y: 5,
    character: "░",
  },
  {
    x: 2,
    y: 5,
    character: "░",
  },
  {
    x: 8,
    y: 0,
    character: "░",
  },
  {
    x: 39,
    y: 1,
    character: "█",
  },
  {
    x: 64,
    y: 0,
    character: "░",
  },
  {
    x: 63,
    y: 1,
    character: "█",
  },
  {
    x: 84,
    y: 3,
    character: "█",
  },
  {
    x: 9,
    y: 4,
    character: "█",
  },
  {
    x: 55,
    y: 1,
    character: "█",
  },
  {
    x: 23,
    y: 4,
    character: "█",
  },
  {
    x: 91,
    y: 5,
    character: "█",
  },
  {
    x: 21,
    y: 5,
    character: "█",
  },
  {
    x: 79,
    y: 1,
    character: "░",
  },
  {
    x: 65,
    y: 1,
    character: "░",
  },
  {
    x: 52,
    y: 5,
    character: "█",
  },
  {
    x: 49,
    y: 5,
    character: "░",
  },
  {
    x: 24,
    y: 1,
    character: "░",
  },
  {
    x: 42,
    y: 5,
    character: "░",
  },
  {
    x: 6,
    y: 3,
    character: "█",
  },
  {
    x: 24,
    y: 2,
    character: "░",
  },
  {
    x: 0,
    y: 4,
    character: "█",
  },
  {
    x: 65,
    y: 3,
    character: "█",
  },
  {
    x: 74,
    y: 5,
    character: "░",
  },
  {
    x: 36,
    y: 6,
    character: "░",
  },
  {
    x: 22,
    y: 1,
    character: "█",
  },
  {
    x: 62,
    y: 3,
    character: "░",
  },
  {
    x: 24,
    y: 5,
    character: "░",
  },
  {
    x: 58,
    y: 5,
    character: "█",
  },
  {
    x: 35,
    y: 6,
    character: "█",
  },
  {
    x: 55,
    y: 3,
    character: "░",
  },
  {
    x: 20,
    y: 0,
    character: "█",
  },
  {
    x: 88,
    y: 3,
    character: "█",
  },
  {
    x: 46,
    y: 6,
    character: "█",
  },
  {
    x: 8,
    y: 5,
    character: "█",
  },
  {
    x: 13,
    y: 1,
    character: "█",
  },
  {
    x: 76,
    y: 4,
    character: "█",
  },
  {
    x: 54,
    y: 1,
    character: "█",
  },
  {
    x: 2,
    y: 0,
    character: "█",
  },
  {
    x: 91,
    y: 4,
    character: "█",
  },
  {
    x: 34,
    y: 6,
    character: "█",
  },
  {
    x: 80,
    y: 0,
    character: "█",
  },
  {
    x: 12,
    y: 5,
    character: "█",
  },
  {
    x: 14,
    y: 3,
    character: "░",
  },
  {
    x: 1,
    y: 2,
    character: "█",
  },
  {
    x: 67,
    y: 5,
    character: "░",
  },
  {
    x: 93,
    y: 1,
    character: "░",
  },
  {
    x: 48,
    y: 5,
    character: "█",
  },
  {
    x: 79,
    y: 0,
    character: "█",
  },
  {
    x: 13,
    y: 5,
    character: "█",
  },
  {
    x: 39,
    y: 5,
    character: "█",
  },
  {
    x: 48,
    y: 6,
    character: "░",
  },
  {
    x: 12,
    y: 3,
    character: "█",
  },
  {
    x: 92,
    y: 5,
    character: "█",
  },
  {
    x: 52,
    y: 4,
    character: "█",
  },
  {
    x: 55,
    y: 2,
    character: "░",
  },
  {
    x: 61,
    y: 5,
    character: "░",
  },
  {
    x: 66,
    y: 4,
    character: "█",
  },
  {
    x: 7,
    y: 6,
    character: "█",
  },
  {
    x: 83,
    y: 4,
    character: "█",
  },
  {
    x: 33,
    y: 0,
    character: "█",
  },
  {
    x: 85,
    y: 2,
    character: "░",
  },
  {
    x: 56,
    y: 0,
    character: "░",
  },
  {
    x: 32,
    y: 6,
    character: "█",
  },
  {
    x: 72,
    y: 5,
    character: "█",
  },
  {
    x: 23,
    y: 1,
    character: "█",
  },
  {
    x: 40,
    y: 3,
    character: "░",
  },
  {
    x: 1,
    y: 6,
    character: "█",
  },
  {
    x: 28,
    y: 0,
    character: "█",
  },
  {
    x: 61,
    y: 2,
    character: "█",
  },
  {
    x: 19,
    y: 6,
    character: "█",
  },
  {
    x: 63,
    y: 2,
    character: "█",
  },
  {
    x: 41,
    y: 2,
    character: "░",
  },
  {
    x: 77,
    y: 3,
    character: "░",
  },
  {
    x: 57,
    y: 3,
    character: "█",
  },
  {
    x: 26,
    y: 4,
    character: "█",
  },
  {
    x: 38,
    y: 3,
    character: "█",
  },
  {
    x: 74,
    y: 3,
    character: "█",
  },
  {
    x: 84,
    y: 4,
    character: "█",
  },
  {
    x: 19,
    y: 0,
    character: "█",
  },
  {
    x: 9,
    y: 1,
    character: "█",
  },
  {
    x: 39,
    y: 2,
    character: "█",
  },
  {
    x: 1,
    y: 3,
    character: "█",
  },
  {
    x: 60,
    y: 3,
    character: "█",
  },
  {
    x: 28,
    y: 2,
    character: "░",
  },
  {
    x: 26,
    y: 1,
    character: "█",
  },
  {
    x: 14,
    y: 0,
    character: "█",
  },
  {
    x: 23,
    y: 5,
    character: "█",
  },
  {
    x: 30,
    y: 6,
    character: "█",
  },
  {
    x: 18,
    y: 0,
    character: "█",
  },
  {
    x: 53,
    y: 2,
    character: "█",
  },
  {
    x: 17,
    y: 6,
    character: "█",
  },
  {
    x: 4,
    y: 0,
    character: "█",
  },
  {
    x: 78,
    y: 4,
    character: "░",
  },
  {
    x: 29,
    y: 6,
    character: "█",
  },
  {
    x: 0,
    y: 5,
    character: "█",
  },
  {
    x: 22,
    y: 2,
    character: "█",
  },
  {
    x: 59,
    y: 4,
    character: "█",
  },
  {
    x: 85,
    y: 1,
    character: "░",
  },
  {
    x: 2,
    y: 1,
    character: "░",
  },
  {
    x: 77,
    y: 4,
    character: "█",
  },
  {
    x: 53,
    y: 1,
    character: "█",
  },
  {
    x: 67,
    y: 6,
    character: "█",
  },
  {
    x: 81,
    y: 6,
    character: "░",
  },
  {
    x: 47,
    y: 5,
    character: "█",
  },
  {
    x: 22,
    y: 0,
    character: "░",
  },
  {
    x: 5,
    y: 0,
    character: "█",
  },
  {
    x: 76,
    y: 3,
    character: "█",
  },
  {
    x: 43,
    y: 0,
    character: "█",
  },
  {
    x: 8,
    y: 2,
    character: "█",
  },
  {
    x: 1,
    y: 4,
    character: "█",
  },
  {
    x: 60,
    y: 2,
    character: "█",
  },
  {
    x: 32,
    y: 0,
    character: "█",
  },
  {
    x: 27,
    y: 5,
    character: "█",
  },
  {
    x: 15,
    y: 0,
    character: "█",
  },
  {
    x: 0,
    y: 6,
    character: "█",
  },
  {
    x: 41,
    y: 4,
    character: "░",
  },
  {
    x: 85,
    y: 5,
    character: "░",
  },
  {
    x: 84,
    y: 1,
    character: "█",
  },
  {
    x: 41,
    y: 6,
    character: "█",
  },
  {
    x: 62,
    y: 1,
    character: "█",
  },
  {
    x: 63,
    y: 0,
    character: "█",
  },
  {
    x: 92,
    y: 2,
    character: "█",
  },
  {
    x: 84,
    y: 2,
    character: "█",
  },
  {
    x: 42,
    y: 0,
    character: "█",
  },
  {
    x: 77,
    y: 5,
    character: "█",
  },
  {
    x: 43,
    y: 6,
    character: "█",
  },
  {
    x: 66,
    y: 5,
    character: "█",
  },
  {
    x: 15,
    y: 6,
    character: "█",
  },
  {
    x: 28,
    y: 1,
    character: "░",
  },
  {
    x: 91,
    y: 0,
    character: "█",
  },
  {
    x: 54,
    y: 3,
    character: "█",
  },
  {
    x: 71,
    y: 0,
    character: "█",
  },
  {
    x: 2,
    y: 3,
    character: "█",
  },
  {
    x: 29,
    y: 3,
    character: "█",
  },
  {
    x: 73,
    y: 0,
    character: "░",
  },
  {
    x: 84,
    y: 5,
    character: "█",
  },
  {
    x: 83,
    y: 6,
    character: "█",
  },
  {
    x: 6,
    y: 0,
    character: "█",
  },
  {
    x: 8,
    y: 1,
    character: "█",
  },
  {
    x: 26,
    y: 0,
    character: "█",
  },
  {
    x: 93,
    y: 0,
    character: "░",
  },
  {
    x: 47,
    y: 6,
    character: "█",
  },
  {
    x: 3,
    y: 3,
    character: "█",
  },
  {
    x: 47,
    y: 1,
    character: "█",
  },
  {
    x: 84,
    y: 0,
    character: "█",
  },
  {
    x: 87,
    y: 3,
    character: "█",
  },
  {
    x: 41,
    y: 0,
    character: "█",
  },
  {
    x: 16,
    y: 6,
    character: "█",
  },
  {
    x: 41,
    y: 5,
    character: "█",
  },
  {
    x: 86,
    y: 3,
    character: "█",
  },
  {
    x: 4,
    y: 6,
    character: "█",
  },
  {
    x: 61,
    y: 4,
    character: "█",
  },
  {
    x: 8,
    y: 4,
    character: "█",
  },
  {
    x: 62,
    y: 4,
    character: "░",
  },
  {
    x: 57,
    y: 2,
    character: "█",
  },
  {
    x: 60,
    y: 4,
    character: "█",
  },
  {
    x: 40,
    y: 2,
    character: "█",
  },
  {
    x: 31,
    y: 3,
    character: "█",
  },
  {
    x: 76,
    y: 2,
    character: "█",
  },
  {
    x: 27,
    y: 2,
    character: "█",
  },
  {
    x: 40,
    y: 4,
    character: "█",
  },
  {
    x: 70,
    y: 6,
    character: "█",
  },
  {
    x: 41,
    y: 1,
    character: "█",
  },
  {
    x: 71,
    y: 6,
    character: "█",
  },
  {
    x: 68,
    y: 6,
    character: "░",
  },
  {
    x: 53,
    y: 3,
    character: "█",
  },
  {
    x: 45,
    y: 0,
    character: "█",
  },
  {
    x: 78,
    y: 2,
    character: "░",
  },
  {
    x: 10,
    y: 4,
    character: "░",
  },
  {
    x: 23,
    y: 2,
    character: "█",
  },
  {
    x: 48,
    y: 0,
    character: "░",
  },
  {
    x: 48,
    y: 1,
    character: "█",
  },
  {
    x: 12,
    y: 2,
    character: "█",
  },
  {
    x: 14,
    y: 6,
    character: "█",
  },
  {
    x: 54,
    y: 5,
    character: "░",
  },
  {
    x: 73,
    y: 1,
    character: "█",
  },
  {
    x: 14,
    y: 5,
    character: "█",
  },
  {
    x: 40,
    y: 1,
    character: "█",
  },
  {
    x: 65,
    y: 5,
    character: "█",
  },
  {
    x: 66,
    y: 6,
    character: "█",
  },
  {
    x: 70,
    y: 0,
    character: "█",
  },
  {
    x: 38,
    y: 4,
    character: "█",
  },
  {
    x: 26,
    y: 5,
    character: "█",
  },
  {
    x: 26,
    y: 6,
    character: "█",
  },
  {
    x: 53,
    y: 6,
    character: "░",
  },
  {
    x: 10,
    y: 5,
    character: "░",
  },
  {
    x: 46,
    y: 0,
    character: "█",
  },
  {
    x: 90,
    y: 3,
    character: "█",
  },
  {
    x: 51,
    y: 5,
    character: "█",
  },
  {
    x: 1,
    y: 5,
    character: "█",
  },
  {
    x: 8,
    y: 3,
    character: "░",
  },
  {
    x: 73,
    y: 4,
    character: "█",
  },
  {
    x: 52,
    y: 6,
    character: "█",
  },
  {
    x: 85,
    y: 3,
    character: "█",
  },
  {
    x: 72,
    y: 1,
    character: "█",
  },
  {
    x: 64,
    y: 2,
    character: "█",
  },
  {
    x: 47,
    y: 0,
    character: "█",
  },
  {
    x: 8,
    y: 6,
    character: "░",
  },
  {
    x: 74,
    y: 1,
    character: "░",
  },
  {
    x: 31,
    y: 0,
    character: "█",
  },
  {
    x: 9,
    y: 2,
    character: "█",
  },
  {
    x: 9,
    y: 5,
    character: "█",
  },
  {
    x: 72,
    y: 6,
    character: "█",
  },
  {
    x: 78,
    y: 5,
    character: "█",
  },
  {
    x: 57,
    y: 1,
    character: "░",
  },
  {
    x: 12,
    y: 1,
    character: "█",
  },
  {
    x: 58,
    y: 4,
    character: "█",
  },
  {
    x: 92,
    y: 3,
    character: "█",
  },
  {
    x: 10,
    y: 2,
    character: "░",
  },
  {
    x: 58,
    y: 3,
    character: "█",
  },
  {
    x: 32,
    y: 3,
    character: "█",
  },
  {
    x: 83,
    y: 1,
    character: "█",
  },
  {
    x: 79,
    y: 5,
    character: "░",
  },
  {
    x: 64,
    y: 4,
    character: "█",
  },
  {
    x: 21,
    y: 6,
    character: "█",
  },
  {
    x: 5,
    y: 6,
    character: "█",
  },
  {
    x: 3,
    y: 6,
    character: "█",
  },
  {
    x: 24,
    y: 3,
    character: "░",
  },
  {
    x: 2,
    y: 2,
    character: "░",
  },
  {
    x: 77,
    y: 2,
    character: "█",
  },
  {
    x: 78,
    y: 6,
    character: "█",
  },
  {
    x: 34,
    y: 0,
    character: "█",
  },
  {
    x: 28,
    y: 3,
    character: "█",
  },
  {
    x: 27,
    y: 6,
    character: "█",
  },
  {
    x: 56,
    y: 2,
    character: "█",
  },
  {
    x: 22,
    y: 5,
    character: "█",
  },
  {
    x: 14,
    y: 4,
    character: "░",
  },
  {
    x: 93,
    y: 3,
    character: "░",
  },
  {
    x: 30,
    y: 3,
    character: "█",
  },
  {
    x: 7,
    y: 3,
    character: "█",
  },
  {
    x: 49,
    y: 1,
    character: "░",
  },
  {
    x: 18,
    y: 6,
    character: "█",
  },
  {
    x: 27,
    y: 0,
    character: "█",
  },
  {
    x: 15,
    y: 1,
    character: "░",
  },
  {
    x: 67,
    y: 4,
    character: "░",
  },
  {
    x: 85,
    y: 4,
    character: "░",
  },
  {
    x: 66,
    y: 3,
    character: "░",
  },
  {
    x: 73,
    y: 6,
    character: "░",
  },
  {
    x: 35,
    y: 0,
    character: "█",
  },
  {
    x: 60,
    y: 5,
    character: "█",
  },
  {
    x: 72,
    y: 0,
    character: "█",
  },
  {
    x: 73,
    y: 5,
    character: "█",
  },
  {
    x: 91,
    y: 3,
    character: "█",
  },
  {
    x: 36,
    y: 0,
    character: "░",
  },
  {
    x: 91,
    y: 2,
    character: "█",
  },
  {
    x: 64,
    y: 1,
    character: "█",
  },
  {
    x: 24,
    y: 4,
    character: "░",
  },
  {
    x: 74,
    y: 4,
    character: "█",
  },
  {
    x: 53,
    y: 5,
    character: "█",
  },
  {
    x: 56,
    y: 1,
    character: "█",
  },
  {
    x: 59,
    y: 5,
    character: "█",
  },
  {
    x: 80,
    y: 6,
    character: "█",
  },
  {
    x: 62,
    y: 2,
    character: "░",
  },
  {
    x: 30,
    y: 0,
    character: "█",
  },
  {
    x: 85,
    y: 6,
    character: "░",
  },
  {
    x: 21,
    y: 1,
    character: "█",
  },
  {
    x: 44,
    y: 0,
    character: "█",
  },
  {
    x: 75,
    y: 4,
    character: "░",
  },
  {
    x: 91,
    y: 1,
    character: "█",
  },
  {
    x: 44,
    y: 6,
    character: "█",
  },
  {
    x: 83,
    y: 5,
    character: "█",
  },
  {
    x: 12,
    y: 4,
    character: "█",
  },
  {
    x: 51,
    y: 6,
    character: "█",
  },
  {
    x: 17,
    y: 0,
    character: "█",
  },
  {
    x: 65,
    y: 2,
    character: "░",
  },
  {
    x: 54,
    y: 0,
    character: "█",
  },
  {
    x: 45,
    y: 6,
    character: "█",
  },
  {
    x: 0,
    y: 1,
    character: "█",
  },
  {
    x: 38,
    y: 2,
    character: "█",
  },
  {
    x: 13,
    y: 3,
    character: "█",
  },
  {
    x: 91,
    y: 6,
    character: "█",
  },
  {
    x: 0,
    y: 2,
    character: "█",
  },
  {
    x: 92,
    y: 6,
    character: "█",
  },
  {
    x: 92,
    y: 1,
    character: "█",
  },
  {
    x: 29,
    y: 0,
    character: "█",
  },
  {
    x: 1,
    y: 1,
    character: "█",
  },
  {
    x: 92,
    y: 4,
    character: "█",
  },
  {
    x: 39,
    y: 3,
    character: "█",
  },
  {
    x: 93,
    y: 6,
    character: "░",
  },
  {
    x: 57,
    y: 4,
    character: "█",
  },
  {
    x: 84,
    y: 6,
    character: "█",
  },
  {
    x: 26,
    y: 2,
    character: "█",
  },
  {
    x: 83,
    y: 0,
    character: "█",
  },
  {
    x: 22,
    y: 4,
    character: "█",
  },
  {
    x: 34,
    y: 3,
    character: "░",
  },
  {
    x: 92,
    y: 0,
    character: "█",
  },
  {
    x: 65,
    y: 4,
    character: "█",
  },
  {
    x: 65,
    y: 6,
    character: "█",
  },
  {
    x: 54,
    y: 4,
    character: "░",
  },
  {
    x: 31,
    y: 6,
    character: "█",
  },
  {
    x: 55,
    y: 0,
    character: "█",
  },
  {
    x: 4,
    y: 3,
    character: "█",
  },
  {
    x: 28,
    y: 6,
    character: "█",
  },
  {
    x: 85,
    y: 0,
    character: "░",
  },
  {
    x: 2,
    y: 6,
    character: "█",
  },
  {
    x: 10,
    y: 1,
    character: "░",
  },
  {
    x: 58,
    y: 2,
    character: "░",
  },
  {
    x: 0,
    y: 3,
    character: "█",
  },
  {
    x: 27,
    y: 4,
    character: "█",
  },
  {
    x: 0,
    y: 0,
    character: "█",
  },
  {
    x: 23,
    y: 3,
    character: "█",
  },
  {
    x: 1,
    y: 0,
    character: "█",
  },
  {
    x: 83,
    y: 3,
    character: "█",
  },
  {
    x: 22,
    y: 6,
    character: "░",
  },
  {
    x: 21,
    y: 0,
    character: "█",
  },
  {
    x: 33,
    y: 6,
    character: "█",
  },
  {
    x: 73,
    y: 2,
    character: "█",
  },
  {
    x: 7,
    y: 0,
    character: "█",
  },
  {
    x: 78,
    y: 1,
    character: "█",
  },
  {
    x: 26,
    y: 3,
    character: "█",
  },
  {
    x: 81,
    y: 0,
    character: "░",
  },
  {
    x: 52,
    y: 3,
    character: "█",
  },
  {
    x: 61,
    y: 1,
    character: "█",
  },
  {
    x: 28,
    y: 5,
    character: "░",
  },
  {
    x: 3,
    y: 0,
    character: "█",
  },
  {
    x: 14,
    y: 2,
    character: "░",
  },
  {
    x: 20,
    y: 6,
    character: "█",
  },
  {
    x: 33,
    y: 3,
    character: "█",
  },
  {
    x: 2,
    y: 4,
    character: "░",
  },
  {
    x: 53,
    y: 4,
    character: "█",
  },
  {
    x: 22,
    y: 3,
    character: "█",
  },
  {
    x: 15,
    y: 5,
    character: "░",
  },
  {
    x: 54,
    y: 2,
    character: "█",
  },
  {
    x: 42,
    y: 1,
    character: "░",
  },
  {
    x: 6,
    y: 6,
    character: "█",
  },
  {
    x: 5,
    y: 3,
    character: "█",
  },
  {
    x: 74,
    y: 2,
    character: "█",
  },
  {
    x: 93,
    y: 4,
    character: "░",
  },
  {
    x: 27,
    y: 3,
    character: "█",
  },
  {
    x: 77,
    y: 1,
    character: "█",
  },
  {
    x: 39,
    y: 4,
    character: "█",
  },
  {
    x: 78,
    y: 0,
    character: "█",
  },
  {
    x: 62,
    y: 0,
    character: "█",
  },
  {
    x: 13,
    y: 2,
    character: "█",
  },
  {
    x: 75,
    y: 2,
    character: "░",
  },
  {
    x: 75,
    y: 3,
    character: "█",
  },
  {
    x: 93,
    y: 2,
    character: "░",
  },
  {
    x: 89,
    y: 3,
    character: "█",
  },
  {
    x: 79,
    y: 6,
    character: "█",
  },
  {
    x: 64,
    y: 3,
    character: "█",
  },
  {
    x: 16,
    y: 0,
    character: "█",
  },
  {
    x: 59,
    y: 3,
    character: "░",
  },
  {
    x: 40,
    y: 5,
    character: "█",
  },
  {
    x: 13,
    y: 4,
    character: "█",
  },
  {
    x: 83,
    y: 2,
    character: "█",
  },
  {
    x: 27,
    y: 1,
    character: "█",
  },
  {
    x: 61,
    y: 3,
    character: "█",
  },
  {
    x: 28,
    y: 4,
    character: "░",
  },
  {
    x: 14,
    y: 1,
    character: "█",
  },
  {
    x: 42,
    y: 6,
    character: "█",
  },
];
