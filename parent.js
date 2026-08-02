// GET LOGGED USER


let user =
JSON.parse(
localStorage.getItem("loggedUser")
);



// Protect page

if(!user || user.role !== "parent"){

alert("Please login as a parent");

window.location.href="portal.html";

}





// Display parent data


document.getElementById("parentName").innerHTML =
user.name;


document.getElementById("name").innerHTML =
user.name;


document.getElementById("email").innerHTML =
user.email;


document.getElementById("phone").innerHTML =
user.phone;



// Child information


document.getElementById("childName").innerHTML =
user.child || "No child assigned";






// Logout


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="portal.html";


}





// PDF REPORT


function downloadReport(){


alert(
"Report card PDF will be generated soon"
);


}
