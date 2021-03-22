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

const FenceCipherDetector = (str) => {
  let res = [];
  for (let index = 0; index < str.length; index++) {
    res.push(decryptFenceCipher(str, index));
  }
  return res;
};

// console.log(decryptFenceCipher("cga4eotn1znhh0", 3));
// var str = readlineSync.question("> Enter string you want to encrypt? ");
// var number = readlineSync.question("> Enter 'k number' you want to encrypt? ");

// console.log(
//   ">String after encrypt: ",
//   encryptFenceCipher(str, parseInt(number))
// );

function showMenu() {
  console.log("1> Encrypt string with Fence-Cipher");
  console.log("2> Decrypt string with Fence-Cipher");
  console.log("3> Decrypt string with Fence-Cipher without key");
  console.log("4> End Program");
}
function main() {
  showMenu();
  let choose = readlineSync.question("> Choose your option? ");
  switch (parseInt(choose)) {
    case 1:
      let plaintext = readlineSync.question(
        "> Enter plantext you want to encrypt? "
      );
      var key = readlineSync.question(
        "> Enter 'k number' you want to encrypt? "
      );
      console.log(
        "> Your Ciphertext: ",
        encryptFenceCipher(plaintext, parseInt(key))
      );
      console.log("\n \n");
      console.log(
        "============================================================="
      );
      main();
      break;
    case 2:
      let ciphertext = readlineSync.question(
        "> Enter ciphertext you want to decrypt? "
      );
      var key = readlineSync.question("> Enter 'k number' ");
      console.log(
        "> Your plaintext: ",
        decryptFenceCipher(ciphertext, parseInt(key))
      );
      console.log("\n \n");
      console.log(
        "============================================================="
      );
      main();
      break;
    case 3:
      let ciphertextToDetect = readlineSync.question(
        "> Enter ciphertext you want to decrypt without the key? "
      );
      FenceCipherDetector(ciphertextToDetect).forEach((item, index) => {
        console.log(`${index}: ${item}`);
      });
      console.log("\n \n");
      console.log(
        "============================================================="
      );
      main();
      break;
    case 4:
      console.log("End Program");
      break;
  }
}

main();
