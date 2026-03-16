function loadCourses(){
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user){
        alert("Please Login to access Courses Page!");
        return window.location.href = "login.html";
    }

    httpRequest("http://localhost:3000/courses","GET",{}).then(function(courses){
        let courseList = document.getElementById("courseList");
        for(let i=0; i<courses.length;i++){
            let divElement = document.createElement("div");
            divElement.className = "col-md-4 mb-3";
            divElement.innerHTML = "<div class='card p-3'>" +
                "<h5>" + courses[i].title + "</h5>" +
                "<p>" + courses[i].duration + "</p>" +
                "<button class='btn btn-primary' onclick='enroll(" + courses[i].id + ")'>Enroll</button>" +
                "</div>";
            courseList.append(divElement)
        }
        loadEnrollments();
    });
}

function enroll(courseId) {
    const user = JSON.parse(localStorage.getItem("user"));
    let enrollment = {"userid":user.id,"courseid":courseId};

    httpRequest("http://localhost:3000/enrollments","POST",enrollment).then(function(){
        loadEnrollments();
    });
}
function loadEnrollments() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userEnrollments = [];
    let courses = [];

    httpRequest("http://localhost:3000/enrollments?userid=" + user.id, "GET", {}).then(function(userEnrollments){
        httpRequest("http://localhost:3000/courses", "GET", {}).then(function(courses){
            let enrollmentList = document.getElementById("enrollmentList");
            enrollmentList.innerHTML = "";
            for (let i = 0; i < userEnrollments.length; i++){
                let course = {};
                for (let j = 0; j < courses.length; j++){
                    if (userEnrollments[i].courseid === courses[j].id){
                        course = courses[j];
                        break;
                    }
                }
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between";
                li.innerHTML = course.title + " <button class='btn btn-danger btn-sm' onclick='deleteEnrollment(" + userEnrollments[i].id + ")'>Remove</button>";
                enrollmentList.appendChild(li);
            }
        })
    });
}

function deleteEnrollment(id){
    httpRequest("http://localhost:3000/enrollments/" + id, "DELETE", {}).then(function(response){
        loadEnrollments();
    });
}
document.addEventListener('DOMContentLoaded', loadCourses);