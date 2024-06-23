document.addEventListener('DOMContentLoaded', function() {
    const angebotData = JSON.parse(document.getElementById('angebot-data').textContent);
    const markenData = JSON.parse(document.getElementById('marken-data').textContent);
    const isAdmin = JSON.parse(document.getElementById('is-admin').textContent);
    const vermieterData = isAdmin ? JSON.parse(document.getElementById('vermieter-data').textContent) : null;

    new Vue({
        el: '#app',
        data: {
            angebot: angebotData,
            marken: markenData,
            modelle: [],
            vermieter: vermieterData,
            selectedMarke: angebotData.marke
        },
        mounted() {
            this.loadModelle();
        },
        methods: {
            loadModelle() {
                const selectedMarke = this.selectedMarke;
                fetch(`/api/marke/${selectedMarke}/modelle`)
                    .then(response => response.json())
                    .then(data => {
                        this.modelle = data;
                    });
            },
            updateAngebot() {
                fetch(`/angebot/${this.angebot.id}/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'CSRF-Token': window.SAILS_LOCALS._csrf
                    },
                    body: JSON.stringify(this.angebot)
                }).then(response => {
                    if (response.ok) {
                        window.location.href = `/angebot/${this.angebot.id}`;
                    } else {
                        alert('Fehler beim Speichern des Angebots.');
                    }
                });
            }
        }
    });
});
