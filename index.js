const rs = require('readline-sync');

console.log('\n------------DIFFIE HELLMAN---------------\n');

const p = rs.question('Please enter an integer value for p: ');
const g = rs.question('Please enter an integer value for g: ');

let SA = getRandomNumber();
let SB = getRandomNumber();

console.log('\nSA =', SA);
console.log('SB =', SB);

console.log('\nComputing the secret key. Please wait...\n');

let TA = getModofHighPow(g, SA, p);
let TB = getModofHighPow(g, SB, p);

let secretKey1 = getModofHighPow(TB, SA, p);
let secretKey2 = getModofHighPow(TA, SB, p);

if (secretKey1 === secretKey2) {
  console.log('The Diffie Hellman secret is', secretKey1);
} else {
  console.log('Invalid Input Parameters detected. Please try again.');
}
console.log('\n-----------------THE END------------------\n');

function getRandomNumber() {
  maxRand = 999; // 1 less the maximum random number size
  return Math.round(Math.random() * maxRand) + 1;
}

//computes recursively the mod of a highpower
function getModofHighPow(n1, SX, n2) {
  maxExp = 2; //maximum power to compute at a time
  if (SX > maxExp) {
    return (
      ((Math.pow(n1, maxExp) % n2) *
        (getModofHighPow(n1, SX - maxExp, n2) % n2)) %
      n2
    );
  } else {
    return Math.pow(n1, SX) % n2;
  }
}
