    
        let auth = localStorage.getItem('user');
        auth = JSON.parse(auth);
        if(auth){
         window.location.assign('/Components/index.html');  
        }
        else{
        window.location.assign("/Components/Login.html");
            
        }
   

