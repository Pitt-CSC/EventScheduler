(function (window, undefined) {
    "use strict";

    var host = "http://localhost:5000/";

    function fetch_classes(term, code)
    {

        console.log("Fetching courses...");
        fetch(host + "courses/" + term + "/" + code)
            .then(response => {
                console.log("Done!");
                return response.json();
            })
            .then(json => {
                let classes = json.map((course) => {return course.class_number});
                let num_classes = classes.length;
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


    //var CLASS_DATA = fetch_classes(2174, "cs");
    var CLASS_DATA = mock;

    function format_time(time)
    {
        let time_minutes = (parseInt(time.substring(0,2)) - 1) * 60 + parseInt(time.substring(3,4));

        if(time.substring(6) == "PM" && time.substring(0,2) != "12")
        {
            time_minutes += 720;
        }

        return time_minutes;
    }

    var CLASS_TABLE = {};
    CLASS_DATA.filter((cl) => {
        if(cl.time[0] == "")
        {
            return false;
        }
        else
        {
            return true;
        }
    }).forEach((cl) => {
        cl.time[0] = format_time(cl.time[0]);
        cl.time[1] = format_time(cl.time[1]);

        CLASS_TABLE[cl.class_number] = cl;
    });

    console.log(CLASS_TABLE);


})(typeof window !== "undefined" ? window : {});

