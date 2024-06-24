document.addEventListener('DOMContentLoaded', function() {
    var markeSelect = document.getElementById('marke');
    var modellSelect = document.getElementById('modelle');
    var angebotModellId = '<%= angebot.modelle %>';

    // Fetch and populate the brands (Marken)
    fetch('/api/marken')
        .then(response => response.json())
        .then(marken => {
            markeSelect.innerHTML = '<option value="">Marke auswählen</option>';
            marken.forEach(function(marke) {
                var option = document.createElement('option');
                option.value = marke.id;
                option.textContent = marke.bezeichnung;
                if (angebotModellId && angebotModellId.marke && angebotModellId.marke.id === marke.id) {
                    option.selected = true;
                }
                markeSelect.appendChild(option);
            });

            // Trigger the change event to load models for the initial selected brand
            if (markeSelect.value) {
                markeSelect.dispatchEvent(new Event('change'));
            }
        });

    // Listen for brand (Marke) selection changes
    markeSelect.addEventListener('change', function() {
        var markeId = this.value;
        if (markeId) {
            fetch('/api/modelle?marke=' + markeId)
                .then(response => response.json())
                .then(modelle => {
                    modellSelect.innerHTML = '<option value="">Modell auswählen</option>';
                    modelle.forEach(function(modell) {
                        var option = document.createElement('option');
                        option.value = modell.id;
                        option.textContent = modell.name;
                        if (modell.id === angebotModellId) {
                            option.selected = true;
                        }
                        modellSelect.appendChild(option);
                    });
                });
        } else {
            modellSelect.innerHTML = '<option value="">Modell auswählen</option>';
        }
    });
});
