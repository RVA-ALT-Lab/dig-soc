/*CONTENT FETCHING*/
const isHook = data => data.slug == "hook-text";
const isFooter = data => data.slug == "footer";
const isFaculty = data => data.categories[0] == 2;
const isCourse = data => data.categories[0] == 3;
//GET WORDPRESS JSON CONTENT
fetch(
        "https://rampages.us/digitalsocy-pr/wp-json/wp/v2/posts?_embed&per_page=30"
    )
    .then(function(response) {
        // Convert to JSON
        return response.json();
    })
    .then(function(data) {
        var hook = data.filter(isHook);
        var faculty = data.filter(isFaculty);
        var courses = data.filter(isCourse);
        var footer = data.filter(isFooter);
        setContent(hook);
        setCourses(courses);
        setFac(faculty);
        setContent(footer);
    });

function setContent(data) {
    for (i = 0; i < data.length; i++) {
        if (document.getElementById(data[i].slug)) {
            var div = document.getElementById(data[i].slug);
            var content = data[i].content.rendered;
            div.innerHTML = content;
        }
    }
}

//append courses
function setCourses(data) {
    for (i = 0; i < data.length; i++) {
        var node = document.createElement("div");
        var textnode = document.createTextNode(data[i].title.rendered);
        node.appendChild(textnode);
        node.classList.add("course", "course-item");
        var hasCat = data[i].categories;
        if (hasCat.includes(4)) {
            document.getElementById("sem-1").appendChild(node);
        } else if (hasCat.includes(5)) {
            document.getElementById("sem-2").appendChild(node);
        } else if (hasCat.includes(6)) {
            document.getElementById("sem-3").appendChild(node);
        } else {
            document.getElementById("sem-4").appendChild(node);
        }
    }
}

function setFaculty(data) {
    for (i = 0; i < data.length; i++) {
        var node = document.createElement("div");
        var name = document.createTextNode(data[i].title.rendered);
        var title = document.createTextNode(data[i].acf.title);
        node.appendChild(name);
        node.classList.add("faculty", "col-md-3");
        var fac = document.getElementById("faculty").appendChild(node);
        node.appendChild(title);
    }
}

function setFac(data) {
    for (i = 0; i < data.length; i++) {
        var name = data[i].title.rendered;
        var title = data[i].acf.title;
        var img = data[i].acf.headshot_url.url;
        var fac = document.getElementById("faculty");
        fac.insertAdjacentHTML('beforeend', '<div class="col-md-3"><img class="fac-head" src="' + img + '" alt="A photo of ' + name + '."></img><h3>' + name + '</h3>' + title + '</div>');
    }
}

//tie to buttons
function scrollTo(id) {
    document.getElementById(id);
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
    });
}


/*MAP STUFF*/

//get IP to lat/long
fetch("//freegeoip.net/json/"
    ).catch(function() {
        var lat = 37.5538;
        var long = -77.4603;
        mapMaker(lat, long);
        blockContent();
    }).then(function(response) {
        // Convert to JSON
        if(response){
         return response.json();
      }
    }).then(function(data) {
        if (data){
          var location = data;
          var lat = location.latitude;
          var long = location.longitude;
          var city = location.city;
          var state = location.region_code;
          mapMaker(lat, long);
          var geoId = getGeoId(city, state);
          basicName(city,state); //set name of location basics 
      }
    })

//AD BLOCKER on or some other failure . . . 
function blockContent(){
    var blockDiv = document.getElementById('data-map');
    blockDiv.innerHTML = 'You are running an ad blocker or something similar. That is AWESOME! Part of digital sociology is understanding how and to whom your data is shared. Other users will see data contextualized by their geographic area. We are giving you data for Richmond, VA.';
}

//set city demo box 

function basicName(city, state){
  var theCity = document.getElementById('city');
  theCity.innerHTML = city;
  var theState = document.getElementById('state');
  theState.innerHTML = state;

}


//make the leaflet map
function mapMaker(lat, long) {
    var lat = lat;
    var long = long;
    var map = L.map("mapid", { zoomControl: false }).setView([lat, long], 12);
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.dragging.disable();

    L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidHd3b29kd2FyZCIsImEiOiJoamhEM2ZrIn0.VRCAedsVTQ-qdtPz8ue-5w", {
            minZoom: 14,
            maxZoom: 14,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: "mapbox.streets"
        }
    ).addTo(map);
}


var geoId;



/*CENSUS REPORTER FETCHING*/
function getGeoId(city, state) {
    var location = city + '%2C%20' + state;
    var url = 'https://api.censusreporter.org/1.0/geo/search?q=' + location;
    $.getJSON(url, function(data) {
        geoId = data.results[0].full_geoid;
        //return geoId;
    }).done(function() {
        console.log('geoId ' + geoId);
    })
}




//SMOOTH SCROLL VIA https://codepen.io/chriscoyier/pen/dpBMVP

// Select all links with hashes
$(document).ready(function() {

    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
});

