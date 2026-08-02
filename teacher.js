// =======================================
// KID'S LOVE NURSERY
// TEACHER DASHBOARD JAVASCRIPT
// =======================================



// CHECK TEACHER LOGIN

let teacher = JSON.parse(
    localStorage.getItem("loggedUser")
);



if(!teacher || teacher.role !== "teacher"){

    alert("Teacher login required");

    window.location.href = "portal.html";

}



// =======================================
// DISPLAY TEACHER INFORMATION
// =======================================


document.getElementById("teacherName").innerHTML =
teacher.name;


document.getElementById("name").innerHTML =
teacher.name;


document.getElementById("email").innerHTML =
teacher.email;


document.getElementById("phone").innerHTML =
teacher.phone || "Not Provided";




// =======================================
// LOAD STUDENTS
// =======================================


let users = JSON.parse(
    localStorage.getItem("users")
) || [];



let parents = users.filter(
    user => user.role === "parent"
);



let studentBox =
document.getElementById("students");



if(parents.length === 0){

    studentBox.innerHTML =
    "No students registered yet";

}

else{


studentBox.innerHTML="";


parents.forEach(parent=>{


studentBox.innerHTML +=

`
<div class="student">

<p>
👧 <b>${parent.child || "No child name"}</b>
</p>

<p>
Parent:
${parent.name}
</p>

</div>

<hr>

`;



});


}






// =======================================
// SAVE ATTENDANCE
// =======================================


function saveAttendance(){


let student =
document.getElementById("studentName").value;



let status =
document.getElementById("status").value;



if(student===""){


alert("Enter student name");

return;

}



let attendance =
JSON.parse(
localStorage.getItem("attendance")
) || [];




let record = {


student: student,


status: status,


date: new Date().toLocaleDateString(),


teacher: teacher.name


};




attendance.push(record);



localStorage.setItem(

"attendance",

JSON.stringify(attendance)

);




alert("Attendance saved successfully");



document.getElementById("studentName").value="";


}







// =======================================
// SAVE STUDENT RESULTS
// =======================================


function saveResult(){



let student =
document.getElementById("resultStudent").value;



let subject =
document.getElementById("subject").value;



let marks =
document.getElementById("marks").value;



let comment =
document.getElementById("comment").value;




if(
student==="" ||
subject==="" ||
marks===""

){


alert("Please complete all result fields");

return;


}




let results =
JSON.parse(
localStorage.getItem("results")
) || [];





let result = {


student:student,


subject:subject,


marks:marks,


comment:comment,


teacher:teacher.name,


date:new Date().toLocaleDateString()


};





results.push(result);



localStorage.setItem(

"results",

JSON.stringify(results)

);




alert("Result uploaded successfully");



document.getElementById("resultStudent").value="";

document.getElementById("subject").value="";

document.getElementById("marks").value="";

document.getElementById("comment").value="";



}







// =======================================
// LOGOUT
// =======================================


function logout(){


localStorage.removeItem(
"loggedUser"
);


window.location.href="portal.html";


}
