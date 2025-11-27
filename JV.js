console.log("checking whether the java script file working or not");

/*-------------------------------------------------Request service page------------------------------------------------------*/

// امسك زر صفحة الريكوست سيرفس
var submitBtn_RS = document.getElementById("submit-requestService");

// نفذ كود الريكوست سيرفس فقط إذا الزر موجود في الصفحة
if (submitBtn_RS != null) {

    var service_RS = document.getElementById("service");
    var nameInput_RS = document.getElementById("name");
    var dateInput_RS= document.getElementById("date");
    var desc_RS = document.getElementsByTagName("textarea")[0];
    var requestsContainer_RS= document.getElementById("requests-inner-container");

    submitBtn_RS.addEventListener("click", function(event){
        event.preventDefault();

        var serviceField_rs = service_RS.value;
        var nameField_rs = nameInput_RS.value;
        var dateField_rs = dateInput_RS.value;
        var descField_rs = desc_RS.value;

        // 1) الخدمة
        if(serviceField_rs == ""){
            alert("Please select a service.");
            return;
        }

        // 2) الاسم
        var numCheck = nameField_rs.match(/[0-9]/);
        var symCheck = nameField_rs.match(/[?!@]/);
        var nameCheck = nameField_rs.split(" ");

        if(nameCheck.length < 2 || numCheck != null || symCheck != null){
            alert("Please enter a valid name without numbers or special characters.");
            return;
        }

        // 3) التاريخ
        var today1 = new Date();
        today1.setDate(today1.getDate() + 3);
        var today2 = new Date();
        var selected = new Date(dateField_rs);

        if (selected.getFullYear() === today2.getFullYear() &&
            selected.getMonth() === today2.getMonth() &&
            selected.getDate() === today2.getDate()) {
            alert("Invalid date! You cannot select today's date.");
            return;
        }

        if (selected < today2) {
            alert("Invalid date! You cannot select a past date.");
            return;
        }

        if (selected < today1){
            alert("Due date is too soon. Please choose a later date.");
            return;
        }

        // 4) الوصف
        if (descField_rs.length < 100){
            alert("Description must be at least 100 characters.");
            return;
        }

        
        var stay = confirm(
            "Your request was successfully submitted.\n\n" +
            "Click OK to stay on this page.\n" +
            "Click Cancel to return to the dashboard."
        );

        if (stay) {
            requestsContainer_RS.innerHTML += `
                <div class="single-request">
                    <p><strong>Service:</strong> ${serviceField_rs}</p>
                    <p><strong>Name:</strong> ${nameField_rs}</p>
                    <p><strong>Due date:</strong> ${dateField_rs}</p>
                    <p><strong>Description:</strong> ${descField_rs}</p>
                </div>
            `;

            nameInput_RS.value = "";
            desc_RS.value = "";

        } else {
            window.location.href = "CustomerDashboard.html";
        }
    });
}


/*---------------------------------------------------Service Evaluation page -------------------------------------------*/

var submitBtn_se = document.getElementById("submit-evaluation");

if (submitBtn_se != null) {
    console.log("Service evaluation page detected.");

    var service_SE = document.getElementById("service-SE");
    var feedback_SE = document.getElementById("feedback-SE");
    var ratingInputs = document.getElementsByName("rating");

    var selectedRating = null;

    // التقاط التقييم
    for (var i = 0; i < ratingInputs.length; i++) {
        ratingInputs[i].addEventListener("change", function () {
            selectedRating = this.value;
        });
    }

    submitBtn_se.addEventListener("click", function(event){
        event.preventDefault();

        var serviceField_se = service_SE.value;
        var feedbackField_se = feedback_SE.value;

        if (serviceField_se == "") {
            alert("Please select a service.");
            return;
        }

        if (selectedRating == null) {
            alert("Please select a rating ");
            return;
        }

        if (feedbackField_se == "" || feedbackField_se.toLowerCase() == "input here") {
            alert("Please write your feedback.");
            return;
        }

        if (selectedRating >= 4) {
            alert("Thank you! We're glad you enjoyed our service ");
        } else {
            alert("We're sorry the service did not meet your expectations ");
        }

        window.location.href = "CustomerDashboard.html";
    });
}



/*-------------------------------------------------Add a service page------------------------------------------------------*/


function addService() {


    // 1) نجيب قيم الفورم
    var name = document.getElementById("serviceName").value;
    var price = document.getElementById("price").value;
    var desc = document.getElementById("desc").value;
    var photo = "images/arabsstock_52227_large.jpg";


    //  التحقق من الحقول الفارغة

    if (name == "" || price == "" || desc == "" || photo == "") {
        alert("Please fill all fields.");
        return; 
    }

    
    //  التحقق من أن الاسم ما يبدأ برقم

    if (!isNaN(name.charAt(0))) {  
        alert("Service name cannot start with a number.");
        return;
    }

  
    //  التحقق من أن السعر رقم

    if (isNaN(price)) {
        alert("Price must be a number.");
        return;
    }


    var service = {
        name: name,
        price: Number(price),
        desc: desc,
        photo: photo
    };

    
    //  نجلب الخدمات الموجودة (array)
 
    var services = [];

    if (localStorage.getItem("services") != null) {
        services = JSON.parse(localStorage.getItem("services"));
    }


    //  نضيف الخدمة الجديدة

    services.push(service);


    //  نخزن array في localStorage

    localStorage.setItem("services", JSON.stringify(services));




    alert("Service " + name + " added successfully!");

  
    // 10) مسح الفورم

    document.getElementById("serviceName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("servePhoto").value = "";
}


/*-------------------------------------------------Provider dashboard page------------------------------------------------------*/

window.onload = function() {

    var container = document.getElementById("serviceList");

    var services = localStorage.getItem("services");

    if (services != null) {
        services = JSON.parse(services);

        for (var i = 0; i < services.length; i++) {
container.innerHTML += `
    <div class="service">
        <div class="service-container">
            <img src="${services[i].photo}" alt="">
            <h4>${services[i].name}</h4>
        </div>
        <p class="price">${services[i].price} SAR</p>
       
    </div>
`;

         
        }
    }
};
 



/*-------------------------------------------------Manage staff member page------------------------------------------------------*/

// DELETE STAFF MEMBERS 
function deleteStaff() {

    var checkboxes = document.getElementsByName("staff");
    var anySelected = false;

    // نتحقق هل في أحد مختار
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            anySelected = true;
            break;
        }
    }

    // إذا مافي أحد مختار
    if (!anySelected) {
        alert("Please select at least one member");
        return;
    }

    // نسأل المستخدم confirm
    var confirmDelete = confirm("Are you sure you want to delete the selected members?");

    if (confirmDelete) {

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var memberDiv = checkboxes[i].parentNode.parentNode;
                memberDiv.remove();
            }
        }
    }
}


// ADD NEW MEMBER 
function addStaff() {


    var name = document.getElementById("WName").value;
    var dob = document.getElementById("WDob").value;
    var email = document.getElementById("WEmail").value;
    var area = document.getElementById("WArea").value;
    var skills = document.getElementById("WSkills").value;
    var edu = document.getElementById("WEdu").value;
    var photo = "images/profilepic.webp";

    // فاليديشن: أي حقل فاضي؟
    if (name == "" || dob == "" || email == "" || area == "" || skills == "" || edu == "" || photo == "") {
        alert("Please fill all fields");
        return;
    }

    // الاسم ما يبدأ برقم
    if (!isNaN(name.charAt(0))) {
        alert("Name cannot start with a number");
        return;
    }

    // نضيف العضو في أعلى القائمة:
    var container = document.querySelector(".grid");

    var newMember =
        "<div class='member'>" +
            "<label>" +
                "<input type='checkbox' name='staff'>" +
                "<img src='" + photo + "'>" +
                "<span>" + name + "</span>" +
            "</label>" +
        "</div>";

    container.innerHTML += newMember;

    alert("New staff member " + name + " added successfully!");

    // نفرغ الفورم
    document.getElementById("WName").value = "";
    document.getElementById("WDob").value = "";
    document.getElementById("WEmail").value = "";
    document.getElementById("WArea").value = "";
    document.getElementById("WSkills").value = "";
    document.getElementById("WEdu").value = "";
    document.getElementById("WPhoto").value = "";
}


















/* ----------------------------------------------- services page ---------------------------------------------------------------*/






function sortServices(){

  var sortValue = document.getElementById("sort").value;
  var container = document.getElementById("servicesContainer");

  var services = container.getElementsByClassName("service-box");
  var servicesArray = [];

  
  for(var i = 0; i < services.length; i++){
    servicesArray.push(services[i]);
  }

  
  if(sortValue == "A-Z"){
    servicesArray.sort(function(a, b){
      var nameA = a.getElementsByTagName("h3")[0].innerHTML;
      var nameB = b.getElementsByTagName("h3")[0].innerHTML;

      if(nameA > nameB) return 1;
      if(nameA < nameB) return -1;
      return 0;
    });
  }

  
  if(sortValue == "Z-A"){
    servicesArray.sort(function(a, b){
      var nameA = a.getElementsByTagName("h3")[0].innerHTML;
      var nameB = b.getElementsByTagName("h3")[0].innerHTML;

      if(nameA < nameB) return 1;
      if(nameA > nameB) return -1;
      return 0;
    });
  }

  
  if(sortValue == "low-high"){
    servicesArray.sort(function(a, b){
      return getPrice(a) - getPrice(b);
    });
  }

  
  if(sortValue == "high-low"){
    servicesArray.sort(function(a, b){
      return getPrice(b) - getPrice(a);
    });
  }

  
  container.innerHTML = "";
  for(var j = 0; j < servicesArray.length; j++){
    container.appendChild(servicesArray[j]);
  }
}



function getPrice(service){
  var priceText = service.getElementsByClassName("price")[0].innerHTML;
  var parts = priceText.split(" ");
  return parseInt(parts[3]);   
}







/* ----------------------------------------------- about us page ---------------------------------------------------------------*/











