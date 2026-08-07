// ==========================================
// KID'S LOVE NURSERY PORTAL LOGIN JS
// ==========================================


// ==========================================
// CREATE DEFAULT ACCOUNTS ONLY ONCE
// ==========================================

const defaultTeachers = [
    {
        id: 1,
        name: "Mr. Peter",
        email: "teacher@school.com",
        password: "teacher123",
        phone: "0700000000",
        subject: "Mathematics"
    }
];


const defaultParents = [
    {
        id: 1,
        name: "Mrs. Sarah",
        email: "parent@school.com",
        password: "parent123",
        child: "John Peter",
        phone: "0711111111"
    }
];



// Save accounts only if they do not exist

if (!localStorage.getItem("teachers")) {

    localStorage.setItem(
        "teachers",
        JSON.stringify(defaultTeachers)
    );

}


if (!localStorage.getItem("parents")) {

    localStorage.setItem(
        "parents",
        JSON.stringify(defaultParents)
    );

}



// ==========================================
// LOGIN FUNCTION
// ==========================================


const loginForm = document.getElementById("loginForm");


if (loginForm) {


    loginForm.addEventListener("submit", function(e){


        e.preventDefault();



        const email =
        document.getElementById("email")
        .value
        .trim()
        .toLowerCase();



        const password =
        document.getElementById("password")
        .value
        .trim();



        const role =
        document.getElementById("role")
        .value;



        if(!email || !password || !role){

            alert("Please fill in all fields.");

            return;

        }



        // Remove old sessions

        localStorage.removeItem("loggedTeacher");

        localStorage.removeItem("loggedParent");




        // ==================================
        // TEACHER LOGIN
        // ==================================


        if(role === "teacher"){


            const teachers =
            JSON.parse(
                localStorage.getItem("teachers")
            ) || [];



            const teacher =
            teachers.find(t =>

                t.email.toLowerCase() === email
                &&
                t.password === password

            );



            if(!teacher){


                alert(
                    "Invalid teacher email or password."
                );

                return;

            }




            localStorage.setItem(
                "loggedTeacher",
                JSON.stringify(teacher)
            );



            alert(
                "Teacher login successful."
            );



            window.location.href =
            "teacher.html";



        }





        // ==================================
        // PARENT LOGIN
        // ==================================


        else if(role === "parent"){


            const parents =
            JSON.parse(
                localStorage.getItem("parents")
            ) || [];



            const parent =
            parents.find(p =>


                p.email.toLowerCase() === email
                &&
                p.password === password


            );



            if(!parent){


                alert(
                    "Invalid parent email or password."
                );


                return;

            }




            localStorage.setItem(
                "loggedParent",
                JSON.stringify(parent)
            );



            alert(
                "Parent login successful."
            );



            window.location.href =
            "parent.html";


        }




        else{


            alert("Please select a valid role.");

        }



    });


}
// ==========================================
// LOAD CLASS LIST
// ==========================================

function loadClassList() {

    const classList =
    document.getElementById("classList");


    if (!classList) return;


    students =
    JSON.parse(localStorage.getItem("students")) || [];


    classList.innerHTML = "";


    if(students.length === 0){

        classList.innerHTML = `
            <tr>
                <td colspan="5">
                    No students registered yet.
                </td>
            </tr>
        `;

        return;
    }



    students.forEach((student,index)=>{


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${student.name || "-"}</td>

            <td>${student.age || "-"}</td>

            <td>${student.class || "Baby Class"}</td>

            <td>${student.parent || "-"}</td>

        `;


        classList.appendChild(row);


    });
// Load class lists
function loadClassLists(){

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let classSelect = document.getElementById("classSelect");
    let classStudents = document.getElementById("classStudents");


    // Get unique classes
    let classes = [...new Set(students.map(student => student.class))];


    // Add classes to dropdown
    classes.forEach(cls => {

        let option = document.createElement("option");
        option.value = cls;
        option.textContent = cls;

        classSelect.appendChild(option);

    });


    // Display students when class is selected
    classSelect.addEventListener("change", function(){

        let selectedClass = this.value;

        classStudents.innerHTML = "";


        let filteredStudents = students.filter(
            student => student.class === selectedClass
        );


        if(filteredStudents.length === 0){

            classStudents.innerHTML =
            "<p>No students found in this class</p>";

            return;
        }


        let table = `
        <table border="1" width="100%">
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Gender</th>
            </tr>
        `;


        filteredStudents.forEach((student,index)=>{

            table += `
            <tr>
                <td>${index+1}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
            </tr>
            `;

        });


        table += "</table>";

        classStudents.innerHTML = table;

    });

}


loadClassLists();

}
