document.addEventListener("DOMContentLoaded", () => {
    
    
    // Displayin Project List

    var parent = document.getElementById("projectList");
    var projects = [];

    fetch("http://localhost:3000/projects").then((resp) => {

        resp.json().then((res) => {

                if (res.length<= 0) {

                let message = document.createElement("p");
                message.className = "message";
                message.appendChild(document.createTextNode("No Project"));
                parent.appendChild(message);

            }

            else {
                res.map((item,key) => {

                    projects.push(item);
                    
                    let container = document.createElement("div");
                    container.id = `myProjects${item.id }`;
                    container.className = "myproject";
                    parent.appendChild(container);

                    let Title = document.createElement("h3");
                    Title.id = "projectTitle";
                    let TitleText = document.createTextNode(item.title);
                    Title.appendChild(TitleText);
                    container.appendChild(Title);

                    let TitleDes = document.createElement("p");
                    TitleDes.id = "projectDescription";
                    TitleDes.append(document.createTextNode(item.des));
                    container.appendChild(TitleDes);

                    let section = document.createElement("section");
                    container.appendChild(section);

                    // Edit Button
                    let edit = document.createElement("i");
                    edit.className = "fa fa-edit";
                    edit.id = `edit${key}`;
                    edit.setAttribute('onclick',`updateProject(${item.id})`)
                    section.appendChild(edit);

                  
                    // Delete
                    let del = document.createElement("i");
                    del.className = "fa fa-trash";
                    del.id = "del";
                    let id = item.id;
                    del.addEventListener("click", () => {
                        fetch(`http://localhost:3000/projects/${id}`, {method: "DELETE"}).then((resp) => {
                            resp.json().then((r) => {});
                        });
                    });
                    section.appendChild(del);
                }) 
                


            }}
    );
});



        // Hide Update Project PopUp
let updateCloser = document.getElementById("updateClose");
updateCloser.addEventListener("click", () => {
    document.getElementById("updateProject").style.display = "none";
});

});


// UPDATE PROJECT
function updateProject(id){
    alert(id)
    var globalId;
    fetch('http://localhost:3000/projects').then((resp)=>{
            resp.json().then((r)=>{
                r.forEach((i) => {
                    if (id === i.id) {
                        globalId = i.id;
                        document.getElementById("title").value = i.title;
                        document.getElementById("description").value = i.des;
                        document.getElementById("code").value = i.code;
                        document.getElementById("tags").value = i.tags;
                        document.getElementById("lang").value = i.lang;
                        document.getElementById("frame").value = i.frame;
                        document.getElementById("live").value = i.live;
                        document.getElementById("imageUrl").value = i.imageUrl;
                    }
                });
            })
       })
       
                // Display Update Project popUp 
        let updatePage = document.getElementById("updateProject");
            updatePage.style.display = "flex";

    // Update PRoject
    let update = document.getElementById("update");
    update.addEventListener("click", (e) => {
        e.preventDefault();
        // PreFill The Update Project PopUp
        let title = document.getElementById("title").value;
        let des = document.getElementById("description").value;
        let code = document.getElementById("code").value;
        let live = document.getElementById("live").value;
        let imageUrl = document.getElementById("imageUrl").value;

        let updateData = {
            title,
            des,
            code,
            live,
            imageUrl
        };

        //Put Api For Update Projects 
        fetch(`http://localhost:3000/projects/${
            globalId
        }`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateData)
        }).then((resp) => {
            resp.json().then((res) => {
                console.log(res);
            });
        });
        window.location.assign('/Components/index.html');
    });


}