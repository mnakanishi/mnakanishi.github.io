// Slider component
function makeSlider(trackId, prevId, nextId, dotsId, perPage) {
  var track = document.getElementById(trackId);
  if (!track) return;
  var cards = track.children;
  var total = cards.length;
  var pages = Math.ceil(total / perPage);
  var cur = 0;
  var dotsEl = document.getElementById(dotsId);

  for (var i = 0; i < pages; i++) {
    var d = document.createElement('button');
    d.className = 's-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.dataset.i = i;
    d.onclick = (function(idx) { return function() { go(idx); }; })(i);
    dotsEl.appendChild(d);
  }

  function go(idx) {
    cur = Math.max(0, Math.min(idx, pages - 1));
    var cardW = cards[0].offsetWidth + 14;
    track.style.transform = 'translateX(-' + (cur * perPage * cardW) + 'px)';
    var dots = dotsEl.querySelectorAll('.s-dot');
    dots.forEach(function(d, i) {
      d.className = 's-dot' + (i === cur ? ' active' : '');
    });
  }

  document.getElementById(prevId).onclick = function() { go(cur - 1); };
  document.getElementById(nextId).onclick = function() { go(cur + 1); };

  // Recalculate on resize
  window.addEventListener('resize', function() { go(cur); });
}

// Init sliders
document.addEventListener('DOMContentLoaded', function() {
  var isMobile = window.innerWidth < 680;
  makeSlider('t-track', 't-prev', 't-next', 't-dots', isMobile ? 1 : 2);
  makeSlider('b-track', 'b-prev', 'b-next', 'b-dots', isMobile ? 1 : 3);
});

// Contact form with Formspree
var form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function(res) {
      if (res.ok) {
        form.reset();
        var success = document.getElementById('form-success');
        if (success) { success.style.display = 'block'; }
      }
    });
  });
}
