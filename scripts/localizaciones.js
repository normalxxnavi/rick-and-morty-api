document.addEventListener('DOMContentLoaded', function () {
    let allLocations = [];

    const promises = [];
    for (let i = 1; i <= 6; i++) { // Cambié el rango a 6 ya que la API tiene menos localizaciones
        const pagePromise = fetch(`https://rickandmortyapi.com/api/location?page=${i}`)
            .then(response => response.json());
        promises.push(pagePromise);
    }

    Promise.all(promises)
        .then(dataArray => {
            allLocations = dataArray.reduce((acc, data) => acc.concat(data.results), []);

            const randomEightLocations = getRandomLocations(allLocations, 18);
            displayLocations(randomEightLocations);
        })
        .catch(error => console.error('Error al obtener datos:', error));

    function getRandomLocations(locations, count) {
        const locationsCopy = [...locations];
        for (let i = locationsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [locationsCopy[i], locationsCopy[j]] = [locationsCopy[j], locationsCopy[i]];
        }
        return locationsCopy.slice(0, count);
    }

    function displayLocations(locations) {
        const mostrarContainer = document.querySelector('.mostrar');
        locations.forEach((location, index) => {
            const locationElement = document.createElement('div');
            locationElement.classList.add('location');
            locationElement.innerHTML = `
                <h3>Id Localización: ${location.id}</h3>
                <h3><span>Nombre:</span> ${location.name}</h3>
                <h3><span>Tipo:</span> ${location.type}</h3>
                <h3><span>Dimensión:</span> ${location.dimension}</h3>
                <h3><span>Residentes:</span> ${location.residents.length}</h3>
            `;
            mostrarContainer.appendChild(locationElement);
        });
    }
});
