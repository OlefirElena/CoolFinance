/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, o) {
        var n, s;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              o = (this.document || this.ownerDocument).querySelectorAll(t),
              n = this;
            do {
              for (e = o.length; 0 <= --e && o.item(e) !== n; );
            } while (e < 0 && (n = n.parentElement));
            return n;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var o = document.createEvent("CustomEvent");
              return o.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), o;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], o = 0;
              o < e.length && !window.requestAnimationFrame;
              ++o
            )
              (window.requestAnimationFrame =
                window[e[o] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[o] + "CancelAnimationFrame"] ||
                  window[e[o] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, o) {
                var n = new Date().getTime(),
                  s = Math.max(0, 16 - (n - t)),
                  i = window.setTimeout(function () {
                    e(n + s);
                  }, s);
                return (t = n + s), i;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (s =
            void 0 !== o.g
              ? o.g
              : "undefined" != typeof window
              ? window
              : this),
          (n = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                o = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var o in e) {
                        if (!e.hasOwnProperty(o)) return;
                        t[o] = e[o];
                      }
                    }),
                    t
                  );
                },
                n = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      o = String(t),
                      n = o.length,
                      s = -1,
                      i = "",
                      a = o.charCodeAt(0);
                    ++s < n;

                  ) {
                    if (0 === (e = o.charCodeAt(s)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    i +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === s && 48 <= e && e <= 57) ||
                      (1 === s && 48 <= e && e <= 57 && 45 === a)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? o.charAt(s)
                        : "\\" + o.charAt(s);
                  }
                  return "#" + i;
                },
                s = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                i = function (e) {
                  return e
                    ? ((o = e),
                      parseInt(t.getComputedStyle(o).height, 10) + e.offsetTop)
                    : 0;
                  var o;
                },
                a = function (e, o, n) {
                  0 === e && document.body.focus(),
                    n ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, o));
                },
                r = function (e, o, n, s) {
                  if (o.emitEvents && "function" == typeof t.CustomEvent) {
                    var i = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: n, toggle: s },
                    });
                    document.dispatchEvent(i);
                  }
                };
              return function (c, l) {
                var u,
                  h,
                  d,
                  p,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(p),
                        (p = null),
                        t || r("scrollCancel", u);
                    },
                    animateScroll: function (n, c, l) {
                      m.cancelScroll();
                      var h = o(u || e, l || {}),
                        f =
                          "[object Number]" ===
                          Object.prototype.toString.call(n),
                        g = f || !n.tagName ? null : n;
                      if (f || g) {
                        var w = t.pageYOffset;
                        h.header &&
                          !d &&
                          (d = document.querySelector(h.header));
                        var y,
                          v,
                          b,
                          _,
                          S,
                          A,
                          O,
                          L,
                          E = i(d),
                          q = f
                            ? n
                            : (function (e, o, n, i) {
                                var a = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (a += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (a = Math.max(a - o - n, 0)),
                                  i && (a = Math.min(a, s() - t.innerHeight)),
                                  a
                                );
                              })(
                                g,
                                E,
                                parseInt(
                                  "function" == typeof h.offset
                                    ? h.offset(n, c)
                                    : h.offset,
                                  10
                                ),
                                h.clip
                              ),
                          C = q - w,
                          x = s(),
                          T = 0,
                          I =
                            ((y = C),
                            (b = (v = h).speedAsDuration
                              ? v.speed
                              : Math.abs((y / 1e3) * v.speed)),
                            v.durationMax && b > v.durationMax
                              ? v.durationMax
                              : v.durationMin && b < v.durationMin
                              ? v.durationMin
                              : parseInt(b, 10)),
                          H = function (e) {
                            var o, s, i;
                            _ || (_ = e),
                              (T += e - _),
                              (A =
                                w +
                                C *
                                  ((s = S =
                                    1 < (S = 0 === I ? 0 : T / I) ? 1 : S),
                                  "easeInQuad" === (o = h).easing &&
                                    (i = s * s),
                                  "easeOutQuad" === o.easing &&
                                    (i = s * (2 - s)),
                                  "easeInOutQuad" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 2 * s * s
                                        : (4 - 2 * s) * s - 1),
                                  "easeInCubic" === o.easing && (i = s * s * s),
                                  "easeOutCubic" === o.easing &&
                                    (i = --s * s * s + 1),
                                  "easeInOutCubic" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 4 * s * s * s
                                        : (s - 1) * (2 * s - 2) * (2 * s - 2) +
                                          1),
                                  "easeInQuart" === o.easing &&
                                    (i = s * s * s * s),
                                  "easeOutQuart" === o.easing &&
                                    (i = 1 - --s * s * s * s),
                                  "easeInOutQuart" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 8 * s * s * s * s
                                        : 1 - 8 * --s * s * s * s),
                                  "easeInQuint" === o.easing &&
                                    (i = s * s * s * s * s),
                                  "easeOutQuint" === o.easing &&
                                    (i = 1 + --s * s * s * s * s),
                                  "easeInOutQuint" === o.easing &&
                                    (i =
                                      s < 0.5
                                        ? 16 * s * s * s * s * s
                                        : 1 + 16 * --s * s * s * s * s),
                                  o.customEasing && (i = o.customEasing(s)),
                                  i || s)),
                              t.scrollTo(0, Math.floor(A)),
                              (function (e, o) {
                                var s = t.pageYOffset;
                                if (
                                  e == o ||
                                  s == o ||
                                  (w < o && t.innerHeight + s) >= x
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    a(n, o, f),
                                    r("scrollStop", h, n, c),
                                    !(p = _ = null)
                                  );
                              })(A, q) ||
                                ((p = t.requestAnimationFrame(H)), (_ = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (O = n),
                          (L = h),
                          f ||
                            (history.pushState &&
                              L.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(L),
                                  anchor: O.id,
                                },
                                document.title,
                                O === document.documentElement
                                  ? "#top"
                                  : "#" + O.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? a(n, Math.floor(q), !1)
                            : (r("scrollStart", h, n, c),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(H));
                      }
                    },
                  },
                  f = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (h = e.target.closest(c)) &&
                      "a" === h.tagName.toLowerCase() &&
                      !e.target.closest(u.ignore) &&
                      h.hostname === t.location.hostname &&
                      h.pathname === t.location.pathname &&
                      /#/.test(h.href)
                    ) {
                      var o, s;
                      try {
                        o = n(decodeURIComponent(h.hash));
                      } catch (e) {
                        o = n(h.hash);
                      }
                      if ("#" === o) {
                        if (!u.topOnEmptyHash) return;
                        s = document.documentElement;
                      } else s = document.querySelector(o);
                      (s = s || "#top" !== o ? s : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var o = t.location.hash;
                            (o = o || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: o || t.pageYOffset,
                                },
                                document.title,
                                o || t.location.href
                              );
                          }
                        })(u),
                        m.animateScroll(s, h));
                    }
                  },
                  g = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(u)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          n(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    u &&
                      (document.removeEventListener("click", f, !1),
                      t.removeEventListener("popstate", g, !1),
                      m.cancelScroll(),
                      (p = d = h = u = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (u = o(e, l || {})),
                      (d = u.header ? document.querySelector(u.header) : null),
                      document.addEventListener("click", f, !1),
                      u.updateURL &&
                        u.popstate &&
                        t.addEventListener("popstate", g, !1);
                  })(),
                  m
                );
              };
            })(s);
          }.apply(e, [])),
          void 0 === n || (t.exports = n);
      },
    },
    e = {};
  function o(n) {
    var s = e[n];
    if (void 0 !== s) return s.exports;
    var i = (e[n] = { exports: {} });
    return t[n].call(i.exports, i, i.exports, o), i.exports;
  }
  (o.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      class t {
        constructor(t) {
          let e = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...e,
              ...t,
              classes: { ...e.classes, ...t?.classes },
              hashSettings: { ...e.hashSettings, ...t?.hashSettings },
              on: { ...e.on, ...t?.on },
            }),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.popupLogging("Проснулся"), this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (t) {
              const e = t.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (e)
                return (
                  t.preventDefault(),
                  (this._dataValue = e.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? e.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = e),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `Ой ой, не заполнен атрибут у ${e.classList}`
                      )
                );
              return t.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!t.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (t.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (t) {
                if (
                  this.options.closeEsc &&
                  27 == t.which &&
                  "Escape" === t.code &&
                  this.isOpen
                )
                  return t.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == t.which &&
                  this.isOpen &&
                  this._focusCatch(t);
              }.bind(this)
            ),
            document.querySelector("form[data-ajax],form[data-dev]") &&
              document.addEventListener(
                "formSent",
                function (t) {
                  const e = t.detail.form.dataset.popupMessage;
                  e && this.open(e);
                }.bind(this)
              ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(t) {
          if (
            (t &&
              "string" == typeof t &&
              "" !== t.trim() &&
              ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              )
            ) {
              const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                  this.options.youtubeAttribute
                )}?rel=0&showinfo=0&autoplay=1`,
                e = document.createElement("iframe");
              e.setAttribute("allowfullscreen", "");
              const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
              e.setAttribute("allow", `${o}; encrypted-media`),
                e.setAttribute("src", t),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(e);
            }
            this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : s(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } })
              ),
              this.popupLogging("Открыл попап");
          } else
            this.popupLogging(
              "Ой ой, такого попапа нет. Проверьте корректность ввода. "
            );
        }
        close(t) {
          t &&
            "string" == typeof t &&
            "" !== t.trim() &&
            (this.previousOpen.selector = t),
            this.isOpen &&
              n &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive
                ),
                s(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("Закрыл попап"));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let t = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${t}"]`
          ) &&
            t &&
            this.open(t);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(t) {
          const e = this.targetOpen.element.querySelectorAll(this._focusEl),
            o = Array.prototype.slice.call(e),
            n = o.indexOf(document.activeElement);
          t.shiftKey &&
            0 === n &&
            (o[o.length - 1].focus(), t.preventDefault()),
            t.shiftKey ||
              n !== o.length - 1 ||
              (o[0].focus(), t.preventDefault());
        }
        _focusTrap() {
          const t = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : t[0].focus();
        }
        popupLogging(t) {
          this.options.logging && r(`[Попапос]: ${t}`);
        }
      }
      class e {
        constructor(t, e = null) {
          if (
            ((this.config = Object.assign({ init: !0, logging: !0 }, t)),
            this.config.init)
          ) {
            const t = document.querySelectorAll("[data-prlx-mouse]");
            t.length
              ? (this.paralaxMouseInit(t),
                this.setLogging(`Проснулся, слежу за объектами: (${t.length})`))
              : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
          }
        }
        paralaxMouseInit(t) {
          t.forEach((t) => {
            const e = t.closest("[data-prlx-mouse-wrapper]"),
              o = t.dataset.prlxCx ? +t.dataset.prlxCx : 100,
              n = t.dataset.prlxCy ? +t.dataset.prlxCy : 100,
              s = t.hasAttribute("data-prlx-dxr") ? -1 : 1,
              i = t.hasAttribute("data-prlx-dyr") ? -1 : 1,
              a = t.dataset.prlxA ? +t.dataset.prlxA : 50;
            let r = 0,
              c = 0,
              l = 0,
              u = 0;
            function h(e = window) {
              e.addEventListener("mousemove", function (e) {
                const o = t.getBoundingClientRect().top + window.scrollY;
                if (
                  o >= window.scrollY ||
                  o + t.offsetHeight >= window.scrollY
                ) {
                  const t = window.innerWidth,
                    o = window.innerHeight,
                    n = e.clientX - t / 2,
                    s = e.clientY - o / 2;
                  (l = (n / t) * 100), (u = (s / o) * 100);
                }
              });
            }
            !(function e() {
              (r += ((l - r) * a) / 1e3),
                (c += ((u - c) * a) / 1e3),
                (t.style.cssText = `transform: translate3D(${
                  (s * r) / (o / 10)
                }%,${(i * c) / (n / 10)}%,0);`),
                requestAnimationFrame(e);
            })(),
              e ? h(e) : h();
          });
        }
        setLogging(t) {
          this.config.logging && r(`[PRLX Mouse]: ${t}`);
        }
      }
      let n = !0,
        s = (t = 500) => {
          document.documentElement.classList.contains("lock") ? i(t) : a(t);
        },
        i = (t = 500) => {
          let e = document.querySelector("body");
          if (n) {
            let o = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < o.length; t++) {
                o[t].style.paddingRight = "0px";
              }
              (e.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, t),
              (n = !1),
              setTimeout(function () {
                n = !0;
              }, t);
          }
        },
        a = (t = 500) => {
          let e = document.querySelector("body");
          if (n) {
            let o = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < o.length; t++) {
              o[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (e.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (n = !1),
              setTimeout(function () {
                n = !0;
              }, t);
          }
        };
      function r(t) {
        setTimeout(() => {
          window.FLS && console.log(t);
        }, 0);
      }
      o(2);
      let c = !1;
      setTimeout(() => {
        if (c) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0),
        document.addEventListener("click", function (t) {
          const e = t.target;
          e.classList.contains("search-form__btn")
            ? document
                .querySelector(".search-form__item")
                .classList.toggle("_active")
            : !e.closest(".search-form") &&
              document.querySelector(".search-form__item._active") &&
              document
                .querySelector(".search-form__item")
                .classList.remove("_active");
          e.classList.contains("lang-menu__arrow")
            ? (document
                .querySelector(".lang-menu__sub-list")
                .classList.toggle("_active"),
              document
                .querySelector(".lang-menu__arrow")
                .classList.toggle("_active"))
            : !e.closest(".lang-menu") &&
              document.querySelector(".lang-menu__sub-list._active") &&
              (document
                .querySelector(".lang-menu__sub-list")
                .classList.remove("_active"),
              document
                .querySelector(".lang-menu__arrow")
                .classList.remove("_active"));
          e.classList.contains("filter-comments__arrow")
            ? (document
                .querySelector(".filter-comments__sub-list")
                .classList.toggle("_active"),
              document
                .querySelector(".filter-comments__arrow")
                .classList.toggle("_active"))
            : !e.closest(".filter-comments") &&
              document.querySelector(".filter-comments__sub-list._active") &&
              (document
                .querySelector(".filter-comments__sub-list")
                .classList.remove("_active"),
              document
                .querySelector(".filter-comments__arrow")
                .classList.remove("_active"));
        });
      document.querySelectorAll(".scroll-down__btn").forEach((t) => {
        t.addEventListener("click", () => {
          document
            .getElementById(t.getAttribute("data-link"))
            .scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }),
        (window.FLS = !0),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        (function () {
          let t = document.querySelector(".icon-menu");
          t &&
            t.addEventListener("click", function (t) {
              n &&
                (s(), document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        new t({}),
        new e({}),
        (function () {
          c = !0;
          const t = document.querySelector("header.header"),
            e = t.hasAttribute("data-scroll-show"),
            o = t.dataset.scrollShow ? t.dataset.scrollShow : 500,
            n = t.dataset.scroll ? t.dataset.scroll : 1;
          let s,
            i = 0;
          document.addEventListener("windowScroll", function (a) {
            const r = window.scrollY;
            clearTimeout(s),
              r >= n
                ? (!t.classList.contains("_header-scroll") &&
                    t.classList.add("_header-scroll"),
                  e &&
                    (r > i
                      ? t.classList.contains("_header-show") &&
                        t.classList.remove("_header-show")
                      : !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show"),
                    (s = setTimeout(() => {
                      !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show");
                    }, o))))
                : (t.classList.contains("_header-scroll") &&
                    t.classList.remove("_header-scroll"),
                  e &&
                    t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")),
              (i = r <= 0 ? 0 : r);
          });
        })();
    })();
})();
