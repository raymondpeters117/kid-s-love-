const teacher =
JSON.parse(localStorage.getItem("loggedTeacher"));


if(!teacher){

    alert("Please login first.");

    window.location.href="portal.html";

}/* =====================================================
   KID'S LOVE NURSERY
   TEACHER DASHBOARD JAVASCRIPT
===================================================== */


/* ===============================
   CHECK TEACHER LOGIN
================================ */

const teacher =
JSON.parse(localStorage.getItem("loggedTeacher"));


if(!teacher){

    alert("Please login first.");

    window.location.href="portal.html";

}


/* ===============================
   LOAD TEACHER PROFILE
================================ */

function loadTeacherProfile(){


    if(!teacher) return;


    document.getElementById("teacherName").textContent =
    teacher.name || "Teacher";


    document.getElementById("name").textContent =
    teacher.name || "-";


    document.getElementById("email").textContent =
    teacher.email || "-";


    document.getElementById("phone").textContent =
    teacher.phone || "-";


    document.getElementById("subject").textContent =
    teacher.subject || "General";


}



/* ===============================
   LOAD STUDENTS
================================ */

let students =
JSON.parse(localStorage.getItem("students")) || [];



function loadStudents(){


    let table =
    document.getElementById("classTable");


    let studentBox =
    document.getElementById("students");


    if(!table) return;



    table.innerHTML="";


    studentBox.innerHTML="";



    if(students.length===0){


        table.innerHTML=
        `
        <tr>
        <td colspan="7">
        No students registered.
        </td>
        </tr>
        `;


        studentBox.innerHTML=
        `
        <p class="empty-message">
        No students available
        </p>
        `;


        return;

    }




    students.forEach((student,index)=>{


        table.innerHTML +=

        `
        <tr>

        <td>${index+1}</td>

        <td>${student.name || "-"}</td>

        <td>${student.class || "-"}</td>

        <td>${student.age || "-"}</td>

        <td>${student.gender || "-"}</td>

        <td>${student.parent || "-"}</td>

        <td>${student.phone || "-"}</td>


        </tr>
        `;




        studentBox.innerHTML +=

        `
        <div class="student-card">

        <h4>
        ${student.name}
        </h4>

        <p>
        Class: ${student.class}
        </p>

        <p>
        Gender: ${student.gender}
        </p>

        <p>
        Parent: ${student.parent}
        </p>

        </div>
        `;



    });


}



/* ===============================
   SEARCH STUDENTS
================================ */

function searchStudent(){


    let search =
    document.getElementById("searchStudent")
    .value
    .toLowerCase();



    let rows =
    document.querySelectorAll("#classTable tr");



    rows.forEach(row=>{


        row.style.display =
        row.textContent
        .toLowerCase()
        .includes(search)
        ?
        ""
        :
        "none";


    });


}



/* ===============================
   FILTER BY CLASS
================================ */

function filterStudents(){


let selected =
document.getElementById("filterClass").value;



let rows =
document.querySelectorAll("#classTable tr");



rows.forEach(row=>{


if(selected==="All"){

row.style.display="";

}

else{


row.style.display =
row.cells[2] &&
row.cells[2].textContent===selected
?
""
:
"none";


}



});


}



/* ===============================
   DASHBOARD STATISTICS
================================ */

function loadStatistics(){


let total =
document.getElementById("totalStudents");


if(total){

total.textContent =
students.length;

}



let attendance =
JSON.parse(localStorage.getItem("attendance"))
|| [];



let present = 0;

let absent = 0;



attendance.forEach(record=>{


if(record.status==="Present"){

present++;

}


if(record.status==="Absent"){

absent++;

}


});



document.getElementById("presentToday")
.textContent = present;



document.getElementById("absentToday")
.textContent = absent;



}



/* ===============================
   LOGOUT
================================ */

function logout(){


let confirmLogout =
confirm("Logout from teacher portal?");



if(confirmLogout){


localStorage.removeItem("loggedTeacher");


window.location.href="portal.html";


}


}



/* ===============================
   START DASHBOARD
================================ */


document.addEventListener(
"DOMContentLoaded",
()=>{


loadTeacherProfile();

loadStudents();

loadStatistics();


});
