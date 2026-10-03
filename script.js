(function () {
    'use strict';
    var d = document, $ = function (s) { return d.querySelector(s) }, $$ = function (s) { return d.querySelectorAll(s) };
    d.documentElement.classList.add('js');
    var burger = $('#burger'), nav = $('#nav');
    function menu(o) { nav.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu') }
    burger.addEventListener('click', function () { menu(!nav.classList.contains('open')) });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') menu(false) });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { menu(false); burger.focus() } });
    var bar = $('#progress'), top = $('#totop');
    function onScroll() { var h = d.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; top.hidden = scrollY < 600 }
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    top.addEventListener('click', function () { scrollTo({ top: 0 }) });
    var brand = $('.brand'), links = $$('nav a');
    function setNav(id) { links.forEach(function (a) { var on = a.getAttribute('href') === id; a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current') }) }
    if ('IntersectionObserver' in window) {
        var so = new IntersectionObserver(function (es) {
            es.forEach(function (e) {
                if (!e.isIntersecting) return;
                var id = e.target.id;
                if (/^p\d$/.test(id)) { setNav('#p1'); brand.textContent = e.target.dataset.title }
                else { setNav('#' + id); brand.textContent = '3ooda' }
            })
        }, { rootMargin: '-40% 0px -55% 0px' });
        $$('main > section, main > article').forEach(function (s) { so.observe(s) });
        var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target) } }) }, { threshold: .1 });
        $$('.ch-body,.toc,.metrics,.tt,.record .intro').forEach(function (el) { el.classList.add('reveal'); ro.observe(el) });
    }
})();
