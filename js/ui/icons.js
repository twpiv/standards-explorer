/* Inline SVG icons (stroke icons, 24x24 grid). icon(name) returns an SVG string. */
(function (SE) {
  'use strict';
  var P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bookmark: '<path d="M6 4h12v17l-6-4-6 4z"/>',
    bookmarkFill: '<path d="M6 4h12v17l-6-4-6 4z" fill="currentColor"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    map: '<circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="6" r="2"/><circle cx="19.5" cy="6" r="2"/><circle cx="4.5" cy="18" r="2"/><circle cx="19.5" cy="18" r="2"/><path d="M6.2 7.2l3.4 2.9M17.8 7.2l-3.4 2.9M6.2 16.8l3.4-2.9M17.8 16.8l-3.4-2.9"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 20h14"/>',
    upload: '<path d="M12 20V9M7 14l5-5 5 5"/><path d="M5 4h14"/>',
    print: '<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="7" rx="1.5"/><path d="M7 14h10v6H7z"/>',
    trash: '<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
    note: '<path d="M5 4h14v12l-4 4H5z"/><path d="M15 20v-4h4M8 9h8M8 13h5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    layers: '<path d="M12 4l9 5-9 5-9-5z"/><path d="M3 14l9 5 9-5"/>',
    prior: '<path d="M4 18h4v-4h4v-4h4V6h4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    lightbulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17v.5"/>',
    topic: '<path d="M4 6h7l2 2h7v10H4z"/>',
    atom: '<circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
    cart: '<rect x="3" y="9" width="14" height="6" rx="1"/><circle cx="7" cy="17" r="2"/><circle cx="14" cy="17" r="2"/><path d="M17 12h4M21 12l-2-2M21 12l-2 2"/>',
    car: '<path d="M3 15v-3l2-4h10l3 4h3v3z"/><circle cx="7" cy="16" r="2"/><circle cx="17" cy="16" r="2"/>',
    rocket: '<path d="M12 2c3 3 4 7 4 11l-4 3-4-3c0-4 1-8 4-11z"/><circle cx="12" cy="9" r="1.5"/><path d="M8 13l-3 4h4M16 13l3 4h-4M10 19l2 3 2-3"/>',
    ball: '<circle cx="12" cy="10" r="5"/><path d="M5 21h14"/><path d="M12 15v3" stroke-dasharray="1 2"/>',
    coaster: '<path d="M2 18c3-12 6-12 8-4s5 5 7-2 3-6 5-4"/><path d="M2 21h20"/>',
    magnet: '<path d="M6 4v8a6 6 0 0 0 12 0V4h-4v8a2 2 0 0 1-4 0V4z"/><path d="M6 8h4M14 8h4"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    wave: '<path d="M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0 3.5-4 5-2"/>',
    orbit: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="5"/><circle cx="21" cy="10.5" r="1.4" fill="currentColor"/>',
    ice: '<path d="M12 2v20M3.3 7l17.4 10M20.7 7L3.3 17"/><path d="M9.5 4L12 6l2.5-2M9.5 20L12 18l2.5 2"/>',
    fire: '<path d="M12 22a7 7 0 0 0 7-7c0-5-4-7-5-12-2 3-1 5-3 7-1-1-1.5-2-1.5-3C6 9 5 12 5 15a7 7 0 0 0 7 7z"/>',
    cell: '<ellipse cx="12" cy="12" rx="9" ry="7"/><circle cx="10" cy="11" r="2.5"/><circle cx="16" cy="14" r="1"/><circle cx="15" cy="8.5" r=".8"/>',
    dna: '<path d="M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9"/><path d="M8.5 6h7M8.5 18h7M10 9.5h4M10 14.5h4"/>',
    deer: '<path d="M8 3v3l-2 1M8 6l2 1M16 3v3l2 1M16 6l-2 1"/><path d="M9 8h6l1 4-2 1v3l2 5M10 13v3l-2 5"/><circle cx="11" cy="10" r=".6" fill="currentColor"/>',
    fish: '<path d="M3 12c4-6 11-6 15 0-4 6-11 6-15 0z"/><path d="M18 12l3-3v6z"/><circle cx="8" cy="11" r=".8" fill="currentColor"/>',
    bird: '<path d="M3 12c3 0 5-2 6-5 2 3 5 4 8 3l4-2-2 4c-1 4-5 6-9 6-3 0-6-2-7-6z"/><circle cx="16" cy="9.5" r=".6" fill="currentColor"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    mountain: '<path d="M2 20l7-12 4 6 3-4 6 10z"/>',
    bacteria: '<rect x="4" y="8" width="16" height="8" rx="4"/><path d="M8 8l-2-3M12 8V5M16 8l2-3M8 16l-2 3M16 16l2 3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    drop: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    bio: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
    chem: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
    phys: '<circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>'
  };
  function icon(name, cls) {
    var body = P[name] || P.info;
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  }
  function has(name) { return !!P[name]; }
  SE.icon = icon; SE.icon.has = has; SE.icon.paths = P;
})(window.SE = window.SE || {});
