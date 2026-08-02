function login(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;


let role =
document.getElementById("role").value;



let users =
JSON.parse(localStorage.getItem("users")) || [];



let user =
users.find(
u =>
u.email===email &&
u.password===password &&
u.role===role
);



if(user){


localStorage.setItem(
"loggedUser",
JSON.stringify(user)
);



if(role==="parent"){

window.location.href=
"parent-dashboard.html";

}


else{

window.location.href=
"teacher-dashboard.html";

}


}


else{

alert("Invalid login details");

}


}
