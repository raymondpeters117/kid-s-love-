// ===============================
// KID'S LOVE ADMISSION SYSTEM
// LOCAL STORAGE DATABASE
// ===============================


const admissionForm = document.getElementById("admissionForm");


admissionForm.addEventListener("submit", function(e){

    e.preventDefault();



    // Get transport choice
    let transport =
    document.querySelector('input[name="transport"]:checked')?.value;



    // Create student object

    let student = {


        id: "STD-" + Date.now(),


        childName:
        document.getElementById("studentName").value,


        dob:
        document.getElementById("dob").value,


        gender:
        document.getElementById("gender").value,


        className:
        document.getElementById("classApplying").value,


        parentName:
        document.getElementById("parentName").value,


        phone:
        document.getElementById("phone").value,


        email:
        document.getElementById("email").value,


        relationship:
        document.getElementById("relationship").value,


        address:
        document.getElementById("address").value,


        medical:
        document.getElementById("medical").value,


        transport: transport,


        admissionDate:
        new Date().toLocaleDateString()

    };





    // Get existing students

    let students =
    JSON.parse(localStorage.getItem("students")) || [];




    // Add new child

    students.push(student);




    // Save database

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );





    alert(
    "Admission submitted successfully!\nStudent ID: "
    + student.id
    );



    admissionForm.reset();


});
