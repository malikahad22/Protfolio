document.addEventListener("submit", function (e) {
    e.preventDefault();
});
var eventId;
function leftSide(event) {
    eventId = event;
}
let user = {
    id: 0,
    name: "",
    email: "",
    number: "",
    password: "",
    address: "",
    about: "",
    title: "",
    projectNames: [],
    exp: [],
    edu: [],
    skill: [],
    projects:[]
};

// index File
function logout() {
    localStorage.clear();
    window.location.assign("/Components/Login.html");
}

document.addEventListener("DOMContentLoaded", () => {
    // About Section
    let userData = JSON.parse(localStorage.getItem("user"));
    document.getElementById("T").innerHTML = userData.title;
    document.getElementById("Name").innerHTML = userData.name;
    document.getElementById("email").innerHTML = userData.email;
    document.getElementById("address").innerHTML = userData.address;
    document.getElementById("number").innerHTML = userData.number;
    document.getElementById("aboutMe").innerHTML = userData.about;
    document.getElementById("myPofile").src = userData.profileImage;
    let pp = userData.projectNames;
    console.log("Projectts",pp)
 document.getElementById("exp").innerHTML = userData.exp;
 document.getElementById("skill").innerHTML = userData.skill;
 document.getElementById("projectNames").innerHTML = userData.projectNames;


//  document.getElementById("edu").innerHTML = userData.edu;
    let skill = document.getElementById("skill");
    let project = document.getElementById("projectNames");
    //Setting Experience of About Section
    // for (let a = 0; a < userData.exp.length; a++) {
    //     const list = document.createElement("li");
    //     list.innerHTML = userData.exp[a];
    //     exp.appendChild(list);
    // }
    //Setting Experience of skills Section

    // for (let a = 0; a < userData.skill.length; a++) {
    //     const list = document.createElement("li");
    //     list.innerHTML = userData.skill[a];
    //     skill.appendChild(list);
    // }
    //Setting Experience of projects Section

    // for (let a = 0; a <userData.projectNames.length; a++) {
    //     console.log(userData.projectNames[a])
    //     const list = document.createElement("li");
    //     list.innerHTML = userData.projectNames[a];
    //     project.appendChild(list);
    // }
    // SearchBar

    // Function to display projects based on search value
    function displayProjects(searchValue) {
        let parentElement = document.getElementById("p1");

        // Clear previous search results
        parentElement.innerHTML = "";
        var filterData;
        fetch("http://localhost:3000/projects")
            .then((resp) => resp.json())
            .then((res) => {
                if (searchValue === "") {
                    filterData = res;
                } else {
                    filterData = res.filter(
                        (f) => f.title.toLowerCase() === searchValue.toLowerCase()
                    );
                }
                if (filterData.length === 0) {
                    let message = document.createElement("p");
                    message.className = "message";
                    message.appendChild(document.createTextNode("No Project"));
                    parentElement.appendChild(message);
                } else {

                    for (let a = 0; a < filterData.length; a++) {

                        // Create left side of the project
                        let leftNode = document.createElement("div");
                        leftNode.id = `left-side${a}`;
                        leftNode.className = "left";
                        parentElement.appendChild(leftNode);
                        let leftParent = document.getElementById(`left-side${a}`);
                        leftParent.setAttribute('onclick', `leftSide(${a})`);
                        let click = document.getElementById(`left-side${a}`);
                        click.addEventListener('click', () => {
                            console.log(filterData[eventId])
                            document.getElementById('pop-title').innerHTML = filterData[eventId].title
                            document.getElementById('pop-desciption').innerHTML = filterData[eventId].des;
                            document.getElementById('img1').src = filterData[eventId].img
                            popover.style.display = 'flex'
                        })

                        // project Title Node
                        let head = document.createElement("h3");
                        head.className = "title";
                        let headText = document.createTextNode(filterData[a].title);
                        head.appendChild(headText);
                        leftParent.appendChild(head);

                        // paragraph Node
                        let para = document.createElement("p");
                        let description = document.createTextNode(filterData[a].des);
                        para.className = "text";
                        para.appendChild(description);
                        leftParent.appendChild(para);

                        // Add Link For See Live
                        let live = document.createElement("a");
                        let liveTitle = document.createTextNode("See Live");
                        live.appendChild(liveTitle);
                        live.className = "btn3";
                        live.setAttribute("href", filterData[a].live);
                        leftParent.appendChild(live);

                        // Add Link For Source Code
                        let source = document.createElement("a");
                        let sourceTitle = document.createTextNode("Source Code");
                        source.appendChild(sourceTitle);
                        source.className = "src";
                        source.setAttribute("href", filterData[a].code);
                        leftParent.appendChild(source);

                        // Right Side of the Project
                        let rightNode = document.createElement("div");
                        rightNode.id = `right-side${a}`;
                        rightNode.className = "right";
                        let image = document.createElement("img");
                        image.className = "projectImage";
                        image.setAttribute("src", filterData[a].img);
                        rightNode.appendChild(image);
                        parentElement.appendChild(rightNode);


                    }

                    //   function setPopData(Id){
                    //         alert(Id)
                    //   }
                }
                // PopOVer

                let popover = document.getElementById("popover");
                let close = document.getElementById("close");
                close.addEventListener("click", () => {
                    popover.style.display = "none";
                });

            });
    }

    // Search button click event listener
    let searchIcon = document.getElementById("searchIcon");
    searchIcon.addEventListener("click", () => {
        let searchValue = document.getElementById("search").value;
        displayProjects(searchValue);
    });

    // Initial display of all projects
    displayProjects("");
});

// LoginFile
function getLogInData() {
    let email;
    let password;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    fetch("http://localhost:3000/user").then((resp) => {
        resp.json().then((result) => {
            for (let i = 0; i < result.length; i++) {
                if (result[i].email === email && result[i].password === password) {
                    let jsonData = JSON.stringify(result[i]);
                    localStorage.setItem("user", jsonData);
                    window.location.assign("/Components/index.html");
                }
            }
        });
    });
}

// SignUp File
function getSignUpData() {
    let name;
    let email;
    let number;
    let password;
    let address;
    let profileImage;
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    number = document.getElementById("number").value;
    password = document.getElementById("password").value;
    address = document.getElementById("address").value;
    profileImage = document.getElementById("profileImage").value;
    let data = { name, email, number, password, address, profileImage };
    if (name === "" || email === "" || number === "" || password === "" || address===""  || profileImage==="" ) {
        alert("Please Fill all Fields");
    } else {
        const jsonData = JSON.stringify(data);
        localStorage.setItem("user", jsonData);
        window.location.assign("Pages/profile.html");
    }
}

// Profile File
function goToHome() {
    let data = localStorage.getItem("user");
    let User = JSON.parse(data);
    user.name = User.name;
    user.email = User.email;
    user.number = User.number;
    user.password = User.password;
    if (
        user.title === "" ||
        user.projectNames === "" ||
        user.exp === "" ||
        user.skill === "" ||
        user.edu === "" ||
        user.about === ""||
        user.profileImage ===""
        
    ) {
        alert("Please Fill All Fields");
    } else {
        fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
            });
        });
        window.location.assign("/Components/Login.html");
    }
}
function setValue(val) {
    if (val === "title") {
     
        user.title =document.getElementById("title").value;
        document.getElementById("title").value = "";
    } else if (val === "project") {
        user.projectNames.push(document.getElementById("project").value);
        document.getElementById("project").value = "";
    } else if (val === "exp") {
        user.exp.push(document.getElementById("exp").value);
        document.getElementById('exp').value = "";
    } else if (val === "edu") {
        user.edu.push(document.getElementById("edu").value);
        document.getElementById("edu").value = "";
    } else if (val === "skill") {
        user.skill.push(document.getElementById("skill").value);
        document.getElementById("skill").value = "";
    } else if (val === "about") {
        user.about = document.getElementById("about").value;
        document.getElementById("about").value = "";
    } else {
        alert("enter right data");
    }
}

// function postData(data){
//     fetch('http://localhost:3000/user',{
//         method:"POST",
//         headers:{
//             'content-type':'application/json'
//         },
//         body:JSON(data)
//     }).then(())
// }

// upodate Profile

// function getData() {
//     fetch('http://localhost:3000/user').then((resp) => {
//         resp.json().then((result) => {
//             document.getElementById('name').innerHTML = result.name;
//             console.log(result)
//         })
//     })
// }
var tags = [];
function setTag() {
    let tagVal = document.getElementById('tags').value;
    tags.push(tagVal);
    document.getElementById('tags').value = "";
    console.log(tags);
}
function addProject() {
    let title;
    let des;
    let code;
    let live;
    var img;
    let frame;

    title = document.getElementById("title").value;
    des = document.getElementById("description").value;
    code = document.getElementById("code").value;
    live = document.getElementById("live").value;
    img = document.getElementById("input_file").value;
    frame = document.getElementById("framework").value;



    let data = { title, des, code, live, img, frame,tags };
    console.log(data)
    fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((resp) => {
        resp.json().then((result) => {
            console.log(result);
        });
    });
}
function goHome() {
    window.location.assign("/Components/index.html");
}
