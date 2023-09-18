document.addEventListener('DOMContentLoaded', () => {
    var updateUser;
    var data = localStorage.getItem('user');
    data = JSON.parse(data);
    var id=data.id;
    // PreFill Update Profile Form Data
    fetch('http://localhost:3000/user').then((resp) => {
        resp.json().then((res) => {
            res.forEach(element => {

                if (data.id === element.id) {
                        document.getElementById('name').value = element.name;
                        document.getElementById('email').value = element.email;
                        document.getElementById('number').value = element.number;
                        document.getElementById('address').value = element.address;
                        document.getElementById('password').value = element.password;
                        document.getElementById('title').value = element.title;
                        document.getElementById('profileImage').value = element.profileImage;
                        document.getElementById('exp').value = element.exp;
                        document.getElementById('skill').value = element.skill;
                        document.getElementById('edu').value = element.edu;
                        document.getElementById('about').value = element.about;

                }

            });
        })
    })

    // Updating Profile Data
    let updateProfile = document.getElementById('updateProfile');
    updateProfile.addEventListener('click',(e)=>{
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
        updateUser ={name,title,email,number,address,password,about,exp,skill,edu,profileImage,id};
        updateUser = JSON.stringify(updateUser);
        localStorage.setItem('user',updateUser);
        updateUser = JSON.parse(updateUser)
        fetch(`http://localhost:3000/user/${id}`,{
                            method:'PUT',
                            headers:{
                                'content-type':'application/json'
                            },
                            body:JSON.stringify(updateUser)
                            
                        }).then((resp)=>{
                            resp.json().then((resp)=>{
                                    // resp.forEach((item)=>{
                                    //     item.title = title;
                                    //     item.descripion = des;
                                    //     item.code = code;
                                    //     item.live = live;
                                    //     item.imageUrl = imageUrl;
                                    // })
                            })
                        })
                        
                        window.location.assign('/Components/index.html');
    })
});

