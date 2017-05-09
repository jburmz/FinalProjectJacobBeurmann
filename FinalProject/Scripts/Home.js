var Home = {}

Home.CreateButtonClick = function ()
{
    $.ajax
    ({
        url: "Home/CreateAccount",

        data:
            {
                Username: $(".createUser").val(),
                Password: $(".createPassword").val(),
                EmailAdd: $(".createEmail").val(),
                EmailCon: $(".createConfirm").val()
            },

        success:
            function(results)
            {

               var obj = JSON.parse(results);

                if (obj.Message == "Success")
                {
                    var name = $(".createUser").val();
                    Home.GetAccountInfo(name);
                }
                else
                {
                    if(obj.Username == "Invalid")
                    {
                        $(".createUserInvalid").css("display", "block");
                    }
                    if (obj.Username == "Exists")
                    {
                        $(".createUserExists").css("display", "block");
                    }
                    if (obj.Password == "Invalid")
                    {
                        $(".createPasswordInvalid").css("display", "block");
                    }
                    if (obj.EmailAdd == "Invalid")
                    {
                        $(".createEmailInvalid").css("display", "block");
                    }
                    if (obj.EmailCon == "Invalid")
                    {
                        $(".createConfirmInvalid").css("display", "block");
                    }
                    if (obj.EmailCon == "Mismatch")
                    {
                        $(".createConfirmMismatch").css("display", "block");
                    }
                }
                
            }
    });
}

Home.LoginButtonClick = function () {
    $.ajax
    ({
        url: "Home/Login",

        data:
            {
                Username: $(".loginUser").val(),
                Password: $(".loginPassword").val()
            },

        success:
            function (results) {

                var obj = JSON.parse(results);

                if (obj.Message == "Success") {
                    var name = $(".loginUser").val();
                    Home.GetAccountInfo(name);
                }
                else
                {
                    if (obj.Username == "Invalid") {
                        $(".userError").css("display", "block");
                    }
                    if (obj.Password == "Wrong") {
                        $(".passwordError").css("display", "block");
                    }
                }

            }
    });
}

Home.UpdateButtonClick = function () {
    $.ajax
    ({
        url: "Home/AddOrUpdateElement",

        data:
            {
                Username: $(".displayName").text(),
                ElementName: "emailadd",
                ElementValue: $(".displayEmail").val()
            },

        success:
            function (results) {

                var obj = JSON.parse(results);

                if (obj.Message == "Success") 
                {
                    alert("E-mail Updated.");
                }
                else 
                {
                    alert("Error: " + obj.Error);
                }
            }

        
    });
}

Home.AddButtonClick = function () {
    $.ajax
    ({
        url: "Home/AddOrUpdateElement",

        data:
            {
                Username: $(".displayName").text(),
                ElementName: $(".elementNameInput").val(),
                ElementValue: $(".elementValueInput").val()
            },

        success:
            function (results) {

                var obj = JSON.parse(results);

                if (obj.Message == "Success")
                {
                   $(".key").remove();
                   $(".value").remove();
                   $('#update').each(function () {
                       $(this).remove();
                   });
                   var name = $(".displayName").text();
                   Home.GetAccountInfo(name);
                }
                else
                {
                    alert("Error: " + obj.Error);
                }
            }


    });
}

Home.GetAccountInfo = function (userName) {
    $.ajax
    ({
        url: "Home/GetAccountInformation",

        data:
            {
                Username: userName
            },

        success:
            function (results) {

                var obj = JSON.parse(results);
                var obj2 = JSON.parse(obj.Payload);

                if (obj.Message == "Success") {
                    $(".displayName").text(obj2.account.username);
                    //$(".displayEmail").val(obj2.account.emailadd);

                    $.each(obj2.account, function (key, value) {
                        if (key != "username" && key != "password")
                        {

                            jQuery('<div/>', {
                                class: 'key',
                                css: {
                                    "margin": "1em 0 0 3em"
                                },
                                text: key
                            }).appendTo('.accountLeft');

                            jQuery('<input/>', {
                                class: 'value',
                                type: 'text',
                                css: {
                                    "margin": ".5em 0 0 1em"
                                },
                                val: value
                            }).appendTo('.accountRight');

                            jQuery('<input/>', {
                                id: 'update',
                                class: '.updateButton',
                                type: 'button',
                                css: {
                                "background-color": "#ADD8E6",
                                "border-radius": "8px",
                                "margin-top": ".5em",
                                "margin-right": "1em",
                                "width": "80px",
                                "float": "right"
                                },
                                val: "Update"
                            }).appendTo('.accountRight');

                            //margin: 1em 0 0 3em;

                            //margin: 1em 0 0 1em;
                            //alert(key + ": " + value);
                        }
                    });


                    $(".login").css("display", "none");
                    $(".create").css("display", "none");
                    $(".accountInfo").css({
                        "display": "block",
                        "margin": "1em 0em 0em 4em"
                    });

                    $(".accountLeft").css({
                        "display": "block",
                        "border": "1px solid black",
                        "float": "left",
                        "width": "140px",
                        "height": "100px"

                    });

                    $(".accountRight").css({
                        "display": "block",
                        "border": "1px solid black",
                        "float": "left",
                        "width": "270px",
                        "height": "100px"

                    });

                    $(".addElement").css({
                        "display": "block",
                        "width": "260px",
                        "margin": "1em auto"
                    });


                    

                }
                else {
                    alert("Account Info Retrieval Failed");
                }

            }
    });
}

$(document).ready(function () {
    $(".createButton").click(Home.CreateButtonClick);
    $(".loginButton").click(Home.LoginButtonClick);
    $(".updateButton").click(Home.UpdateButtonClick);
    $(".addButton").click(Home.AddButtonClick);
});