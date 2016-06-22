'use strict';

var digits = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];

// Use this to parse arguments for solve
var parse = function(input) {
  var S = input.readWord();
  return [S];
};

// Solution Implementation
var solve = function(S) {

  var forbidden = new Array();
  
  var out = "";
  

  while(1) {

    var s = S.split('');

    for(var i = 0; i < digits.length; i++) {
  //    console.log(digits[i]);

      while(1) {
        var digit = digits[i].split('');

        var sBackup = s.slice();
        for(var j = 0; j < s.length; j++) {

          for(var k = 0; k < digit.length; k++) {

            if(s[j] == digit[k]) {
  //            console.log(s+ " = " + digit + " = " + s[j]);
              s.splice(j, 1);
              digit.splice(k, 1);

              if(digit.length == 0) {

                var isForbidden = false;
                for(var o = 0; o < forbidden.length; o++) {

                  if(i == forbidden[o][forbidden[o].length - 1]) {
                    isForbidden = true;
                    console.log("forb");
                    break;
                  }
                }

                if(!isForbidden)
                  out+=i;
                break;
              }

              k--;
              j--;
            }
          }
        }
        if(digit.length) {
          s = sBackup;
          break;
        }
      }
    }

    if(!s.length)
        break;

    forbidden.push(out);
    console.log(forbidden);
  }
  
  

  return out;
};



// Boilerplate
var fs = require('fs');
var bigInt = require("big-integer");
var inputFile = "A-small-attempt0.in";

function Input(input) {
  this.input = input;
}

var run = function(input) {
  
  input = new Input(input);
  var T = input.readInt();

  var output = '';


  for (var t = 1; t <= T; t++) {
    output += 'Case #' + t + ': ' + solve.apply(null, parse(input)) + '\n';
  }

  console.log(output);

  if (inputFile) {
    var outputFile = inputFile.replace('.in', '.out');
    fs.writeFile(outputFile, output, function(err) {
      if (err) throw err;
    });
  }
};

Input.prototype = {
  readLine: function() {
    var index = this.input.indexOf('\n');
    var line = this.input.substring(0, index);
    this.input = this.input.substr(index + 1);
    return line;
  },
  readWord: function() {
    var re = /(\S+)\s*/;
    var result = re.exec(this.input);
    if (result) {
      this.input = this.input.substr(result[0].length);
      return result[1];
    }
  },
  readInt: function(radix) {
    if (typeof radix !== 'number') {
      radix = 10;
    }
    return parseInt(this.readWord(), radix);
  },
  readFloat: function() {
    return parseFloat(this.readWord());
  },
  readN: function(n, f) {
    var res = [];
    for (var i = 0; i < n; i++) {
      res.push(f.call(this, this));
    }
    return res;
  },
  readLines: function(n) {
    return this.readN(n, this.readLine);
  },
  readWords: function(n) {
    return this.readN(n, this.readWord);
  },
  readInts: function(n, radix) {
    return this.readN(n, this.readInt.bind(this, radix));
  },
  readFloats: function(n) {
    return this.readN(n, this.readFloat);
  }
};


// Get input
if (inputFile) {
  // From file
  fs.readFile(inputFile, 'utf8', function(err, input) {
    if (err) throw err;
    run(input);
  });
}