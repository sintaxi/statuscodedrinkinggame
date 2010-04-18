

function random(minVal,maxVal,floatVal) {
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

var prob = [101,200,201,300,301,305,307,401,406,410,411,413,417,417,418,500];
var code = random(0,prob.length -1);

system.use('sammy');

var statusCodes = [
  [101, "change direction. everyone drinks!"],
  [200, "everyone drinks!"],
  [201, "create a rule. then drink"],
  [300, "choose several people to drink"],
  [301, "choose someone to drink with. its then their turn"],
  [305, "someone else feeds you a drink"],
  [307, "choose someone to drink"],
  [401, "everyone but you drinks"],
  [406, "drink twice"],
  [410, "remove a rule (if one has been created)"],
  [411, "take a long drink"],
  [413, "thats what she said! everyone drinks"],
  [417, "last person to put their hand over thir eye drinks"],
  [418, "sing I'm a little teapot then drink if people liked it"],
  [500, "Arrrrrrrrrrrrrr drink."]
];


GET("/",function(){
  
  
  for (var n = 0; n < statusCodes.length;n++) {
    if (statusCodes[n][0] == prob[code]) {
        resp = statusCodes[n];
    }
  }
  
  this.response.code = resp[0];
  this.response.body = "\n\n {code:" + resp[0] + ", rule:" + resp[1] + "}\n\n";

  throw this.response;
  
});