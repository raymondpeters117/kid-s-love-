// ==========================================
// PORTAL LOGIN SYSTEM
// ==========================================

// Create default accounts (only once)
if (!localStorage.getItem("teachers")) {
    const teachers = [
        {
            id: 1,
            name: "Mr. Peter",
            email: "teacher@school.com",
            password: "teacher123",
            subject: "Mathematics"
        }
    ];

    localStorage.setItem("teachers", JSON.stringify(teachers));
}

if (!localStorage.getItem("parents")) {
    const parents = [
        {
            id: 1,
            name: "Mrs. Sarah",
            email: "parent@school.com",
            password: "parent123",
            child: "John Peter"
        }
    ];

    localStorage.setItem("parents", JSON.stringify(parents));
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        if (!email || !password || !role) {
            alert("Please complete all fields.");
            return;
        }

        if (role === "teacher") {

            const teachers =
                JSON.parse(localStorage.getItem("teachers")) || [];

            const teacher = teachers.find(t =>
                t.email === email &&
                t.password === password
            );

            if (!teacher) {
                alert("Invalid teacher credentials.");
                return;
            }

            localStorage.setItem(
                "loggedTeacher",
                JSON.stringify(teacher)
            );

            window.location.href = "teacher.html";
        }

        else if (role === "parent") {

            const parents =
                JSON.parse(localStorage.getItem("parents")) || [];

            const parent = parents.find(p =>
                p.email === email &&
                p.password === password
            );

            if (!parent) {
                alert("Invalid parent credentials.");
                return;
            }

            localStorage.setItem(
                "loggedParent",
                JSON.stringify(parent)
            );

            window.location.href = "parent.html";
        }

    });

}
