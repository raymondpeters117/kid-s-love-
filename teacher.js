/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD JS

    PART 1
    LOGIN
    PROFILE
    STUDENTS
    SEARCH
    STATISTICS
=====================================================*/


// ================================
// GLOBAL VARIABLES
// ================================

let teacher = null;
let students = [];



// ================================
// CHECK LOGIN
// ================================

function checkTeacherLogin(){

    teacher = JSON.parse(
        localStorage.getItem("loggedTeacher")
    );


    if(!teacher){

        alert("Please login first.");

        window.location.href="portal.html";

        return false;
    }


    return true;
}




// ================================
// LOAD TEACHER PROFILE
// ================================

function loadTeacher(){


    if(!teacher)
    return;



    const elements = {

        teacherName:
        document.getElementById("teacherName"),

        name:
        document.getElementById("name"),

        email:
        document.getElementById("email"),

        phone:
        document.getElementById("phone")

    };



    if(elements.teacherName)

    elements.teacherName.textContent =
    teacher.name || "Teacher";



    if(elements.name)

    elements.name.textContent =
    teacher.name || "-";



    if(elements.email)

    elements.email.textContent =
    teacher.email || "-";



    if(elements.phone)

    elements.phone.textContent =
    teacher.phone || "-";



}




// ================================
// LOGOUT
// ================================

function logout(){


    if(confirm("Logout from teacher portal?")){


        localStorage.removeItem(
            "loggedTeacher"
        );


        window.location.href="portal.html";


    }


}




// ================================
// GET STUDENTS
// ================================

function getStudents(){


    students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


}




// ================================
// LOAD STUDENT CARDS
// ================================

function loadStudents(){


    const container =
    document.getElementById("students");



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
            <b>Class:</b>
            ${student.class || "-"}
            </p>


            <p>
            <b>Age:</b>
            ${student.age || "-"}
            </p>


            <p>
            <b>Gender:</b>
            ${student.gender || "-"}
            </p>


        </div>
        `;


    });



    updateStatistics();


}




// ================================
// LOAD CLASS TABLE
// ================================

function loadClassList(list = students){



    const table =
    document.getElementById("classTable");



    if(!table)
    return;



    table.innerHTML="";




    if(list.length===0){


        table.innerHTML=

        `
        <tr>

        <td colspan="7">
        No students found.
        </td>

        </tr>
        `;


        return;

    }





    list.forEach((student,index)=>{


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



    });



}




// ================================
// SEARCH STUDENTS
// ================================

function searchStudent(){


    const input =
    document.getElementById(
        "searchStudent"
    );



    if(!input)
    return;



    const keyword =
    input.value
    .toLowerCase()
    .trim();




    const filtered =

    students.filter(student=>{


        return (

            student.name &&
            student.name
            .toLowerCase()
            .includes(keyword)

        );


    });



    loadClassList(filtered);


}




// ================================
// FILTER CLASS
// ================================

function filterStudents(){


    const select =
    document.getElementById(
        "filterClass"
    );


    if(!select)
    return;



    let selected =
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



    loadClassList(filtered);


}




// ================================
// DASHBOARD STATISTICS
// ================================

function updateStatistics(){


    const total =
    document.getElementById(
        "totalStudents"
    );



    if(total)

    total.textContent =
    students.length;



    let attendance =

    JSON.parse(
        localStorage.getItem(
            "attendance"
        )
    ) || [];



    let present = 0;

    let absent = 0;



    const today =
    new Date()
    .toLocaleDateString();




    attendance.forEach(record=>{


        if(record.date === today){


            if(record.status==="Present")

            present++;


            else

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




// ================================
// REFRESH STUDENTS
// ================================

function refreshStudents(){


    getStudents();

    loadStudents();

    loadClassList();


}




// ================================
// START DASHBOARD
// ================================

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
    TEACHER DASHBOARD JS

    PART 2
    ATTENDANCE MANAGEMENT
=====================================================*/


// ================================
// ATTENDANCE DATA
// ================================

let attendance = [];




// ================================
// LOAD ATTENDANCE
// ================================

function loadAttendanceData(){


    attendance = JSON.parse(

        localStorage.getItem(
            "attendance"
        )

    ) || [];


}





// ================================
// SAVE ATTENDANCE
// ================================

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




    const name =
    studentInput.value
    .trim();



    const status =
    statusInput.value;



    if(name===""){


        alert(
            "Enter student name."
        );


        return;

    }




    const student =

    students.find(student=>


        student.name &&
        student.name
        .toLowerCase()
        ===
        name.toLowerCase()


    );





    if(!student){


        alert(
            "Student not found."
        );


        return;


    }





    loadAttendanceData();



    const today =

    new Date()
    .toLocaleDateString();





    const existing =

    attendance.find(record=>


        record.student === student.name

        &&

        record.date === today


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


    loadAttendanceHistory();


    updateStatistics();



    alert(
        "Attendance saved."
    );


}







// ================================
// DISPLAY ATTENDANCE HISTORY
// ================================

function loadAttendanceHistory(){


    const container =
    document.getElementById(
        "attendanceHistory"
    );



    if(!container)

    return;



    loadAttendanceData();




    if(attendance.length===0){


        container.innerHTML=

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

                <h4>
                ${record.student}
                </h4>


                <p>
                Class:
                ${record.class}
                </p>


                <small>
                ${record.date}
                </small>


            </div>




            <div>

                <span class="
                ${record.status.toLowerCase()}
                ">

                ${record.status}

                </span>


            </div>




            <div>


                <button onclick="
                editAttendance(${record.id})
                ">

                Edit

                </button>



                <button onclick="
                deleteAttendance(${record.id})
                ">

                Delete

                </button>



            </div>



        </div>


        `;


    });



    container.innerHTML =
    html;


}







// ================================
// EDIT ATTENDANCE
// ================================

function editAttendance(id){



    loadAttendanceData();



    const record =

    attendance.find(item=>

        item.id===id

    );



    if(!record)

    return;




    const newStatus =

    prompt(

        "Change status to Present or Absent",

        record.status

    );




    if(
        newStatus !== "Present"
        &&
        newStatus !== "Absent"
    )

    return;




    record.status =
    newStatus;



    localStorage.setItem(

        "attendance",

        JSON.stringify(
            attendance
        )

    );




    loadAttendanceHistory();


    updateStatistics();


}







// ================================
// DELETE ATTENDANCE
// ================================

function deleteAttendance(id){



    if(!confirm(
        "Delete attendance record?"
    ))

    return;




    loadAttendanceData();




    attendance =

    attendance.filter(record=>


        record.id !== id


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







// ================================
// MARK ALL PRESENT
// ================================

function markAllPresent(){



    loadAttendanceData();



    const today =

    new Date()
    .toLocaleDateString();





    students.forEach(student=>{



        const exists =

        attendance.find(record=>


            record.student === student.name

            &&

            record.date === today


        );





        if(!exists){



            attendance.push({


                id:
                Date.now()
                +
                Math.random(),


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







// ================================
// TODAY SUMMARY
// ================================

function attendanceSummary(){



    loadAttendanceData();



    const today =

    new Date()
    .toLocaleDateString();




    let present = 0;

    let absent = 0;




    attendance.forEach(record=>{


        if(record.date===today){


            if(record.status==="Present")

            present++;


            else

            absent++;


        }


    });




    return {

        present,

        absent

    };


}







// ================================
// LOAD WHEN DASHBOARD OPENS
// ================================

document.addEventListener(

"DOMContentLoaded",

()=>{


    if(!teacher)

    return;



    loadAttendanceData();


    loadAttendanceHistory();



});
/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD JS

    PART 3
    RESULTS
    REPORT CARDS
    ANNOUNCEMENTS
=====================================================*/



// ================================
// RESULTS DATA
// ================================

let results = [];




// ================================
// LOAD RESULTS
// ================================

function loadResultsData(){


    results = JSON.parse(

        localStorage.getItem(
            "results"
        )

    ) || [];


}







// ================================
// SAVE RESULT
// ================================

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





    if(
        !studentInput ||
        !subjectInput ||
        !marksInput
    )

    return;





    const studentName =
    studentInput.value.trim();



    const subject =
    subjectInput.value.trim();



    const marks =
    Number(
        marksInput.value
    );



    const comment =
    commentInput ?
    commentInput.value.trim()
    :
    "";





    if(
        studentName==="" ||
        subject==="" ||
        !marks
    ){


        alert(
            "Fill all required fields."
        );


        return;

    }







    const student =

    students.find(student=>


        student.name &&
        student.name
        .toLowerCase()
        ===
        studentName
        .toLowerCase()


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
        marks,


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








// ================================
// DISPLAY RESULTS
// ================================

function loadResults(){



    const container =
    document.getElementById(
        "resultsHistory"
    );



    if(!container)

    return;




    loadResultsData();





    if(results.length===0){


        container.innerHTML=

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



            <br>


            <button onclick="
            deleteResult(${result.id})
            ">

            Delete

            </button>


        </div>


        `;



    });




    container.innerHTML =
    html;


}







// ================================
// DELETE RESULT
// ================================

function deleteResult(id){



    if(!confirm(
        "Delete this result?"
    ))

    return;




    loadResultsData();




    results =

    results.filter(result=>


        result.id !== id


    );




    localStorage.setItem(

        "results",

        JSON.stringify(
            results
        )

    );




    loadResults();


}








// ================================
// GENERATE REPORT CARD
// ================================

function generateReport(){



    const input =
    document.getElementById(
        "reportStudent"
    );



    if(!input)

    return;




    const name =
    input.value.trim();





    if(name===""){


        alert(
            "Enter student name."
        );


        return;

    }







    loadResultsData();





    const studentResults =

    results.filter(result=>


        result.student
        .toLowerCase()
        ===
        name
        .toLowerCase()


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
STUDENT REPORT CARD


Student:
${name}


`;






    studentResults.forEach(result=>{


        report +=


`
------------------------

Subject:
${result.subject}

Marks:
${result.marks}%

Teacher Comment:
${result.comment || "-"}


`;



    });







    downloadReportPDF(
        name,
        report
    );



}








// ================================
// DOWNLOAD PDF REPORT
// ================================

function downloadReportPDF(
    student,
    text
){



    const blob =

    new Blob(

        [text],

        {
            type:
            "application/pdf"
        }

    );




    const url =
    URL.createObjectURL(blob);



    const link =
    document.createElement("a");



    link.href=url;



    link.download =
    student
    +
    "_Report_Card.pdf";



    link.click();



    URL.revokeObjectURL(url);


}









// ================================
// ANNOUNCEMENTS
// ================================

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
            "Write announcement."
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


        id:
        Date.now(),


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



}









// ================================
// SHOW ANNOUNCEMENTS
// ================================

function loadAnnouncements(){



    const container =
    document.getElementById(
        "announcementList"
    );



    if(!container)

    return;





    let announcements =

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





    container.innerHTML="";





    announcements
    .slice()
    .reverse()
    .forEach(item=>{



        container.innerHTML +=


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


}







// ================================
// FINAL INITIALIZATION
// ================================

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
