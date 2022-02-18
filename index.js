/**
 * TODO
 * -> Initialize user balances in data structure [✔️]
 *
 * -> Read text file [✔️]
 *
 * -> Convert string input into array line by line[]:
 *      -> Split text input into array [✔️]
 *      -> Split each line of text input to array inside array [✔️]
 *
 * -> Convert text file into json format for easy transaction processing [✔️]
 *
 * -> Find alternative other than converting to json format
 *
 * -> Create Transaction operations [✔️]
 *      -> General operations [✔️]
 *      -> Validity of operations taking place based on account balace [✔️]
 *
 * -> Verify final output of user accounts [✔️]
 *
 */
const fs = require("fs");

// TODO Initialize user balances
const userBalances = [
  { name: "Wanjiru", balance: 0 },
  { name: "Juma", balance: 0 },
  { name: "Linda", balance: 0 },
];

// Initialize data variable
let data;

// Custom functions
// TODO read text file
const readTextFile = (inputFile) => {
  try {
    return fs.readFileSync(inputFile, "utf8");
  } catch (e) {
    return e.stack;
  }
};

// Convert array data to object
const dataToArrayObject = (dataToConvert) => {
  let holderArr = [];
  for (let i = 0; i < dataToConvert.length; i++) {
    // Remove carrage return from each line of string
    dataToConvert[i] = dataToConvert[i].replace(/(\r\n|\n|\r)/gm, "");

    // Push each instance as array object
    holderArr.push(Object.assign({}, dataToConvert[i].split(":")));
  }

  return holderArr;
};

data = readTextFile("Input_text.txt");

// Split text input into array
let splitData = data.split("\n");

// Convert each element of split array into array base on semicolon
holderArr = dataToArrayObject(splitData);

// Transaction operations
holderArr.forEach((elem) => {
  if (elem[0] === "DEPOSIT") {
    // Find object where name is specified
    let obj = userBalances.find((e) => e.name === elem[1]);

    obj.balance += parseFloat(elem["2"]);
  }

  if (elem[0] === "WITHDRAW") {
    let obj = userBalances.find((e) => e.name === elem["1"]);

    if (obj.balance >= parseFloat(elem["2"]))
      obj.balance -= parseFloat(elem["2"]);
  }

  if (elem[0] === "TRANSFER") {
    let objTransfer = userBalances.find((e) => e.name === elem["1"]);
    let objRecieve = userBalances.find((e) => e.name === elem["2"]);

    // Check for valid balance to transfer
    if (objTransfer.balance >= parseFloat(elem["3"])) {
      // Deduct from object transfer
      objTransfer.balance -= parseFloat(elem["3"]);
      // Credit to object recieve
      objRecieve.balance += parseFloat(elem["3"]);
    }
  }
});

// Write Final balances to external file
// fs.writeFileSync(
//   "final_balances.txt",
//   JSON.stringify(userBalances, null, 2),
//   "utf-8"
// );
