(function (window, undefined) {
    "use strict";

    var term = 2174;
    var code = "cs";

    var host = "http://localhost:5000/";

    var num = 0;

    console.log("Fetching courses...");
    fetch(host + "courses/" + term + "/" + code)
        .then(response => {
            console.log("Done!");
            return response.json();
        })
        .then(json => {
            var classes = json.map((course) => {return course.class_number});
            var num_classes = classes.length;
            console.log("Fetching individual class details...");
            Promise.all(classes.map((class_number) => {
                return fetch(host + "class/" + class_number + "/" + term)
                    .then(response => {
                        return response.json();
                    })
                    .then(json => {
                        num++;
                        console.log(num + "/" + num_classes);
                        return json;
                    });
            }))
            .then((response) => {
                console.log("Done!");
            });
        });

})(typeof window !== "undefined" ? window : {});

