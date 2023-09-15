
    let auth = localStorage.getItem('admin');
    auth = JSON.stringify(auth);
    if(auth){
     window.location.assign('./Dashboard.html');  
    }
    else{
    window.location.assign("./AdminLoginPage.html");
        
    }


// Admin Logout

