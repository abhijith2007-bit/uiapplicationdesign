function savecourse() {
    if (document.getElementById("id").value) {
        updatecourse();
    } else {
        createcourse();
    }
}

function createcourse() {
    let course  = {
        "title": document.getElementById("title").value,
        "duration": document.getElementById("duration").value
    };

    httpRequest("http://localhost:3000/courses", "POST", course)
        .then(function (response) {
            window.location.href = "courselist.html";
        });
}
function loadCourse() {
    let requestParam = new URLSearchParams(window.location.search).get("id");

    if (requestParam) {
        document.getElementById("CourseFormTitle").textContent = "Edit Course";

        httpRequest("http://localhost:3000/courses/" + requestParam, "GET")
        .then(function(course) {
            document.getElementById("id").value = course.id;
            document.getElementById("title").value = course.title;
            document.getElementById("duration").value = course.duration;
        });

    } else {
        document.getElementById("courseFormTitle").textContent = "Add Course";
    }
}

function updatecourse() {
    let course = {
        id: document.getElementById("id").value,
        title: document.getElementById("title").value,
        duration: document.getElementById("duration").value
    };

    httpRequest(
        "http://localhost:3000/courses/" + document.getElementById("id").value,
        "PUT",
        course
    ).then(function(response) {
        window.location.href = "courselist.html";
    });
}

document.addEventListener("DOMContentLoaded", loadCourse);