// CHECK LOGIN


let teacher =
JSON.parse(
localStorage.getItem("loggedUser")
);



if(!teacher || teacher.role !== "teacher"){

alert("Teacher login required");

window.location.href="portal.html";

}



// DISPLAY TEACHER


document.getElementById("teacherName").innerHTML =
teacher.name;


document.getElementById("name").innerHTML =
teacher.name;


document.getElementById("email").innerHTML =
teacher.email;


document.getElementById("phone").innerHTML =
teacher.phone;





// LOAD STUDENTS


let users =
JSON.parse(
localStorage.getItem("users")
) || [];



let parents =
users.filter(
user=>user.role==="parent"
);



let studentBox =
document.getElementById("students");



studentBox.innerHTML="";



parents.forEach(parent=>{


studentBox.innerHTML +=

`
<p>
👧 ${parent.child || "No child"}
</p>
`;



});







// SAVE ATTENDANCE


function saveAttendance(){


let attendance =
JSON.parse(
localStorage.getItem("attendance")
) || [];



let record={


student:
document.getElementById("studentName").value,


status:
document.getElementById("status").value,


date:
new Date().toLocaleDateString()


};



attendance.push(record);



localStorage.setItem(
"attendance",
JSON.stringify(attendance)
);



alert("Attendance saved");


}








// SAVE RESULTS


function saveResult(){


let results =
JSON.parse(
localStorage.getItem("results")
) || [];



let result={


student:
document.getElementById("resultStudent").value,


subject:
document.getElementById("subject").value,


marks:
document.getElementById("marks").value,


date:
new Date().toLocaleDateString()


};



results.push(result);



localStorage.setItem(
"results",
JSON.stringify(results)
);



alert("Result saved");


}







// LOGOUT


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="portal.html";


}
