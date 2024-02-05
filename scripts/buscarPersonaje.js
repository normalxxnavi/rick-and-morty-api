document.addEventListener('DOMContentLoaded', function () {
    const buscarPersonajeBtn = document.getElementById('buscarPersonajeBtn');
    const numeroPersonajeInput = document.getElementById('numeroPersonaje');

    numeroPersonajeInput.addEventListener('input',function(){
        if (this.value.length > 3) 
            this.value = this.value.slice(0,3); 
    });

    if (!buscarPersonajeBtn) {
        console.error('No se encontró el botón de buscar personaje.');
        return;
    }

    buscarPersonajeBtn.addEventListener('click', function () {
        const numeroPersonajeInput = document.getElementById('numeroPersonaje');
        const mostrarContainer = document.querySelector('.mostrar');
        const numeroPersonaje = numeroPersonajeInput.value;

        if (!numeroPersonaje) {
            alert('Por favor, ingrese un número de personaje válido.');
            return;
        }

        const apiUrl = `https://rickandmortyapi.com/api/character/${numeroPersonaje}`;

        console.log('Realizando solicitud a:', apiUrl);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se pudo obtener el personaje. Código de error: ${response.status}, el rango es de 1 a 826`);
                }
                return response.json();
            })
            .then(character => {
                console.log('Datos obtenidos:', character);

                if (mostrarContainer) {
                    mostrarContainer.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <h3><span>Nombre:</span> ${character.name}</h3>
                    <h3><span>Especie:</span> ${character.species}</h3>
                    <h3><span>Estado:</span> ${character.status}</h3>
                    <h3><span>Origen:</span> ${character.origin.name}</h3>
                    <h3><span>Localizacion del personaje:</span> ${character.location.name}</h3>
                    <h3><span>Creacion del personaje:</span> ${character.created}</h3>
                    `;
                } else {
                    console.error('El elemento mostrarContainer es nulo.');
                }
            })
            .catch(error => {
                console.error('Error al buscar personaje:', error);
                if (mostrarContainer) {
                    mostrarContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                } else {
                    console.error('El elemento mostrarContainer es nulo.');
                }
            });
    });
});