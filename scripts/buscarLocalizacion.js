document.addEventListener('DOMContentLoaded', function () {
    const buscarLocalizacionBtn = document.getElementById('numeroLocalizacionBtn');
    const numeroLocalizacionInput = document.getElementById('numeroLocalizacion');

    numeroLocalizacionInput.addEventListener('input', function () {
        if (this.value.length > 3)
            this.value = this.value.slice(0, 3);
    });

    if (!buscarLocalizacionBtn) {
        console.error('No se encontró el botón de buscar localización.');
        return;
    }

    buscarLocalizacionBtn.addEventListener('click', function () {
        const numeroLocalizacionInput = document.getElementById('numeroLocalizacion');
        const mostrarContainer = document.querySelector('.mostrar');
        const numeroLocalizacion = numeroLocalizacionInput.value;

        if (!numeroLocalizacion) {
            alert('Por favor, ingrese un número de localización válido.');
            return;
        }

        const apiUrl = `https://rickandmortyapi.com/api/location/${numeroLocalizacion}`;

        console.log('Realizando solicitud a:', apiUrl);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`No se pudo obtener la localización. Código de error: ${response.status}, el rango es de 1 a 126`);
                }
                return response.json();
            })
            .then(location => {
                console.log('Datos obtenidos:', location);

                if (mostrarContainer) {
                    mostrarContainer.innerHTML = `
                    <h3><span>Nombre:</span> ${location.name}</h3>
                    <h3><span>Tipo:</span> ${location.type}</h3>
                    <h3><span>Dimensión:</span> ${location.dimension}</h3>
                    <h3><span>Residentes:</span> ${location.residents.length}</h3>
                    <h3><span>Creación de la localización:</span> ${location.created}</h3>
                    `;
                } else {
                    console.error('El elemento mostrarContainer es nulo.');
                }
            })
            .catch(error => {
                console.error('Error al buscar localización:', error);
                if (mostrarContainer) {
                    mostrarContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                } else {
                    console.error('El elemento mostrarContainer es nulo.');
                }
            });
    });
});