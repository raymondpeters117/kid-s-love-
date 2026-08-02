// SAVE ATTENDANCE

function saveAttendance(){


let attendance =
JSON.parse(
localStorage.getItem("attendance")
) || [];



let student =
document.getElementById("studentName").value;



let status =
document.getElementById("status").value;



if(student===""){

alert("Enter student name");

return;

}



let record={

student:student,

status:status,

date:new Date().toLocaleDateString(),

teacher:teacher.name

};



attendance.push(record);



localStorage.setItem(
"attendance",
JSON.stringify(attendance)
);



alert("Attendance saved successfully");



document.getElementById("studentName").value="";


}
