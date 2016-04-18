var myViewModel = {
    //search bar contents
    keyword: ko.observable(''),
    googlePlaceKeyword: ko.observable(''),
    noMatch: ko.observable(false),
    wikiLink: ko.observable(''),
    aPlaces: ko.observableArray([]),
    
    //called on map load, calls initial load of markers
    initialize: function() {
        mapFunction.initializeMarkers(myViewModel.aPlaces());
    },

    //once markers are created, adds a "place" object to the Model
    addPlace: function(marker) {
        var newPlace = {
            title: marker.title,
            position: marker.position,
            placeId: marker.placeID,
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        };
        myViewModel.aPlaces.push(newPlace);
    },

    //highlights the list item and the marker associated with it
    selectPlace: function(place) {
        for (i = 0; i < myViewModel.aPlaces().length; i++) {
            myViewModel.aPlaces()[i].selected(false);
        }
        place.selected(true);
        //console.log(place.title);
        myViewModel.loadWikiArticle(place.title);
        mapFunction.clickedListItem(place);
    },

    //takes the clicked marker and selects the list item (by calling selectPlace(marker))
    eventClickedMarker: function(marker) {
        for (i = 0; i < myViewModel.aPlaces().length; i++) {
            if (myViewModel.aPlaces()[i].title.indexOf(marker.title) !== -1) {
                myViewModel.selectPlace(myViewModel.aPlaces()[i]);
            }
        }
    },

    //makes ajax request to list relevant wikipedia articles based on selected place
    loadWikiArticle: function(selection) {
        myViewModel.wikiLink('Searching...');
        var wikiRequestTimeout = setTimeout(function() {
            myViewModel.wikiLink('No Wikipedia results for this place.');
        }, 4000);

        //AJAX request to MediaWiki
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + selection + '&format=json&callback=wikiCallback',
            dataType: 'jsonp',
            success: function(response) {
                var articleList = response[1];
                articleStr = articleList[0];
                if(articleStr) {
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    myViewModel.wikiLink('<a href="' + url + '" target="_blank">' + articleStr + '</a>');
                    mapFunction.setInfoWindowContent(response[1], 'Wikipedia Link: ' + myViewModel.wikiLink());
                    clearTimeout(wikiRequestTimeout);
                }
            },
        });
    },

    //sends keyword to the placeSearch() function
    googlePlaceSearch: function() {
        // console.log('Place Search Triggered');
        mapFunction.placeSearch(myViewModel.googlePlaceKeyword());
    }
};

