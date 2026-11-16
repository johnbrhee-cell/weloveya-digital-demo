window.__eyaExport = /[?&]export/.test(location.search); window.__eyaSizes = /[?&]sizes/.test(location.search);
/* WELOVEYA DIGITAL — moteur des planches de maquettes.
   - Mode planche : toutes les maquettes d'un produit sur un canevas (équivalent d'une page Figma).
   - Mode prototype (?proto) : un écran à la fois, navigation par les attributs data-go.
   - Injecte les éléments répétés (barre d'état, navigation, barre latérale) pour qu'ils restent identiques partout. */
(function () {
  const FILES = [
    ['index.html', 'Sommaire'],
    ['design-system.html', 'Design system'],
    ['festival-app.html', 'App · Découverte'],
    ['festival-billets.html', 'App · Billets'],
    ['festival-services.html', 'App · Services'],
    ['eya-live.html', 'Live'],
    ['eya-watch-backstage.html', 'Watch Party · Backstage'],
    ['eya-community.html', 'Community'],
    ['eya-community-groupes.html', 'Community · Groupes'],
    ['eya-access.html', 'Access'],
    ['eya-merchant.html', 'Merchant'],
    ['control-center.html', 'Control Center'],
    ['control-center-gestion.html', 'Control Center · Gestion'],
    ['site-immersif.html', 'Site 3D'],
    ['site-public.html', 'Site · contenus'],
    ['site-public-infos.html', 'Site · Infos'],
    ['prototypes.html', 'Prototypes'],
    ['ecrans.html', 'Tous les écrans'],
  ];
  const TABS = [
    ['accueil', 'Accueil', 'house', 'festival-app.html#FA-07'],
    ['live', 'Live', 'tv-minimal-play', 'eya-live.html#LV-01'],
    ['communaute', 'Communauté', 'users-round', 'eya-community.html#CM-01'],
    ['festival', 'Festival', 'tent', 'festival-services.html#FA-34'],
    ['profil', 'Profil', 'circle-user-round', 'festival-services.html#FA-30'],
  ];
  const SIDE = [
    ['Pilotage', [['dashboard', 'Dashboard', 'layout-dashboard', 'control-center.html#CC-01'], ['editions', 'Éditions', 'calendar-range', 'control-center.html#CC-02']]],
    ['Festival', [['billetterie', 'Billetterie', 'ticket', 'control-center.html#CC-03'], ['festivaliers', 'Festivaliers', 'users', 'control-center.html#CC-04'], ['artistes', 'Artistes', 'mic-vocal', 'control-center.html#CC-08'], ['programmation', 'Programmation', 'calendar-clock', 'control-center.html#CC-09'], ['acces', 'Accès', 'scan-line', 'control-center.html#CC-10'], ['rfid', 'Bracelets RFID', 'nfc', 'control-center.html#CC-11']]],
    ['Numérique', [['live', 'EYA LIVE', 'radio', 'control-center.html#CC-05'], ['abonnements', 'Abonnements', 'badge-check', 'control-center.html#CC-06'], ['community', 'EYA COMMUNITY', 'messages-square', 'control-center.html#CC-07']]],
    ['Services', [['food', 'EYA FOOD', 'utensils', 'control-center-gestion.html#CC-12'], ['shop', 'EYA SHOP', 'shopping-bag', 'control-center-gestion.html#CC-13'], ['care', 'EYA CARE', 'heart-handshake', 'control-center-gestion.html#CC-14'], ['business', 'EYA BUSINESS', 'briefcase-business', 'control-center-gestion.html#CC-15'], ['loyalty', 'EYA LOYALTY', 'gem', 'control-center-gestion.html#CC-16']]],
    ['Relation', [['notifications', 'Notifications', 'bell', 'control-center-gestion.html#CC-17'], ['support', 'Support', 'life-buoy', 'control-center-gestion.html#CC-18']]],
    ['Gestion', [['finances', 'Finances', 'wallet', 'control-center-gestion.html#CC-19'], ['rapports', 'Rapports', 'chart-column', 'control-center-gestion.html#CC-20'], ['utilisateurs', 'Utilisateurs', 'user-cog', 'control-center-gestion.html#CC-21'], ['roles', 'Rôles', 'key-round', 'control-center-gestion.html#CC-22'], ['securite', 'Sécurité', 'shield-check', 'control-center-gestion.html#CC-23'], ['parametres', 'Paramètres', 'settings', 'control-center-gestion.html#CC-24']]],
  ];
  const SITE = [['festival', 'Festival', 'site-public.html#SW-03'], ['artistes', 'Artistes', 'site-public.html#SW-05'], ['programmation', 'Programmation', 'site-public.html#SW-06'], ['billetterie', 'Billetterie', 'site-public.html#SW-07'], ['live', 'EYA LIVE', 'site-public.html#SW-08'], ['community', 'Community', 'site-public.html#SW-09'], ['shop', 'Shop', 'site-public-infos.html#SW-11']];
  const ic = (n, c = '') => `<i class="ic icon-${n} ${c}"></i>`;
  const LOGO = '<span class="logo">WELOV<i>EYA</i><small>DIGITAL</small></span>';
  const here = location.pathname.split('/').pop() || 'index.html';
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Éléments répétés
  $$('.statusbar').forEach(e => { if (!e.innerHTML.trim()) e.innerHTML = `<span>9:41</span><span class="sb-r">${ic('signal', 'ic-s')}${ic('wifi', 'ic-s')}${ic('battery-full', 'ic-s')}</span>`; });
  $$('.phone').forEach(p => { if (!p.classList.contains('phone--bare')) p.insertAdjacentHTML('beforeend', '<span class="home-ind"></span>'); });
  $$('nav.tabbar[data-tab]').forEach(n => { n.innerHTML = TABS.map(t => `<a data-go="${t[3]}" class="${t[0] === n.dataset.tab ? 'is-on' : ''}">${ic(t[2])}${t[1]}</a>`).join(''); });
  $$('aside.side[data-on]').forEach(s => {
    s.innerHTML = `<div class="side__brand">${LOGO}<div class="caption soft mt2">Control Center</div></div>` + SIDE.map(g => `<div class="side__g">${g[0]}</div>` + g[1].map(i => `<a data-go="${i[3]}" class="${i[0] === s.dataset.on ? 'is-on' : ''}">${ic(i[2])}${i[1]}</a>`).join('')).join('');
  });
  $$('header.topbar[data-title]').forEach(t => {
    t.innerHTML = `<div class="fsel" data-go="control-center.html#CC-02">${ic('calendar-range', 'ic-s')}<b>WeLovEya 2026</b>${ic('chevrons-up-down', 'ic-s')}</div><span class="badge badge--demo">Environnement de démonstration</span><div class="grow"></div><div class="search" style="width:280px;height:38px;font-size:13px">${ic('search', 'ic-s')}Rechercher…<span class="badge" style="margin-left:auto">⌘K</span></div><span class="iconbtn" data-go="control-center-gestion.html#CC-17">${ic('bell')}<span class="dot"></span></span><span class="av av--s av--d">AD</span>`;
  });
  $$('nav.nav[data-on]').forEach(n => {
    n.innerHTML = `<a data-go="site-public.html#SW-01">${LOGO}</a><div class="grow"></div>` + SITE.map(i => `<a data-go="${i[2]}" class="${i[0] === n.dataset.on ? 'is-on' : ''}">${i[1]}</a>`).join('') + `<span class="fsel" style="background:none">${ic('globe', 'ic-s')}<b>FR</b></span><a class="btn btn--outline btn--s" data-go="site-public-infos.html#SW-17" style="color:var(--t-fort)">Se connecter</a><a class="btn btn--primary btn--s" data-go="site-public.html#SW-07" style="color:var(--encre)">Billets</a>`;
  });
  $$('footer.foot').forEach(f => {
    if (f.innerHTML.trim()) return;
    const col = (t, l) => `<div class="col g3"><div class="over">${t}</div>${l.map(x => `<a class="small muted" data-go="${x[1]}">${x[0]}</a>`).join('')}</div>`;
    f.innerHTML = `<div class="container"><div class="row top between g8 wrap"><div class="col g4" style="max-width:320px">${LOGO}<p class="small muted">Proposition indépendante de plateforme numérique. Maquette de conception — aucune affiliation officielle n'est revendiquée à ce stade.</p></div>${col('Festival', [['Présentation', 'site-public.html#SW-02'], ['Éditions', 'site-public.html#SW-04'], ['Artistes', 'site-public.html#SW-05'], ['Programmation', 'site-public.html#SW-06']])}${col('Plateforme', [['EYA LIVE', 'site-public.html#SW-08'], ['EYA COMMUNITY', 'site-public.html#SW-09'], ['EYA CARE', 'site-public-infos.html#SW-10'], ['EYA SHOP', 'site-public-infos.html#SW-11']])}${col('Aide', [['FAQ', 'site-public-infos.html#SW-14'], ['Contact', 'site-public-infos.html#SW-13'], ['Partenaires', 'site-public-infos.html#SW-12']])}${col('Légal', [["Conditions d'utilisation", 'site-public-infos.html#SW-15'], ['Confidentialité', 'site-public-infos.html#SW-16']])}</div><hr class="sep" style="margin:40px 0 24px"><div class="row between small soft"><span>© 2026 WELOVEYA DIGITAL — données de démonstration</span><span class="row g4"><a>Instagram</a><a>YouTube</a><a>Facebook</a></span></div></div>`;
  });

  // QR codes réels (charge utile de démonstration lisible par tout lecteur)
  $$('.qr[data-qr]').forEach(q => {
    if (typeof qrcode !== 'function') return;
    const g = qrcode(0, 'M'); g.addData(q.dataset.qr); g.make();
    q.innerHTML = g.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  });

  // Légendes
  $$('figure.shot').forEach(s => {
    if (!s.querySelector('figcaption')) s.insertAdjacentHTML('afterbegin', `<figcaption><code>${s.id}</code>${s.dataset.name || ''}</figcaption>`);
  });

  // En-tête de planche
  const proto = new URLSearchParams(location.search).has('proto');
  if (document.body.classList.contains('board') || proto) {
    document.body.insertAdjacentHTML('afterbegin', `<div class="board-head"><a href="index.html">${LOGO}</a><span class="badge badge--demo">Maquettes v0.2</span><nav>${FILES.map(f => `<a href="${f[0]}" class="${f[0] === here ? 'is-on' : ''}">${f[1]}</a>`).join('')}${$$('figure.shot').length ? `<a href="?proto" style="color:var(--creme)">▶ Prototype</a>` : ''}</nav></div>`);
  }

  // Navigation
  const shots = $$('figure.shot');
  const stack = [];
  function note(m) { const d = document.createElement('div'); d.textContent = m; d.style.cssText = 'position:fixed;left:50%;top:76px;transform:translateX(-50%);z-index:300;padding:10px 16px;border-radius:999px;background:#F4EDB4;color:#141414;font:700 13px/1 Kumbh Sans,sans-serif'; document.body.appendChild(d); setTimeout(() => d.remove(), 1800); }
  function show(id, push = true) {
    const t = document.getElementById(id);
    if (!t) { if (id) note('Écran ' + id + ' absent de cette planche'); return false; }
    if (proto) {
      const cur = document.querySelector('.shot.is-current');
      if (cur && push && cur.id !== id) stack.push(cur.id);
      shots.forEach(s => s.classList.toggle('is-current', s === t));
      const c = document.querySelector('.proto-bar code'); if (c) c.textContent = id + ' · ' + (t.dataset.name || '');
      history.replaceState(null, '', '?proto#' + id);
      window.scrollTo(0, 0);
    } else {
      t.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      t.animate([{ outline: '3px solid #FF6D43', outlineOffset: '14px' }, { outline: '3px solid transparent', outlineOffset: '14px' }], { duration: 1400 });
    }
    return true;
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-go]');
    if (!el) return;
    e.preventDefault();
    const go = el.dataset.go;
    if (go === 'back') { const b = stack.pop(); if (b) show(b, false); return; }
    if (go.includes('.html')) {
      const [f, h] = go.split('#');
      if (f === here) { show(h); return; }
      location.href = f + (proto ? '?proto' : '') + (h ? '#' + h : '');
      return;
    }
    show(go);
  });
  if (proto) {
    document.body.classList.remove('board'); document.body.classList.add('proto');
    document.body.insertAdjacentHTML('beforeend', `<div class="proto-bar"><button data-go="back">← Retour</button><code></code><a href="${here}">Planche</a><a href="index.html">Sommaire</a></div>`);
    show(location.hash.slice(1), false) || (shots[0] && show(shots[0].id, false));
  } else if (location.hash) { setTimeout(() => show(location.hash.slice(1)), 200); }
})();

/* Outils d'export : ?sizes écrit la liste des écrans et leurs dimensions ; ?proto&export#ID affiche un écran seul, sans barre. */
(function () {
  if (window.__eyaExport) document.body.classList.add('export');
  if (!window.__eyaSizes) return;
  const out = [...document.querySelectorAll('figure.shot')].map(f => {
    f.style.zoom = 1;
    const k = [...f.children].filter(c => c.tagName !== 'FIGCAPTION');
    const r = k.map(c => c.getBoundingClientRect());
    const w = Math.max(...r.map(x => x.right)) - Math.min(...r.map(x => x.left));
    const h = Math.max(...r.map(x => x.bottom)) - Math.min(...r.map(x => x.top));
    return [f.id, f.dataset.name || '', Math.ceil(w), Math.ceil(h), f.classList.contains('shot--desk') ? 1 : 0, (f.closest('section') && f.closest('section').querySelector('header h2') || {}).textContent || ''].join('\t');
  });
  const pre = document.createElement('pre'); pre.id = 'eya-sizes'; pre.textContent = out.join('\n'); document.body.appendChild(pre);
})();
