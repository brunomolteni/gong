function auto_grow(element) {
  element.style.height = element.scrollHeight + "px";
}
function throttle(callback, limit) {
  var wait = false;
  return function() {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  };
}

function debounce (fn, delay) {
  var timeoutID = null
  return function () {
    clearTimeout(timeoutID)
    var args = arguments
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, args)
    }, delay)
  }
}

function setActive() {
  var links = document.querySelectorAll("header nav a");
  [].forEach.call(links, function(link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === window.location.hash)
      link.classList.add("active");
  });
}

function hash(newHash) {
  if(window.location.hash.substring(1) === newHash) return;

  if (history.pushState) {
    history.pushState(null, null, "#" + newHash);
  } else {
    location.hash = newHash;
  }

  setActive();
}

function scrollHandler() {
  var top = document.body.scrollTop,
    i = "Inicio",
    s = "Servicios",
    p = "Porque-elegirnos",
    c = "Contacto",
    servicios = document.getElementById(s).getBoundingClientRect(),
    porque = document.getElementById(p).getBoundingClientRect(),
    contacto = document.getElementById(c).getBoundingClientRect();

  // STICKY HEADER

  if (top > 1) {
    document.body.className = "sticky";
  } else {
    document.body.className = "";
  }

  // HASHES

  servicios.top > 1 && hash(i);

  servicios.top < 1 && porque.top > 1 && hash(s);

  porque.top < 1 && contacto.top > 1 && hash(p);

  contacto.top < 1 &&  hash(c);

}

var scrolling = false;

document.body.addEventListener('scroll', function() {
  debounce(scrollHandler, 100)();
});

window.onhashchange = setActive;
setActive();
