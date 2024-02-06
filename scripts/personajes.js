document.addEventListener('DOMContentLoaded', function () {
    let allCharacters = [];

    const promises = [];
    for (let i = 1; i <= 42; i++) {
        const pagePromise = fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
            .then(response => response.json());
        promises.push(pagePromise);
    }

    Promise.all(promises)
        .then(dataArray => {
            allCharacters = dataArray.reduce((acc, data) => acc.concat(data.results), []);

            const randomEightCharacters = getRandomCharacters(allCharacters, 9);
            displayCharacters(randomEightCharacters);
        })
        .catch(error => console.error('Error al obtener datos:', error));

    function getRandomCharacters(characters, count) {
        const charactersCopy = [...characters];
        for (let i = charactersCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [charactersCopy[i], charactersCopy[j]] = [charactersCopy[j], charactersCopy[i]];
        }
        return charactersCopy.slice(0, count);
    }

    function displayCharacters(characters) {
        const mostrarContainer = document.querySelector('.mostrar');
        characters.forEach((character, index) => {
            const characterElement = document.createElement('div');
            characterElement.classList.add('character');
            characterElement.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h3>Id Personaje: ${character.id}</h3>
                <h3><span>Nombre:</span> ${character.name}</h3>
                <h3><span>Especie:</span> ${character.species}</h3>
                <h3><span>Estado:</span> ${character.status}</h3>
                <h3><span>Origen:</span> ${character.origin.name}</h3>
            `;
            mostrarContainer.appendChild(characterElement);
        });
    }
});
