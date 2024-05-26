function allProducts(data){
    let el = ``
    for(var data of data.data){
        el += `
        <div class="dzSwipe_card">
            <div class="dz-media">
                <img src="static/assets/images/slider/pic3.png" alt="">
            </div>
            <div class="dz-content">
                <div class="left-content">
                    <span class="badge badge-primary d-inline-flex gap-1 mb-2">
                        <i class="fa fa-money-bill"></i><span>KES</span><b>2999</b></span>
                    <h4 class="title"><a href="profile-detail.html">Lisa Ray , 25</a></h4>
                    <ul class="intrest">
                        <li><span class="badge">Tag</span></li>
                        <li><span class="badge">Tag</span></li>
                        <li><span class="badge">Tag</span></li>
                    </ul>
                    <p class="mb-0">
                        <i class="fa fa-tag"></i><span class="tag-description">25% OFF</span>
                    </p>
                </div>
                <a href="javascript:void(0);" class="dz-icon dz-sp-like add-cart">
                    <i class="fa fa-cart-shopping"></i></a>
            </div>
           
            <div class="dzSwipe_card__option dzSuperlike">
                <h5 class="title mb-0">Super Like</h5>
            </div>
            <div class="dzSwipe_card__drag"></div>
        </div>
        `
    }
}

export function showProduct(data){
    console.log(data)
    setTimeout(funnction(){
        $('.add-cart').click(function() {
            console.log($(this))
        });
    },999)
    
    return document.getElementById("gallery").innerHTML = `
    <div class="dzSwipe_card-cont dz-gallery-slider">
        ${allProducts()}
    </div>
    `
}