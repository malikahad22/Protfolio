
document.addEventListener('DOMContentLoaded', () => {
   
    var parent = document.getElementById('projectList');
    var projects = [];
    fetch('http://localhost:3000/projects').then((resp) => {
        resp.json().then((res) => {
            if(res.length<=0){
                let message = document.createElement('p');
                message.className= 'message';
                message.appendChild(document.createTextNode('No Project'))
                parent.appendChild(message);
             }
             else{
                res.forEach((item) => {
                    projects.push(item)
                    let container = document.createElement('div');
                    container.id = `myProjects${item.id}`
                    container.className = 'myproject'
                    parent.appendChild(container)
                    
                    let Title = document.createElement('h3');
                    Title.id = 'projectTitle'
                    let TitleText = document.createTextNode(item.title);
                    Title.appendChild(TitleText);
                    container.appendChild(Title)
    
                    let TitleDes = document.createElement('p');
                    TitleDes.id = 'projectDescription';
                    TitleDes.append(document.createTextNode(item.des))
                    container.appendChild(TitleDes);
    
                    let section = document.createElement('section');
                    container.appendChild(section);
    
                    let edit = document.createElement('i');
                    edit.className='fa fa-edit';
                    edit.id = 'edit'
                    // edit.setAttribute('onclick','edit(id)');
                    edit.addEventListener('click',()=>{
                        projects.forEach((i)=>{
                            if(item.id === i.id){
                                document.getElementById('title').value = i.title;
                                document.getElementById('description').value = i.des;
                                document.getElementById('code').value = i.code;
                                document.getElementById('live').value = i.live;
                                document.getElementById('imageUrl').value = i.img;
                            }
                        })
                        let updatePage = document.getElementById('updateProject');
                        updatePage.style.display = 'flex';
                       
                    })

                    let update = document.getElementById('update');
                    update.addEventListener('click',(e)=>{
                        e.preventDefault()
                        let title = document.getElementById('title').value;
                        let des = document.getElementById('description').value;
                        let code = document.getElementById('code').value;
                        let live = document.getElementById('live').value;
                        let imageUrl = document.getElementById('imageUrl').value;
                        let updateData = {title,des,code,live,imageUrl}
                        console.log(updateData);
                        fetch(`http://localhost:3000/projects/${item.id}`,{
                            method:'PUT',
                            headers:{
                                'content-type':'application/json'
                            },
                            body:JSON.stringify(updateData)
                            
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

                    // Edit Button
                    section.appendChild(edit)
    
                    let del = document.createElement('i');
                    del.className='fa fa-trash';
                    del.id = 'del'
                    let id = item.id;
                    del.addEventListener('click',()=>{
                        fetch(`http://localhost:3000/projects/${id}`,{
                            method:'DELETE',
                        }).then((resp)=>{
                            resp.json().then((r)=>{
                                
                            })
                        })
                    })
                    section.appendChild(del)
                })

             }
           

        })
    })
    let updateCloser = document.getElementById('updateClose');
updateCloser.addEventListener('click',()=>{
    document.getElementById('updateProject').style.display = 'none';
})
})

// UPDATE PROJECT
