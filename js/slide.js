var slideShow = (function() {

    var select = document.getElementsByClassName("select"),//get all the elements that have select
        slide = document.getElementById("slide"),// gets the element of the id slide
        button = document.querySelector("button"),
        bg,
        counter,
        counterTimeout,
        i = 0,
        header = ["this is a red slide", "this is a blue slide",
            "this is a green slide", "this is a purple slide"
        ],
        a = document.querySelector("a"),
        links = ["red.html", "blue.html", "green.html", "purple.html"];

/* this function removes the current background color;
checks to see if i over 3 so that it can  loop back to 0 and change the styles again;
changes the background color that is dependent upon the number that is contained in  i;
calls the appear method;
increments i;
*/

    function slideShw(obj, num) {
        i = (num >= 0) ? num : i;
        if (i > 0) {
            select[i - 1].style.background = "";
        }
        i = (i > 3) ? 0 : i;
        obj.chngBG(i);
        select[i].style.background = bg;

        obj.appear(slide, bg);
        i++;
    }


    return {
        switch: function() {
            var that = this;

            counter = setInterval(function() {
                slideShw(that);
            }, 3000);


        },
        chngBG: function(num) {
            switch (num) {
                case 0:
                    bg = "red";
                    break;
                case 1:
                    bg = "blue";
                    break;
                case 2:
                    bg = "green";
                    break;
                case 3:
                    bg = "purple";
                    break;
            }
        },
        appear: function(slide, color) {
            var appCounter, x = 0;
            slide.style.opacity = 0;
            slide.style.background = color;
            slide.querySelector("h3").innerHTML = header[i];
            a.href = links[i];
            appCounter = setInterval(function() {
                x += 0.1;
                slide.style.opacity = x.toFixed(1);

                if (x >= 1) {

                    clearInterval(appCounter);
                }

            }, 50);

        },
        stopSlide: function() {
            var that = this;
            for (let n = 0; n < select.length; n++) {

                select[n].onclick = function() {
                    var num = parseInt(this.dataset.num);
                    clearInterval(counter);
                    if (counterTimeout != "undefined") {
                        clearTimeout(counterTimeout);
                    }
                    if (i > 0) {
                        select[i - 1].style.background = "";
                    }
                    slideShw(that, num);
                    counterTimeout = setTimeout(that.switch.bind(slideShow), 4000);

                }; // end of function
            } //for loop
        },
        run: function() {
            this.switch();
            this.stopSlide();

        }
    } //object

})();

slideShow.run();
