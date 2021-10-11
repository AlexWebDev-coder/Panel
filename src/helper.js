/** @format */

// let SERVER_API = "https://onboarding.paymob.app/api/";
let SERVER_API = "http://157.90.116.115:8081/api/";

const timeout = 30000;

export const Fetchs = async (url, data, method, token, cb) => {
  let result;
  if (method !== "GET") {
    result = await fetch(SERVER_API + url, {
      accept: "application/json",
      method: method,
      body: JSON.stringify(data),
      headers: new Headers(
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        timeout
      ),
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err); ///Comments
        return {
          error: true,
          body: {
            tm: "Häzirki wagtda maglumat almak mümkin däl",
            ru: "Невозможно получить данные с сервера",
          },
        };
      });
  } else {
    let query = new URL(SERVER_API + url);
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      query.searchParams.append(keys[i], data[keys[i]]);
    }
    result = await fetch(
      query,
      {
        accept: "application/json",
        method: method,
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }),
      },
      timeout
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        // console.log(err);
        return {
          error: true,
          body: {
            tm: "Häzirki wagtda maglumat almak mümkin däl",
            ru: "Невозможно получить данные с сервера",
          },
        };
      });
  }
  // console.log(
  //   "\n\tURL    ->  " + SERVER_API + url,
  //   "\n",
  //   "\tBODY   ->  ",
  //   data,
  //   "\n",
  //   "\tMETHOD ->  ",
  //   method,
  //   "\n",
  //   "\tTOKEN  ->  ",
  //   token,
  //   "\n\t---------------------------------------------------------------------------------------------------------\n",
  //   "\tRESULT <-  ",
  //   result,
  //   "\n",
  //   "\n"
  // );
  cb(result);
};

export const isEmailValid = (email) => {
  let emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;
  return true;
};

export const isValid = (p) => {
  let phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  let digits = p.replace(/\D/g, "");
  return phoneRe.test(digits);
};
