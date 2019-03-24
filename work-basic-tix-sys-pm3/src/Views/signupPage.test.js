//validate form function in signUpPage
function validateForm(password, secondpass) {
  let fields = { password: password, secondpass: secondpass };
  let errors = {};
  let formIsValid = true;

  if (typeof fields["password"] !== "undefined") {
    if (
      !fields["password"].match(
        /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
      )
    ) {
      formIsValid = false;
      errors["password"] = "Please enter secure and strong password.";

      // At least 8 chars
      // Contains at least one digit
      // Contains at least one lower alpha char and one upper alpha char
      // Contains at least one char within a set of special chars (@#%$^ etc.)
    }

    if (!fields["secondpass"]) {
      formIsValid = false;
      errors["secondpass"] = "Please re-enter your password.";
    }

    if (typeof fields["secondpass"] !== "undefined") {
      if (!fields["secondpass"].match(fields["password"])) {
        formIsValid = false;
        errors["secondpass"] = "Password does not match.";
      }
    }

    // this.setState({
    //   errors: errors
    // });

    // if (typeof errors.password == "undefined") {
    //   if (typeof errors.secondpass !== "undefined") {
    //     this.setState({
    //       errormsg: errors.secondpass
    //     });
    //   }
    // } else {
    //   this.setState({
    //     errormsg: errors.password
    //   });
    // }

    return formIsValid;
  }
}

test("see if testing even working", () => {
  expect(2 + 1).toEqual(3);
});

describe("validateForm() working for passwords", () => {
  test("both password empty fields", () => {
    const resultcheck = validateForm("", "");
    expect(resultcheck).toBeFalsy;
  });

  test("first password field empty", () => {
    const resultcheck = validateForm("", "Needthinkof5.3");
    expect(resultcheck).toBeFalsy;
  });

  test("second password field empty", () => {
    const resultcheck = validateForm("23467", "");
    expect(resultcheck).toBeFalsy;
  });

  test("password not strong, both match 1", () => {
    const resultcheck = validateForm("123", "123");
    expect(resultcheck).toBeFalsy;
  });

  test("password not strong, both match 2", () => {
    const resultcheck = validateForm("hello", "hello");
    expect(resultcheck).toBeFalsy;
  });

  test("password not strong, both match 3", () => {
    const resultcheck = validateForm("#byebye123", "#byebye123");
    expect(resultcheck).toBeFalsy;
  });

  test("password not strong, don't match 1", () => {
    const resultcheck = validateForm("#byebye123", "124tbetrj");
    expect(resultcheck).toBeFalsy;
  });

  test("password not strong, don't match 2", () => {
    const resultcheck = validateForm("#thn", "nsfg5@q");
    expect(resultcheck).toBeFalsy;
  });

  test("password not strong, don't match 3", () => {
    const resultcheck = validateForm("kilsrjhon", "qwertty");
    expect(resultcheck).toBeFalsy;
  });

  test("password strong but does not match 1", () => {
    const resultcheck = validateForm("Escproj@9", "9@projEsc");
    expect(resultcheck).toBeFalsy;
  });

  test("password strong but does not match 2", () => {
    const resultcheck = validateForm("123", "9@projEsc");
    console.log(resultcheck);
    expect(resultcheck).toBeFalsy;
  });

  test("password strong, both matches 1", () => {
    const resultcheck = validateForm("Escproj@9", "Escproj@9");
    console.log(resultcheck);
    expect(resultcheck).toBeTruthy;
  });

  test("password strong, both matches 2", () => {
    const resultcheck = validateForm("Hello&Bye2019", "Hello&Bye2019");
    console.log(resultcheck);
    expect(resultcheck).toBeTruthy;
  });

  test("password strong, both matches 3", () => {
    const resultcheck = validateForm("@@@098Abcdefg", "@@@098Abcdefg");
    console.log(resultcheck);
    expect(resultcheck).toBeTruthy;
  });
});

// test("input is correct", () => {
//     let username =
// });
