let image = document.getElementById("uploadButton");
let nameUser = document.getElementById("name");
let email = document.getElementById("email");
let gitHub = document.getElementById("username");
let uploadLogo = document.getElementById("upload-logo");
let profileAva = document.getElementById("profile-ava");

function submit(event){
    let maxSize =  500 * 1024;
    let hasError = false;
    let file = image.files[0];
    if(!image.value.trim()){
        document.getElementById("text-upload").textContent = "Fill please your profile";
        document.getElementById("text-upload").style.color = "hsl(7, 71%, 60%)";
        document.getElementById("text-upload").style.fontSize = "16px";
        document.getElementById("img-upload-container").style.border = "1px solid hsl(7, 71%, 60%)";
        hasError = true;
    }
    if(file.size > maxSize){
        document.getElementById("text-upload").textContent = "Please can you put image below or equal to 500KB";
        document.getElementById("text-upload").style.color = "hsl(7, 71%, 60%)";
        document.getElementById("text-upload").style.fontSize = "16px";
        document.getElementById("img-upload-container").style.border = "1px solid hsl(7, 71%, 60%)";
        hasError = true;
    }
    
    if(!nameUser.value.trim()){
        document.getElementById("name-error").textContent = "Please fill the form";
        document.getElementById("name-error").style.color = "hsl(7, 71%, 60%)";
        document.getElementById("name-error").style.fontSize = "16px";
        document.getElementById("name").style.border = "1px solid hsl(7, 71%, 60%)";
        hasError = true;
    }
    if(!nameUser.value.trim() && !email.value.trim() && !gitHub.value.trim() && (!email.value.trim)){
       alert("Try to fill form later");
    }
    if(!email.value.trim()){
        document.getElementById("email-error").textContent = "Please fill the email correctly ";
        document.getElementById("email-error").style.color = "hsl(7, 71%, 60%)";
        document.getElementById("email-error").style.fontSize = "16px";
        document.getElementById("email").style.border = "1px solid hsl(7, 71%, 60%)";
        hasError = true;
    }
    if(!gitHub.value.trim()){
        document.getElementById("username-error").textContent = "Please fill the email correctly ";
        document.getElementById("username-error").style.color = "hsl(7, 71%, 60%)";
        document.getElementById("username-error").style.fontSize = "16px";
        document.getElementById("username").style.border = "1px solid hsl(7, 71%, 60%)";
        hasError = true;
    }
    if(nameUser.value.trim() && email.value.trim() && gitHub.value.trim() && image.value.trim() && file.size < maxSize ) {
        alert("success");
        let newLogo = new FileReader();
        let file = image.files[0];
        newLogo.addEventListener(
            "load",
            () => {
                uploadLogo.src = newLogo.result;
                profileAva.src = newLogo.result;
            },
            false,
        );
        if(file){
            newLogo.readAsDataURL(file);
        }
        document.getElementById("container-main-form").style.display="none";
        document.getElementById("ticket").style.display="flex";
        document.getElementById("name-ticket").textContent =nameUser.value;
        document.getElementById("github-ticket").textContent = gitHub.value;
        random();
        
    }
}
function random(){
    let arrayCode = ["#"];
    for(let i =0; i < 5;i++){
       let x =  Math.floor(Math.random() * 10)
       arrayCode.push(x);
    
    }
    document.getElementById("text-code").textContent = arrayCode.join("");
}

