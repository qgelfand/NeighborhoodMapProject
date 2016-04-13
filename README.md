######################################################################################################################################  

    ## P6-1: Neighborhood Map Project - Quin Gelfand ##

      --PROBLEM STATEMENT (From Udacity)--
    "You will develop a single-page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add additional functionality to this application, including: map markers to identify popular locations or places you’d like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. You will then research and implement third-party APIs that provide additional information about each of these locations (such as StreetView images, Wikipedia articles, Yelp reviews, etc)."

      --SOLUTION--
    I decided to create a map of museums around the Denver area. The website behaves like so:
    *Using the Knockout framework, an observable array stores a list of museum locations with lat/long, title, & filter selection parameters. 
    *The locations are displayed on a map thru use of markers via the Google Maps API. 
    *The locations are also displayed in a list to the side/below the map.
    *A search bar at the top takes user input and, with each keyed entry, filters the locations accordingly. The locations not matching the search entry are removed from the map and the list
    *When the user clicks either the marker or list item associated with a museum location, both the marker and list item are highlighted yellow.
    *Also when a selection is made, a link to the wikipedia page for the location is displayed below the location list and in an info window on the map. This is accomplished using the MediaWiki API.
    *This website also is responsive according to screen size of the device used to access it. 


      --RESOURCES--
    A number of resources were used to accomplish this:
    *KnockoutJS --> http://knockoutjs.com/documentation/introduction.html
    *MediaWiki API -->  https://www.mediawiki.org/wiki/API:Main_page
    *Google Map API -->  https://developers.google.com/maps/documentation/javascript/tutorial
    *Auto-centering on multiple markers --> http://stackoverflow.com/questions/15719951/google-maps-api-v3-auto-center-map-with-multiple-markers
    *Closure function to determine which marker was clicked (andrew_R) -->  https://discussions.udacity.com/t/togglebounce-only-for-operates-for-last-item-in-locations-array/14634/6
    *Error Handling for Google Maps load --> https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282

      --INSTRUCTIONS--
    1) Select index.html to start the app
    2) Use search box to filter list items and map markers
    3) Select a list item or map marker to open an info window describing the marker.
    4) Click the hyperlink in the info window or on the side pane to discover more info about the marker



    I hope you enjoy my website!
    Thanks,
    Quin Gelfand

######################################################################################################################################