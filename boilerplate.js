'use strict';

// Use this to parse arguments for solve
var parse = function(input) {
  var N = input.readInt();
  var J = input.readInt();
  
  return [N, J];
};

// Solution Implementation
var solve = function(N, J) {
  var out = "";
  var minj = "", maxj = "";
  for(var i = 0; i < N; i++) {
    if(i == 0 || i == N - 1) {
      minj+="1";
      maxj+="1";
    }
    else {
      minj+="0";
      maxj+="1";
    }
  }

  minj = bigInt(minj, 2);
  maxj = bigInt(maxj, 2);


/*
  var mins = {},
    maxs = {};

  for(var i = 2; i <= 10; i++) {
    mins[i] = bigInt(minj.toString(2), i);
    maxs[i] = bigInt(maxj.toString(2), i);
  }
*/
//  console.log(mins);
  //console.log(maxs);

  for(var cur = minj, j = 0; cur.leq(maxj) && j < J; cur = cur.add(2)) {
    

    var isPrime = false;
    var divisors = [];

    for(var i = 2; i <= 10; i++) {
        var curn = bigInt(cur.toString(2), i);
        //console.log(curn.toString(10));
        
        
        if(curn.isProbablePrime()) {
          isPrime = true;
          break;
        }
        

        for(var d = bigInt(2); d.leq(1000); d = d.add(1)) {
          if(curn.isDivisibleBy(d)) {
            divisors.push(d);
            break;
          }
          //console.log(d);
        }
    }


    if(!isPrime && Object.keys(divisors).length == 9) {
      out += cur.toString(2) + " ";
      out += divisors.join(" ") + "\n";
      j++;
     }
  }



  return out;
};



// Boilerplate
var fs = require('fs');
var bigInt = require("big-integer");
var inputFile = "data.in";

function Input(input) {
  this.input = input;
}

var run = function(input) {
  
  input = new Input(input);
  var T = input.readInt();

  var output = '';


  for (var t = 1; t <= T; t++) {
    output += 'Case #' + t + ':\n' + solve.apply(null, parse(input)) + '\n';
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