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
// LOAD ATTENDANCE


let attendance =
JSON.parse(
localStorage.getItem("attendance")
) || [];



let attendanceBox =
document.getElementById("attendance");



let childAttendance =
attendance.filter(
item =>
item.student === user.child
);




if(childAttendance.length===0){


attendanceBox.innerHTML =
"No attendance records yet";


}

else{


attendanceBox.innerHTML="";


childAttendance.forEach(item=>{


attendanceBox.innerHTML +=

`
<p>
📅 ${item.date}
<br>
Status:
<b>${item.status}</b>

<br>
Teacher:
${item.teacher}

</p>
<hr>
`;



});


}





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
