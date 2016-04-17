var map = null,
    markers = [],
    infoWindow = null;
var mapFunction = {
    //creates the map and centers on Denver
    initMap: function() {
        var mapDiv = document.getElementById('map');
        map = new google.maps.Map(mapDiv, {
            center: {
                lat: 39.740195,
                lng: -105.009909
            },
            zoom: 11
        });
        //creates a listener that initializes the markers once the map completes loading
        google.maps.event.addDomListener(window, 'load', myViewModel.initialize);
    },
    //added per suggestion from first review: https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282
    googleError: function() {
        alert('Something Done Broke: Failed to get Google Maps.');
    },
    googlePlacesError: function() {
        alert('Something Done Broke: Failed to get Google Places.');
    },
    //called once the map loads, places markers based on data in the model & adds click listener
    initializeMarkers: function(arrayPlaces) {

/*GOOGLE PLACES*/
        //sets up an initial seach to pull museum locations from Google Places
        var request = {
            location: map.getCenter(),
            radius: '1000',
            query: 'Museums'
        };
        //creates a new Google Places search, calls 'callback()' on search completion
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, mapFunction.callback);
/*GOOGLE PLACES*/

/*INFO WINDOW*///initialize an info window to be called when a place is selected
        infoWindow = new google.maps.InfoWindow({
            content: ''
        });
    },
/*INFO WINDOW*/

    callback: function(results, status) {
        //var placeLoc = {};
        var marker = {};
        //if no error with search result,
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // console.log(results[0].geometry.location.lat());
            for (var i = 0; i < results.length; i++) {
                //create new marker using Google Places search result
                marker = new google.maps.Marker({
                    map: map,
                    position: results[i].geometry.location,
                    placeId: results[i].place_id,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    title: results[i].name
                });
                //add click listener to each marker
                google.maps.event.addListener(marker, 'click', mapFunction.clickedMarker(marker));
                markers.push(marker);
                myViewModel.addPlace(marker);
            }
        }
    },

    //filters displayed markers based on filtered list
    updateMarkers: function(arrayPlaces) {
        // mapFunction.hideMarkers();
        infoWindow.close();
        for (i = 0; i < arrayPlaces.length; i++) {
            markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            if (arrayPlaces[i].filterMatch()) {
                markers[i].setMap(map);
            } else markers[i].setMap(null);
        }
    },
    //if a list item is selected, highlight it.
    clickedListItem: function(place) {
        marker = place.title;
        for (i = 0; i < markers.length; i++) {
            if (markers[i].title == marker) {
                markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
                markers[i].setAnimation(google.maps.Animation.BOUNCE);
                //the timeout below doesn't work for some reason!
                //setTimeout(function(){ markers[i].setAnimation(null); }, 750)
            } else {
                markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                markers[i].setAnimation(null);
            }
        }
    },
    //if a marker is clicked, highlight it 
    //found this solution here (andrew_R): https://discussions.udacity.com/t/togglebounce-only-for-operates-for-last-item-in-locations-array/14634/6
    clickedMarker: function(marker) {
        return function() {
            myViewModel.eventClickedMarker(marker);
            for (i = 0; i < markers.length; i++) {
                markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            }
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){ marker.setAnimation(null); }, 712)
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);
        };
    },
    //sets info window content to the wikipedia link and opens the info window, attached to the selected marker
    // setInfoWindowContent: function(wikiLink) {
    //     for (i = 0; i < markers.length; i++) {
    //         if (markers[i].title == articleStr) {
    //             infoWindow.setContent(wikiLink);
    //             infoWindow.open(map, markers[i]);
    //         }
    //     }
    // },
    placeSearch: function(googlePlacesKeyword) {
        // console.log(googlePlacesKeyword);
        for(var i=0; i<markers.length;i++) {
            markers[i].setMap(null);
            if(markers[i].title.toLowerCase().indexOf(googlePlacesKeyword.toLowerCase()) !== -1) {
                // console.log("MATCH: "+ markers[i].title);
                markers[i].setMap(map);
            }
        };

    }
};
