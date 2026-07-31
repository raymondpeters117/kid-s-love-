/* =====================================
   MOBILE MENU
===================================== */


const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");


if(mobileToggle){

    mobileToggle.addEventListener("click",()=>{

        navMenu.classList.toggle("show");

    });

}





/* =====================================
   FAQ ACCORDION
===================================== */


const faqButtons = document.querySelectorAll(".faq-question");


faqButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        const answer = button.nextElementSibling;


        if(answer.style.display === "block"){

            answer.style.display="none";

            button.querySelector("span").textContent="+";

        }

        else{

            answer.style.display="block";

            button.querySelector("span").textContent="-";

        }


    });


});







/* =====================================
   FEE CALCULATOR
===================================== */


const calculateBtn = document.getElementById("calculate");


if(calculateBtn){


calculateBtn.addEventListener("click",(e)=>{


    e.preventDefault();



    let tuition =
    Number(document.getElementById("tuition").value);



    let transport =
    Number(document.getElementById("transportFee").value);



    let uniform =
    Number(document.getElementById("uniform").value);





    let total =
    tuition + transport + uniform;




    document.getElementById("totalFee").innerHTML =
    total.toLocaleString();



});


}








/* =====================================
   ADMISSION FORM STORAGE
===================================== */


const admissionForm =
document.getElementById("admissionForm");



if(admissionForm){


admissionForm.addEventListener("submit",(e)=>{


e.preventDefault();




let application = {


id:
"APP-"+Date.now(),



studentName:
document.getElementById("studentName").value,



dateOfBirth:
document.getElementById("dob").value,



gender:
document.getElementById("gender").value,



classApplying:
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



transport:
document.querySelector(
'input[name="transport"]:checked'
)?.value,



status:
"Pending",



dateSubmitted:
new Date().toLocaleString()


};







let applications =
JSON.parse(localStorage.getItem("admissions")) || [];




applications.push(application);




localStorage.setItem(
"admissions",
JSON.stringify(applications)
);







alert(

"Application Submitted Successfully!\n\nYour Application ID is:\n"
+
application.id

);




admissionForm.reset();



});


}








/* =====================================
   CHECK SAVED APPLICATIONS
===================================== */


function viewApplications(){


let data =
JSON.parse(localStorage.getItem("admissions")) || [];



console.log(data);


}



viewApplications();







/* =====================================
   BACK TO TOP BUTTON
===================================== */


const topBtn =
document.getElementById("topBtn");



window.addEventListener("scroll",()=>{


if(window.scrollY > 300){

    topBtn.style.display="block";

}

else{

    topBtn.style.display="none";

}


});





if(topBtn){


topBtn.addEventListener("click",()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}







/* =====================================
   AUTOMATIC FEE CALCULATOR UPDATE
===================================== */


function autoCalculate(){



let tuition =
Number(document.getElementById("tuition").value);



let transport =
Number(document.getElementById("transportFee").value);



let uniform =
Number(document.getElementById("uniform").value);




let total =
tuition + transport + uniform;



document.getElementById("totalFee").innerHTML =
total.toLocaleString();



}





const feeInputs = [

"tuition",

"transportFee",

"uniform"

];




feeInputs.forEach(id=>{


let element=document.getElementById(id);



if(element){


element.addEventListener(
"change",
autoCalculate
);


}


});



/* Initial calculation */

if(document.getElementById("totalFee")){

autoCalculate();

}
