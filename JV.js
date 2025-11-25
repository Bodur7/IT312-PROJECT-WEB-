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
