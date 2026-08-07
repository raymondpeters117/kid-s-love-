// ==========================================
// KID'S LOVE NURSERY
// Teacher Dashboard
// ==========================================

let teacher = null;
let students = [];
let attendance = [];
let results = [];

function checkTeacherLogin() {

    const savedTeacher = localStorage.getItem("loggedTeacher");

    if (!savedTeacher) {

        alert("Please login first.");
        window.location.replace("portal.html");
        return false;

    }

    teacher = JSON.parse(savedTeacher);

    return true;
}

function loadTeacherProfile() {

    if (!teacher) return;

    const ids = {
        teacherName: teacher.name,
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone
    };

    Object.keys(ids).forEach(id => {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = ids[id] || "-";
        }

    });

}

function logoutTeacher() {

    if (!confirm("Logout?")) return;

    localStorage.removeItem("loggedTeacher");

    window.location.replace("portal.html");

}

function loadStudents() {

    students = JSON.parse(localStorage.getItem("students")) || [];

}

function loadAttendance() {

    attendance = JSON.parse(localStorage.getItem("attendance")) || [];

}

function loadResults() {

    results = JSON.parse(localStorage.getItem("results")) || [];

}

function initializeDashboard() {

    if (!checkTeacherLogin()) return;

    loadTeacherProfile();

    loadStudents();

    loadAttendance();

    loadResults();

}

document.addEventListener("DOMContentLoaded", initializeDashboard);
