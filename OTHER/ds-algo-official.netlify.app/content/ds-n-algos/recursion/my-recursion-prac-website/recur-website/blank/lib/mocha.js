(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = {
        exports: {},
      });
      t[o][0].call(
        l.exports,
        function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function (require, module, exports) {
        (function (process, global) {
          "use strict";

          /* eslint no-unused-vars: off */
          /* eslint-env commonjs */

          /**
           * Shim process.stdout.
           */

          process.stdout = require("browser-stdout")();

          var Mocha = require("./lib/mocha");

          /**
           * Create a Mocha instance.
           *
           * @return {undefined}
           */

          var mocha = new Mocha({
            reporter: "html",
          });

          /**
           * Save timer references to avoid Sinon interfering (see GH-237).
           */

          var Date = global.Date;
          var setTimeout = global.setTimeout;
          var setInterval = global.setInterval;
          var clearTimeout = global.clearTimeout;
          var clearInterval = global.clearInterval;

          var uncaughtExceptionHandlers = [];

          var originalOnerrorHandler = global.onerror;

          /**
           * Remove uncaughtException listener.
           * Revert to original onerror handler if previously defined.
           */

          process.removeListener = function (e, fn) {
            if (e === "uncaughtException") {
              if (originalOnerrorHandler) {
                global.onerror = originalOnerrorHandler;
              } else {
                global.onerror = function () {};
              }
              var i = Mocha.utils.indexOf(uncaughtExceptionHandlers, fn);
              if (i !== -1) {
                uncaughtExceptionHandlers.splice(i, 1);
              }
            }
          };

          /**
           * Implements uncaughtException listener.
           */

          process.on = function (e, fn) {
            if (e === "uncaughtException") {
              global.onerror = function (err, url, line) {
                fn(new Error(err + " (" + url + ":" + line + ")"));
                return !mocha.allowUncaught;
              };
              uncaughtExceptionHandlers.push(fn);
            }
          };

          // The BDD UI is registered by default, but no UI will be functional in the
          // browser without an explicit call to the overridden `mocha.ui` (see below).
          // Ensure that this default UI does not expose its methods to the global scope.
          mocha.suite.removeAllListeners("pre-require");

          var immediateQueue = [];
          var immediateTimeout;

          function timeslice() {
            var immediateStart = new Date().getTime();
            while (
              immediateQueue.length &&
              new Date().getTime() - immediateStart < 100
            ) {
              immediateQueue.shift()();
            }
            if (immediateQueue.length) {
              immediateTimeout = setTimeout(timeslice, 0);
            } else {
              immediateTimeout = null;
            }
          }

          /**
           * High-performance override of Runner.immediately.
           */

          Mocha.Runner.immediately = function (callback) {
            immediateQueue.push(callback);
            if (!immediateTimeout) {
              immediateTimeout = setTimeout(timeslice, 0);
            }
          };

          /**
           * Function to allow assertion libraries to throw errors directly into mocha.
           * This is useful when running tests in a browser because window.onerror will
           * only receive the 'message' attribute of the Error.
           */
          mocha.throwError = function (err) {
            Mocha.utils.forEach(uncaughtExceptionHandlers, function (fn) {
              fn(err);
            });
            throw err;
          };

          /**
           * Override ui to ensure that the ui functions are initialized.
           * Normally this would happen in Mocha.prototype.loadFiles.
           */

          mocha.ui = function (ui) {
            Mocha.prototype.ui.call(this, ui);
            this.suite.emit("pre-require", global, null, this);
            return this;
          };

          /**
           * Setup mocha with the given setting options.
           */

          mocha.setup = function (opts) {
            if (typeof opts === "string") {
              opts = {
                ui: opts,
              };
            }
            for (var opt in opts) {
              if (opts.hasOwnProperty(opt)) {
                this[opt](opts[opt]);
              }
            }
            return this;
          };

          /**
           * Run mocha, returning the Runner.
           */

          mocha.run = function (fn) {
            var options = mocha.options;
            mocha.globals("location");

            var query = Mocha.utils.parseQuery(global.location.search || "");
            if (query.grep) {
              mocha.grep(query.grep);
            }
            if (query.fgrep) {
              mocha.fgrep(query.fgrep);
            }
            if (query.invert) {
              mocha.invert();
            }

            return Mocha.prototype.run.call(mocha, function (err) {
              // The DOM Document is not available in Web Workers.
              var document = global.document;
              if (
                document &&
                document.getElementById("mocha") &&
                options.noHighlighting !== true
              ) {
                Mocha.utils.highlightTags("code");
              }
              if (fn) {
                fn(err);
              }
            });
          };

          /**
           * Expose the process shim.
           * https://github.com/mochajs/mocha/pull/916
           */

          Mocha.process = process;

          /**
           * Expose mocha.
           */

          global.Mocha = Mocha;
          global.mocha = mocha;

          // this allows test/acceptance/required-tokens.js to pass; thus,
          // you can now do `const describe = require('mocha').describe` in a
          // browser context (assuming browserification).  should fix #880
          module.exports = global;
        }.call(
          this,
          require("_process"),
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "./lib/mocha": 14,
        _process: 67,
        "browser-stdout": 41,
      },
    ],
    2: [
      function (require, module, exports) {
        "use strict";

        function noop() {}

        module.exports = function () {
          return noop;
        };
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module exports.
         */

        exports.EventEmitter = EventEmitter;

        /**
         * Object#toString reference.
         */
        var objToString = Object.prototype.toString;

        /**
         * Check if a value is an array.
         *
         * @api private
         * @param {*} val The value to test.
         * @return {boolean} true if the value is an array, otherwise false.
         */
        function isArray(val) {
          return objToString.call(val) === "[object Array]";
        }

        /**
         * Event emitter constructor.
         *
         * @api public
         */
        function EventEmitter() {}

        /**
         * Add a listener.
         *
         * @api public
         * @param {string} name Event name.
         * @param {Function} fn Event handler.
         * @return {EventEmitter} Emitter instance.
         */
        EventEmitter.prototype.on = function (name, fn) {
          if (!this.$events) {
            this.$events = {};
          }

          if (!this.$events[name]) {
            this.$events[name] = fn;
          } else if (isArray(this.$events[name])) {
            this.$events[name].push(fn);
          } else {
            this.$events[name] = [this.$events[name], fn];
          }

          return this;
        };

        EventEmitter.prototype.addListener = EventEmitter.prototype.on;

        /**
         * Adds a volatile listener.
         *
         * @api public
         * @param {string} name Event name.
         * @param {Function} fn Event handler.
         * @return {EventEmitter} Emitter instance.
         */
        EventEmitter.prototype.once = function (name, fn) {
          var self = this;

          function on() {
            self.removeListener(name, on);
            fn.apply(this, arguments);
          }

          on.listener = fn;
          this.on(name, on);

          return this;
        };

        /**
         * Remove a listener.
         *
         * @api public
         * @param {string} name Event name.
         * @param {Function} fn Event handler.
         * @return {EventEmitter} Emitter instance.
         */
        EventEmitter.prototype.removeListener = function (name, fn) {
          if (this.$events && this.$events[name]) {
            var list = this.$events[name];

            if (isArray(list)) {
              var pos = -1;

              for (var i = 0, l = list.length; i < l; i++) {
                if (
                  list[i] === fn ||
                  (list[i].listener && list[i].listener === fn)
                ) {
                  pos = i;
                  break;
                }
              }

              if (pos < 0) {
                return this;
              }

              list.splice(pos, 1);

              if (!list.length) {
                delete this.$events[name];
              }
            } else if (list === fn || (list.listener && list.listener === fn)) {
              delete this.$events[name];
            }
          }

          return this;
        };

        /**
         * Remove all listeners for an event.
         *
         * @api public
         * @param {string} name Event name.
         * @return {EventEmitter} Emitter instance.
         */
        EventEmitter.prototype.removeAllListeners = function (name) {
          if (name === undefined) {
            this.$events = {};
            return this;
          }

          if (this.$events && this.$events[name]) {
            this.$events[name] = null;
          }

          return this;
        };

        /**
         * Get all listeners for a given event.
         *
         * @api public
         * @param {string} name Event name.
         * @return {EventEmitter} Emitter instance.
         */
        EventEmitter.prototype.listeners = function (name) {
          if (!this.$events) {
            this.$events = {};
          }

          if (!this.$events[name]) {
            this.$events[name] = [];
          }

          if (!isArray(this.$events[name])) {
            this.$events[name] = [this.$events[name]];
          }

          return this.$events[name];
        };

        /**
         * Emit an event.
         *
         * @api public
         * @param {string} name Event name.
         * @return {boolean} true if at least one handler was invoked, else false.
         */
        EventEmitter.prototype.emit = function (name) {
          if (!this.$events) {
            return false;
          }

          var handler = this.$events[name];

          if (!handler) {
            return false;
          }

          var args = Array.prototype.slice.call(arguments, 1);

          if (typeof handler === "function") {
            handler.apply(this, args);
          } else if (isArray(handler)) {
            var listeners = handler.slice();

            for (var i = 0, l = listeners.length; i < l; i++) {
              listeners[i].apply(this, args);
            }
          } else {
            return false;
          }

          return true;
        };
      },
      {},
    ],
    4: [
      function (require, module, exports) {
        "use strict";

        /**
         * Expose `Progress`.
         */

        module.exports = Progress;

        /**
         * Initialize a new `Progress` indicator.
         */
        function Progress() {
          this.percent = 0;
          this.size(0);
          this.fontSize(11);
          this.font("helvetica, arial, sans-serif");
        }

        /**
         * Set progress size to `size`.
         *
         * @api public
         * @param {number} size
         * @return {Progress} Progress instance.
         */
        Progress.prototype.size = function (size) {
          this._size = size;
          return this;
        };

        /**
         * Set text to `text`.
         *
         * @api public
         * @param {string} text
         * @return {Progress} Progress instance.
         */
        Progress.prototype.text = function (text) {
          this._text = text;
          return this;
        };

        /**
         * Set font size to `size`.
         *
         * @api public
         * @param {number} size
         * @return {Progress} Progress instance.
         */
        Progress.prototype.fontSize = function (size) {
          this._fontSize = size;
          return this;
        };

        /**
         * Set font to `family`.
         *
         * @param {string} family
         * @return {Progress} Progress instance.
         */
        Progress.prototype.font = function (family) {
          this._font = family;
          return this;
        };

        /**
         * Update percentage to `n`.
         *
         * @param {number} n
         * @return {Progress} Progress instance.
         */
        Progress.prototype.update = function (n) {
          this.percent = n;
          return this;
        };

        /**
         * Draw on `ctx`.
         *
         * @param {CanvasRenderingContext2d} ctx
         * @return {Progress} Progress instance.
         */
        Progress.prototype.draw = function (ctx) {
          try {
            var percent = Math.min(this.percent, 100);
            var size = this._size;
            var half = size / 2;
            var x = half;
            var y = half;
            var rad = half - 1;
            var fontSize = this._fontSize;

            ctx.font = fontSize + "px " + this._font;

            var angle = Math.PI * 2 * (percent / 100);
            ctx.clearRect(0, 0, size, size);

            // outer circle
            ctx.strokeStyle = "#9f9f9f";
            ctx.beginPath();
            ctx.arc(x, y, rad, 0, angle, false);
            ctx.stroke();

            // inner circle
            ctx.strokeStyle = "#eee";
            ctx.beginPath();
            ctx.arc(x, y, rad - 1, 0, angle, true);
            ctx.stroke();

            // text
            var text = this._text || (percent | 0) + "%";
            var w = ctx.measureText(text).width;

            ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);
          } catch (err) {
            // don't fail if we can't render progress
          }
          return this;
        };
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        (function (global) {
          "use strict";

          exports.isatty = function isatty() {
            return true;
          };

          exports.getWindowSize = function getWindowSize() {
            if ("innerHeight" in global) {
              return [global.innerHeight, global.innerWidth];
            }
            // In a Web Worker, the DOM Window is not available.
            return [640, 480];
          };
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var JSON = require("json3");

        /**
         * Expose `Context`.
         */

        module.exports = Context;

        /**
         * Initialize a new `Context`.
         *
         * @api private
         */
        function Context() {}

        /**
         * Set or get the context `Runnable` to `runnable`.
         *
         * @api private
         * @param {Runnable} runnable
         * @return {Context}
         */
        Context.prototype.runnable = function (runnable) {
          if (!arguments.length) {
            return this._runnable;
          }
          this.test = this._runnable = runnable;
          return this;
        };

        /**
         * Set test timeout `ms`.
         *
         * @api private
         * @param {number} ms
         * @return {Context} self
         */
        Context.prototype.timeout = function (ms) {
          if (!arguments.length) {
            return this.runnable().timeout();
          }
          this.runnable().timeout(ms);
          return this;
        };

        /**
         * Set test timeout `enabled`.
         *
         * @api private
         * @param {boolean} enabled
         * @return {Context} self
         */
        Context.prototype.enableTimeouts = function (enabled) {
          this.runnable().enableTimeouts(enabled);
          return this;
        };

        /**
         * Set test slowness threshold `ms`.
         *
         * @api private
         * @param {number} ms
         * @return {Context} self
         */
        Context.prototype.slow = function (ms) {
          this.runnable().slow(ms);
          return this;
        };

        /**
         * Mark a test as skipped.
         *
         * @api private
         * @return {Context} self
         */
        Context.prototype.skip = function () {
          this.runnable().skip();
          return this;
        };

        /**
         * Allow a number of retries on failed tests
         *
         * @api private
         * @param {number} n
         * @return {Context} self
         */
        Context.prototype.retries = function (n) {
          if (!arguments.length) {
            return this.runnable().retries();
          }
          this.runnable().retries(n);
          return this;
        };

        /**
         * Inspect the context void of `._runnable`.
         *
         * @api private
         * @return {string}
         */
        Context.prototype.inspect = function () {
          return JSON.stringify(
            this,
            function (key, val) {
              return key === "runnable" || key === "test" ? undefined : val;
            },
            2
          );
        };
      },
      {
        json3: 54,
      },
    ],
    7: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Runnable = require("./runnable");
        var inherits = require("./utils").inherits;

        /**
         * Expose `Hook`.
         */

        module.exports = Hook;

        /**
         * Initialize a new `Hook` with the given `title` and callback `fn`.
         *
         * @param {String} title
         * @param {Function} fn
         * @api private
         */
        function Hook(title, fn) {
          Runnable.call(this, title, fn);
          this.type = "hook";
        }

        /**
         * Inherit from `Runnable.prototype`.
         */
        inherits(Hook, Runnable);

        /**
         * Get or set the test `err`.
         *
         * @param {Error} err
         * @return {Error}
         * @api public
         */
        Hook.prototype.error = function (err) {
          if (!arguments.length) {
            err = this._error;
            this._error = null;
            return err;
          }

          this._error = err;
        };
      },
      {
        "./runnable": 33,
        "./utils": 38,
      },
    ],
    8: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Test = require("../test");

        /**
         * BDD-style interface:
         *
         *      describe('Array', function() {
         *        describe('#indexOf()', function() {
         *          it('should return -1 when not present', function() {
         *            // ...
         *          });
         *
         *          it('should return the index when present', function() {
         *            // ...
         *          });
         *        });
         *      });
         *
         * @param {Suite} suite Root suite.
         */
        module.exports = function (suite) {
          var suites = [suite];

          suite.on("pre-require", function (context, file, mocha) {
            var common = require("./common")(suites, context, mocha);

            context.before = common.before;
            context.after = common.after;
            context.beforeEach = common.beforeEach;
            context.afterEach = common.afterEach;
            context.run = mocha.options.delay && common.runWithSuite(suite);
            /**
             * Describe a "suite" with the given `title`
             * and callback `fn` containing nested suites
             * and/or tests.
             */

            context.describe = context.context = function (title, fn) {
              return common.suite.create({
                title: title,
                file: file,
                fn: fn,
              });
            };

            /**
             * Pending describe.
             */

            context.xdescribe =
              context.xcontext =
              context.describe.skip =
                function (title, fn) {
                  return common.suite.skip({
                    title: title,
                    file: file,
                    fn: fn,
                  });
                };

            /**
             * Exclusive suite.
             */

            context.describe.only = function (title, fn) {
              return common.suite.only({
                title: title,
                file: file,
                fn: fn,
              });
            };

            /**
             * Describe a specification or test-case
             * with the given `title` and callback `fn`
             * acting as a thunk.
             */

            context.it = context.specify = function (title, fn) {
              var suite = suites[0];
              if (suite.isPending()) {
                fn = null;
              }
              var test = new Test(title, fn);
              test.file = file;
              suite.addTest(test);
              return test;
            };

            /**
             * Exclusive test-case.
             */

            context.it.only = function (title, fn) {
              return common.test.only(mocha, context.it(title, fn));
            };

            /**
             * Pending test case.
             */

            context.xit =
              context.xspecify =
              context.it.skip =
                function (title) {
                  context.it(title);
                };

            /**
             * Number of attempts to retry.
             */
            context.it.retries = function (n) {
              context.retries(n);
            };
          });
        };
      },
      {
        "../test": 36,
        "./common": 9,
      },
    ],
    9: [
      function (require, module, exports) {
        "use strict";

        var Suite = require("../suite");

        /**
         * Functions common to more than one interface.
         *
         * @param {Suite[]} suites
         * @param {Context} context
         * @param {Mocha} mocha
         * @return {Object} An object containing common functions.
         */
        module.exports = function (suites, context, mocha) {
          return {
            /**
             * This is only present if flag --delay is passed into Mocha. It triggers
             * root suite execution.
             *
             * @param {Suite} suite The root wuite.
             * @return {Function} A function which runs the root suite
             */
            runWithSuite: function runWithSuite(suite) {
              return function run() {
                suite.run();
              };
            },

            /**
             * Execute before running tests.
             *
             * @param {string} name
             * @param {Function} fn
             */
            before: function (name, fn) {
              suites[0].beforeAll(name, fn);
            },

            /**
             * Execute after running tests.
             *
             * @param {string} name
             * @param {Function} fn
             */
            after: function (name, fn) {
              suites[0].afterAll(name, fn);
            },

            /**
             * Execute before each test case.
             *
             * @param {string} name
             * @param {Function} fn
             */
            beforeEach: function (name, fn) {
              suites[0].beforeEach(name, fn);
            },

            /**
             * Execute after each test case.
             *
             * @param {string} name
             * @param {Function} fn
             */
            afterEach: function (name, fn) {
              suites[0].afterEach(name, fn);
            },

            suite: {
              /**
               * Create an exclusive Suite; convenience function
               * See docstring for create() below.
               *
               * @param {Object} opts
               * @returns {Suite}
               */
              only: function only(opts) {
                mocha.options.hasOnly = true;
                opts.isOnly = true;
                return this.create(opts);
              },

              /**
               * Create a Suite, but skip it; convenience function
               * See docstring for create() below.
               *
               * @param {Object} opts
               * @returns {Suite}
               */
              skip: function skip(opts) {
                opts.pending = true;
                return this.create(opts);
              },

              /**
               * Creates a suite.
               * @param {Object} opts Options
               * @param {string} opts.title Title of Suite
               * @param {Function} [opts.fn] Suite Function (not always applicable)
               * @param {boolean} [opts.pending] Is Suite pending?
               * @param {string} [opts.file] Filepath where this Suite resides
               * @param {boolean} [opts.isOnly] Is Suite exclusive?
               * @returns {Suite}
               */
              create: function create(opts) {
                var suite = Suite.create(suites[0], opts.title);
                suite.pending = Boolean(opts.pending);
                suite.file = opts.file;
                suites.unshift(suite);
                if (opts.isOnly) {
                  suite.parent._onlySuites =
                    suite.parent._onlySuites.concat(suite);
                  mocha.options.hasOnly = true;
                }
                if (typeof opts.fn === "function") {
                  opts.fn.call(suite);
                  suites.shift();
                } else if (typeof opts.fn === "undefined" && !suite.pending) {
                  throw new Error(
                    'Suite "' +
                      suite.fullTitle() +
                      '" was defined but no callback was supplied. Supply a callback or explicitly skip the suite.'
                  );
                }

                return suite;
              },
            },

            test: {
              /**
               * Exclusive test-case.
               *
               * @param {Object} mocha
               * @param {Function} test
               * @returns {*}
               */
              only: function (mocha, test) {
                test.parent._onlyTests = test.parent._onlyTests.concat(test);
                mocha.options.hasOnly = true;
                return test;
              },

              /**
               * Pending test case.
               *
               * @param {string} title
               */
              skip: function (title) {
                context.test(title);
              },

              /**
               * Number of retry attempts
               *
               * @param {number} n
               */
              retries: function (n) {
                context.retries(n);
              },
            },
          };
        };
      },
      {
        "../suite": 35,
      },
    ],
    10: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Suite = require("../suite");
        var Test = require("../test");

        /**
         * Exports-style (as Node.js module) interface:
         *
         *     exports.Array = {
         *       '#indexOf()': {
         *         'should return -1 when the value is not present': function() {
         *
         *         },
         *
         *         'should return the correct index when the value is present': function() {
         *
         *         }
         *       }
         *     };
         *
         * @param {Suite} suite Root suite.
         */
        module.exports = function (suite) {
          var suites = [suite];

          suite.on("require", visit);

          function visit(obj, file) {
            var suite;
            for (var key in obj) {
              if (typeof obj[key] === "function") {
                var fn = obj[key];
                switch (key) {
                  case "before":
                    suites[0].beforeAll(fn);
                    break;
                  case "after":
                    suites[0].afterAll(fn);
                    break;
                  case "beforeEach":
                    suites[0].beforeEach(fn);
                    break;
                  case "afterEach":
                    suites[0].afterEach(fn);
                    break;
                  default:
                    var test = new Test(key, fn);
                    test.file = file;
                    suites[0].addTest(test);
                }
              } else {
                suite = Suite.create(suites[0], key);
                suites.unshift(suite);
                visit(obj[key], file);
                suites.shift();
              }
            }
          }
        };
      },
      {
        "../suite": 35,
        "../test": 36,
      },
    ],
    11: [
      function (require, module, exports) {
        "use strict";

        exports.bdd = require("./bdd");
        exports.tdd = require("./tdd");
        exports.qunit = require("./qunit");
        exports.exports = require("./exports");
      },
      {
        "./bdd": 8,
        "./exports": 10,
        "./qunit": 12,
        "./tdd": 13,
      },
    ],
    12: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Test = require("../test");

        /**
         * QUnit-style interface:
         *
         *     suite('Array');
         *
         *     test('#length', function() {
         *       var arr = [1,2,3];
         *       ok(arr.length == 3);
         *     });
         *
         *     test('#indexOf()', function() {
         *       var arr = [1,2,3];
         *       ok(arr.indexOf(1) == 0);
         *       ok(arr.indexOf(2) == 1);
         *       ok(arr.indexOf(3) == 2);
         *     });
         *
         *     suite('String');
         *
         *     test('#length', function() {
         *       ok('foo'.length == 3);
         *     });
         *
         * @param {Suite} suite Root suite.
         */
        module.exports = function (suite) {
          var suites = [suite];

          suite.on("pre-require", function (context, file, mocha) {
            var common = require("./common")(suites, context, mocha);

            context.before = common.before;
            context.after = common.after;
            context.beforeEach = common.beforeEach;
            context.afterEach = common.afterEach;
            context.run = mocha.options.delay && common.runWithSuite(suite);
            /**
             * Describe a "suite" with the given `title`.
             */

            context.suite = function (title) {
              if (suites.length > 1) {
                suites.shift();
              }
              return common.suite.create({
                title: title,
                file: file,
                fn: false,
              });
            };

            /**
             * Exclusive Suite.
             */

            context.suite.only = function (title) {
              if (suites.length > 1) {
                suites.shift();
              }
              return common.suite.only({
                title: title,
                file: file,
                fn: false,
              });
            };

            /**
             * Describe a specification or test-case
             * with the given `title` and callback `fn`
             * acting as a thunk.
             */

            context.test = function (title, fn) {
              var test = new Test(title, fn);
              test.file = file;
              suites[0].addTest(test);
              return test;
            };

            /**
             * Exclusive test-case.
             */

            context.test.only = function (title, fn) {
              return common.test.only(mocha, context.test(title, fn));
            };

            context.test.skip = common.test.skip;
            context.test.retries = common.test.retries;
          });
        };
      },
      {
        "../test": 36,
        "./common": 9,
      },
    ],
    13: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Test = require("../test");

        /**
         * TDD-style interface:
         *
         *      suite('Array', function() {
         *        suite('#indexOf()', function() {
         *          suiteSetup(function() {
         *
         *          });
         *
         *          test('should return -1 when not present', function() {
         *
         *          });
         *
         *          test('should return the index when present', function() {
         *
         *          });
         *
         *          suiteTeardown(function() {
         *
         *          });
         *        });
         *      });
         *
         * @param {Suite} suite Root suite.
         */
        module.exports = function (suite) {
          var suites = [suite];

          suite.on("pre-require", function (context, file, mocha) {
            var common = require("./common")(suites, context, mocha);

            context.setup = common.beforeEach;
            context.teardown = common.afterEach;
            context.suiteSetup = common.before;
            context.suiteTeardown = common.after;
            context.run = mocha.options.delay && common.runWithSuite(suite);

            /**
             * Describe a "suite" with the given `title` and callback `fn` containing
             * nested suites and/or tests.
             */
            context.suite = function (title, fn) {
              return common.suite.create({
                title: title,
                file: file,
                fn: fn,
              });
            };

            /**
             * Pending suite.
             */
            context.suite.skip = function (title, fn) {
              return common.suite.skip({
                title: title,
                file: file,
                fn: fn,
              });
            };

            /**
             * Exclusive test-case.
             */
            context.suite.only = function (title, fn) {
              return common.suite.only({
                title: title,
                file: file,
                fn: fn,
              });
            };

            /**
             * Describe a specification or test-case with the given `title` and
             * callback `fn` acting as a thunk.
             */
            context.test = function (title, fn) {
              var suite = suites[0];
              if (suite.isPending()) {
                fn = null;
              }
              var test = new Test(title, fn);
              test.file = file;
              suite.addTest(test);
              return test;
            };

            /**
             * Exclusive test-case.
             */

            context.test.only = function (title, fn) {
              return common.test.only(mocha, context.test(title, fn));
            };

            context.test.skip = common.test.skip;
            context.test.retries = common.test.retries;
          });
        };
      },
      {
        "../test": 36,
        "./common": 9,
      },
    ],
    14: [
      function (require, module, exports) {
        (function (process, global, __dirname) {
          "use strict";

          /*!
           * mocha
           * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
           * MIT Licensed
           */

          /**
           * Module dependencies.
           */

          var escapeRe = require("escape-string-regexp");
          var path = require("path");
          var reporters = require("./reporters");
          var utils = require("./utils");

          /**
           * Expose `Mocha`.
           */

          exports = module.exports = Mocha;

          /**
           * To require local UIs and reporters when running in node.
           */

          if (!process.browser) {
            var cwd = process.cwd();
            module.paths.push(cwd, path.join(cwd, "node_modules"));
          }

          /**
           * Expose internals.
           */

          exports.utils = utils;
          exports.interfaces = require("./interfaces");
          exports.reporters = reporters;
          exports.Runnable = require("./runnable");
          exports.Context = require("./context");
          exports.Runner = require("./runner");
          exports.Suite = require("./suite");
          exports.Hook = require("./hook");
          exports.Test = require("./test");

          /**
           * Return image `name` path.
           *
           * @api private
           * @param {string} name
           * @return {string}
           */
          function image(name) {
            return path.join(__dirname, "../images", name + ".png");
          }

          /**
           * Set up mocha with `options`.
           *
           * Options:
           *
           *   - `ui` name "bdd", "tdd", "exports" etc
           *   - `reporter` reporter instance, defaults to `mocha.reporters.spec`
           *   - `globals` array of accepted globals
           *   - `timeout` timeout in milliseconds
           *   - `retries` number of times to retry failed tests
           *   - `bail` bail on the first test failure
           *   - `slow` milliseconds to wait before considering a test slow
           *   - `ignoreLeaks` ignore global leaks
           *   - `fullTrace` display the full stack-trace on failing
           *   - `grep` string or regexp to filter tests with
           *
           * @param {Object} options
           * @api public
           */
          function Mocha(options) {
            options = options || {};
            this.files = [];
            this.options = options;
            if (options.grep) {
              this.grep(new RegExp(options.grep));
            }
            if (options.fgrep) {
              this.fgrep(options.fgrep);
            }
            this.suite = new exports.Suite("", new exports.Context());
            this.ui(options.ui);
            this.bail(options.bail);
            this.reporter(options.reporter, options.reporterOptions);
            if (
              typeof options.timeout !== "undefined" &&
              options.timeout !== null
            ) {
              this.timeout(options.timeout);
            }
            if (
              typeof options.retries !== "undefined" &&
              options.retries !== null
            ) {
              this.retries(options.retries);
            }
            this.useColors(options.useColors);
            if (options.enableTimeouts !== null) {
              this.enableTimeouts(options.enableTimeouts);
            }
            if (options.slow) {
              this.slow(options.slow);
            }
          }

          /**
           * Enable or disable bailing on the first failure.
           *
           * @api public
           * @param {boolean} [bail]
           */
          Mocha.prototype.bail = function (bail) {
            if (!arguments.length) {
              bail = true;
            }
            this.suite.bail(bail);
            return this;
          };

          /**
           * Add test `file`.
           *
           * @api public
           * @param {string} file
           */
          Mocha.prototype.addFile = function (file) {
            this.files.push(file);
            return this;
          };

          /**
           * Set reporter to `reporter`, defaults to "spec".
           *
           * @param {String|Function} reporter name or constructor
           * @param {Object} reporterOptions optional options
           * @api public
           * @param {string|Function} reporter name or constructor
           * @param {Object} reporterOptions optional options
           */
          Mocha.prototype.reporter = function (reporter, reporterOptions) {
            if (typeof reporter === "function") {
              this._reporter = reporter;
            } else {
              reporter = reporter || "spec";
              var _reporter;
              // Try to load a built-in reporter.
              if (reporters[reporter]) {
                _reporter = reporters[reporter];
              }
              // Try to load reporters from process.cwd() and node_modules
              if (!_reporter) {
                try {
                  _reporter = require(reporter);
                } catch (err) {
                  err.message.indexOf("Cannot find module") !== -1
                    ? console.warn('"' + reporter + '" reporter not found')
                    : console.warn(
                        '"' +
                          reporter +
                          '" reporter blew up with error:\n' +
                          err.stack
                      );
                }
              }
              if (!_reporter && reporter === "teamcity") {
                console.warn(
                  "The Teamcity reporter was moved to a package named " +
                    "mocha-teamcity-reporter " +
                    "(https://npmjs.org/package/mocha-teamcity-reporter)."
                );
              }
              if (!_reporter) {
                throw new Error('invalid reporter "' + reporter + '"');
              }
              this._reporter = _reporter;
            }
            this.options.reporterOptions = reporterOptions;
            return this;
          };

          /**
           * Set test UI `name`, defaults to "bdd".
           *
           * @api public
           * @param {string} bdd
           */
          Mocha.prototype.ui = function (name) {
            name = name || "bdd";
            this._ui = exports.interfaces[name];
            if (!this._ui) {
              try {
                this._ui = require(name);
              } catch (err) {
                throw new Error('invalid interface "' + name + '"');
              }
            }
            this._ui = this._ui(this.suite);

            this.suite.on("pre-require", function (context) {
              exports.afterEach = context.afterEach || context.teardown;
              exports.after = context.after || context.suiteTeardown;
              exports.beforeEach = context.beforeEach || context.setup;
              exports.before = context.before || context.suiteSetup;
              exports.describe = context.describe || context.suite;
              exports.it = context.it || context.test;
              exports.setup = context.setup || context.beforeEach;
              exports.suiteSetup = context.suiteSetup || context.before;
              exports.suiteTeardown = context.suiteTeardown || context.after;
              exports.suite = context.suite || context.describe;
              exports.teardown = context.teardown || context.afterEach;
              exports.test = context.test || context.it;
              exports.run = context.run;
            });

            return this;
          };

          /**
           * Load registered files.
           *
           * @api private
           */
          Mocha.prototype.loadFiles = function (fn) {
            var self = this;
            var suite = this.suite;
            this.files.forEach(function (file) {
              file = path.resolve(file);
              suite.emit("pre-require", global, file, self);
              suite.emit("require", require(file), file, self);
              suite.emit("post-require", global, file, self);
            });
            fn && fn();
          };

          /**
           * Enable growl support.
           *
           * @api private
           */
          Mocha.prototype._growl = function (runner, reporter) {
            var notify = require("growl");

            runner.on("end", function () {
              var stats = reporter.stats;
              if (stats.failures) {
                var msg =
                  stats.failures + " of " + runner.total + " tests failed";
                notify(msg, {
                  name: "mocha",
                  title: "Failed",
                  image: image("error"),
                });
              } else {
                notify(
                  stats.passes + " tests passed in " + stats.duration + "ms",
                  {
                    name: "mocha",
                    title: "Passed",
                    image: image("ok"),
                  }
                );
              }
            });
          };

          /**
           * Escape string and add it to grep as a regexp.
           *
           * @api public
           * @param str
           * @returns {Mocha}
           */
          Mocha.prototype.fgrep = function (str) {
            return this.grep(new RegExp(escapeRe(str)));
          };

          /**
           * Add regexp to grep, if `re` is a string it is escaped.
           *
           * @param {RegExp|String} re
           * @return {Mocha}
           * @api public
           * @param {RegExp|string} re
           * @return {Mocha}
           */
          Mocha.prototype.grep = function (re) {
            if (utils.isString(re)) {
              // extract args if it's regex-like, i.e: [string, pattern, flag]
              var arg = re.match(/^\/(.*)\/(g|i|)$|.*/);
              this.options.grep = new RegExp(arg[1] || arg[0], arg[2]);
            } else {
              this.options.grep = re;
            }
            return this;
          };
          /**
           * Invert `.grep()` matches.
           *
           * @return {Mocha}
           * @api public
           */
          Mocha.prototype.invert = function () {
            this.options.invert = true;
            return this;
          };

          /**
           * Ignore global leaks.
           *
           * @param {Boolean} ignore
           * @return {Mocha}
           * @api public
           * @param {boolean} ignore
           * @return {Mocha}
           */
          Mocha.prototype.ignoreLeaks = function (ignore) {
            this.options.ignoreLeaks = Boolean(ignore);
            return this;
          };

          /**
           * Enable global leak checking.
           *
           * @return {Mocha}
           * @api public
           */
          Mocha.prototype.checkLeaks = function () {
            this.options.ignoreLeaks = false;
            return this;
          };

          /**
           * Display long stack-trace on failing
           *
           * @return {Mocha}
           * @api public
           */
          Mocha.prototype.fullTrace = function () {
            this.options.fullStackTrace = true;
            return this;
          };

          /**
           * Enable growl support.
           *
           * @return {Mocha}
           * @api public
           */
          Mocha.prototype.growl = function () {
            this.options.growl = true;
            return this;
          };

          /**
           * Ignore `globals` array or string.
           *
           * @param {Array|String} globals
           * @return {Mocha}
           * @api public
           * @param {Array|string} globals
           * @return {Mocha}
           */
          Mocha.prototype.globals = function (globals) {
            this.options.globals = (this.options.globals || []).concat(globals);
            return this;
          };

          /**
           * Emit color output.
           *
           * @param {Boolean} colors
           * @return {Mocha}
           * @api public
           * @param {boolean} colors
           * @return {Mocha}
           */
          Mocha.prototype.useColors = function (colors) {
            if (colors !== undefined) {
              this.options.useColors = colors;
            }
            return this;
          };

          /**
           * Use inline diffs rather than +/-.
           *
           * @param {Boolean} inlineDiffs
           * @return {Mocha}
           * @api public
           * @param {boolean} inlineDiffs
           * @return {Mocha}
           */
          Mocha.prototype.useInlineDiffs = function (inlineDiffs) {
            this.options.useInlineDiffs =
              inlineDiffs !== undefined && inlineDiffs;
            return this;
          };

          /**
           * Set the timeout in milliseconds.
           *
           * @param {Number} timeout
           * @return {Mocha}
           * @api public
           * @param {number} timeout
           * @return {Mocha}
           */
          Mocha.prototype.timeout = function (timeout) {
            this.suite.timeout(timeout);
            return this;
          };

          /**
           * Set the number of times to retry failed tests.
           *
           * @param {Number} retry times
           * @return {Mocha}
           * @api public
           */
          Mocha.prototype.retries = function (n) {
            this.suite.retries(n);
            return this;
          };

          /**
           * Set slowness threshold in milliseconds.
           *
           * @param {Number} slow
           * @return {Mocha}
           * @api public
           * @param {number} slow
           * @return {Mocha}
           */
          Mocha.prototype.slow = function (slow) {
            this.suite.slow(slow);
            return this;
          };

          /**
           * Enable timeouts.
           *
           * @param {Boolean} enabled
           * @return {Mocha}
           * @api public
           * @param {boolean} enabled
           * @return {Mocha}
           */
          Mocha.prototype.enableTimeouts = function (enabled) {
            this.suite.enableTimeouts(
              arguments.length && enabled !== undefined ? enabled : true
            );
            return this;
          };

          /**
           * Makes all tests async (accepting a callback)
           *
           * @return {Mocha}
           * @api public
           */
          Mocha.prototype.asyncOnly = function () {
            this.options.asyncOnly = true;
            return this;
          };

          /**
           * Disable syntax highlighting (in browser).
           *
           * @api public
           */
          Mocha.prototype.noHighlighting = function () {
            this.options.noHighlighting = true;
            return this;
          };

          /**
           * Enable uncaught errors to propagate (in browser).
           *
           * @return {Mocha}
           * @api public
           */
          Mocha.prototype.allowUncaught = function () {
            this.options.allowUncaught = true;
            return this;
          };

          /**
           * Delay root suite execution.
           * @returns {Mocha}
           */
          Mocha.prototype.delay = function delay() {
            this.options.delay = true;
            return this;
          };

          /**
           * Run tests and invoke `fn()` when complete.
           *
           * @api public
           * @param {Function} fn
           * @return {Runner}
           */
          Mocha.prototype.run = function (fn) {
            if (this.files.length) {
              this.loadFiles();
            }
            var suite = this.suite;
            var options = this.options;
            options.files = this.files;
            var runner = new exports.Runner(suite, options.delay);
            var reporter = new this._reporter(runner, options);
            runner.ignoreLeaks = options.ignoreLeaks !== false;
            runner.fullStackTrace = options.fullStackTrace;
            runner.hasOnly = options.hasOnly;
            runner.asyncOnly = options.asyncOnly;
            runner.allowUncaught = options.allowUncaught;
            if (options.grep) {
              runner.grep(options.grep, options.invert);
            }
            if (options.globals) {
              runner.globals(options.globals);
            }
            if (options.growl) {
              this._growl(runner, reporter);
            }
            if (options.useColors !== undefined) {
              exports.reporters.Base.useColors = options.useColors;
            }
            exports.reporters.Base.inlineDiffs = options.useInlineDiffs;

            function done(failures) {
              if (reporter.done) {
                reporter.done(failures, fn);
              } else {
                fn && fn(failures);
              }
            }

            return runner.run(done);
          };
        }.call(
          this,
          require("_process"),
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {},
          "/lib"
        ));
      },
      {
        "./context": 6,
        "./hook": 7,
        "./interfaces": 11,
        "./reporters": 21,
        "./runnable": 33,
        "./runner": 34,
        "./suite": 35,
        "./test": 36,
        "./utils": 38,
        _process: 67,
        "escape-string-regexp": 47,
        growl: 49,
        path: 42,
      },
    ],
    15: [
      function (require, module, exports) {
        "use strict";

        /**
         * Helpers.
         */

        var s = 1000;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var y = d * 365.25;

        /**
         * Parse or format the given `val`.
         *
         * Options:
         *
         *  - `long` verbose formatting [false]
         *
         * @api public
         * @param {string|number} val
         * @param {Object} options
         * @return {string|number}
         */
        module.exports = function (val, options) {
          options = options || {};
          if (typeof val === "string") {
            return parse(val);
          }
          // https://github.com/mochajs/mocha/pull/1035
          return options["long"] ? longFormat(val) : shortFormat(val);
        };

        /**
         * Parse the given `str` and return milliseconds.
         *
         * @api private
         * @param {string} str
         * @return {number}
         */
        function parse(str) {
          var match =
            /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(
              str
            );
          if (!match) {
            return;
          }
          var n = parseFloat(match[1]);
          var type = (match[2] || "ms").toLowerCase();
          switch (type) {
            case "years":
            case "year":
            case "y":
              return n * y;
            case "days":
            case "day":
            case "d":
              return n * d;
            case "hours":
            case "hour":
            case "h":
              return n * h;
            case "minutes":
            case "minute":
            case "m":
              return n * m;
            case "seconds":
            case "second":
            case "s":
              return n * s;
            case "ms":
              return n;
            default:
            // No default case
          }
        }

        /**
         * Short format for `ms`.
         *
         * @api private
         * @param {number} ms
         * @return {string}
         */
        function shortFormat(ms) {
          if (ms >= d) {
            return Math.round(ms / d) + "d";
          }
          if (ms >= h) {
            return Math.round(ms / h) + "h";
          }
          if (ms >= m) {
            return Math.round(ms / m) + "m";
          }
          if (ms >= s) {
            return Math.round(ms / s) + "s";
          }
          return ms + "ms";
        }

        /**
         * Long format for `ms`.
         *
         * @api private
         * @param {number} ms
         * @return {string}
         */
        function longFormat(ms) {
          return (
            plural(ms, d, "day") ||
            plural(ms, h, "hour") ||
            plural(ms, m, "minute") ||
            plural(ms, s, "second") ||
            ms + " ms"
          );
        }

        /**
         * Pluralization helper.
         *
         * @api private
         * @param {number} ms
         * @param {number} n
         * @param {string} name
         */
        function plural(ms, n, name) {
          if (ms < n) {
            return;
          }
          if (ms < n * 1.5) {
            return Math.floor(ms / n) + " " + name;
          }
          return Math.ceil(ms / n) + " " + name + "s";
        }
      },
      {},
    ],
    16: [
      function (require, module, exports) {
        "use strict";

        /**
         * Expose `Pending`.
         */

        module.exports = Pending;

        /**
         * Initialize a new `Pending` error with the given message.
         *
         * @param {string} message
         */
        function Pending(message) {
          this.message = message;
        }
      },
      {},
    ],
    17: [
      function (require, module, exports) {
        (function (process, global) {
          "use strict";

          /**
           * Module dependencies.
           */

          var tty = require("tty");
          var diff = require("diff");
          var ms = require("../ms");
          var utils = require("../utils");
          var supportsColor = process.browser
            ? null
            : require("supports-color");

          /**
           * Expose `Base`.
           */

          exports = module.exports = Base;

          /**
           * Save timer references to avoid Sinon interfering.
           * See: https://github.com/mochajs/mocha/issues/237
           */

          /* eslint-disable no-unused-vars, no-native-reassign */
          var Date = global.Date;
          var setTimeout = global.setTimeout;
          var setInterval = global.setInterval;
          var clearTimeout = global.clearTimeout;
          var clearInterval = global.clearInterval;
          /* eslint-enable no-unused-vars, no-native-reassign */

          /**
           * Check if both stdio streams are associated with a tty.
           */

          var isatty = tty.isatty(1) && tty.isatty(2);

          /**
           * Enable coloring by default, except in the browser interface.
           */

          exports.useColors =
            !process.browser &&
            (supportsColor || process.env.MOCHA_COLORS !== undefined);

          /**
           * Inline diffs instead of +/-
           */

          exports.inlineDiffs = false;

          /**
           * Default color map.
           */

          exports.colors = {
            pass: 90,
            fail: 31,
            "bright pass": 92,
            "bright fail": 91,
            "bright yellow": 93,
            pending: 36,
            suite: 0,
            "error title": 0,
            "error message": 31,
            "error stack": 90,
            checkmark: 32,
            fast: 90,
            medium: 33,
            slow: 31,
            green: 32,
            light: 90,
            "diff gutter": 90,
            "diff added": 32,
            "diff removed": 31,
          };

          /**
           * Default symbol map.
           */

          exports.symbols = {
            ok: "✓",
            err: "✖",
            dot: "․",
            comma: ",",
            bang: "!",
          };

          // With node.js on Windows: use symbols available in terminal default fonts
          if (process.platform === "win32") {
            exports.symbols.ok = "\u221A";
            exports.symbols.err = "\u00D7";
            exports.symbols.dot = ".";
          }

          /**
           * Color `str` with the given `type`,
           * allowing colors to be disabled,
           * as well as user-defined color
           * schemes.
           *
           * @param {string} type
           * @param {string} str
           * @return {string}
           * @api private
           */
          var color = (exports.color = function (type, str) {
            if (!exports.useColors) {
              return String(str);
            }
            return "\u001b[" + exports.colors[type] + "m" + str + "\u001b[0m";
          });

          /**
           * Expose term window size, with some defaults for when stderr is not a tty.
           */

          exports.window = {
            width: 75,
          };

          if (isatty) {
            exports.window.width = process.stdout.getWindowSize
              ? process.stdout.getWindowSize(1)[0]
              : tty.getWindowSize()[1];
          }

          /**
           * Expose some basic cursor interactions that are common among reporters.
           */

          exports.cursor = {
            hide: function () {
              isatty && process.stdout.write("\u001b[?25l");
            },

            show: function () {
              isatty && process.stdout.write("\u001b[?25h");
            },

            deleteLine: function () {
              isatty && process.stdout.write("\u001b[2K");
            },

            beginningOfLine: function () {
              isatty && process.stdout.write("\u001b[0G");
            },

            CR: function () {
              if (isatty) {
                exports.cursor.deleteLine();
                exports.cursor.beginningOfLine();
              } else {
                process.stdout.write("\r");
              }
            },
          };

          /**
           * Outut the given `failures` as a list.
           *
           * @param {Array} failures
           * @api public
           */

          exports.list = function (failures) {
            console.log();
            failures.forEach(function (test, i) {
              // format
              var fmt =
                color("error title", "  %s) %s:\n") +
                color("error message", "     %s") +
                color("error stack", "\n%s\n");

              // msg
              var msg;
              var err = test.err;
              var message;
              if (err.message && typeof err.message.toString === "function") {
                message = err.message + "";
              } else if (typeof err.inspect === "function") {
                message = err.inspect() + "";
              } else {
                message = "";
              }
              var stack = err.stack || message;
              var index = message ? stack.indexOf(message) : -1;
              var actual = err.actual;
              var expected = err.expected;
              var escape = true;

              if (index === -1) {
                msg = message;
              } else {
                index += message.length;
                msg = stack.slice(0, index);
                // remove msg from stack
                stack = stack.slice(index + 1);
              }

              // uncaught
              if (err.uncaught) {
                msg = "Uncaught " + msg;
              }
              // explicitly show diff
              if (
                err.showDiff !== false &&
                sameType(actual, expected) &&
                expected !== undefined
              ) {
                escape = false;
                if (!(utils.isString(actual) && utils.isString(expected))) {
                  err.actual = actual = utils.stringify(actual);
                  err.expected = expected = utils.stringify(expected);
                }

                fmt =
                  color("error title", "  %s) %s:\n%s") +
                  color("error stack", "\n%s\n");
                var match = message.match(/^([^:]+): expected/);
                msg =
                  "\n      " + color("error message", match ? match[1] : msg);

                if (exports.inlineDiffs) {
                  msg += inlineDiff(err, escape);
                } else {
                  msg += unifiedDiff(err, escape);
                }
              }

              // indent stack trace
              stack = stack.replace(/^/gm, "  ");

              console.log(fmt, i + 1, test.fullTitle(), msg, stack);
            });
          };

          /**
           * Initialize a new `Base` reporter.
           *
           * All other reporters generally
           * inherit from this reporter, providing
           * stats such as test duration, number
           * of tests passed / failed etc.
           *
           * @param {Runner} runner
           * @api public
           */

          function Base(runner) {
            var stats = (this.stats = {
              suites: 0,
              tests: 0,
              passes: 0,
              pending: 0,
              failures: 0,
            });
            var failures = (this.failures = []);

            if (!runner) {
              return;
            }
            this.runner = runner;

            runner.stats = stats;

            runner.on("start", function () {
              stats.start = new Date();
            });

            runner.on("suite", function (suite) {
              stats.suites = stats.suites || 0;
              suite.root || stats.suites++;
            });

            runner.on("test end", function () {
              stats.tests = stats.tests || 0;
              stats.tests++;
            });

            runner.on("pass", function (test) {
              stats.passes = stats.passes || 0;

              if (test.duration > test.slow()) {
                test.speed = "slow";
              } else if (test.duration > test.slow() / 2) {
                test.speed = "medium";
              } else {
                test.speed = "fast";
              }

              stats.passes++;
            });

            runner.on("fail", function (test, err) {
              stats.failures = stats.failures || 0;
              stats.failures++;
              test.err = err;
              failures.push(test);
            });

            runner.on("end", function () {
              stats.end = new Date();
              stats.duration = new Date() - stats.start;
            });

            runner.on("pending", function () {
              stats.pending++;
            });
          }

          /**
           * Output common epilogue used by many of
           * the bundled reporters.
           *
           * @api public
           */
          Base.prototype.epilogue = function () {
            var stats = this.stats;
            var fmt;

            console.log();

            // passes
            fmt =
              color("bright pass", " ") +
              color("green", " %d passing") +
              color("light", " (%s)");

            console.log(fmt, stats.passes || 0, ms(stats.duration));

            // pending
            if (stats.pending) {
              fmt = color("pending", " ") + color("pending", " %d pending");

              console.log(fmt, stats.pending);
            }

            // failures
            if (stats.failures) {
              fmt = color("fail", "  %d failing");

              console.log(fmt, stats.failures);

              Base.list(this.failures);
              console.log();
            }

            console.log();
          };

          /**
           * Pad the given `str` to `len`.
           *
           * @api private
           * @param {string} str
           * @param {string} len
           * @return {string}
           */
          function pad(str, len) {
            str = String(str);
            return Array(len - str.length + 1).join(" ") + str;
          }

          /**
           * Returns an inline diff between 2 strings with coloured ANSI output
           *
           * @api private
           * @param {Error} err with actual/expected
           * @param {boolean} escape
           * @return {string} Diff
           */
          function inlineDiff(err, escape) {
            var msg = errorDiff(err, "WordsWithSpace", escape);

            // linenos
            var lines = msg.split("\n");
            if (lines.length > 4) {
              var width = String(lines.length).length;
              msg = lines
                .map(function (str, i) {
                  return pad(++i, width) + " |" + " " + str;
                })
                .join("\n");
            }

            // legend
            msg =
              "\n" +
              color("diff removed", "actual") +
              " " +
              color("diff added", "expected") +
              "\n\n" +
              msg +
              "\n";

            // indent
            msg = msg.replace(/^/gm, "      ");
            return msg;
          }

          /**
           * Returns a unified diff between two strings.
           *
           * @api private
           * @param {Error} err with actual/expected
           * @param {boolean} escape
           * @return {string} The diff.
           */
          function unifiedDiff(err, escape) {
            var indent = "      ";

            function cleanUp(line) {
              if (escape) {
                line = escapeInvisibles(line);
              }
              if (line[0] === "+") {
                return indent + colorLines("diff added", line);
              }
              if (line[0] === "-") {
                return indent + colorLines("diff removed", line);
              }
              if (line.match(/@@/)) {
                return null;
              }
              if (line.match(/\\ No newline/)) {
                return null;
              }
              return indent + line;
            }

            function notBlank(line) {
              return typeof line !== "undefined" && line !== null;
            }
            var msg = diff.createPatch("string", err.actual, err.expected);
            var lines = msg.split("\n").splice(4);
            return (
              "\n      " +
              colorLines("diff added", "+ expected") +
              " " +
              colorLines("diff removed", "- actual") +
              "\n\n" +
              lines.map(cleanUp).filter(notBlank).join("\n")
            );
          }

          /**
           * Return a character diff for `err`.
           *
           * @api private
           * @param {Error} err
           * @param {string} type
           * @param {boolean} escape
           * @return {string}
           */
          function errorDiff(err, type, escape) {
            var actual = escape ? escapeInvisibles(err.actual) : err.actual;
            var expected = escape
              ? escapeInvisibles(err.expected)
              : err.expected;
            return diff["diff" + type](actual, expected)
              .map(function (str) {
                if (str.added) {
                  return colorLines("diff added", str.value);
                }
                if (str.removed) {
                  return colorLines("diff removed", str.value);
                }
                return str.value;
              })
              .join("");
          }

          /**
           * Returns a string with all invisible characters in plain text
           *
           * @api private
           * @param {string} line
           * @return {string}
           */
          function escapeInvisibles(line) {
            return line
              .replace(/\t/g, "<tab>")
              .replace(/\r/g, "<CR>")
              .replace(/\n/g, "<LF>\n");
          }

          /**
           * Color lines for `str`, using the color `name`.
           *
           * @api private
           * @param {string} name
           * @param {string} str
           * @return {string}
           */
          function colorLines(name, str) {
            return str
              .split("\n")
              .map(function (str) {
                return color(name, str);
              })
              .join("\n");
          }

          /**
           * Object#toString reference.
           */
          var objToString = Object.prototype.toString;

          /**
           * Check that a / b have the same type.
           *
           * @api private
           * @param {Object} a
           * @param {Object} b
           * @return {boolean}
           */
          function sameType(a, b) {
            return objToString.call(a) === objToString.call(b);
          }
        }.call(
          this,
          require("_process"),
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "../ms": 15,
        "../utils": 38,
        _process: 67,
        diff: 46,
        "supports-color": 42,
        tty: 5,
      },
    ],
    18: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Base = require("./base");
        var utils = require("../utils");

        /**
         * Expose `Doc`.
         */

        exports = module.exports = Doc;

        /**
         * Initialize a new `Doc` reporter.
         *
         * @param {Runner} runner
         * @api public
         */
        function Doc(runner) {
          Base.call(this, runner);

          var indents = 2;

          function indent() {
            return Array(indents).join("  ");
          }

          runner.on("suite", function (suite) {
            if (suite.root) {
              return;
            }
            ++indents;
            console.log('%s<section class="suite">', indent());
            ++indents;
            console.log("%s<h1>%s</h1>", indent(), utils.escape(suite.title));
            console.log("%s<dl>", indent());
          });

          runner.on("suite end", function (suite) {
            if (suite.root) {
              return;
            }
            console.log("%s</dl>", indent());
            --indents;
            console.log("%s</section>", indent());
            --indents;
          });

          runner.on("pass", function (test) {
            console.log("%s  <dt>%s</dt>", indent(), utils.escape(test.title));
            var code = utils.escape(utils.clean(test.body));
            console.log(
              "%s  <dd><pre><code>%s</code></pre></dd>",
              indent(),
              code
            );
          });

          runner.on("fail", function (test, err) {
            console.log(
              '%s  <dt class="error">%s</dt>',
              indent(),
              utils.escape(test.title)
            );
            var code = utils.escape(utils.clean(test.body));
            console.log(
              '%s  <dd class="error"><pre><code>%s</code></pre></dd>',
              indent(),
              code
            );
            console.log(
              '%s  <dd class="error">%s</dd>',
              indent(),
              utils.escape(err)
            );
          });
        }
      },
      {
        "../utils": 38,
        "./base": 17,
      },
    ],
    19: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var inherits = require("../utils").inherits;
          var color = Base.color;

          /**
           * Expose `Dot`.
           */

          exports = module.exports = Dot;

          /**
           * Initialize a new `Dot` matrix test reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function Dot(runner) {
            Base.call(this, runner);

            var self = this;
            var width = (Base.window.width * 0.75) | 0;
            var n = -1;

            runner.on("start", function () {
              process.stdout.write("\n");
            });

            runner.on("pending", function () {
              if (++n % width === 0) {
                process.stdout.write("\n  ");
              }
              process.stdout.write(color("pending", Base.symbols.comma));
            });

            runner.on("pass", function (test) {
              if (++n % width === 0) {
                process.stdout.write("\n  ");
              }
              if (test.speed === "slow") {
                process.stdout.write(color("bright yellow", Base.symbols.dot));
              } else {
                process.stdout.write(color(test.speed, Base.symbols.dot));
              }
            });

            runner.on("fail", function () {
              if (++n % width === 0) {
                process.stdout.write("\n  ");
              }
              process.stdout.write(color("fail", Base.symbols.bang));
            });

            runner.on("end", function () {
              console.log();
              self.epilogue();
            });
          }

          /**
           * Inherit from `Base.prototype`.
           */
          inherits(Dot, Base);
        }.call(this, require("_process")));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
      },
    ],
    20: [
      function (require, module, exports) {
        (function (global) {
          "use strict";

          /* eslint-env browser */

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var utils = require("../utils");
          var Progress = require("../browser/progress");
          var escapeRe = require("escape-string-regexp");
          var escape = utils.escape;

          /**
           * Save timer references to avoid Sinon interfering (see GH-237).
           */

          /* eslint-disable no-unused-vars, no-native-reassign */
          var Date = global.Date;
          var setTimeout = global.setTimeout;
          var setInterval = global.setInterval;
          var clearTimeout = global.clearTimeout;
          var clearInterval = global.clearInterval;
          /* eslint-enable no-unused-vars, no-native-reassign */

          /**
           * Expose `HTML`.
           */

          exports = module.exports = HTML;

          /**
           * Stats template.
           */

          var statsTemplate =
            '<ul id="mocha-stats">' +
            '<li class="progress"><canvas width="40" height="40"></canvas></li>' +
            '<li class="passes"><a href="javascript:void(0);">passes:</a> <em>0</em></li>' +
            '<li class="failures"><a href="javascript:void(0);">failures:</a> <em>0</em></li>' +
            '<li class="duration">duration: <em>0</em>s</li>' +
            "</ul>";

          /**
           * Initialize a new `HTML` reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function HTML(runner) {
            Base.call(this, runner);

            var self = this;
            var stats = this.stats;
            var stat = fragment(statsTemplate);
            var items = stat.getElementsByTagName("li");
            var passes = items[1].getElementsByTagName("em")[0];
            var passesLink = items[1].getElementsByTagName("a")[0];
            var failures = items[2].getElementsByTagName("em")[0];
            var failuresLink = items[2].getElementsByTagName("a")[0];
            var duration = items[3].getElementsByTagName("em")[0];
            var canvas = stat.getElementsByTagName("canvas")[0];
            var report = fragment('<ul id="mocha-report"></ul>');
            var stack = [report];
            var progress;
            var ctx;
            var root = document.getElementById("mocha");

            if (canvas.getContext) {
              var ratio = window.devicePixelRatio || 1;
              canvas.style.width = canvas.width;
              canvas.style.height = canvas.height;
              canvas.width *= ratio;
              canvas.height *= ratio;
              ctx = canvas.getContext("2d");
              ctx.scale(ratio, ratio);
              progress = new Progress();
            }

            if (!root) {
              return error("#mocha div missing, add it to your document");
            }

            // pass toggle
            on(passesLink, "click", function (evt) {
              evt.preventDefault();
              unhide();
              var name = /pass/.test(report.className) ? "" : " pass";
              report.className =
                report.className.replace(/fail|pass/g, "") + name;
              if (report.className.trim()) {
                hideSuitesWithout("test pass");
              }
            });

            // failure toggle
            on(failuresLink, "click", function (evt) {
              evt.preventDefault();
              unhide();
              var name = /fail/.test(report.className) ? "" : " fail";
              report.className =
                report.className.replace(/fail|pass/g, "") + name;
              if (report.className.trim()) {
                hideSuitesWithout("test fail");
              }
            });

            root.appendChild(stat);
            root.appendChild(report);

            if (progress) {
              progress.size(40);
            }

            runner.on("suite", function (suite) {
              if (suite.root) {
                return;
              }

              // suite
              var url = self.suiteURL(suite);
              var el = fragment(
                '<li class="suite"><h1><a href="%s">%s</a></h1></li>',
                url,
                escape(suite.title)
              );

              // container
              stack[0].appendChild(el);
              stack.unshift(document.createElement("ul"));
              el.appendChild(stack[0]);
            });

            runner.on("suite end", function (suite) {
              if (suite.root) {
                updateStats();
                return;
              }
              stack.shift();
            });

            runner.on("pass", function (test) {
              var url = self.testURL(test);
              var markup =
                '<li class="test pass %e"><h2>%e<span class="duration">%ems</span> ' +
                '<a href="%s" class="replay">‣</a></h2></li>';
              var el = fragment(
                markup,
                test.speed,
                test.title,
                test.duration,
                url
              );
              self.addCodeToggle(el, test.body);
              appendToStack(el);
              updateStats();
            });

            runner.on("fail", function (test) {
              var el = fragment(
                '<li class="test fail"><h2>%e <a href="%e" class="replay">‣</a></h2></li>',
                test.title,
                self.testURL(test)
              );
              var stackString; // Note: Includes leading newline
              var message = test.err.toString();

              // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we
              // check for the result of the stringifying.
              if (message === "[object Error]") {
                message = test.err.message;
              }

              if (test.err.stack) {
                var indexOfMessage = test.err.stack.indexOf(test.err.message);
                if (indexOfMessage === -1) {
                  stackString = test.err.stack;
                } else {
                  stackString = test.err.stack.substr(
                    test.err.message.length + indexOfMessage
                  );
                }
              } else if (test.err.sourceURL && test.err.line !== undefined) {
                // Safari doesn't give you a stack. Let's at least provide a source line.
                stackString =
                  "\n(" + test.err.sourceURL + ":" + test.err.line + ")";
              }

              stackString = stackString || "";

              if (test.err.htmlMessage && stackString) {
                el.appendChild(
                  fragment(
                    '<div class="html-error">%s\n<pre class="error">%e</pre></div>',
                    test.err.htmlMessage,
                    stackString
                  )
                );
              } else if (test.err.htmlMessage) {
                el.appendChild(
                  fragment(
                    '<div class="html-error">%s</div>',
                    test.err.htmlMessage
                  )
                );
              } else {
                el.appendChild(
                  fragment(
                    '<pre class="error">%e%e</pre>',
                    message,
                    stackString
                  )
                );
              }

              self.addCodeToggle(el, test.body);
              appendToStack(el);
              updateStats();
            });

            runner.on("pending", function (test) {
              var el = fragment(
                '<li class="test pass pending"><h2>%e</h2></li>',
                test.title
              );
              appendToStack(el);
              updateStats();
            });

            function appendToStack(el) {
              // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.
              if (stack[0]) {
                stack[0].appendChild(el);
              }
            }

            function updateStats() {
              // TODO: add to stats
              var percent = ((stats.tests / runner.total) * 100) | 0;
              if (progress) {
                progress.update(percent).draw(ctx);
              }

              // update stats
              var ms = new Date() - stats.start;
              text(passes, stats.passes);
              text(failures, stats.failures);
              text(duration, (ms / 1000).toFixed(2));
            }
          }

          /**
           * Makes a URL, preserving querystring ("search") parameters.
           *
           * @param {string} s
           * @return {string} A new URL.
           */
          function makeUrl(s) {
            var search = window.location.search;

            // Remove previous grep query parameter if present
            if (search) {
              search = search
                .replace(/[?&]grep=[^&\s]*/g, "")
                .replace(/^&/, "?");
            }

            return (
              window.location.pathname +
              (search ? search + "&" : "?") +
              "grep=" +
              encodeURIComponent(escapeRe(s))
            );
          }

          /**
           * Provide suite URL.
           *
           * @param {Object} [suite]
           */
          HTML.prototype.suiteURL = function (suite) {
            return makeUrl(suite.fullTitle());
          };

          /**
           * Provide test URL.
           *
           * @param {Object} [test]
           */
          HTML.prototype.testURL = function (test) {
            return makeUrl(test.fullTitle());
          };

          /**
           * Adds code toggle functionality for the provided test's list element.
           *
           * @param {HTMLLIElement} el
           * @param {string} contents
           */
          HTML.prototype.addCodeToggle = function (el, contents) {
            var h2 = el.getElementsByTagName("h2")[0];

            on(h2, "click", function () {
              pre.style.display =
                pre.style.display === "none" ? "block" : "none";
            });

            var pre = fragment(
              "<pre><code>%e</code></pre>",
              utils.clean(contents)
            );
            el.appendChild(pre);
            pre.style.display = "none";
          };

          /**
           * Display error `msg`.
           *
           * @param {string} msg
           */
          function error(msg) {
            document.body.appendChild(
              fragment('<div id="mocha-error">%s</div>', msg)
            );
          }

          /**
           * Return a DOM fragment from `html`.
           *
           * @param {string} html
           */
          function fragment(html) {
            var args = arguments;
            var div = document.createElement("div");
            var i = 1;

            div.innerHTML = html.replace(/%([se])/g, function (_, type) {
              switch (type) {
                case "s":
                  return String(args[i++]);
                case "e":
                  return escape(args[i++]);
                // no default
              }
            });

            return div.firstChild;
          }

          /**
           * Check for suites that do not have elements
           * with `classname`, and hide them.
           *
           * @param {text} classname
           */
          function hideSuitesWithout(classname) {
            var suites = document.getElementsByClassName("suite");
            for (var i = 0; i < suites.length; i++) {
              var els = suites[i].getElementsByClassName(classname);
              if (!els.length) {
                suites[i].className += " hidden";
              }
            }
          }

          /**
           * Unhide .hidden suites.
           */
          function unhide() {
            var els = document.getElementsByClassName("suite hidden");
            for (var i = 0; i < els.length; ++i) {
              els[i].className = els[i].className.replace(
                "suite hidden",
                "suite"
              );
            }
          }

          /**
           * Set an element's text contents.
           *
           * @param {HTMLElement} el
           * @param {string} contents
           */
          function text(el, contents) {
            if (el.textContent) {
              el.textContent = contents;
            } else {
              el.innerText = contents;
            }
          }

          /**
           * Listen on `event` with callback `fn`.
           */
          function on(el, event, fn) {
            if (el.addEventListener) {
              el.addEventListener(event, fn, false);
            } else {
              el.attachEvent("on" + event, fn);
            }
          }
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "../browser/progress": 4,
        "../utils": 38,
        "./base": 17,
        "escape-string-regexp": 47,
      },
    ],
    21: [
      function (require, module, exports) {
        "use strict";

        // Alias exports to a their normalized format Mocha#reporter to prevent a need
        // for dynamic (try/catch) requires, which Browserify doesn't handle.
        exports.Base = exports.base = require("./base");
        exports.Dot = exports.dot = require("./dot");
        exports.Doc = exports.doc = require("./doc");
        exports.TAP = exports.tap = require("./tap");
        exports.JSON = exports.json = require("./json");
        exports.HTML = exports.html = require("./html");
        exports.List = exports.list = require("./list");
        exports.Min = exports.min = require("./min");
        exports.Spec = exports.spec = require("./spec");
        exports.Nyan = exports.nyan = require("./nyan");
        exports.XUnit = exports.xunit = require("./xunit");
        exports.Markdown = exports.markdown = require("./markdown");
        exports.Progress = exports.progress = require("./progress");
        exports.Landing = exports.landing = require("./landing");
        exports.JSONStream = exports["json-stream"] = require("./json-stream");
      },
      {
        "./base": 17,
        "./doc": 18,
        "./dot": 19,
        "./html": 20,
        "./json": 23,
        "./json-stream": 22,
        "./landing": 24,
        "./list": 25,
        "./markdown": 26,
        "./min": 27,
        "./nyan": 28,
        "./progress": 29,
        "./spec": 30,
        "./tap": 31,
        "./xunit": 32,
      },
    ],
    22: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var JSON = require("json3");

          /**
           * Expose `List`.
           */

          exports = module.exports = List;

          /**
           * Initialize a new `List` test reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function List(runner) {
            Base.call(this, runner);

            var self = this;
            var total = runner.total;

            runner.on("start", function () {
              console.log(
                JSON.stringify([
                  "start",
                  {
                    total: total,
                  },
                ])
              );
            });

            runner.on("pass", function (test) {
              console.log(JSON.stringify(["pass", clean(test)]));
            });

            runner.on("fail", function (test, err) {
              test = clean(test);
              test.err = err.message;
              test.stack = err.stack || null;
              console.log(JSON.stringify(["fail", test]));
            });

            runner.on("end", function () {
              process.stdout.write(JSON.stringify(["end", self.stats]));
            });
          }

          /**
           * Return a plain-object representation of `test`
           * free of cyclic properties etc.
           *
           * @api private
           * @param {Object} test
           * @return {Object}
           */
          function clean(test) {
            return {
              title: test.title,
              fullTitle: test.fullTitle(),
              duration: test.duration,
              currentRetry: test.currentRetry(),
            };
          }
        }.call(this, require("_process")));
      },
      {
        "./base": 17,
        _process: 67,
        json3: 54,
      },
    ],
    23: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");

          /**
           * Expose `JSON`.
           */

          exports = module.exports = JSONReporter;

          /**
           * Initialize a new `JSON` reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function JSONReporter(runner) {
            Base.call(this, runner);

            var self = this;
            var tests = [];
            var pending = [];
            var failures = [];
            var passes = [];

            runner.on("test end", function (test) {
              tests.push(test);
            });

            runner.on("pass", function (test) {
              passes.push(test);
            });

            runner.on("fail", function (test) {
              failures.push(test);
            });

            runner.on("pending", function (test) {
              pending.push(test);
            });

            runner.on("end", function () {
              var obj = {
                stats: self.stats,
                tests: tests.map(clean),
                pending: pending.map(clean),
                failures: failures.map(clean),
                passes: passes.map(clean),
              };

              runner.testResults = obj;

              process.stdout.write(JSON.stringify(obj, null, 2));
            });
          }

          /**
           * Return a plain-object representation of `test`
           * free of cyclic properties etc.
           *
           * @api private
           * @param {Object} test
           * @return {Object}
           */
          function clean(test) {
            return {
              title: test.title,
              fullTitle: test.fullTitle(),
              duration: test.duration,
              currentRetry: test.currentRetry(),
              err: errorJSON(test.err || {}),
            };
          }

          /**
           * Transform `error` into a JSON object.
           *
           * @api private
           * @param {Error} err
           * @return {Object}
           */
          function errorJSON(err) {
            var res = {};
            Object.getOwnPropertyNames(err).forEach(function (key) {
              res[key] = err[key];
            }, err);
            return res;
          }
        }.call(this, require("_process")));
      },
      {
        "./base": 17,
        _process: 67,
      },
    ],
    24: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var inherits = require("../utils").inherits;
          var cursor = Base.cursor;
          var color = Base.color;

          /**
           * Expose `Landing`.
           */

          exports = module.exports = Landing;

          /**
           * Airplane color.
           */

          Base.colors.plane = 0;

          /**
           * Airplane crash color.
           */

          Base.colors["plane crash"] = 31;

          /**
           * Runway color.
           */

          Base.colors.runway = 90;

          /**
           * Initialize a new `Landing` reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function Landing(runner) {
            Base.call(this, runner);

            var self = this;
            var width = (Base.window.width * 0.75) | 0;
            var total = runner.total;
            var stream = process.stdout;
            var plane = color("plane", "✈");
            var crashed = -1;
            var n = 0;

            function runway() {
              var buf = Array(width).join("-");
              return "  " + color("runway", buf);
            }

            runner.on("start", function () {
              stream.write("\n\n\n  ");
              cursor.hide();
            });

            runner.on("test end", function (test) {
              // check if the plane crashed
              var col = crashed === -1 ? ((width * ++n) / total) | 0 : crashed;

              // show the crash
              if (test.state === "failed") {
                plane = color("plane crash", "✈");
                crashed = col;
              }

              // render landing strip
              stream.write("\u001b[" + (width + 1) + "D\u001b[2A");
              stream.write(runway());
              stream.write("\n  ");
              stream.write(color("runway", Array(col).join("⋅")));
              stream.write(plane);
              stream.write(
                color("runway", Array(width - col).join("⋅") + "\n")
              );
              stream.write(runway());
              stream.write("\u001b[0m");
            });

            runner.on("end", function () {
              cursor.show();
              console.log();
              self.epilogue();
            });
          }

          /**
           * Inherit from `Base.prototype`.
           */
          inherits(Landing, Base);
        }.call(this, require("_process")));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
      },
    ],
    25: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var inherits = require("../utils").inherits;
          var color = Base.color;
          var cursor = Base.cursor;

          /**
           * Expose `List`.
           */

          exports = module.exports = List;

          /**
           * Initialize a new `List` test reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function List(runner) {
            Base.call(this, runner);

            var self = this;
            var n = 0;

            runner.on("start", function () {
              console.log();
            });

            runner.on("test", function (test) {
              process.stdout.write(
                color("pass", "    " + test.fullTitle() + ": ")
              );
            });

            runner.on("pending", function (test) {
              var fmt = color("checkmark", "  -") + color("pending", " %s");
              console.log(fmt, test.fullTitle());
            });

            runner.on("pass", function (test) {
              var fmt =
                color("checkmark", "  " + Base.symbols.dot) +
                color("pass", " %s: ") +
                color(test.speed, "%dms");
              cursor.CR();
              console.log(fmt, test.fullTitle(), test.duration);
            });

            runner.on("fail", function (test) {
              cursor.CR();
              console.log(color("fail", "  %d) %s"), ++n, test.fullTitle());
            });

            runner.on("end", self.epilogue.bind(self));
          }

          /**
           * Inherit from `Base.prototype`.
           */
          inherits(List, Base);
        }.call(this, require("_process")));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
      },
    ],
    26: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var utils = require("../utils");

          /**
           * Constants
           */

          var SUITE_PREFIX = "$";

          /**
           * Expose `Markdown`.
           */

          exports = module.exports = Markdown;

          /**
           * Initialize a new `Markdown` reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function Markdown(runner) {
            Base.call(this, runner);

            var level = 0;
            var buf = "";

            function title(str) {
              return Array(level).join("#") + " " + str;
            }

            function mapTOC(suite, obj) {
              var ret = obj;
              var key = SUITE_PREFIX + suite.title;

              obj = obj[key] = obj[key] || {
                suite: suite,
              };
              suite.suites.forEach(function (suite) {
                mapTOC(suite, obj);
              });

              return ret;
            }

            function stringifyTOC(obj, level) {
              ++level;
              var buf = "";
              var link;
              for (var key in obj) {
                if (key === "suite") {
                  continue;
                }
                if (key !== SUITE_PREFIX) {
                  link = " - [" + key.substring(1) + "]";
                  link += "(#" + utils.slug(obj[key].suite.fullTitle()) + ")\n";
                  buf += Array(level).join("  ") + link;
                }
                buf += stringifyTOC(obj[key], level);
              }
              return buf;
            }

            function generateTOC(suite) {
              var obj = mapTOC(suite, {});
              return stringifyTOC(obj, 0);
            }

            generateTOC(runner.suite);

            runner.on("suite", function (suite) {
              ++level;
              var slug = utils.slug(suite.fullTitle());
              buf += '<a name="' + slug + '"></a>' + "\n";
              buf += title(suite.title) + "\n";
            });

            runner.on("suite end", function () {
              --level;
            });

            runner.on("pass", function (test) {
              var code = utils.clean(test.body);
              buf += test.title + ".\n";
              buf += "\n```js\n";
              buf += code + "\n";
              buf += "```\n\n";
            });

            runner.on("end", function () {
              process.stdout.write("# TOC\n");
              process.stdout.write(generateTOC(runner.suite));
              process.stdout.write(buf);
            });
          }
        }.call(this, require("_process")));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
      },
    ],
    27: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var inherits = require("../utils").inherits;

          /**
           * Expose `Min`.
           */

          exports = module.exports = Min;

          /**
           * Initialize a new `Min` minimal test reporter (best used with --watch).
           *
           * @api public
           * @param {Runner} runner
           */
          function Min(runner) {
            Base.call(this, runner);

            runner.on("start", function () {
              // clear screen
              process.stdout.write("\u001b[2J");
              // set cursor position
              process.stdout.write("\u001b[1;3H");
            });

            runner.on("end", this.epilogue.bind(this));
          }

          /**
           * Inherit from `Base.prototype`.
           */
          inherits(Min, Base);
        }.call(this, require("_process")));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
      },
    ],
    28: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var inherits = require("../utils").inherits;

          /**
           * Expose `Dot`.
           */

          exports = module.exports = NyanCat;

          /**
           * Initialize a new `Dot` matrix test reporter.
           *
           * @param {Runner} runner
           * @api public
           */

          function NyanCat(runner) {
            Base.call(this, runner);

            var self = this;
            var width = (Base.window.width * 0.75) | 0;
            var nyanCatWidth = (this.nyanCatWidth = 11);

            this.colorIndex = 0;
            this.numberOfLines = 4;
            this.rainbowColors = self.generateColors();
            this.scoreboardWidth = 5;
            this.tick = 0;
            this.trajectories = [[], [], [], []];
            this.trajectoryWidthMax = width - nyanCatWidth;

            runner.on("start", function () {
              Base.cursor.hide();
              self.draw();
            });

            runner.on("pending", function () {
              self.draw();
            });

            runner.on("pass", function () {
              self.draw();
            });

            runner.on("fail", function () {
              self.draw();
            });

            runner.on("end", function () {
              Base.cursor.show();
              for (var i = 0; i < self.numberOfLines; i++) {
                write("\n");
              }
              self.epilogue();
            });
          }

          /**
           * Inherit from `Base.prototype`.
           */
          inherits(NyanCat, Base);

          /**
           * Draw the nyan cat
           *
           * @api private
           */

          NyanCat.prototype.draw = function () {
            this.appendRainbow();
            this.drawScoreboard();
            this.drawRainbow();
            this.drawNyanCat();
            this.tick = !this.tick;
          };

          /**
           * Draw the "scoreboard" showing the number
           * of passes, failures and pending tests.
           *
           * @api private
           */

          NyanCat.prototype.drawScoreboard = function () {
            var stats = this.stats;

            function draw(type, n) {
              write(" ");
              write(Base.color(type, n));
              write("\n");
            }

            draw("green", stats.passes);
            draw("fail", stats.failures);
            draw("pending", stats.pending);
            write("\n");

            this.cursorUp(this.numberOfLines);
          };

          /**
           * Append the rainbow.
           *
           * @api private
           */

          NyanCat.prototype.appendRainbow = function () {
            var segment = this.tick ? "_" : "-";
            var rainbowified = this.rainbowify(segment);

            for (var index = 0; index < this.numberOfLines; index++) {
              var trajectory = this.trajectories[index];
              if (trajectory.length >= this.trajectoryWidthMax) {
                trajectory.shift();
              }
              trajectory.push(rainbowified);
            }
          };

          /**
           * Draw the rainbow.
           *
           * @api private
           */

          NyanCat.prototype.drawRainbow = function () {
            var self = this;

            this.trajectories.forEach(function (line) {
              write("\u001b[" + self.scoreboardWidth + "C");
              write(line.join(""));
              write("\n");
            });

            this.cursorUp(this.numberOfLines);
          };

          /**
           * Draw the nyan cat
           *
           * @api private
           */
          NyanCat.prototype.drawNyanCat = function () {
            var self = this;
            var startWidth = this.scoreboardWidth + this.trajectories[0].length;
            var dist = "\u001b[" + startWidth + "C";
            var padding = "";

            write(dist);
            write("_,------,");
            write("\n");

            write(dist);
            padding = self.tick ? "  " : "   ";
            write("_|" + padding + "/\\_/\\ ");
            write("\n");

            write(dist);
            padding = self.tick ? "_" : "__";
            var tail = self.tick ? "~" : "^";
            write(tail + "|" + padding + this.face() + " ");
            write("\n");

            write(dist);
            padding = self.tick ? " " : "  ";
            write(padding + '""  "" ');
            write("\n");

            this.cursorUp(this.numberOfLines);
          };

          /**
           * Draw nyan cat face.
           *
           * @api private
           * @return {string}
           */

          NyanCat.prototype.face = function () {
            var stats = this.stats;
            if (stats.failures) {
              return "( x .x)";
            } else if (stats.pending) {
              return "( o .o)";
            } else if (stats.passes) {
              return "( ^ .^)";
            }
            return "( - .-)";
          };

          /**
           * Move cursor up `n`.
           *
           * @api private
           * @param {number} n
           */

          NyanCat.prototype.cursorUp = function (n) {
            write("\u001b[" + n + "A");
          };

          /**
           * Move cursor down `n`.
           *
           * @api private
           * @param {number} n
           */

          NyanCat.prototype.cursorDown = function (n) {
            write("\u001b[" + n + "B");
          };

          /**
           * Generate rainbow colors.
           *
           * @api private
           * @return {Array}
           */
          NyanCat.prototype.generateColors = function () {
            var colors = [];

            for (var i = 0; i < 6 * 7; i++) {
              var pi3 = Math.floor(Math.PI / 3);
              var n = i * (1.0 / 6);
              var r = Math.floor(3 * Math.sin(n) + 3);
              var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
              var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
              colors.push(36 * r + 6 * g + b + 16);
            }

            return colors;
          };

          /**
           * Apply rainbow to the given `str`.
           *
           * @api private
           * @param {string} str
           * @return {string}
           */
          NyanCat.prototype.rainbowify = function (str) {
            if (!Base.useColors) {
              return str;
            }
            var color =
              this.rainbowColors[this.colorIndex % this.rainbowColors.length];
            this.colorIndex += 1;
            return "\u001b[38;5;" + color + "m" + str + "\u001b[0m";
          };

          /**
           * Stdout helper.
           *
           * @param {string} string A message to write to stdout.
           */
          function write(string) {
            process.stdout.write(string);
          }
        }.call(this, require("_process")));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
      },
    ],
    29: [
      function (require, module, exports) {
        (function (process) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var inherits = require("../utils").inherits;
          var color = Base.color;
          var cursor = Base.cursor;

          /**
           * Expose `Progress`.
           */

          exports = module.exports = Progress;

          /**
           * General progress bar color.
           */

          Base.colors.progress = 90;

          /**
           * Initialize a new `Progress` bar test reporter.
           *
           * @api public
           * @param {Runner} runner
           * @param {Object} options
           */
          function Progress(runner, options) {
            Base.call(this, runner);

            var self = this;
            var width = (Base.window.width * 0.5) | 0;
            var total = runner.total;
            var complete = 0;
            var lastN = -1;

            // default chars
            options = options || {};
            options.open = options.open || "[";
            options.complete = options.complete || "▬";
            options.incomplete = options.incomplete || Base.symbols.dot;
            options.close = options.close || "]";
            options.verbose = false;

            // tests started
            runner.on("start", function () {
              console.log();
              cursor.hide();
            });

            // tests complete
            runner.on("test end", function () {
              complete++;

              var percent = complete / total;
              var n = (width * percent) | 0;
              var i = width - n;

              if (n === lastN && !options.verbose) {
                // Don't re-render the line if it hasn't changed
                return;
              }
              lastN = n;

              cursor.CR();
              process.stdout.write("\u001b[J");
              process.stdout.write(color("progress", "  " + options.open));
              process.stdout.write(Array(n).join(options.complete));
              process.stdout.write(Array(i).join(options.incomplete));
              process.stdout.write(color("progress", options.close));
              if (options.verbose) {
                process.stdout.write(
                  color("progress", " " + complete + " of " + total)
                );
              }
            });

            // tests are complete, output some stats
            // and the failures if any
            runner.on("end", function () {
              cursor.show();
              console.log();
              self.epilogue();
            });
          }

          /**
           * Inherit from `Base.prototype`.
           */
          inherits(Progress, Base);
        }.call(this, require("_process")));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
      },
    ],
    30: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Base = require("./base");
        var inherits = require("../utils").inherits;
        var color = Base.color;

        /**
         * Expose `Spec`.
         */

        exports = module.exports = Spec;

        /**
         * Initialize a new `Spec` test reporter.
         *
         * @api public
         * @param {Runner} runner
         */
        function Spec(runner) {
          Base.call(this, runner);

          var self = this;
          var indents = 0;
          var n = 0;

          function indent() {
            return Array(indents).join("  ");
          }

          runner.on("start", function () {
            console.log();
          });

          runner.on("suite", function (suite) {
            ++indents;
            console.log(color("suite", "%s%s"), indent(), suite.title);
          });

          runner.on("suite end", function () {
            --indents;
            if (indents === 1) {
              console.log();
            }
          });

          runner.on("pending", function (test) {
            var fmt = indent() + color("pending", "  - %s");
            console.log(fmt, test.title);
          });

          runner.on("pass", function (test) {
            var fmt;
            if (test.speed === "fast") {
              fmt =
                indent() +
                color("checkmark", "  " + Base.symbols.ok) +
                color("pass", " %s");
              console.log(fmt, test.title);
            } else {
              fmt =
                indent() +
                color("checkmark", "  " + Base.symbols.ok) +
                color("pass", " %s") +
                color(test.speed, " (%dms)");
              console.log(fmt, test.title, test.duration);
            }
          });

          runner.on("fail", function (test) {
            console.log(indent() + color("fail", "  %d) %s"), ++n, test.title);
          });

          runner.on("end", self.epilogue.bind(self));
        }

        /**
         * Inherit from `Base.prototype`.
         */
        inherits(Spec, Base);
      },
      {
        "../utils": 38,
        "./base": 17,
      },
    ],
    31: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Base = require("./base");

        /**
         * Expose `TAP`.
         */

        exports = module.exports = TAP;

        /**
         * Initialize a new `TAP` reporter.
         *
         * @api public
         * @param {Runner} runner
         */
        function TAP(runner) {
          Base.call(this, runner);

          var n = 1;
          var passes = 0;
          var failures = 0;

          runner.on("start", function () {
            var total = runner.grepTotal(runner.suite);
            console.log("%d..%d", 1, total);
          });

          runner.on("test end", function () {
            ++n;
          });

          runner.on("pending", function (test) {
            console.log("ok %d %s # SKIP -", n, title(test));
          });

          runner.on("pass", function (test) {
            passes++;
            console.log("ok %d %s", n, title(test));
          });

          runner.on("fail", function (test, err) {
            failures++;
            console.log("not ok %d %s", n, title(test));
            if (err.stack) {
              console.log(err.stack.replace(/^/gm, "  "));
            }
          });

          runner.on("end", function () {
            console.log("# tests " + (passes + failures));
            console.log("# pass " + passes);
            console.log("# fail " + failures);
          });
        }

        /**
         * Return a TAP-safe title of `test`
         *
         * @api private
         * @param {Object} test
         * @return {String}
         */
        function title(test) {
          return test.fullTitle().replace(/#/g, "");
        }
      },
      {
        "./base": 17,
      },
    ],
    32: [
      function (require, module, exports) {
        (function (process, global) {
          "use strict";

          /**
           * Module dependencies.
           */

          var Base = require("./base");
          var utils = require("../utils");
          var inherits = utils.inherits;
          var fs = require("fs");
          var escape = utils.escape;
          var mkdirp = require("mkdirp");
          var path = require("path");

          /**
           * Save timer references to avoid Sinon interfering (see GH-237).
           */

          /* eslint-disable no-unused-vars, no-native-reassign */
          var Date = global.Date;
          var setTimeout = global.setTimeout;
          var setInterval = global.setInterval;
          var clearTimeout = global.clearTimeout;
          var clearInterval = global.clearInterval;
          /* eslint-enable no-unused-vars, no-native-reassign */

          /**
           * Expose `XUnit`.
           */

          exports = module.exports = XUnit;

          /**
           * Initialize a new `XUnit` reporter.
           *
           * @api public
           * @param {Runner} runner
           */
          function XUnit(runner, options) {
            Base.call(this, runner);

            var stats = this.stats;
            var tests = [];
            var self = this;

            if (options.reporterOptions && options.reporterOptions.output) {
              if (!fs.createWriteStream) {
                throw new Error("file output not supported in browser");
              }
              mkdirp.sync(path.dirname(options.reporterOptions.output));
              self.fileStream = fs.createWriteStream(
                options.reporterOptions.output
              );
            }

            runner.on("pending", function (test) {
              tests.push(test);
            });

            runner.on("pass", function (test) {
              tests.push(test);
            });

            runner.on("fail", function (test) {
              tests.push(test);
            });

            runner.on("end", function () {
              self.write(
                tag(
                  "testsuite",
                  {
                    name: "Mocha Tests",
                    tests: stats.tests,
                    failures: stats.failures,
                    errors: stats.failures,
                    skipped: stats.tests - stats.failures - stats.passes,
                    timestamp: new Date().toUTCString(),
                    time: stats.duration / 1000 || 0,
                  },
                  false
                )
              );

              tests.forEach(function (t) {
                self.test(t);
              });

              self.write("</testsuite>");
            });
          }

          /**
           * Inherit from `Base.prototype`.
           */
          inherits(XUnit, Base);

          /**
           * Override done to close the stream (if it's a file).
           *
           * @param failures
           * @param {Function} fn
           */
          XUnit.prototype.done = function (failures, fn) {
            if (this.fileStream) {
              this.fileStream.end(function () {
                fn(failures);
              });
            } else {
              fn(failures);
            }
          };

          /**
           * Write out the given line.
           *
           * @param {string} line
           */
          XUnit.prototype.write = function (line) {
            if (this.fileStream) {
              this.fileStream.write(line + "\n");
            } else if (typeof process === "object" && process.stdout) {
              process.stdout.write(line + "\n");
            } else {
              console.log(line);
            }
          };

          /**
           * Output tag for the given `test.`
           *
           * @param {Test} test
           */
          XUnit.prototype.test = function (test) {
            var attrs = {
              classname: test.parent.fullTitle(),
              name: test.title,
              time: test.duration / 1000 || 0,
            };

            if (test.state === "failed") {
              var err = test.err;
              this.write(
                tag(
                  "testcase",
                  attrs,
                  false,
                  tag(
                    "failure",
                    {},
                    false,
                    escape(err.message) + "\n" + escape(err.stack)
                  )
                )
              );
            } else if (test.isPending()) {
              this.write(
                tag("testcase", attrs, false, tag("skipped", {}, true))
              );
            } else {
              this.write(tag("testcase", attrs, true));
            }
          };

          /**
           * HTML tag helper.
           *
           * @param name
           * @param attrs
           * @param close
           * @param content
           * @return {string}
           */
          function tag(name, attrs, close, content) {
            var end = close ? "/>" : ">";
            var pairs = [];
            var tag;

            for (var key in attrs) {
              if (Object.prototype.hasOwnProperty.call(attrs, key)) {
                pairs.push(key + '="' + escape(attrs[key]) + '"');
              }
            }

            tag =
              "<" + name + (pairs.length ? " " + pairs.join(" ") : "") + end;
            if (content) {
              tag += content + "</" + name + end;
            }
            return tag;
          }
        }.call(
          this,
          require("_process"),
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "../utils": 38,
        "./base": 17,
        _process: 67,
        fs: 42,
        mkdirp: 64,
        path: 42,
      },
    ],
    33: [
      function (require, module, exports) {
        (function (global) {
          "use strict";

          /**
           * Module dependencies.
           */

          var EventEmitter = require("events").EventEmitter;
          var JSON = require("json3");
          var Pending = require("./pending");
          var debug = require("debug")("mocha:runnable");
          var milliseconds = require("./ms");
          var utils = require("./utils");
          var create = require("lodash.create");

          /**
           * Save timer references to avoid Sinon interfering (see GH-237).
           */

          /* eslint-disable no-unused-vars, no-native-reassign */
          var Date = global.Date;
          var setTimeout = global.setTimeout;
          var setInterval = global.setInterval;
          var clearTimeout = global.clearTimeout;
          var clearInterval = global.clearInterval;
          /* eslint-enable no-unused-vars, no-native-reassign */

          /**
           * Object#toString().
           */

          var toString = Object.prototype.toString;

          /**
           * Expose `Runnable`.
           */

          module.exports = Runnable;

          /**
           * Initialize a new `Runnable` with the given `title` and callback `fn`.
           *
           * @param {String} title
           * @param {Function} fn
           * @api private
           * @param {string} title
           * @param {Function} fn
           */
          function Runnable(title, fn) {
            this.title = title;
            this.fn = fn;
            this.body = (fn || "").toString();
            this.async = fn && fn.length;
            this.sync = !this.async;
            this._timeout = 2000;
            this._slow = 75;
            this._enableTimeouts = true;
            this.timedOut = false;
            this._trace = new Error("done() called multiple times");
            this._retries = -1;
            this._currentRetry = 0;
            this.pending = false;
          }

          /**
           * Inherit from `EventEmitter.prototype`.
           */
          Runnable.prototype = create(EventEmitter.prototype, {
            constructor: Runnable,
          });

          /**
           * Set & get timeout `ms`.
           *
           * @api private
           * @param {number|string} ms
           * @return {Runnable|number} ms or Runnable instance.
           */
          Runnable.prototype.timeout = function (ms) {
            if (!arguments.length) {
              return this._timeout;
            }
            // see #1652 for reasoning
            if (ms === 0 || ms > Math.pow(2, 31)) {
              this._enableTimeouts = false;
            }
            if (typeof ms === "string") {
              ms = milliseconds(ms);
            }
            debug("timeout %d", ms);
            this._timeout = ms;
            if (this.timer) {
              this.resetTimeout();
            }
            return this;
          };

          /**
           * Set & get slow `ms`.
           *
           * @api private
           * @param {number|string} ms
           * @return {Runnable|number} ms or Runnable instance.
           */
          Runnable.prototype.slow = function (ms) {
            if (typeof ms === "undefined") {
              return this._slow;
            }
            if (typeof ms === "string") {
              ms = milliseconds(ms);
            }
            debug("timeout %d", ms);
            this._slow = ms;
            return this;
          };

          /**
           * Set and get whether timeout is `enabled`.
           *
           * @api private
           * @param {boolean} enabled
           * @return {Runnable|boolean} enabled or Runnable instance.
           */
          Runnable.prototype.enableTimeouts = function (enabled) {
            if (!arguments.length) {
              return this._enableTimeouts;
            }
            debug("enableTimeouts %s", enabled);
            this._enableTimeouts = enabled;
            return this;
          };

          /**
           * Halt and mark as pending.
           *
           * @api public
           */
          Runnable.prototype.skip = function () {
            throw new Pending("sync skip");
          };

          /**
           * Check if this runnable or its parent suite is marked as pending.
           *
           * @api private
           */
          Runnable.prototype.isPending = function () {
            return this.pending || (this.parent && this.parent.isPending());
          };

          /**
           * Set number of retries.
           *
           * @api private
           */
          Runnable.prototype.retries = function (n) {
            if (!arguments.length) {
              return this._retries;
            }
            this._retries = n;
          };

          /**
           * Get current retry
           *
           * @api private
           */
          Runnable.prototype.currentRetry = function (n) {
            if (!arguments.length) {
              return this._currentRetry;
            }
            this._currentRetry = n;
          };

          /**
           * Return the full title generated by recursively concatenating the parent's
           * full title.
           *
           * @api public
           * @return {string}
           */
          Runnable.prototype.fullTitle = function () {
            return this.parent.fullTitle() + " " + this.title;
          };

          /**
           * Clear the timeout.
           *
           * @api private
           */
          Runnable.prototype.clearTimeout = function () {
            clearTimeout(this.timer);
          };

          /**
           * Inspect the runnable void of private properties.
           *
           * @api private
           * @return {string}
           */
          Runnable.prototype.inspect = function () {
            return JSON.stringify(
              this,
              function (key, val) {
                if (key[0] === "_") {
                  return;
                }
                if (key === "parent") {
                  return "#<Suite>";
                }
                if (key === "ctx") {
                  return "#<Context>";
                }
                return val;
              },
              2
            );
          };

          /**
           * Reset the timeout.
           *
           * @api private
           */
          Runnable.prototype.resetTimeout = function () {
            var self = this;
            var ms = this.timeout() || 1e9;

            if (!this._enableTimeouts) {
              return;
            }
            this.clearTimeout();
            this.timer = setTimeout(function () {
              if (!self._enableTimeouts) {
                return;
              }
              self.callback(
                new Error(
                  "timeout of " +
                    ms +
                    "ms exceeded. Ensure the done() callback is being called in this test."
                )
              );
              self.timedOut = true;
            }, ms);
          };

          /**
           * Whitelist a list of globals for this test run.
           *
           * @api private
           * @param {string[]} globals
           */
          Runnable.prototype.globals = function (globals) {
            if (!arguments.length) {
              return this._allowedGlobals;
            }
            this._allowedGlobals = globals;
          };

          /**
           * Run the test and invoke `fn(err)`.
           *
           * @param {Function} fn
           * @api private
           */
          Runnable.prototype.run = function (fn) {
            var self = this;
            var start = new Date();
            var ctx = this.ctx;
            var finished;
            var emitted;

            // Sometimes the ctx exists, but it is not runnable
            if (ctx && ctx.runnable) {
              ctx.runnable(this);
            }

            // called multiple times
            function multiple(err) {
              if (emitted) {
                return;
              }
              emitted = true;
              self.emit(
                "error",
                err ||
                  new Error(
                    "done() called multiple times; stacktrace may be inaccurate"
                  )
              );
            }

            // finished
            function done(err) {
              var ms = self.timeout();
              if (self.timedOut) {
                return;
              }
              if (finished) {
                return multiple(err || self._trace);
              }

              self.clearTimeout();
              self.duration = new Date() - start;
              finished = true;
              if (!err && self.duration > ms && self._enableTimeouts) {
                err = new Error(
                  "timeout of " +
                    ms +
                    "ms exceeded. Ensure the done() callback is being called in this test."
                );
              }
              fn(err);
            }

            // for .resetTimeout()
            this.callback = done;

            // explicit async with `done` argument
            if (this.async) {
              this.resetTimeout();

              // allows skip() to be used in an explicit async context
              this.skip = function asyncSkip() {
                done(new Pending("async skip call"));
                // halt execution.  the Runnable will be marked pending
                // by the previous call, and the uncaught handler will ignore
                // the failure.
                throw new Pending("async skip; aborting execution");
              };

              if (this.allowUncaught) {
                return callFnAsync(this.fn);
              }
              try {
                callFnAsync(this.fn);
              } catch (err) {
                emitted = true;
                done(utils.getError(err));
              }
              return;
            }

            if (this.allowUncaught) {
              callFn(this.fn);
              done();
              return;
            }

            // sync or promise-returning
            try {
              if (this.isPending()) {
                done();
              } else {
                callFn(this.fn);
              }
            } catch (err) {
              emitted = true;
              done(utils.getError(err));
            }

            function callFn(fn) {
              var result = fn.call(ctx);
              if (result && typeof result.then === "function") {
                self.resetTimeout();
                result.then(
                  function () {
                    done();
                    // Return null so libraries like bluebird do not warn about
                    // subsequently constructed Promises.
                    return null;
                  },
                  function (reason) {
                    done(
                      reason ||
                        new Error("Promise rejected with no or falsy reason")
                    );
                  }
                );
              } else {
                if (self.asyncOnly) {
                  return done(
                    new Error(
                      "--async-only option in use without declaring `done()` or returning a promise"
                    )
                  );
                }

                done();
              }
            }

            function callFnAsync(fn) {
              var result = fn.call(ctx, function (err) {
                if (
                  err instanceof Error ||
                  toString.call(err) === "[object Error]"
                ) {
                  return done(err);
                }
                if (err) {
                  if (
                    Object.prototype.toString.call(err) === "[object Object]"
                  ) {
                    return done(
                      new Error(
                        "done() invoked with non-Error: " + JSON.stringify(err)
                      )
                    );
                  }
                  return done(
                    new Error("done() invoked with non-Error: " + err)
                  );
                }
                if (result && utils.isPromise(result)) {
                  return done(
                    new Error(
                      "Resolution method is overspecified. Specify a callback *or* return a Promise; not both."
                    )
                  );
                }

                done();
              });
            }
          };
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "./ms": 15,
        "./pending": 16,
        "./utils": 38,
        debug: 2,
        events: 3,
        json3: 54,
        "lodash.create": 60,
      },
    ],
    34: [
      function (require, module, exports) {
        (function (process, global) {
          "use strict";

          /**
           * Module dependencies.
           */

          var EventEmitter = require("events").EventEmitter;
          var Pending = require("./pending");
          var utils = require("./utils");
          var inherits = utils.inherits;
          var debug = require("debug")("mocha:runner");
          var Runnable = require("./runnable");
          var filter = utils.filter;
          var indexOf = utils.indexOf;
          var some = utils.some;
          var keys = utils.keys;
          var stackFilter = utils.stackTraceFilter();
          var stringify = utils.stringify;
          var type = utils.type;
          var undefinedError = utils.undefinedError;
          var isArray = utils.isArray;

          /**
           * Non-enumerable globals.
           */

          var globals = [
            "setTimeout",
            "clearTimeout",
            "setInterval",
            "clearInterval",
            "XMLHttpRequest",
            "Date",
            "setImmediate",
            "clearImmediate",
          ];

          /**
           * Expose `Runner`.
           */

          module.exports = Runner;

          /**
           * Initialize a `Runner` for the given `suite`.
           *
           * Events:
           *
           *   - `start`  execution started
           *   - `end`  execution complete
           *   - `suite`  (suite) test suite execution started
           *   - `suite end`  (suite) all tests (and sub-suites) have finished
           *   - `test`  (test) test execution started
           *   - `test end`  (test) test completed
           *   - `hook`  (hook) hook execution started
           *   - `hook end`  (hook) hook complete
           *   - `pass`  (test) test passed
           *   - `fail`  (test, err) test failed
           *   - `pending`  (test) test pending
           *
           * @api public
           * @param {Suite} suite Root suite
           * @param {boolean} [delay] Whether or not to delay execution of root suite
           * until ready.
           */
          function Runner(suite, delay) {
            var self = this;
            this._globals = [];
            this._abort = false;
            this._delay = delay;
            this.suite = suite;
            this.started = false;
            this.total = suite.total();
            this.failures = 0;
            this.on("test end", function (test) {
              self.checkGlobals(test);
            });
            this.on("hook end", function (hook) {
              self.checkGlobals(hook);
            });
            this._defaultGrep = /.*/;
            this.grep(this._defaultGrep);
            this.globals(this.globalProps().concat(extraGlobals()));
          }

          /**
           * Wrapper for setImmediate, process.nextTick, or browser polyfill.
           *
           * @param {Function} fn
           * @api private
           */
          Runner.immediately = global.setImmediate || process.nextTick;

          /**
           * Inherit from `EventEmitter.prototype`.
           */
          inherits(Runner, EventEmitter);

          /**
           * Run tests with full titles matching `re`. Updates runner.total
           * with number of tests matched.
           *
           * @param {RegExp} re
           * @param {Boolean} invert
           * @return {Runner} for chaining
           * @api public
           * @param {RegExp} re
           * @param {boolean} invert
           * @return {Runner} Runner instance.
           */
          Runner.prototype.grep = function (re, invert) {
            debug("grep %s", re);
            this._grep = re;
            this._invert = invert;
            this.total = this.grepTotal(this.suite);
            return this;
          };

          /**
           * Returns the number of tests matching the grep search for the
           * given suite.
           *
           * @param {Suite} suite
           * @return {Number}
           * @api public
           * @param {Suite} suite
           * @return {number}
           */
          Runner.prototype.grepTotal = function (suite) {
            var self = this;
            var total = 0;

            suite.eachTest(function (test) {
              var match = self._grep.test(test.fullTitle());
              if (self._invert) {
                match = !match;
              }
              if (match) {
                total++;
              }
            });

            return total;
          };

          /**
           * Return a list of global properties.
           *
           * @return {Array}
           * @api private
           */
          Runner.prototype.globalProps = function () {
            var props = keys(global);

            // non-enumerables
            for (var i = 0; i < globals.length; ++i) {
              if (~indexOf(props, globals[i])) {
                continue;
              }
              props.push(globals[i]);
            }

            return props;
          };

          /**
           * Allow the given `arr` of globals.
           *
           * @param {Array} arr
           * @return {Runner} for chaining
           * @api public
           * @param {Array} arr
           * @return {Runner} Runner instance.
           */
          Runner.prototype.globals = function (arr) {
            if (!arguments.length) {
              return this._globals;
            }
            debug("globals %j", arr);
            this._globals = this._globals.concat(arr);
            return this;
          };

          /**
           * Check for global variable leaks.
           *
           * @api private
           */
          Runner.prototype.checkGlobals = function (test) {
            if (this.ignoreLeaks) {
              return;
            }
            var ok = this._globals;

            var globals = this.globalProps();
            var leaks;

            if (test) {
              ok = ok.concat(test._allowedGlobals || []);
            }

            if (this.prevGlobalsLength === globals.length) {
              return;
            }
            this.prevGlobalsLength = globals.length;

            leaks = filterLeaks(ok, globals);
            this._globals = this._globals.concat(leaks);

            if (leaks.length > 1) {
              this.fail(
                test,
                new Error("global leaks detected: " + leaks.join(", ") + "")
              );
            } else if (leaks.length) {
              this.fail(test, new Error("global leak detected: " + leaks[0]));
            }
          };

          /**
           * Fail the given `test`.
           *
           * @api private
           * @param {Test} test
           * @param {Error} err
           */
          Runner.prototype.fail = function (test, err) {
            if (test.isPending()) {
              return;
            }

            ++this.failures;
            test.state = "failed";

            if (
              !(
                err instanceof Error ||
                (err && typeof err.message === "string")
              )
            ) {
              err = new Error(
                "the " +
                  type(err) +
                  " " +
                  stringify(err) +
                  " was thrown, throw an Error :)"
              );
            }

            try {
              err.stack =
                this.fullStackTrace || !err.stack
                  ? err.stack
                  : stackFilter(err.stack);
            } catch (ignored) {
              // some environments do not take kindly to monkeying with the stack
            }

            this.emit("fail", test, err);
          };

          /**
           * Fail the given `hook` with `err`.
           *
           * Hook failures work in the following pattern:
           * - If bail, then exit
           * - Failed `before` hook skips all tests in a suite and subsuites,
           *   but jumps to corresponding `after` hook
           * - Failed `before each` hook skips remaining tests in a
           *   suite and jumps to corresponding `after each` hook,
           *   which is run only once
           * - Failed `after` hook does not alter
           *   execution order
           * - Failed `after each` hook skips remaining tests in a
           *   suite and subsuites, but executes other `after each`
           *   hooks
           *
           * @api private
           * @param {Hook} hook
           * @param {Error} err
           */
          Runner.prototype.failHook = function (hook, err) {
            if (hook.ctx && hook.ctx.currentTest) {
              hook.originalTitle = hook.originalTitle || hook.title;
              hook.title =
                hook.originalTitle +
                ' for "' +
                hook.ctx.currentTest.title +
                '"';
            }

            this.fail(hook, err);
            if (this.suite.bail()) {
              this.emit("end");
            }
          };

          /**
           * Run hook `name` callbacks and then invoke `fn()`.
           *
           * @api private
           * @param {string} name
           * @param {Function} fn
           */

          Runner.prototype.hook = function (name, fn) {
            var suite = this.suite;
            var hooks = suite["_" + name];
            var self = this;

            function next(i) {
              var hook = hooks[i];
              if (!hook) {
                return fn();
              }
              self.currentRunnable = hook;

              hook.ctx.currentTest = self.test;

              self.emit("hook", hook);

              if (!hook.listeners("error").length) {
                hook.on("error", function (err) {
                  self.failHook(hook, err);
                });
              }

              hook.run(function (err) {
                var testError = hook.error();
                if (testError) {
                  self.fail(self.test, testError);
                }
                if (err) {
                  if (err instanceof Pending) {
                    if (name === "beforeEach" || name === "afterEach") {
                      self.test.pending = true;
                    } else {
                      utils.forEach(suite.tests, function (test) {
                        test.pending = true;
                      });
                      // a pending hook won't be executed twice.
                      hook.pending = true;
                    }
                  } else {
                    self.failHook(hook, err);

                    // stop executing hooks, notify callee of hook err
                    return fn(err);
                  }
                }
                self.emit("hook end", hook);
                delete hook.ctx.currentTest;
                next(++i);
              });
            }

            Runner.immediately(function () {
              next(0);
            });
          };

          /**
           * Run hook `name` for the given array of `suites`
           * in order, and callback `fn(err, errSuite)`.
           *
           * @api private
           * @param {string} name
           * @param {Array} suites
           * @param {Function} fn
           */
          Runner.prototype.hooks = function (name, suites, fn) {
            var self = this;
            var orig = this.suite;

            function next(suite) {
              self.suite = suite;

              if (!suite) {
                self.suite = orig;
                return fn();
              }

              self.hook(name, function (err) {
                if (err) {
                  var errSuite = self.suite;
                  self.suite = orig;
                  return fn(err, errSuite);
                }

                next(suites.pop());
              });
            }

            next(suites.pop());
          };

          /**
           * Run hooks from the top level down.
           *
           * @param {String} name
           * @param {Function} fn
           * @api private
           */
          Runner.prototype.hookUp = function (name, fn) {
            var suites = [this.suite].concat(this.parents()).reverse();
            this.hooks(name, suites, fn);
          };

          /**
           * Run hooks from the bottom up.
           *
           * @param {String} name
           * @param {Function} fn
           * @api private
           */
          Runner.prototype.hookDown = function (name, fn) {
            var suites = [this.suite].concat(this.parents());
            this.hooks(name, suites, fn);
          };

          /**
           * Return an array of parent Suites from
           * closest to furthest.
           *
           * @return {Array}
           * @api private
           */
          Runner.prototype.parents = function () {
            var suite = this.suite;
            var suites = [];
            while (suite.parent) {
              suite = suite.parent;
              suites.push(suite);
            }
            return suites;
          };

          /**
           * Run the current test and callback `fn(err)`.
           *
           * @param {Function} fn
           * @api private
           */
          Runner.prototype.runTest = function (fn) {
            var self = this;
            var test = this.test;

            if (!test) {
              return;
            }
            if (this.asyncOnly) {
              test.asyncOnly = true;
            }

            if (this.allowUncaught) {
              test.allowUncaught = true;
              return test.run(fn);
            }
            try {
              test.on("error", function (err) {
                self.fail(test, err);
              });
              test.run(fn);
            } catch (err) {
              fn(err);
            }
          };

          /**
           * Run tests in the given `suite` and invoke the callback `fn()` when complete.
           *
           * @api private
           * @param {Suite} suite
           * @param {Function} fn
           */
          Runner.prototype.runTests = function (suite, fn) {
            var self = this;
            var tests = suite.tests.slice();
            var test;

            function hookErr(_, errSuite, after) {
              // before/after Each hook for errSuite failed:
              var orig = self.suite;

              // for failed 'after each' hook start from errSuite parent,
              // otherwise start from errSuite itself
              self.suite = after ? errSuite.parent : errSuite;

              if (self.suite) {
                // call hookUp afterEach
                self.hookUp("afterEach", function (err2, errSuite2) {
                  self.suite = orig;
                  // some hooks may fail even now
                  if (err2) {
                    return hookErr(err2, errSuite2, true);
                  }
                  // report error suite
                  fn(errSuite);
                });
              } else {
                // there is no need calling other 'after each' hooks
                self.suite = orig;
                fn(errSuite);
              }
            }

            function next(err, errSuite) {
              // if we bail after first err
              if (self.failures && suite._bail) {
                return fn();
              }

              if (self._abort) {
                return fn();
              }

              if (err) {
                return hookErr(err, errSuite, true);
              }

              // next test
              test = tests.shift();

              // all done
              if (!test) {
                return fn();
              }

              // grep
              var match = self._grep.test(test.fullTitle());
              if (self._invert) {
                match = !match;
              }
              if (!match) {
                // Run immediately only if we have defined a grep. When we
                // define a grep — It can cause maximum callstack error if
                // the grep is doing a large recursive loop by neglecting
                // all tests. The run immediately function also comes with
                // a performance cost. So we don't want to run immediately
                // if we run the whole test suite, because running the whole
                // test suite don't do any immediate recursive loops. Thus,
                // allowing a JS runtime to breathe.
                if (self._grep !== self._defaultGrep) {
                  Runner.immediately(next);
                } else {
                  next();
                }
                return;
              }

              if (test.isPending()) {
                self.emit("pending", test);
                self.emit("test end", test);
                return next();
              }

              // execute test and hook(s)
              self.emit("test", (self.test = test));
              self.hookDown("beforeEach", function (err, errSuite) {
                if (test.isPending()) {
                  self.emit("pending", test);
                  self.emit("test end", test);
                  return next();
                }
                if (err) {
                  return hookErr(err, errSuite, false);
                }
                self.currentRunnable = self.test;
                self.runTest(function (err) {
                  test = self.test;
                  if (err) {
                    var retry = test.currentRetry();
                    if (err instanceof Pending) {
                      test.pending = true;
                      self.emit("pending", test);
                    } else if (retry < test.retries()) {
                      var clonedTest = test.clone();
                      clonedTest.currentRetry(retry + 1);
                      tests.unshift(clonedTest);

                      // Early return + hook trigger so that it doesn't
                      // increment the count wrong
                      return self.hookUp("afterEach", next);
                    } else {
                      self.fail(test, err);
                    }
                    self.emit("test end", test);

                    if (err instanceof Pending) {
                      return next();
                    }

                    return self.hookUp("afterEach", next);
                  }

                  test.state = "passed";
                  self.emit("pass", test);
                  self.emit("test end", test);
                  self.hookUp("afterEach", next);
                });
              });
            }

            this.next = next;
            this.hookErr = hookErr;
            next();
          };

          /**
           * Run the given `suite` and invoke the callback `fn()` when complete.
           *
           * @api private
           * @param {Suite} suite
           * @param {Function} fn
           */
          Runner.prototype.runSuite = function (suite, fn) {
            var i = 0;
            var self = this;
            var total = this.grepTotal(suite);
            var afterAllHookCalled = false;

            debug("run suite %s", suite.fullTitle());

            if (!total || (self.failures && suite._bail)) {
              return fn();
            }

            this.emit("suite", (this.suite = suite));

            function next(errSuite) {
              if (errSuite) {
                // current suite failed on a hook from errSuite
                if (errSuite === suite) {
                  // if errSuite is current suite
                  // continue to the next sibling suite
                  return done();
                }
                // errSuite is among the parents of current suite
                // stop execution of errSuite and all sub-suites
                return done(errSuite);
              }

              if (self._abort) {
                return done();
              }

              var curr = suite.suites[i++];
              if (!curr) {
                return done();
              }

              // Avoid grep neglecting large number of tests causing a
              // huge recursive loop and thus a maximum call stack error.
              // See comment in `this.runTests()` for more information.
              if (self._grep !== self._defaultGrep) {
                Runner.immediately(function () {
                  self.runSuite(curr, next);
                });
              } else {
                self.runSuite(curr, next);
              }
            }

            function done(errSuite) {
              self.suite = suite;
              self.nextSuite = next;

              if (afterAllHookCalled) {
                fn(errSuite);
              } else {
                // mark that the afterAll block has been called once
                // and so can be skipped if there is an error in it.
                afterAllHookCalled = true;

                // remove reference to test
                delete self.test;

                self.hook("afterAll", function () {
                  self.emit("suite end", suite);
                  fn(errSuite);
                });
              }
            }

            this.nextSuite = next;

            this.hook("beforeAll", function (err) {
              if (err) {
                return done();
              }
              self.runTests(suite, next);
            });
          };

          /**
           * Handle uncaught exceptions.
           *
           * @param {Error} err
           * @api private
           */
          Runner.prototype.uncaught = function (err) {
            if (err) {
              debug(
                "uncaught exception %s",
                err !==
                  function () {
                    return this;
                  }.call(err)
                  ? err
                  : err.message || err
              );
            } else {
              debug("uncaught undefined exception");
              err = undefinedError();
            }
            err.uncaught = true;

            var runnable = this.currentRunnable;

            if (!runnable) {
              runnable = new Runnable("Uncaught error outside test suite");
              runnable.parent = this.suite;

              if (this.started) {
                this.fail(runnable, err);
              } else {
                // Can't recover from this failure
                this.emit("start");
                this.fail(runnable, err);
                this.emit("end");
              }

              return;
            }

            runnable.clearTimeout();

            // Ignore errors if complete or pending
            if (runnable.state || runnable.isPending()) {
              return;
            }
            this.fail(runnable, err);

            // recover from test
            if (runnable.type === "test") {
              this.emit("test end", runnable);
              this.hookUp("afterEach", this.next);
              return;
            }

            // recover from hooks
            if (runnable.type === "hook") {
              var errSuite = this.suite;
              // if hook failure is in afterEach block
              if (runnable.fullTitle().indexOf("after each") > -1) {
                return this.hookErr(err, errSuite, true);
              }
              // if hook failure is in beforeEach block
              if (runnable.fullTitle().indexOf("before each") > -1) {
                return this.hookErr(err, errSuite, false);
              }
              // if hook failure is in after or before blocks
              return this.nextSuite(errSuite);
            }

            // bail
            this.emit("end");
          };

          /**
           * Cleans up the references to all the deferred functions
           * (before/after/beforeEach/afterEach) and tests of a Suite.
           * These must be deleted otherwise a memory leak can happen,
           * as those functions may reference variables from closures,
           * thus those variables can never be garbage collected as long
           * as the deferred functions exist.
           *
           * @param {Suite} suite
           */
          function cleanSuiteReferences(suite) {
            function cleanArrReferences(arr) {
              for (var i = 0; i < arr.length; i++) {
                delete arr[i].fn;
              }
            }

            if (isArray(suite._beforeAll)) {
              cleanArrReferences(suite._beforeAll);
            }

            if (isArray(suite._beforeEach)) {
              cleanArrReferences(suite._beforeEach);
            }

            if (isArray(suite._afterAll)) {
              cleanArrReferences(suite._afterAll);
            }

            if (isArray(suite._afterEach)) {
              cleanArrReferences(suite._afterEach);
            }

            for (var i = 0; i < suite.tests.length; i++) {
              delete suite.tests[i].fn;
            }
          }

          /**
           * Run the root suite and invoke `fn(failures)`
           * on completion.
           *
           * @param {Function} fn
           * @return {Runner} for chaining
           * @api public
           * @param {Function} fn
           * @return {Runner} Runner instance.
           */
          Runner.prototype.run = function (fn) {
            var self = this;
            var rootSuite = this.suite;

            // If there is an `only` filter
            if (this.hasOnly) {
              filterOnly(rootSuite);
            }

            fn = fn || function () {};

            function uncaught(err) {
              self.uncaught(err);
            }

            function start() {
              self.started = true;
              self.emit("start");
              self.runSuite(rootSuite, function () {
                debug("finished running");
                self.emit("end");
              });
            }

            debug("start");

            // references cleanup to avoid memory leaks
            this.on("suite end", cleanSuiteReferences);

            // callback
            this.on("end", function () {
              debug("end");
              process.removeListener("uncaughtException", uncaught);
              fn(self.failures);
            });

            // uncaught exception
            process.on("uncaughtException", uncaught);

            if (this._delay) {
              // for reporters, I guess.
              // might be nice to debounce some dots while we wait.
              this.emit("waiting", rootSuite);
              rootSuite.once("run", start);
            } else {
              start();
            }

            return this;
          };

          /**
           * Cleanly abort execution.
           *
           * @api public
           * @return {Runner} Runner instance.
           */
          Runner.prototype.abort = function () {
            debug("aborting");
            this._abort = true;

            return this;
          };

          /**
           * Filter suites based on `isOnly` logic.
           *
           * @param {Array} suite
           * @returns {Boolean}
           * @api private
           */
          function filterOnly(suite) {
            if (suite._onlyTests.length) {
              // If the suite contains `only` tests, run those and ignore any nested suites.
              suite.tests = suite._onlyTests;
              suite.suites = [];
            } else {
              // Otherwise, do not run any of the tests in this suite.
              suite.tests = [];
              utils.forEach(suite._onlySuites, function (onlySuite) {
                // If there are other `only` tests/suites nested in the current `only` suite, then filter that `only` suite.
                // Otherwise, all of the tests on this `only` suite should be run, so don't filter it.
                if (hasOnly(onlySuite)) {
                  filterOnly(onlySuite);
                }
              });
              // Run the `only` suites, as well as any other suites that have `only` tests/suites as descendants.
              suite.suites = filter(suite.suites, function (childSuite) {
                return (
                  indexOf(suite._onlySuites, childSuite) !== -1 ||
                  filterOnly(childSuite)
                );
              });
            }
            // Keep the suite only if there is something to run
            return suite.tests.length || suite.suites.length;
          }

          /**
           * Determines whether a suite has an `only` test or suite as a descendant.
           *
           * @param {Array} suite
           * @returns {Boolean}
           * @api private
           */
          function hasOnly(suite) {
            return (
              suite._onlyTests.length ||
              suite._onlySuites.length ||
              some(suite.suites, hasOnly)
            );
          }

          /**
           * Filter leaks with the given globals flagged as `ok`.
           *
           * @api private
           * @param {Array} ok
           * @param {Array} globals
           * @return {Array}
           */
          function filterLeaks(ok, globals) {
            return filter(globals, function (key) {
              // Firefox and Chrome exposes iframes as index inside the window object
              if (/^\d+/.test(key)) {
                return false;
              }

              // in firefox
              // if runner runs in an iframe, this iframe's window.getInterface method
              // not init at first it is assigned in some seconds
              if (global.navigator && /^getInterface/.test(key)) {
                return false;
              }

              // an iframe could be approached by window[iframeIndex]
              // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak
              if (global.navigator && /^\d+/.test(key)) {
                return false;
              }

              // Opera and IE expose global variables for HTML element IDs (issue #243)
              if (/^mocha-/.test(key)) {
                return false;
              }

              var matched = filter(ok, function (ok) {
                if (~ok.indexOf("*")) {
                  return key.indexOf(ok.split("*")[0]) === 0;
                }
                return key === ok;
              });
              return (
                !matched.length && (!global.navigator || key !== "onerror")
              );
            });
          }

          /**
           * Array of globals dependent on the environment.
           *
           * @return {Array}
           * @api private
           */
          function extraGlobals() {
            if (
              typeof process === "object" &&
              typeof process.version === "string"
            ) {
              var parts = process.version.split(".");
              var nodeVersion = utils.reduce(parts, function (a, v) {
                return (a << 8) | v;
              });

              // 'errno' was renamed to process._errno in v0.9.11.

              if (nodeVersion < 0x00090b) {
                return ["errno"];
              }
            }

            return [];
          }
        }.call(
          this,
          require("_process"),
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "./pending": 16,
        "./runnable": 33,
        "./utils": 38,
        _process: 67,
        debug: 2,
        events: 3,
      },
    ],
    35: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var EventEmitter = require("events").EventEmitter;
        var Hook = require("./hook");
        var utils = require("./utils");
        var inherits = utils.inherits;
        var debug = require("debug")("mocha:suite");
        var milliseconds = require("./ms");

        /**
         * Expose `Suite`.
         */

        exports = module.exports = Suite;

        /**
         * Create a new `Suite` with the given `title` and parent `Suite`. When a suite
         * with the same title is already present, that suite is returned to provide
         * nicer reporter and more flexible meta-testing.
         *
         * @api public
         * @param {Suite} parent
         * @param {string} title
         * @return {Suite}
         */
        exports.create = function (parent, title) {
          var suite = new Suite(title, parent.ctx);
          suite.parent = parent;
          title = suite.fullTitle();
          parent.addSuite(suite);
          return suite;
        };

        /**
         * Initialize a new `Suite` with the given `title` and `ctx`.
         *
         * @api private
         * @param {string} title
         * @param {Context} parentContext
         */
        function Suite(title, parentContext) {
          if (!utils.isString(title)) {
            throw new Error(
              'Suite `title` should be a "string" but "' +
                typeof title +
                '" was given instead.'
            );
          }
          this.title = title;

          function Context() {}
          Context.prototype = parentContext;
          this.ctx = new Context();
          this.suites = [];
          this.tests = [];
          this.pending = false;
          this._beforeEach = [];
          this._beforeAll = [];
          this._afterEach = [];
          this._afterAll = [];
          this.root = !title;
          this._timeout = 2000;
          this._enableTimeouts = true;
          this._slow = 75;
          this._bail = false;
          this._retries = -1;
          this._onlyTests = [];
          this._onlySuites = [];
          this.delayed = false;
        }

        /**
         * Inherit from `EventEmitter.prototype`.
         */
        inherits(Suite, EventEmitter);

        /**
         * Return a clone of this `Suite`.
         *
         * @api private
         * @return {Suite}
         */
        Suite.prototype.clone = function () {
          var suite = new Suite(this.title);
          debug("clone");
          suite.ctx = this.ctx;
          suite.timeout(this.timeout());
          suite.retries(this.retries());
          suite.enableTimeouts(this.enableTimeouts());
          suite.slow(this.slow());
          suite.bail(this.bail());
          return suite;
        };

        /**
         * Set timeout `ms` or short-hand such as "2s".
         *
         * @api private
         * @param {number|string} ms
         * @return {Suite|number} for chaining
         */
        Suite.prototype.timeout = function (ms) {
          if (!arguments.length) {
            return this._timeout;
          }
          if (ms.toString() === "0") {
            this._enableTimeouts = false;
          }
          if (typeof ms === "string") {
            ms = milliseconds(ms);
          }
          debug("timeout %d", ms);
          this._timeout = parseInt(ms, 10);
          return this;
        };

        /**
         * Set number of times to retry a failed test.
         *
         * @api private
         * @param {number|string} n
         * @return {Suite|number} for chaining
         */
        Suite.prototype.retries = function (n) {
          if (!arguments.length) {
            return this._retries;
          }
          debug("retries %d", n);
          this._retries = parseInt(n, 10) || 0;
          return this;
        };

        /**
         * Set timeout to `enabled`.
         *
         * @api private
         * @param {boolean} enabled
         * @return {Suite|boolean} self or enabled
         */
        Suite.prototype.enableTimeouts = function (enabled) {
          if (!arguments.length) {
            return this._enableTimeouts;
          }
          debug("enableTimeouts %s", enabled);
          this._enableTimeouts = enabled;
          return this;
        };

        /**
         * Set slow `ms` or short-hand such as "2s".
         *
         * @api private
         * @param {number|string} ms
         * @return {Suite|number} for chaining
         */
        Suite.prototype.slow = function (ms) {
          if (!arguments.length) {
            return this._slow;
          }
          if (typeof ms === "string") {
            ms = milliseconds(ms);
          }
          debug("slow %d", ms);
          this._slow = ms;
          return this;
        };

        /**
         * Sets whether to bail after first error.
         *
         * @api private
         * @param {boolean} bail
         * @return {Suite|number} for chaining
         */
        Suite.prototype.bail = function (bail) {
          if (!arguments.length) {
            return this._bail;
          }
          debug("bail %s", bail);
          this._bail = bail;
          return this;
        };

        /**
         * Check if this suite or its parent suite is marked as pending.
         *
         * @api private
         */
        Suite.prototype.isPending = function () {
          return this.pending || (this.parent && this.parent.isPending());
        };

        /**
         * Run `fn(test[, done])` before running tests.
         *
         * @api private
         * @param {string} title
         * @param {Function} fn
         * @return {Suite} for chaining
         */
        Suite.prototype.beforeAll = function (title, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title === "function") {
            fn = title;
            title = fn.name;
          }
          title = '"before all" hook' + (title ? ": " + title : "");

          var hook = new Hook(title, fn);
          hook.parent = this;
          hook.timeout(this.timeout());
          hook.retries(this.retries());
          hook.enableTimeouts(this.enableTimeouts());
          hook.slow(this.slow());
          hook.ctx = this.ctx;
          this._beforeAll.push(hook);
          this.emit("beforeAll", hook);
          return this;
        };

        /**
         * Run `fn(test[, done])` after running tests.
         *
         * @api private
         * @param {string} title
         * @param {Function} fn
         * @return {Suite} for chaining
         */
        Suite.prototype.afterAll = function (title, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title === "function") {
            fn = title;
            title = fn.name;
          }
          title = '"after all" hook' + (title ? ": " + title : "");

          var hook = new Hook(title, fn);
          hook.parent = this;
          hook.timeout(this.timeout());
          hook.retries(this.retries());
          hook.enableTimeouts(this.enableTimeouts());
          hook.slow(this.slow());
          hook.ctx = this.ctx;
          this._afterAll.push(hook);
          this.emit("afterAll", hook);
          return this;
        };

        /**
         * Run `fn(test[, done])` before each test case.
         *
         * @api private
         * @param {string} title
         * @param {Function} fn
         * @return {Suite} for chaining
         */
        Suite.prototype.beforeEach = function (title, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title === "function") {
            fn = title;
            title = fn.name;
          }
          title = '"before each" hook' + (title ? ": " + title : "");

          var hook = new Hook(title, fn);
          hook.parent = this;
          hook.timeout(this.timeout());
          hook.retries(this.retries());
          hook.enableTimeouts(this.enableTimeouts());
          hook.slow(this.slow());
          hook.ctx = this.ctx;
          this._beforeEach.push(hook);
          this.emit("beforeEach", hook);
          return this;
        };

        /**
         * Run `fn(test[, done])` after each test case.
         *
         * @api private
         * @param {string} title
         * @param {Function} fn
         * @return {Suite} for chaining
         */
        Suite.prototype.afterEach = function (title, fn) {
          if (this.isPending()) {
            return this;
          }
          if (typeof title === "function") {
            fn = title;
            title = fn.name;
          }
          title = '"after each" hook' + (title ? ": " + title : "");

          var hook = new Hook(title, fn);
          hook.parent = this;
          hook.timeout(this.timeout());
          hook.retries(this.retries());
          hook.enableTimeouts(this.enableTimeouts());
          hook.slow(this.slow());
          hook.ctx = this.ctx;
          this._afterEach.push(hook);
          this.emit("afterEach", hook);
          return this;
        };

        /**
         * Add a test `suite`.
         *
         * @api private
         * @param {Suite} suite
         * @return {Suite} for chaining
         */
        Suite.prototype.addSuite = function (suite) {
          suite.parent = this;
          suite.timeout(this.timeout());
          suite.retries(this.retries());
          suite.enableTimeouts(this.enableTimeouts());
          suite.slow(this.slow());
          suite.bail(this.bail());
          this.suites.push(suite);
          this.emit("suite", suite);
          return this;
        };

        /**
         * Add a `test` to this suite.
         *
         * @api private
         * @param {Test} test
         * @return {Suite} for chaining
         */
        Suite.prototype.addTest = function (test) {
          test.parent = this;
          test.timeout(this.timeout());
          test.retries(this.retries());
          test.enableTimeouts(this.enableTimeouts());
          test.slow(this.slow());
          test.ctx = this.ctx;
          this.tests.push(test);
          this.emit("test", test);
          return this;
        };

        /**
         * Return the full title generated by recursively concatenating the parent's
         * full title.
         *
         * @api public
         * @return {string}
         */
        Suite.prototype.fullTitle = function () {
          if (this.parent) {
            var full = this.parent.fullTitle();
            if (full) {
              return full + " " + this.title;
            }
          }
          return this.title;
        };

        /**
         * Return the total number of tests.
         *
         * @api public
         * @return {number}
         */
        Suite.prototype.total = function () {
          return (
            utils.reduce(
              this.suites,
              function (sum, suite) {
                return sum + suite.total();
              },
              0
            ) + this.tests.length
          );
        };

        /**
         * Iterates through each suite recursively to find all tests. Applies a
         * function in the format `fn(test)`.
         *
         * @api private
         * @param {Function} fn
         * @return {Suite}
         */
        Suite.prototype.eachTest = function (fn) {
          utils.forEach(this.tests, fn);
          utils.forEach(this.suites, function (suite) {
            suite.eachTest(fn);
          });
          return this;
        };

        /**
         * This will run the root suite if we happen to be running in delayed mode.
         */
        Suite.prototype.run = function run() {
          if (this.root) {
            this.emit("run");
          }
        };
      },
      {
        "./hook": 7,
        "./ms": 15,
        "./utils": 38,
        debug: 2,
        events: 3,
      },
    ],
    36: [
      function (require, module, exports) {
        "use strict";

        /**
         * Module dependencies.
         */

        var Runnable = require("./runnable");
        var create = require("lodash.create");
        var isString = require("./utils").isString;

        /**
         * Expose `Test`.
         */

        module.exports = Test;

        /**
         * Initialize a new `Test` with the given `title` and callback `fn`.
         *
         * @api private
         * @param {String} title
         * @param {Function} fn
         */
        function Test(title, fn) {
          if (!isString(title)) {
            throw new Error(
              'Test `title` should be a "string" but "' +
                typeof title +
                '" was given instead.'
            );
          }
          Runnable.call(this, title, fn);
          this.pending = !fn;
          this.type = "test";
        }

        /**
         * Inherit from `Runnable.prototype`.
         */
        Test.prototype = create(Runnable.prototype, {
          constructor: Test,
        });

        Test.prototype.clone = function () {
          var test = new Test(this.title, this.fn);
          test.timeout(this.timeout());
          test.slow(this.slow());
          test.enableTimeouts(this.enableTimeouts());
          test.retries(this.retries());
          test.currentRetry(this.currentRetry());
          test.globals(this.globals());
          test.parent = this.parent;
          test.file = this.file;
          test.ctx = this.ctx;
          return test;
        };
      },
      {
        "./runnable": 33,
        "./utils": 38,
        "lodash.create": 60,
      },
    ],
    37: [
      function (require, module, exports) {
        "use strict";

        /**
         * Pad a `number` with a ten's place zero.
         *
         * @param {number} number
         * @return {string}
         */
        function pad(number) {
          var n = number.toString();
          return n.length === 1 ? "0" + n : n;
        }

        /**
         * Turn a `date` into an ISO string.
         *
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
         *
         * @param {Date} date
         * @return {string}
         */
        function toISOString(date) {
          return (
            date.getUTCFullYear() +
            "-" +
            pad(date.getUTCMonth() + 1) +
            "-" +
            pad(date.getUTCDate()) +
            "T" +
            pad(date.getUTCHours()) +
            ":" +
            pad(date.getUTCMinutes()) +
            ":" +
            pad(date.getUTCSeconds()) +
            "." +
            String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
            "Z"
          );
        }

        /*
         * Exports.
         */

        module.exports = toISOString;
      },
      {},
    ],
    38: [
      function (require, module, exports) {
        (function (process, Buffer) {
          "use strict";

          /* eslint-env browser */

          /**
           * Module dependencies.
           */

          var JSON = require("json3");
          var basename = require("path").basename;
          var debug = require("debug")("mocha:watch");
          var exists = require("fs").existsSync || require("path").existsSync;
          var glob = require("glob");
          var path = require("path");
          var join = path.join;
          var readdirSync = require("fs").readdirSync;
          var statSync = require("fs").statSync;
          var watchFile = require("fs").watchFile;
          var toISOString = require("./to-iso-string");

          /**
           * Ignored directories.
           */

          var ignore = ["node_modules", ".git"];

          exports.inherits = require("util").inherits;

          /**
           * Escape special characters in the given string of html.
           *
           * @api private
           * @param  {string} html
           * @return {string}
           */
          exports.escape = function (html) {
            return String(html)
              .replace(/&/g, "&amp;")
              .replace(/"/g, "&quot;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
          };

          /**
           * Array#forEach (<=IE8)
           *
           * @api private
           * @param {Array} arr
           * @param {Function} fn
           * @param {Object} scope
           */
          exports.forEach = function (arr, fn, scope) {
            for (var i = 0, l = arr.length; i < l; i++) {
              fn.call(scope, arr[i], i);
            }
          };

          /**
           * Test if the given obj is type of string.
           *
           * @api private
           * @param {Object} obj
           * @return {boolean}
           */
          exports.isString = function (obj) {
            return typeof obj === "string";
          };

          /**
           * Array#map (<=IE8)
           *
           * @api private
           * @param {Array} arr
           * @param {Function} fn
           * @param {Object} scope
           * @return {Array}
           */
          exports.map = function (arr, fn, scope) {
            var result = [];
            for (var i = 0, l = arr.length; i < l; i++) {
              result.push(fn.call(scope, arr[i], i, arr));
            }
            return result;
          };

          /**
           * Array#indexOf (<=IE8)
           *
           * @api private
           * @param {Array} arr
           * @param {Object} obj to find index of
           * @param {number} start
           * @return {number}
           */
          var indexOf = (exports.indexOf = function (arr, obj, start) {
            for (var i = start || 0, l = arr.length; i < l; i++) {
              if (arr[i] === obj) {
                return i;
              }
            }
            return -1;
          });

          /**
           * Array#reduce (<=IE8)
           *
           * @api private
           * @param {Array} arr
           * @param {Function} fn
           * @param {Object} val Initial value.
           * @return {*}
           */
          var reduce = (exports.reduce = function (arr, fn, val) {
            var rval = val;

            for (var i = 0, l = arr.length; i < l; i++) {
              rval = fn(rval, arr[i], i, arr);
            }

            return rval;
          });

          /**
           * Array#filter (<=IE8)
           *
           * @api private
           * @param {Array} arr
           * @param {Function} fn
           * @return {Array}
           */
          exports.filter = function (arr, fn) {
            var ret = [];

            for (var i = 0, l = arr.length; i < l; i++) {
              var val = arr[i];
              if (fn(val, i, arr)) {
                ret.push(val);
              }
            }

            return ret;
          };

          /**
           * Array#some (<=IE8)
           *
           * @api private
           * @param {Array} arr
           * @param {Function} fn
           * @return {Array}
           */
          exports.some = function (arr, fn) {
            for (var i = 0, l = arr.length; i < l; i++) {
              if (fn(arr[i])) {
                return true;
              }
            }
            return false;
          };

          /**
           * Object.keys (<=IE8)
           *
           * @api private
           * @param {Object} obj
           * @return {Array} keys
           */
          exports.keys =
            typeof Object.keys === "function"
              ? Object.keys
              : function (obj) {
                  var keys = [];
                  var has = Object.prototype.hasOwnProperty; // for `window` on <=IE8

                  for (var key in obj) {
                    if (has.call(obj, key)) {
                      keys.push(key);
                    }
                  }

                  return keys;
                };

          /**
           * Watch the given `files` for changes
           * and invoke `fn(file)` on modification.
           *
           * @api private
           * @param {Array} files
           * @param {Function} fn
           */
          exports.watch = function (files, fn) {
            var options = {
              interval: 100,
            };
            files.forEach(function (file) {
              debug("file %s", file);
              watchFile(file, options, function (curr, prev) {
                if (prev.mtime < curr.mtime) {
                  fn(file);
                }
              });
            });
          };

          /**
           * Array.isArray (<=IE8)
           *
           * @api private
           * @param {Object} obj
           * @return {Boolean}
           */
          var isArray =
            typeof Array.isArray === "function"
              ? Array.isArray
              : function (obj) {
                  return (
                    Object.prototype.toString.call(obj) === "[object Array]"
                  );
                };

          exports.isArray = isArray;

          /**
           * Buffer.prototype.toJSON polyfill.
           *
           * @type {Function}
           */
          if (typeof Buffer !== "undefined" && Buffer.prototype) {
            Buffer.prototype.toJSON =
              Buffer.prototype.toJSON ||
              function () {
                return Array.prototype.slice.call(this, 0);
              };
          }

          /**
           * Ignored files.
           *
           * @api private
           * @param {string} path
           * @return {boolean}
           */
          function ignored(path) {
            return !~ignore.indexOf(path);
          }

          /**
           * Lookup files in the given `dir`.
           *
           * @api private
           * @param {string} dir
           * @param {string[]} [ext=['.js']]
           * @param {Array} [ret=[]]
           * @return {Array}
           */
          exports.files = function (dir, ext, ret) {
            ret = ret || [];
            ext = ext || ["js"];

            var re = new RegExp("\\.(" + ext.join("|") + ")$");

            readdirSync(dir)
              .filter(ignored)
              .forEach(function (path) {
                path = join(dir, path);
                if (statSync(path).isDirectory()) {
                  exports.files(path, ext, ret);
                } else if (path.match(re)) {
                  ret.push(path);
                }
              });

            return ret;
          };

          /**
           * Compute a slug from the given `str`.
           *
           * @api private
           * @param {string} str
           * @return {string}
           */
          exports.slug = function (str) {
            return str
              .toLowerCase()
              .replace(/ +/g, "-")
              .replace(/[^-\w]/g, "");
          };

          /**
           * Strip the function definition from `str`, and re-indent for pre whitespace.
           *
           * @param {string} str
           * @return {string}
           */
          exports.clean = function (str) {
            str = str
              .replace(/\r\n?|[\n\u2028\u2029]/g, "\n")
              .replace(/^\uFEFF/, "")
              // (traditional)->  space/name     parameters    body     (lambda)-> parameters       body   multi-statement/single          keep body content
              .replace(
                /^function(?:\s*|\s+[^(]*)\([^)]*\)\s*\{((?:.|\n)*?)\s*\}$|^\([^)]*\)\s*=>\s*(?:\{((?:.|\n)*?)\s*\}|((?:.|\n)*))$/,
                "$1$2$3"
              );

            var spaces = str.match(/^\n?( *)/)[1].length;
            var tabs = str.match(/^\n?(\t*)/)[1].length;
            var re = new RegExp(
              "^\n?" + (tabs ? "\t" : " ") + "{" + (tabs || spaces) + "}",
              "gm"
            );

            str = str.replace(re, "");

            return exports.trim(str);
          };

          /**
           * Trim the given `str`.
           *
           * @api private
           * @param {string} str
           * @return {string}
           */
          exports.trim = function (str) {
            return str.replace(/^\s+|\s+$/g, "");
          };

          /**
           * Parse the given `qs`.
           *
           * @api private
           * @param {string} qs
           * @return {Object}
           */
          exports.parseQuery = function (qs) {
            return reduce(
              qs.replace("?", "").split("&"),
              function (obj, pair) {
                var i = pair.indexOf("=");
                var key = pair.slice(0, i);
                var val = pair.slice(++i);

                obj[key] = decodeURIComponent(val);
                return obj;
              },
              {}
            );
          };

          /**
           * Highlight the given string of `js`.
           *
           * @api private
           * @param {string} js
           * @return {string}
           */
          function highlight(js) {
            return js
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>')
              .replace(/('.*?')/gm, '<span class="string">$1</span>')
              .replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>')
              .replace(/(\d+)/gm, '<span class="number">$1</span>')
              .replace(
                /\bnew[ \t]+(\w+)/gm,
                '<span class="keyword">new</span> <span class="init">$1</span>'
              )
              .replace(
                /\b(function|new|throw|return|var|if|else)\b/gm,
                '<span class="keyword">$1</span>'
              );
          }

          /**
           * Highlight the contents of tag `name`.
           *
           * @api private
           * @param {string} name
           */
          exports.highlightTags = function (name) {
            var code = document
              .getElementById("mocha")
              .getElementsByTagName(name);
            for (var i = 0, len = code.length; i < len; ++i) {
              code[i].innerHTML = highlight(code[i].innerHTML);
            }
          };

          /**
           * If a value could have properties, and has none, this function is called,
           * which returns a string representation of the empty value.
           *
           * Functions w/ no properties return `'[Function]'`
           * Arrays w/ length === 0 return `'[]'`
           * Objects w/ no properties return `'{}'`
           * All else: return result of `value.toString()`
           *
           * @api private
           * @param {*} value The value to inspect.
           * @param {string} typeHint The type of the value
           * @returns {string}
           */
          function emptyRepresentation(value, typeHint) {
            switch (typeHint) {
              case "function":
                return "[Function]";
              case "object":
                return "{}";
              case "array":
                return "[]";
              default:
                return value.toString();
            }
          }

          /**
           * Takes some variable and asks `Object.prototype.toString()` what it thinks it
           * is.
           *
           * @api private
           * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
           * @param {*} value The value to test.
           * @returns {string} Computed type
           * @example
           * type({}) // 'object'
           * type([]) // 'array'
           * type(1) // 'number'
           * type(false) // 'boolean'
           * type(Infinity) // 'number'
           * type(null) // 'null'
           * type(new Date()) // 'date'
           * type(/foo/) // 'regexp'
           * type('type') // 'string'
           * type(global) // 'global'
           * type(new String('foo') // 'object'
           */
          var type = (exports.type = function type(value) {
            if (value === undefined) {
              return "undefined";
            } else if (value === null) {
              return "null";
            } else if (
              typeof Buffer !== "undefined" &&
              Buffer.isBuffer(value)
            ) {
              return "buffer";
            }
            return Object.prototype.toString
              .call(value)
              .replace(/^\[.+\s(.+?)\]$/, "$1")
              .toLowerCase();
          });

          /**
           * Stringify `value`. Different behavior depending on type of value:
           *
           * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.
           * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.
           * - If `value` is an *empty* object, function, or array, return result of function
           *   {@link emptyRepresentation}.
           * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of
           *   JSON.stringify().
           *
           * @api private
           * @see exports.type
           * @param {*} value
           * @return {string}
           */
          exports.stringify = function (value) {
            var typeHint = type(value);

            if (!~indexOf(["object", "array", "function"], typeHint)) {
              if (typeHint === "buffer") {
                var json = value.toJSON();
                // Based on the toJSON result
                return jsonStringify(
                  json.data && json.type ? json.data : json,
                  2
                ).replace(/,(\n|$)/g, "$1");
              }

              // IE7/IE8 has a bizarre String constructor; needs to be coerced
              // into an array and back to obj.
              if (typeHint === "string" && typeof value === "object") {
                value = reduce(
                  value.split(""),
                  function (acc, char, idx) {
                    acc[idx] = char;
                    return acc;
                  },
                  {}
                );
                typeHint = "object";
              } else {
                return jsonStringify(value);
              }
            }

            for (var prop in value) {
              if (Object.prototype.hasOwnProperty.call(value, prop)) {
                return jsonStringify(
                  exports.canonicalize(value, null, typeHint),
                  2
                ).replace(/,(\n|$)/g, "$1");
              }
            }

            return emptyRepresentation(value, typeHint);
          };

          /**
           * like JSON.stringify but more sense.
           *
           * @api private
           * @param {Object}  object
           * @param {number=} spaces
           * @param {number=} depth
           * @returns {*}
           */
          function jsonStringify(object, spaces, depth) {
            if (typeof spaces === "undefined") {
              // primitive types
              return _stringify(object);
            }

            depth = depth || 1;
            var space = spaces * depth;
            var str = isArray(object) ? "[" : "{";
            var end = isArray(object) ? "]" : "}";
            var length =
              typeof object.length === "number"
                ? object.length
                : exports.keys(object).length;
            // `.repeat()` polyfill
            function repeat(s, n) {
              return new Array(n).join(s);
            }

            function _stringify(val) {
              switch (type(val)) {
                case "null":
                case "undefined":
                  val = "[" + val + "]";
                  break;
                case "array":
                case "object":
                  val = jsonStringify(val, spaces, depth + 1);
                  break;
                case "boolean":
                case "regexp":
                case "symbol":
                case "number":
                  val =
                    val === 0 && 1 / val === -Infinity // `-0`
                      ? "-0"
                      : val.toString();
                  break;
                case "date":
                  var sDate;
                  if (isNaN(val.getTime())) {
                    // Invalid date
                    sDate = val.toString();
                  } else {
                    sDate = val.toISOString
                      ? val.toISOString()
                      : toISOString(val);
                  }
                  val = "[Date: " + sDate + "]";
                  break;
                case "buffer":
                  var json = val.toJSON();
                  // Based on the toJSON result
                  json = json.data && json.type ? json.data : json;
                  val = "[Buffer: " + jsonStringify(json, 2, depth + 1) + "]";
                  break;
                default:
                  val =
                    val === "[Function]" || val === "[Circular]"
                      ? val
                      : JSON.stringify(val); // string
              }
              return val;
            }

            for (var i in object) {
              if (!Object.prototype.hasOwnProperty.call(object, i)) {
                continue; // not my business
              }
              --length;
              str +=
                "\n " +
                repeat(" ", space) +
                (isArray(object) ? "" : '"' + i + '": ') + // key
                _stringify(object[i]) + // value
                (length ? "," : ""); // comma
            }

            return (
              str +
              // [], {}
              (str.length !== 1 ? "\n" + repeat(" ", --space) + end : end)
            );
          }

          /**
           * Test if a value is a buffer.
           *
           * @api private
           * @param {*} value The value to test.
           * @return {boolean} True if `value` is a buffer, otherwise false
           */
          exports.isBuffer = function (value) {
            return typeof Buffer !== "undefined" && Buffer.isBuffer(value);
          };

          /**
           * Return a new Thing that has the keys in sorted order. Recursive.
           *
           * If the Thing...
           * - has already been seen, return string `'[Circular]'`
           * - is `undefined`, return string `'[undefined]'`
           * - is `null`, return value `null`
           * - is some other primitive, return the value
           * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method
           * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.
           * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`
           *
           * @api private
           * @see {@link exports.stringify}
           * @param {*} value Thing to inspect.  May or may not have properties.
           * @param {Array} [stack=[]] Stack of seen values
           * @param {string} [typeHint] Type hint
           * @return {(Object|Array|Function|string|undefined)}
           */
          exports.canonicalize = function canonicalize(value, stack, typeHint) {
            var canonicalizedObj;
            /* eslint-disable no-unused-vars */
            var prop;
            /* eslint-enable no-unused-vars */
            typeHint = typeHint || type(value);

            function withStack(value, fn) {
              stack.push(value);
              fn();
              stack.pop();
            }

            stack = stack || [];

            if (indexOf(stack, value) !== -1) {
              return "[Circular]";
            }

            switch (typeHint) {
              case "undefined":
              case "buffer":
              case "null":
                canonicalizedObj = value;
                break;
              case "array":
                withStack(value, function () {
                  canonicalizedObj = exports.map(value, function (item) {
                    return exports.canonicalize(item, stack);
                  });
                });
                break;
              case "function":
                /* eslint-disable guard-for-in */
                for (prop in value) {
                  canonicalizedObj = {};
                  break;
                }
                /* eslint-enable guard-for-in */
                if (!canonicalizedObj) {
                  canonicalizedObj = emptyRepresentation(value, typeHint);
                  break;
                }
              /* falls through */
              case "object":
                canonicalizedObj = canonicalizedObj || {};
                withStack(value, function () {
                  exports.forEach(exports.keys(value).sort(), function (key) {
                    canonicalizedObj[key] = exports.canonicalize(
                      value[key],
                      stack
                    );
                  });
                });
                break;
              case "date":
              case "number":
              case "regexp":
              case "boolean":
              case "symbol":
                canonicalizedObj = value;
                break;
              default:
                canonicalizedObj = value + "";
            }

            return canonicalizedObj;
          };

          /**
           * Lookup file names at the given `path`.
           *
           * @api public
           * @param {string} path Base path to start searching from.
           * @param {string[]} extensions File extensions to look for.
           * @param {boolean} recursive Whether or not to recurse into subdirectories.
           * @return {string[]} An array of paths.
           */
          exports.lookupFiles = function lookupFiles(
            path,
            extensions,
            recursive
          ) {
            var files = [];
            var re = new RegExp("\\.(" + extensions.join("|") + ")$");

            if (!exists(path)) {
              if (exists(path + ".js")) {
                path += ".js";
              } else {
                files = glob.sync(path);
                if (!files.length) {
                  throw new Error(
                    "cannot resolve path (or pattern) '" + path + "'"
                  );
                }
                return files;
              }
            }

            try {
              var stat = statSync(path);
              if (stat.isFile()) {
                return path;
              }
            } catch (err) {
              // ignore error
              return;
            }

            readdirSync(path).forEach(function (file) {
              file = join(path, file);
              try {
                var stat = statSync(file);
                if (stat.isDirectory()) {
                  if (recursive) {
                    files = files.concat(
                      lookupFiles(file, extensions, recursive)
                    );
                  }
                  return;
                }
              } catch (err) {
                // ignore error
                return;
              }
              if (
                !stat.isFile() ||
                !re.test(file) ||
                basename(file)[0] === "."
              ) {
                return;
              }
              files.push(file);
            });

            return files;
          };

          /**
           * Generate an undefined error with a message warning the user.
           *
           * @return {Error}
           */

          exports.undefinedError = function () {
            return new Error(
              "Caught undefined error, did you throw without specifying what?"
            );
          };

          /**
           * Generate an undefined error if `err` is not defined.
           *
           * @param {Error} err
           * @return {Error}
           */

          exports.getError = function (err) {
            return err || exports.undefinedError();
          };

          /**
           * @summary
           * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)
           * @description
           * When invoking this function you get a filter function that get the Error.stack as an input,
           * and return a prettify output.
           * (i.e: strip Mocha and internal node functions from stack trace).
           * @returns {Function}
           */
          exports.stackTraceFilter = function () {
            // TODO: Replace with `process.browser`
            var is =
              typeof document === "undefined"
                ? {
                    node: true,
                  }
                : {
                    browser: true,
                  };
            var slash = path.sep;
            var cwd;
            if (is.node) {
              cwd = process.cwd() + slash;
            } else {
              cwd = (
                typeof location === "undefined" ? window.location : location
              ).href.replace(/\/[^\/]*$/, "/");
              slash = "/";
            }

            function isMochaInternal(line) {
              return (
                ~line.indexOf("node_modules" + slash + "mocha" + slash) ||
                ~line.indexOf("node_modules" + slash + "mocha.js") ||
                ~line.indexOf("bower_components" + slash + "mocha.js") ||
                ~line.indexOf(slash + "mocha.js")
              );
            }

            function isNodeInternal(line) {
              return (
                ~line.indexOf("(timers.js:") ||
                ~line.indexOf("(events.js:") ||
                ~line.indexOf("(node.js:") ||
                ~line.indexOf("(module.js:") ||
                ~line.indexOf("GeneratorFunctionPrototype.next (native)") ||
                false
              );
            }

            return function (stack) {
              stack = stack.split("\n");

              stack = reduce(
                stack,
                function (list, line) {
                  if (isMochaInternal(line)) {
                    return list;
                  }

                  if (is.node && isNodeInternal(line)) {
                    return list;
                  }

                  // Clean up cwd(absolute)
                  if (/\(?.+:\d+:\d+\)?$/.test(line)) {
                    line = line.replace(cwd, "");
                  }

                  list.push(line);
                  return list;
                },
                []
              );

              return stack.join("\n");
            };
          };

          /**
           * Crude, but effective.
           * @api
           * @param {*} value
           * @returns {boolean} Whether or not `value` is a Promise
           */
          exports.isPromise = function isPromise(value) {
            return (
              typeof value === "object" && typeof value.then === "function"
            );
          };

          /**
           * It's a noop.
           * @api
           */
          exports.noop = function () {};
        }.call(this, require("_process"), require("buffer").Buffer));
      },
      {
        "./to-iso-string": 37,
        _process: 67,
        buffer: 44,
        debug: 2,
        fs: 42,
        glob: 42,
        json3: 54,
        path: 42,
        util: 84,
      },
    ],
    39: [
      function (require, module, exports) {
        "use strict";

        exports.byteLength = byteLength;
        exports.toByteArray = toByteArray;
        exports.fromByteArray = fromByteArray;

        var lookup = [];
        var revLookup = [];
        var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

        var code =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i];
          revLookup[code.charCodeAt(i)] = i;
        }

        revLookup["-".charCodeAt(0)] = 62;
        revLookup["_".charCodeAt(0)] = 63;

        function placeHoldersCount(b64) {
          var len = b64.length;
          if (len % 4 > 0) {
            throw new Error("Invalid string. Length must be a multiple of 4");
          }

          // the number of equal signs (place holders)
          // if there are two placeholders, than the two characters before it
          // represent one byte
          // if there is only one, then the three characters before it represent 2 bytes
          // this is just a cheap hack to not do indexOf twice
          return b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
        }

        function byteLength(b64) {
          // base64 is 4/3 + up to two characters of the original data
          return (b64.length * 3) / 4 - placeHoldersCount(b64);
        }

        function toByteArray(b64) {
          var i, j, l, tmp, placeHolders, arr;
          var len = b64.length;
          placeHolders = placeHoldersCount(b64);

          arr = new Arr((len * 3) / 4 - placeHolders);

          // if there are placeholders, only get up to the last complete 4 chars
          l = placeHolders > 0 ? len - 4 : len;

          var L = 0;

          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 18) |
              (revLookup[b64.charCodeAt(i + 1)] << 12) |
              (revLookup[b64.charCodeAt(i + 2)] << 6) |
              revLookup[b64.charCodeAt(i + 3)];
            arr[L++] = (tmp >> 16) & 0xff;
            arr[L++] = (tmp >> 8) & 0xff;
            arr[L++] = tmp & 0xff;
          }

          if (placeHolders === 2) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 2) |
              (revLookup[b64.charCodeAt(i + 1)] >> 4);
            arr[L++] = tmp & 0xff;
          } else if (placeHolders === 1) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 10) |
              (revLookup[b64.charCodeAt(i + 1)] << 4) |
              (revLookup[b64.charCodeAt(i + 2)] >> 2);
            arr[L++] = (tmp >> 8) & 0xff;
            arr[L++] = tmp & 0xff;
          }

          return arr;
        }

        function tripletToBase64(num) {
          return (
            lookup[(num >> 18) & 0x3f] +
            lookup[(num >> 12) & 0x3f] +
            lookup[(num >> 6) & 0x3f] +
            lookup[num & 0x3f]
          );
        }

        function encodeChunk(uint8, start, end) {
          var tmp;
          var output = [];
          for (var i = start; i < end; i += 3) {
            tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output.push(tripletToBase64(tmp));
          }
          return output.join("");
        }

        function fromByteArray(uint8) {
          var tmp;
          var len = uint8.length;
          var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
          var output = "";
          var parts = [];
          var maxChunkLength = 16383; // must be multiple of 3

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (
            var i = 0, len2 = len - extraBytes;
            i < len2;
            i += maxChunkLength
          ) {
            parts.push(
              encodeChunk(
                uint8,
                i,
                i + maxChunkLength > len2 ? len2 : i + maxChunkLength
              )
            );
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          if (extraBytes === 1) {
            tmp = uint8[len - 1];
            output += lookup[tmp >> 2];
            output += lookup[(tmp << 4) & 0x3f];
            output += "==";
          } else if (extraBytes === 2) {
            tmp = (uint8[len - 2] << 8) + uint8[len - 1];
            output += lookup[tmp >> 10];
            output += lookup[(tmp >> 4) & 0x3f];
            output += lookup[(tmp << 2) & 0x3f];
            output += "=";
          }

          parts.push(output);

          return parts.join("");
        }
      },
      {},
    ],
    40: [function (require, module, exports) {}, {}],
    41: [
      function (require, module, exports) {
        (function (process) {
          var WritableStream = require("stream").Writable;
          var inherits = require("util").inherits;

          module.exports = BrowserStdout;

          inherits(BrowserStdout, WritableStream);

          function BrowserStdout(opts) {
            if (!(this instanceof BrowserStdout))
              return new BrowserStdout(opts);

            opts = opts || {};
            WritableStream.call(this, opts);
            this.label = opts.label !== undefined ? opts.label : "stdout";
          }

          BrowserStdout.prototype._write = function (chunks, encoding, cb) {
            var output = chunks.toString ? chunks.toString() : chunks;
            if (this.label === false) {
              console.log(output);
            } else {
              console.log(this.label + ":", output);
            }
            process.nextTick(cb);
          };
        }.call(this, require("_process")));
      },
      {
        _process: 67,
        stream: 79,
        util: 84,
      },
    ],
    42: [
      function (require, module, exports) {
        arguments[4][40][0].apply(exports, arguments);
      },
      {
        dup: 40,
      },
    ],
    43: [
      function (require, module, exports) {
        (function (global) {
          "use strict";

          var buffer = require("buffer");
          var Buffer = buffer.Buffer;
          var SlowBuffer = buffer.SlowBuffer;
          var MAX_LEN = buffer.kMaxLength || 2147483647;
          exports.alloc = function alloc(size, fill, encoding) {
            if (typeof Buffer.alloc === "function") {
              return Buffer.alloc(size, fill, encoding);
            }
            if (typeof encoding === "number") {
              throw new TypeError("encoding must not be number");
            }
            if (typeof size !== "number") {
              throw new TypeError("size must be a number");
            }
            if (size > MAX_LEN) {
              throw new RangeError("size is too large");
            }
            var enc = encoding;
            var _fill = fill;
            if (_fill === undefined) {
              enc = undefined;
              _fill = 0;
            }
            var buf = new Buffer(size);
            if (typeof _fill === "string") {
              var fillBuf = new Buffer(_fill, enc);
              var flen = fillBuf.length;
              var i = -1;
              while (++i < size) {
                buf[i] = fillBuf[i % flen];
              }
            } else {
              buf.fill(_fill);
            }
            return buf;
          };
          exports.allocUnsafe = function allocUnsafe(size) {
            if (typeof Buffer.allocUnsafe === "function") {
              return Buffer.allocUnsafe(size);
            }
            if (typeof size !== "number") {
              throw new TypeError("size must be a number");
            }
            if (size > MAX_LEN) {
              throw new RangeError("size is too large");
            }
            return new Buffer(size);
          };
          exports.from = function from(value, encodingOrOffset, length) {
            if (
              typeof Buffer.from === "function" &&
              (!global.Uint8Array || Uint8Array.from !== Buffer.from)
            ) {
              return Buffer.from(value, encodingOrOffset, length);
            }
            if (typeof value === "number") {
              throw new TypeError('"value" argument must not be a number');
            }
            if (typeof value === "string") {
              return new Buffer(value, encodingOrOffset);
            }
            if (
              typeof ArrayBuffer !== "undefined" &&
              value instanceof ArrayBuffer
            ) {
              var offset = encodingOrOffset;
              if (arguments.length === 1) {
                return new Buffer(value);
              }
              if (typeof offset === "undefined") {
                offset = 0;
              }
              var len = length;
              if (typeof len === "undefined") {
                len = value.byteLength - offset;
              }
              if (offset >= value.byteLength) {
                throw new RangeError("'offset' is out of bounds");
              }
              if (len > value.byteLength - offset) {
                throw new RangeError("'length' is out of bounds");
              }
              return new Buffer(value.slice(offset, offset + len));
            }
            if (Buffer.isBuffer(value)) {
              var out = new Buffer(value.length);
              value.copy(out, 0, 0, value.length);
              return out;
            }
            if (value) {
              if (
                Array.isArray(value) ||
                (typeof ArrayBuffer !== "undefined" &&
                  value.buffer instanceof ArrayBuffer) ||
                "length" in value
              ) {
                return new Buffer(value);
              }
              if (value.type === "Buffer" && Array.isArray(value.data)) {
                return new Buffer(value.data);
              }
            }

            throw new TypeError(
              "First argument must be a string, Buffer, " +
                "ArrayBuffer, Array, or array-like object."
            );
          };
          exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
            if (typeof Buffer.allocUnsafeSlow === "function") {
              return Buffer.allocUnsafeSlow(size);
            }
            if (typeof size !== "number") {
              throw new TypeError("size must be a number");
            }
            if (size >= MAX_LEN) {
              throw new RangeError("size is too large");
            }
            return new SlowBuffer(size);
          };
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        buffer: 44,
      },
    ],
    44: [
      function (require, module, exports) {
        (function (global) {
          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
           * @license  MIT
           */
          /* eslint-disable no-proto */

          "use strict";

          var base64 = require("base64-js");
          var ieee754 = require("ieee754");
          var isArray = require("isarray");

          exports.Buffer = Buffer;
          exports.SlowBuffer = SlowBuffer;
          exports.INSPECT_MAX_BYTES = 50;

          /**
       * If `Buffer.TYPED_ARRAY_SUPPORT`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (most compatible, even IE6)
       *
       * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
       * Opera 11.6+, iOS 4.2+.
       *
       * Due to various browser bugs, sometimes the Object implementation will be used even
       * when the browser supports typed arrays.
       *
       * Note:
       *
       *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
       *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
       *
       *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
       *
       *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
       *     incorrect length in some situations.

       * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
       * get the Object implementation, which is slower but behaves correctly.
       */
          Buffer.TYPED_ARRAY_SUPPORT =
            global.TYPED_ARRAY_SUPPORT !== undefined
              ? global.TYPED_ARRAY_SUPPORT
              : typedArraySupport();

          /*
           * Export kMaxLength after typed array support is determined.
           */
          exports.kMaxLength = kMaxLength();

          function typedArraySupport() {
            try {
              var arr = new Uint8Array(1);
              arr.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function () {
                  return 42;
                },
              };
              return (
                arr.foo() === 42 && // typed array instances can be augmented
                typeof arr.subarray === "function" && // chrome 9-10 lack `subarray`
                arr.subarray(1, 1).byteLength === 0
              ); // ie10 has broken `subarray`
            } catch (e) {
              return false;
            }
          }

          function kMaxLength() {
            return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
          }

          function createBuffer(that, length) {
            if (kMaxLength() < length) {
              throw new RangeError("Invalid typed array length");
            }
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              // Return an augmented `Uint8Array` instance, for best performance
              that = new Uint8Array(length);
              that.__proto__ = Buffer.prototype;
            } else {
              // Fallback: Return an object instance of the Buffer class
              if (that === null) {
                that = new Buffer(length);
              }
              that.length = length;
            }

            return that;
          }

          /**
           * The Buffer constructor returns instances of `Uint8Array` that have their
           * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
           * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
           * and the `Uint8Array` methods. Square bracket notation works as expected -- it
           * returns a single octet.
           *
           * The `Uint8Array` prototype remains unmodified.
           */

          function Buffer(arg, encodingOrOffset, length) {
            if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
              return new Buffer(arg, encodingOrOffset, length);
            }

            // Common case.
            if (typeof arg === "number") {
              if (typeof encodingOrOffset === "string") {
                throw new Error(
                  "If encoding is specified then the first argument must be a string"
                );
              }
              return allocUnsafe(this, arg);
            }
            return from(this, arg, encodingOrOffset, length);
          }

          Buffer.poolSize = 8192; // not used by this implementation

          // TODO: Legacy, not needed anymore. Remove in next major version.
          Buffer._augment = function (arr) {
            arr.__proto__ = Buffer.prototype;
            return arr;
          };

          function from(that, value, encodingOrOffset, length) {
            if (typeof value === "number") {
              throw new TypeError('"value" argument must not be a number');
            }

            if (
              typeof ArrayBuffer !== "undefined" &&
              value instanceof ArrayBuffer
            ) {
              return fromArrayBuffer(that, value, encodingOrOffset, length);
            }

            if (typeof value === "string") {
              return fromString(that, value, encodingOrOffset);
            }

            return fromObject(that, value);
          }

          /**
           * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
           * if value is a number.
           * Buffer.from(str[, encoding])
           * Buffer.from(array)
           * Buffer.from(buffer)
           * Buffer.from(arrayBuffer[, byteOffset[, length]])
           **/
          Buffer.from = function (value, encodingOrOffset, length) {
            return from(null, value, encodingOrOffset, length);
          };

          if (Buffer.TYPED_ARRAY_SUPPORT) {
            Buffer.prototype.__proto__ = Uint8Array.prototype;
            Buffer.__proto__ = Uint8Array;
            if (
              typeof Symbol !== "undefined" &&
              Symbol.species &&
              Buffer[Symbol.species] === Buffer
            ) {
              // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
              Object.defineProperty(Buffer, Symbol.species, {
                value: null,
                configurable: true,
              });
            }
          }

          function assertSize(size) {
            if (typeof size !== "number") {
              throw new TypeError('"size" argument must be a number');
            } else if (size < 0) {
              throw new RangeError('"size" argument must not be negative');
            }
          }

          function alloc(that, size, fill, encoding) {
            assertSize(size);
            if (size <= 0) {
              return createBuffer(that, size);
            }
            if (fill !== undefined) {
              // Only pay attention to encoding if it's a string. This
              // prevents accidentally sending in a number that would
              // be interpretted as a start offset.
              return typeof encoding === "string"
                ? createBuffer(that, size).fill(fill, encoding)
                : createBuffer(that, size).fill(fill);
            }
            return createBuffer(that, size);
          }

          /**
           * Creates a new filled Buffer instance.
           * alloc(size[, fill[, encoding]])
           **/
          Buffer.alloc = function (size, fill, encoding) {
            return alloc(null, size, fill, encoding);
          };

          function allocUnsafe(that, size) {
            assertSize(size);
            that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
            if (!Buffer.TYPED_ARRAY_SUPPORT) {
              for (var i = 0; i < size; ++i) {
                that[i] = 0;
              }
            }
            return that;
          }

          /**
           * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
           * */
          Buffer.allocUnsafe = function (size) {
            return allocUnsafe(null, size);
          };
          /**
           * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
           */
          Buffer.allocUnsafeSlow = function (size) {
            return allocUnsafe(null, size);
          };

          function fromString(that, string, encoding) {
            if (typeof encoding !== "string" || encoding === "") {
              encoding = "utf8";
            }

            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError('"encoding" must be a valid string encoding');
            }

            var length = byteLength(string, encoding) | 0;
            that = createBuffer(that, length);

            var actual = that.write(string, encoding);

            if (actual !== length) {
              // Writing a hex string, for example, that contains invalid characters will
              // cause everything after the first invalid character to be ignored. (e.g.
              // 'abxxcd' will be treated as 'ab')
              that = that.slice(0, actual);
            }

            return that;
          }

          function fromArrayLike(that, array) {
            var length = array.length < 0 ? 0 : checked(array.length) | 0;
            that = createBuffer(that, length);
            for (var i = 0; i < length; i += 1) {
              that[i] = array[i] & 255;
            }
            return that;
          }

          function fromArrayBuffer(that, array, byteOffset, length) {
            array.byteLength; // this throws if `array` is not a valid ArrayBuffer

            if (byteOffset < 0 || array.byteLength < byteOffset) {
              throw new RangeError("'offset' is out of bounds");
            }

            if (array.byteLength < byteOffset + (length || 0)) {
              throw new RangeError("'length' is out of bounds");
            }

            if (byteOffset === undefined && length === undefined) {
              array = new Uint8Array(array);
            } else if (length === undefined) {
              array = new Uint8Array(array, byteOffset);
            } else {
              array = new Uint8Array(array, byteOffset, length);
            }

            if (Buffer.TYPED_ARRAY_SUPPORT) {
              // Return an augmented `Uint8Array` instance, for best performance
              that = array;
              that.__proto__ = Buffer.prototype;
            } else {
              // Fallback: Return an object instance of the Buffer class
              that = fromArrayLike(that, array);
            }
            return that;
          }

          function fromObject(that, obj) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0;
              that = createBuffer(that, len);

              if (that.length === 0) {
                return that;
              }

              obj.copy(that, 0, 0, len);
              return that;
            }

            if (obj) {
              if (
                (typeof ArrayBuffer !== "undefined" &&
                  obj.buffer instanceof ArrayBuffer) ||
                "length" in obj
              ) {
                if (typeof obj.length !== "number" || isnan(obj.length)) {
                  return createBuffer(that, 0);
                }
                return fromArrayLike(that, obj);
              }

              if (obj.type === "Buffer" && isArray(obj.data)) {
                return fromArrayLike(that, obj.data);
              }
            }

            throw new TypeError(
              "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
            );
          }

          function checked(length) {
            // Note: cannot use `length < kMaxLength()` here because that fails when
            // length is NaN (which is otherwise coerced to zero.)
            if (length >= kMaxLength()) {
              throw new RangeError(
                "Attempt to allocate Buffer larger than maximum " +
                  "size: 0x" +
                  kMaxLength().toString(16) +
                  " bytes"
              );
            }
            return length | 0;
          }

          function SlowBuffer(length) {
            if (+length != length) {
              // eslint-disable-line eqeqeq
              length = 0;
            }
            return Buffer.alloc(+length);
          }

          Buffer.isBuffer = function isBuffer(b) {
            return !!(b != null && b._isBuffer);
          };

          Buffer.compare = function compare(a, b) {
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError("Arguments must be Buffers");
            }

            if (a === b) return 0;

            var x = a.length;
            var y = b.length;

            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          };

          Buffer.concat = function concat(list, length) {
            if (!isArray(list)) {
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            }

            if (list.length === 0) {
              return Buffer.alloc(0);
            }

            var i;
            if (length === undefined) {
              length = 0;
              for (i = 0; i < list.length; ++i) {
                length += list[i].length;
              }
            }

            var buffer = Buffer.allocUnsafe(length);
            var pos = 0;
            for (i = 0; i < list.length; ++i) {
              var buf = list[i];
              if (!Buffer.isBuffer(buf)) {
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              }
              buf.copy(buffer, pos);
              pos += buf.length;
            }
            return buffer;
          };

          function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) {
              return string.length;
            }
            if (
              typeof ArrayBuffer !== "undefined" &&
              typeof ArrayBuffer.isView === "function" &&
              (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
            ) {
              return string.byteLength;
            }
            if (typeof string !== "string") {
              string = "" + string;
            }

            var len = string.length;
            if (len === 0) return 0;

            // Use a for loop to avoid recursion
            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case "ascii":
                case "latin1":
                case "binary":
                  return len;
                case "utf8":
                case "utf-8":
                case undefined:
                  return utf8ToBytes(string).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return len * 2;
                case "hex":
                  return len >>> 1;
                case "base64":
                  return base64ToBytes(string).length;
                default:
                  if (loweredCase) return utf8ToBytes(string).length; // assume utf8
                  encoding = ("" + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          }
          Buffer.byteLength = byteLength;

          function slowToString(encoding, start, end) {
            var loweredCase = false;

            // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
            // property of a typed array.

            // This behaves neither like String nor Uint8Array in that we set start/end
            // to their upper/lower bounds if the value passed is out of range.
            // undefined is handled specially as per ECMA-262 6th Edition,
            // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
            if (start === undefined || start < 0) {
              start = 0;
            }
            // Return early if start > this.length. Done here to prevent potential uint32
            // coercion fail below.
            if (start > this.length) {
              return "";
            }

            if (end === undefined || end > this.length) {
              end = this.length;
            }

            if (end <= 0) {
              return "";
            }

            // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
            end >>>= 0;
            start >>>= 0;

            if (end <= start) {
              return "";
            }

            if (!encoding) encoding = "utf8";

            while (true) {
              switch (encoding) {
                case "hex":
                  return hexSlice(this, start, end);

                case "utf8":
                case "utf-8":
                  return utf8Slice(this, start, end);

                case "ascii":
                  return asciiSlice(this, start, end);

                case "latin1":
                case "binary":
                  return latin1Slice(this, start, end);

                case "base64":
                  return base64Slice(this, start, end);

                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return utf16leSlice(this, start, end);

                default:
                  if (loweredCase)
                    throw new TypeError("Unknown encoding: " + encoding);
                  encoding = (encoding + "").toLowerCase();
                  loweredCase = true;
              }
            }
          }

          // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
          // Buffer instances.
          Buffer.prototype._isBuffer = true;

          function swap(b, n, m) {
            var i = b[n];
            b[n] = b[m];
            b[m] = i;
          }

          Buffer.prototype.swap16 = function swap16() {
            var len = this.length;
            if (len % 2 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            }
            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1);
            }
            return this;
          };

          Buffer.prototype.swap32 = function swap32() {
            var len = this.length;
            if (len % 4 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            }
            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3);
              swap(this, i + 1, i + 2);
            }
            return this;
          };

          Buffer.prototype.swap64 = function swap64() {
            var len = this.length;
            if (len % 8 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            }
            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7);
              swap(this, i + 1, i + 6);
              swap(this, i + 2, i + 5);
              swap(this, i + 3, i + 4);
            }
            return this;
          };

          Buffer.prototype.toString = function toString() {
            var length = this.length | 0;
            if (length === 0) return "";
            if (arguments.length === 0) return utf8Slice(this, 0, length);
            return slowToString.apply(this, arguments);
          };

          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b))
              throw new TypeError("Argument must be a Buffer");
            if (this === b) return true;
            return Buffer.compare(this, b) === 0;
          };

          Buffer.prototype.inspect = function inspect() {
            var str = "";
            var max = exports.INSPECT_MAX_BYTES;
            if (this.length > 0) {
              str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
              if (this.length > max) str += " ... ";
            }
            return "<Buffer " + str + ">";
          };

          Buffer.prototype.compare = function compare(
            target,
            start,
            end,
            thisStart,
            thisEnd
          ) {
            if (!Buffer.isBuffer(target)) {
              throw new TypeError("Argument must be a Buffer");
            }

            if (start === undefined) {
              start = 0;
            }
            if (end === undefined) {
              end = target ? target.length : 0;
            }
            if (thisStart === undefined) {
              thisStart = 0;
            }
            if (thisEnd === undefined) {
              thisEnd = this.length;
            }

            if (
              start < 0 ||
              end > target.length ||
              thisStart < 0 ||
              thisEnd > this.length
            ) {
              throw new RangeError("out of range index");
            }

            if (thisStart >= thisEnd && start >= end) {
              return 0;
            }
            if (thisStart >= thisEnd) {
              return -1;
            }
            if (start >= end) {
              return 1;
            }

            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;

            if (this === target) return 0;

            var x = thisEnd - thisStart;
            var y = end - start;
            var len = Math.min(x, y);

            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);

            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i];
                y = targetCopy[i];
                break;
              }
            }

            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };

          // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
          // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
          //
          // Arguments:
          // - buffer - a Buffer to search
          // - val - a string, Buffer, or number
          // - byteOffset - an index into `buffer`; will be clamped to an int32
          // - encoding - an optional encoding, relevant is val is a string
          // - dir - true for indexOf, false for lastIndexOf
          function bidirectionalIndexOf(
            buffer,
            val,
            byteOffset,
            encoding,
            dir
          ) {
            // Empty buffer means no match
            if (buffer.length === 0) return -1;

            // Normalize byteOffset
            if (typeof byteOffset === "string") {
              encoding = byteOffset;
              byteOffset = 0;
            } else if (byteOffset > 0x7fffffff) {
              byteOffset = 0x7fffffff;
            } else if (byteOffset < -0x80000000) {
              byteOffset = -0x80000000;
            }
            byteOffset = +byteOffset; // Coerce to Number.
            if (isNaN(byteOffset)) {
              // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
              byteOffset = dir ? 0 : buffer.length - 1;
            }

            // Normalize byteOffset: negative offsets start from the end of the buffer
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
            if (byteOffset >= buffer.length) {
              if (dir) return -1;
              else byteOffset = buffer.length - 1;
            } else if (byteOffset < 0) {
              if (dir) byteOffset = 0;
              else return -1;
            }

            // Normalize val
            if (typeof val === "string") {
              val = Buffer.from(val, encoding);
            }

            // Finally, search either indexOf (if dir is true) or lastIndexOf
            if (Buffer.isBuffer(val)) {
              // Special case: looking for empty string/buffer always fails
              if (val.length === 0) {
                return -1;
              }
              return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            } else if (typeof val === "number") {
              val = val & 0xff; // Search for a byte value [0-255]
              if (
                Buffer.TYPED_ARRAY_SUPPORT &&
                typeof Uint8Array.prototype.indexOf === "function"
              ) {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(
                    buffer,
                    val,
                    byteOffset
                  );
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(
                    buffer,
                    val,
                    byteOffset
                  );
                }
              }
              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
            }

            throw new TypeError("val must be string, number or Buffer");
          }

          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;

            if (encoding !== undefined) {
              encoding = String(encoding).toLowerCase();
              if (
                encoding === "ucs2" ||
                encoding === "ucs-2" ||
                encoding === "utf16le" ||
                encoding === "utf-16le"
              ) {
                if (arr.length < 2 || val.length < 2) {
                  return -1;
                }
                indexSize = 2;
                arrLength /= 2;
                valLength /= 2;
                byteOffset /= 2;
              }
            }

            function read(buf, i) {
              if (indexSize === 1) {
                return buf[i];
              } else {
                return buf.readUInt16BE(i * indexSize);
              }
            }

            var i;
            if (dir) {
              var foundIndex = -1;
              for (i = byteOffset; i < arrLength; i++) {
                if (
                  read(arr, i) ===
                  read(val, foundIndex === -1 ? 0 : i - foundIndex)
                ) {
                  if (foundIndex === -1) foundIndex = i;
                  if (i - foundIndex + 1 === valLength)
                    return foundIndex * indexSize;
                } else {
                  if (foundIndex !== -1) i -= i - foundIndex;
                  foundIndex = -1;
                }
              }
            } else {
              if (byteOffset + valLength > arrLength)
                byteOffset = arrLength - valLength;
              for (i = byteOffset; i >= 0; i--) {
                var found = true;
                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                  }
                }
                if (found) return i;
              }
            }

            return -1;
          }

          Buffer.prototype.includes = function includes(
            val,
            byteOffset,
            encoding
          ) {
            return this.indexOf(val, byteOffset, encoding) !== -1;
          };

          Buffer.prototype.indexOf = function indexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
          };

          Buffer.prototype.lastIndexOf = function lastIndexOf(
            val,
            byteOffset,
            encoding
          ) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
          };

          function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;
            if (!length) {
              length = remaining;
            } else {
              length = Number(length);
              if (length > remaining) {
                length = remaining;
              }
            }

            // must be an even number of digits
            var strLen = string.length;
            if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");

            if (length > strLen / 2) {
              length = strLen / 2;
            }
            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string.substr(i * 2, 2), 16);
              if (isNaN(parsed)) return i;
              buf[offset + i] = parsed;
            }
            return i;
          }

          function utf8Write(buf, string, offset, length) {
            return blitBuffer(
              utf8ToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            );
          }

          function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length);
          }

          function latin1Write(buf, string, offset, length) {
            return asciiWrite(buf, string, offset, length);
          }

          function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length);
          }

          function ucs2Write(buf, string, offset, length) {
            return blitBuffer(
              utf16leToBytes(string, buf.length - offset),
              buf,
              offset,
              length
            );
          }

          Buffer.prototype.write = function write(
            string,
            offset,
            length,
            encoding
          ) {
            // Buffer#write(string)
            if (offset === undefined) {
              encoding = "utf8";
              length = this.length;
              offset = 0;
              // Buffer#write(string, encoding)
            } else if (length === undefined && typeof offset === "string") {
              encoding = offset;
              length = this.length;
              offset = 0;
              // Buffer#write(string, offset[, length][, encoding])
            } else if (isFinite(offset)) {
              offset = offset | 0;
              if (isFinite(length)) {
                length = length | 0;
                if (encoding === undefined) encoding = "utf8";
              } else {
                encoding = length;
                length = undefined;
              }
              // legacy write(string, encoding, offset, length) - remove in v0.13
            } else {
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            }

            var remaining = this.length - offset;
            if (length === undefined || length > remaining) length = remaining;

            if (
              (string.length > 0 && (length < 0 || offset < 0)) ||
              offset > this.length
            ) {
              throw new RangeError("Attempt to write outside buffer bounds");
            }

            if (!encoding) encoding = "utf8";

            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case "hex":
                  return hexWrite(this, string, offset, length);

                case "utf8":
                case "utf-8":
                  return utf8Write(this, string, offset, length);

                case "ascii":
                  return asciiWrite(this, string, offset, length);

                case "latin1":
                case "binary":
                  return latin1Write(this, string, offset, length);

                case "base64":
                  // Warning: maxLength not taken into account in base64Write
                  return base64Write(this, string, offset, length);

                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return ucs2Write(this, string, offset, length);

                default:
                  if (loweredCase)
                    throw new TypeError("Unknown encoding: " + encoding);
                  encoding = ("" + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          };

          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          };

          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf);
            } else {
              return base64.fromByteArray(buf.slice(start, end));
            }
          }

          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];

            var i = start;
            while (i < end) {
              var firstByte = buf[i];
              var codePoint = null;
              var bytesPerSequence =
                firstByte > 0xef
                  ? 4
                  : firstByte > 0xdf
                  ? 3
                  : firstByte > 0xbf
                  ? 2
                  : 1;

              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint;

                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 0x80) {
                      codePoint = firstByte;
                    }
                    break;
                  case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xc0) === 0x80) {
                      tempCodePoint =
                        ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f);
                      if (tempCodePoint > 0x7f) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0xc) |
                        ((secondByte & 0x3f) << 0x6) |
                        (thirdByte & 0x3f);
                      if (
                        tempCodePoint > 0x7ff &&
                        (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)
                      ) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if (
                      (secondByte & 0xc0) === 0x80 &&
                      (thirdByte & 0xc0) === 0x80 &&
                      (fourthByte & 0xc0) === 0x80
                    ) {
                      tempCodePoint =
                        ((firstByte & 0xf) << 0x12) |
                        ((secondByte & 0x3f) << 0xc) |
                        ((thirdByte & 0x3f) << 0x6) |
                        (fourthByte & 0x3f);
                      if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                        codePoint = tempCodePoint;
                      }
                    }
                }
              }

              if (codePoint === null) {
                // we did not generate a valid codePoint so insert a
                // replacement char (U+FFFD) and advance only 1 byte
                codePoint = 0xfffd;
                bytesPerSequence = 1;
              } else if (codePoint > 0xffff) {
                // encode to utf16 (surrogate pair dance)
                codePoint -= 0x10000;
                res.push(((codePoint >>> 10) & 0x3ff) | 0xd800);
                codePoint = 0xdc00 | (codePoint & 0x3ff);
              }

              res.push(codePoint);
              i += bytesPerSequence;
            }

            return decodeCodePointsArray(res);
          }

          // Based on http://stackoverflow.com/a/22747272/680742, the browser with
          // the lowest limit is Chrome, with 0x10000 args.
          // We go 1 magnitude less, for safety
          var MAX_ARGUMENTS_LENGTH = 0x1000;

          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;
            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
            }

            // Decode in chunks to avoid "call stack size exceeded".
            var res = "";
            var i = 0;
            while (i < len) {
              res += String.fromCharCode.apply(
                String,
                codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
              );
            }
            return res;
          }

          function asciiSlice(buf, start, end) {
            var ret = "";
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 0x7f);
            }
            return ret;
          }

          function latin1Slice(buf, start, end) {
            var ret = "";
            end = Math.min(buf.length, end);

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i]);
            }
            return ret;
          }

          function hexSlice(buf, start, end) {
            var len = buf.length;

            if (!start || start < 0) start = 0;
            if (!end || end < 0 || end > len) end = len;

            var out = "";
            for (var i = start; i < end; ++i) {
              out += toHex(buf[i]);
            }
            return out;
          }

          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = "";
            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
            }
            return res;
          }

          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === undefined ? len : ~~end;

            if (start < 0) {
              start += len;
              if (start < 0) start = 0;
            } else if (start > len) {
              start = len;
            }

            if (end < 0) {
              end += len;
              if (end < 0) end = 0;
            } else if (end > len) {
              end = len;
            }

            if (end < start) end = start;

            var newBuf;
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              newBuf = this.subarray(start, end);
              newBuf.__proto__ = Buffer.prototype;
            } else {
              var sliceLen = end - start;
              newBuf = new Buffer(sliceLen, undefined);
              for (var i = 0; i < sliceLen; ++i) {
                newBuf[i] = this[i + start];
              }
            }

            return newBuf;
          };

          /*
           * Need to make sure that buffer isn't trying to write out of bounds.
           */
          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0)
              throw new RangeError("offset is not uint");
            if (offset + ext > length)
              throw new RangeError("Trying to access beyond buffer length");
          }

          Buffer.prototype.readUIntLE = function readUIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }

            return val;
          };

          Buffer.prototype.readUIntBE = function readUIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) {
              checkOffset(offset, byteLength, this.length);
            }

            var val = this[offset + --byteLength];
            var mul = 1;
            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul;
            }

            return val;
          };

          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
          };

          Buffer.prototype.readUInt16LE = function readUInt16LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | (this[offset + 1] << 8);
          };

          Buffer.prototype.readUInt16BE = function readUInt16BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            return (this[offset] << 8) | this[offset + 1];
          };

          Buffer.prototype.readUInt32LE = function readUInt32LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              (this[offset] |
                (this[offset + 1] << 8) |
                (this[offset + 2] << 16)) +
              this[offset + 3] * 0x1000000
            );
          };

          Buffer.prototype.readUInt32BE = function readUInt32BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              this[offset] * 0x1000000 +
              ((this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                this[offset + 3])
            );
          };

          Buffer.prototype.readIntLE = function readIntLE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }
            mul *= 0x80;

            if (val >= mul) val -= Math.pow(2, 8 * byteLength);

            return val;
          };

          Buffer.prototype.readIntBE = function readIntBE(
            offset,
            byteLength,
            noAssert
          ) {
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            var i = byteLength;
            var mul = 1;
            var val = this[offset + --i];
            while (i > 0 && (mul *= 0x100)) {
              val += this[offset + --i] * mul;
            }
            mul *= 0x80;

            if (val >= mul) val -= Math.pow(2, 8 * byteLength);

            return val;
          };

          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 1, this.length);
            if (!(this[offset] & 0x80)) return this[offset];
            return (0xff - this[offset] + 1) * -1;
          };

          Buffer.prototype.readInt16LE = function readInt16LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset] | (this[offset + 1] << 8);
            return val & 0x8000 ? val | 0xffff0000 : val;
          };

          Buffer.prototype.readInt16BE = function readInt16BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | (this[offset] << 8);
            return val & 0x8000 ? val | 0xffff0000 : val;
          };

          Buffer.prototype.readInt32LE = function readInt32LE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              this[offset] |
              (this[offset + 1] << 8) |
              (this[offset + 2] << 16) |
              (this[offset + 3] << 24)
            );
          };

          Buffer.prototype.readInt32BE = function readInt32BE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              (this[offset] << 24) |
              (this[offset + 1] << 16) |
              (this[offset + 2] << 8) |
              this[offset + 3]
            );
          };

          Buffer.prototype.readFloatLE = function readFloatLE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
          };

          Buffer.prototype.readFloatBE = function readFloatBE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
          };

          Buffer.prototype.readDoubleLE = function readDoubleLE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
          };

          Buffer.prototype.readDoubleBE = function readDoubleBE(
            offset,
            noAssert
          ) {
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
          };

          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf))
              throw new TypeError(
                '"buffer" argument must be a Buffer instance'
              );
            if (value > max || value < min)
              throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length)
              throw new RangeError("Index out of range");
          }

          Buffer.prototype.writeUIntLE = function writeUIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var mul = 1;
            var i = 0;
            this[offset] = value & 0xff;
            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUIntBE = function writeUIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            byteLength = byteLength | 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            var i = byteLength - 1;
            var mul = 1;
            this[offset + i] = value & 0xff;
            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeUInt8 = function writeUInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
            if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
            this[offset] = value & 0xff;
            return offset + 1;
          };

          function objectWriteUInt16(buf, value, offset, littleEndian) {
            if (value < 0) value = 0xffff + value + 1;
            for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
              buf[offset + i] =
                (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
                ((littleEndian ? i : 1 - i) * 8);
            }
          }

          Buffer.prototype.writeUInt16LE = function writeUInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff;
              this[offset + 1] = value >>> 8;
            } else {
              objectWriteUInt16(this, value, offset, true);
            }
            return offset + 2;
          };

          Buffer.prototype.writeUInt16BE = function writeUInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 8;
              this[offset + 1] = value & 0xff;
            } else {
              objectWriteUInt16(this, value, offset, false);
            }
            return offset + 2;
          };

          function objectWriteUInt32(buf, value, offset, littleEndian) {
            if (value < 0) value = 0xffffffff + value + 1;
            for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
              buf[offset + i] =
                (value >>> ((littleEndian ? i : 3 - i) * 8)) & 0xff;
            }
          }

          Buffer.prototype.writeUInt32LE = function writeUInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset + 3] = value >>> 24;
              this[offset + 2] = value >>> 16;
              this[offset + 1] = value >>> 8;
              this[offset] = value & 0xff;
            } else {
              objectWriteUInt32(this, value, offset, true);
            }
            return offset + 4;
          };

          Buffer.prototype.writeUInt32BE = function writeUInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 24;
              this[offset + 1] = value >>> 16;
              this[offset + 2] = value >>> 8;
              this[offset + 3] = value & 0xff;
            } else {
              objectWriteUInt32(this, value, offset, false);
            }
            return offset + 4;
          };

          Buffer.prototype.writeIntLE = function writeIntLE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);

              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = value & 0xff;
            while (++i < byteLength && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeIntBE = function writeIntBE(
            value,
            offset,
            byteLength,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);

              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }

            var i = byteLength - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i] = value & 0xff;
            while (--i >= 0 && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
            }

            return offset + byteLength;
          };

          Buffer.prototype.writeInt8 = function writeInt8(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
            if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
            if (value < 0) value = 0xff + value + 1;
            this[offset] = value & 0xff;
            return offset + 1;
          };

          Buffer.prototype.writeInt16LE = function writeInt16LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff;
              this[offset + 1] = value >>> 8;
            } else {
              objectWriteUInt16(this, value, offset, true);
            }
            return offset + 2;
          };

          Buffer.prototype.writeInt16BE = function writeInt16BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 8;
              this[offset + 1] = value & 0xff;
            } else {
              objectWriteUInt16(this, value, offset, false);
            }
            return offset + 2;
          };

          Buffer.prototype.writeInt32LE = function writeInt32LE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff;
              this[offset + 1] = value >>> 8;
              this[offset + 2] = value >>> 16;
              this[offset + 3] = value >>> 24;
            } else {
              objectWriteUInt32(this, value, offset, true);
            }
            return offset + 4;
          };

          Buffer.prototype.writeInt32BE = function writeInt32BE(
            value,
            offset,
            noAssert
          ) {
            value = +value;
            offset = offset | 0;
            if (!noAssert)
              checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            if (value < 0) value = 0xffffffff + value + 1;
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 24;
              this[offset + 1] = value >>> 16;
              this[offset + 2] = value >>> 8;
              this[offset + 3] = value & 0xff;
            } else {
              objectWriteUInt32(this, value, offset, false);
            }
            return offset + 4;
          };

          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length)
              throw new RangeError("Index out of range");
            if (offset < 0) throw new RangeError("Index out of range");
          }

          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                4,
                3.4028234663852886e38,
                -3.4028234663852886e38
              );
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
          }

          Buffer.prototype.writeFloatLE = function writeFloatLE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeFloatBE = function writeFloatBE(
            value,
            offset,
            noAssert
          ) {
            return writeFloat(this, value, offset, false, noAssert);
          };

          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            if (!noAssert) {
              checkIEEE754(
                buf,
                value,
                offset,
                8,
                1.7976931348623157e308,
                -1.7976931348623157e308
              );
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
          }

          Buffer.prototype.writeDoubleLE = function writeDoubleLE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, true, noAssert);
          };

          Buffer.prototype.writeDoubleBE = function writeDoubleBE(
            value,
            offset,
            noAssert
          ) {
            return writeDouble(this, value, offset, false, noAssert);
          };

          // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
          Buffer.prototype.copy = function copy(
            target,
            targetStart,
            start,
            end
          ) {
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;

            // Copy 0 bytes; we're done
            if (end === start) return 0;
            if (target.length === 0 || this.length === 0) return 0;

            // Fatal error conditions
            if (targetStart < 0) {
              throw new RangeError("targetStart out of bounds");
            }
            if (start < 0 || start >= this.length)
              throw new RangeError("sourceStart out of bounds");
            if (end < 0) throw new RangeError("sourceEnd out of bounds");

            // Are we oob?
            if (end > this.length) end = this.length;
            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start;
            }

            var len = end - start;
            var i;

            if (this === target && start < targetStart && targetStart < end) {
              // descending copy from end
              for (i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start];
              }
            } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
              // ascending copy from start
              for (i = 0; i < len; ++i) {
                target[i + targetStart] = this[i + start];
              }
            } else {
              Uint8Array.prototype.set.call(
                target,
                this.subarray(start, start + len),
                targetStart
              );
            }

            return len;
          };

          // Usage:
          //    buffer.fill(number[, offset[, end]])
          //    buffer.fill(buffer[, offset[, end]])
          //    buffer.fill(string[, offset[, end]][, encoding])
          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            // Handle string cases:
            if (typeof val === "string") {
              if (typeof start === "string") {
                encoding = start;
                start = 0;
                end = this.length;
              } else if (typeof end === "string") {
                encoding = end;
                end = this.length;
              }
              if (val.length === 1) {
                var code = val.charCodeAt(0);
                if (code < 256) {
                  val = code;
                }
              }
              if (encoding !== undefined && typeof encoding !== "string") {
                throw new TypeError("encoding must be a string");
              }
              if (
                typeof encoding === "string" &&
                !Buffer.isEncoding(encoding)
              ) {
                throw new TypeError("Unknown encoding: " + encoding);
              }
            } else if (typeof val === "number") {
              val = val & 255;
            }

            // Invalid ranges are not set to a default, so can range check early.
            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError("Out of range index");
            }

            if (end <= start) {
              return this;
            }

            start = start >>> 0;
            end = end === undefined ? this.length : end >>> 0;

            if (!val) val = 0;

            var i;
            if (typeof val === "number") {
              for (i = start; i < end; ++i) {
                this[i] = val;
              }
            } else {
              var bytes = Buffer.isBuffer(val)
                ? val
                : utf8ToBytes(new Buffer(val, encoding).toString());
              var len = bytes.length;
              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len];
              }
            }

            return this;
          };

          // HELPER FUNCTIONS
          // ================

          var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

          function base64clean(str) {
            // Node strips out invalid characters like \n and \t from the string, base64-js does not
            str = stringtrim(str).replace(INVALID_BASE64_RE, "");
            // Node converts strings with length < 2 to ''
            if (str.length < 2) return "";
            // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
            while (str.length % 4 !== 0) {
              str = str + "=";
            }
            return str;
          }

          function stringtrim(str) {
            if (str.trim) return str.trim();
            return str.replace(/^\s+|\s+$/g, "");
          }

          function toHex(n) {
            if (n < 16) return "0" + n.toString(16);
            return n.toString(16);
          }

          function utf8ToBytes(string, units) {
            units = units || Infinity;
            var codePoint;
            var length = string.length;
            var leadSurrogate = null;
            var bytes = [];

            for (var i = 0; i < length; ++i) {
              codePoint = string.charCodeAt(i);

              // is surrogate component
              if (codePoint > 0xd7ff && codePoint < 0xe000) {
                // last char was a lead
                if (!leadSurrogate) {
                  // no lead yet
                  if (codePoint > 0xdbff) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                  } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                    continue;
                  }

                  // valid lead
                  leadSurrogate = codePoint;

                  continue;
                }

                // 2 leads in a row
                if (codePoint < 0xdc00) {
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                  leadSurrogate = codePoint;
                  continue;
                }

                // valid surrogate pair
                codePoint =
                  (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) +
                  0x10000;
              } else if (leadSurrogate) {
                // valid bmp char, but last char was a lead
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
              }

              leadSurrogate = null;

              // encode utf8
              if (codePoint < 0x80) {
                if ((units -= 1) < 0) break;
                bytes.push(codePoint);
              } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break;
                bytes.push(
                  (codePoint >> 0x6) | 0xc0,
                  (codePoint & 0x3f) | 0x80
                );
              } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break;
                bytes.push(
                  (codePoint >> 0xc) | 0xe0,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                );
              } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break;
                bytes.push(
                  (codePoint >> 0x12) | 0xf0,
                  ((codePoint >> 0xc) & 0x3f) | 0x80,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                );
              } else {
                throw new Error("Invalid code point");
              }
            }

            return bytes;
          }

          function asciiToBytes(str) {
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              // Node's code seems to be doing this and not & 0x7F..
              byteArray.push(str.charCodeAt(i) & 0xff);
            }
            return byteArray;
          }

          function utf16leToBytes(str, units) {
            var c, hi, lo;
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0) break;

              c = str.charCodeAt(i);
              hi = c >> 8;
              lo = c % 256;
              byteArray.push(lo);
              byteArray.push(hi);
            }

            return byteArray;
          }

          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str));
          }

          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length) break;
              dst[i + offset] = src[i];
            }
            return i;
          }

          function isnan(val) {
            return val !== val; // eslint-disable-line no-self-compare
          }
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      {
        "base64-js": 39,
        ieee754: 50,
        isarray: 53,
      },
    ],
    45: [
      function (require, module, exports) {
        (function (Buffer) {
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          // NOTE: These type checking functions intentionally don't use `instanceof`
          // because it is fragile and can be easily faked with `Object.create()`.

          function isArray(arg) {
            if (Array.isArray) {
              return Array.isArray(arg);
            }
            return objectToString(arg) === "[object Array]";
          }
          exports.isArray = isArray;

          function isBoolean(arg) {
            return typeof arg === "boolean";
          }
          exports.isBoolean = isBoolean;

          function isNull(arg) {
            return arg === null;
          }
          exports.isNull = isNull;

          function isNullOrUndefined(arg) {
            return arg == null;
          }
          exports.isNullOrUndefined = isNullOrUndefined;

          function isNumber(arg) {
            return typeof arg === "number";
          }
          exports.isNumber = isNumber;

          function isString(arg) {
            return typeof arg === "string";
          }
          exports.isString = isString;

          function isSymbol(arg) {
            return typeof arg === "symbol";
          }
          exports.isSymbol = isSymbol;

          function isUndefined(arg) {
            return arg === void 0;
          }
          exports.isUndefined = isUndefined;

          function isRegExp(re) {
            return objectToString(re) === "[object RegExp]";
          }
          exports.isRegExp = isRegExp;

          function isObject(arg) {
            return typeof arg === "object" && arg !== null;
          }
          exports.isObject = isObject;

          function isDate(d) {
            return objectToString(d) === "[object Date]";
          }
          exports.isDate = isDate;

          function isError(e) {
            return objectToString(e) === "[object Error]" || e instanceof Error;
          }
          exports.isError = isError;

          function isFunction(arg) {
            return typeof arg === "function";
          }
          exports.isFunction = isFunction;

          function isPrimitive(arg) {
            return (
              arg === null ||
              typeof arg === "boolean" ||
              typeof arg === "number" ||
              typeof arg === "string" ||
              typeof arg === "symbol" || // ES6 symbol
              typeof arg === "undefined"
            );
          }
          exports.isPrimitive = isPrimitive;

          exports.isBuffer = Buffer.isBuffer;

          function objectToString(o) {
            return Object.prototype.toString.call(o);
          }
        }.call(this, {
          isBuffer: require("../../is-buffer/index.js"),
        }));
      },
      {
        "../../is-buffer/index.js": 52,
      },
    ],
    46: [
      function (require, module, exports) {
        /* See LICENSE file for terms of use */

        /*
         * Text diff implementation.
         *
         * This library supports the following APIS:
         * JsDiff.diffChars: Character by character diff
         * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
         * JsDiff.diffLines: Line based diff
         *
         * JsDiff.diffCss: Diff targeted at CSS content
         *
         * These methods are based on the implementation proposed in
         * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
         * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
         */
        (function (global, undefined) {
          var objectPrototypeToString = Object.prototype.toString;

          /*istanbul ignore next*/
          function map(arr, mapper, that) {
            if (Array.prototype.map) {
              return Array.prototype.map.call(arr, mapper, that);
            }

            var other = new Array(arr.length);

            for (var i = 0, n = arr.length; i < n; i++) {
              other[i] = mapper.call(that, arr[i], i, arr);
            }
            return other;
          }

          function clonePath(path) {
            return {
              newPos: path.newPos,
              components: path.components.slice(0),
            };
          }

          function removeEmpty(array) {
            var ret = [];
            for (var i = 0; i < array.length; i++) {
              if (array[i]) {
                ret.push(array[i]);
              }
            }
            return ret;
          }

          function escapeHTML(s) {
            var n = s;
            n = 