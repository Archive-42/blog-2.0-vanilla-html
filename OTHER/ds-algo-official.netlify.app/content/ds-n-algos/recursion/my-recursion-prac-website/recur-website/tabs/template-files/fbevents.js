/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
 * copy, modify, and distribute this software in source code or binary form for use
 * in connection with the web services and APIs provided by Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use of
 * this software is subject to the Facebook Platform Policy
 * [http://developers.facebook.com/policy/]. This copyright notice shall be
 * included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
fbq.version = "2.9.33";
fbq._releaseSegment = "stable";
fbq.pendingConfigs = ["global_config"];
((a, b, c, d) => {
  const e = {
    exports: {},
  };
  e.exports;
  (() => {
    const f = a.fbq;
    f.execStart = a.performance && a.performance.now && a.performance.now();
    if (
      !(() => {
        const b = a.postMessage || (() => {});
        if (!f) {
          b(
            {
              action: "FB_LOG",
              logType: "Facebook Pixel Error",
              logMessage: "Pixel code is not installed correctly on this page",
            },
            "*"
          );
          "error" in console &&
            console.error(
              "Facebook Pixel Error: Pixel code is not installed correctly on this page"
            );
          return !1;
        }
        return !0;
      })()
    )
      return;
    const g = (() => {
              function a(a, b) {
                const c = [];
                let d = !0;
                let e = !1;
                let f = void 0;
                try {
                  for (
                    let a =
                            a[
                              typeof Symbol === "function"
                                ? Symbol.iterator
                                : "@@iterator"
                            ](),
                        g;
                    !(d = (g = a.next()).done);
                    d = !0
                  ) {
                    c.push(g.value);
                    if (b && c.length === b) break;
                  }
                } catch (a) {
                  (e = !0), (f = a);
                } finally {
                  try {
                    !d && a["return"] && a["return"]();
                  } finally {
                    if (e) throw f;
                  }
                }
                return c;
              }
              return (b, c) => {
                if (Array.isArray(b)) return b;
                else if (
                  (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") in
                  Object(b)
                )
                  return a(b, c);
                else
                  throw new TypeError(
                    "Invalid attempt to destructure non-iterable instance"
                  );
              };
            })(),
          h = (() => {
            function a(a, b) {
              for (let c = 0; c < b.length; c++) {
                const d = b[c];
                d.enumerable = d.enumerable || !1;
                d.configurable = !0;
                "value" in d && (d.writable = !0);
                Object.defineProperty(a, d.key, d);
              }
            }
            return (b, c, d) => {
              c && a(b.prototype, c);
              d && a(b, d);
              return b;
            };
          })(),
          i =
            typeof Symbol === "function" &&
            typeof (typeof Symbol === "function"
              ? Symbol.iterator
              : "@@iterator") === "symbol"
              ? a => {
                  return typeof a;
                }
              : a => {
                  return a &&
                    typeof Symbol === "function" &&
                    a.constructor === Symbol &&
                    a !==
                      (typeof Symbol === "function"
                        ? Symbol.prototype
                        : "@@prototype")
                    ? "symbol"
                    : typeof a;
                };

    function j(a, b) {
      if (!a)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return b && (typeof b === "object" || typeof b === "function") ? b : a;
    }

    function k(a, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof b
        );
      a.prototype = Object.create(b && b.prototype, {
        constructor: {
          value: a,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      });
      b &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(a, b)
          : (a.__proto__ = b));
    }

    function l(a, b, c) {
      b in a
        ? Object.defineProperty(a, b, {
            value: c,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (a[b] = c);
      return a;
    }

    function m(a) {
      if (Array.isArray(a)) {
        for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
        return c;
      } else return Array.from(a);
    }

    function n(a, b) {
      if (!(a instanceof b))
        throw new TypeError("Cannot call a class as a function");
    }
    f.__fbeventsModules ||
      ((f.__fbeventsModules = {}),
      (f.__fbeventsResolvedModules = {}),
      (f.getFbeventsModules = a => {
        f.__fbeventsResolvedModules[a] ||
          (f.__fbeventsResolvedModules[a] = f.__fbeventsModules[a]());
        return f.__fbeventsResolvedModules[a];
      }),
      (f.fbIsModuleLoaded = a => {
        return !!f.__fbeventsModules[a];
      }),
      (f.ensureModuleRegistered = (b, a) => {
        f.fbIsModuleLoaded(b) || (f.__fbeventsModules[b] = a);
      }));
    f.ensureModuleRegistered("SignalsConvertNodeToHTMLElement", () => {
      return ((f, g, h, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";

          function a(a) {
            const b =
              (typeof HTMLElement === "undefined"
                ? "undefined"
                : i(HTMLElement)) === "object"
                ? a instanceof HTMLElement
                : a != null &&
                  (typeof a === "undefined" ? "undefined" : i(a)) ===
                    "object" &&
                  a !== null &&
                  a.nodeType === 1 &&
                  typeof a.nodeName === "string";
            return !b ? null : a;
          }
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsEventValidation", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsLogging");
          const b = a.logUserError;
          const c = /^[+-]?\d+(\.\d+)?$/;
          const d = "number";
          const e = "currency_code";

          const g = {
            AED: 1,
            ARS: 1,
            AUD: 1,
            BOB: 1,
            BRL: 1,
            CAD: 1,
            CHF: 1,
            CLP: 1,
            CNY: 1,
            COP: 1,
            CRC: 1,
            CZK: 1,
            DKK: 1,
            EUR: 1,
            GBP: 1,
            GTQ: 1,
            HKD: 1,
            HNL: 1,
            HUF: 1,
            IDR: 1,
            ILS: 1,
            INR: 1,
            ISK: 1,
            JPY: 1,
            KRW: 1,
            MOP: 1,
            MXN: 1,
            MYR: 1,
            NIO: 1,
            NOK: 1,
            NZD: 1,
            PEN: 1,
            PHP: 1,
            PLN: 1,
            PYG: 1,
            QAR: 1,
            RON: 1,
            RUB: 1,
            SAR: 1,
            SEK: 1,
            SGD: 1,
            THB: 1,
            TRY: 1,
            TWD: 1,
            USD: 1,
            UYU: 1,
            VEF: 1,
            VND: 1,
            ZAR: 1,
          };

          a = {
            value: {
              isRequired: !0,
              type: d,
            },
            currency: {
              isRequired: !0,
              type: e,
            },
          };
          const h = {
                    AddPaymentInfo: {},
                    AddToCart: {},
                    AddToWishlist: {},
                    CompleteRegistration: {},
                    Contact: {},
                    CustomEvent: {
                      validationSchema: {
                        event: {
                          isRequired: !0,
                        },
                      },
                    },
                    CustomizeProduct: {},
                    Donate: {},
                    FindLocation: {},
                    InitiateCheckout: {},
                    Lead: {},
                    PageView: {},
                    PixelInitialized: {},
                    Purchase: {
                      validationSchema: a,
                    },
                    Schedule: {},
                    Search: {},
                    StartTrial: {},
                    SubmitApplication: {},
                    Subscribe: {},
                    ViewContent: {},
                  },
                i = {
                  agent: !0,
                  automaticmatchingconfig: !0,
                  codeless: !0,
                  tracksingleonly: !0,
                },
                j = Object.prototype.hasOwnProperty;

          function l() {
            return {
              error: null,
              warnings: [],
            };
          }

          function m(a) {
            return {
              error: a,
              warnings: [],
            };
          }

          function n(a) {
            return {
              error: null,
              warnings: a,
            };
          }

          function o(a) {
            if (a) {
              a = a.toLowerCase();
              const b = i[a];
              if (b !== !0)
                return m({
                  metadata: a,
                  type: "UNSUPPORTED_METADATA_ARGUMENT",
                });
            }
            return l();
          }

          function p(a) {
            const b =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {};
            if (!a)
              return m({
                type: "NO_EVENT_NAME",
              });
            const c = h[a];
            return !c
              ? n([
                  {
                    eventName: a,
                    type: "NONSTANDARD_EVENT",
                  },
                ])
              : q(a, b, c);
          }

          function q(a, b, f) {
            f = f.validationSchema;
            const h = [];
            for (const i in f)
              if (j.call(f, i)) {
                let k = f[i];
                const l = b[i];
                if (k) {
                  if (k.isRequired != null && !j.call(b, i))
                    return m({
                      eventName: a,
                      param: i,
                      type: "REQUIRED_PARAM_MISSING",
                    });
                  if (k.type != null && typeof k.type === "string") {
                    let o = !0;
                    switch (k.type) {
                      case d:
                        k =
                          (typeof l === "string" || typeof l === "number") &&
                          c.test("" + l);
                        k &&
                          Number(l) < 0 &&
                          h.push({
                            eventName: a ? a : "null",
                            param: i,
                            type: "NEGATIVE_EVENT_PARAM",
                          });
                        o = k;
                        break;
                      case e:
                        o = typeof l === "string" && !!g[l.toUpperCase()];
                        break;
                    }
                    if (!o)
                      return m({
                        eventName: a,
                        param: i,
                        type: "INVALID_PARAM",
                      });
                  }
                }
              }
            return n(h);
          }

          function r(a, c) {
            a = p(a, c);
            a.error && b(a.error);
            if (a.warnings)
              for (var c = 0; c < a.warnings.length; c++) b(a.warnings[c]);
            return a;
          }
          k.exports = {
            validateEvent: p,
            validateEventAndLog: r,
            validateMetadata: o,
          };
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsBaseEvent", () => {
      return ((g, i, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsUtils");
          const b = a.map;
          const c = a.keys;
          a = (() => {
            function a(b) {
              n(this, a),
                (this._regKey = 0),
                (this._subscriptions = {}),
                (this._coerceArgs = b || null);
            }
            h(a, [
              {
                key: "listen",
                value(a) {
                  const b = this, c = "" + this._regKey++;
                  this._subscriptions[c] = a;
                  return () => {
                    delete b._subscriptions[c];
                  };
                },
              },
              {
                key: "listenOnce",
                value(a) {
                  let b = null;

                  const c = function () {
                    b && b();
                    b = null;
                    return a.apply(void 0, arguments);
                  };

                  b = this.listen(c);
                  return b;
                },
              },
              {
                key: "trigger",
                value() {
                  const a = this;
                  for (
                    var d = arguments.length, e = Array(d), f = 0;
                    f < d;
                    f++
                  )
                    e[f] = arguments[f];
                  return b(c(this._subscriptions), b => {
                    let c;
                    return (c = a._subscriptions)[b].apply(c, e);
                  });
                },
              },
              {
                key: "triggerWeakly",
                value() {
                  const a =
                    this._coerceArgs != null
                      ? this._coerceArgs.apply(this, arguments)
                      : null;
                  return a == null ? [] : this.trigger.apply(this, m(a));
                },
              },
            ]);
            return a;
          })();
          l.exports = a;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsBatcher", () => {
      return ((g, i, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsConfigStore"), b = 1e3, c = 10;

          function d() {
            const b = a.get(null, "batching");
            return b != null ? b.maxBatchSize : c;
          }

          function e() {
            const c = a.get(null, "batching");
            return c != null ? c.batchWaitTimeMs : b;
          }
          const i = (() => {
            function a(b) {
              n(this, a),
                (this._waitHandle = null),
                (this._data = []),
                (this._cb = b);
            }
            h(a, [
              {
                key: "addToBatch",
                value(a) {
                  const b = this;
                  this._waitHandle == null &&
                    (this._waitHandle = g.setTimeout(() => {
                      (b._waitHandle = null), b.forceEndBatch();
                    }, e()));
                  this._data.push(a);
                  this._data.length >= d() && this.forceEndBatch();
                },
              },
              {
                key: "forceEndBatch",
                value() {
                  this._waitHandle != null &&
                    (g.clearTimeout(this._waitHandle),
                    (this._waitHandle = null)),
                    this._data.length > 0 && this._cb(this._data),
                    (this._data = []);
                },
              },
            ]);
            return a;
          })();
          l.exports = i;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "signalsFBEventsCoerceAutomaticMatchingConfig",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            const b = a.coerce;
            a = a.Typed;
            const c = a.objectWithFields({
              selectedMatchKeys: a.arrayOf(a.string()),
            });
            k.exports = a => {
              return b(a, c);
            };
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered(
      "signalsFBEventsCoerceBatchingConfig",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsTyped"),
                  b = a.Typed,
                  c = a.coerce,
                  d = a.enforce,
                  e = a => {
                    const e = c(
                      a,
                      b.objectWithFields({
                        max_batch_size: b.number(),
                        wait_time_ms: b.number(),
                      })
                    );
                    return e != null
                      ? {
                          batchWaitTimeMs: e.wait_time_ms,
                          maxBatchSize: e.max_batch_size,
                        }
                      : d(
                          a,
                          b.objectWithFields({
                            batchWaitTimeMs: b.number(),
                            maxBatchSize: b.number(),
                          })
                        );
                  };
            k.exports = a => {
              return c(a, e);
            };
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered(
      "signalsFBEventsCoerceInferedEventsConfig",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsCoercePrimitives");
            a.coerceNumber;
            const b = a.coerceObjectWithFields;

            function c(a) {
              return b(a, {
                buttonSelector(a) {
                  return a === "extended" ? "extended" : null;
                },
              });
            }
            k.exports = c;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered(
      "signalsFBEventsCoerceParameterExtractors",
      () => {
        return ((g, h, j, k) => {
          const l = {
            exports: {},
          };
          l.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsUtils"),
                  b = a.filter,
                  c = a.map,
                  d = f.getFbeventsModules(
                    "signalsFBEventsCoerceStandardParameter"
                  );

            function e(a) {
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              let b = a.domain_uri, c = a.event_type, d = a.extractor_type;
              a = a.id;
              b = typeof b === "string" ? b : null;
              c = c != null && typeof c === "string" && c !== "" ? c : null;
              a = a != null && typeof a === "string" && a !== "" ? a : null;
              d =
                d === "CONSTANT_VALUE" ||
                d === "CSS" ||
                d === "GLOBAL_VARIABLE" ||
                d === "GTM" ||
                d === "JSON_LD" ||
                d === "META_TAG" ||
                d === "OPEN_GRAPH" ||
                d === "RDFA" ||
                d === "SCHEMA_DOT_ORG" ||
                d === "URI"
                  ? d
                  : null;
              return b != null && c != null && a != null && d != null
                ? {
                    domain_uri: b,
                    event_type: c,
                    extractor_type: d,
                    id: a,
                  }
                : null;
            }

            function g(a) {
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              a = a.extractor_config;
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              let b = a.parameter_type;
              a = a.value;
              b = d(b);
              a = a != null && typeof a === "string" && a !== "" ? a : null;
              return b != null && a != null
                ? {
                    parameter_type: b,
                    value: a,
                  }
                : null;
            }

            function h(a) {
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              let b = a.parameter_type;
              a = a.selector;
              b = d(b);
              a = a != null && typeof a === "string" && a !== "" ? a : null;
              return b != null && a != null
                ? {
                    parameter_type: b,
                    selector: a,
                  }
                : null;
            }

            function j(a) {
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              a = a.extractor_config;
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              a = a.parameter_selectors;
              if (Array.isArray(a)) {
                a = c(a, h);
                const d = b(a, Boolean);
                if (a.length === d.length)
                  return {
                    parameter_selectors: d,
                  };
              }
              return null;
            }

            function k(a) {
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              a = a.extractor_config;
              if (
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              let b = a.context, c = a.parameter_type;
              a = a.value;
              b = b != null && typeof b === "string" && b !== "" ? b : null;
              c = d(c);
              a = a != null && typeof a === "string" && a !== "" ? a : null;
              return b != null && c != null && a != null
                ? {
                    context: b,
                    parameter_type: c,
                    value: a,
                  }
                : null;
            }

            function m(a) {
              let b = e(a);
              if (
                b == null ||
                a == null ||
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object"
              )
                return null;
              const c = b.domain_uri, d = b.event_type, f = b.extractor_type;
              b = b.id;
              if (f === "CSS") {
                var h = j(a);
                if (h != null)
                  return {
                    domain_uri: c,
                    event_type: d,
                    extractor_config: h,
                    extractor_type: "CSS",
                    id: b,
                  };
              }
              if (f === "CONSTANT_VALUE") {
                h = g(a);
                if (h != null)
                  return {
                    domain_uri: c,
                    event_type: d,
                    extractor_config: h,
                    extractor_type: "CONSTANT_VALUE",
                    id: b,
                  };
              }
              if (f === "GLOBAL_VARIABLE")
                return {
                  domain_uri: c,
                  event_type: d,
                  extractor_type: "GLOBAL_VARIABLE",
                  id: b,
                };
              if (f === "GTM")
                return {
                  domain_uri: c,
                  event_type: d,
                  extractor_type: "GTM",
                  id: b,
                };
              if (f === "JSON_LD")
                return {
                  domain_uri: c,
                  event_type: d,
                  extractor_type: "JSON_LD",
                  id: b,
                };
              if (f === "META_TAG")
                return {
                  domain_uri: c,
                  event_type: d,
                  extractor_type: "META_TAG",
                  id: b,
                };
              if (f === "OPEN_GRAPH")
                return {
                  domain_uri: c,
                  event_type: d,
                  extractor_type: "OPEN_GRAPH",
                  id: b,
                };
              if (f === "RDFA")
                return {
                  domain_uri: c,
                  event_type: d,
                  extractor_type: "RDFA",
                  id: b,
                };
              if (f === "SCHEMA_DOT_ORG")
                return {
                  domain_uri: c,
                  event_type: d,
                  extractor_type: "SCHEMA_DOT_ORG",
                  id: b,
                };
              if (f === "URI") {
                h = k(a);
                if (h != null)
                  return {
                    domain_uri: c,
                    event_type: d,
                    extractor_config: h,
                    extractor_type: "URI",
                    id: b,
                  };
              }
              return null;
            }
            l.exports = m;
          })();
          return l.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("signalsFBEventsCoercePixel", () => {
      return ((g, h, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("signalsFBEventsCoercePixelID"), b = f.getFbeventsModules("signalsFBEventsCoerceUserData");

          function c(c) {
            if (
              c == null ||
              (typeof c === "undefined" ? "undefined" : i(c)) !== "object"
            )
              return null;
            let d = c.eventCount, e = c.id, f = c.userData;
            c = c.userDataFormFields;
            d = typeof d === "number" ? d : null;
            e = a(e);
            f = b(f);
            c = b(c);
            return e != null && f != null && d != null && c != null
              ? {
                  eventCount: d,
                  id: e,
                  userData: f,
                  userDataFormFields: c,
                }
              : null;
          }
          l.exports = c;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsCoercePixelID", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsLogging");
          const b = a.logUserError;
          a = f.getFbeventsModules("SignalsFBEventsTyped");
          const c = a.Typed, d = a.coerce;

          function e(a) {
            a = d(a, c.fbid());
            if (a == null) {
              const e = JSON.stringify(a);
              b({
                pixelID: e != null ? e : "undefined",
                type: "INVALID_PIXEL_ID",
              });
              return null;
            }
            return a;
          }
          k.exports = e;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsCoercePrimitives", () => {
      return ((g, h, j, k) => {
        const m = {
          exports: {},
        };
        m.exports;
        (() => {
          "use strict";
          const a =
                    Object.assign ||
                    function (a) {
                      for (let b = 1; b < arguments.length; b++) {
                        const c = arguments[b];
                        for (const d in c)
                          Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
                      }
                      return a;
                    },
                b = f.getFbeventsModules("SignalsFBEventsUtils"),
                c = b.filter,
                d = b.map,
                e = b.reduce;

          function g(a) {
            return Object.values(a);
          }

          function h(a) {
            return typeof a === "boolean" ? a : null;
          }

          function j(a) {
            return typeof a === "number" ? a : null;
          }

          function k(a) {
            return typeof a === "string" ? a : null;
          }

          function n(a) {
            return (typeof a === "undefined" ? "undefined" : i(a)) ===
              "object" &&
              !Array.isArray(a) &&
              a != null
              ? a
              : null;
          }

          function o(a) {
            return Array.isArray(a) ? a : null;
          }

          function p(a, b) {
            return g(a).includes(b) ? b : null;
          }

          function q(a, b) {
            a = o(a);
            return a == null
              ? null
              : c(d(a, b), a => {
                  return a != null;
                });
          }

          function r(a, b) {
            const c = o(a);
            if (c == null) return null;
            a = q(a, b);
            return a == null ? null : a.length === c.length ? a : null;
          }

          function s(b, c) {
            const d = n(b);
            if (d == null) return null;
            b = e(
              Object.keys(d),
              (b, e) => {
                const f = c(d[e]);
                return f == null ? b : a({}, b, l({}, e, f));
              },
              {}
            );
            return Object.keys(d).length === Object.keys(b).length ? b : null;
          }

          function t(a) {
            const b = b => {
              return a(b);
            };
            b.nullable = !0;
            return b;
          }

          function u(b, c) {
            const d = n(b);
            if (d == null) return null;
            b = Object.keys(c).reduce((b, e) => {
              if (b == null) return null;
              let f = c[e];
              const g = d[e];
              if (f.nullable === !0 && g == null)
                return a({}, b, l({}, e, null));
              f = f(g);
              return f == null ? null : a({}, b, l({}, e, f));
            }, {});
            return b != null ? Object.freeze(b) : null;
          }
          m.exports = {
            coerceArray: o,
            coerceArrayFilteringNulls: q,
            coerceArrayOf: r,
            coerceBoolean: h,
            coerceEnum: p,
            coerceMapOf: s,
            coerceNullableField: t,
            coerceNumber: j,
            coerceObject: n,
            coerceObjectWithFields: u,
            coerceString: k,
          };
        })();
        return m.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "signalsFBEventsCoerceStandardParameter",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsUtils");
            a = a.FBSet;
            const b = new a([
              "content_category",
              "content_ids",
              "content_name",
              "content_type",
              "currency",
              "contents",
              "num_items",
              "order_id",
              "predicted_ltv",
              "search_string",
              "status",
              "subscription_id",
              "value",
              "id",
              "item_price",
              "quantity",
              "ct",
              "db",
              "em",
              "external_id",
              "fn",
              "ge",
              "ln",
              "namespace",
              "ph",
              "st",
              "zp",
            ]);

            function c(a) {
              return typeof a === "string" && b.has(a) ? a : null;
            }
            k.exports = c;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("signalsFBEventsCoerceUserData", () => {
      return ((g, h, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsUtils"), b = a.each, c = a.keys;

          function d(a) {
            if (
              (typeof a === "undefined" ? "undefined" : i(a)) !== "object" ||
              a == null
            )
              return null;
            const d = {};
            b(c(a), b => {
              const c = a[b];
              typeof c === "string" && (d[b] = c);
            });
            return d;
          }
          l.exports = d;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsConfigLoadedEvent", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
          const b = f.getFbeventsModules("signalsFBEventsCoercePixelID");

          function c(a) {
            a = b(a);
            return a != null ? [a] : null;
          }
          a = new a(c);
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsConfigStore", () => {
      return ((g, i, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsQE");
          const b = f.getFbeventsModules("SignalsFBEventsProhibitedSourcesTypedef");
          const c = f.getFbeventsModules("SignalsFBEventsMicrodataConfigTypedef");
          const d = f.getFbeventsModules("SignalsFBEventsUnwantedDataTypedef");

          const e = f.getFbeventsModules(
            "SignalsFBEventsDataProcessingOptionsConfigTypedef"
          );

          let g = f.getFbeventsModules("SignalsFBEventsTyped");
          const i = g.coerce;
          const j = g.Typed;
          g = f.getFbeventsModules("SignalsFBEventsOpenBridgeConfigTypedef");

          const k = f.getFbeventsModules(
              "SignalsFBEventsParallelFireConfigTypedef"
            );

          const m = f.getFbeventsModules(
            "SignalsFBEventsLocalComputationConfigTypedef"
          );

          const o = f.getFbeventsModules("signalsFBEventsCoercePixelID");
          const p = f.getFbeventsModules("signalsFBEventsCoerceBatchingConfig");

          const q = f.getFbeventsModules(
            "signalsFBEventsCoerceAutomaticMatchingConfig"
          );

          const r = f.getFbeventsModules(
            "signalsFBEventsCoerceInferedEventsConfig"
          );

          let s = f.getFbeventsModules("SignalsFBEventsLogging");
          const t = s.logError;
          const u = "global";

          const v = {
            automaticMatching: q,
            openbridge: g,
            batching: p,
            inferredEvents: r,
            microdata: c,
            prohibitedSources: b,
            unwantedData: d,
            dataProcessingOptions: e,
            parallelfire: k,
            localcomputation: m,
          };

          s = (() => {
            function b() {
              n(this, b),
                (this._configStore = {
                  automaticMatching: {},
                  batching: {},
                  inferredEvents: {},
                  microdata: {},
                  prohibitedSources: {},
                  unwantedData: {},
                  dataProcessingOptions: {},
                  openbridge: {},
                  parallelfire: {},
                  localcomputation: {},
                });
            }
            h(b, [
              {
                key: "set",
                value(a, b, c) {
                  a = a == null ? u : o(a);
                  if (a == null) return;
                  b = i(b, j.string());
                  if (b == null) return;
                  if (this._configStore[b] == null) return;
                  this._configStore[b][a] = v[b] != null ? v[b](c) : c;
                },
              },
              {
                key: "setExperimental",
                value(b) {
                  b = i(
                    b,
                    j.objectWithFields({
                      config: j.object(),
                      experimentName: j.string(),
                      pixelID: o,
                      pluginName: j.string(),
                    })
                  );
                  if (b == null) return;
                  const c = b.config, d = b.experimentName, e = b.pixelID;
                  b = b.pluginName;
                  a.isInTest(d) && this.set(e, b, c);
                },
              },
              {
                key: "get",
                value(a, b) {
                  return this._configStore[b][a != null ? a : u];
                },
              },
              {
                key: "getWithGlobalFallback",
                value(a, b) {
                  let c = u;
                  b = this._configStore[b];
                  a != null &&
                    Object.prototype.hasOwnProperty.call(b, a) &&
                    (c = a);
                  return b[c];
                },
              },
              {
                key: "getAutomaticMatchingConfig",
                value(a) {
                  t(new Error("Calling legacy api getAutomaticMatchingConfig"));
                  return this.get(a, "automaticMatching");
                },
              },
              {
                key: "getInferredEventsConfig",
                value(a) {
                  t(new Error("Calling legacy api getInferredEventsConfig"));
                  return this.get(a, "inferredEvents");
                },
              },
            ]);
            return b;
          })();
          l.exports = new s();
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsDataProcessingOptionsConfigTypedef",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            a = a.Typed;
            a = a.objectWithFields({
              dataProcessingOptions: a.withValidation({
                def: a.arrayOf(a.string()),
                validators: [
                  a => {
                    return a.reduce((a, b) => {
                      return a === !0 && b === "LDU";
                    }, !0);
                  },
                ],
              }),
              dataProcessingCountry: a.withValidation({
                def: a.allowNull(a.number()),
                validators: [
                  a => {
                    return a === null || a === 0 || a === 1;
                  },
                ],
              }),
              dataProcessingState: a.withValidation({
                def: a.allowNull(a.number()),
                validators: [
                  a => {
                    return a === null || a === 0 || a === 1e3;
                  },
                ],
              }),
            });
            k.exports = a;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsFBEventsEvents", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
          let b = f.getFbeventsModules("SignalsFBEventsConfigLoadedEvent");
          const c = f.getFbeventsModules("SignalsFBEventsFiredEvent");
          const d = f.getFbeventsModules("SignalsFBEventsGetCustomParametersEvent");
          const e = f.getFbeventsModules("SignalsFBEventsGetIWLParametersEvent");
          const g = f.getFbeventsModules("SignalsFBEventsIWLBootStrapEvent");
          const h = f.getFbeventsModules("SignalsFBEventsPIIAutomatchedEvent");
          const i = f.getFbeventsModules("SignalsFBEventsPIIConflictingEvent");
          const j = f.getFbeventsModules("SignalsFBEventsPIIInvalidatedEvent");
          const l = f.getFbeventsModules("SignalsFBEventsPluginLoadedEvent");
          const m = f.getFbeventsModules("SignalsFBEventsSetEventIDEvent");
          const n = f.getFbeventsModules("SignalsFBEventsSetIWLExtractorsEvent");

          const o = f.getFbeventsModules(
            "SignalsFBEventsValidateCustomParametersEvent"
          );

          const p = f.getFbeventsModules(
            "SignalsFBEventsValidateUrlParametersEvent"
          );

          b = {
            configLoaded: b,
            execEnd: new a(),
            fired: c,
            getCustomParameters: d,
            getIWLParameters: e,
            iwlBootstrap: g,
            piiAutomatched: h,
            piiConflicting: i,
            piiInvalidated: j,
            pluginLoaded: l,
            setEventId: m,
            setIWLExtractors: n,
            validateCustomParameters: o,
            validateUrlParameters: p,
          };
          k.exports = b;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsExperimentNames", () => {
      return ((f, g, h, i) => {
        const j = {
          exports: {},
        };
        j.exports;
        (() => {
          "use strict";
          j.exports = {
            BATCHING_EXPERIMENT: "batching",
            SEND_BEACON_STRING_EXPERIMENT: "send_beacon_string",
            SEND_XHR_EXPERIMENT: "send_xhr",
          };
        })();
        return j.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsExperimentsTypedef", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsTyped");
          const b = a.Typed;
          a.coerce;
          a.enforce;
          a = b.arrayOf(
            b.objectWithFields({
              allocation: b.number(),
              code: b.string(),
              name: b.string(),
              passRate: b.number(),
            })
          );
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsFBQ", () => {
      return ((g, i, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";

          const a =
              Object.assign ||
              function (a) {
                for (let b = 1; b < arguments.length; b++) {
                  const c = arguments[b];
                  for (const d in c)
                    Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
                }
                return a;
              };

          const b = f.getFbeventsModules("SignalsEventValidation");
          const c = f.getFbeventsModules("SignalsFBEventsConfigStore");
          let d = f.getFbeventsModules("SignalsFBEventsEvents");
          const e = d.configLoaded;
          const i = f.getFbeventsModules("SignalsFBEventsFireLock");
          const j = f.getFbeventsModules("SignalsFBEventsJSLoader");
          d = f.getFbeventsModules("SignalsFBEventsLogging");
          const k = f.getFbeventsModules("SignalsFBEventsOptIn");
          let o = f.getFbeventsModules("SignalsFBEventsUtils");
          const p = f.getFbeventsModules("signalsFBEventsGetIsIosInAppBrowser");
          const q = f.getFbeventsModules("signalsFBEventsSendEvent");
          const r = o.each;
          const s = o.keys;
          const t = o.map;
          const u = o.some;
          const v = d.logError;
          const w = d.logUserError;

          const x = {
            AutomaticMatching: !0,
            AutomaticMatchingForPartnerIntegrations: !0,
            CommonIncludes: !0,
            FirstPartyCookies: !0,
            IWLBootstrapper: !0,
            IWLParameters: !0,
            InferredEvents: !0,
            Microdata: !0,
            MicrodataJsonLd: !0,
            OpenBridge: !0,
            ParallelFire: !0,
            ProhibitedSources: !0,
            Timespent: !0,
            UnwantedData: !0,
            LocalComputation: !0,
            IABPCMAEBridge: !0,
          };

          const y = {
            Track: 0,
            TrackCustom: 4,
            TrackSingle: 1,
            TrackSingleCustom: 2,
            TrackSingleSystem: 3,
            TrackSystem: 5,
          };

          o = ["InferredEvents", "Microdata"];
          const z = {
                    AutomaticSetup: o,
                  },
                A = {
                  AutomaticMatching: ["inferredevents", "identity"],
                  AutomaticMatchingForPartnerIntegrations: [
                    "automaticmatchingforpartnerintegrations",
                  ],
                  CommonIncludes: ["commonincludes"],
                  FirstPartyCookies: ["cookie"],
                  IWLBootstrapper: ["iwlbootstrapper"],
                  IWLParameters: ["iwlparameters", "inferredevents"],
                  InferredEvents: ["inferredevents", "identity"],
                  Microdata: ["microdata", "identity"],
                  MicrodataJsonLd: ["jsonld_microdata"],
                  OpenBridge: ["openbridge"],
                  ParallelFire: ["parallelfire"],
                  ProhibitedSources: ["prohibitedsources"],
                  Timespent: ["timespent"],
                  UnwantedData: ["unwanteddata"],
                  LocalComputation: ["localcomputation"],
                  IABPCMAEBridge: ["iabpcmaebridge"],
                };

          function B(a) {
            return !!(x[a] || z[a]);
          }
          const C = (a, b, c, d) => {
            return d == ""
              ? j.CONFIG.CDN_BASE_URL +
                  "signals/config/" +
                  a +
                  "?v=" +
                  b +
                  "&r=" +
                  c
              : j.CONFIG.CDN_BASE_URL +
                  "signals/config/" +
                  a +
                  "?v=" +
                  b +
                  "&r=" +
                  c +
                  "&domain=" +
                  d;
          };

          function D(a, b, c, d) {
            j.loadJSFile(C(a, b, c, d));
          }
          d = (() => {
            function d(a, b) {
              const e = this;
              n(this, d);
              this.VALID_FEATURES = x;
              this.optIns = new k(z);
              this.configsLoaded = {};
              this.locks = i.global;
              this.pluginConfig = c;
              this.disableFirstPartyCookies = !1;
              this.VERSION = a.version;
              this.RELEASE_SEGMENT = a._releaseSegment;
              this.pixelsByID = b;
              this.fbq = a;
              r(a.pendingConfigs || [], a => {
                return e.locks.lockConfig(a);
              });
            }
            h(d, [
              {
                key: "optIn",
                value(a, b) {
                  const c = this,
                        d =
                          arguments.length > 2 && arguments[2] !== void 0
                            ? arguments[2]
                            : !1;
                  if (typeof b !== "string" || !B(b))
                    throw new Error(
                      'Invalid Argument: "' +
                        b +
                        '" is not a valid opt-in feature'
                    );
                  B(b) &&
                    (this.optIns.optIn(a, b, d),
                    r([b].concat(m(z[b] || [])), a => {
                      A[a] &&
                        r(A[a], a => {
                          return c.fbq.loadPlugin(a);
                        });
                    }));
                  return this;
                },
              },
              {
                key: "optOut",
                value(a, b) {
                  this.optIns.optOut(a, b);
                  return this;
                },
              },
              {
                key: "consent",
                value(a) {
                  a === "revoke"
                    ? this.locks.lockConsent()
                    : a === "grant"
                    ? this.locks.unlockConsent()
                    : w({
                        action: a,
                        type: "INVALID_CONSENT_ACTION",
                      });
                  return this;
                },
              },
              {
                key: "setUserProperties",
                value(b, c) {
                  const d = this.pluginConfig.get(null, "dataProcessingOptions");
                  if (d != null && d.dataProcessingOptions.includes("LDU"))
                    return;
                  if (
                    !Object.prototype.hasOwnProperty.call(this.pixelsByID, b)
                  ) {
                    w({
                      pixelID: b,
                      type: "PIXEL_NOT_INITIALIZED",
                    });
                    return;
                  }
                  this.trackSingleSystem(
                    "user_properties",
                    b,
                    "UserProperties",
                    a({}, c)
                  );
                },
              },
              {
                key: "trackSingle",
                value(a, c, d, e) {
                  b.validateEventAndLog(c, d);
                  return this.trackSingleGeneric(a, c, d, y.TrackSingle, e);
                },
              },
              {
                key: "trackSingleCustom",
                value(a, b, c, d) {
                  return this.trackSingleGeneric(
                    a,
                    b,
                    c,
                    y.TrackSingleCustom,
                    d
                  );
                },
              },
              {
                key: "trackSingleSystem",
                value(a, b, c, d) {
                  return this.trackSingleGeneric(
                    b,
                    c,
                    d,
                    y.TrackSingleSystem,
                    null,
                    a
                  );
                },
              },
              {
                key: "trackSingleGeneric",
                value(b, c, d, e, f, g) {
                  b = typeof b === "string" ? b : b.id;
                  if (
                    !Object.prototype.hasOwnProperty.call(this.pixelsByID, b)
                  ) {
                    var h = {
                      pixelID: b,
                      type: "PIXEL_NOT_INITIALIZED",
                    };
                    g == null ? w(h) : v(new Error(h.type + " " + h.pixelID));
                    return this;
                  }
                  h = this.getDefaultSendData(b, c, f);
                  h.customData = d;
                  g != null &&
                    (h.customParameters = {
                      es: g,
                    });
                  h.customParameters = a({}, h.customParameters, {
                    tm: "" + e,
                  });
                  this.fire(h, !1);
                  return this;
                },
              },
              {
                key: "_validateSend",
                value(a, c) {
                  if (!a.eventName || !a.eventName.length)
                    throw new Error("Event name not specified");
                  if (!a.pixelId || !a.pixelId.length)
                    throw new Error("PixelId not specified");
                  a.set &&
                    r(
                      t(s(a.set), a => {
                        return b.validateMetadata(a);
                      }),
                      a => {
                        if (a.error) throw new Error(a.error);
                        a.warnings.length && r(a.warnings, w);
                      }
                    );
                  if (c) {
                    c = b.validateEvent(a.eventName, a.customData || {});
                    if (c.error) throw new Error(c.error);
                    c.warnings && c.warnings.length && r(c.warnings, w);
                  }
                  return this;
                },
              },
              {
                key: "_argsHasAnyUserData",
                value(a) {
                  const b = a.userData != null && s(a.userData).length > 0;
                  a =
                    a.userDataFormFields != null &&
                    s(a.userDataFormFields).length > 0;
                  return b || a;
                },
              },
              {
                key: "fire",
                value(a) {
                  const b =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : !1;
                  this._validateSend(a, b);
                  if (
                    (this._argsHasAnyUserData(a) &&
                      !this.fbq.loadPlugin("identity")) ||
                    this.locks.isLocked()
                  ) {
                    g.fbq("fire", a);
                    return this;
                  }
                  const c = this.fbq.getEventCustomParameters(
                            this.getPixel(a.pixelId),
                            a.eventName,
                            a.customData
                          ),
                        d = a.eventData.eventID;
                  c.append("eid", d);
                  const e = a.customParameters;
                  e &&
                    r(s(e), a => {
                      if (c.containsKey(a))
                        throw new Error(
                          "Custom parameter " + a + " already specified."
                        );
                      c.append(a, e[a]);
                    });
                  q({
                    customData: a.customData,
                    customParams: c,
                    eventName: a.eventName,
                    id: a.pixelId,
                    piiTranslator: null,
                  });
                  return this;
                },
              },
              {
                key: "callMethod",
                value(a) {
                  const b = a[0];
                  a = Array.prototype.slice.call(a, 1);
                  if (typeof b !== "string") {
                    w({
                      type: "FBQ_NO_METHOD_NAME",
                    });
                    return;
                  }
                  if (typeof this[b] === "function")
                    try {
                      this[b].apply(this, a);
                    } catch (a) {
                      v(a);
                    }
                  else
                    w({
                      method: b,
                      type: "INVALID_FBQ_METHOD",
                    });
                },
              },
              {
                key: "getDefaultSendData",
                value(a, b, c) {
                  const d = this.getPixel(a);
                  c = {
                    eventData: c || {},
                    eventName: b,
                    pixelId: a,
                  };
                  d &&
                    (d.userData && (c.userData = d.userData),
                    d.agent != null && d.agent !== ""
                      ? (c.set = {
                          agent: d.agent,
                        })
                      : this.fbq.agent != null &&
                        this.fbq.agent !== "" &&
                        (c.set = {
                          agent: this.fbq.agent,
                        }));
                  return c;
                },
              },
              {
                key: "getOptedInPixels",
                value(a) {
                  const b = this;
                  return this.optIns.listPixelIds(a).map(a => {
                    return b.pixelsByID[a];
                  });
                },
              },
              {
                key: "getPixel",
                value(a) {
                  return this.pixelsByID[a];
                },
              },
              {
                key: "loadConfig",
                value(a) {
                  if (
                    this.fbq.disableConfigLoading === !0 ||
                    Object.prototype.hasOwnProperty.call(this.configsLoaded, a)
                  )
                    return;
                  this.locks.lockConfig(a);
                  (!this.fbq.pendingConfigs ||
                    u(this.fbq.pendingConfigs, b => {
                      return b === a;
                    }) === !1) &&
                    D(
                      a,
                      this.VERSION,
                      this.RELEASE_SEGMENT != null
                        ? this.RELEASE_SEGMENT
                        : "stable",
                      p() === !0 ? g.location.origin : ""
                    );
                },
              },
              {
                key: "configLoaded",
                value(a) {
                  (this.configsLoaded[a] = !0),
                    e.trigger(a),
                    this.locks.releaseConfig(a);
                },
              },
            ]);
            return d;
          })();
          l.exports = d;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsFiredEvent", () => {
      return ((g, h, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";

          const a =
              Object.assign ||
              function (a) {
                for (let b = 1; b < arguments.length; b++) {
                  const c = arguments[b];
                  for (const d in c)
                    Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
                }
                return a;
              };

          let b = f.getFbeventsModules("SignalsFBEventsBaseEvent");
          const c = f.getFbeventsModules("SignalsParamList");

          function d(b, d, e) {
            let f = null;
            (b === "GET" || b === "POST" || b === "BEACON") && (f = b);
            b = d instanceof c ? d : null;
            d =
              (typeof e === "undefined" ? "undefined" : i(e)) === "object"
                ? a({}, e)
                : null;
            return f != null && b != null && d != null ? [f, b, d] : null;
          }
          b = new b(d);
          l.exports = b;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsFireLock", () => {
      return ((g, i, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsUtils");
          const b = a.each;
          const c = a.keys;
          a = (() => {
            function a() {
              n(this, a), (this._locks = {}), (this._callbacks = []);
            }
            h(a, [
              {
                key: "lock",
                value(a) {
                  this._locks[a] = !0;
                },
              },
              {
                key: "release",
                value(a) {
                  Object.prototype.hasOwnProperty.call(this._locks, a) &&
                    (delete this._locks[a],
                    c(this._locks).length === 0 &&
                      b(this._callbacks, b => {
                        return b(a);
                      }));
                },
              },
              {
                key: "onUnlocked",
                value(a) {
                  this._callbacks.push(a);
                },
              },
              {
                key: "isLocked",
                value() {
                  return c(this._locks).length > 0;
                },
              },
              {
                key: "lockPlugin",
                value(a) {
                  this.lock("plugin:" + a);
                },
              },
              {
                key: "releasePlugin",
                value(a) {
                  this.release("plugin:" + a);
                },
              },
              {
                key: "lockConfig",
                value(a) {
                  this.lock("config:" + a);
                },
              },
              {
                key: "releaseConfig",
                value(a) {
                  this.release("config:" + a);
                },
              },
              {
                key: "lockConsent",
                value() {
                  this.lock("consent");
                },
              },
              {
                key: "unlockConsent",
                value() {
                  this.release("consent");
                },
              },
            ]);
            return a;
          })();
          a.global = new a();
          l.exports = a;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsGetCustomParametersEvent",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
            const b = f.getFbeventsModules("signalsFBEventsCoercePixel");

            function c(a, c, d) {
              a = b(a);
              c = c != null && typeof c === "string" ? c : null;
              d = d instanceof CustomData ? d : null;
              return a != null && c != null ? [a, c, d] : null;
            }
            a = new a(c);
            k.exports = a;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("signalsFBEventsGetIsChrome", () => {
      return ((f, g, h, i) => {
        const j = {
          exports: {},
        };
        j.exports;
        (() => {
          "use strict";

          function a() {
            const a = f.chrome;
            let b = f.navigator;
            const c = b.vendor;
            const d = f.opr !== void 0;
            const e = b.userAgent.indexOf("Edge") > -1;
            b = b.userAgent.match("CriOS");
            return (
              !b &&
              a !== null &&
              a !== void 0 &&
              c === "Google Inc." &&
              d === !1 &&
              e === !1
            );
          }
          const b = a();

          function c() {
            return b;
          }
          j.exports = c;
        })();
        return j.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "signalsFBEventsGetIsIosInAppBrowser",
      () => {
        return ((f, g, h, i) => {
          const j = {
            exports: {},
          };
          j.exports;
          (() => {
            "use strict";

            function a() {
              let a = f.navigator;
              const b = a.userAgent.indexOf("AppleWebKit");
              const c = a.userAgent.indexOf("FBIOS");
              const d = a.userAgent.indexOf("Instagram");
              a = a.userAgent.indexOf("MessengerLiteForiOS");
              return b !== null && (c != -1 || d != -1 || a != -1);
            }
            const b = a();

            function c() {
              return b;
            }
            j.exports = c;
          })();
          return j.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered(
      "SignalsFBEventsGetIWLParametersEvent",
      () => {
        return ((g, h, j, k) => {
          const l = {
            exports: {},
          };
          l.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsBaseEvent"), b = f.getFbeventsModules("SignalsConvertNodeToHTMLElement"), c = f.getFbeventsModules("signalsFBEventsCoercePixel");

            function d() {
              for (var a = arguments.length, d = Array(a), e = 0; e < a; e++)
                d[e] = arguments[e];
              const f = d[0];
              if (
                f == null ||
                (typeof f === "undefined" ? "undefined" : i(f)) !== "object"
              )
                return null;
              const g = f.unsafePixel, h = f.unsafeTarget, j = c(g), k = h instanceof Node ? b(h) : null;
              return j != null && k != null
                ? [
                    {
                      pixel: j,
                      target: k,
                    },
                  ]
                : null;
            }
            l.exports = new a(d);
          })();
          return l.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("signalsFBEventsInjectMethod", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("signalsFBEventsMakeSafe");

          function b(b, c, d) {
            const e = b[c], f = a(d);
            b[c] = function () {
              for (var a = arguments.length, b = Array(a), c = 0; c < a; c++)
                b[c] = arguments[c];
              const d = e.apply(this, b);
              f.apply(this, b);
              return d;
            };
          }
          k.exports = b;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsIWLBootStrapEvent", () => {
      return ((g, h, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
          const b = f.getFbeventsModules("signalsFBEventsCoercePixelID");

          function c() {
            for (var a = arguments.length, c = Array(a), d = 0; d < a; d++)
              c[d] = arguments[d];
            const e = c[0];
            if (
              e == null ||
              (typeof e === "undefined" ? "undefined" : i(e)) !== "object"
            )
              return null;
            const f = e.graphToken, g = e.pixelID, h = b(g);
            return f != null && typeof f === "string" && h != null
              ? [
                  {
                    graphToken: f,
                    pixelID: h,
                  },
                ]
              : null;
          }
          a = new a(c);
          l.exports = a;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsJSLoader", () => {
      return ((f, g, h, i) => {
        const j = {
          exports: {},
        };
        j.exports;
        (() => {
          "use strict";
          const a = {
            CDN_BASE_URL: "https://connect.facebook.net/",
          };

          function b() {
            const b = g.getElementsByTagName("script");
            for (let c = 0; c < b.length; c++) {
              const d = b[c];
              if (d && d.src && d.src.indexOf(a.CDN_BASE_URL) !== -1) return d;
            }
            return null;
          }

          function c(a) {
            const c = g.createElement("script");
            c.src = a;
            c.async = !0;
            a = b();
            a && a.parentNode
              ? a.parentNode.insertBefore(c, a)
              : g.head && g.head.firstChild && g.head.appendChild(c);
          }
          j.exports = {
            CONFIG: a,
            loadJSFile: c,
          };
        })();
        return j.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsLegacyExperimentGroupsTypedef",
      () => {
        return ((g, h, j, k) => {
          const l = {
            exports: {},
          };
          l.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            const b = a.Typed;
            a.coerce;
            const c = a.enforce;
            a = f.getFbeventsModules("SignalsFBEventsTypeVersioning");
            a = a.upgrade;

            function d(a) {
              return a != null &&
                (typeof a === "undefined" ? "undefined" : i(a)) === "object"
                ? Object.values(a)
                : null;
            }
            const e = a => {
              a = Array.isArray(a) ? a : d(a);
              return c(
                a,
                b.arrayOf(
                  b.objectWithFields({
                    code: b.string(),
                    name: b.string(),
                    passRate: b.number(),
                    range: b.tuple([b.number(), b.number()]),
                  })
                )
              );
            };

            function g(a) {
              const b = a.name, c = a.code, d = a.range;
              a = a.passRate;
              return {
                allocation: d[1] - d[0],
                code: c,
                name: b,
                passRate: a,
              };
            }
            l.exports = a(e, a => {
              return a.map(g);
            });
          })();
          return l.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered(
      "SignalsFBEventsLocalComputationConfigTypedef",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            a = a.Typed;
            a = a.objectWithFields({
              conversionBitMappings: a.arrayOf(
                a.objectWithFields({
                  eventName: a.allowNull(a.string()),
                  conversionBit: a.number(),
                  eventPriority: a.number(),
                  customConversionId: a.allowNull(a.number()),
                  minValueOptimizationBucket: a.allowNull(a.number()),
                  maxValueOptimizationBucket: a.allowNull(a.number()),
                })
              ),
              eventRulesMappings: a.arrayOf(
                a.objectWithFields({
                  ruleGroupId: a.number(),
                  derivedEventName: a.string(),
                  transforms: a.number(),
                  condition: a.string(),
                })
              ),
              customConversionRulesMappings: a.arrayOf(
                a.objectWithFields({
                  conversionId: a.number(),
                  conversionRule: a.string(),
                })
              ),
              currencyRateMappings: a.arrayOf(
                a.objectWithFields({
                  quoteCurrency: a.string(),
                  rate: a.number(),
                })
              ),
            });
            k.exports = a;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsFBEventsLogging", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsUtils");
          const b = a.isArray;
          const c = a.isInstanceOf;
          const d = a.map;
          const e = f.getFbeventsModules("SignalsParamList");
          const h = f.getFbeventsModules("signalsFBEventsSendGET");
          const i = f.getFbeventsModules("SignalsFBEventsJSLoader");
          let j = !1;

          function l() {
            j = !0;
          }
          let m = !0;

          function n() {
            m = !1;
          }
          let o = !1;

          function p() {
            o = !0;
          }
          const q = "console", r = "warn", s = [];

          function t(a) {
            g[q] && g[q][r] && (g[q][r](a), o && s.push(a));
          }
          let u = !1;

          function v() {
            u = !0;
          }

          function w(a) {
            if (u) return;
            t("[Facebook Pixel] - " + a);
          }
          const x = "Facebook Pixel Error",
                y = function () {
                  g.postMessage != null && g.postMessage.apply(g, arguments);
                },
                z = {};

          function A(a) {
            switch (a.type) {
              case "FBQ_NO_METHOD_NAME":
                return "You must provide an argument to fbq().";
              case "INVALID_FBQ_METHOD":
                let b = a.method;
                return "\"fbq('" + b + "', ...);\" is not a valid fbq command.";
              case "INVALID_FBQ_METHOD_PARAMETER":
                b = a.invalidParamName;
                let c = a.invalidParamValue, d = a.method, e = a.params;
                return (
                  "Call to \"fbq('" +
                  d +
                  "', " +
                  C(e) +
                  ');" with parameter "' +
                  b +
                  '" has an invalid value of "' +
                  B(c) +
                  '"'
                );
              case "INVALID_PIXEL_ID":
                d = a.pixelID;
                return "Invalid PixelID: " + d + ".";
              case "DUPLICATE_PIXEL_ID":
                e = a.pixelID;
                return "Duplicate Pixel ID: " + e + ".";
              case "SET_METADATA_ON_UNINITIALIZED_PIXEL_ID":
                b = a.metadataValue;
                c = a.pixelID;
                return (
                  "Trying to set argument " +
                  b +
                  " for uninitialized Pixel ID " +
                  c +
                  "."
                );
              case "CONFLICTING_VERSIONS":
                return "Multiple pixels with conflicting versions were detected on this page.";
              case "MULTIPLE_PIXELS":
                return "Multiple pixels were detected on this page.";
              case "UNSUPPORTED_METADATA_ARGUMENT":
                d = a.metadata;
                return "Unsupported metadata argument: " + d + ".";
              case "REQUIRED_PARAM_MISSING":
                e = a.param;
                b = a.eventName;
                return (
                  "Required parameter '" +
                  e +
                  "' is missing for event '" +
                  b +
                  "'."
                );
              case "INVALID_PARAM":
                c = a.param;
                d = a.eventName;
                return (
                  "Parameter '" + c + "' is invalid for event '" + d + "'."
                );
              case "NO_EVENT_NAME":
                return 'Missing event name. Track events must be logged with an event name fbq("track", eventName)';
              case "NONSTANDARD_EVENT":
                e = a.eventName;
                return (
                  "You are sending a non-standard event '" +
                  e +
                  "'. The preferred way to send these events is using trackCustom. See 'https://developers.facebook.com/docs/ads-for-websites/pixel-events/#events' for more information."
                );
              case "NEGATIVE_EVENT_PARAM":
                b = a.param;
                c = a.eventName;
                return (
                  "Parameter '" + b + "' is negative for event '" + c + "'."
                );
              case "PII_INVALID_TYPE":
                d = a.key_type;
                e = a.key_val;
                return (
                  "An invalid " +
                  d +
                  " was specified for '" +
                  e +
                  "'. This data will not be sent with any events for this Pixel."
                );
              case "PII_UNHASHED_PII":
                b = a.key;
                return (
                  "The value for the '" +
                  b +
                  "' key appeared to be PII. This data will not be sent with any events for this Pixel."
                );
              case "INVALID_CONSENT_ACTION":
                c = a.action;
                return (
                  "\"fbq('" +
                  c +
                  "', ...);\" is not a valid fbq('consent', ...) action. Valid actions are 'revoke' and 'grant'."
                );
              case "INVALID_JSON_LD":
                d = a.jsonLd;
                return (
                  "Unable to parse JSON-LD tag. Malformed JSON found: '" +
                  d +
                  "'."
                );
              case "SITE_CODELESS_OPT_OUT":
                e = a.pixelID;
                return (
                  "Unable to open Codeless events interface for pixel as the site has opted out. Pixel ID: " +
                  e +
                  "."
                );
              case "PIXEL_NOT_INITIALIZED":
                b = a.pixelID;
                return "Pixel " + b + " not found";
              case "UNWANTED_CUSTOM_DATA":
                return "Removed parameters from custom data due to potential violations. Go to Events Manager to learn more.";
              case "UNWANTED_URL_DATA":
                return "Removed URL query parameters due to potential violations.";
              default:
                F(
                  new Error(
                    "INVALID_USER_ERROR - " + a.type + " - " + JSON.stringify(a)
                  )
                );
                return "Invalid User Error.";
            }
          }
          var B = a => {
              if (typeof a === "string") return "'" + a + "'";
              else if (typeof a == "undefined") return "undefined";
              else if (a === null) return "null";
              else if (
                !b(a) &&
                a.constructor != null &&
                a.constructor.name != null
              )
                return a.constructor.name;
              try {
                return JSON.stringify(a) || "undefined";
              } catch (a) {
                return "undefined";
              }
            },
            C = a => {
              return d(a, B).join(", ");
            };

          function D(a, b) {
            try {
              let d = g.fbq.instance.pluginConfig.get(
                null,
                "dataProcessingOptions"
              );
              if (d != null && d.dataPrivacyOptions.includes("LDU")) return;
              d = Math.random();
              const f =
                g.fbq && g.fbq._releaseSegment
                  ? g.fbq._releaseSegment
                  : "unknown";
              if ((m && d < 0.01) || f === "canary") {
                d = new e(null);
                d.append("p", "pixel");
                d.append(
                  "v",
                  g.fbq && g.fbq.version ? g.fbq.version : "unknown"
                );
                d.append("e", a.toString());
                c(a, Error) &&
                  (d.append("f", a.fileName),
                  d.append("s", a.stackTrace || a.stack));
                d.append("ue", b ? "1" : "0");
                d.append("rs", f);
                h(d, {
                  url: i.CONFIG.CDN_BASE_URL + "/log/error",
                  ignoreRequestLengthCheck: !0,
                });
              }
            } catch (a) {}
          }

          function E(a) {
            let b = JSON.stringify(a);
            if (!Object.prototype.hasOwnProperty.call(z, b)) z[b] = !0;
            else return;
            b = A(a);
            w(b);
            y(
              {
                action: "FB_LOG",
                logMessage: b,
                logType: x,
              },
              "*"
            );
            D(new Error(b), !0);
          }

          function F(a) {
            D(a, !1), j && w(a.toString());
          }
          a = {
            consoleWarn: t,
            disableAllLogging: v,
            disableSampling: n,
            enableVerboseDebugLogging: l,
            logError: F,
            logUserError: E,
            enableBufferedLoggedWarnings: p,
            bufferedLoggedWarnings: s,
          };
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsMakeSafe", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsLogging"), b = a.logError;

          function c(a) {
            return function () {
              try {
                for (var c = arguments.length, d = Array(c), e = 0; e < c; e++)
                  d[e] = arguments[e];
                a.apply(this, d);
              } catch (a) {
                b(a);
              }
              return;
            };
          }
          k.exports = c;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsMicrodataConfigTypedef",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            a = a.Typed;
            a = a.objectWithFields({
              waitTimeMs: a.withValidation({
                def: a.number(),
                validators: [
                  a => {
                    return a > 0 && a < 1e4;
                  },
                ],
              }),
            });
            k.exports = a;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsFBEventsMobileAppBridge", () => {
      return ((g, h, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsTelemetry"),
                b = f.getFbeventsModules("SignalsFBEventsUtils"),
                c = b.each,
                d = "fbmq-0.1",
                e = {
                  AddPaymentInfo: "fb_mobile_add_payment_info",
                  AddToCart: "fb_mobile_add_to_cart",
                  AddToWishlist: "fb_mobile_add_to_wishlist",
                  CompleteRegistration: "fb_mobile_complete_registration",
                  InitiateCheckout: "fb_mobile_initiated_checkout",
                  Other: "other",
                  Purchase: "fb_mobile_purchase",
                  Search: "fb_mobile_search",
                  ViewContent: "fb_mobile_content_view",
                },
                h = {
                  content_ids: "fb_content_id",
                  content_type: "fb_content_type",
                  currency: "fb_currency",
                  num_items: "fb_num_items",
                  search_string: "fb_search_string",
                  value: "_valueToSum",
                  contents: "fb_content",
                },
                j = {};

          function k(a) {
            return "fbmq_" + a[1];
          }

          function m(a) {
            if (
              Object.prototype.hasOwnProperty.call(j, [0]) &&
              Object.prototype.hasOwnProperty.call(j[a[0]], a[1])
            )
              return !0;
            let b = g[k(a)];
            b = b && b.getProtocol.call && b.getProtocol() === d ? b : null;
            b !== null && ((j[a[0]] = j[a[0]] || {}), (j[a[0]][a[1]] = b));
            return b !== null;
          }

          function n(a) {
            const b = [];
            a = j[a.id] || {};
            for (const c in a)
              Object.prototype.hasOwnProperty.call(a, c) && b.push(a[c]);
            return b;
          }

          function o(a) {
            return n(a).length > 0;
          }

          function p(a) {
            return Object.prototype.hasOwnProperty.call(e, a) ? e[a] : a;
          }

          function q(a) {
            return Object.prototype.hasOwnProperty.call(h, a) ? h[a] : a;
          }

          function r(a) {
            if (typeof a === "string") return a;
            if (typeof a === "number") return isNaN(a) ? void 0 : a;
            try {
              return JSON.stringify(a);
            } catch (a) {}
            return a.toString && a.toString.call ? a.toString() : void 0;
          }

          function s(a) {
            const b = {};
            if (
              a != null &&
              (typeof a === "undefined" ? "undefined" : i(a)) === "object"
            )
              for (const c in a)
                if (Object.prototype.hasOwnProperty.call(a, c)) {
                  const d = r(a[c]);
                  d != null && (b[q(c)] = d);
                }
            return b;
          }
          let t = 0;

          function u() {
            const b = t;
            t = 0;
            a.logMobileNativeForwarding(b);
          }

          function v(a, b, d) {
            c(n(a), c => {
              return c.sendEvent(a.id, p(b), JSON.stringify(s(d)));
            }),
              t++,
              setTimeout(u, 0);
          }
          l.exports = {
            pixelHasActiveBridge: o,
            registerBridge: m,
            sendEvent: v,
          };
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsNetworkConfig", () => {
      return ((f, g, h, i) => {
        const j = {
          exports: {},
        };
        j.exports;
        (() => {
          "use strict";
          const a = {
            ENDPOINT: "https://www.facebook.com/tr/",
          };
          j.exports = a;
        })();
        return j.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsOpenBridgeConfigTypedef",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            const b = a.Typed;
            a.coerce;
            a = b.objectWithFields({
              endpoints: b.arrayOf(
                b.objectWithFields({
                  targetDomain: b.allowNull(b.string()),
                  endpoint: b.allowNull(b.string()),
                })
              ),
            });
            k.exports = a;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsFBEventsOptIn", () => {
      return ((g, i, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsUtils");
          const b = a.each;
          const c = a.filter;
          const d = a.keys;
          const e = a.some;

          function g(a) {
            b(d(a), b => {
              if (
                e(a[b], b => {
                  return Object.prototype.hasOwnProperty.call(a, b);
                })
              )
                throw new Error(
                  "Circular subOpts are not allowed. " +
                    b +
                    " depends on another subOpt"
                );
            });
          }
          a = (() => {
            function a() {
              const b =
                arguments.length > 0 && arguments[0] !== void 0
                  ? arguments[0]
                  : {};
              n(this, a);
              this._opts = {};
              this._subOpts = b;
              g(this._subOpts);
            }
            h(a, [
              {
                key: "_getOpts",
                value(a) {
                  return [].concat(
                    m(
                      Object.prototype.hasOwnProperty.call(this._subOpts, a)
                        ? this._subOpts[a]
                        : []
                    ),
                    [a]
                  );
                },
              },
              {
                key: "_setOpt",
                value(a, b, c) {
                  b = this._opts[b] || (this._opts[b] = {});
                  b[a] = c;
                },
              },
              {
                key: "optIn",
                value(a, c) {
                  const d = this,
                        e =
                          arguments.length > 2 && arguments[2] !== void 0
                            ? arguments[2]
                            : !1;
                  b(this._getOpts(c), b => {
                    const f = e == !0 && d.isOptedOut(a, c);
                    f || d._setOpt(a, b, !0);
                  });
                  return this;
                },
              },
              {
                key: "optOut",
                value(a, c) {
                  const d = this;
                  b(this._getOpts(c), b => {
                    return d._setOpt(a, b, !1);
                  });
                  return this;
                },
              },
              {
                key: "isOptedIn",
                value(a, b) {
                  return this._opts[b] != null && this._opts[b][a] === !0;
                },
              },
              {
                key: "isOptedOut",
                value(a, b) {
                  return this._opts[b] != null && this._opts[b][a] === !1;
                },
              },
              {
                key: "listPixelIds",
                value(a) {
                  const b = this._opts[a];
                  return b != null
                    ? c(d(b), a => {
                        return b[a] === !0;
                      })
                    : [];
                },
              },
            ]);
            return a;
          })();
          l.exports = a;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsParallelFireConfigTypedef",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            a = a.Typed;
            a = a.objectWithFields({
              target: a.string(),
            });
            k.exports = a;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsFBEventsPIIAutomatchedEvent", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
          const b = f.getFbeventsModules("signalsFBEventsCoercePixel");

          function c(a) {
            a = b(a);
            return a != null ? [a] : null;
          }
          a = new a(c);
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsPIIConflictingEvent", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
          const b = f.getFbeventsModules("signalsFBEventsCoercePixel");

          function c(a) {
            a = b(a);
            return a != null ? [a] : null;
          }
          a = new a(c);
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsPIIInvalidatedEvent", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsBaseEvent"), b = f.getFbeventsModules("signalsFBEventsCoercePixel");

          function c(a) {
            a = b(a);
            return a != null ? [a] : null;
          }
          k.exports = new a(c);
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsPlugin", () => {
      return ((f, g, h, i) => {
        const j = {
          exports: {},
        };
        j.exports;
        (() => {
          "use strict";
          const a = function a(b) {
            n(this, a),
              (this.__fbEventsPlugin = 1),
              (this.plugin = b),
              (this.__fbEventsPlugin = 1);
          };
          j.exports = a;
        })();
        return j.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsPluginLoadedEvent", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsBaseEvent");

          function b(a) {
            a = a != null && typeof a === "string" ? a : null;
            return a != null ? [a] : null;
          }
          k.exports = new a(b);
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsPluginManager", () => {
      return ((g, j, k, l) => {
        const m = {
          exports: {},
        };
        m.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsConfigStore");
          let b = f.getFbeventsModules("SignalsFBEventsEvents");
          const c = b.pluginLoaded;
          const d = f.getFbeventsModules("SignalsFBEventsJSLoader");
          b = f.getFbeventsModules("SignalsFBEventsLogging");
          const e = b.logError, g = f.getFbeventsModules("SignalsFBEventsPlugin");

          function j(a) {
            return "fbevents.plugins." + a;
          }

          function k(a, b) {
            if (a === "fbevents") return new g(() => {});
            if (b instanceof g) return b;
            if (
              b == null ||
              (typeof b === "undefined" ? "undefined" : i(b)) !== "object"
            ) {
              e(new Error("Invalid plugin registered " + a));
              return new g(() => {});
            }
            const c = b.__fbEventsPlugin;
            b = b.plugin;
            if (c !== 1 || typeof b !== "function") {
              e(new Error("Invalid plugin registered " + a));
              return new g(() => {});
            }
            return new g(b);
          }
          b = (() => {
            function b(a, c) {
              n(this, b),
                (this._loadedPlugins = {}),
                (this._instance = a),
                (this._lock = c);
            }
            h(b, [
              {
                key: "registerPlugin",
                value(b, d) {
                  if (
                    Object.prototype.hasOwnProperty.call(this._loadedPlugins, b)
                  )
                    return;
                  this._loadedPlugins[b] = k(b, d);
                  this._loadedPlugins[b].plugin(f, this._instance, a);
                  c.trigger(b);
                  this._lock.releasePlugin(b);
                },
              },
              {
                key: "loadPlugin",
                value(a) {
                  if (/^[a-zA-Z]\w+$/.test(a) === !1)
                    throw new Error("Invalid plugin name: " + a);
                  const b = j(a);
                  if (this._loadedPlugins[b]) return !0;
                  if (f.fbIsModuleLoaded(b)) {
                    this.registerPlugin(b, f.getFbeventsModules(b));
                    return !0;
                  }
                  a =
                    d.CONFIG.CDN_BASE_URL +
                    "signals/plugins/" +
                    a +
                    ".js?v=" +
                    f.version;
                  if (!this._loadedPlugins[b]) {
                    this._lock.lockPlugin(b);
                    d.loadJSFile(a);
                    return !0;
                  }
                  return !1;
                },
              },
            ]);
            return b;
          })();
          m.exports = b;
        })();
        return m.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsProhibitedSourcesTypedef",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            let a = f.getFbeventsModules("SignalsFBEventsTyped");
            const b = a.Typed;
            a.coerce;
            a = b.objectWithFields({
              prohibitedSources: b.arrayOf(
                b.objectWithFields({
                  domain: b.allowNull(b.string()),
                })
              ),
            });
            k.exports = a;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsFBEventsQE", () => {
      return ((i, j, k, l) => {
        const m = {
          exports: {},
        };
        m.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsExperimentsTypedef");

          const b = f.getFbeventsModules(
            "SignalsFBEventsLegacyExperimentGroupsTypedef"
          );

          const c = f.getFbeventsModules("SignalsFBEventsTypeVersioning");
          let d = f.getFbeventsModules("SignalsFBEventsTyped");
          const e = d.coerce;
          d = f.getFbeventsModules("SignalsFBEventsUtils");
          const i = d.reduce,
                j = () => {
                  return Math.random();
                };

          function k(a) {
            const b = i(
                      a,
                      (b, c, a) => {
                        if (a === 0) {
                          b.push([0, c.allocation]);
                          return b;
                        }
                        a = g(b[a - 1], 2);
                        a[0];
                        a = a[1];
                        b.push([a, a + c.allocation]);
                        return b;
                      },
                      []
                    ),
                  c = j();
            for (let d = 0; d < a.length; d++) {
              let e = a[d];
              const f = e.passRate;
              const h = e.code;
              e = e.name;
              let k = g(b[d], 2), l = k[0];
              k = k[1];
              if (c >= l && c < k) {
                l = j() < f;
                return {
                  code: h + (l ? "1" : "0"),
                  isInExperimentGroup: l,
                  name: e,
                };
              }
            }
            return null;
          }
          d = (() => {
            function d() {
              n(this, d), (this._result = null), (this._hasRolled = !1);
            }
            h(d, [
              {
                key: "setExperiments",
                value(d) {
                  d = e(d, c.waterfall([b, a]));
                  d != null &&
                    ((this._experiments = d),
                    (this._hasRolled = !1),
                    (this._result = null));
                },
              },
              {
                key: "get",
                value(a) {
                  if (!this._hasRolled) {
                    let b = this._experiments;
                    if (b == null) return null;
                    b = k(b);
                    b != null && (this._result = b);
                    this._hasRolled = !0;
                  }
                  if (a == null || a === "") return this._result;
                  return this._result != null && this._result.name === a
                    ? this._result
                    : null;
                },
              },
              {
                key: "getCustomDataPayload",
                value() {
                  const a = this.get();
                  return a == null
                    ? {}
                    : {
                        exp: a.code,
                      };
                },
              },
              {
                key: "isInTestOrControl",
                value(a) {
                  const b = this.get();
                  return b != null && b.name === a;
                },
              },
              {
                key: "isInTest",
                value(a) {
                  const b = this.get();
                  return b != null && b.name === a && b.isInExperimentGroup;
                },
              },
            ]);
            return d;
          })();
          m.exports = new d();
        })();
        return m.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "signalsFBEventsResolveLegacyArguments",
      () => {
        return ((f, h, j, k) => {
          const l = {
            exports: {},
          };
          l.exports;
          (() => {
            "use strict";
            const a = "report";

            function b(a) {
              let b = g(a, 1);
              b = b[0];
              return a.length === 1 && Array.isArray(b)
                ? {
                    args: b,
                    isLegacySyntax: !0,
                  }
                : {
                    args: a,
                    isLegacySyntax: !1,
                  };
            }

            function c(b) {
              let c = g(b, 2), d = c[0];
              c = c[1];
              if (typeof d === "string" && d.slice(0, a.length) === a) {
                d = d.slice(a.length);
                if (d === "CustomEvent") {
                  c != null &&
                    (typeof c === "undefined" ? "undefined" : i(c)) ===
                      "object" &&
                    typeof c.event === "string" &&
                    (d = c.event);
                  return ["trackCustom", d].concat(b.slice(1));
                }
                return ["track", d].concat(b.slice(1));
              }
              return b;
            }

            function d(a) {
              a = b(a);
              let d = a.args;
              a = a.isLegacySyntax;
              d = c(d);
              return {
                args: d,
                isLegacySyntax: a,
              };
            }
            l.exports = d;
          })();
          return l.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("signalsFBEventsSendBatch", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsBatcher");
          let b = f.getFbeventsModules("SignalsFBEventsLogging");
          const c = b.logError;
          b = f.getFbeventsModules("SignalsFBEventsUtils");
          const d = b.map, e = f.getFbeventsModules("SignalsParamList"), h = f.getFbeventsModules("signalsFBEventsSendBeacon"), i = f.getFbeventsModules("signalsFBEventsSendGET"), j = f.getFbeventsModules("signalsFBEventsSendXHR");

          function l(a) {
            a = d(a, a => {
              return a.toQueryString();
            });
            a = new e().appendHash({
              batch: 1,
              events: a,
            });
            a =
              i(a) ||
              h(a) ||
              j(a) ||
              i(a, {
                ignoreRequestLengthCheck: !0,
              });
            a || c(new Error("could not send batch"));
          }
          const m = new a(l);

          function n(a) {
            m.addToBatch(a);
          }
          g.addEventListener("unload", () => {
            return m.forceEndBatch();
          });
          k.exports = n;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsSendBeacon", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsQE"), b = f.getFbeventsModules("SignalsFBEventsNetworkConfig"), c = f.getFbeventsModules("SignalsFBEventsExperimentNames"), d = c.SEND_BEACON_STRING_EXPERIMENT;

          function e(c, e) {
            if (!g.navigator || !g.navigator.sendBeacon) return !1;
            e = e || {};
            e = e.url;
            e = e === void 0 ? b.ENDPOINT : e;
            c.replaceEntry("rqm", "SB");
            return a.isInTest(d)
              ? g.navigator.sendBeacon(e, c.toQueryString())
              : g.navigator.sendBeacon(e, c.toFormData());
          }
          k.exports = e;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsSendEvent", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsEvents");
          const b = a.fired;
          const c = a.setEventId;
          const d = f.getFbeventsModules("SignalsFBEventsQE");
          const e = f.getFbeventsModules("SignalsParamList");
          const j = f.getFbeventsModules("signalsFBEventsSendBatch");
          const l = f.getFbeventsModules("signalsFBEventsSendBeacon");
          const m = f.getFbeventsModules("signalsFBEventsSendGET");
          const n = f.getFbeventsModules("signalsFBEventsSendXHR");
          const o = f.getFbeventsModules("signalsFBEventsSendFormPOST");
          const p = f.getFbeventsModules("signalsFBEventsGetIsChrome");
          a = f.getFbeventsModules("SignalsFBEventsExperimentNames");
          const q = a.BATCHING_EXPERIMENT, r = a.SEND_BEACON_STRING_EXPERIMENT, s = a.SEND_XHR_EXPERIMENT, t = g.top !== g, u = "SubscribedButtonClick";

          function v(a) {
            const b = a.customData;
            const c = a.customParams;
            const f = a.eventName;
            const j = a.id;
            const k = a.piiTranslator;
            let l = a.documentLink;
            const m = a.referrerLink;
            let n = i.href;
            Object.prototype.hasOwnProperty.call(a, "documentLink") && (n = l);
            l = h.referrer;
            Object.prototype.hasOwnProperty.call(a, "referrerLink") && (l = m);
            a = new e(k);
            a.append("id", j);
            a.append("ev", f);
            a.append("dl", n);
            a.append("rl", l);
            a.append("if", t);
            a.append("ts", new Date().valueOf());
            a.append("cd", b);
            a.append("sw", g.screen.width);
            a.append("sh", g.screen.height);
            c && a.addRange(c);
            a.appendHash(d.getCustomDataPayload());
            return a;
          }

          function w(a) {
            const e = a.customData, f = a.eventName, g = v(a);
            c.trigger(a.id, g);
            if (d.isInTest(q)) {
              j(g);
              b.trigger("BATCH", g, e);
              return;
            }
            a = d.isInTestOrControl(r) || !p();
            if (a && f === u && l(g)) {
              b.trigger("BEACON", g, e);
              return;
            }
            if (m(g)) {
              b.trigger("GET", g, e);
              return;
            }
            if (a && l(g)) {
              b.trigger("BEACON", g, e);
              return;
            }
            if (d.isInTest(s)) {
              if (n(g)) {
                b.trigger("XHR", g, e);
                return;
              }
              m(g, {
                ignoreRequestLengthCheck: !0,
              });
              b.trigger("FGET", g, e);
              return;
            }
            o(g);
            b.trigger("POST", g, e);
          }
          k.exports = w;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsSendFormPOST", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsNetworkConfig"), b = f.getFbeventsModules("SignalsFBEventsUtils"), c = b.listenOnce;

          function d(b, d) {
            b.replaceEntry("rqm", "formPOST");
            const e = "fb" + Math.random().toString().replace(".", ""), f = h.createElement("form");
            f.method = "post";
            f.action = d != null ? d : a.ENDPOINT;
            f.target = e;
            f.acceptCharset = "utf-8";
            f.style.display = "none";
            d = !!(g.attachEvent && !g.addEventListener);
            const i = h.createElement("iframe");
            d && (i.name = e);
            i.src = "about:blank";
            i.id = e;
            i.name = e;
            f.appendChild(i);
            c(i, "load", () => {
              b.each((a, b) => {
                const c = h.createElement("input");
                c.name = decodeURIComponent(a);
                c.value = b;
                f.appendChild(c);
              }),
                c(i, "load", () => {
                  f.parentNode && f.parentNode.removeChild(f);
                }),
                f.submit();
            });
            h.body != null && h.body.appendChild(f);
            return !0;
          }
          k.exports = d;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsSendGET", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsNetworkConfig"), b = 2048;

          function c(c, d) {
            let e = d || {}, f = e.ignoreRequestLengthCheck;
            f = f === void 0 ? !1 : f;
            e = e.url;
            e = e === void 0 ? a.ENDPOINT : e;
            c.replaceEntry("rqm", f ? "FGET" : "GET");
            c = c.toQueryString();
            e = e + "?" + c;
            if (f || e.length < b) {
              c = new Image();
              d != null &&
                d.errorHandler != null &&
                (c.onerror = d.errorHandler);
              c.src = e;
              return !0;
            }
            return !1;
          }
          k.exports = c;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsSendXHR", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsNetworkConfig"),
                b = f.getFbeventsModules("SignalsParamList"),
                c = f.getFbeventsModules("SignalsFBEventsLogging"),
                d = c.logError,
                e = {
                  UNSENT: 0,
                  OPENED: 1,
                  HEADERS_RECEIVED: 2,
                  LOADING: 3,
                  DONE: 4,
                },
                g =
                  typeof XMLHttpRequest !== "undefined" &&
                  "withCredentials" in new XMLHttpRequest();

          function h(a, b, c) {
            const f = new XMLHttpRequest();
            f.withCredentials = !0;
            f.open("POST", b);
            f.onreadystatechange = () => {
              if (f.readyState !== e.DONE) return;
              f.status !== 200 &&
                (c != null
                  ? c()
                  : d(
                      new Error(
                        "Error sending XHR " + f.status + " - " + f.statusText
                      )
                    ));
            };
            f.send(a);
          }

          function i(c) {
            const d =
                      arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : a.ENDPOINT,
                  e = arguments[2];
            if (!g) return !1;
            c instanceof b && c.replaceEntry("rqm", "xhr");
            const f = c instanceof b ? c.toFormData() : c;
            h(f, d, e);
            return !0;
          }
          k.exports = i;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsSetEventIDEvent", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
          const b = f.getFbeventsModules("SignalsParamList");
          const c = f.getFbeventsModules("signalsFBEventsCoercePixel");

          function d(a, d) {
            a = c(a);
            d = d instanceof b ? d : null;
            return a != null && d != null ? [a, d] : null;
          }
          a = new a(d);
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsSetIWLExtractorsEvent",
      () => {
        return ((g, h, j, k) => {
          const l = {
            exports: {},
          };
          l.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
            let b = f.getFbeventsModules("SignalsFBEventsUtils");
            const c = b.filter;
            const d = b.map;

            const e = f.getFbeventsModules(
              "signalsFBEventsCoerceParameterExtractors"
            );

            const g = f.getFbeventsModules("signalsFBEventsCoercePixelID");

            function h() {
              for (var a = arguments.length, b = Array(a), f = 0; f < a; f++)
                b[f] = arguments[f];
              const h = b[0];
              if (
                h == null ||
                (typeof h === "undefined" ? "undefined" : i(h)) !== "object"
              )
                return null;
              const j = h.pixelID, k = h.extractors, l = g(j), m = Array.isArray(k) ? d(k, e) : null, n = m != null ? c(m, Boolean) : null;
              return n != null &&
                m != null &&
                n.length === m.length &&
                l != null
                ? [
                    {
                      extractors: n,
                      pixelID: l,
                    },
                  ]
                : null;
            }
            b = new a(h);
            l.exports = b;
          })();
          return l.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsFBEventsTelemetry", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("SignalsFBEventsLogging"), b = f.getFbeventsModules("SignalsParamList");
          f.getFbeventsModules("SignalsFBEventsQE");
          const c = f.getFbeventsModules("signalsFBEventsSendGET");
          f.getFbeventsModules("signalsFBEventsSendXHR");
          f.getFbeventsModules("signalsFBEventsSendBeacon");
          let d = f.getFbeventsModules("SignalsFBEventsExperimentNames");
          d.SEND_BEACON_STRING_EXPERIMENT;
          d = 0.01;
          const e = Math.random(),
                h =
                  g.fbq && g.fbq._releaseSegment
                    ? g.fbq._releaseSegment
                    : "unknown",
                i = e < d || h === "canary",
                j = "https://connect.facebook.net/log/fbevents_telemetry/";

          function l(d) {
            const e =
                      arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : 0,
                  f =
                    arguments.length > 2 && arguments[2] !== void 0
                      ? arguments[2]
                      : !1;
            if (!f && !i) return;
            try {
              const k = new b(null);
              k.append("v", g.fbq && g.fbq.version ? g.fbq.version : "unknown");
              k.append("rs", h);
              k.append("e", d);
              k.append("p", e);
              c(k, {
                ignoreRequestLengthCheck: !0,
                url: j,
              });
            } catch (b) {
              a.logError(b);
            }
          }

          function m(a) {
            l("FBMQ_FORWARDED", a, !0);
          }
          k.exports = {
            logMobileNativeForwarding: m,
          };
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsTyped", () => {
      return ((g, h, m, d) => {
        const e = {
          exports: {},
        };
        e.exports;
        (() => {
          "use strict";

          const a =
              Object.assign ||
              function (a) {
                for (let b = 1; b < arguments.length; b++) {
                  const c = arguments[b];
                  for (const d in c)
                    Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
                }
                return a;
              };

          let b = f.getFbeventsModules("SignalsFBEventsUtils");
          b.filter;
          b.map;
          const c = b.reduce;
          b = f.getFbeventsModules("SignalsFBEventsUtils");
          const d = b.isSafeInteger,
                g = (b => {
                  k(a, b);

                  function a() {
                    const b =
                      arguments.length > 0 && arguments[0] !== void 0
                        ? arguments[0]
                        : "";
                    n(this, a);
                    const c = j(
                      this,
                      (a.__proto__ || Object.getPrototypeOf(a)).call(this, b)
                    );
                    c.name = "FBEventsCoercionError";
                    return c;
                  }
                  return a;
                })(Error);

          function h(a) {
            return Object.values(a);
          }

          function m() {
            return a => {
              if (typeof a !== "boolean") throw new g();
              return a;
            };
          }

          function o() {
            return a => {
              if (typeof a !== "number") throw new g();
              return a;
            };
          }

          function p() {
            return a => {
              if (typeof a !== "string") throw new g();
              return a;
            };
          }

          function q() {
            return a => {
              if (
                (typeof a === "undefined" ? "undefined" : i(a)) !== "object" ||
                Array.isArray(a) ||
                a == null
              )
                throw new g();
              return a;
            };
          }

          function r() {
            return a => {
              if (a == null || !Array.isArray(a)) throw new g();
              return a;
            };
          }

          function s(a) {
            return b => {
              if (h(a).includes(b)) return b;
              throw new g();
            };
          }

          function t(a) {
            return b => {
              return y(b, F.array()).map(a);
            };
          }

          function u(b) {
            return e => {
              const d = y(e, F.object());
              return c(
                Object.keys(d),
                (c, e) => {
                  return a({}, c, l({}, e, b(d[e])));
                },
                {}
              );
            };
          }

          function v(a) {
            return b => {
              return b == null ? null : a(b);
            };
          }

          function w(b) {
            return e => {
              const d = y(e, F.object());
              e = c(
                Object.keys(b),
                (c, e) => {
                  if (c == null) return null;
                  let f = b[e];
                  const g = d[e];
                  f = f(g);
                  return a({}, c, l({}, e, f));
                },
                {}
              );
              return e;
            };
          }

          function x(a, b) {
            try {
              return b(a);
            } catch (a) {
              if (a.name === "FBEventsCoercionError") return null;
              throw a;
            }
          }

          function y(a, b) {
            return b(a);
          }

          function z(a) {
            return b => {
              b = y(b, F.string());
              if (a.test(b)) return b;
              throw new g();
            };
          }

          function A(a) {
            if (!a) throw new g();
          }

          function B(a) {
            return b => {
              b = y(b, r());
              A(b.length === a.length);
              return b.map((b, c) => {
                return y(b, a[c]);
              });
            };
          }

          function C(a) {
            const b = a.def, c = a.validators;
            return a => {
              const d = y(a, b);
              c.forEach(a => {
                if (!a(d)) throw new g();
              });
              return d;
            };
          }
          const D = /^[1-9][0-9]{0,25}$/;

          function E() {
            return C({
              def(a) {
                const b = x(a, F.number());
                if (b != null) {
                  F.assert(d(b));
                  return "" + b;
                }
                return y(a, F.string());
              },
              validators: [
                a => {
                  return D.test(a);
                },
              ],
            });
          }
          var F = {
            allowNull: v,
            array: r,
            arrayOf: t,
            assert: A,
            boolean: m,
            enumeration: s,
            fbid: E,
            mapOf: u,
            matches: z,
            number: o,
            object: q,
            objectWithFields: w,
            string: p,
            tuple: B,
            withValidation: C,
          };
          e.exports = {
            Typed: F,
            coerce: x,
            enforce: y,
            FBEventsCoercionError: g,
          };
        })();
        return e.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsTypeVersioning", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          let a = f.getFbeventsModules("SignalsFBEventsTyped");
          a.coerce;
          const b = a.enforce, c = a.FBEventsCoercionError;

          function d(a) {
            return d => {
              for (let e = 0; e < a.length; e++) {
                const f = a[e];
                try {
                  return b(d, f);
                } catch (a) {
                  if (a.name === "FBEventsCoercionError") continue;
                  throw a;
                }
              }
              throw new c();
            };
          }

          function e(a, c) {
            return d => {
              return c(b(d, a));
            };
          }
          a = {
            waterfall: d,
            upgrade: e,
          };
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsUnwantedDataTypedef", () => {
      return ((g, h, i, j) => {
        const k = {
          exports: {},
        };
        k.exports;
        (() => {
          "use strict";
          let a = f.getFbeventsModules("SignalsFBEventsTyped");
          const b = a.Typed;
          a.coerce;
          a = b.objectWithFields({
            blacklisted_keys: b.allowNull(
              b.mapOf(b.mapOf(b.arrayOf(b.string())))
            ),
            sensitive_keys: b.allowNull(
              b.mapOf(b.mapOf(b.arrayOf(b.string())))
            ),
          });
          k.exports = a;
        })();
        return k.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsUtils", () => {
      return ((f, g, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          const a = Object.prototype.toString, b = !("addEventListener" in g);

          function c(a, b) {
            return b != null && a instanceof b;
          }

          function d(b) {
            return Array.isArray
              ? Array.isArray(b)
              : a.call(b) === "[object Array]";
          }

          function e(a) {
            return (
              typeof a === "number" ||
              (typeof a === "string" && /^\d+$/.test(a))
            );
          }

          function f(a) {
            return (
              a != null &&
              (typeof a === "undefined" ? "undefined" : i(a)) === "object" &&
              d(a) === !1
            );
          }

          function j(a) {
            return (
              f(a) === !0 &&
              Object.prototype.toString.call(a) === "[object Object]"
            );
          }

          function k(a) {
            if (j(a) === !1) return !1;
            a = a.constructor;
            if (typeof a !== "function") return !1;
            a = a.prototype;
            if (j(a) === !1) return !1;
            return Object.prototype.hasOwnProperty.call(a, "isPrototypeOf") ===
              !1
              ? !1
              : !0;
          }
          const m =
            Number.isInteger ||
            (a => {
              return (
                typeof a === "number" && isFinite(a) && Math.floor(a) === a
              );
            });

          function o(a) {
            return m(a) && a >= 0 && a <= Number.MAX_SAFE_INTEGER;
          }

          function p(a, c, d) {
            const e = b ? "on" + c : c;
            c = b ? a.attachEvent : a.addEventListener;
            const f = b ? a.detachEvent : a.removeEventListener,
                  g = function b() {
                    f && f.call(a, e, b, !1), d();
                  };
            c && c.call(a, e, g, !1);
          }
          const q = Object.prototype.hasOwnProperty,
                r = !{
                  toString: null,
                }.propertyIsEnumerable("toString"),
                s = [
                  "toString",
                  "toLocaleString",
                  "valueOf",
                  "hasOwnProperty",
                  "isPrototypeOf",
                  "propertyIsEnumerable",
                  "constructor",
                ],
                t = s.length;

          function u(a) {
            if (
              (typeof a === "undefined" ? "undefined" : i(a)) !== "object" &&
              (typeof a !== "function" || a === null)
            )
              throw new TypeError("Object.keys called on non-object");
            const b = [];
            for (const c in a) q.call(a, c) && b.push(c);
            if (r) for (let d = 0; d < t; d++) q.call(a, s[d]) && b.push(s[d]);
            return b;
          }

          function v(a, b) {
            if (a == null) throw new TypeError(" array is null or not defined");
            a = Object(a);
            const c = a.length >>> 0;
            if (typeof b !== "function")
              throw new TypeError(b + " is not a function");
            const d = new Array(c);
            let e = 0;
            while (e < c) {
              let f;
              e in a && ((f = a[e]), (f = b(f, e, a)), (d[e] = f));
              e++;
            }
            return d;
          }

          function w(a, b, c) {
            if (a == null) throw new TypeError(" array is null or not defined");
            if (typeof b !== "function")
              throw new TypeError(b + " is not a function");
            const d = Object(a);
            const e = d.length >>> 0;
            let f = 0;
            if (c != null) c = c;
            else {
              while (f < e && !(f in d)) f++;
              if (f >= e)
                throw new TypeError(
                  "Reduce of empty array with no initial value"
                );
              c = d[f++];
            }
            while (f < e) f in d && (c = b(c, d[f], f, a)), f++;
            return c;
          }

          function x(a) {
            if (typeof a !== "function") throw new TypeError();
            const b = Object(this), c = b.length >>> 0, d = arguments.length >= 2 ? arguments[1] : void 0;
            for (let e = 0; e < c; e++)
              if (e in b && a.call(d, b[e], e, b)) return !0;
            return !1;
          }

          function y(a) {
            return u(a).length === 0;
          }

          function z(a) {
            if (this === void 0 || this === null) throw new TypeError();
            const b = Object(this), c = b.length >>> 0;
            if (typeof a !== "function") throw new TypeError();
            const d = [], e = arguments.length >= 2 ? arguments[1] : void 0;
            for (let f = 0; f < c; f++)
              if (f in b) {
                const g = b[f];
                a.call(e, g, f, b) && d.push(g);
              }
            return d;
          }

          function A(a, b) {
            try {
              return b(a);
            } catch (a) {
              if (a instanceof TypeError)
                if (B.test(a)) return null;
                else if (C.test(a)) return void 0;
              throw a;
            }
          }
          var B = /^null | null$|^[^(]* null /i,
            C = /^undefined | undefined$|^[^(]* undefined /i;
          A["default"] = A;
          let D = (() => {
            function a(b) {
              n(this, a), (this.items = b || []);
            }
            h(a, [
              {
                key: "has",
                value(a) {
                  return x.call(this.items, b => {
                    return b === a;
                  });
                },
              },
              {
                key: "add",
                value(a) {
                  this.items.push(a);
                },
              },
            ]);
            return a;
          })();

          function E(a) {
            return a;
          }

          function F(a, b) {
            return a == null || b == null ? !1 : a.indexOf(b) >= 0;
          }

          function G(a, b) {
            return a == null || b == null ? !1 : a.indexOf(b) === 0;
          }
          D = {
            FBSet: D,
            castTo: E,
            each(a, b) {
              v.call(this, a, b);
            },
            filter(a, b) {
              return z.call(a, b);
            },
            idx: A,
            isArray: d,
            isEmptyObject: y,
            isInstanceOf: c,
            isInteger: m,
            isNumber: e,
            isObject: f,
            isPlainObject: k,
            isSafeInteger: o,
            keys: u,
            listenOnce: p,
            map: v,
            reduce: w,
            some(a, b) {
              return x.call(a, b);
            },
            stringIncludes: F,
            stringStartsWith: G,
          };
          l.exports = D;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEventsValidateCustomParametersEvent",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
            let b = f.getFbeventsModules("SignalsFBEventsTyped");
            const c = b.coerce;
            const d = b.Typed;
            const e = f.getFbeventsModules("signalsFBEventsCoercePixel");
            b = f.getFbeventsModules("SignalsFBEventsCoercePrimitives");
            b.coerceString;

            function g() {
              for (var a = arguments.length, b = Array(a), f = 0; f < a; f++)
                b[f] = arguments[f];
              return c(d.tuple([e, d.object(), d.string()]), b);
            }
            b = new a(g);
            k.exports = b;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered(
      "SignalsFBEventsValidateUrlParametersEvent",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsBaseEvent");
            let b = f.getFbeventsModules("SignalsFBEventsTyped");
            const c = b.coerce;
            const d = b.Typed;
            const e = f.getFbeventsModules("signalsFBEventsCoercePixel");
            b = f.getFbeventsModules("SignalsFBEventsCoercePrimitives");
            b.coerceString;

            function g() {
              for (var a = arguments.length, b = Array(a), f = 0; f < a; f++)
                b[f] = arguments[f];
              return c(d.tuple([e, d.object(), d.string()]), b);
            }
            b = new a(g);
            k.exports = b;
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    f.ensureModuleRegistered("SignalsParamList", () => {
      return ((f, g, j, k) => {
        const l = {
          exports: {},
        };
        l.exports;
        (() => {
          "use strict";
          const a = "deep", b = "shallow";

          function c(a) {
            return JSON === void 0 || JSON === null || !JSON.stringify
              ? Object.prototype.toString.call(a)
              : JSON.stringify(a);
          }

          function d(a) {
            if (a === null || a === void 0) return !0;
            a = typeof a === "undefined" ? "undefined" : i(a);
            return a === "number" || a === "boolean" || a === "string";
          }
          const e = (() => {
            class e {
              constructor(a) {
                n(this, e), (this._params = []), (this._piiTranslator = a);
              }

              static exports(b, c) {
                c = a(c);
                c = c == null ? "www.facebook.com" : "www." + c + ".facebook.com";
                return "https://" + c + "/signals/iwl.js?pixel_id=" + b;
              }

              static exports(c) {
                if (b.indexOf(c) !== -1) return null;
                const d = a.exec(c);
                if (d == null) throw new Error("Malformed tier: " + c);
                return d[1];
              }

              static onload() {
                if (!a.FacebookIWL || !a.FacebookIWL.init) return;
                const b = j(g.ENDPOINT);
                b != null &&
                  a.FacebookIWL.set &&
                  a.FacebookIWL.set("tier", b);
                d();
              }
            }

            h(
              e,
              [
                {
                  key: "containsKey",
                  value(a) {
                    for (let b = 0; b < this._params.length; b++)
                      if (this._params[b].name === a) return !0;
                    return !1;
                  },
                },
                {
                  key: "get",
                  value(a) {
                    a = a;
                    for (let b = 0; b < this._params.length; b++)
                      if (this._params[b].name === a)
                        return this._params[b].value;
                    return null;
                  },
                },
                {
                  key: "getAllParams",
                  value() {
                    return this._params;
                  },
                },
                {
                  key: "replaceEntry",
                  value(a, b) {
                    let c = 0;
                    while (c < this._params.length)
                      this._params[c].name === a
                        ? this._params.splice(c, 1)
                        : c++;
                    this.append(a, b);
                  },
                },
                {
                  key: "addRange",
                  value(a) {
                    const c = this;
                    a.each((a, d) => {
                      return c._append(
                        {
                          name: a,
                          value: d,
                        },
                        b,
                        !1
                      );
                    });
                  },
                },
                {
                  key: "append",
                  value(b, c) {
                    const d =
                      arguments.length > 2 && arguments[2] !== void 0
                        ? arguments[2]
                        : !1;
                    this._append(
                      {
                        name: encodeURIComponent(b),
                        value: c,
                      },
                      a,
                      d
                    );
                    return this;
                  },
                },
                {
                  key: "appendHash",
                  value(b) {
                    const c =
                      arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : !1;
                    for (const d in b)
                      Object.prototype.hasOwnProperty.call(b, d) &&
                        this._append(
                          {
                            name: encodeURIComponent(d),
                            value: b[d],
                          },
                          a,
                          c
                        );
                    return this;
                  },
                },
                {
                  key: "_append",
                  value(b, e, f) {
                    const g = b.name;
                    b = b.value;
                    d(b)
                      ? this._appendPrimitive(g, b, f)
                      : e === a
                      ? this._appendObject(g, b, f)
                      : this._appendPrimitive(g, c(b), f);
                  },
                },
                {
                  key: "_translateValue",
                  value(a, b, c) {
                    if (typeof b === "boolean") return b ? "true" : "false";
                    if (!c) return "" + b;
                    if (!this._piiTranslator) throw new Error();
                    return this._piiTranslator(a, "" + b);
                  },
                },
                {
                  key: "_appendPrimitive",
                  value(a, b, c) {
                    if (b != null) {
                      b = this._translateValue(a, b, c);
                      b != null &&
                        this._params.push({
                          name: a,
                          value: b,
                        });
                    }
                  },
                },
                {
                  key: "_appendObject",
                  value(a, c, d) {
                    let e = null;
                    for (const f in c)
                      if (Object.prototype.hasOwnProperty.call(c, f)) {
                        const g = a + "[" + encodeURIComponent(f) + "]";
                        try {
                          this._append(
                            {
                              name: g,
                              value: c[f],
                            },
                            b,
                            d
                          );
                        } catch (a) {
                          e == null && (e = a);
                        }
                      }
                    if (e != null) throw e;
                  },
                },
                {
                  key: "each",
                  value(a) {
                    for (let b = 0; b < this._params.length; b++) {
                      let c = this._params[b];
                      const d = c.name;
                      c = c.value;
                      a(d, c);
                    }
                  },
                },
                {
                  key: "toQueryString",
                  value() {
                    const a = [];
                    this.each((b, c) => {
                      a.push(b + "=" + encodeURIComponent(c));
                    });
                    return a.join("&");
                  },
                },
                {
                  key: "toFormData",
                  value() {
                    const a = new FormData();
                    this.each((b, c) => {
                      a.append(b, c);
                    });
                    return a;
                  },
                },
              ],
              [
                {
                  key: "fromHash",
                  value(a, b) {
                    return new e(b).appendHash(a);
                  },
                },
              ]
            );
            return e;
          })();
          l.exports = e;
        })();
        return l.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEvents.plugins.commonincludes",
      () => {
        return ((g, h, i, j) => {
          const k = {
            exports: {},
          };
          k.exports;
          (() => {
            "use strict";
            const a = f.getFbeventsModules("SignalsFBEventsPlugin");
            k.exports = new a((a, b) => {});
          })();
          return k.exports;
        })(a, b, c, d);
      }
    );
    e.exports = f.getFbeventsModules("SignalsFBEvents.plugins.commonincludes");
    f.registerPlugin &&
      f.registerPlugin("fbevents.plugins.commonincludes", e.exports);
    f.ensureModuleRegistered("fbevents.plugins.commonincludes", () => {
      return e.exports;
    });
  })();
})(window, document, location, history);
((a, b, c, d) => {
  const e = {
    exports: {},
  };
  e.exports;
  (() => {
    const f = a.fbq;
    f.execStart = a.performance && a.performance.now && a.performance.now();
    if (
      !(() => {
        const b = a.postMessage || (() => {});
        if (!f) {
          b(
            {
              action: "FB_LOG",
              logType: "Facebook Pixel Error",
              logMessage: "Pixel code is not installed correctly on this page",
            },
            "*"
          );
          "error" in console &&
            console.error(
              "Facebook Pixel Error: Pixel code is not installed correctly on this page"
            );
          return !1;
        }
        return !0;
      })()
    )
      return;
    f.__fbeventsModules ||
      ((f.__fbeventsModules = {}),
      (f.__fbeventsResolvedModules = {}),
      (f.getFbeventsModules = a => {
        f.__fbeventsResolvedModules[a] ||
          (f.__fbeventsResolvedModules[a] = f.__fbeventsModules[a]());
        return f.__fbeventsResolvedModules[a];
      }),
      (f.fbIsModuleLoaded = a => {
        return !!f.__fbeventsModules[a];
      }),
      (f.ensureModuleRegistered = (b, a) => {
        f.fbIsModuleLoaded(b) || (f.__fbeventsModules[b] = a);
      }));
    f.ensureModuleRegistered("signalsFBEventsGetIwlUrl", () => {
      return ((a, b, c, d) => {
        const e = {
          exports: {},
        };
        e.exports;
        (() => {
          "use strict";
          const a = f.getFbeventsModules("signalsFBEventsGetTier");
        })();
        return e.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("signalsFBEventsGetTier", () => {
      return ((f, b, c, d) => {
        const e = {
          exports: {},
        };
        e.exports;
        (() => {
          "use strict";
          const a = /^https:\/\/www\.([A-Za-z0-9\.]+)\.facebook\.com\/tr\/?$/, b = ["https://www.facebook.com/tr", "https://www.facebook.com/tr/"];
        })();
        return e.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEvents.plugins.iwlbootstrapper",
      () => {
        return ((a, b, c, d) => {
          const e = {
            exports: {},
          };
          e.exports;
          (() => {
            "use strict";
            const c = f.getFbeventsModules("SignalsFBEventsIWLBootStrapEvent"),
                  d = f.getFbeventsModules("SignalsFBEventsLogging"),
                  g = f.getFbeventsModules("SignalsFBEventsNetworkConfig"),
                  h = f.getFbeventsModules("SignalsFBEventsPlugin"),
                  i = f.getFbeventsModules("signalsFBEventsGetIwlUrl"),
                  j = f.getFbeventsModules("signalsFBEventsGetTier"),
                  k = d.logUserError,
                  l = /^https:\/\/.*\.facebook\.com$/i,
                  m = "FACEBOOK_IWL_CONFIG_STORAGE_KEY",
                  n = a.sessionStorage
                    ? a.sessionStorage
                    : {
                        getItem(a) {
                          return null;
                        },
                        removeItem(a) {},
                        setItem(a, b) {},
                      };
            e.exports = new h((d, e) => {
              function h(c, d) {
                const e = b.createElement("script");
                e.async = !0;
                a.FacebookIWLSessionEnd = () => {
                  n.removeItem(m), a.close();
                };
                e.src = i(c, g.ENDPOINT);
                b.body && b.body.appendChild(e);
              }
              let o = !1;

              const p = a => {
                return !!(
                  e &&
                  e.pixelsByID &&
                  Object.prototype.hasOwnProperty.call(e.pixelsByID, a)
                );
              };

              function q() {
                if (o) return;
                let b = n.getItem(m);
                if (!b) return;
                b = JSON.parse(b);
                const c = b.pixelID, d = b.graphToken, e = b.sessionStartTime;
                o = !0;
                h(c, () => {
                  const b = p(c) ? c : null;
                  a.FacebookIWL.init(b, d, e);
                });
              }

              function r(b) {
                if (o) return;
                h(b, () => {
                  return a.FacebookIWL.showConfirmModal(b);
                });
              }

              function s(a, b, c) {
                n.setItem(
                  m,
                  JSON.stringify({
                    graphToken: a,
                    pixelID: b,
                    sessionStartTime: c,
                  })
                ),
                  q();
              }
              c.listen(b => {
                const c = b.graphToken;
                b = b.pixelID;
                s(c, b);
                a.FacebookIWLSessionEnd = () => {
                  return n.removeItem(m);
                };
              });

              function d(a) {
                let b = a.data;
                const c = b.graphToken;
                const d = b.msg_type;
                const f = b.pixelID;
                b = b.sessionStartTime;
                if (
                  e &&
                  e.pixelsByID &&
                  e.pixelsByID[f] &&
                  e.pixelsByID[f].codeless === "false"
                ) {
                  k({
                    pixelID: f,
                    type: "SITE_CODELESS_OPT_OUT",
                  });
                  return;
                }
                if (
                  n.getItem(m) ||
                  !l.test(a.origin) ||
                  !(
                    a.data &&
                    (d === "FACEBOOK_IWL_BOOTSTRAP" ||
                      d === "FACEBOOK_IWL_CONFIRM_DOMAIN")
                  )
                )
                  return;
                switch (d) {
                  case "FACEBOOK_IWL_BOOTSTRAP":
                    a.source.postMessage(
                      "FACEBOOK_IWL_BOOTSTRAP_ACK",
                      a.origin
                    );
                    s(c, f, b);
                    break;
                  case "FACEBOOK_IWL_CONFIRM_DOMAIN":
                    a.source.postMessage(
                      "FACEBOOK_IWL_CONFIRM_DOMAIN_ACK",
                      a.origin
                    );
                    r(f);
                    break;
                }
              }
              if (n.getItem(m)) {
                q();
                return;
              }
              a.opener && a.addEventListener("message", d);
            });
          })();
          return e.exports;
        })(a, b, c, d);
      }
    );
    e.exports = f.getFbeventsModules("SignalsFBEvents.plugins.iwlbootstrapper");
    f.registerPlugin &&
      f.registerPlugin("fbevents.plugins.iwlbootstrapper", e.exports);
    f.ensureModuleRegistered("fbevents.plugins.iwlbootstrapper", () => {
      return e.exports;
    });
  })();
})(window, document, location, history);
((a, b, c, d) => {
  const e = {
    exports: {},
  };
  e.exports;
  (() => {
    const f = a.fbq;
    f.execStart = a.performance && a.performance.now && a.performance.now();
    if (
      !(() => {
        const b = a.postMessage || (() => {});
        if (!f) {
          b(
            {
              action: "FB_LOG",
              logType: "Facebook Pixel Error",
              logMessage: "Pixel code is not installed correctly on this page",
            },
            "*"
          );
          "error" in console &&
            console.error(
              "Facebook Pixel Error: Pixel code is not installed correctly on this page"
            );
          return !1;
        }
        return !0;
      })()
    )
      return;
    f.__fbeventsModules ||
      ((f.__fbeventsModules = {}),
      (f.__fbeventsResolvedModules = {}),
      (f.getFbeventsModules = a => {
        f.__fbeventsResolvedModules[a] ||
          (f.__fbeventsResolvedModules[a] = f.__fbeventsModules[a]());
        return f.__fbeventsResolvedModules[a];
      }),
      (f.fbIsModuleLoaded = a => {
        return !!f.__fbeventsModules[a];
      }),
      (f.ensureModuleRegistered = (b, a) => {
        f.fbIsModuleLoaded(b) || (f.__fbeventsModules[b] = a);
      }));
    f.ensureModuleRegistered("SignalsFBEventsOptTrackingOptions", () => {
      return ((f, b, c, d) => {
        const e = {
          exports: {},
        };
        e.exports;
        (() => {
          "use strict";
          e.exports = {
            AUTO_CONFIG_OPT_OUT: 1 << 0,
            AUTO_CONFIG: 1 << 1,
            CONFIG_LOADING: 1 << 2,
            SUPPORTS_DEFINE_PROPERTY: 1 << 3,
            SUPPORTS_SEND_BEACON: 1 << 4,
            HAS_INVALIDATED_PII: 1 << 5,
            SHOULD_PROXY: 1 << 6,
            IS_HEADLESS: 1 << 7,
            IS_SELENIUM: 1 << 8,
            HAS_DETECTION_FAILED: 1 << 9,
            HAS_CONFLICTING_PII: 1 << 10,
            HAS_AUTOMATCHED_PII: 1 << 11,
          };
        })();
        return e.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered("SignalsFBEventsProxyState", () => {
      return ((f, b, c, d) => {
        const e = {
          exports: {},
        };
        e.exports;
        (() => {
          "use strict";
          let a = !1;
          e.exports = {
            getShouldProxy() {
              return a;
            },
            setShouldProxy(b) {
              a = b;
            },
          };
        })();
        return e.exports;
      })(a, b, c, d);
    });
    f.ensureModuleRegistered(
      "SignalsFBEvents.plugins.opttracking",
      () => {
        return ((a, b, c, d) => {
          const e = {
            exports: {},
          };
          e.exports;
          (() => {
            "use strict";
            let b = f.getFbeventsModules("SignalsFBEventsEvents");
            const c = b.getCustomParameters;
            const d = b.piiAutomatched;
            const g = b.piiConflicting;
            const h = b.piiInvalidated;
            const i = f.getFbeventsModules("SignalsFBEventsOptTrackingOptions");
            b = f.getFbeventsModules("SignalsFBEventsPlugin");
            const j = f.getFbeventsModules("SignalsFBEventsProxyState");
            let k = f.getFbeventsModules("SignalsFBEventsUtils");
            const l = k.some;
            let m = !1;

            function n() {
              try {
                Object.defineProperty({}, "test", {});
              } catch (a) {
                return !1;
              }
              return !0;
            }

            function o() {
              return !!(a.navigator && a.navigator.sendBeacon);
            }

            function p(a, b) {
              return a ? b : 0;
            }
            const q = ["_selenium", "callSelenium", "_Selenium_IDE_Recorder"],
                  r = [
                    "__webdriver_evaluate",
                    "__selenium_evaluate",
                    "__webdriver_script_function",
                    "__webdriver_script_func",
                    "__webdriver_script_fn",
                    "__fxdriver_evaluate",
                    "__driver_unwrapped",
                    "__webdriver_unwrapped",
                    "__driver_evaluate",
                    "__selenium_unwrapped",
                    "__fxdriver_unwrapped",
                  ];

            function s() {
              if (u(q)) return !0;
              let b = l(r, b => {
                return a.document[b] ? !0 : !1;
              });
              if (b) return !0;
              b = a.document;
              for (const c in b)
                if (c.match(/\$[a-z]dc_/) && b[c].cache_) return !0;
              if (
                a.external &&
                a.external.toString &&
                a.external.toString().indexOf("Sequentum") >= 0
              )
                return !0;
              if (b.documentElement && b.documentElement.getAttribute) {
                b = l(["selenium", "webdriver", "driver"], b => {
                  return a.document.documentElement.getAttribute(b) ? !0 : !1;
                });
                if (b) return !0;
              }
              return !1;
            }

            function t() {
              if (u(["_phantom", "__nightmare", "callPhantom"])) return !0;
              return /HeadlessChrome/.test(a.navigator.userAgent) ? !0 : !1;
            }

            function u(b) {
              b = l(b, b => {
                return a[b] ? !0 : !1;
              });
              return b;
            }

            function v() {
              let a = 0, b = 0, c = 0;
              try {
                (a = p(s(), i.IS_SELENIUM)), (b = p(t(), i.IS_HEADLESS));
              } catch (a) {
                c = i.HAS_DETECTION_FAILED;
              }
              return {
                hasDetectionFailed: c,
                isHeadless: b,
                isSelenium: a,
              };
            }
            k = new b((a, b) => {
              if (m) return;
              const e = {};
              h.listen(a => {
                a != null && (e[typeof a === "string" ? a : a.id] = !0);
              });
              const k = {};
              g.listen(a => {
                a != null && (k[typeof a === "string" ? a : a.id] = !0);
              });
              const l = {};
              d.listen(a => {
                a != null && (l[typeof a === "string" ? a : a.id] = !0);
              });
              c.listen(c => {
                let d = b.optIns,
                    f = p(
                      c != null && d.isOptedOut(c.id, "AutomaticSetup"),
                      i.AUTO_CONFIG_OPT_OUT
                    );
                d = p(
                  c != null && d.isOptedIn(c.id, "AutomaticSetup"),
                  i.AUTO_CONFIG
                );
                const g = p(a.disableConfigLoading !== !0, i.CONFIG_LOADING), h = p(n(), i.SUPPORTS_DEFINE_PROPERTY), m = p(o(), i.SUPPORTS_SEND_BEACON), q = p(c != null && k[c.id], i.HAS_CONFLICTING_PII), r = p(c != null && e[c.id], i.HAS_INVALIDATED_PII);
                c = p(c != null && l[c.id], i.HAS_AUTOMATCHED_PII);
                const s = p(j.getShouldProxy(), i.SHOULD_PROXY), t = v();
                f =
                  f |
                  d |
                  g |
                  h |
                  m |
                  r |
                  s |
                  t.isHeadless |
                  t.isSelenium |
                  t.hasDetectionFailed |
                  q |
                  c;
                return {
                  o: f,
                };
              });
              m = !0;
            });
            k.OPTIONS = i;
            e.exports = k;
          })();
          return e.exports;
        })(a, b, c, d);
      }
    );
    e.exports = f.getFbeventsModules("SignalsFBEvents.plugins.opttracking");
    f.registerPlugin &&
      f.registerPlugin("fbevents.plugins.opttracking", e.exports);
    f.ensureModuleRegistered("fbevents.plugins.opttracking", () => {
      return e.exports;
    });
  })();
})(window, document, location, history);
((a, b, c, d) => {
  const e = {
    exports: {},
  };
  e.exports;
  (() => {
    const f = a.fbq;
    f.execStart = a.performance && a.performance.now && a.performance.now();
    if (
      !(() => {
        const b = a.postMessage || (() => {});
        if (!f) {
          b(
            {
              action: "FB_LOG",
              logType: "Facebook Pixel Error",
              logMessage: "Pixel code is not installed correctly on this page",
            },
            "*"
          );
          "error" in console &&
            console.error(
              "Facebook Pixel Error: Pixel code is not installed correctly on this page"
            );
          return !1;
        }
        return !0;
      })()
    )
      return;
    const g = (() => {
      function a(a, b) {
        const c = [];
        let d = !0;
        let e = !1;
        let f = void 0;
        try {
          for (
            let a =
                    a[
                      typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                    ](),
                g;
            !(d = (g = a.next()).done);
            d = !0
          ) {
            c.push(g.value);
            if (b && c.length === b) break;
          }
        } catch (a) {
          (e = !0), (f = a);
        } finally {
          try {
            !d && a["return"] && a["return"]();
          } finally {
            if (e) throw f;
          }
        }
        return c;
      }
      return (b, c) => {
        if (Array.isArray(b)) return b;
        else if (
          (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") in
          Object(b)
        )
          return a(b, c);
        else
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
      };
    })();

    function h(a) {
      return Array.isArray(a) ? a : Array.from(a);
    }

    function i(a) {
      if (Array.isArray(a)) {
        for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
        return c;
      } else return Array.from(a);
    }
    f.__fbeventsModules ||
      ((f.__fbeventsModules = {}),
      (f.__fbeventsResolvedModules = {}),
      (f.getFbeventsModules = a => {
        f.__fbeventsResolvedModules[a] ||
          (f.__fbeventsResolvedModules[a] = f.__fbeventsModules[a]());
        return f.__fbeventsResolvedModules[a];
      }),
      (f.fbIsModuleLoaded = a => {
        return !!f.__fbeventsModules[a];
      }),
      (f.ensureModuleRegistered = (b, a) => {
        f.fbIsModuleLoaded(b) || (f.__fbeventsModules[b] = a);
      }));
    f.ensureModuleRegistered("SignalsFBEvents", () => {
      return ((a, b, c, d) => {
        const e = {
          exports: {},
        };
        e.exports;
        (() => {
          "use strict";
          const f = a.fbq;
          f.execStart =
            a.performance && typeof a.performance.now === "function"
              ? a.performance.now()
              : null;
          const j = f.getFbeventsModules("SignalsFBEventsNetworkConfig");
          const k = f.getFbeventsModules("SignalsFBEventsQE");
          const l = f.getFbeventsModules("SignalsParamList");
          const m = f.getFbeventsModules("signalsFBEventsSendEvent");
          let n = f.getFbeventsModules("SignalsFBEventsUtils");
          const o = f.getFbeventsModules("SignalsFBEventsLogging");
          const p = f.getFbeventsModules("SignalsEventValidation");
          const q = f.getFbeventsModules("SignalsFBEventsFBQ");
          const r = f.getFbeventsModules("SignalsFBEventsJSLoader");
          const s = f.getFbeventsModules("SignalsFBEventsFireLock");
          const t = f.getFbeventsModules("SignalsFBEventsMobileAppBridge");
          const u = f.getFbeventsModules("signalsFBEventsInjectMethod");
          const v = f.getFbeventsModules("signalsFBEventsMakeSafe");
          const w = f.getFbeventsModules("signalsFBEventsResolveLegacyArguments");
          const x = f.getFbeventsModules("SignalsFBEventsPluginManager");
          const y = f.getFbeventsModules("signalsFBEventsCoercePixelID");
          const z = f.getFbeventsModules("SignalsFBEventsEvents");
          let A = f.getFbeventsModules("SignalsFBEventsTyped");
          const B = A.coerce;
          const aa = A.Typed;
          const C = n.each;
          A = n.FBSet;
          const D = n.isEmptyObject, E = n.isPlainObject, F = n.isNumber, G = n.keys;
          n = z.execEnd;
          const H = z.fired;
          const I = z.getCustomParameters;
          const ba = z.iwlBootstrap;
          const J = z.piiInvalidated;
          const ca = z.setIWLExtractors;
          const K = z.validateCustomParameters;
          const L = z.validateUrlParameters;
          const da = o.logError;
          const M = o.logUserError;
          const N = s.global;
          let O = -1;
          const ea = Array.prototype.slice;
          const P = Object.prototype.hasOwnProperty;
          let Q = c.href;
          let R = !1;
          let fa = !1;
          const S = [];
          const T = {};
          let ga;
          b.referrer;
          const U = {
                    PageView: new A(),
                    PixelInitialized: new A(),
                  },
                V = new q(f, T),
                W = new x(V, N),
                ha = new A(["eid"]);

          function ia(a) {
            for (const b in a) P.call(a, b) && (this[b] = a[b]);
            return this;
          }

          function X() {
            try {
              var a = ea.call(arguments);
              if (N.isLocked() && a[0] !== "consent") {
                f.queue.push(arguments);
                return;
              }
              const b = w(a), c = [].concat(i(b.args)), d = b.isLegacySyntax, e = c.shift();
              switch (e) {
                case "addPixelId":
                  R = !0;
                  Y.apply(this, c);
                  break;
                case "init":
                  fa = !0;
                  Y.apply(this, c);
                  break;
                case "set":
                  ja.apply(this, c);
                  break;
                case "track":
                  if (F(c[0])) {
                    na.apply(this, c);
                    break;
                  }
                  if (d) {
                    Z.apply(this, c);
                    break;
                  }
                  ma.apply(this, c);
                  break;
                case "trackCustom":
                  Z.apply(this, c);
                  break;
                case "send":
                  oa.apply(this, c);
                  break;
                case "on":
                  const j = h(c), k = j[0], l = j.slice(1), m = z[k];
                  m && m.triggerWeakly(l);
                  break;
                case "loadPlugin":
                  W.loadPlugin(c[0]);
                  break;
                case "dataProcessingOptions":
                  switch (c.length) {
                    case 1:
                      const n = g(c, 1), o = n[0];
                      V.pluginConfig.set(null, "dataProcessingOptions", {
                        dataProcessingOptions: o,
                        dataProcessingCountry: null,
                        dataProcessingState: null,
                      });
                      break;
                    case 3:
                      const p = g(c, 3), q = p[0], r = p[1], s = p[2];
                      V.pluginConfig.set(null, "dataProcessingOptions", {
                        dataProcessingOptions: q,
                        dataProcessingCountry: r,
                        dataProcessingState: s,
                      });
                      break;
                    case 4:
                      const t = g(c, 3), u = t[0], v = t[1], x = t[2];
                      V.pluginConfig.set(null, "dataProcessingOptions", {
                        dataProcessingOptions: u,
                        dataProcessingCountry: v,
                        dataProcessingState: x,
                      });
                      break;
                  }
                  break;
                default:
                  V.callMethod(arguments);
                  break;
              }
            } catch (a) {
              da(a);
            }
          }

          function ja(a) {
            for (
              var b = arguments.length, c = Array(b > 1 ? b - 1 : 0), d = 1;
              d < b;
              d++
            )
              c[d - 1] = arguments[d];
            const e = [a].concat(c);
            switch (a) {
              case "endpoint":
                const g = c[0];
                if (typeof g !== "string")
                  throw new Error("endpoint value must be a string");
                j.ENDPOINT = g;
                break;
              case "cdn":
                const h = c[0];
                if (typeof h !== "string")
                  throw new Error("cdn value must be a string");
                r.CONFIG.CDN_BASE_URL = h;
                break;
              case "releaseSegment":
                const i = c[0];
                if (typeof i !== "string") {
                  M({
                    invalidParamName: "new_release_segment",
                    invalidParamValue: i,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                f._releaseSegment = i;
                break;
              case "autoConfig":
                const l = c[0], m = c[1], n = l === !0 || l === "true" ? "optIn" : "optOut";
                if (typeof m !== "string") {
                  M({
                    invalidParamName: "pixel_id",
                    invalidParamValue: m,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                V.callMethod([n, m, "AutomaticSetup"]);
                break;
              case "firstPartyCookies":
                const o = c[0], q = c[1], s = o === !0 || o === "true" ? "optIn" : "optOut";
                typeof q === "string"
                  ? V.callMethod([s, q, "FirstPartyCookies"])
                  : q === void 0
                  ? (V.disableFirstPartyCookies = !0)
                  : M({
                      invalidParamName: "pixel_id",
                      invalidParamValue: q,
                      method: "set",
                      params: e,
                      type: "INVALID_FBQ_METHOD_PARAMETER",
                    });
                break;
              case "experiments":
                k.setExperiments.apply(k, c);
                break;
              case "mobileBridge":
                const u = c[0], v = c[1];
                if (typeof u !== "string") {
                  M({
                    invalidParamName: "pixel_id",
                    invalidParamValue: u,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                if (typeof v !== "string") {
                  M({
                    invalidParamName: "app_id",
                    invalidParamValue: v,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                t.registerBridge([u, v]);
                break;
              case "iwlExtractors":
                const w = c[0], x = c[1];
                ca.triggerWeakly({
                  extractors: x,
                  pixelID: w,
                });
                break;
              case "startIWLBootstrap":
                const y = c[0], z = c[1];
                ba.triggerWeakly({
                  graphToken: y,
                  pixelID: z,
                });
                break;
              case "parallelfire":
                const A = c[0], C = c[1];
                V.pluginConfig.set(A, "parallelfire", {
                  target: C,
                });
                break;
              case "trackSingleOnly":
                const D = c[0], E = c[1], F = B(D, aa["boolean"]()), G = B(E, aa.fbid());
                if (G == null) {
                  M({
                    invalidParamName: "pixel_id",
                    invalidParamValue: E,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                if (F == null) {
                  M({
                    invalidParamName: "on_or_off",
                    invalidParamValue: D,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                const H = p.validateMetadata(a);
                H.error && M(H.error);
                H.warnings &&
                  H.warnings.forEach(a => {
                    M(a);
                  });
                P.call(T, G)
                  ? (T[G].trackSingleOnly = F)
                  : M({
                      metadataValue: a,
                      pixelID: G,
                      type: "SET_METADATA_ON_UNINITIALIZED_PIXEL_ID",
                    });
                break;
              default:
                const I = V.pluginConfig.getWithGlobalFallback(
                          null,
                          "dataProcessingOptions"
                        ),
                      J = I != null && I.dataProcessingOptions.includes("LDU"),
                      K = c[0],
                      L = c[1];
                if (typeof a !== "string")
                  throw new Error(
                    "The metadata setting provided in the 'set' call is invalid."
                  );
                if (typeof K !== "string") {
                  if (J) break;
                  M({
                    invalidParamName: "value",
                    invalidParamValue: K,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                if (typeof L !== "string") {
                  if (J) break;
                  M({
                    invalidParamName: "pixel_id",
                    invalidParamValue: L,
                    method: "set",
                    params: e,
                    type: "INVALID_FBQ_METHOD_PARAMETER",
                  });
                  break;
                }
                la(a, K, L);
                break;
            }
          }
          f._initHandlers = [];
          f._initsDone = {};

          function Y(a, b, c) {
            O = O === -1 ? Date.now() : O;
            const d = y(a);
            if (d == null) return;
            const e = b == null || E(b);
            e ||
              M({
                invalidParamName: "user_data",
                invalidParamValue: b,
                method: "init",
                params: [a, b],
                type: "INVALID_FBQ_METHOD_PARAMETER",
              });
            if (P.call(T, d)) {
              b != null && D(T[d].userData)
                ? ((T[d].userData = e ? b || {} : {}), W.loadPlugin("identity"))
                : M({
                    pixelID: d,
                    type: "DUPLICATE_PIXEL_ID",
                  });
              return;
            }
            a = {
              agent: c ? c.agent : null,
              eventCount: 0,
              id: d,
              userData: e ? b || {} : {},
              userDataFormFields: {},
            };
            S.push(a);
            T[d] = a;
            b != null && W.loadPlugin("identity");
            ka();
            V.loadConfig(d);
          }

          function ka() {
            for (let a = 0; a < f._initHandlers.length; a++) {
              const b = f._initHandlers[a];
              f._initsDone[a] || (f._initsDone[a] = {});
              for (let c = 0; c < S.length; c++) {
                const d = S[c];
                f._initsDone[a][d.id] || ((f._initsDone[a][d.id] = !0), b(d));
              }
            }
          }

          function la(a, b, c) {
            var d = p.validateMetadata(a);
            d.error && M(d.error);
            d.warnings &&
              d.warnings.forEach(a => {
                M(a);
              });
            if (P.call(T, c)) {
              for (const d = 0, e = S.length; d < e; d++)
                if (S[d].id === c) {
                  S[d][a] = b;
                  break;
                }
            } else
              M({
                metadataValue: b,
                pixelID: c,
                type: "SET_METADATA_ON_UNINITIALIZED_PIXEL_ID",
              });
          }

          function ma(a, b, c) {
            (b = b || {}),
              p.validateEventAndLog(a, b),
              a === "CustomEvent" &&
                typeof b.event === "string" &&
                (a = b.event),
              Z.call(this, a, b, c);
          }

          function Z(a, b, c) {
            for (let d = 0, e = S.length; d < e; d++) {
              const f = S[d];
              if (
                !(a === "PageView" && this.allowDuplicatePageViews) &&
                Object.prototype.hasOwnProperty.call(U, a) &&
                U[a].has(f.id)
              )
                continue;
              if (f.trackSingleOnly) continue;
              $({
                customData: b,
                eventData: c,
                eventName: a,
                pixel: f,
              });
              Object.prototype.hasOwnProperty.call(U, a) && U[a].add(f.id);
            }
          }

          function na(a, b) {
            $({
              customData: b,
              eventName: a,
              pixel: null,
            });
          }

          function oa(a, b, c) {
            S.forEach(c => {
              return $({
                customData: b,
                eventName: a,
                pixel: c,
              });
            });
          }

          function pa(a, b, c) {
            const d = new l(f.piiTranslator);
            try {
              d.append("ud", (a && a.userData) || {}, !0),
                d.append("udff", (a && a.userDataFormFields) || {}, !0);
            } catch (b) {
              J.trigger(a);
            }
            d.append("v", f.version);
            f._releaseSegment && d.append("r", f._releaseSegment);
            d.append("a", a && a.agent ? a.agent : f.agent);
            a && (d.append("ec", a.eventCount), a.eventCount++);
            b = I.trigger(a, b, c);
            C(b, a => {
              return C(G(a), b => {
                if (d.containsKey(b)) {
                  if (!ha.has(b))
                    throw new Error(
                      "Custom parameter " + b + " has already been specified."
                    );
                } else d.append(b, a[b]);
              });
            });
            d.append("it", O);
            c = a && a.codeless === "false";
            d.append("coo", c);
            b = V.pluginConfig.getWithGlobalFallback(
              a ? a.id : null,
              "dataProcessingOptions"
            );
            if (b != null) {
              c = b.dataProcessingCountry;
              a = b.dataProcessingOptions;
              b = b.dataProcessingState;
              d.append("dpo", a.join(","));
              d.append("dpoco", c);
              d.append("dpost", b);
            }
            return d;
          }

          function $(a) {
            const d = a.customData;
            let e = a.eventData;
            const f = a.eventName;
            a = a.pixel;
            if (a != null && t.pixelHasActiveBridge(a)) {
              t.sendEvent(a, f, d || {});
              return;
            }
            const g = pa(a, f, d);
            if (e != null) {
              var h = e.eventID;
              e = e.event_id;
              h = h != null ? h : e;
              g.containsKey("eid")
                ? g.replaceEntry("eid", h)
                : g.append("eid", h);
            }
            d != null && K.trigger(a, d, f);
            e = c.href;
            h = b.referrer;
            const i = {};
            e != null && (i.dl = e);
            h != null && (i.rl = h);
            D(i) || L.trigger(a, i, f);
            m({
              customData: d,
              customParams: g,
              eventName: f,
              id: a ? a.id : null,
              piiTranslator: null,
              documentLink: i.dl ? i.dl : "",
              referrerLink: i.rl ? i.rl : "",
            });
          }

          function qa() {
            while (f.queue.length && !N.isLocked()) {
              const a = f.queue.shift();
              X.apply(f, a);
            }
          }
          N.onUnlocked(() => {
            qa();
          });
          f.pixelId && ((R = !0), Y(f.pixelId));
          ((R && fa) || a.fbq !== a._fbq) &&
            M({
              type: "CONFLICTING_VERSIONS",
            });
          S.length > 1 &&
            M({
              type: "MULTIPLE_PIXELS",
            });

          function ra() {
            if (f.disablePushState === !0) return;
            if (!d.pushState || !d.replaceState) return;
            const b = v(() => {
              ga = Q;
              Q = c.href;
              if (Q === ga) return;
              const a = new ia({
                allowDuplicatePageViews: !0,
              });
              X.call(a, "trackCustom", "PageView");
            });
            u(d, "pushState", b);
            u(d, "replaceState", b);
            a.addEventListener("popstate", b, !1);
          }
          H.listenOnce(() => {
            ra();
          });

          function sa(a) {
            f._initHandlers.push(a), ka();
          }

          function ta() {
            return {
              pixelInitializationTime: O,
              pixels: S,
            };
          }

          function ua(a) {
            (a.instance = V),
              (a.callMethod = X),
              (a._initHandlers = []),
              (a._initsDone = {}),
              (a.send = oa),
              (a.getEventCustomParameters = pa),
              (a.addInitHandler = sa),
              (a.getState = ta),
              (a.init = Y),
              (a.set = ja),
              (a.loadPlugin = a => {
                return W.loadPlugin(a);
              }),
              (a.registerPlugin = (a, b) => {
                W.registerPlugin(a, b);
              });
          }
          ua(a.fbq);
          qa();
          e.exports = {
            doExport: ua,
          };
          n.trigger();
        })();
        return e.exports;
      })(a, b, c, d);
    });
    e.exports = f.getFbeventsModules("SignalsFBEvents");
    f.registerPlugin && f.registerPlugin("fbevents", e.exports);
    f.ensureModuleRegistered("fbevents", () => {
      return e.exports;
    });
  })();
})(window, document, location, history);
fbq.registerPlugin("global_config", {
  __fbEventsPlugin: 1,
  plugin(fbq, instance, config) {
    fbq.loadPlugin("commonincludes");
    fbq.loadPlugin("opttracking");
    fbq.set("experiments", [
      {
        allocation: 0.005,
        code: "s",
        name: "send_beacon_string",
        passRate: 0.5,
      },
    ]);
    config.set(null, "batching", {
      batchWaitTimeMs: 501,
      maxBatchSize: 10,
    });
    config.set(null, "microdata", {
      waitTimeMs: 500,
    });
    instance.configLoaded("global_config");
  },
});
