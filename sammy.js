system.use("stack");

/*
 * A test should return either an array of arguments (if successful)
 *   or a null if it isn't successful.
 */

var Sammy = {
  'debug': false,
  'Test': {
    'Method': {
      'GET':    function() { return this.request.method == 'GET';  },
      'POST':   function() { return this.request.method == 'POST'; },
      'DELETE': function() { return this.request.method == 'DELETE'; },
      'PUT':    function() { return this.request.method == 'PUT'; },
      'HEAD':   function() { return this.request.method == 'HEAD'; }
    }
  }
};

for ( var method in Sammy.Test.Method ) {
  Sammy.Test.Method[method].displayName = method;
}

Sammy.generate_test = function( testArray ) {
  var ta = function() {
    var success = [];
    for ( var i = 0; i < testArray.length; i++) {
      var elem = testArray[i];
      if ( typeof( elem ) == 'function' ) {
        if ( Sammy.debug && elem.displayName )
          system.console.log("testing if request matches function " + elem.displayName);
        var result = elem.apply( this, [] );
        if ( result && Sammy.debug ) system.console.log("it does!");
        if ( result && result instanceof Array ) {
          success.push.apply(success, result);
        } else if ( !result ) {
          return null;
        } else {
          /* do nothing */
        }
      } else if ( typeof( elem ) == 'string' ) {
        if ( elem != this.request.uri ) return null;
      } else if ( elem instanceof RegExp ) {
        if (Sammy.debug)
          system.console.log("testing to see if '" + elem + "' matches '" + this.request.uri +"'");
        var matched = this.request.uri.match( elem );
        if ( matched ) {
          matched.shift();
          success.push.apply(success, matched);
        } else {
          return null;
        }
      }
    }
    return success;
  };

  return ta;
};

Sammy.Handler = function( aFunction, shouldRun, aName ) {
  this.name = aName || "unnamed";
  this.test = shouldRun;
  this.run  = function() {
    var result = aFunction.apply(this, arguments);
    if ( result ) {
      var response = Stack.response;
      response.body = result;
      return response;
    } else {
      return null;
    }
  };
};


/* add a handler for static docs */
(function() {
  var isStatic = Sammy.generate_test([ Sammy.Test.Method.GET,
              function() {
          try {
            var f = system.filesystem.get("/public" + this.request.uri );
            if (f) {
              return [ f ];
            } else return null;
          } catch(e) { return null; }
              }]);
   var doStatic = function( aFile ) {
     this.response.body = aFile;
     this.response.mime = aFile.mimetype;
     throw this.response;
   };
   var hndl = new Sammy.Handler( doStatic, isStatic );
   Stack.add( hndl );
})();

function PUT( aTest, aHandler, aName ) {
  var theTest = Sammy.generate_test([ Sammy.Test.Method.PUT, aTest]);
  var handler = new Sammy.Handler( aHandler, theTest, aName );
  Stack.add( handler );
}

function DELETE( aTest, aHandler, aName ) {
  var theTest = Sammy.generate_test([ Sammy.Test.Method.DELETE, aTest]);
  var handler = new Sammy.Handler( aHandler, theTest, aName );
  Stack.add( handler );
}

function HEAD( aTest, aHandler, aName ) {
  var theTest = Sammy.generate_test([ Sammy.Test.Method.DELETE, aTest]);
  var handler = new Sammy.Handler( aHandler, theTest, aName );
  Stack.add( handler );
}

function GET( aTest, aHandler, aName ) {
  var theTest = Sammy.generate_test([ Sammy.Test.Method.GET, aTest]);
  var handler = new Sammy.Handler( aHandler, theTest, aName );
  Stack.add( handler );
}

function POST( aTest, aHandler, aName ) {
  var theTest = Sammy.generate_test([Sammy.Test.Method.POST, aTest]);
  var handler = new Sammy.Handler( aHandler, theTest, aName );
  Stack.add( handler );
}

function before( aHandler, aName ) {
  var theTest = Sammy.generate_test([]);
  var handler = new Stack.Handler( aHandler, theTest, aName );
  Stack.add( handler, "early" );
}

function template( aFilename ) {
  system.use("com.github.ashb.Template");
  var tt = new Template();
  var theFile = system.filesystem.get( aFilename );
  return tt.process( theFile.contents, Stack );
}

template.tt = template;
template.trimpath = function( aFilename ) {
  system.use("com.google.code.trimpath.Template");
  var theFile = system.filesystem.get( aFilename );
  return theFile.contents.process( Stack );
};

function enable( aFeature ) {
  var featureLibrary;
  if ( aFeature.match(/\./ ) ) featureLibrary = aFeature;
  else featureLibrary = ["com.joyent.Sammy", aFeature].join(".");
  system.use( featureLibrary );
}

function redirect( aLocation ) {
  var response = new Stack.Response();
  response.code = 302;
  response.headers.Location = aLocation;
  throw response;
}
