// ==========================================
// KID'S LOVE NURSERY
// TEACHER DASHBOARD
// ==========================================

let teacher = null;
let students = [];
let attendance = [];
let results = [];

// -----------------------------
// CHECK LOGIN
// -----------------------------
function checkTeacherLogin() {

    const saved = localStorage.getItem("loggedTeacher");

    if (!saved) {
        alert("Please login first.");
        window.location.href = "portal.html";
        return false;
    }

    try {
        teacher = JSON.parse(saved);
    } catch (e) {
        localStorage.removeItem("loggedTeacher");
        alert("Login session is invalid.");
        window.location.href = "portal.html";
        return false;
    }

    return true;
}

// -----------------------------
// LOAD PROFILE
// -----------------------------
function loadTeacherProfile() {

    if (!teacher) return;

    document.getElementById("teacherName").textContent =
        teacher.name || "Teacher";

    document.getElementById("name").textContent =
        teacher.name || "-";

    document.getElementById("email").textContent =
        teacher.email || "-";

    document.getElementById("phone").textContent =
        teacher.phone || "-";
}

// -----------------------------
// LOAD DATA
// -----------------------------
function loadStudents() {
    students = JSON.parse(localStorage.getItem("students")) || [];
}

function loadAttendance() {
    attendance = JSON.parse(localStorage.getItem("attendance")) || [];
}

function loadResults() {
    results = JSON.parse(localStorage.getItem("results")) || [];
}

// -----------------------------
// LOGOUT
// -----------------------------
function logout() {

    if (!confirm("Logout from teacher portal?"))
        return;

    localStorage.removeItem("loggedTeacher");

    window.location.href = "portal.html";
}

// -----------------------------
// START
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

    if (!checkTeacherLogin()) return;

    loadTeacherProfile();

    loadStudents();

    loadAttendance();

    loadResults();

    console.log("Teacher Dashboard Loaded");
    console.log(teacher);

});
