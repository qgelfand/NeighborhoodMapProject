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
    //called once the map loads, places markers based on data in the model & adds click listener
    initializeMarkers: function(arrayPlaces) {
        //var bounds used to auto-center map to include all markers, source:
        //http://stackoverflow.com/questions/15719951/google-maps-api-v3-auto-center-map-with-multiple-markers
        var bounds = new google.maps.LatLngBounds();
        for (i = 0; i < arrayPlaces.length; i++) {
            var place = arrayPlaces[i];
            var marker = new google.maps.Marker({
                position: place.position,
                title: place.title,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            });
            //adds click listener to each marker, passes marker object to a closure function
            google.maps.event.addListener(marker, 'click', mapFunction.clickedMarker(marker));
            markers.push(marker);
            marker.setMap(map);
            //extend the bounds to include each marker's position
            bounds.extend(marker.position);
        }
        //now fit the map to the newly inclusive bounds
        map.fitBounds(bounds);
        //initialize an info window to be called when a place is selected
        infoWindow = new google.maps.InfoWindow({
            content: ''
        });
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
                markers[i].setAnimation(null);
            }
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            marker.setAnimation(google.maps.Animation.BOUNCE);
            //setTimeout(function(){ marker.setAnimation(null); }, 750)
        };
    },
    //sets info window content to the wikipedia link and opens the info window, attached to the selected marker
    setInfoWindowContent: function(wikiLink) {
        for (i = 0; i < markers.length; i++) {
            if (markers[i].title == articleStr) {
                infoWindow.setContent(wikiLink);
                infoWindow.open(map, markers[i]);
            }
        }
    }
};