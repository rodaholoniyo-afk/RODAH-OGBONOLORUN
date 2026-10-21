(function(){
  'use strict';

  /* ===== SITE DETAILS (edit here if anything changes) ===== */
  var SITE = {
    name: 'Rodah Ogbonolorun',
    title: 'Commercial Real Estate Underwriter & Virtual Assistant',
    email: 'rodaholoniyo@gmail.com',
    phone: '+234 816 964 5795',
    location: 'Ilorin, Kwara State, Nigeria',
    linkedin: 'https://www.linkedin.com/in/oloniyorodah/',
    portfolio: 'https://oloniyo-rodah-portfolio.my.canva.site/'
  };

  var t0 = performance.now();

  /* ===== CONSOLE HELPERS ===== */
  var tag = 'background:#1d4ed8;color:#fff;padding:2px 8px;border-radius:4px;font-weight:bold';
  function log(msg, data){
    if(data !== undefined){ console.log('%c SITE %c ' + msg, tag, '', data); }
    else { console.log('%c SITE %c ' + msg, tag, ''); }
  }
  function warn(msg){ console.warn('[SITE] ' + msg); }

  /* ===== WELCOME BANNER ===== */
  console.log('%c' + SITE.name, 'font-size:26px;font-weight:800;color:#1d4ed8');
  console.log('%c' + SITE.title, 'font-size:14px;font-weight:600;color:#0b9a8a');
  console.log('%cThanks for checking the console! Type rodah.help() for commands.', 'color:#7c3aed');
  console.table({
    Email: SITE.email,
    Phone: SITE.phone,
    Location: SITE.location,
    LinkedIn: SITE.linkedin,
    Portfolio: SITE.portfolio
  });

  /* ===== ELEMENT CHECK ===== */
  var ids = ['year','links','menuBtn','themeBtn','contactForm','name','email','subject','message','status'];
  var missing = ids.filter(function(id){ return !document.getElementById(id); });
  if(missing.length){ warn('Missing elements in index.html: ' + missing.join(', ')); }
  else { log('All required page elements found ✔'); }

  /* ===== FOOTER YEAR ===== */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ===== MOBILE MENU ===== */
  var links = document.getElementById('links');
  document.getElementById('menuBtn').addEventListener('click', function(){
    var open = links.classList.toggle('open');
    log('Mobile menu ' + (open ? 'opened' : 'closed'));
  });
  links.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
      links.classList.remove('open');
      log('Navigated to ' + e.target.getAttribute('href'));
    }
  });

  /* ===== THEME TOGGLE ===== */
  var root = document.documentElement;
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  log('Device theme preference: ' + (prefersDark ? 'dark' : 'light'));
  document.getElementById('themeBtn').addEventListener('click', function(){
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    log('Theme switched to ' + next);
  });

  /* ===== REVEAL ON SCROLL + SKILL BARS ===== */
  var skillData = {};
  document.querySelectorAll('.bar').forEach(function(b){
    skillData[b.querySelector('.l span').textContent] = b.dataset.v + '%';
  });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        en.target.classList.add('show');
        var bars = en.target.querySelectorAll('.bar');
        bars.forEach(function(b){
          b.querySelector('.fill').style.width = b.dataset.v + '%';
        });
        if(bars.length){ log('Skill bars animated', skillData); }
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* ===== ACTIVE NAV LINK + SECTION LOG ===== */
  var current = '';
  var navLinks = document.querySelectorAll('.links a');
  var so = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        navLinks.forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
        if(current !== en.target.id){
          current = en.target.id;
          log('Viewing section: ' + current);
        }
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('section[id]').forEach(function(s){ so.observe(s); });

  /* ===== EXTERNAL LINK CLICKS ===== */
  document.querySelectorAll('a[target="_blank"]').forEach(function(a){
    a.addEventListener('click', function(){ log('Opening external link: ' + a.href); });
  });

  /* ===== CONTACT FORM ===== */
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    var n = document.getElementById('name').value.trim();
    var em = document.getElementById('email').value.trim();
    var s = document.getElementById('subject').value.trim() || 'Website enquiry';
    var m = document.getElementById('message').value.trim();
    var st = document.getElementById('status');

    if(!n || !em || !m){
      st.textContent = 'Please fill in your name, email and message.';
      warn('Contact form blocked. Missing: ' +
        [!n && 'name', !em && 'email', !m && 'message'].filter(Boolean).join(', '));
      return;
    }
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    if(!okEmail){
      st.textContent = 'Please enter a valid email address.';
      warn('Contact form blocked. Invalid email: ' + em);
      return;
    }

    log('Contact form valid, opening email app', {name:n, email:em, subject:s, messageLength:m.length});
    var body = encodeURIComponent(m + '\n\nFrom: ' + n + ' (' + em + ')');
    window.location.href = 'mailto:' + SITE.email + '?subject=' + encodeURIComponent(s) + '&body=' + body;
    st.textContent = 'Opening your email app…';
  });

  /* ===== ERRORS ===== */
  window.addEventListener('error', function(e){
    console.error('[SITE] JavaScript error: ' + e.message + ' (line ' + e.lineno + ')');
  });

  /* ===== LOAD TIME ===== */
  window.addEventListener('load', function(){
    var nav = performance.getEntriesByType('navigation')[0];
    var ms = nav ? Math.round(nav.loadEventStart) : Math.round(performance.now());
    log('Page fully loaded in ~' + ms + ' ms (script ready in ' + Math.round(performance.now() - t0) + ' ms)');
    log('Screen: ' + window.innerWidth + 'x' + window.innerHeight + (window.innerWidth <= 820 ? ' (mobile layout)' : ' (desktop layout)'));
  });

  /* ===== CONSOLE COMMANDS: type these in the console ===== */
  window.rodah = {
    help: function(){
      console.log('%cAvailable commands', 'font-weight:bold;color:#1d4ed8');
      console.table({
        'rodah.contact()': 'Show my contact details',
        'rodah.links()': 'Show LinkedIn and portfolio links',
        'rodah.skills()': 'Show skill levels',
        'rodah.theme()': 'Show the current theme'
      });
    },
    contact: function(){ console.table({Email:SITE.email, Phone:SITE.phone, Location:SITE.location}); },
    links: function(){ console.table({LinkedIn:SITE.linkedin, Portfolio:SITE.portfolio}); },
    skills: function(){ console.table(skillData); },
    theme: function(){ console.log('Theme: ' + (root.getAttribute('data-theme') || ('auto (' + (prefersDark ? 'dark' : 'light') + ')'))); }
  };
})();