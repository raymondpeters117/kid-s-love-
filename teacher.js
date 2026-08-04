/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD
    PART 1 (RECREATED)
    LOGIN • PROFILE • STUDENTS • STATISTICS
=====================================================*/


// =====================================
// GLOBAL DATA
// =====================================

let teacher = null;

let students = [];




// =====================================
// CHECK TEACHER LOGIN
// =====================================


function checkTeacherLogin(){


    teacher = JSON.parse(
        localStorage.getItem("loggedTeacher")
    );



    if(!teacher){


        alert(
            "Please login first."
        );


        window.location.href =
        "portal.html";


        return false;


    }


    return true;


}






// =====================================
// LOAD TEACHER PROFILE
// =====================================


function loadTeacher(){


    if(!teacher)
    return;



    const teacherName =
    document.getElementById(
        "teacherName"
    );


    const name =
    document.getElementById(
        "name"
    );


    const email =
    document.getElementById(
        "email"
    );


    const phone =
    document.getElementById(
        "phone"
    );





    if(teacherName)

    teacherName.textContent =
    teacher.name || "Teacher";





    if(name)

    name.textContent =
    teacher.name || "-";





    if(email)

    email.textContent =
    teacher.email || "-";





    if(phone)

    phone.textContent =
    teacher.phone || "-";



}






// =====================================
// LOGOUT
// =====================================


function logout(){



    const confirmLogout =
    confirm(
        "Logout from teacher portal?"
    );



    if(confirmLogout){


        localStorage.removeItem(
            "loggedTeacher"
        );


        window.location.href =
        "portal.html";


    }


}






// =====================================
// LOAD STUDENTS FROM STORAGE
// =====================================


function getStudents(){



    students = JSON.parse(

        localStorage.getItem(
            "students"
        )

    ) || [];



}






// =====================================
// DISPLAY STUDENT CARDS
// =====================================


function loadStudents(){



    const container =
    document.getElementById(
        "students"
    );



    if(!container)
    return;





    container.innerHTML="";





    if(students.length===0){


        container.innerHTML =

        `
        <p>
        No students registered.
        </p>
        `;


        updateStatistics();

        return;


    }





    students.forEach(student=>{


        container.innerHTML +=


        `

        <div class="student-card">


            <h4>
            ${student.name || "-"}
            </h4>


            <p>

            <strong>
            Class:
            </strong>

            ${student.class || "-"}

            </p>



            <p>

            <strong>
            Age:
            </strong>

            ${student.age || "-"}

            </p>


        </div>


        `;



    });





    updateStatistics();



}






// =====================================
// CLASS TABLE
// =====================================


function loadClassList(
    list = students
){



    const table =
    document.getElementById(
        "classTable"
    );



    if(!table)
    return;





    table.innerHTML="";





    if(list.length===0){


        table.innerHTML =


        `

        <tr>

        <td colspan="7">

        No students found.

        </td>

        </tr>

        `;


        return;


    }






    list.forEach(
    (student,index)=>{



        table.innerHTML +=


        `

        <tr>


        <td>
        ${index+1}
        </td>


        <td>
        ${student.name || "-"}
        </td>


        <td>
        ${student.class || "-"}
        </td>


        <td>
        ${student.age || "-"}
        </td>


        <td>
        ${student.gender || "-"}
        </td>


        <td>
        ${student.parent || "-"}
        </td>


        <td>
        ${student.phone || "-"}
        </td>


        </tr>


        `;



    });



}






// =====================================
// SEARCH STUDENTS
// =====================================


function searchStudent(){



    const input =
    document.getElementById(
        "searchStudent"
    );



    if(!input)
    return;





    const keyword =
    input.value
    .toLowerCase();





    const filtered =

    students.filter(student=>{


        return student.name
        .toLowerCase()
        .includes(keyword);


    });





    loadClassList(
        filtered
    );



}






// =====================================
// FILTER BY CLASS
// =====================================


function filterStudents(){



    const select =
    document.getElementById(
        "filterClass"
    );



    if(!select)
    return;





    const selected =
    select.value;





    if(selected==="All"){


        loadClassList(
            students
        );


        return;


    }






    const filtered =

    students.filter(student=>{


        return student.class === selected;


    });





    loadClassList(
        filtered
    );



}






// =====================================
// DASHBOARD STATISTICS
// =====================================


function updateStatistics(){



    const total =
    document.getElementById(
        "totalStudents"
    );



    if(total)

    total.textContent =
    students.length;







    const attendance =

    JSON.parse(

        localStorage.getItem(
            "attendance"
        )

    ) || [];





    let present = 0;

    let absent = 0;





    attendance.forEach(record=>{


        if(record.status==="Present"){


            present++;


        }

        else{


            absent++;


        }


    });







    const presentBox =
    document.getElementById(
        "presentToday"
    );



    const absentBox =
    document.getElementById(
        "absentToday"
    );






    if(presentBox)

    presentBox.textContent =
    present;





    if(absentBox)

    absentBox.textContent =
    absent;



}






// =====================================
// REFRESH DATA
// =====================================


function refreshStudents(){



    getStudents();


    loadStudents();


    loadClassList();


}






// =====================================
// START PART 1
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{


    if(!checkTeacherLogin())

    return;



    loadTeacher();


    refreshStudents();



});
/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD
    PART 2
    ATTENDANCE MANAGEMENT
=====================================================*/



// =====================================
// ATTENDANCE DATA
// =====================================


let attendance = [];





function loadAttendanceData(){


    attendance = JSON.parse(

        localStorage.getItem(
            "attendance"
        )

    ) || [];


}






// =====================================
// SAVE ATTENDANCE
// =====================================


function saveAttendance(){



    const studentInput =
    document.getElementById(
        "studentName"
    );


    const statusInput =
    document.getElementById(
        "status"
    );



    if(!studentInput || !statusInput)

    return;





    const studentName =
    studentInput.value.trim();



    const status =
    statusInput.value;





    if(studentName===""){


        alert(
            "Enter student name."
        );


        return;


    }






    const student =

    students.find(s=>


        s.name.toLowerCase()
        ===
        studentName.toLowerCase()


    );





    if(!student){


        alert(
            "Student not found."
        );


        return;


    }







    const today =

    new Date()
    .toLocaleDateString();






    const existing =

    attendance.find(record=>


        record.student.toLowerCase()
        ===
        student.name.toLowerCase()

        &&

        record.date===today


    );





    if(existing){


        existing.status =
        status;


    }

    else{



        attendance.push({


            id:
            Date.now(),


            student:
            student.name,


            class:
            student.class || "-",


            status:
            status,


            date:
            today



        });


    }






    localStorage.setItem(

        "attendance",

        JSON.stringify(
            attendance
        )

    );







    studentInput.value="";


    statusInput.selectedIndex=0;





    loadAttendanceHistory();


    updateStatistics();





    alert(
        "Attendance saved."
    );



}






// =====================================
// DISPLAY ATTENDANCE HISTORY
// =====================================


function loadAttendanceHistory(){



    const container =
    document.getElementById(
        "attendanceHistory"
    );



    if(!container)

    return;





    loadAttendanceData();





    if(attendance.length===0){



        container.innerHTML =

        `

        <p>
        No attendance records.
        </p>

        `;


        return;


    }






    let html="";





    attendance
    .slice()
    .reverse()
    .forEach(record=>{





        html +=


        `

        <div class="attendance-item">


            <div>


                <strong>

                ${record.student}

                </strong>


                <br>


                <small>

                Class:
                ${record.class}

                </small>


                <br>


                <small>

                ${record.date}

                </small>


            </div>




            <div>


                <span class="${record.status.toLowerCase()}">

                ${record.status}

                </span>


            </div>




            <div>


                <button onclick="editAttendance(${record.id})">

                Edit

                </button>





                <button onclick="deleteAttendance(${record.id})">

                Delete

                </button>


            </div>



        </div>


        `;



    });





    container.innerHTML =
    html;



}







// =====================================
// EDIT ATTENDANCE
// =====================================


function editAttendance(id){



    loadAttendanceData();





    const record =

    attendance.find(item=>

        item.id===id

    );





    if(!record)

    return;






    const status =

    prompt(

        "Enter Present or Absent",

        record.status

    );





    if(!status)

    return;





    record.status =
    status;





    localStorage.setItem(

        "attendance",

        JSON.stringify(
            attendance
        )

    );





    loadAttendanceHistory();


    updateStatistics();



}







// =====================================
// DELETE ATTENDANCE
// =====================================


function deleteAttendance(id){



    if(!confirm(

        "Delete this attendance?"

    ))

    return;






    loadAttendanceData();





    attendance =

    attendance.filter(record=>


        record.id!==id


    );







    localStorage.setItem(

        "attendance",

        JSON.stringify(
            attendance
        )

    );






    loadAttendanceHistory();


    updateStatistics();



}






// =====================================
// MARK ALL STUDENTS PRESENT
// =====================================


function markAllPresent(){



    loadAttendanceData();





    const today =

    new Date()
    .toLocaleDateString();





    students.forEach(student=>{



        const exists =

        attendance.find(record=>


            record.student===student.name

            &&

            record.date===today


        );





        if(!exists){



            attendance.push({



                id:
                Date.now()+Math.random(),


                student:
                student.name,


                class:
                student.class || "-",


                status:
                "Present",


                date:
                today



            });



        }



    });






    localStorage.setItem(

        "attendance",

        JSON.stringify(
            attendance
        )

    );





    loadAttendanceHistory();


    updateStatistics();





    alert(
        "All students marked Present."
    );



}






// =====================================
// TODAY SUMMARY
// =====================================


function attendanceSummary(){



    loadAttendanceData();





    const today =

    new Date()
    .toLocaleDateString();





    let present=0;

    let absent=0;





    attendance.forEach(record=>{


        if(record.date===today){



            if(record.status==="Present")

            present++;


            else

            absent++;


        }



    });





    console.log(
        "Today's Present:",
        present
    );



    console.log(
        "Today's Absent:",
        absent
    );



}






// =====================================
// START PART 2
// =====================================


document.addEventListener(

"DOMContentLoaded",

()=>{


    if(!teacher)

    return;



    loadAttendanceData();


    loadAttendanceHistory();


    attendanceSummary();



});
/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD
    PART 3
    RESULTS • REPORTS • ANNOUNCEMENTS
=====================================================*/



// =====================================
// RESULTS STORAGE
// =====================================


let results = [];





function loadResultsData(){


    results = JSON.parse(

        localStorage.getItem(
            "results"
        )

    ) || [];


}






// =====================================
// SAVE RESULTS
// =====================================


function saveResult(){



    const studentInput =
    document.getElementById(
        "resultStudent"
    );


    const subjectInput =
    document.getElementById(
        "subject"
    );


    const marksInput =
    document.getElementById(
        "marks"
    );


    const commentInput =
    document.getElementById(
        "comment"
    );





    if(!studentInput ||
       !subjectInput ||
       !marksInput)

    return;







    const studentName =
    studentInput.value.trim();



    const subject =
    subjectInput.value.trim();



    const marks =
    marksInput.value.trim();



    const comment =
    commentInput ?
    commentInput.value.trim()
    :
    "";







    if(
        studentName==="" ||
        subject==="" ||
        marks===""

    ){


        alert(
            "Complete required fields."
        );


        return;


    }






    const student =

    students.find(s=>


        s.name.toLowerCase()
        ===
        studentName.toLowerCase()


    );






    if(!student){


        alert(
            "Student not found."
        );


        return;


    }







    loadResultsData();





    results.push({


        id:
        Date.now(),


        student:
        student.name,


        subject:
        subject,


        marks:
        Number(marks),


        comment:
        comment,


        date:
        new Date()
        .toLocaleDateString()



    });







    localStorage.setItem(

        "results",

        JSON.stringify(
            results
        )

    );






    studentInput.value="";

    subjectInput.value="";

    marksInput.value="";



    if(commentInput)

    commentInput.value="";





    loadResults();



    alert(
        "Result saved successfully."
    );



}







// =====================================
// DISPLAY RESULTS
// =====================================


function loadResults(){



    const container =
    document.getElementById(
        "resultsHistory"
    );



    if(!container)

    return;





    loadResultsData();






    if(results.length===0){



        container.innerHTML =

        `

        <p>
        No results available.
        </p>

        `;


        return;


    }







    let html="";






    results
    .slice()
    .reverse()
    .forEach(result=>{





        html +=


        `

        <div class="result-card">


            <h4>

            ${result.student}

            </h4>



            <p>

            Subject:
            ${result.subject}

            </p>




            <p>

            Marks:
            ${result.marks}%

            </p>




            <p>

            Comment:
            ${result.comment || "-"}

            </p>



            <small>

            ${result.date}

            </small>


        </div>


        `;



    });






    container.innerHTML =
    html;



}







// =====================================
// GENERATE REPORT CARD
// =====================================


function generateReport(){



    const input =
    document.getElementById(
        "reportStudent"
    );



    if(!input)

    return;





    const studentName =
    input.value.trim();






    if(studentName===""){


        alert(
            "Enter student name."
        );


        return;


    }







    loadResultsData();






    const studentResults =

    results.filter(result=>


        result.student.toLowerCase()
        ===
        studentName.toLowerCase()


    );






    if(studentResults.length===0){


        alert(
            "No results found."
        );


        return;


    }







    let report =

`
KID'S LOVE NURSERY
REPORT CARD


Student:
${studentName}


`;







    studentResults.forEach(result=>{



        report +=

`

Subject:
${result.subject}

Marks:
${result.marks}%

Comment:
${result.comment}


--------------------


`;



    });






    alert(report);



}








// =====================================
// ANNOUNCEMENTS
// =====================================


function postAnnouncement(){



    const input =
    document.getElementById(
        "announcement"
    );



    if(!input)

    return;







    const message =
    input.value.trim();







    if(message===""){


        alert(
            "Write announcement first."
        );


        return;


    }






    let announcements =

    JSON.parse(

        localStorage.getItem(
            "announcements"
        )

    ) || [];






    announcements.push({


        message:
        message,


        date:
        new Date()
        .toLocaleString()



    });






    localStorage.setItem(

        "announcements",

        JSON.stringify(
            announcements
        )

    );






    input.value="";





    loadAnnouncements();




    alert(
        "Announcement posted."
    );



}







// =====================================
// DISPLAY ANNOUNCEMENTS
// =====================================


function loadAnnouncements(){



    const container =
    document.getElementById(
        "announcementList"
    );



    if(!container)

    return;







    const announcements =

    JSON.parse(

        localStorage.getItem(
            "announcements"
        )

    ) || [];







    if(announcements.length===0){



        container.innerHTML=

        `

        <p>
        No announcements.
        </p>

        `;


        return;


    }







    let html="";






    announcements
    .slice()
    .reverse()
    .forEach(item=>{



        html +=


        `

        <div class="announcement-card">


            <p>

            ${item.message}

            </p>



            <small>

            ${item.date}

            </small>


        </div>


        `;



    });






    container.innerHTML =
    html;



}







// =====================================
// FINAL DASHBOARD INITIALIZATION
// =====================================


function initializeDashboard(){



    if(!teacher)

    return;





    loadTeacher();


    refreshStudents();


    loadAttendanceHistory();


    loadResults();


    loadAnnouncements();


    updateStatistics();



}






document.addEventListener(

"DOMContentLoaded",

()=>{


    initializeDashboard();


});
