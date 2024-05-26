const myApplications = async () =>{
   
    
    var el = ""
    fetch("/getApps")
    .then(response => {
        return response.json()
    })
   .then(response => {
        const body = document.getElementById("myApps")
        for(var app of response.apps){
            if(!app.key){continue}
            el += `
                <div class="code-editor felxrow">
                    <div class="header">
                    <span class="title">${app.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="icon"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linecap="round" stroke-width="2" stroke="#4C4F5A" d="M6 6L18 18"></path> <path stroke-linecap="round" stroke-width="2" stroke="#4C4F5A" d="M18 6L6 18"></path> </g></svg>
                    </div>
                    <div class="editor-content">
                    <code class="code">
                        <p><span class="color-0">.${app.name} </span> <span>{</span></p>

                        <p class="property">
                        <span class="color-2">key</span><span>:</span>
                        <span class="color-1">${app.key}</span>;
                        </p>
                        <p class="property">
                        <span class="color-2">ID</span><span>:</span>
                        <span class="color-preview-1"></span><span class="">${app._id}</span>;
                        </p>
                        <p class="property">
                        <span class="color-2"> Date</span><span>:</span>
                        <span class="color-1">Date Created </span>;
                        </p>
                        
                        <span>}</span>
                    </code>
                
                    </div>
                    <div class="add-app"><button class="button-8" role="button">Analysis</button></div>
                </div>
                `
        }
       
        body.innerHTML = el;
        console.log(response.apps,body)
   });
   
    
    
    
}