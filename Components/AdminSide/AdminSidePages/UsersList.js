document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  // --------------------------------------------USER LIST------------------------------------------------>

  function displayUser(searchValue) {
    let parentElement = document.getElementById("userList");
    // Clear previous search results
    parentElement.innerHTML = "";

    var filterData;
    fetch("http://localhost:3000/user")
      .then((resp) => resp.json())
      .then((res) => {
        
            if (searchValue === "") {
                    filterData = res.filter((f)=>{
                        if(!f.role){
                            return f
                        }
                    });

            } else {
               filterData = res.filter((f) => {
                 if (
                   !f.role &&
                    (f.name.toLowerCase() === searchValue.toLowerCase() ||
                     f.title.toLowerCase() === searchValue.toLowerCase() ||
                     f.email === searchValue ||
                     f.number === searchValue)
                 ) {
                   return f;
                 }
               });
             }
           

        if (filterData.length === 0) {
          let message = document.createElement("p");
          message.className = "message";
          message.appendChild(document.createTextNode("No User Record"));
          parentElement.appendChild(message);
        } else {
          for (let a = 0; a < filterData.length; a++) {
            // if (!filterData[a].admin==="admin") {
            

            //Targeting UserList ID TO Display USers
            let parentElement = document.getElementById("userList");

            // Create Wrrapper of User Info
            let wrapper = document.createElement("div");
            wrapper.id = "wrapper";
            parentElement.appendChild(wrapper);

            // Left Side of the wrapper

            let leftWrapper = document.createElement("section");
            leftWrapper.id = "left-wrapper";
            wrapper.appendChild(leftWrapper);

            //Applying Image
            let img = document.createElement("img");
            img.setAttribute("src", filterData[a].profileImage);
            leftWrapper.appendChild(img);

            // User Contact Info

            let contact = document.createElement("section");
            contact.id = "contact";
            leftWrapper.appendChild(contact);

            // Email:
            let emailhead = document.createElement("p");
            emailhead.id = "heading";
            emailhead.appendChild(document.createTextNode("Email:"));
            contact.appendChild(emailhead);
            let email = document.createElement("p");
            email.id = "email";
            email.appendChild(document.createTextNode(filterData[a].email));
            contact.appendChild(email);

            // Number

            let numberhead = document.createElement("p");
            numberhead.id = "heading";
            numberhead.appendChild(document.createTextNode("Phone No:"));
            contact.appendChild(numberhead);
            let number = document.createElement("p");
            number.id = "num";
            number.appendChild(document.createTextNode(filterData[a].number));
            contact.appendChild(number);

            // Address:
            let addhead = document.createElement("p");
            addhead.id = "heading";
            addhead.appendChild(document.createTextNode("Address:"));
            contact.appendChild(addhead);
            let address = document.createElement("p");
            address.id = "address";
            address.appendChild(document.createTextNode(filterData[a].address));
            contact.appendChild(address);

            // Right Side of The Rapper
            let rightWrapper = document.createElement("section");
            rightWrapper.id = "right-wrapper";
            wrapper.appendChild(rightWrapper);

            // Section for Name and Title
            let section = document.createElement("section");
            section.id = "upper";
            rightWrapper.appendChild(section);

            //Users Name
            let name = document.createElement("p");
            name.id = "name";
            name.appendChild(document.createTextNode(filterData[a].name));
            section.appendChild(name);

            //User Titles
            let title = document.createElement("p");
            title.id = "title";
            title.appendChild(document.createTextNode(filterData[a].title));
            section.appendChild(title);

            // Users Descriptions
            let des = document.createElement("p");
            des.id = "des";
            des.appendChild(document.createTextNode(filterData[a].about));
            rightWrapper.appendChild(des);

            // Profile Section for Experience Skills  projects Education
            let profile = document.createElement("section");
            profile.id = "profile";
            rightWrapper.appendChild(profile);

            // Experience
            let exphead = document.createElement("p");
            exphead.id = "heading";
            exphead.appendChild(document.createTextNode("Experience:"));
            profile.appendChild(exphead);
            let exp = document.createElement("p");
            exp.id = "exp";
            exp.appendChild(document.createTextNode(filterData[a].exp));
            profile.appendChild(exp);

            // Skills
            let skillhead = document.createElement("p");
            skillhead.id = "heading";
            skillhead.appendChild(document.createTextNode("Skills:"));
            profile.appendChild(skillhead);
            let skill = document.createElement("p");
            skill.id = "skill";
            skill.appendChild(document.createTextNode(filterData[a].skill));
            profile.appendChild(skill);

            // Projects
            // let projecthead = document.createElement("p");
            // projecthead.id = "heading";
            // projecthead.appendChild(document.createTextNode("Projects:"));
            // profile.appendChild(projecthead);
            // let project = document.createElement("p");
            // project.id = "project";
            // project.appendChild(
            //   document.createTextNode(filterData[a].projectNames)
            // );
            // profile.appendChild(project);

            // Education
            let eduhead = document.createElement("p");
            eduhead.id = "heading";
            eduhead.appendChild(document.createTextNode("Education:"));
            profile.appendChild(eduhead);
            let edu = document.createElement("p");
            edu.id = "edu";
            edu.appendChild(document.createTextNode(filterData[a].edu));
            profile.appendChild(edu);

            // User Edit Button
            let edit = document.createElement("i");
            edit.className = "fa fa-edit";
            edit.id = `edit${a}`;
            rightWrapper.appendChild(edit);

            // }



            // cONtROLLIN UPDATE FROM POPUP
            let update = document.getElementById("update");
            let i = document.getElementById(`edit${a}`);
            i.addEventListener("click", () => {
              update.style.display = "flex";

              // Fetching Data Accorrding To User ID
              fetch("http://localhost:3000/user").then((resp) => {
                resp.json().then((res) => {
                  res.forEach((element) => {
                    // console.log(element)
                    if (filterData[a].id === element.id) {
                      document.getElementById("username").value = element.name;
                      document.getElementById("useremail").value = element.email;
                      document.getElementById("usernumber").value = element.number;
                      document.getElementById("useraddress").value = element.address;
                      document.getElementById("userpassword").value =element.password;
                      document.getElementById("usertitle").value =element.title;
                      document.getElementById("userprofileImage").value = element.profileImage;
                      document.getElementById("userexp").value = element.exp;
                      document.getElementById("userskill").value =element.skill;
                      document.getElementById("useredu").value = element.edu;
                      document.getElementById("userabout").value = element.about;
                    }
                  });
                });
              });

              // Updating Profile Data
              let updateProfile = document.getElementById("updateProfile");
              updateProfile.addEventListener("click", (e) => {
                e.preventDefault();
                let name = document.getElementById("username").value;
                let title = document.getElementById("usertitle").value;
                let email = document.getElementById("useremail").value;
                let number = document.getElementById("usernumber").value;
                let address = document.getElementById("useraddress").value;
                let password = document.getElementById("userpassword").value;
                let profileImage =
                  document.getElementById("userprofileImage").value;
                let about = document.getElementById("userabout").value;
                let exp = document.getElementById("userexp").value;
                let skill = document.getElementById("userskill").value;
                let edu = document.getElementById("useredu").value;
                updateUser = {
                  name,
                  title,
                  email,
                  number,
                  address,
                  password,
                  about,
                  exp,
                  skill,
                  edu,
                  profileImage,
                };
                // console.log(updateUser)
                // localStorage.setItem('user',updateUser)
                fetch(`http://localhost:3000/user/${filterData[a].id}`, {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(updateUser),
                }).then((resp) => {
                  resp.json().then((resp) => {
                    // resp.forEach((item)=>{
                    //     item.title = title;
                    //     item.descripion = des;
                    //     item.code = code;
                    //     item.live = live;
                    //     item.imageUrl = imageUrl;
                    // })
                  });
                });
              });
            });

            //Close Button For PopUp
            let close = document.getElementById("close");
            close.addEventListener("click", () => {
              update.style.display = "none";
            });

            // Delete USer Button

            let del = document.createElement("i");
            del.className = "fa fa-trash";
            del.id = "del";
            rightWrapper.appendChild(del);

            // Delete User API
            let id = filterData[a].id; // Getting User Id which  I want To delete
            del.addEventListener("click", () => {
              fetch(`http://localhost:3000/user/${id}`, {
                method: "DELETE",
              }).then((resp) => {
                resp.json().then((r) => {});
              });
            });
          }
        }
      });
  }

  // Search button click event listener
  let searchIcon = document.getElementById("User");
  searchIcon.addEventListener("change", () => {
    let searchValue = document.getElementById("User").value;
    displayUser(searchValue);
  });

  // Initial display of all projects
  displayUser("");
});
