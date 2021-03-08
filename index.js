const readlineSync = require("readline-sync");

const encryptFenceCipher = (str, key) => {
  const res = [];
  while (res.length < key) res.push([]);
  for (let j = 0; j < str.length; j++) {
    let index = j % key;
    res[index].push(str[j]);
  }
  let result = "";
  res.forEach((item) => {
    return (result += item.join(""));
  });
  // console.log(res);
  return result;
};

const decryptFenceCipher = (str, key) => {
  if (key === 0) {
    return str;
  }
  let result = "";
  let group = Math.ceil(str.length / key);

  const res = [];
  let index = 0;
  while (res.length < key) res.push([]);
  for (let i = 0; i < str.length; i += group) {
    res[index].push(str.substring(i, i + group));
    index++;
  }
  //console.log(res);

  let strLength = 0;
  while (strLength !== group) {
    for (let i = 0; i < key; i++) {
      var temp = res[i].toString().split("")[strLength];
      if (temp != undefined) {
        result += temp;
      }
    }
    //console.log(result);
    strLength++;
  }

  return result;
};

// console.log(decryptFenceCipher("cga4eotn1znhh0", 3));
// var str = readlineSync.question("> Enter string you want to encrypt? ");
// var number = readlineSync.question("> Enter 'k number' you want to encrypt? ");

// console.log(
//   ">String after encrypt: ",
//   encryptFenceCipher(str, parseInt(number))
// );
