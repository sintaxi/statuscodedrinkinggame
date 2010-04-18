
function main(){
  
  // rules to the game
  var statusCodes = [
    [200, "everyone drinks!"],
    [201, "create a drinking rule. then drink"],
    [202, "you will drink, after the next persons turn"],
    [300, "choose multiple people to drink"],
    [301, "choose someone to drink with. its then their turn"],
    [305, "someone else feeds you a drink"],
    [307, "choose someone to drink"],
    [401, "everyone but you drinks"],
    [406, "drink twice"],
    [410, "remove a drinking rule (if one has been created)"],
    [411, "take a long drink"],
    [413, "thats what she said! everyone drinks"],
    [417, "last person to put their hand over thir eye drinks"],
    [418, "sing \"I'm a little teapot\" then drink"],
    [500, "oh fuck, drink"]
  ]
  
  // no comment nessisary
  var rand = Math.floor(Math.random() * (statusCodes.length -1))
  
  // response
  var code = statusCodes[rand][0]
  var head = ["X-Drinking-Instructions", statusCodes[rand][1]]
  var body = "To play the game, view your header (hint: curl http://statuscodedrinkinggame.com -I)\n"
  
  // drink
  return [code, head, body];
}
