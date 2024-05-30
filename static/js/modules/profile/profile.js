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
    document.getElementById("exploreProduct").classList.add('show');
    document.getElementById("exploreProduct").style.display = 'block'
    $(`#${id}`).html(`
        <h4>Address</h4>
    `)
}

export function userSetPickup(company){
    module.fetch("/api/user/setpickup",{company:company},"post",function(data){
        if(data.status == 0){
            location.reload();
        }
        alert(data.message)
    })
}