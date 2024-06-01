
function initMap(elementId) {
    // Check if geolocation is supported
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Get current location
            const currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Create a map centered at the current location
            const map = new google.maps.Map(document.getElementById(elementId), {
                center: currentLocation,
                zoom: 15
            });

            // Create a marker at the current location
            let marker = new google.maps.Marker({
                position: currentLocation,
                map: map,
                title: "Current Location"
            });

            // Add a click listener to the map to update marker position
            map.addListener('click', function(event) {
                // Update marker position
                marker.setPosition(event.latLng);

                // Log the new marker position
                console.log("Current Lat: " + event.latLng.lat() + ", Lng: " + event.latLng.lng());
                $(".save-address").on("click",function(){
                    $(".save-address").text('saving')
                    module.fetch("/api/user/setAddress",{lat: event.latLng.lat(),lng: event.latLng.lng()},"post",function(){
                        $(".save-address").text('save')
                    })
                })
            });
        }, function() {
            // Handle location error
            handleLocationError(true, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    console.log(browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation.");
}

export function setPickup (id){
    document.getElementById("exploreProduct").classList.add('show');
    document.getElementById("exploreProduct").style.display = 'block'
    document.getElementById("exploreProduct-content").parentElement.style.height="599px"
    document.getElementById("exploreProduct-content").parentElement.style.overflowY = "scroll"
    document.getElementById("exploreProduct-content").parentElement.style.minWidth = "75vh"
    document.getElementById("exploreProduct-content").style.height = "99%"
    document.getElementById("exploreProduct-content").style.overflowY = "scroll"
    $(`#${id}`).html(`
        <h4>Pickup</h4>
        <dic id="companies"></div>
    `)
    module.fetch("/api/get_companies",{},"POST",function(data){
        console.log(data)
        if(data.message){
            alert(data.message)
        }
        if(data.data){
            for(const comp of data.data){
                if(comp.is_pickup){
                    $("#companies").append(`
                        <br>
                        <div class="card-item">
                            <div class="align">
                                <span class="red"></span>
                                <span class="yellow"></span>
                                <span class="green"></span>
                            </div>

                            <h1>${comp.name}</h1>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde explicabo enim rem odio assumenda?
                            </p>
                            <div class="card-buttons">
                                <button class="btn btn-default button" onclick="module.userSetPickup('${comp.id}')">Select</button>
                            </div>
                        </div>
                    `)
                }
            }
           
        }
        
    })
}

export function setAddress(id){
    $('.modal-footer').append(`<a class="btn btn-default save-address">Save</a>`)
    document.getElementById("exploreProduct").classList.add('show');
    document.getElementById("exploreProduct").style.display = 'block'
    $(`#${id}`).html(`
        <h4>Address</h4>
        <>Loading ...<i calss="fa fa-spinner"></i>
    `)
    document.getElementById(id).style.height =  "59vh"
    
    initMap(id);
}

export function userSetPickup(company){
    module.fetch("/api/user/setpickup",{company:company},"post",function(data){
        if(data.status == 0){
            location.reload();
        }
        alert(data.message)
    })
}