($ => {
  const isBuilder = $("html").hasClass("is-builder");

  $.extend($.easing, {
    easeInOutCubic(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },
  });

  $.fn.outerFind = function (selector) {
    return this.find(selector).addBack(selector);
  };

  $.fn.footerReveal = function () {
    const $this = $(this);
    const $prev = $this.prev();
    const $win = $(window);

    function initReveal() {
      if ($this.outerHeight() <= $win.outerHeight()) {
        $this.css({
          "z-index": -999,
          position: "fixed",
          bottom: 0,
        });

        $this.css({
          width: $prev.outerWidth(),
        });

        $prev.css({
          "margin-bottom": $this.outerHeight(),
        });
      } else {
        $this.css({
          "z-index": "",
          position: "",
          bottom: "",
        });

        $this.css({
          width: "",
        });

        $prev.css({
          "margin-bottom": "",
        });
      }
    }

    initReveal();

    $win.on("load resize", () => {
      initReveal();
    });

    return this;
  };

  (($, sr) => {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    const debounce = (func, threshold, execAsap) => {
      let timeout;

      return function debounced() {
        const obj = this, args = arguments;

        function delayed() {
          if (!execAsap) func.apply(obj, args);
          timeout = null;
        }

        if (timeout) clearTimeout(timeout);
        else if (execAsap) func.apply(obj, args);

        timeout = setTimeout(delayed, threshold || 100);
      };
    };
    // smartresize
    jQuery.fn[sr] = function (fn) {
      return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
    };
  })(jQuery, "smartresize");

  (() => {
    let scrollbarWidth = 0;
    let originalMargin;

    const touchHandler = event => {
      event.preventDefault();
    };

    function getScrollbarWidth() {
      if (scrollbarWidth) return scrollbarWidth;
      const scrollDiv = document.createElement("div");
      $.each(
        {
          top: "-9999px",
          width: "50px",
          height: "50px",
          overflow: "scroll",
          position: "absolute",
        },
        (property, value) => {
          scrollDiv.style[property] = value;
        }
      );
      $("body").append(scrollDiv);
      scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      $("body")[0].removeChild(scrollDiv);
      return scrollbarWidth;
    }
  })();

  $.isMobile = type => {
    let reg = [];
    const any = {
      blackberry: "BlackBerry",
      android: "Android",
      windows: "IEMobile",
      opera: "Opera Mini",
      ios: "iPhone|iPad|iPod",
    };
    type = "undefined" == $.type(type) ? "*" : type.toLowerCase();
    if ("*" == type)
      reg = $.map(any, v => {
        return v;
      });
    else if (type in any) reg.push(any[type]);
    return !!(
      reg.length && navigator.userAgent.match(new RegExp(reg.join("|"), "i"))
    );
  };

  const isSupportViewportUnits = (() => {
    // modernizr implementation
    const $elem = $(
      '<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">'
    ).appendTo("body");
    const elem = $elem[0];
    const height = parseInt(window.innerHeight / 2, 10);
    const compStyle = parseInt(
      (window.getComputedStyle
        ? getComputedStyle(elem, null)
        : elem.currentStyle)["height"],
      10
    );
    $elem.remove();
    return compStyle == height;
  })();

  $(() => {
    $("html").addClass($.isMobile() ? "mobile" : "desktop");

    // .mbr-navbar--sticky
    $(window).scroll(() => {
      $(".mbr-navbar--sticky").each(function () {
        const method = $(window).scrollTop() > 10 ? "addClass" : "removeClass";
        $(this)
          [method]("mbr-navbar--stuck")
          .not(".mbr-navbar--open")
          [method]("mbr-navbar--short");
      });
    });

    if ($.isMobile() && navigator.userAgent.match(/Chrome/i)) {
      // simple fix for Chrome's scrolling
      ((width, height) => {
        const deviceSize = [width, width];
        deviceSize[height > width ? 0 : 1] = height;
        $(window).smartresize(() => {
          let windowHeight = $(window).height();
          if ($.inArray(windowHeight, deviceSize) < 0)
            windowHeight = deviceSize[$(window).width() > windowHeight ? 1 : 0];
          $(".mbr-section--full-height").css("height", windowHeight + "px");
        });
      })($(window).width(), $(window).height());
    } else if (!isSupportViewportUnits) {
      // fallback for .mbr-section--full-height
      $(window).smartresize(() => {
        $(".mbr-section--full-height").css("height", $(window).height() + "px");
      });
      $(document).on("add.cards", event => {
        if (
          $("html").hasClass("mbr-site-loaded") &&
          $(event.target).outerFind(".mbr-section--full-height").length
        )
          $(window).resize();
      });
    }

    // .mbr-section--16by9 (16 by 9 blocks autoheight)
    function calculate16by9() {
      $(this).css("height", ($(this).parent().width() * 9) / 16);
    }
    $(window).smartresize(() => {
      $(".mbr-section--16by9").each(calculate16by9);
    });
    $(document).on("add.cards changeParameter.cards", event => {
      const enabled = $(event.target).outerFind(".mbr-section--16by9");
      if (enabled.length) {
        enabled.attr("data-16by9", "true").each(calculate16by9);
      } else {
        $(event.target)
          .outerFind("[data-16by9]")
          .css("height", "")
          .removeAttr("data-16by9");
      }
    });

    // .mbr-parallax-background
    function initParallax(card) {
      setTimeout(() => {
        $(card)
          .outerFind(".mbr-parallax-background")
          .jarallax({
            speed: 0.6,
          })
          .css("position", "relative");
      }, 0);
    }

    function destroyParallax(card) {
      $(card).jarallax("destroy").css("position", "");
    }

    if ($.fn.jarallax && !$.isMobile()) {
      $(window).on("update.parallax", event => {
        setTimeout(() => {
          const $jarallax = $(".mbr-parallax-background");

          $jarallax.jarallax("coverImage");
          $jarallax.jarallax("clipContainer");
          $jarallax.jarallax("onScroll");
        }, 0);
      });

      if (isBuilder) {
        $(document).on("add.cards", event => {
          initParallax(event.target);
          $(window).trigger("update.parallax");
        });

        $(document).on(
          "changeParameter.cards",
          (event, paramName, value, key) => {
            if (paramName === "bg") {
              destroyParallax(event.target);

              switch (key) {
                case "type":
                  if (value.parallax === true) {
                    initParallax(event.target);
                  }
                  break;
                case "value":
                  if (value.type === "image" && value.parallax === true) {
                    initParallax(event.target);
                  }
                  break;
                case "parallax":
                  if (value.parallax === true) {
                    initParallax(event.target);
                  }
              }
            }

            $(window).trigger("update.parallax");
          }
        );
      } else {
        initParallax(document.body);
      }

      // for Tabs
      $(window).on("shown.bs.tab", e => {
        $(window).trigger("update.parallax");
      });
    }

    // .mbr-fixed-top
    let fixedTopTimeout;

    let scrollTimeout;
    let prevScrollTop = 0;
    let fixedTop = null;
    const isDesktop = !$.isMobile();
    $(window).scroll(() => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const scrollTop = $(window).scrollTop();
      const scrollUp = scrollTop <= prevScrollTop || isDesktop;
      prevScrollTop = scrollTop;
      if (fixedTop) {
        const fixed = scrollTop > fixedTop.breakPoint;
        if (scrollUp) {
          if (fixed != fixedTop.fixed) {
            if (isDesktop) {
              fixedTop.fixed = fixed;
              $(fixedTop.elm).toggleClass("is-fixed");
            } else {
              scrollTimeout = setTimeout(() => {
                fixedTop.fixed = fixed;
                $(fixedTop.elm).toggleClass("is-fixed");
              }, 40);
            }
          }
        } else {
          fixedTop.fixed = false;
          $(fixedTop.elm).removeClass("is-fixed");
        }
      }
    });
    $(document).on("add.cards delete.cards", event => {
      if (fixedTopTimeout) clearTimeout(fixedTopTimeout);
      fixedTopTimeout = setTimeout(() => {
        if (fixedTop) {
          fixedTop.fixed = false;
          $(fixedTop.elm).removeClass("is-fixed");
        }
        $(".mbr-fixed-top:first").each(function () {
          fixedTop = {
            breakPoint: $(this).offset().top + $(this).height() * 3,
            fixed: false,
            elm: this,
          };
          $(window).scroll();
        });
      }, 650);
    });

    // embedded videos
    $(window).smartresize(() => {
      $(".mbr-embedded-video").each(function () {
        $(this).height(
          ($(this).width() * parseInt($(this).attr("height") || 315)) /
            parseInt($(this).attr("width") || 560)
        );
      });
    });
    $(document).on("add.cards", event => {
      if (
        $("html").hasClass("mbr-site-loaded") &&
        $(event.target).outerFind("iframe").length
      )
        $(window).resize();
    });

    // background video
    function videoParser(card) {
      $(card)
        .outerFind("[data-bg-video]")
        .each(function () {
          const videoURL = $(this).attr("data-bg-video");
          const parsedUrl = videoURL.match(
            /(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/
          );

          const $img = $('<div class="mbr-background-video-preview">')
            .hide()
            .css({
              backgroundSize: "cover",
              backgroundPosition: "center",
            });
          $("> *:eq(0)", this).before($img);

          // youtube or vimeo
          if (
            parsedUrl &&
            (/youtube/g.test(parsedUrl[3]) || /vimeo/g.test(parsedUrl[3]))
          ) {
            // youtube
            if (parsedUrl && /youtube/g.test(parsedUrl[3])) {
              let previewURL =
                "http" + ("https:" === location.protocol ? "s" : "") + ":";
              previewURL +=
                "//img.youtube.com/vi/" + parsedUrl[6] + "/maxresdefault.jpg";

              $("<img>")
                .on("load", function () {
                  if (120 === (this.naturalWidth || this.width)) {
                    // selection of preview in the best quality
                    const file = this.src.split("/").pop();

                    switch (file) {
                      case "maxresdefault.jpg":
                        this.src = this.src.replace(file, "sddefault.jpg");
                        break;
                      case "sddefault.jpg":
                        this.src = this.src.replace(file, "hqdefault.jpg");
                        break;
                      default:
                        // image not found
                        if (isBuilder) {
                          $img
                            .css(
                              "background-image",
                              'url("images/no-video.jpg")'
                            )
                            .show();
                        }
                    }
                  } else {
                    $img
                      .css("background-image", 'url("' + this.src + '")')
                      .show();
                  }
                })
                .attr("src", previewURL);

              if ($.fn.YTPlayer && !isBuilder && !$.isMobile()) {
                $("> *:eq(1)", this)
                  .before('<div class="mbr-background-video"></div>')
                  .prev()
                  .YTPlayer({
                    videoURL: parsedUrl[6],
                    containment: "self",
                    showControls: false,
                    mute: true,
                  });
              }
            } else if (parsedUrl && /vimeo/g.test(parsedUrl[3])) {
              // vimeo
              let request = new XMLHttpRequest();
              request.open(
                "GET",
                "https://vimeo.com/api/v2/video/" + parsedUrl[6] + ".json",
                true
              );
              request.onreadystatechange = function () {
                if (this.readyState === 4) {
                  if (this.status >= 200 && this.status < 400) {
                    const response = JSON.parse(this.responseText);

                    $img
                      .css(
                        "background-image",
                        'url("' + response[0].thumbnail_large + '")'
                      )
                      .show();
                  } else if (isBuilder) {
                    // image not found
                    $img
                      .css("background-image", 'url("images/no-video.jpg")')
                      .show();
                  }
                }
              };
              request.send();
              request = null;

              if ($.fn.vimeo_player && !isBuilder && !$.isMobile()) {
                $("> *:eq(1)", this)
                  .before('<div class="mbr-background-video"></div>')
                  .prev()
                  .vimeo_player({
                    videoURL: videoURL,
                    containment: "self",
                    showControls: false,
                    mute: true,
                  });
              }
            }
          } else if (isBuilder) {
            // neither youtube nor vimeo
            $img
              .css("background-image", 'url("images/video-placeholder.jpg")')
              .show();
          }
        });
    }

    if (isBuilder) {
      $(document).on("add.cards", event => {
        videoParser(event.target);
      });
    } else {
      videoParser(document.body);
    }

    $(document).on(
      "changeParameter.cards",
      (event, paramName, value, key) => {
        if (paramName === "bg") {
          switch (key) {
            case "type":
              $(event.target).find(".mbr-background-video-preview").remove();
              if (value.type === "video") {
                videoParser(event.target);
              }
              break;
            case "value":
              if (value.type === "video") {
                $(event.target).find(".mbr-background-video-preview").remove();
                videoParser(event.target);
              }
              break;
          }
        }
      }
    );

    // init
    if (!isBuilder) {
      $("body > *:not(style, script)").trigger("add.cards");
    }
    $("html").addClass("mbr-site-loaded");
    $(window).resize().scroll();

    // smooth scroll
    if (!isBuilder) {
      $(document).click(e => {
        try {
          let target = e.target;

          if ($(target).parents().hasClass("carousel")) {
            return;
          }
          do {
            if (target.hash) {
              const useBody = /#bottom|#top/g.test(target.hash);
              $(useBody ? "body" : target.hash).each(function () {
                e.preventDefault();
                // in css sticky navbar has height 64px
                const stickyMenuHeight = $(".mbr-navbar--sticky").length ? 64 : 0;
                const goTo =
                  target.hash == "#bottom"
                    ? $(this).height() - $(window).height()
                    : $(this).offset().top - stickyMenuHeight;
                // Disable Accordion's and Tab's scroll
                if (
                  $(this).hasClass("panel-collapse") ||
                  $(this).hasClass("tab-pane")
                ) {
                  return;
                }
                $("html, body").stop().animate(
                  {
                    scrollTop: goTo,
                  },
                  800,
                  "easeInOutCubic"
                );
              });
              break;
            }
          } while ((target = target.parentNode));
        } catch (e) {
          // throw e;
        }
      });
    }

    // init the same height columns
    $(".cols-same-height .mbr-figure").each(function () {
      const $imageCont = $(this);
      const $img = $imageCont.children("img");
      const $cont = $imageCont.parent();
      let imgW = $img[0].width;
      let imgH = $img[0].height;

      function setNewSize() {
        $img.css({
          width: "",
          maxWidth: "",
          marginLeft: "",
        });

        if (imgH && imgW) {
          const aspectRatio = imgH / imgW;

          $imageCont.addClass({
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          });

          // change image size
          const contAspectRatio = $cont.height() / $cont.width();
          if (contAspectRatio > aspectRatio) {
            const percent = (100 * (contAspectRatio - aspectRatio)) / aspectRatio;
            $img.css({
              width: percent + 100 + "%",
              maxWidth: percent + 100 + "%",
              marginLeft: -percent / 2 + "%",
            });
          }
        }
      }

      $img.one("load", () => {
        imgW = $img[0].width;
        imgH = $img[0].height;
        setNewSize();
      });

      $(window).on("resize", setNewSize);
      setNewSize();
    });
  });

  if (!isBuilder) {
    // .mbr-social-likes
    if ($.fn.socialLikes) {
      $(document).on("add.cards", event => {
        $(event.target)
          .outerFind(".mbr-social-likes")
          .on("counter.social-likes", (event, service, counter) => {
            if (counter > 999)
              $(".social-likes__counter", event.target).html(
                Math.floor(counter / 1000) + "k"
              );
          })
          .socialLikes({
            initHtml: false,
          });
      });
    }

    $(document).on("add.cards", event => {
      if ($(event.target).hasClass("mbr-reveal")) {
        $(event.target).footerReveal();
      }
    });

    $(document).ready(() => {
      // disable animation on scroll on mobiles
      if ($.isMobile()) {
        return;
        // enable animation on scroll
      } else if ($("input[name=animation]").length) {
        $("input[name=animation]").remove();

        const $animatedElements = $(
          "p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, textarea, .input-group, .iconbox, .btn-social, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info"
        )
          .not(function () {
            return $(this)
              .parents()
              .is(
                ".navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop"
              );
          })
          .addClass("hidden animated");

        function getElementOffset(element) {
          let top = 0;
          do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
          } while (element);

          return top;
        }

        function checkIfInView() {
          const window_height = window.innerHeight;
          const window_top_position =
            document.documentElement.scrollTop || document.body.scrollTop;
          const window_bottom_position = window_top_position + window_height - 50;

          $.each($animatedElements, function () {
            const $element = $(this);
            const element = $element[0];
            const element_height = element.offsetHeight;
            const element_top_position = getElementOffset(element);
            const element_bottom_position = element_top_position + element_height;

            // check to see if this current element is within viewport
            if (
              element_bottom_position >= window_top_position &&
              element_top_position <= window_bottom_position &&
              $element.hasClass("hidden")
            ) {
              $element
                .removeClass("hidden")
                .addClass("fadeInUp")
                .one(
                  "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                  () => {
                    $element.removeClass("animated fadeInUp");
                  }
                );
            }
          });
        }

        const $window = $(window);
        $window.on("scroll resize", checkIfInView);
        $window.trigger("scroll");
      }
    });

    if ($(".nav-dropdown").length) {
      $(".nav-dropdown").swipe({
        swipeLeft(event, direction, distance, duration, fingerCount) {
          $(".navbar-close").click();
        },
      });
    }
  }

  // Scroll to Top Button
  $(document).ready(() => {
    if ($(".mbr-arrow-up").length) {
      const $scroller = $("#scrollToTop"), $main = $("body,html"), $window = $(window);
      $scroller.css("display", "none");
      $window.scroll(function () {
        if ($(this).scrollTop() > 0) {
          $scroller.fadeIn();
        } else {
          $scroller.fadeOut();
        }
      });
      $scroller.click(() => {
        $main.animate(
          {
            scrollTop: 0,
          },
          400
        );
        return false;
      });
    }
  });

  $(document).ready(() => {
    // Counters
    if ($(".counters").length) {
      $(".counters").viewportChecker({
        offset: 200,
        callbackFunction(elem, action) {
          $("#" + elem.attr("id") + " .count").each(function () {
            $(this)
              .prop("Counter", 0)
              .animate(
                {
                  Counter: $(this).text(),
                },
                {
                  duration: 3000,
                  easing: "swing",
                  step(now) {
                    $(this).text(Math.ceil(now));
                  },
                }
              );
          });
        },
      });
    }
  });

  // arrow down
  if (!isBuilder) {
    $(".mbr-arrow").on("click", e => {
      let $next = $(e.target).closest("section").next();
      if ($next.hasClass("engine")) {
        $next = $next.closest("section").next();
      }
      const offset = $next.offset();
      $("html, body").stop().animate(
        {
          scrollTop: offset.top,
        },
        800,
        "linear"
      );
    });
  }

  // add padding to the first element, if it exists
  if ($("nav.navbar").length) {
    const navHeight = $("nav.navbar").height();
    $(".mbr-after-navbar.mbr-fullscreen").css("padding-top", navHeight + "px");
  }

  function isIE() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }

    return false;
  }

  // fixes for IE
  if (!isBuilder && isIE()) {
    $(document).on("add.cards", event => {
      const $eventTarget = $(event.target);

      if ($eventTarget.hasClass("mbr-fullscreen")) {
        $(window).on("load resize", () => {
          $eventTarget.css("height", "auto");

          if ($eventTarget.outerHeight() <= $(window).height()) {
            $eventTarget.css("height", "1px");
          }
        });
      }

      if (
        $eventTarget.hasClass("mbr-slider") ||
        $eventTarget.hasClass("mbr-gallery")
      ) {
        $eventTarget
          .find(".carousel-indicators")
          .addClass("ie-fix")
          .find("li")
          .css({
            display: "inline-block",
            width: "30px",
          });

        if ($eventTarget.hasClass("mbr-slider")) {
          $eventTarget
            .find(".full-screen .slider-fullscreen-image")
            .css("height", "1px");
        }
      }
    });
  }

  // Script for popUp video
  $(document).ready(() => {
    if (!isBuilder) {
      const modal = item => {
        const videoIframe = $(item).parents("section").find("iframe")[0], videoIframeSrc = $(videoIframe).attr("src");

        item.parents("section").css("z-index", "1");

        if (videoIframeSrc.indexOf("youtu") !== -1) {
          videoIframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            "*"
          );
        }

        if (videoIframeSrc.indexOf("vimeo") !== -1) {
          var vimeoPlayer = new Vimeo.Player($(videoIframe));
          vimeoPlayer.play();
        }

        $(item)
          .parents("section")
          .find($(item).attr("data-modal"))
          .css("display", "table")
          .click(function () {
            if (videoIframeSrc.indexOf("youtu") !== -1) {
              videoIframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
              );
            }

            if (videoIframeSrc.indexOf("vimeo") !== -1) {
              vimeoPlayer.pause();
            }

            $(this).css("display", "none").off("click");
            item.parents("section").css("z-index", "0");
          });
      };

      // Youtube & Vimeo
      $(".modalWindow-video iframe").each(function () {
        const videoURL = $(this).attr("data-src");
        $(this).removeAttr("data-src");

        const parsedUrl = videoURL.match(
          /(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/
        );
        if (videoURL.indexOf("youtu") !== -1) {
          $(this).attr(
            "src",
            "https://youtube.com/embed/" + parsedUrl[6] + "?rel=0&enablejsapi=1"
          );
        } else if (videoURL.indexOf("vimeo") !== -1) {
          $(this).attr(
            "src",
            "https://player.vimeo.com/video/" +
              parsedUrl[6] +
              "?autoplay=0&loop=0"
          );
        }
      });

      $("[data-modal]").click(function () {
        modal($(this));
      });
    }
  });

  if (!isBuilder) {
    // open dropdown menu on hover
    if (!$.isMobile()) {
      const $menu = $("section.menu"), $width = $(window).width(), $collapsed = $menu.find(".navbar").hasClass("collapsed");
      // check if collapsed on
      if (!$collapsed) {
        // check width device
        if ($width > 991) {
          $menu.find("ul.navbar-nav li.dropdown").hover(
            function () {
              if (!$(this).hasClass("open")) {
                $(this).find("a")[0].click();
              }
            },
            function () {
              if ($(this).hasClass("open")) {
                $(this).find("a")[0].click();
              }
            }
          );
          $menu
            .find("ul.navbar-nav li.dropdown .dropdown-menu .dropdown")
            .hover(
              function () {
                if (!$(this).hasClass("open")) {
                  $(this).find("a")[0].click();
                }
              },
              function () {
                if ($(this).hasClass("open")) {
                  $(this).find("a")[0].click();
                }
              }
            );
        }
      }
    }
  }

  // Script for circle progress
  function initCircleProgress(card) {
    $(".pie_progress").asPieProgress({
      namespace: "asPieProgress",
      classes: {
        element: "pie_progress",
        number: "pie_progress__number",
      },
      min: 0,
      max: 100,
      size: 150,
      speed: 30,
      barsize: "8",
      fillcolor: "none",
      easing: "ease",
    });

    $(card)
      .find(".pie_progress")
      .each(function () {
        $(this).asPieProgress("go", $(this).attr("data-goal") + "%");
      });
  }

  function setCurrentCircleProgress(card, paramName) {
    const $elem = $(card).find("." + paramName);
    $elem.asPieProgress("go", $elem.attr("data-goal") + "%");
  }

  if (isBuilder) {
    $(document)
      .on("add.cards", event => {
        if ($(".pie_progress").length) {
          initCircleProgress(event.target);
        }
      })
      .on("delete.cards", event => {
        $(event.target).find(".pie_progress").asPieProgress("destroy");
      })
      .on("changeParameter.cards", (event, paramName) => {
        if (paramName.indexOf("progress") == 0) {
          if ($(".pie_progress").length) {
            setCurrentCircleProgress(event.target, paramName);
          }
        }
      });
  } else {
    if ($(".pie_progress").length) {
      initCircleProgress(document.body);
    }
  }

  //Script for countdown
  function initCountdown() {
    $(".countdown:not(.countdown-inited)").each(function () {
      $(this)
        .addClass("countdown-inited")
        .countdown($(this).attr("data-due-date"), function (event) {
          const $days = $(event.target)
            .closest(".countdown-cont")
            .find("div.daysCountdown")
            .attr("title");
          const $hours = $(event.target)
            .closest(".countdown-cont")
            .find("div.hoursCountdown")
            .attr("title");
          const $minutes = $(event.target)
            .closest(".countdown-cont")
            .find("div.minutesCountdown")
            .attr("title");
          const $seconds = $(event.target)
            .closest(".countdown-cont")
            .find("div.secondsCountdown")
            .attr("title");
          $(this).html(
            event.strftime(
              [
                '<div class="row">',
                '<div class="col-xs-12 col-sm-6 col-md-3">',
                '<span class="number-wrap">',
                '<span class="number display-2">%D</span>',
                '<span mbr-text class="period display-7">',
                $days,
                "</span>",
                '<span class="dot">:</span>',
                "</span>",
                "</div>",
                '<div class="col-xs-12 col-sm-6 col-md-3">',
                '<span class="number-wrap">',
                '<span class="number display-2">%H</span>',
                '<span mbr-text class="period display-7">',
                $hours,
                "</span>",
                '<span class="dot">:</span>',
                "</span>",
                "</div>",
                '<div class="col-xs-12 col-sm-6 col-md-3">',
                '<span class="number-wrap">',
                '<span class="number display-2">%M</span>',
                '<span mbr-text class="period display-7">',
                $minutes,
                "</span>",
                '<span class="dot">:</span>',
                "</span>",
                "</div>",
                '<div class="col-xs-12 col-sm-6 col-md-3">',
                '<span class="number-wrap">',
                '<span class="number display-2">%S</span>',
                '<span mbr-text class="period display-7">',
                $seconds,
                "</span>",
                "</span>",
                "</div>",
                "</div>",
              ].join("")
            )
          );
        });
    });

    $(".countdown:not(.countdown-inited)").each(function () {
      $(this).countdown($(this).attr("data-due-date"), function (event) {
        $(this).text(event.strftime("%D days %H:%M:%S"));
      });
    });
  }

  function changeCountdown(card, value) {
    const $reg = /\d\d\d\d\/\d\d\/\d\d/g, $target = $(card).find(".countdown");
    if (value.search($reg) > -1) {
      $target.removeClass("countdown-inited");
      initCountdown();
    }
  }

  if (isBuilder) {
    $(document)
      .on("add.cards", event => {
        if ($(".countdown").length != 0) {
          initCountdown();
        }
      })
      .on("changeParameter.cards", (event, paramName, value) => {
        if (paramName === "countdown") {
          changeCountdown(event.target, value);
        }
      });
  } else {
    if ($(".countdown").length != 0) {
      initCountdown();
    }
  }

  // script for flip images
  function bendBottomCorner() {
    $(".flip-card:not(.builderCard)").each(function () {
      $(this).addClass("builderCard");
    });
  }
  if (isBuilder) {
    $(document).on("add.cards", () => {
      if ($(".flip-card").length != 0) {
        bendBottomCorner();
      }
    });
  }

  // tabs
  function initTabs(target) {
    if ($(target).find(".nav-tabs").length !== 0) {
      $(target)
        .outerFind('section[id^="tabs"]')
        .each(function () {
          const componentID = $(this).attr("id");
          const $tabsNavItem = $(this).find(".nav-tabs .nav-item");
          const $tabPane = $(this).find(".tab-pane");

          $tabPane.removeClass("active").eq(0).addClass("active");

          $tabsNavItem
            .find("a")
            .removeClass("active")
            .removeAttr("aria-expanded")
            .eq(0)
            .addClass("active");

          $tabPane.each(function () {
            $(this).attr("id", componentID + "_tab" + $(this).index());
          });

          $tabsNavItem.each(function () {
            $(this)
              .find("a")
              .attr("href", "#" + componentID + "_tab" + $(this).index());
          });
        });
    }
  }

  if (isBuilder) {
    $(document).on("add.cards", e => {
      initTabs(e.target);
    });
  } else {
    initTabs(document.body);
  }

  // Testimonials Slider
  function setActiveCarouselItem(card) {
    const $target = $(card).find(".carousel-item:first");
    $target.addClass("active");
  }

  function initTestimonialsCarousel(card) {
    const $target = $(card), $carouselID = $target.attr("ID") + "-carousel";

    $target.find(".carousel").attr("id", $carouselID);
    $target.find(".carousel-controls a").attr("href", "#" + $carouselID);
    setActiveCarouselItem($target);
  }

  if (isBuilder) {
    $(document)
      .on("add.cards", event => {
        if ($(".testimonials-slider").length != 0) {
          initTestimonialsCarousel(event.target);
        }
      })
      .on("changeParameter.cards", (event, paramName, value) => {
        if (paramName === "testimonialsSlides") {
          if ($(event.target).find(".carousel-item.active").length == 0) {
            setActiveCarouselItem(event.target);
          }
        }
      });
  } else {
    if ($(".testimonials-slider").length != 0) {
      $(".testimonials-slider").each(function () {
        initTestimonialsCarousel(this);
      });
    }
  }

  // Toggle and Accordion switch arrow
  if (!isBuilder) {
    $(document).ready(() => {
      if ($(".accordionStyles").length != 0) {
        $('.accordionStyles .card-header a[role="button"]').each(function () {
          if (!$(this).hasClass("collapsed")) {
            $(this).addClass("collapsed");
          }
        });
      }
    });

    $('.accordionStyles .card-header a[role="button"]').click(function () {
      const $id = $(this).closest(".accordionStyles").attr("id"), $iscollapsing = $(this).closest(".card").find(".panel-collapse");

      if (!$iscollapsing.hasClass("collapsing")) {
        if ($id.indexOf("toggle") != -1) {
          if ($(this).hasClass("collapsed")) {
            $(this)
              .find("span.sign")
              .removeClass("mbri-arrow-down")
              .addClass("mbri-arrow-up");
          } else {
            $(this)
              .find("span.sign")
              .removeClass("mbri-arrow-up")
              .addClass("mbri-arrow-down");
          }
        } else if ($id.indexOf("accordion") != -1) {
          const $accordion = $(this).closest(".accordionStyles ");

          $accordion.children(".card").each(function () {
            $(this)
              .find("span.sign")
              .removeClass("mbri-arrow-up")
              .addClass("mbri-arrow-down");
          });
          if ($(this).hasClass("collapsed")) {
            $(this)
              .find("span.sign")
              .removeClass("mbri-arrow-down")
              .addClass("mbri-arrow-up");
          }
        }
      }
    });
  }

  // Clients block
  function initClientCarousel(card) {
    const $target = $(card);
    const countElems = $target.find(".carousel-item").length;
    let visibleSlides = $target.find(".carousel-inner").attr("data-visible");
    if (countElems < visibleSlides) {
      visibleSlides = countElems;
    }
    $target
      .find(".carousel-inner")
      .attr("class", "carousel-inner slides" + visibleSlides);
    $target.find(".clonedCol").remove();

    $target.find(".carousel-item .col-md-12").each(function () {
      if (visibleSlides < 2) {
        $(this).attr("class", "col-md-12");
      } else if (visibleSlides == "5") {
        $(this).attr("class", "col-md-12 col-lg-15");
      } else {
        $(this).attr("class", "col-md-12 col-lg-" + 12 / visibleSlides);
      }
    });

    $target.find(".carousel-item").each(function () {
      let itemToClone = $(this);
      for (let i = 1; i < visibleSlides; i++) {
        itemToClone = itemToClone.next();
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(":first");
        }
        const index = itemToClone.index();
        itemToClone
          .find(".col-md-12:first")
          .clone()
          .addClass("cloneditem-" + i)
          .addClass("clonedCol")
          .attr("data-cloned-index", index)
          .appendTo($(this).children().eq(0));
      }
    });
  }

  function updateClientCarousel(card) {
    const $target = $(card);
    const countElems = $target.find(".carousel-item").length;
    let visibleSlides = $target.find(".carousel-inner").attr("data-visible");
    if (countElems < visibleSlides) {
      visibleSlides = countElems;
    }
    $target.find(".clonedCol").remove();
    $target.find(".carousel-item").each(function () {
      let itemToClone = $(this);
      for (let i = 1; i < visibleSlides; i++) {
        itemToClone = itemToClone.next();
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(":first");
        }
        const index = itemToClone.index();
        itemToClone
          .find(".col-md-12:first")
          .clone()
          .addClass("cloneditem-" + i)
          .addClass("clonedCol")
          .attr("data-cloned-index", index)
          .appendTo($(this).children().eq(0));
      }
    });
  }

  function clickHandler(e) {
    e.stopPropagation();
    e.preventDefault();

    const $target = $(e.target);
    let curItem;
    let curIndex;

    if ($target.closest(".clonedCol").length) {
      curItem = $target.closest(".clonedCol");
      curIndex = curItem.attr("data-cloned-index");
    } else {
      curItem = $target.closest(".carousel-item");
      curIndex = curItem.index();
    }
    const item = $(
      $target.closest(".carousel-inner").find(".carousel-item")[curIndex]
    ).find("img")[0];

    if ($target.parents(".clonedCol").length > 0) {
      item.click();
    }
  }

  if (isBuilder) {
    $(document)
      .on("add.cards", event => {
        if (!$(event.target).hasClass("clients")) {
          return;
        }
        initTestimonialsCarousel(event.target);
        initClientCarousel(event.target);
        if (event.type === "add") {
          $(event.target).on("slide.bs.carousel", () => {
            updateClientCarousel(event.target);
          });
        }
        $(event.target)
          .find(".carousel-item [mbr-media]")
          .on("click", e => {
            clickHandler(e);
          });
        $(event.target).on("slide.bs.carousel", () => {
          $(event.target)
            .find(".carousel-item .clonedCol [mbr-media]")
            .off("click")
            .on("click", e => {
              clickHandler(e);
            });
        });
      })
      .on("changeParameter.cards", (event, paramName, value) => {
        if (paramName == "slidesCount") {
          if ($(event.target).find(".carousel-item.active").length == 0) {
            setActiveCarouselItem(event.target);
          }
        }
        initClientCarousel(event.target);
        updateClientCarousel(event.target);
        $(event.target)
          .find(".carousel-item [mbr-media]")
          .on("click", e => {
            clickHandler(e);
          });
        $(event.target).on("slide.bs.carousel", () => {
          $(event.target)
            .find(".carousel-item .clonedCol [mbr-media]")
            .off("click")
            .on("click", e => {
              clickHandler(e);
            });
        });
      })
      .on("changeContent.cards", (event, type) => {
        updateClientCarousel(event.target);
        try {
          $(event.target).closest(".carousel").carousel("next");
        } catch (err) {}
      });
  } else {
    $(document.body)
      .find(".clients")
      .each(function (index, el) {
        initTestimonialsCarousel($(this));
        initClientCarousel($(this));
      });
  }

  // Table Block;
  function getRowCount(card) {
    const $tbodyRows = $(card).find(".table tbody tr").length;
    $(card).find(".dataTables_info span.infoRows").text($tbodyRows);
  }

  function initTable(
    card,
    isSearch,
    searchText,
    infoBefore,
    infoAfter,
    infoFilteredBefore,
    infoFilteredAfter
  ) {
    const $target = $(card);
    $target.find("table").dataTable({
      retrieve: true,
      paging: false,
      aaSorting: [],
      scrollX: true,
      searching: isSearch,
      info: isSearch,
      language: {
        search: searchText,
        info: infoBefore + " _END_ " + infoAfter,
        infoEmpty: infoBefore + " _END_ " + infoAfter,
        infoFiltered: infoFilteredBefore + " _MAX_ " + infoFilteredAfter,
      },
    });
  }

  function getDisplayClass(arr) {
    let display = "";
    $.each(arr, (index, el) => {
      if (el.indexOf("display") == 0) {
        display = el;
      }
    });
    return display;
  }

  if (isBuilder) {
    $(document)
      .on("add.cards", event => {
        if ($(event.target).hasClass("section-table")) {
          getRowCount(event.target);
        }
      })
      .on("changeParameter.cards", (event, paramName) => {
        if (paramName == "tableColumns" || paramName == "tableRows") {
          getRowCount(event.target);
        }
      });
  } else {
    if ($(document).find("section.section-table").length != 0) {
      $("section.section-table").each(function () {
        const isSearch = $(this).find("table").is(".isSearch");
        if (isSearch) {
          const infoBefore = $(this)
                    .find(".dataTables_info span.infoBefore")
                    .text(),
                infoAfter = $(this).find(".dataTables_info span.infoAfter").text(),
                infoFilteredBefore = $(this)
                  .find(".dataTables_info span.infoFilteredBefore")
                  .text(),
                infoFilteredAfter = $(this)
                  .find(".dataTables_info span.infoFilteredAfter")
                  .text();
          (searchText = $(this)
            .find(".dataTables_filter label.searchInfo")
            .text()),
            (infoClasses = $(this)
              .find(".dataTables_info")
              .attr("class")
              .split(/\s/)),
            (searchClasses = $(this)
              .find(".dataTables_filter label.searchInfo")
              .attr("class")
              .split(/\s/)),
            (displayInfoFont = getDisplayClass(infoClasses)),
            (displayFilterFont = getDisplayClass(searchClasses));

          $(this).find(".row.search").remove();
          $(this).find(".table-wrapper .scroll").removeClass("scroll");
          $(this).find(".row.info").remove();
          initTable(
            $(this),
            isSearch,
            searchText,
            infoBefore,
            infoAfter,
            infoFilteredBefore,
            infoFilteredAfter
          );
          $(this).find(".dataTables_info").addClass(displayInfoFont);
          $(this).find(".dataTables_filter label").addClass(displayFilterFont);
        } else {
          $(this).find(".row.search").remove();
          $(this).find(".table-wrapper .scroll").removeClass("scroll");
          $(this).find(".row.info").remove();
          initTable($(this), isSearch);
        }
      });
    }
  }

  // Cards With Popup Buttons
  if (!isBuilder) {
    if ($("section.popup-btn-cards").length != 0) {
      $("section.popup-btn-cards .card-wrapper").each(function (index, el) {
        $(this).addClass("popup-btn");
      });
    }
  }
})(jQuery);
!(() => {
  try {
    document
      .getElementsByClassName("engine")[0]
      .getElementsByTagName("a")[0]
      .removeAttribute("rel");
  } catch (b) {}
  if (!document.getElementById("top-1")) {
    const a = document.createElement("section");
    a.id = "top-1";
    a.className = "engine";
    a.innerHTML =
      '<a href="https://mobirise.info">Mobirise</a> Mobirise v4.3.5';
    document.body.insertBefore(a, document.body.childNodes[0]);
  }
})();
