/* =====================================================
   KID'S LOVE NURSERY
   TEACHER DASHBOARD JAVASCRIPT
===================================================== */


/* ===============================
CHECK TEACHER LOGIN
================================ */

let teacher = null;


document.addEventListener("DOMContentLoaded",()=>{


    teacher = JSON.parse(
        localStorage.getItem("loggedTeacher")
    );


    if(!teacher){

        alert("Please login first.");

        window.location.href="portal.html";

        return;

    }


    loadTeacherProfile();

    loadStudents();

    loadStatistics();


});



/* ===============================
LOAD TEACHER PROFILE
================================ */

function loadTeacherProfile(){


    if(!teacher) return;



    let fields = {

        teacherName: teacher.name || "Teacher",

        name: teacher.name || "-",

        email: teacher.email || "-",

        phone: teacher.phone || "-",

        subject: teacher.subject || "General"

    };



    Object.keys(fields).forEach(id=>{


        let element =
        document.getElementById(id);


        if(element){

            element.textContent =
            fields[id];

        }


    });



}



/* ===============================
LOAD STUDENTS
================================ */

function loadStudents(){


    let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];



    let table =
    document.getElementById("classTable");

    let studentBox =
    document.getElementById("students");



    if(!table) return;



    table.innerHTML="";



    if(studentBox){

        studentBox.innerHTML="";

    }




    if(students.length===0){


        table.innerHTML=`

        <tr>

        <td colspan="7">

        No students registered.

        </td>

        </tr>

        `;


        return;

    }



    students.forEach((student,index)=>{


        table.innerHTML += `

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



        if(studentBox){


        studentBox.innerHTML +=`

        <div class="student-card">

        <h4>${student.name}</h4>

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


        }


    });


}



/* ===============================
SEARCH STUDENTS
================================ */

function searchStudent(){


let input =
document.getElementById("searchStudent");


if(!input) return;



let value =
input.value.toLowerCase();



document.querySelectorAll("#classTable tr")
.forEach(row=>{


row.style.display =

row.textContent
.toLowerCase()
.includes(value)

?

""

:

"none";


});


}



/* ===============================
FILTER CLASS
================================ */

function filterStudents(){


let select =
document.getElementById("filterClass");


if(!select) return;



let selected =
select.value;



document.querySelectorAll("#classTable tr")
.forEach(row=>{


if(selected==="All"){

row.style.display="";

}

else{


let className =
row.cells[2]?.textContent;



row.style.display =

className===selected
?

""

:

"none";


}


});


}



/* ===============================
STATISTICS
================================ */

function loadStatistics(){


let students =
JSON.parse(
localStorage.getItem("students")
) || [];



let attendance =
JSON.parse(
localStorage.getItem("attendance")
) || [];



let total =
document.getElementById("totalStudents");

if(total){

total.textContent =
students.length;

}



let present=0;

let absent=0;



attendance.forEach(record=>{


if(record.status==="Present"){

present++;

}


if(record.status==="Absent"){

absent++;

}


});



let presentBox =
document.getElementById("presentToday");


let absentBox =
document.getElementById("absentToday");



if(presentBox){

presentBox.textContent=present;

}


if(absentBox){

absentBox.textContent=absent;

}


}



/* ===============================
LOGOUT
================================ */

function logout(){


let answer =
confirm(
"Are you sure you want to logout?"
);



if(answer){


localStorage.removeItem(
"loggedTeacher"
);


window.location.href=
"portal.html";


}


}
