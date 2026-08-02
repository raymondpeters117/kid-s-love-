function registerUser(){


let name =
document.getElementById("name").value;


let email =
document.getElementById("email").value;


let phone =
document.getElementById("phone").value;


let password =
document.getElementById("password").value;


let role =
document.getElementById("role").value;


let child =
document.getElementById("child").value;



// Check empty fields

if(
name==="" ||
email==="" ||
password===""
){

alert("Please fill all required fields");

return;

}




// Get existing users

let users =
JSON.parse(
localStorage.getItem("users")
) || [];





// Check duplicate email


let existingUser =
users.find(
user=>user.email===email
);



if(existingUser){


alert(
"Account already exists with this email"
);


return;

}





// Create new user


let newUser={


id:Date.now(),


name:name,


email:email,


phone:phone,


password:password,


role:role,


child:role==="parent" ? child : null,


createdAt:new Date().toLocaleDateString()


};






// Save user


users.push(newUser);



localStorage.setItem(
"users",
JSON.stringify(users)
);




alert(
"Account created successfully!"
);



// Go to login

window.location.href="portal.html";



}
