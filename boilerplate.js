'use strict';

// Use this to parse arguments for solve
var parse = function(input) {
  var N = input.readWord();
  
  return [N];
};

// Solution Implementation
var solve = function(N) {

  var len = N.length;
  var steps = 0;

  while(true) {

    var done = getDone(N);
    if(done == len)
      return steps;

    var pluses = 0;
    while(pluses < len && N.charAt(pluses) == "+")
      pluses++;

    if(pluses) {
      N = flip(N, pluses);
      steps++;
    }

    N = flip(N, len - done);
    steps++;
  }

  return steps;
};

var flip = function(s, n) {
  var res = "";
  for(var i = 0, len = s.length; i<len; i++) {
    if(i < n)  { 
      var c = s.charAt(n - i - 1);
      res += c == "-" ? "+" : "-";
    }
    else 
      res += s.charAt(i);
  }
  return res;
};

var getDone = function(s) {
  var n = 0;
  for(var i = s.length - 1; i>=0; i--) {
    if(s.charAt(i) == "-")
      return n;
    n++;
  }
  return n;
}




// Boilerplate
var fs = require('fs');
var inputFile = "data.in";

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