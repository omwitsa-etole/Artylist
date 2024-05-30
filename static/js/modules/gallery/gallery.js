function allProducts(data){
    let el = ``
    for(var data of data.data){
        el += `
        <swiper-slide>
        <div class="dzSwipe_card">
            <div class="dz-media" >
                <img src="${data.image}" alt="" style="border-radius: 0;">
            </div>
            <div class="dz-content">
                <div class="left-content">
                    <span class="badge badge-primary d-inline-flex gap-1 mb-2">
                        <i class="fa fa-money-bill"></i><span>KES</span><b>${data.unit_price}</b></span>
                    <h4 class="title"><a href="profile-detail.html">${data.name}, ${data.company}</a></h4>
                    <ul class="intrest">
                        <li><span class="badge">${data.item_group}</span></li>
                        <li><span class="badge">${data.discount_rate} % OFF</span></li>
                    </ul>
                    <p class="mb-0" style="display:none;"> 
                        <i class="fa fa-tag"></i><span class="tag-description"></span>
                    </p>
                </div>
                <a href="javascript:void(0);" onclick="module.addWish('${data.id}')" class="dz-icon dz-sp-like add-wish">
                    <i class="fa fa-heart"></i></a>
                <a href="javascript:void(0);" id="${data.id}" class="dz-icon dz-sp-like add-cart">
                    <i class="fa fa-cart-shopping"></i></a>
            </div>
           
            <div class="dzSwipe_card__option dzSuperlike">
                <h5 class="title mb-0">Super Like</h5>
            </div>
            <div class="dzSwipe_card__drag"></div>
        </div>
        </swiper-slide>

        `
    }
    return el
}

export function showProduct(data){
    console.log(data)
    setTimeout(function(){
        $('.add-cart').click(function(e) {
            let id = e.currentTarget.id;
            console.log(id)
            module.fetch("/api/store/addCart",{item_id:id,user_id:module.user_id},"POST",function(data){
                console.log(data)
            })
            var child = $(this).children().last();
            console.log($(this).children().last())
            if(child.hasClass("fa-cart-shopping")){
                child.removeClass("fa-cart-shopping")
                child.addClass("fa-check")
            }else{
                
                child.addClass("fa-cart-shopping")
                child.removeClass("fa-check")
            }
            
        });
    },999)
    
    return document.getElementById("gallery").innerHTML = `
    <div class="dzSwipe_card-cont dz-gallery-slider mySwiper">
        <swiper-container class="mySwiper" navigation="true">
         ${allProducts(data)}
        </swiper-container>
    </div>
    `
}

export function addWish(item_id){
    module.fetch("/api/store/addWish",{item_id:item_id,user_id:module.user_id},"POST",function(data){
        console.log(data)
        if(data.message){
            alert(data.message)
        }
        if(data.id || Array.isArray(data)){
            alert("Item added to wishlist")
        }
    })
}

export function addCart(item_id){
    module.fetch("/api/store/addCart",{item_id:item_id,user_id:module.user_id},"POST",function(data){
        console.log(data)
        if(data.message){
            alert(data.message)
        }
        if(data.id){
            alert("Item added to cart")
        }
    })
}

export function deleteCart(id){
    module.fetch("/api/store/deleteCart",{id:id,user_id:module.user_id},"POST",function(data){
        console.log(data)
        if(data.message){
            
        }
        if(data.status == 0){
            $("#cart-item-"+id).remove();
            //alert("Item removed from cart")
        }else{
            alert(data.message)
        }
    })
}

export function showSingle(id){
    if(id == undefined){
        console.error("no prodct id")
        return
    }
    document.getElementById("exploreProduct").classList.add('show');
    document.getElementById("exploreProduct").style.display = 'block'
    module.fetch("/api/store/getProduct/"+id,null,"GET",function(data){
        console.log(data)
        data = data.data
        document.getElementById("exploreProduct-content").parentElement.style.height="599px"
        document.getElementById("exploreProduct-content").parentElement.style.overflowY = "scroll"
        document.getElementById("exploreProduct-content").parentElement.style.minWidth = "75vh"
        document.getElementById("exploreProduct-content").style.height = "99%"
        document.getElementById("exploreProduct-content").style.overflowY = "scroll"
        document.getElementById("exploreProduct-content").innerHTML = `
        <div class="" style="display:flex;width: 100%;">
            <div class="row">
                <div class="col-md-5">
                   
                    <div class="project-info-box">
                        <p class="mb-0">${data.description}.</p>
                        <p><b>Client:</b> ${data.company}</p>
                        <p><b>Date:</b> ${data.created_at}</p>
                        <p><b>Name:</b> ${data.name}</p>
                        <p><b>Tools:</b> ${data.item_group}</p>
                        <p class="mb-0"><b>Budget:</b> KES ${data.unit_price}</p>
                        <p class="mb-0">
                           <button class="add-cart" onClick='module.addCart("${data.id}")'>Add to Cart<i class="fa fa-shopping-cart"></i></button>
                           <button onclick="document.getElementById('exploreProduct').classList.remove('show');document.getElementById('exploreProduct').style.display=''">Cancel</button>
                        </p>
                    </div><!-- / project-info-box -->
        
                </div><!-- / column -->
        
                <div class="col-md-7">
                    <img src="${data.image}" alt="project-image" class="rounded"/>
                    <div class="project-info-box">
                        <p><b>Categories:</b> ${data.item_group}</p>
                        <p><b>Discount:</b> ${data.discount_rate}</p>
                        
                    </div><!-- / project-info-box -->
                </div><!-- / column -->
            </div>
        </div>
        `
    })
}