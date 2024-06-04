import {fetchFunction,Module} from "./modules.js"


export function getVerification(number,code){
    var phoneRegex = /^\d{9}$/;
   
    var pwd = $("#email-password").val()
    
    if(number && number.includes("@") || pwd !== undefined || number.length < 9){
        
        let el = $("#emailLogin")
        /*
        if(pwd !== undefined){
           
            if(pwd.length == 0){
                alert("Enter password")
                return false;
            }
            module.fetch("/api/login",{username_email:number,password:pwd},"POST",function(data){
                if(data.status == 0){
                    location.href = "store";
                }
                if(data.message){
                    alert(data.message)
                }
            })
            return true;
        }else{
            el.append(`
            <div class="input-group dz-select">
                <div class="input-group-text"> 
                    <div>
                        <i class="fa fa-lock"></i>
                    </div>
                </div>
                <input type="password" id="email-password" class="form-control" placeholder="Password">
            </div>`)
            return false
        }
        return false
        */
        otpHandler(number,"email")
    }else{
        var res = phoneRegex.test(number);
        number = code+number
        if(res === false){
            alert("Invalid Phone number")
            return 
        }
        otpHandler(number,"number")
    }
    
    //console.log(parseInt(number))
    // Check if the provided phoneNumber matches the regular expression
    
    return false
}

const server_uri = window.location.protocol.includes('https') ? 'https://'+window.location.host : "https://artylist-b565dccf3eda.herokuapp.com"

export function otpHandler(number,type){
    number = number.replace("+","")
    let dat = {
        number_email:number,
        type:type,
        action:"login-code",
        url:server_uri+"/api/login/get_code?user_id="+number,
    }
	setTimeout(function(){
		for(let i=2;i<5;i++){
		console.log(i)
		$("#digit-"+i).on('keyup',function(){
			$("#digit-"+(i+1)).select();
		})
	}
	},2500)
	
    Module.next = [null,number]
    Module.next[0] = (number)=>{
        const ecode = document.getElementById("getcode")
        ecode.setAttribute("id","verifyCode")
        ecode.addEventListener("click",function(){
            let code = ""
            var digit_1 = $("#digit-2").val()
            code =code+digit_1
            var digit_2 = $("#digit-3").val()
            code =code+digit_2
            var digit_3 = $("#digit-4").val()
            code =code+digit_3
            var digit_4 = $("#digit-5").val()
            code =code+digit_4
            $("#numLogin").text('Logging in ...')
            
            fetchFunction("/api/login",{username_email:number,password:code},"POST",function(data){
                $("#numLogin").text('Next')
                if(data.status == 0){
                    location.href = "store";
                }
                if(data.message){
                    alert(data.message)
                }
            })
        })
        $("#verifyCode").click(function(){
            
            
            //location.href="home"
        })
        return document.getElementById("page-content").innerHTML = `
            <div class="container">
                <div class="account-area">
                
                    <div class="section-head ps-0">
                        <h3>Enter your code (sent : ${number})</h3>
                    </div>
                    <form action="submit">
                        <div id="otp" class="digit-group input-mini">
                            <input class="form-control" type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" maxlength="1">
                            <input class="form-control" type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" maxlength="1">
                            <input class="form-control" type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" maxlength="1">
                            <input class="form-control" type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" maxlength="1">
                        </div>                
                    </form>
                    <p><a id="numLogin" onclick="module.nLogin()" href="javascript:void(0)">Change Phone</a></p>
                </div>
            </div>
        `
    }
    Module.websocket.send(JSON.stringify(dat))
    
}

export function emailLogin(){
    return document.getElementById("page-content").innerHTML = `
        <div class="container">
            <div class="account-area">
            
                <div class="section-head ps-0">
                    <h3>Enter your Email</h3>
                </div>
                <form id="emailLogin">
					<div class="input-group dz-select">
						<div class="input-group-text"> 
							<div>
								<i class="fa fa-envelope"></i>
							</div>
						</div>
						<input type="email" id="number" class="form-control" placeholder="Email">
					</div>
				</form>	
                <p><a id="" onclick="module.nLogin()" href="javascript:void(0)">Login with Phone</a></p>
            </div>
        </div>
    `
}
export function numberLogin(){
    return document.getElementById("page-content").innerHTML = `
    <div class="container">
        <div class="account-area">
            
            <div class="section-head ps-0">
                <h3>Please Enter your Phone Number</h3>
            </div>
            <form onsubmit="document.getElementById('getcode');return false;">
            <div class="input-group dz-select">
                <div class="input-group-text"> 
                    <div>
                        <select id="countrycode" class="form-control custom-image-select image-select">
                            <option data-thumbnail="{{url_for('static',filename='assets/images/flags/kenya.png')}}">+254</option>
                            <option data-thumbnail="{{url_for('static',filename='assets/images/flags/tz.png')}}">+255</option>
                            <option data-thumbnail="{{url_for('static',filename='assets/images/flags/uae.png')}}">+971</option>
                            <option data-thumbnail="{{url_for('static',filename='assets/images/flags/us.png')}}">+1</option>
                        </select>
                    </div>
                </div>
                <input type="number" id="number"class="form-control" placeholder="Phone Number">
            </div>
        </form>		
            <p><a id="emailLogin" onclick="module.eLogin()" href="javascript:void(0)">Login with Email</a></p>
        </div>
    </div>
    `
}

export function firstName(){
    return document.getElementById("page-content").innerHTML = `
        <div class="container">
            <div class="account-area">
            
                <div class="section-head ps-0">
                    <h3>Enter your Name</h3>
                </div>
                <form>
                    <div class="mb-2 input-group input-group-icon input-mini">
                        <div class="input-group-text">
                            <div class="input-icon">
                                <i class="icon feather icon-user"></i>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="Enter first name">								
                    </div>
				</form>	
                <p><a id="" onclick="module.nLogin()" href="javascript:void(0)">Login with Phone</a></p>
            </div>
        </div>
    `
}

export function birthGender(){
    return document.getElementById("page-content").innerHTML = `
        <div class="container">
            <div class="account-area">
            
                <div class="section-head ps-0">
                    <h3>Enter your Gender</h3>
                </div>
                <form>
                <div class="radio style-2">
                        <label class="radio-label">
                            <input type="radio" checked="checked" name="radio2">
                            <span class="checkmark">						
                                <span class="text">Women</span>
                                <span class="check"></span>							
                            </span>
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="radio2">
                            <span class="checkmark">
                                <span class="text">Nature</span>
                                <span class="check"></span>							
                            </span>
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="radio2">
                            <span class="checkmark">
                                <span class="text">Other</span>	
                                <span class="check"></span>							
                            </span>
                        </label>
                    </div>
				</form>	
                <p><a id="" onclick="module.nLogin()" href="javascript:void(0)">Login with Phone</a></p>
            </div>
        </div>
    `
}