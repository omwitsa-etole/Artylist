

function adminDashboard(){
    
    const body = document.getElementById("main");
    body.innerHTML = `
    <div class="pt-3 pb-2 mb-3 border-bottom">
        <h2>Admin Dashboard</h2>
    </div>
    <div class="main-content">
        ${analysisDashboard()}
    </div>
    `
    setTimeout(function(){
        lineChart("activity")
        chartFunction("deviceChart",["Laptop","Tablet","Mobile"])
        barChart("currentUser")
        lineChart("acquisition")
        roundedChart("hbar1")

    },1119)
    chartFunction("deviceChart",["Laptop","Tablet","Mobile"])
    
}

function applicationManagement(){
    const body = document.getElementById("main")
    body.innerHTML = `
    <div class="pt-3 pb-2 mb-3 border-bottom">
        <h2>Application Managment</h2>
    </div>
    <div class="add-app"><button class="button-8" role="button" onclick="appModal()" data-toggle="modal" data-target="#appModal">Create App</button></div>
    <div class="main-content">
        <h6>Your Applications:</h6>
        <div class="flexdisplay" id="myApps">
       
        </div>
    </div>
    `
    myApplications()
}

function adminAnalystics(){
    const body = document.getElementById("main")
    body.innerHTML = `
    <div class="pt-3 pb-2 mb-3 border-bottom">
        <h2>Analystics Dashboard</h2>
    </div>
    `
}

function adminSettings(){
    const body = document.getElementById("main")
    body.innerHTML = `
    <div class="pt-3 pb-2 mb-3 border-bottom">
        <h2>Admin Settings</h2>
    </div>
    `
}
