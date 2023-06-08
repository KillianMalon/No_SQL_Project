$(document).ready(function() {
    // Récupération de la liste des films depuis la base de données
    $.ajax({
        url: '/api/films',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Génération de la liste de films
            for (var i = 0; i < data.length; i++) {
                var film = data[i];
                var html = '<div class="card mb-4">';
                html += '<div class="card-body">';
                html += '<h5 class="card-title">' + film.titre + '</h5>';
                html += '<p class="card-text"><strong>Réalisateur :</strong> ' + film.realisateur + '</p>';
                html += '<a href="details.html?id=' + film._id + '" class="btn btn-primary">Détails</a>';
                html += '</div>';
                html += '</div>';
                $('#liste-films').append(html);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

    // Gestion de la recherche dynamique
    $('form').submit(function(event) {
        event.preventDefault();
        var titre = $('#input-recherche-titre').val();
        var realisateur = $('#input-recherche-realisateur').val();

        $.ajax({
            url: '/api/films',
            type: 'GET',
            dataType: 'json',
            data: {titre: titre, realisateur: realisateur},
            success: function(data) {
                // Suppression de la liste de films actuelle
                $('#liste-films').empty();

                // Génération de la nouvelle liste de films
                for (var i = 0; i < data.length; i++) {
                    var film = data[i];
                    var html = '<div class="card mb-4">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + film.titre + '</h5>';
                    html += '<p class="card-text"><strong>Réalisateur :</strong> ' + film.realisateur + '</p>';
                    html += '<a href="details.html?id=' + film._id + '" class="btn btn-primary">Détails</a>';
                    html += '</div>';
                    html += '</div>';
                    $('#liste-films').append(html);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
});
