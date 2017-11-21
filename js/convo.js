/* 
 Created on : 08-Nov-2017, 09:41:56
 Author     : Chris Muiruri @chrismuiruri_
 */
$(function ($) {

    $.fn.convo = function (options) {

        // default settings
        var settings = $.extend({
            headerTopColor: null,
            logo: null,
            pageColor: null,
            inputCharLimit: 65,
            element: $(".bubble__wrapper"),
            data: null,
            setTheme: function () {
                //set up the theme
                $(".top-bar").css({
                    "background-color": settings.headerTopColor
                });
                $("#logo").attr("src", settings.logo);
                $(".background").css("background", settings.pageColor);

            },
            scrollBody: function () {
                setTimeout(function () {
                    $("html").animate({
                        scrollTop: settings.element.height() + 600
                    }, 1000);
                    $("body").animate({
                        scrollTop: settings.element.height() + 600
                    }, 1000);
                }, 1000);
            },
            createResponseBtn: function (choices) {
                for (var c = 0; c < choices.length; c++) {
                    (function (c) {
                        var $text = choices[c].text;
                        var $path = choices[c].path;
                        var $type = choices[c].type;
                        setTimeout(function () {
                            if ($type === "input") {

                                //create a writable response
                                var $options = $("<div/>", {
                                    "class": "cui_option_input"
                                });
                                $options.attr("contentEditable", true);
                                $options.attr("data-path", $path);
                                $options.attr("placeholder", "Type and Send");
                                $($options).appendTo(".cui__response");
                                setTimeout(function () {
                                    $($options).addClass("slide-up");
                                }, 260);

                            } else if ($type === "button") {
                                var $expected = choices[c].expected;
                                var $pathTrue = choices[c].pathTrue;
                                var $pathFalse = choices[c].pathFalse;
                                //create a writable response
                                var $options = $("<button/>", {
                                    "class": "cui_option_btn_submit"
                                });
                                $options.text("Send");
                                $options.attr("data-expected", $expected);
                                $options.attr("data-pathTrue", $pathTrue);
                                $options.attr("data-pathFalse", $pathFalse);
                                $options.attr("data-text", $text);
                                $options.attr("data-path", $path);
                                $($options).appendTo(".cui__response");
                                setTimeout(function () {
                                    $($options).addClass("slide-up");
                                }, 260);

                            } else {
                                var $options = $("<div/>", {
                                    "class": "cui_option"
                                });
                                $options.html($text);
                                $options.attr("data-path", $path);
                                $($options).appendTo(".cui__response");
                                setTimeout(function () {
                                    $($options).addClass("slide-up");
                                }, 260);
                            }
                        }, 350 * c);
                    })(c);
                }
            },
            createBotCuiBubble: function (messages, options) {
                for (var m = 0; m < messages.length; m++) {
                    (function (m) {
                        setTimeout(function () {
                            var textMighty = messages[m].text;
                            //create a list item
                            var listItem = $("<li/>", {
                                "class": "bot"
                            });
                            //append the list item to the cui wrapper
                            listItem.appendTo(settings.element);
                            //create the message bubble
                            var $bubble = $("<span/>", {
                                class: "cui__bubble"
                            });
                            $bubble.html("...");
                            //append the mesage bubble to the list item
                            $bubble.appendTo(listItem);
                            //add slide in animation to the bubble
                            $bubble.addClass("slide-in");
                            //delay for 800
                            setTimeout(function () {

                                //create a text span wrapper for the bubble
                                var $text = $("<span/>", {
                                    class: "inner__bubble hidden"
                                });

                                $text.html(textMighty);
                                //delay for 200
                                setTimeout(function () {
                                    $text.removeClass("hidden");
                                    $text.addClass("slide-in");
                                    if (m === (messages.length - 1)) {
                                        settings.createResponseBtn(options);
                                    }
                                }, 200);
                                //add the text span to the message bubble
                                $bubble.html($text);

                            }, 600);

                        }, 1000 * m);
                    })(m);
                }
            },
            createCuiBubble: function (message, sender, path) {
                var dataz = settings.getPath(path);
                var messages = dataz["messages"];
                var choices = dataz["choices"];
                //create a list item
                var listItem = $("<li/>", {
                    "class": sender
                });
                //append the list item to the cui wrapper
                listItem.appendTo(settings.element);
                //create the message bubble
                var $bubble = $("<span/>", {
                    text: "...",
                    class: "cui__bubble"
                });
                //append the mesage bubble to the list item
                $bubble.appendTo(listItem);
                //create a delay of 200ms
                setTimeout(function () {
                    //add slide in animation to the bubble
                    $bubble.addClass("slide-in");
                    //delay for 800
                    setTimeout(function () {

                        //create a text span wrapper for the bubble
                        var $text = $("<span/>", {
                            text: message,
                            class: "inner__bubble hidden"
                        });
                        //delay for 200
                        setTimeout(function () {
                            $text.removeClass("hidden");
                            $text.addClass("slide-in");
                            settings.createBotCuiBubble(messages, choices);
                            settings.scrollBody();
                        }, 600);
                        //add the text span to the message bubble
                        $bubble.html($text);
                    }, 800);
                }, 200);
            },
            checkCuiInputLength: function (max) {
                if ($(".cui_option_input").text().length > max) {
                    return true;
                }
                return false;
            },
            startConvo: function () {
                //get the intro path
                var dataz = settings.getPath("intro");
                var messages = dataz["messages"];
                var choices = dataz["choices"];
                settings.createBotCuiBubble(messages, choices);
                settings.scrollBody();
            },
            getPath: function (pathName) {
                for (var i = 0, len = settings.data.length; i < len; i++) {
                    if (settings.data[i].path === pathName)
                        return settings.data[i]; // Return as soon as the object is found
                }
                return null; // The object was not found
            }
        }, options);

        if ($.isFunction(settings.startConvo)) {
            //Initialize theme here
            settings.setTheme();
            settings.startConvo.call(this);
        }

        $("body").on("click", ".cui_option", function () {
            var option = $(this).text();
            var pathTo = $(this).attr("data-path");
            //make the current selected option float away
            $(this).removeClass("slide-up");
            setTimeout(function () {
                $(".cui__response").html("");
            }, 450);

            if (pathTo === "intro") {
                //Do something here
            }

            settings.createCuiBubble(option, "human", pathTo);
            settings.scrollBody();
        });

        //when the type is write, so something crazy
        $("body").on("click", ".cui_option_btn_submit", function () {
            var response = $(".cui_option_input").html();

            //make sure the content has something
            if (response === "") {
                return;
            }

            var pathTo = $(this).attr("data-path");
            var expected = $(".cui_option_btn_submit").attr("data-expected");
            var pathTrue = $(".cui_option_btn_submit").attr("data-pathTrue");
            var pathFalse = $(".cui_option_btn_submit").attr("data-pathFalse");
            //make the current selected option float away
            $(this).removeClass("slide-up");
            setTimeout(function () {
                $(".cui__response").html("");
            }, 150);

            if (response === expected) {
                settings.createCuiBubble(response, "human", pathTrue);
                settings.scrollBody();
            } else {
                settings.createCuiBubble(response, "human", pathFalse);
                settings.scrollBody();
            }
        });

        //when the type is write, & user clicks on enter
        $("body").on('keydown', '.cui_option_input', function (e) {
            if (e.which !== 8 && settings.checkCuiInputLength(settings.inputCharLimit) === true) {
                e.preventDefault();
                return;
            }
            if (e.keyCode === 13) {
                e.preventDefault();
                var response = $(this).html();

                //make sure the content has something
                if (response === "") {
                    return;
                }

                var expected = $(".cui_option_btn_submit").attr("data-expected");
                var pathTrue = $(".cui_option_btn_submit").attr("data-pathTrue");
                var pathFalse = $(".cui_option_btn_submit").attr("data-pathFalse");
                //make the current selected option float away
                $(this).removeClass("slide-up");
                setTimeout(function () {
                    $(".cui__response").html("");
                }, 150);

                if (response === expected) {
                    settings.createCuiBubble(response, "human", pathTrue);
                    settings.scrollBody();
                } else {
                    settings.createCuiBubble(response, "human", pathFalse);
                    settings.scrollBody();
                }
            }
        });

        //limit character count on cui_option_input
        $(".cui_option_input").keyup(function (e) {
            if (e.which !== 8 && settings.checkCuiInputLength(settings.inputCharLimit) === true) {
                e.preventDefault();
            }
        });

    };

}(jQuery));

