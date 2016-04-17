var myViewModel = {
    //search bar contents
    keyword: ko.observable(''),
    googlePlaceKeyword: ko.observable(''),
    noMatch: ko.observable(false),
    wikiLink: ko.observable(''),
    //array that has all locations/markers
    arrayPlaces: ko.observableArray([{
            position: {
                lat: 39.720975,
                lng: -104.895767
            },
            title: 'Wings Over the Rockies Air and Space Museum',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }, {
            position: {
                lat: 39.735664,
                lng: -104.986706
            },
            title: 'History Colorado Center',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }, {
            position: {
                lat: 39.648916,
                lng: -105.194102
            },
            title: 'Morrison Natural History Museum',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }, {
            position: {
                lat: 39.747526,
                lng: -104.942809
            },
            title: 'Denver Museum of Nature and Science',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }, {
            position: {
                lat: 39.731732,
                lng: -104.961974
            },
            title: 'Denver Botanic Gardens',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }, {
            position: {
                lat: 39.749250,
                lng: -104.950611
            },
            title: 'Denver Zoo',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }, {
            position: {
                lat: 39.737491,
                lng: -104.980738
            },
            title: 'Molly Brown House Museum',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }, {
            position: {
                lat: 39.771703,
                lng: -105.193214
            },
            title: 'Colorado Railroad Museum',
            filterMatch: ko.observable(true),
            selected: ko.observable(false)
        }

    ]),
    //called on map load, calls initial load of markers
    initialize: function() {
        mapFunction.initializeMarkers(myViewModel.arrayPlaces());
    },
    //called whenever the search bar is changed
    filterMarkers: function() {
        myViewModel.wikiLink('');
        myViewModel.noMatch(true);
        for (i = 0; i < myViewModel.arrayPlaces().length; i++) {
            //deselect and defilter the results
            myViewModel.arrayPlaces()[i].filterMatch(false);
            myViewModel.arrayPlaces()[i].selected(false);
            //if the title of the current places object contains the keyword
            if (myViewModel.arrayPlaces()[i].title.toLowerCase().indexOf(myViewModel.keyword().toLowerCase()) !== -1) {
                myViewModel.arrayPlaces()[i].filterMatch(true);
                myViewModel.noMatch(false);
            }
        }
        mapFunction.updateMarkers(myViewModel.arrayPlaces());
    },
    //highlights the list item and the marker associated with it
    selectPlace: function(place) {
        for (i = 0; i < myViewModel.arrayPlaces().length; i++) {
            myViewModel.arrayPlaces()[i].selected(false);
        }
        place.selected(true);
        myViewModel.loadWikiArticle(place.title);
        mapFunction.clickedListItem(place);
    },
    //takes the clicked marker and selects the list item (by calling selectPlace(marker))
    eventClickedMarker: function(marker) {
        for (i = 0; i < myViewModel.arrayPlaces().length; i++) {
            if (myViewModel.arrayPlaces()[i].title.indexOf(marker.title) !== -1) {
                myViewModel.selectPlace(myViewModel.arrayPlaces()[i]);
            }
        }
    },
    //makes ajax request to list relevant wikipedia articles based on selected list item
    loadWikiArticle: function(selection) {
        var wikiRequestTimeout = setTimeout(function() {
            myViewModel.wikiLink('Failed to get wikipedia resources.');
            alert('Failed to get wikipedia resources.');
        }, 4000);
        //AJAX performed through JQuery, refactored to use KnockoutJS binding for updating DOM
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + selection + '&format=json&callback=wikiCallback',
            dataType: 'jsonp',
            success: function(response) {
                var articleList = response[1];
                articleStr = articleList[0];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                myViewModel.wikiLink('<a href="' + url + '" target="_blank">' + articleStr + '</a>');
                mapFunction.setInfoWindowContent('Wikipedia Link: ' + myViewModel.wikiLink());
                clearTimeout(wikiRequestTimeout);
            },
        });
    },
    googlePlaceSearch: function() {
        // console.log('Place Search Triggered');
        mapFunction.placeSearch(myViewModel.googlePlaceKeyword());
    }
};