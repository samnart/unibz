document.addEventListener("DOMContentLoaded", () => {
  const addApartmentForm = document.getElementById("addApartmentForm");
  const searchApartmentsForm = document.getElementById("searchApartmentsForm");
  const searchResultsContainer = document.getElementById("searchResults");

  document.getElementById("addApartmentLink").addEventListener("click", () => {
    toggleFormVisibility(addApartmentForm);
  });

  document
    .getElementById("searchApartmentsLink")
    .addEventListener("click", () => {
      toggleFormVisibility(searchApartmentsForm);
    });

  addApartmentForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;

    try {
      const response = await fetch("http://localhost:3002/api/apartments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location, price }),
      });

      if (response.ok) {
        console.log("Apartment added successfully!");
        // Optionally, update the UI or display a success message.
      } else {
        console.error("Failed to add apartment:", response.statusText);
        // Handle error, display an error message, etc.
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  searchApartmentsForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const searchLocation = document.getElementById("searchLocation").value;
    console.log("Search Location:", searchLocation);

    try {
      const response = await fetch(
        `http://localhost:3001/api/search?location=${searchLocation}`,
      );
      const searchData = await response.json();

      console.log("Search Results:", searchData);
      displaySearchResults(searchData.results);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  function toggleFormVisibility(form) {
    addApartmentForm.classList.add("hidden");
    searchApartmentsForm.classList.add("hidden");
    form.classList.remove("hidden");
  }

  function displaySearchResults(results) {
    // console.log('Received Results:', results);
    searchResultsContainer.innerHTML = "";

    if (results && results.length > 0) {
      // console.log('Results:', results);
      results.forEach((result) => {
        // console.log('Processing Result:', result);
        const resultElement = document.createElement("div");
        resultElement.className = "searchResult";

        appendElement(resultElement, "p", `Name: ${result.name}`);
        appendElement(resultElement, "p", `Location: ${result.location}`);
        appendElement(resultElement, "p", `Price: ${result.price}`);

        const bookButton = createButton("Book Apartment", async () => {
          await bookApartment(result.id);
        });
        resultElement.appendChild(bookButton);

        searchResultsContainer.appendChild(resultElement);
      });
    } else {
      appendElement(searchResultsContainer, "p", "No apartments found.");
    }
  }

  async function bookApartment(apartmentId) {
    try {
      const response = await fetch(
        `http://localhost:3003/api/bookings/${apartmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        console.log("Apartment booked successfully!");
        // Optionally, update the UI or display a success message.
      } else {
        console.error("Failed to book apartment:", response.statusText);
        // Handle error, display an error message, etc.
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Helper function to create a button element with a click event listener
  function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }

  // Helper function to append a child element to a parent element
  function appendElement(parent, elementType, textContent) {
    const element = document.createElement(elementType);
    element.textContent = textContent;
    parent.appendChild(element);
  }
});
