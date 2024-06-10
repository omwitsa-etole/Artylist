
const api = ""
export async function fetchFunction(apiUrl, payload, method,nextFunction) {
    try {
      console.log(apiUrl)
      const options = {
        method: method || 'GET', // Default to GET if method is not provided
        headers: {
          'Content-Type': 'application/json' // Set content type to JSON
        }
      };
  
      if (payload) {
        options.body = JSON.stringify(payload); // Include payload in request body if provided
      }
  
      const response = await fetch(api+apiUrl, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      nextFunction(data); // Send data to the next function
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
const module = {}
const ws_url = "wss://wsdesk-8dac13c80786.herokuapp.com/"
//const ws_url = 'ws://localhost:5001/'
module.websocket = new WebSocket(ws_url);

module.next = null

module.websocket.addEventListener("message", async ({ data }) => {
    const event = JSON.parse(data);
    data = event;
    
    
    if(data.message){
        $('.error').append(`<br><h4>${data.message}</h4>`)
    }
    data.status = data.ResponseCode ? data.ResponseCode : data.status
    console.log("socket=>",data,module.next);
    if(data.ResultCode){
        if(data.ResultCode != '0'){
            module.next = null;
            $('.error').html(`Payment incomplete with message : <br> ${data.ResultDesc}`)
        }else{
            $('.error').append(`<br><h5>Successfully initiated payment, waiting for response</h5>`);
            await module.next[0](module.next[1]);
            module.next = null;
        }
    }

    if(data.status != 1 && data.status != undefined){
        if(module.next !== null){
            //let payload = module.next[1];
            //payload.checkout_id = data.CheckoutRequestID ? data.CheckoutRequestID : null;
            //payload.merchant_id = data.MerchantRequestID ? data.MerchantRequestID : null;
            $('.error').append(`<br><h5>Successfully initiated payment, waiting for response</h5>`);
           module.next[0](Module.next[1]);

            module.next = null;
        }
    }else{
        $('.error').append(`<br>Payment initiiation failed with status : ${data.message ? data.message : data}`)
    }
    
    // do something with event
  });

module.websocket.addEventListener('open', () => {
    // Send the ID to the WebSocket server after the connection is established
    module.websocket.send(JSON.stringify({ type: 'id', id: "user" }));
});

export const Module = module;