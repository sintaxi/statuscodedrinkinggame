
function main(){
  // cause errors. dont use them...
  // 407
  
  // rules to the game
  var statusCodes = [
    [200, "OK",                             "Calm the fuck down. no one drinks."],
    [201, "Created",                        "Create a drinking rule. then drink."],
    [202, "Accepted",                       "You will drink, after the next persons turn."],
    [300, "Multiple Choices",               "Choose multiple people to drink."],
    [301, "Moved Permanently",              "Choose someone to drink with. its then their turn."],
    [305, "Use Proxy",                      "Person to your right feeds you a drink."],
    [307, "Temporary Redirect",             "Choose someone to drink."],
    [401, "Unauthorized",                   "Everyone but you drinks."],
    [403, "Forbidden",                      "Miss a turn, Must drink double on next turn."],
    [404, "Not Found",                      "Last person to make a greeting must drink."],
    [406, "Not Acceptable",                 "Must drink twice, loser."],
    [408, "Request Timeout",                "Last person to look at their watch, drinks."],
    [409, "Conflict",                       "Drink, then go again."],
    [410, "Gone",                           "Remove a drinking rule (if one has been created)."],
    [411, "Length Required",                "Take a looooong drink."],
    [412, "Precondition Failed",            "You may add a precondition to drinking."],
    [413, "Requested Range Not Satisfiable","Person on your left and right drink with you."],
    [416, "Request Entity Too Large",       "Thats what she said! Everyone drinks."],
    [417, "Expectation Failed",             "Drink before your turn? if not, drink and go again."],
    [418, "I'm a Teapot",                   "Sing \"I'm a little teapot\". Drink"],
    [500, "Internal Server Error",          "Oh fuck, Everone drinks!"]
  ]
  
  // no comment nessisary
  var rand = Math.floor(Math.random() * (statusCodes.length))
  
  // response
  var code = statusCodes[rand][0]
  var head = ["X-Drinking-Instructions", statusCodes[rand][2]]
  var body = ""
  body += "<html><head><title>Status Code Drinking Game</title><style>"
  body += "body{ background:#000;margin:0;padding:5px;}"
  body += "pre{font-size:1em;margin:0;padding:0em .2em;color:#FFF;font-family:Monaco}"
  body += "</style></head><body><pre>"
  body += statusCodes[rand][0] + " " + statusCodes[rand][1] + "\n" + statusCodes[rand][2]
  body += "</pre></body></html>"
  
  // drink!
  return [code, head, body];
}
