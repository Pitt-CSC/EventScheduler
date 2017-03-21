(function (window, undefined) {
    "use strict";

    function fetch_classes(term, code)
    {
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
    }


    //fetch_classes(2174, "cs");

    console.log(mock);


})(typeof window !== "undefined" ? window : {});

