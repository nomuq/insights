!(function (t, e) {
  "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof module && module.exports
    ? (module.exports = e())
    : (t.CSV = e());
})(this, function () {
  "use strict";
  function t(t) {
    var e = typeof t;
    return "function" === e || ("object" === e && !!t);
  }
  function e(t) {
    return "string" == typeof t;
  }
  function n(t) {
    return !isNaN(+t);
  }
  function i(t) {
    return 0 == t || 1 == t;
  }
  function r(t) {
    return null == t;
  }
  function o(t) {
    return null != t;
  }
  function c(t, e) {
    return o(t) ? t : e;
  }
  function u(t, e) {
    for (var n = 0, i = t.length; i > n && e(t[n], n) !== !1; n += 1);
  }
  function s(t) {
    return t.replace(/"/g, '\\"');
  }
  function a(t) {
    return "attrs[" + t + "]";
  }
  function l(t, e) {
    return n(t)
      ? "Number(" + a(e) + ")"
      : i(t)
      ? "Boolean(" + a(e) + " == true)"
      : "String(" + a(e) + ")";
  }
  function f(t, n, i, r) {
    var o = [];
    return (
      3 == arguments.length
        ? (n
            ? g(n)
              ? u(i, function (i, r) {
                  e(n[r]) ? (n[r] = n[r].toLowerCase()) : (t[n[r]] = n[r]),
                    o.push("deserialize[cast[" + r + "]](" + a(r) + ")");
                })
              : u(i, function (t, e) {
                  o.push(l(t, e));
                })
            : u(i, function (t, e) {
                o.push(a(e));
              }),
          (o = "return [" + o.join(",") + "]"))
        : (n
            ? g(n)
              ? u(i, function (i, c) {
                  e(n[c]) ? (n[c] = n[c].toLowerCase()) : (t[n[c]] = n[c]),
                    o.push(
                      '"' +
                        s(r[c]) +
                        '": deserialize[cast[' +
                        c +
                        "]](" +
                        a(c) +
                        ")"
                    );
                })
              : u(i, function (t, e) {
                  o.push('"' + s(r[e]) + '": ' + l(t, e));
                })
            : u(i, function (t, e) {
                o.push('"' + s(r[e]) + '": ' + a(e));
              }),
          (o = "return {" + o.join(",") + "}")),
      Function("attrs", "deserialize", "cast", o)
    );
  }
  function h(t, e) {
    var n,
      i = 0;
    return (
      u(e, function (e) {
        var r,
          o = e;
        -1 != p.indexOf(e) && (o = "\\" + o),
          (r = t.match(RegExp(o, "g"))),
          r && r.length > i && ((i = r.length), (n = e));
      }),
      n || e[0]
    );
  }
  var p = ["|", "^"],
    d = [",", ";", "  ", "|", "^"],
    m = ["\r\n", "\r", "\n"],
    g =
      Array.isArray ||
      function (t) {
        return "[object Array]" === toString.call(t);
      },
    y = (function () {
      function n(t, n) {
        if ((n || (n = {}), g(t))) this.mode = "encode";
        else {
          if (!e(t)) throw Error("Incompatible format!");
          this.mode = "parse";
        }
        (this.data = t),
          (this.options = { header: c(n.header, !1), cast: c(n.cast, !0) });
        var i = n.lineDelimiter || n.line,
          r = n.cellDelimiter || n.delimiter;
        this.isParser()
          ? ((this.options.lineDelimiter = i || h(this.data, m)),
            (this.options.cellDelimiter = r || h(this.data, d)),
            (this.data = o(this.data, this.options.lineDelimiter)))
          : this.isEncoder() &&
            ((this.options.lineDelimiter = i || "\r\n"),
            (this.options.cellDelimiter = r || ","));
      }
      function i(t, e, n, i, r) {
        t(new e(n, i, r));
      }
      function o(t, e) {
        return t.slice(-e.length) != e && (t += e), t;
      }
      function s(n) {
        return g(n)
          ? "array"
          : t(n)
          ? "object"
          : e(n)
          ? "string"
          : r(n)
          ? "null"
          : "primitive";
      }
      return (
        (n.prototype.set = function (t, e) {
          return (this.options[t] = e);
        }),
        (n.prototype.isParser = function () {
          return "parse" == this.mode;
        }),
        (n.prototype.isEncoder = function () {
          return "encode" == this.mode;
        }),
        (n.prototype.parse = function (t) {
          function e() {
            s = { escaped: !1, quote: !1, cell: !0 };
          }
          function n() {
            m.cell = "";
          }
          function r() {
            m.line = [];
          }
          function o(t) {
            m.line.push(s.escaped ? t.slice(1, -1).replace(/""/g, '"') : t),
              n(),
              e();
          }
          function c(t) {
            o(t.slice(0, 1 - p.lineDelimiter.length));
          }
          function u() {
            d
              ? g(d)
                ? ((a = f(y, p.cast, m.line, d)),
                  (u = function () {
                    i(t, a, m.line, y, p.cast);
                  })())
                : (d = m.line)
              : (a || (a = f(y, p.cast, m.line)),
                (u = function () {
                  i(t, a, m.line, y, p.cast);
                })());
          }
          if ("parse" == this.mode) {
            if (0 === this.data.trim().length) return [];
            var s,
              a,
              l,
              h = this.data,
              p = this.options,
              d = p.header,
              m = { cell: "", line: [] },
              y = this.deserialize;
            t ||
              ((l = []),
              (t = function (t) {
                l.push(t);
              })),
              1 == p.lineDelimiter.length && (c = o);
            var v,
              A,
              D,
              b = h.length,
              j = p.cellDelimiter.charCodeAt(0),
              w = p.lineDelimiter.charCodeAt(p.lineDelimiter.length - 1);
            for (e(), v = 0, A = 0; b > v; v++)
              (D = h.charCodeAt(v)),
                s.cell && ((s.cell = !1), 34 == D)
                  ? (s.escaped = !0)
                  : s.escaped && 34 == D
                  ? (s.quote = !s.quote)
                  : ((s.escaped && s.quote) || !s.escaped) &&
                    (D == j
                      ? (o(m.cell + h.slice(A, v)), (A = v + 1))
                      : D == w &&
                        (c(m.cell + h.slice(A, v)),
                        (A = v + 1),
                        (m.line.length > 1 || "" !== m.line[0]) && u(),
                        r()));
            return l ? l : this;
          }
        }),
        (n.prototype.deserialize = {
          string: function (t) {
            return t + "";
          },
          number: function (t) {
            return +t;
          },
          boolean: function (t) {
            return !!t;
          },
        }),
        (n.prototype.serialize = {
          object: function (t) {
            var e = this,
              n = Object.keys(t),
              i = Array(n.length);
            return (
              u(n, function (n, r) {
                i[r] = e[s(t[n])](t[n]);
              }),
              i
            );
          },
          array: function (t) {
            var e = this,
              n = Array(t.length);
            return (
              u(t, function (t, i) {
                n[i] = e[s(t)](t);
              }),
              n
            );
          },
          string: function (t) {
            return '"' + (t + "").replace(/"/g, '""') + '"';
          },
          null: function () {
            return "";
          },
          primitive: function (t) {
            return t;
          },
        }),
        (n.prototype.encode = function (t) {
          function n(t) {
            return t.join(c.cellDelimiter);
          }
          if ("encode" == this.mode) {
            if (0 == this.data.length) return "";
            var i,
              r,
              o = this.data,
              c = this.options,
              a = c.header,
              l = o[0],
              f = this.serialize,
              h = 0;
            t ||
              ((r = Array(o.length)),
              (t = function (t, e) {
                r[e + h] = t;
              })),
              a &&
                (g(a) || ((i = Object.keys(l)), (a = i)),
                t(n(f.array(a)), 0),
                (h = 1));
            var p,
              d = s(l);
            return (
              "array" == d
                ? (g(c.cast)
                    ? ((p = Array(c.cast.length)),
                      u(c.cast, function (t, n) {
                        e(t)
                          ? (p[n] = t.toLowerCase())
                          : ((p[n] = t), (f[t] = t));
                      }))
                    : ((p = Array(l.length)),
                      u(l, function (t, e) {
                        p[e] = s(t);
                      })),
                  u(o, function (e, i) {
                    var r = Array(p.length);
                    u(e, function (t, e) {
                      r[e] = f[p[e]](t);
                    }),
                      t(n(r), i);
                  }))
                : "object" == d &&
                  ((i = Object.keys(l)),
                  g(c.cast)
                    ? ((p = Array(c.cast.length)),
                      u(c.cast, function (t, n) {
                        e(t)
                          ? (p[n] = t.toLowerCase())
                          : ((p[n] = t), (f[t] = t));
                      }))
                    : ((p = Array(i.length)),
                      u(i, function (t, e) {
                        p[e] = s(l[t]);
                      })),
                  u(o, function (e, r) {
                    var o = Array(i.length);
                    u(i, function (t, n) {
                      o[n] = f[p[n]](e[t]);
                    }),
                      t(n(o), r);
                  })),
              r ? r.join(c.lineDelimiter) : this
            );
          }
        }),
        (n.prototype.forEach = function (t) {
          return this[this.mode](t);
        }),
        n
      );
    })();
  return (
    (y.parse = function (t, e) {
      return new y(t, e).parse();
    }),
    (y.encode = function (t, e) {
      return new y(t, e).encode();
    }),
    (y.forEach = function (t, e, n) {
      return 2 == arguments.length && (n = e), new y(t, e).forEach(n);
    }),
    y
  );
});
