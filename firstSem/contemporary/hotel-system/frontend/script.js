document.getElementById('searchForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const location = document.getElementById('location').value;

    try {
        // Make API request to search-microservice
        const searchResponse = await fetch(`http://localhost:3001/api/search?location=${encodeURIComponent(location)}`);
        const searchData = await searchResponse.json();

        // Update #searchResults with the search results
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = '';

        if (searchData && searchData.results) {
            searchData.results.forEach(result => {
                const resultElement = document.createElement('div');
                resultElement.className = 'searchResult';
                resultElement.textContent = result.name;
                searchResultsContainer.appendChild(resultElement);
            });
        }

        // Make API request to apartment-microservice
        const apartmentResponse = await fetch('http://localhost:3002/api/apartments');
        const apartmentData = await apartmentResponse.json();

        // Update #apartmentsWithBookings with apartments and booking information
        const apartmentsWithBookingsContainer = document.getElementById('apartmentsWithBookings');
        apartmentsWithBookingsContainer.innerHTML = '';

        if (apartmentData && apartmentData.apartmentsWithBookings) {
            apartmentData.apartmentsWithBookings.forEach(apartment => {
                const apartmentCard = document.createElement('div');
                apartmentCard.className = 'apartmentCard';

                const heading = document.createElement('h2');
                heading.textContent = apartment.name;
                apartmentCard.appendChild(heading);

                const locationPara = document.createElement('p');
                locationPara.textContent = `Location: ${apartment.location}`;
                apartmentCard.appendChild(locationPara);

                const pricePara = document.createElement('p');
                pricePara.textContent = `Price: ${apartment.price}`;
                apartmentCard.appendChild(pricePara);

                const bookingPara = document.createElement('p');
                bookingPara.textContent = `Booking: ${apartment.booking ? 'Booked' : 'Available'}`;
                apartmentCard.appendChild(bookingPara);

                apartmentsWithBookingsContainer.appendChild(apartmentCard);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
