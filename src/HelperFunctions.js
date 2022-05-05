//#region validate email and password
export const validateEmail = (email) => {
  if (!email) return false;
  const emailBits = email.toLowerCase().split("@"); // will return original string if no @ is found, else an array of strings
  if (email.split(" ").length > 1) return false;
  if (emailBits.length !== 2) return false; // only 1 at
  if (emailBits[1].split(".").length > 2) return false; // only 1 dot after at

  return true;
};

export const validatePassword = (password) => {
  if (!password) return false;
  const arrPass = password.split("");
  const isLongEnough = arrPass.length >= 8 ? true : false;
  const specialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/; // regex
  let isOneMaj = false;
  let isOneMin = false;
  let isOneNumber = false;
  let isOneSpecial = false;

  for (let i = 0; i < arrPass.length; i++) {
    if (!isOneMaj)
      isOneMaj = arrPass[i] === arrPass[i].toUpperCase() ? true : false;
    if (!isOneMin)
      isOneMin = arrPass[i] === arrPass[i].toLowerCase() ? true : false;
    if (!isOneNumber) isOneNumber = isNaN(Number(arrPass[i])) ? false : true;
    if (!isOneSpecial) {
      if (specialCharacters.test(arrPass[i])) isOneSpecial = true; //test() to test regex
    }
  }

  if (isLongEnough && isOneMaj && isOneMin && isOneNumber && isOneSpecial) {
    return true;
  } else return false;
};
//#endregion
