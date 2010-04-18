

function random(minVal,maxVal,floatVal) {
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

var prob = [
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    200,200,200,200,200,200,200,200,200,200,
    500,500,500,500,500,500,500,500,500,500
];

var code = random(0,prob.length);

function main(){
  
  prob[code]
  
  var status_codes = [
    [200, "hello world"],
    [500, "DRINK"],    
  ];


  for (var n = 0; n < status_codes.length;n++) {
    if (status_codes[n][0] == prob[code]) {
        return (status_codes[n][1]);
    }
  }
  
  // return [201, [], "hello there"];
}

