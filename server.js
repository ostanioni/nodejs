var _ = require('lodash'),
    util = require('util');

function interceptStdout(callback) {
 var old_stdout_write = process.stdout.write,
     old_console_error = console.error;

 process.stdout.write = (function(write) {
   return function(string, encoding, fd) {
     var args = _.toArray(arguments);
     write.apply(process.stdout, args);

     // only intercept the string
     callback.call(callback, string);
   };
 }(process.stdout.write));

 console.error = (function(log) {
   return function() {
     var args = _.toArray(arguments);
     args.unshift('[ERROR]');
     console.log.apply(console.log, args);
     
     // string here encapsulates all the args
     callback.call(callback, util.format(args));
   };
 }(console.error));

 // puts back to original
 const unhook = ()=>{
  process.stdout.write = old_stdout_write;
  console.error = old_console_error;
 };
 setTimeout(10000, unhook)
};
