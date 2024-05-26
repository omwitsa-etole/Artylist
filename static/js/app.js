function handlePage(){
    var hash = window.location.hash
    hash = hash.replace("#","");
    console.log(hash)
    switch(hash){
        
        case "application":
            applicationManagement();
            break;
        case "analystics":
            adminAnalystics();
            break;
        case "settings":
            adminSettings()
            break;
        default:
            adminDashboard();
            break;
    }
}

window.addEventListener("hashchange",handlePage)
handlePage()