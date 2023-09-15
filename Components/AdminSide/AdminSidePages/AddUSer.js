document.addEventListener('DOMContentLoaded',()=>{

       // Add New User File
    let addNew = document.getElementById('addUser')
   addNew.addEventListener('click',(e)=>{
       e.preventDefault()
       let name =document.getElementById('name').value 
       let title =document.getElementById('title').value 
       let email =document.getElementById('email').value 
       let number =document.getElementById('number').value 
       let address =document.getElementById('address').value 
       let password =document.getElementById('password').value; 
       let profileImage =document.getElementById('profileImage').value; 
       let about =document.getElementById('about').value 
       let exp =document.getElementById('exp').value 
       let skill =document.getElementById('skill').value 
       let edu =document.getElementById('edu').value
      let  newUser ={name,title,email,number,address,password,about,exp,skill,edu,profileImage};
    //    console.log(newUser)
     if(name===""||title === ""|| email ===""||number === "" || address  === "" || password===""||about === ""|| exp ==="" || skill === ""||edu === ""|| profileImage==""){
        alert("Please Fill All Records")
     }
     else{
        fetch('http://localhost:3000/user',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newUser)
           }).then((resp)=>{
            resp.json().then((res)=>{
                
            })
           })
           window.location.assign('/Components/AdminSide/AdminSidePages/Users.html')
     }
   });
})

function NewUserAdd(e){
    e.preventDefault()
}