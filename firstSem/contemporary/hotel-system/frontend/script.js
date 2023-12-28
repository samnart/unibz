document.addEventListener('DOMContentLoaded', () => {
    const addApartmentForm = document.getElementById('addApartmentForm');
    const searchApartmentsForm = document.getElementById('searchApartmentsForm');
    const searchResultsContainer = document.getElementById('searchResults');

    document.getElementById('addApartmentLink').addEventListener('click', () => {
        toggleFormVisibility(addApartmentForm);
    });

    document.getElementById('searchApartmentsLink').addEventListener('click', () => {
        toggleFormVisibility(searchApartmentsForm);
    });

    addApartmentForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;

        try {
            const response = await fetch('http://localhost:3002/api/apartments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, location, price }),
            });

            if (response.ok) {
                console.log('Apartment added successfully!');
                // Optionally, update the UI or display a success message.
            } else {
                console.error('Failed to add apartment:', response.statusText);
                // Handle error, display an error message, etc.
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    searchApartmentsForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const searchLocation = document.getElementById('searchLocation').value;

        try {
            const response = await fetch(`http://localhost:3001/api/search?location=${searchLocation}`);
            const searchData = await response.json();

            displaySearchResults(searchData.results);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function toggleFormVisibility(form) {
        addApartmentForm.classList.add('hidden');
        searchApartmentsForm.classList.add('hidden');
        form.classList.remove('hidden');
    }

    function displaySearchResults(results) {
        searchResultsContainer.innerHTML = '';

        if (results && results.length > 0) {
            results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.className = 'searchResult';

                appendElement(resultElement, 'p', `Name: ${result.name}`);
                appendElement(resultElement, 'p', `Location: ${result.location}`);
                appendElement(resultElement, 'p', `Price: ${result.price}`);

                const bookButton = createButton('Book Apartment', async () => {
                    await bookApartment(result.id);
                });
                resultElement.appendChild(bookButton);

                searchResultsContainer.appendChild(resultElement);
            });
        } else {
            appendElement(searchResultsContainer, 'p', 'No apartments found.');
        }
    }

    async function bookApartment(apartmentId) {
        try {
            const response = await fetch(`http://localhost:3003/api/bookings/${apartmentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Apartment booked successfully!');
                // Optionally, update the UI or display a success message.
            } else {
                console.error('Failed to book apartment:', response.statusText);
                // Handle error, display an error message, etc.
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Helper function to create a button element with a click event listener
    function createButton(text, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    // Helper function to append a child element to a parent element
    function appendElement(parent, elementType, textContent) {
        const element = document.createElement(elementType);
        element.textContent = textContent;
        parent.appendChild(element);
    }
});
















// document.addEventListener('DOMContentLoaded', function () {
//     const searchForm = document.getElementById('searchForm');
//     const addApartmentForm = document.getElementById('addApartmentForm');
//     const addApartmentLink = document.getElementById('addApartmentLink');
//     const searchApartmentsLink = document.getElementById('searchApartmentsLink');
//     const searchApartmentsForm = document.getElementById('searchApartmentsForm');

//     searchForm.addEventListener('submit', handleSearchFormSubmit);
//     addApartmentForm.addEventListener('submit', handleAddApartmentFormSubmit);
//     addApartmentLink.addEventListener('click', handleLinkClick.bind(null, 'addApartmentForm'));
//     searchApartmentsLink.addEventListener('click', handleLinkClick.bind(null, 'searchApartmentsForm'));
//     searchApartmentsForm.addEventListener('submit', handleSearchApartmentsFormSubmit);

//     async function handleSearchFormSubmit(event) {
//         event.preventDefault();
//         const location = document.getElementById('location').value;

//         try {
//             const searchResponse = await fetch(`http://localhost:3001/api/search?location=${encodeURIComponent(location)}`);
//             const searchData = await searchResponse.json();

//             const searchResultsContainer = document.getElementById('searchResults');
//             searchResultsContainer.innerHTML = '';

//             if (searchData && searchData.results) {
//                 searchData.results.forEach(result => {
//                     const resultElement = document.createElement('div');
//                     resultElement.className = 'searchResult';
//                     resultElement.textContent = result.name;
//                     searchResultsContainer.appendChild(resultElement);
//                 });
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     async function handleAddApartmentFormSubmit(event) {
//         event.preventDefault();
//         const name = document.getElementById('name').value;
//         const location = document.getElementById('location').value;
//         const price = document.getElementById('price').value;

//         try {
//             const response = await fetch('http://localhost:3002/api/apartments', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ name, location, price }),
//             });

//             if (response.ok) {
//                 console.log('Apartment added successfully!');
//             } else {
//                 console.error('Failed to add apartment:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     function handleLinkClick(formId, event) {
//         event.preventDefault();
//         toggleFormVisibility(formId);
//     }

//     async function handleSearchApartmentsFormSubmit(event) {
//         event.preventDefault();
//         const searchLocation = document.getElementById('searchLocation').value;

//         try {
//             const response = await fetch(`http://localhost:3001/api/search?location=${searchLocation}`);
//             const searchData = await response.json();

//             const searchResultsContainer = document.getElementById('searchResults');
//             searchResultsContainer.innerHTML = '';

//             if (searchData && searchData.results) {
//                 searchData.results.forEach(result => {
//                     const resultElement = document.createElement('div');
//                     resultElement.className = 'searchResult';
//                     resultElement.textContent = result.name;
//                     searchResultsContainer.appendChild(resultElement);
//                 });
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     function toggleFormVisibility(formId) {
//         const forms = ['addApartmentForm', 'searchApartmentsForm'];
//         forms.forEach(form => {
//             const element = document.getElementById(form);
//             if (form === formId) {
//                 element.classList.remove('hidden');
//             } else {
//                 element.classList.add('hidden');
//             }
//         });
//     }
// });





















// // document.getElementById('searchForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const location = document.getElementById('location').value;

// //     try {
// //         // Make API request to search-microservice
// //         const searchResponse = await fetch(`http://localhost:3001/api/search?location=${encodeURIComponent(location)}`);
// //         const searchData = await searchResponse.json();

// //         // Update #searchResults with the search results
// //         const searchResultsContainer = document.getElementById('searchResults');
// //         searchResultsContainer.innerHTML = '';

// //         if (searchData && searchData.results) {
// //             searchData.results.forEach(result => {
// //                 const resultElement = document.createElement('div');
// //                 resultElement.className = 'searchResult';
// //                 resultElement.textContent = result.name;
// //                 searchResultsContainer.appendChild(resultElement);
// //             });
// //         }

// //         // Make API request to apartment-microservice
// //         const apartmentResponse = await fetch('http://localhost:3002/api/apartments');
// //         const apartmentData = await apartmentResponse.json();

// //         // Update #apartmentsWithBookings with apartments and booking information
// //         const apartmentsWithBookingsContainer = document.getElementById('apartmentsWithBookings');
// //         apartmentsWithBookingsContainer.innerHTML = '';

// //         if (apartmentData && apartmentData.apartmentsWithBookings) {
// //             apartmentData.apartmentsWithBookings.forEach(apartment => {
// //                 const apartmentCard = document.createElement('div');
// //                 apartmentCard.className = 'apartmentCard';

// //                 const heading = document.createElement('h2');
// //                 heading.textContent = apartment.name;
// //                 apartmentCard.appendChild(heading);

// //                 const locationPara = document.createElement('p');
// //                 locationPara.textContent = `Location: ${apartment.location}`;
// //                 apartmentCard.appendChild(locationPara);

// //                 const pricePara = document.createElement('p');
// //                 pricePara.textContent = `Price: ${apartment.price}`;
// //                 apartmentCard.appendChild(pricePara);

// //                 const bookingPara = document.createElement('p');
// //                 bookingPara.textContent = `Booking: ${apartment.booking ? 'Booked' : 'Available'}`;
// //                 apartmentCard.appendChild(bookingPara);

// //                 apartmentsWithBookingsContainer.appendChild(apartmentCard);
// //             });
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });

// // document.getElementById('addApartmentForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const name = document.getElementById('name').value;
// //     const location = document.getElementById('location').value;
// //     const price = document.getElementById('price').value;

// //     try {
// //         // Make API request to apartment-microservice to add a new apartment
// //         const response = await fetch('http://localhost:3002/api/apartments', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({ name, location, price }),
// //         });

// //         if (response.ok) {
// //             console.log('Apartment added successfully!');
// //             // Optionally, you can update the UI or display a success message.
// //         } else {
// //             console.error('Failed to add apartment:', response.statusText);
// //             // Handle error, display an error message, etc.
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });

// // document.getElementById('addApartmentLink').addEventListener('click', function (event) {
// //     event.preventDefault();
// //     toggleFormVisibility('addApartmentForm');
// // });

// // document.getElementById('searchApartmentsLink').addEventListener('click', function (event) {
// //     event.preventDefault();
// //     toggleFormVisibility('searchApartmentsForm');
// // });

// // document.getElementById('searchApartmentsForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const searchLocation = document.getElementById('searchLocation').value;

// //     try {
// //         // Make API request to search-microservice
// //         const response = await fetch(`http://localhost:3001/api/search?location=${searchLocation}`);
// //         const searchData = await response.json();

// //         // Update #searchResults with the search results
// //         const searchResultsContainer = document.getElementById('searchResults');
// //         searchResultsContainer.innerHTML = '';

// //         if (searchData && searchData.results) {
// //             searchData.results.forEach(result => {
// //                 const resultElement = document.createElement('div');
// //                 resultElement.className = 'searchResult';
// //                 resultElement.textContent = result.name;
// //                 searchResultsContainer.appendChild(resultElement);
// //             });
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });

// // function toggleFormVisibility(formId) {
// //     const forms = ['addApartmentForm', 'searchApartmentsForm'];
// //     forms.forEach(form => {
// //         const element = document.getElementById(form);
// //         if (form === formId) {
// //             element.classList.remove('hidden');
// //         } else {
// //             element.classList.add('hidden');
// //         }
// //     });
// // }







// // document.getElementById('searchForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const location = document.getElementById('location').value;

// //     try {
// //         // Make API request to search-microservice
// //         const searchResponse = await fetch(`http://localhost:3001/api/search?location=${encodeURIComponent(location)}`);
// //         const searchData = await searchResponse.json();

// //         // Update #searchResults with the search results
// //         const searchResultsContainer = document.getElementById('searchResults');
// //         searchResultsContainer.innerHTML = '';

// //         if (searchData && searchData.results) {
// //             searchData.results.forEach(result => {
// //                 const resultElement = document.createElement('div');
// //                 resultElement.className = 'searchResult';
// //                 resultElement.textContent = result.name;
// //                 searchResultsContainer.appendChild(resultElement);
// //             });
// //         }

// //         // Make API request to apartment-microservice
// //         const apartmentResponse = await fetch('http://localhost:3002/api/apartments');
// //         const apartmentData = await apartmentResponse.json();

// //         // Update #apartmentsWithBookings with apartments and booking information
// //         const apartmentsWithBookingsContainer = document.getElementById('apartmentsWithBookings');
// //         apartmentsWithBookingsContainer.innerHTML = '';

// //         if (apartmentData && apartmentData.apartmentsWithBookings) {
// //             apartmentData.apartmentsWithBookings.forEach(apartment => {
// //                 const apartmentCard = document.createElement('div');
// //                 apartmentCard.className = 'apartmentCard';

// //                 const heading = document.createElement('h2');
// //                 heading.textContent = apartment.name;
// //                 apartmentCard.appendChild(heading);

// //                 const locationPara = document.createElement('p');
// //                 locationPara.textContent = `Location: ${apartment.location}`;
// //                 apartmentCard.appendChild(locationPara);

// //                 const pricePara = document.createElement('p');
// //                 pricePara.textContent = `Price: ${apartment.price}`;
// //                 apartmentCard.appendChild(pricePara);

// //                 const bookingPara = document.createElement('p');
// //                 bookingPara.textContent = `Booking: ${apartment.booking ? 'Booked' : 'Available'}`;
// //                 apartmentCard.appendChild(bookingPara);

// //                 apartmentsWithBookingsContainer.appendChild(apartmentCard);
// //             });
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });








// // document.getElementById('addApartmentForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const name = document.getElementById('name').value;
// //     const location = document.getElementById('location').value;
// //     const price = document.getElementById('price').value;

// //     try {
// //         // Make API request to apartment-microservice to add a new apartment
// //         const response = await fetch('http://localhost:3002/api/apartments', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({ name, location, price }),
// //         });

// //         if (response.ok) {
// //             console.log('Apartment added successfully!');
// //             // Optionally, you can update the UI or display a success message.
// //         } else {
// //             console.error('Failed to add apartment:', response.statusText);
// //             // Handle error, display an error message, etc.
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });














// // // ... (your existing code)

// // document.getElementById('addApartmentLink').addEventListener('click', function (event) {
// //     event.preventDefault();
// //     toggleFormVisibility('addApartmentForm');
// // });

// // document.getElementById('searchApartmentsLink').addEventListener('click', function (event) {
// //     event.preventDefault();
// //     toggleFormVisibility('searchApartmentsForm');
// // });

// // document.getElementById('addApartmentForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const name = document.getElementById('name').value;
// //     const location = document.getElementById('location').value;
// //     const price = document.getElementById('price').value;

// //     try {
// //         // Make API request to apartment-microservice to add a new apartment
// //         const response = await fetch('http://localhost:3002/api/apartments', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify({ name, location, price }),
// //         });

// //         if (response.ok) {
// //             console.log('Apartment added successfully!');
// //             // Optionally, you can update the UI or display a success message.
// //         } else {
// //             console.error('Failed to add apartment:', response.statusText);
// //             // Handle error, display an error message, etc.
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });

// // document.getElementById('searchApartmentsForm').addEventListener('submit', async function (event) {
// //     event.preventDefault();

// //     const searchLocation = document.getElementById('searchLocation').value;

// //     try {
// //         // Make API request to search-microservice
// //         const response = await fetch(`http://localhost:3001/api/search?location=${searchLocation}`);
// //         const searchData = await response.json();

// //         // Update #searchResults with the search results
// //         const searchResultsContainer = document.getElementById('searchResults');
// //         searchResultsContainer.innerHTML = '';

// //         if (searchData && searchData.results) {
// //             searchData.results.forEach(result => {
// //                 const resultElement = document.createElement('div');
// //                 resultElement.className = 'searchResult';
// //                 resultElement.textContent = result.name;
// //                 searchResultsContainer.appendChild(resultElement);
// //             });
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });

// // function toggleFormVisibility(formId) {
// //     const forms = ['addApartmentForm', 'searchApartmentsForm'];
// //     forms.forEach(form => {
// //         const element = document.getElementById(form);
// //         if (form === formId) {
// //             element.classList.remove('hidden');
// //         } else {
// //             element.classList.add('hidden');
// //         }
// //     });
// // }
