/* YourKitchen — shared site scripts */

(function () {
  var body = document.body;
  var toggle = document.getElementById('navToggle');

  // Mobile hamburger
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  // Tapping any nav link closes the overlay
  var navLinks = document.querySelectorAll('.nav-links a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      body.classList.remove('nav-open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  // Close overlay on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') body.classList.remove('nav-open');
  });

  // Footer year
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Share / copy link button (Home)
  window.shareLink = function () {
    var url = 'https://yourkitchen.app';
    var btn = document.querySelector('.refer-btn');
    function done() {
      if (!btn) return;
      var orig = btn.textContent;
      btn.textContent = '✓ Link copied!';
      setTimeout(function () { btn.textContent = orig; }, 2400);
    }
    if (navigator.share) {
      navigator.share({ title: 'YourKitchen', text: 'Your kitchen, covered.', url: url });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done();
    }
  };
})();
