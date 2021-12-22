function validateForm() {
    var email = document.forms["login"]["email"].value;
    let password = document.forms["login"]["password"].value;

    dotpos = email.lastIndexOf(".");
    atpos = email.indexOf("@");
    if (email == "") {
        alert("Enter Email ID");
        document.forms["login"]["email"].focus();
        return false;
    }
    else if (atpos < 1 || (dotpos - atpos < 2)) {
        alert("Enter Correct Email ID");
        document.forms["login"]["email"].focus();
        return false;
    }

    var upperCaseLetters = /[A-Z]/g;
    var lowerCaseLetters = /[a-z]/g;
    if (password == "") {
        alert("Please enter a Password");
        document.forms["login"]["password"].focus();
        return false;
    }
    else if (password.length < 8) {
        alert("Password should be alteast 8 characters");
        document.forms["login"]["password"].focus();
        return false;
    }
    else if (!password.match(upperCaseLetters) || !password.match(lowerCaseLetters)) {
        alert("Password should contain atleast a lowercase and uppercase letter");
        document.forms["login"]["password"].focus();
        return false;
    }
}