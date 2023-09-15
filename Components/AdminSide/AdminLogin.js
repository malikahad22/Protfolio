// document.addEventListener('DOMContentLoaded',(e)=>{
//     e.preventDefault()
//     // Admin Login Functionality
//         // Fecthing Admin Data
//         fetch('http://localhost:3000/Admin').then((resp)=>{
//             resp.json().then((res)=>{

//                 for(let a = 0 ; a<res.length ; a++){
//                     if(res[a].email === adminEmail && res[a].password === adminpassword){
//                         window.location.assign('./Dashboard.html')
//                     }
//                     else if(adminEmail === "" && adminpassword=== ""){
//                             alert("Please Fill All Fields");
//                     }
//                     else
//                     {
//                         alert("Admin Not Found By Given Data")
//                     }
//                 }

//             })
//         })
//     })

  


