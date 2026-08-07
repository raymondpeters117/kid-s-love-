// ==========================================
// KID'S LOVE NURSERY
// TEACHER DASHBOARD JS
// ==========================================

let teacher = null;
let students = [];
let attendance = [];
let results = [];


// ==========================================
// CHECK TEACHER LOGIN
// ==========================================

function checkTeacherLogin() {

    const savedTeacher = localStorage.getItem("loggedTeacher");

    if (!savedTeacher) {

        alert("Please login first.");
        window.location.href = "portal.html";
        return false;
    }


    try {

        teacher = JSON.parse(savedTeacher);


        if (!teacher || !teacher.email) {

            throw new Error("Invalid teacher data");
        }


    } catch(error) {

        console.error(error);

        localStorage.removeItem("loggedTeacher");

        alert("Your login session expired.");

        window.location.href = "portal.html";

        return false;
    }


    return true;
}



// ==========================================
// LOAD TEACHER PROFILE
// ==========================================

function loadTeacherProfile() {


    if (!teacher) return;


    const teacherName =
        document.getElementById("teacherName");


    const name =
        document.getElementById("name");


    const email =
        document.getElementById("email");


    const phone =
        document.getElementById("phone");


    const subject =
        document.getElementById("subject");



    if (teacherName)
        teacherName.textContent = teacher.name || "Teacher";


    if (name)
        name.textContent = teacher.name || "-";


    if (email)
        email.textContent = teacher.email || "-";


    if (phone)
        phone.textContent = teacher.phone || "-";


    if (subject)
        subject.textContent = teacher.subject || "-";

}



// ==========================================
// LOAD STUDENTS
// ==========================================

function loadStudents(){

    students =
    JSON.parse(localStorage.getItem("students")) || [];


    console.log("Students:", students);

}



// ==========================================
// LOAD ATTENDANCE
// ==========================================

function loadAttendance(){

    attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];


    console.log("Attendance:", attendance);

}



// ==========================================
// LOAD RESULTS
// ==========================================

function loadResults(){

    results =
    JSON.parse(localStorage.getItem("results")) || [];


    console.log("Results:", results);

}



// ==========================================
// DISPLAY SUMMARY
// ==========================================

function loadDashboardSummary(){


    const studentCount =
    document.getElementById("studentCount");


    const attendanceCount =
    document.getElementById("attendanceCount");


    const resultCount =
    document.getElementById("resultCount");



    if(studentCount)
        studentCount.textContent = students.length;


    if(attendanceCount)
        attendanceCount.textContent = attendance.length;


    if(resultCount)
        resultCount.textContent = results.length;

}



// ==========================================
// LOGOUT
// ==========================================

function logout(){


    const confirmLogout =
    confirm("Logout from teacher portal?");


    if(!confirmLogout)
        return;


    localStorage.removeItem("loggedTeacher");


    window.location.href="portal.html";

}



// ==========================================
// START DASHBOARD
// ==========================================


document.addEventListener("DOMContentLoaded",()=>{


    if(!checkTeacherLogin())
        return;


    loadTeacherProfile();


    loadStudents();


    loadAttendance();


    loadResults();


    loadDashboardSummary();



    console.log(
        "Logged Teacher:",
        teacher
    );

});
