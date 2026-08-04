/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD
    PART 1
=====================================================*/


// ===============================
// LOGIN CHECK
// ===============================

const teacher = JSON.parse(localStorage.getItem("loggedTeacher"));

if (!teacher) {

    alert("Please login first.");

    window.location.href = "portal.html";

}



// ===============================
// LOAD PROFILE
// ===============================

function loadTeacher() {

    document.getElementById("teacherName").textContent =
        teacher.name || "Teacher";

    document.getElementById("name").textContent =
        teacher.name || "-";

    document.getElementById("email").textContent =
        teacher.email || "-";

    document.getElementById("phone").textContent =
        teacher.phone || "-";

}



// ===============================
// LOGOUT
// ===============================

function logout() {

    if (confirm("Logout from teacher portal?")) {

        localStorage.removeItem("loggedTeacher");

        window.location.href = "portal.html";

    }

}



// ===============================
// LOAD REGISTERED STUDENTS
// ===============================

let students =
JSON.parse(localStorage.getItem("students")) || [];



// ===============================
// DASHBOARD STUDENT SUMMARY
// ===============================

function loadStudents() {

    const container =
    document.getElementById("students");

    container.innerHTML = "";

    if (students.length === 0) {

        container.innerHTML =

        `
        <p>No students registered.</p>
        `;

        updateStatistics();

        return;

    }

    students.forEach((student,index)=>{

        container.innerHTML +=

        `
        <div class="student-card">

            <h4>${student.name}</h4>

            <p>
            <strong>Class:</strong>
            ${student.class}
            </p>

            <p>
            <strong>Age:</strong>
            ${student.age}
            </p>

        </div>
        `;

    });

    updateStatistics();

}



// ===============================
// CLASS LIST
// ===============================

function loadClassList(list = students){

    const table =
    document.getElementById("classTable");

    if(!table) return;

    table.innerHTML = "";

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

    list.forEach((student,index)=>{

        table.innerHTML +=

        `
        <tr>

        <td>${index+1}</td>

        <td>${student.name}</td>

        <td>${student.class}</td>

        <td>${student.age}</td>

        <td>${student.gender}</td>

        <td>${student.parent}</td>

        <td>${student.phone}</td>

        </tr>
        `;

    });

}



// ===============================
// SEARCH STUDENTS
// ===============================

function searchStudent(){

    const keyword =

    document.getElementById("searchStudent")

    .value

    .toLowerCase();

    const filtered = students.filter(student =>

        student.name
        .toLowerCase()
        .includes(keyword)

    );

    loadClassList(filtered);

}



// ===============================
// FILTER BY CLASS
// ===============================

function filterStudents(){

    const selected =

    document.getElementById("filterClass")

    .value;

    if(selected==="All"){

        loadClassList(students);

        return;

    }

    const filtered =

    students.filter(student=>{

        return student.class===selected;

    });

    loadClassList(filtered);

}



// ===============================
// DASHBOARD STATISTICS
// ===============================

function updateStatistics(){

    document.getElementById("totalStudents").textContent =

    students.length;

    const attendance =

    JSON.parse(localStorage.getItem("attendance"))

    || [];

    let present = 0;

    let absent = 0;

    attendance.forEach(record=>{

        if(record.status==="Present"){

            present++;

        }else{

            absent++;

        }

    });

    document.getElementById("presentToday").textContent =

    present;

    document.getElementById("absentToday").textContent =

    absent;

}



// ===============================
// REFRESH STUDENTS
// ===============================

function refreshStudents(){

    students =

    JSON.parse(localStorage.getItem("students"))

    || [];

    loadStudents();

    loadClassList();

}



// ===============================
// INITIALIZE
// ===============================

loadTeacher();

refreshStudents();
/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD
    PART 2
    ATTENDANCE MANAGEMENT
=====================================================*/


// =====================================
// ATTENDANCE STORAGE
// =====================================

let attendance = JSON.parse(localStorage.getItem("attendance")) || [];



// =====================================
// SAVE ATTENDANCE
// =====================================

function saveAttendance() {

    const studentName = document.getElementById("studentName").value.trim();

    const status = document.getElementById("status").value;

    if (studentName === "") {

        alert("Enter student name.");

        return;

    }

    // Check if student exists
    const student = students.find(s =>
        s.name.toLowerCase() === studentName.toLowerCase()
    );

    if (!student) {

        alert("Student not found.");

        return;

    }

    const today = new Date().toLocaleDateString();

    // Prevent duplicate attendance for same day
    const existing = attendance.find(record =>
        record.student.toLowerCase() === studentName.toLowerCase() &&
        record.date === today
    );

    if (existing) {

        existing.status = status;

    } else {

        attendance.push({

            id: Date.now(),

            student: studentName,

            class: student.class,

            status: status,

            date: today

        });

    }

    localStorage.setItem("attendance", JSON.stringify(attendance));

    document.getElementById("studentName").value = "";

    document.getElementById("status").selectedIndex = 0;

    loadAttendanceHistory();

    updateStatistics();

    alert("Attendance saved successfully.");

}



// =====================================
// LOAD ATTENDANCE HISTORY
// =====================================

function loadAttendanceHistory() {

    const container = document.getElementById("attendanceHistory");

    if (!container) return;

    attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    if (attendance.length === 0) {

        container.innerHTML = "<p>No attendance records.</p>";

        return;

    }

    let html = "";

    attendance
        .slice()
        .reverse()
        .forEach(record => {

            html += `

            <div class="attendance-item">

                <div>

                    <strong>${record.student}</strong><br>

                    <small>${record.class}</small><br>

                    <small>${record.date}</small>

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

    container.innerHTML = html;

}



// =====================================
// EDIT ATTENDANCE
// =====================================

function editAttendance(id) {

    attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    const record = attendance.find(item => item.id === id);

    if (!record) return;

    const newStatus = prompt(

        "Enter status (Present/Absent)",

        record.status

    );

    if (!newStatus) return;

    record.status = newStatus;

    localStorage.setItem("attendance", JSON.stringify(attendance));

    loadAttendanceHistory();

    updateStatistics();

}



// =====================================
// DELETE ATTENDANCE
// =====================================

function deleteAttendance(id) {

    if (!confirm("Delete this attendance record?")) {

        return;

    }

    attendance = attendance.filter(record => record.id !== id);

    localStorage.setItem("attendance", JSON.stringify(attendance));

    loadAttendanceHistory();

    updateStatistics();

}



// =====================================
// MARK EVERY STUDENT PRESENT
// =====================================

function markAllPresent() {

    const today = new Date().toLocaleDateString();

    students.forEach(student => {

        const exists = attendance.find(record =>

            record.student === student.name &&
            record.date === today

        );

        if (!exists) {

            attendance.push({

                id: Date.now() + Math.random(),

                student: student.name,

                class: student.class,

                status: "Present",

                date: today

            });

        }

    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    loadAttendanceHistory();

    updateStatistics();

    alert("All students marked Present.");

}



// =====================================
// TODAY'S ATTENDANCE SUMMARY
// =====================================

function attendanceSummary() {

    const today = new Date().toLocaleDateString();

    let present = 0;

    let absent = 0;

    attendance.forEach(record => {

        if (record.date === today) {

            if (record.status === "Present") {

                present++;

            } else {

                absent++;

            }

        }

    });

    console.log("Today's Attendance");

    console.log("Present:", present);

    console.log("Absent:", absent);

}



// =====================================
// INITIALIZE PART 2
// =====================================

loadAttendanceHistory();

attendanceSummary();
/*====================================================
    KID'S LOVE NURSERY
    TEACHER DASHBOARD
    PART 3
    RESULTS • REPORTS • ANNOUNCEMENTS
=====================================================*/


// =====================================
// RESULTS STORAGE
// =====================================

let results = JSON.parse(localStorage.getItem("results")) || [];



// =====================================
// SAVE RESULT
// =====================================

function saveResult() {

    const student = document.getElementById("resultStudent").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const marks = document.getElementById("marks").value.trim();

    const comment = document.getElementById("comment").value.trim();

    if (student === "" || subject === "" || marks === "") {

        alert("Please complete all required fields.");

        return;

    }

    const exists = students.find(s =>
        s.name.toLowerCase() === student.toLowerCase()
    );

    if (!exists) {

        alert("Student not found.");

        return;

    }

    results.push({

        id: Date.now(),

        student,

        subject,

        marks: Number(marks),

        comment,

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem("results", JSON.stringify(results));

    document.getElementById("resultStudent").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("comment").value = "";

    loadResults();

    alert("Result saved successfully.");

}



// =====================================
// LOAD RESULTS
// =====================================

function loadResults() {

    const container = document.getElementById("resultsHistory");

    if (!container) return;

    results = JSON.parse(localStorage.getItem("results")) || [];

    if (results.length === 0) {

        container.innerHTML = "<p>No results available.</p>";

        return;

    }

    let html = "";

    results.slice().reverse().forEach(result => {

        html += `

        <div class="result-card">

            <h4>${result.student}</h4>

            <p><strong>Subject:</strong> ${result.subject}</p>

            <p><strong>Marks:</strong> ${result.marks}%</p>

            <p><strong>Comment:</strong> ${result.comment}</p>

            <small>${result.date}</small>

        </div>

        `;

    });

    container.innerHTML = html;

}



// =====================================
// REPORT CARD
// =====================================

function generateReport() {

    const studentName =
        document.getElementById("reportStudent").value.trim();

    if (studentName === "") {

        alert("Enter a student name.");

        return;

    }

    const studentResults = results.filter(result =>
        result.student.toLowerCase() === studentName.toLowerCase()
    );

    if (studentResults.length === 0) {

        alert("No results found.");

        return;

    }

    let report = "KID'S LOVE NURSERY REPORT CARD\n\n";

    report += "Student: " + studentName + "\n\n";

    studentResults.forEach(result => {

        report +=
            result.subject +
            " : " +
            result.marks +
            "%\n";

    });

    report += "\nTeacher's Comments:\n";

    studentResults.forEach(result => {

        report += "- " + result.comment + "\n";

    });

    alert(report);

}



// =====================================
// ANNOUNCEMENTS
// =====================================

function postAnnouncement() {

    const message =
        document.getElementById("announcement").value.trim();

    if (message === "") {

        alert("Write an announcement first.");

        return;

    }

    const announcements =
        JSON.parse(localStorage.getItem("announcements")) || [];

    announcements.push({

        message,

        date: new Date().toLocaleString()

    });

    localStorage.setItem(
        "announcements",
        JSON.stringify(announcements)
    );

    document.getElementById("announcement").value = "";

    alert("Announcement posted successfully.");

}



// =====================================
// LOAD ANNOUNCEMENTS
// =====================================

function loadAnnouncements() {

    const announcements =
        JSON.parse(localStorage.getItem("announcements")) || [];

    console.log("Announcements");

    announcements.forEach(item => {

        console.log(item.date + " - " + item.message);

    });

}



// =====================================
// DASHBOARD INITIALIZATION
// =====================================

function initializeDashboard() {

    loadTeacher();

    refreshStudents();

    loadAttendanceHistory();

    loadResults();

    loadAnnouncements();

    updateStatistics();

}

window.onload = initializeDashboard;
