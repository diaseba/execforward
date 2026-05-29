/* ===================================================================
   ExecForward — app-utils.js  · Paso 3
   Lógica compartida para los 4 entornos del programa.
   Requiere que cada index.html defina window.SKU_CONFIG ANTES
   de cargar este archivo.
=================================================================== */

/* ===================================================================
   DATOS DE MÓDULOS
   Fuente: Spec_Tecnica_ExecForward_Cowork_v1.1.md §2.5
=================================================================== */
var MODULES_DATA = [
  {
    id: 'M1', num: 1,
    title: 'Propuesta de Valor Ejecutiva',
    tagline: 'La frase que te consigue trabajo. Todo lo demás es consecuencia.',
    description: 'Construyes la frase que define quién eres como ejecutivo. La que funciona en un asado, en una entrevista, en un elevator pitch. Sin esto, todo lo demás es ruido.',
    components: [
      'Pre-etapa: Define tu target',
      'C1: Marco de diferenciadores',
      'C2: Fórmula de propuesta de valor',
      'C3: Mapa de evidencias',
      'C4: Test de mercado'
    ],
    totalComponents: 5
  },
  {
    id: 'M2', num: 2,
    title: 'Mercado Objetivo y el Mercado Oculto',
    tagline: 'El 70% de los cargos ejecutivos nunca se publican. Este módulo te lleva ahí.',
    description: 'Defines exactamente dónde eres el candidato más fuerte — y dejas de competir donde estás en desventaja. Acceso al mercado oculto: el 70% de cargos que nunca se publican.',
    components: [
      'Pre-etapa: ¿Dónde estás buscando hoy?',
      'C1: Define tu mercado objetivo real',
      'C2: El mercado oculto',
      'C3: Tu filtro de oportunidades'
    ],
    totalComponents: 4
  },
  {
    id: 'M3', num: 3,
    title: 'CV Ejecutivo y LinkedIn',
    tagline: 'Tus materiales trabajan por ti mientras duermes — o no trabajan. Este módulo decide cuál.',
    description: 'Tu CV y tu LinkedIn dejan de ser documentos estáticos y empiezan a trabajar por ti. ATS, keywords, estructura ejecutiva y visibilidad para reclutadores.',
    components: [
      'Pre-etapa: ¿Tus materiales están trabajando por ti?',
      'C1: CV ejecutivo con IA',
      'C2: LinkedIn que te encuentra',
      'C3: El sistema de adaptación rápida'
    ],
    totalComponents: 4
  },
  {
    id: 'M4', num: 4,
    title: 'Red de Contactos y Networking Ejecutivo',
    tagline: 'La red no es pedir favores. Es saber a quién, con qué mensaje, en qué orden.',
    description: 'Construyes el mapa de quién puede moverte la aguja, el mensaje correcto para cada uno, y el orden de activación. Sin pedir favores. Sin incomodar.',
    components: [
      'Pre-etapa: ¿Cómo está tu red hoy?',
      'C1: Mapa de contactos de alto impacto',
      'C2: El mensaje que abre puertas',
      'C3: Sistema de seguimiento'
    ],
    totalComponents: 4
  },
  {
    id: 'M5', num: 5,
    title: 'Pitch, Entrevista y Negociación',
    tagline: 'Puedes llegar a la conversación final y perderla. Este módulo cierra.',
    description: 'Preparas los tres momentos que definen si consigues el trabajo: el pitch informal, la entrevista estructurada y la negociación de compensación.',
    components: [
      'Pre-etapa: ¿Estás listo para cerrar?',
      'C1: El pitch que genera conversación',
      'C2: La entrevista ejecutiva',
      'C3: Negociación de compensación'
    ],
    totalComponents: 4
  },
  {
    id: 'M6', num: 6,
    title: 'Gestión del Proceso y Plan de Ejecución',
    tagline: 'La búsqueda es un proceso que puede durar meses. Este módulo lo hace sostenible.',
    description: 'Conviertes la búsqueda en un proceso sostenible — con métricas, ritmo, estado anímico y un plan de 90 días que no depende de inspiración.',
    components: [
      'Pre-etapa: ¿Cómo estás manejando el proceso?',
      'C1: Sistema de seguimiento de procesos',
      'C2: Gestión del estado anímico',
      'C3: Plan de 90 días'
    ],
    totalComponents: 4
  }
];

/* ===================================================================
   ESTRUCTURA DE PROGRESO EN localStorage
   ef_progress = {
     "M1": { "total": 5, "completed": 0 },
     "M2": { "total": 4, "completed": 0 },
     "M3": { "total": 4, "completed": 0 },
     "M4": { "total": 4, "completed": 0 },
     "M5": { "total": 4, "completed": 0 },
     "M6": { "total": 4, "completed": 0 }
   }
   TODO Paso 4: conectar con botones "Completar componente" dentro de cada módulo.
=================================================================== */

/* ===================================================================
   INIT — punto de entrada
=================================================================== */
window.addEventListener('DOMContentLoaded', function () {
  initApp();
});

function initApp() {
  var config = window.SKU_CONFIG;

  // 1. Banner de prueba
  if (config.isTestEnv) {
    var banner = document.getElementById('test-banner');
    if (banner) {
      banner.style.display = 'block';
      document.body.classList.add('has-banner');
    }
  }

  // 2. Inicializar estructura de progreso si no existe
  initProgressStructure();

  // 3. Login form
  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var uuid = document.getElementById('input-uuid').value.trim();
      var pass = document.getElementById('input-pass').value;
      handleLogin(uuid, pass);
    });
  }

  // 4. Band options (onboarding)
  setupBandOptions();

  // 5. Botón "Empezar el programa"
  var btnStart = document.getElementById('btn-start-program');
  if (btnStart) {
    btnStart.addEventListener('click', handleOnboardingSubmit);
  }

  // 6. Mobile sidebar toggle
  var btnHamburger = document.getElementById('btn-hamburger');
  if (btnHamburger) {
    btnHamburger.addEventListener('click', toggleSidebar);
  }

  // 7. Overlay para cerrar sidebar en móvil
  var overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', function () {
      closeSidebar();
    });
  }

  // 8. Router — flujo de pantallas
  if (checkSession()) {
    var onboardingSeen = localStorage.getItem('ef_onboarding_seen');
    if (!onboardingSeen) {
      showScreen('onboarding');
    } else {
      showScreen('app');
      renderApp();
    }
  } else {
    showScreen('login');
  }
}

/* ===================================================================
   SESIÓN
=================================================================== */
function checkSession() {
  var auth = localStorage.getItem('ef_authenticated');
  var ts   = parseInt(localStorage.getItem('ef_auth_ts') || '0', 10);
  var sevenDays = 7 * 24 * 60 * 60 * 1000;
  var expired = (Date.now() - ts) > sevenDays;
  return auth === 'true' && !expired;
}

function clearSession() {
  localStorage.removeItem('ef_authenticated');
  localStorage.removeItem('ef_auth_ts');
  localStorage.removeItem('ef_onboarding_seen');
}

/* ===================================================================
   LOGIN
=================================================================== */
function handleLogin(uuid, pass) {
  var config = window.SKU_CONFIG;
  var errorEl = document.getElementById('login-error');

  if (uuid === config.uuid && pass === config.password) {
    if (errorEl) errorEl.style.display = 'none';
    localStorage.setItem('ef_authenticated', 'true');
    localStorage.setItem('ef_auth_ts', String(Date.now()));

    var onboardingSeen = localStorage.getItem('ef_onboarding_seen');
    if (!onboardingSeen) {
      showScreen('onboarding');
    } else {
      showScreen('app');
      renderApp();
    }
  } else {
    if (errorEl) errorEl.style.display = 'block';
  }
}

/* ===================================================================
   PANTALLAS
=================================================================== */
function showScreen(name) {
  var screens = document.querySelectorAll('.screen');
  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.remove('active');
  }
  var target = document.getElementById('screen-' + name);
  if (target) {
    target.classList.add('active');
  }
  window.scrollTo(0, 0);
}

/* ===================================================================
   ONBOARDING
=================================================================== */
function setupBandOptions() {
  var radios = document.querySelectorAll('input[name="score-band"]');
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function () {
      var options = document.querySelectorAll('.band-option');
      for (var j = 0; j < options.length; j++) {
        options[j].classList.remove('selected');
      }
      if (this.closest) {
        this.closest('.band-option').classList.add('selected');
      }
      var btnStart = document.getElementById('btn-start-program');
      if (btnStart) btnStart.disabled = false;
    });
  }

  // Clic en el label completo también activa el radio
  var options = document.querySelectorAll('.band-option');
  for (var k = 0; k < options.length; k++) {
    options[k].addEventListener('click', function () {
      var radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      }
    });
  }

  // Pre-rellenar banda si el usuario viene del quiz (localStorage ya tiene ef_score_band)
  var savedBand = localStorage.getItem('ef_score_band');
  if (savedBand) {
    var preRadio = document.querySelector('input[name="score-band"][value="' + savedBand + '"]');
    if (preRadio) {
      preRadio.checked = true;
      preRadio.dispatchEvent(new Event('change'));
      // Mostrar nota visual de que viene pre-rellenado
      var onboardingCard = document.querySelector('.onboarding-card');
      if (onboardingCard && !document.getElementById('quiz-prefill-note')) {
        var note = document.createElement('p');
        note.id = 'quiz-prefill-note';
        note.className = 'quiz-prefill-note';
        note.textContent = '✓ Banda pre-seleccionada desde tu diagnóstico M0.';
        var bandOptions = document.querySelector('.band-options');
        if (bandOptions) bandOptions.parentNode.insertBefore(note, bandOptions);
      }
    }
  }
}

function handleOnboardingSubmit() {
  var selected = document.querySelector('input[name="score-band"]:checked');
  var band = selected ? selected.value : 'none';

  localStorage.setItem('ef_score_band', band);
  localStorage.setItem('ef_onboarding_seen', 'true');

  showScreen('app');
  renderApp();
}

/* ===================================================================
   APP — RENDER PRINCIPAL
=================================================================== */
function renderApp() {
  renderSidebar();
  updateGlobalProgress();

  // Navegar al primer módulo accesible en orden personalizado
  var config  = window.SKU_CONFIG;
  var band    = localStorage.getItem('ef_score_band')  || 'none';
  var weakMod = localStorage.getItem('ef_weak_module') || '';
  var ordered = getSidebarOrder(config.accessibleModules, band, weakMod);
  if (ordered.length > 0) {
    navigateToModule(ordered[0]);
  }
}

/* ===================================================================
   SIDEBAR — REORDENAMIENTO POR BANDA (Spec §2.3)
   band    : 'base' | 'operativo' | 'competitivo' | 'diferenciado' | 'none'
   weakMod : ID del módulo con eje débil, p.ej. 'M3' (puede ser '' si no hay)
   Orden:
     base / none        → M1 M2 M3 M4 M5 M6 (estándar)
     operativo          → M1, weakMod, resto en orden
     competitivo        → weakMod, M1, resto en orden
     diferenciado       → M1, weakMod, resto en orden
=================================================================== */
function getSidebarOrder(accessibleModules, band, weakMod) {
  // Base o sin personalización → orden estándar
  if (!band || band === 'none' || band === 'base') {
    return accessibleModules.slice();
  }
  if (!weakMod || accessibleModules.indexOf(weakMod) === -1) {
    // Sin eje débil identificable → orden estándar
    return accessibleModules.slice();
  }

  var rest = accessibleModules.filter(function(id) {
    return id !== 'M1' && id !== weakMod;
  });

  if (band === 'competitivo') {
    // weakMod → M1 → resto
    var order = [];
    if (accessibleModules.indexOf(weakMod) !== -1) order.push(weakMod);
    if (accessibleModules.indexOf('M1') !== -1 && weakMod !== 'M1') order.push('M1');
    return order.concat(rest);
  }

  // operativo / diferenciado → M1 → weakMod → resto
  var order = [];
  if (accessibleModules.indexOf('M1') !== -1) order.push('M1');
  if (accessibleModules.indexOf(weakMod) !== -1 && weakMod !== 'M1') order.push(weakMod);
  return order.concat(rest);
}

function renderSidebar() {
  var config  = window.SKU_CONFIG;
  var band    = localStorage.getItem('ef_score_band')  || 'none';
  var weakMod = localStorage.getItem('ef_weak_module') || '';
  var inner   = document.getElementById('sidebar-inner');
  if (!inner) return;

  // Calcular orden personalizado
  var orderedIds = getSidebarOrder(config.accessibleModules, band, weakMod);
  // Los módulos bloqueados siempre van al final en su orden original
  var allIds = MODULES_DATA.map(function(m) { return m.id; });
  var lockedIds = allIds.filter(function(id) {
    return config.accessibleModules.indexOf(id) === -1;
  });
  var fullOrder = orderedIds.concat(lockedIds);

  var html = '';

  // Etiqueta de orden recomendado
  if (band && band !== 'none') {
    html += '<p class="sidebar-order-label">Orden recomendado para tu score</p>';
  }

  // Lista de módulos en orden personalizado
  for (var i = 0; i < fullOrder.length; i++) {
    var modId = fullOrder[i];
    var mod = null;
    for (var m = 0; m < MODULES_DATA.length; m++) {
      if (MODULES_DATA[m].id === modId) { mod = MODULES_DATA[m]; break; }
    }
    if (!mod) continue;
    var accessible = config.accessibleModules.indexOf(mod.id) !== -1;

    if (accessible) {
      var prog      = getModuleProgress(mod.id, mod.totalComponents);
      var pct       = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
      var isDone    = prog.completed > 0 && prog.completed >= prog.total;
      var doneClass = isDone ? ' completed' : '';

      html += '<button class="sidebar-module' + doneClass + '" data-module="' + mod.id + '" onclick="navigateToModule(\'' + mod.id + '\')">' +
                '<div class="sidebar-module-top">' +
                  '<span class="sidebar-module-name">' + mod.id + ' — ' + mod.title + '</span>' +
                  (isDone ? '<span class="sidebar-check">✓</span>' : '') +
                '</div>' +
                '<div class="sidebar-progress-row">' +
                  '<div class="sidebar-progress-bar">' +
                    '<div class="sidebar-progress-fill" style="width:' + pct + '%"></div>' +
                  '</div>' +
                  '<span class="sidebar-progress-pct">' + pct + '%</span>' +
                '</div>' +
              '</button>';
    } else {
      // Módulo bloqueado
      html += '<div class="sidebar-module-locked">' +
                '<div class="sidebar-locked-top">' +
                  '<span class="sidebar-locked-name">' + mod.id + ' — ' + mod.title + '</span>' +
                  '<span class="sidebar-lock-icon">🔒</span>' +
                '</div>' +
                '<p class="sidebar-locked-sub">Incluido en el plan completo</p>' +
                '<!-- PENDIENTE: reemplazar con URL real de LS post-aprobación -->' +
                '<a href="[LS_URL_BUNDLE]" class="sidebar-locked-link" ' +
                'onclick="event.preventDefault(); showUpgradeMessage(this)">Ver plan completo →</a>' +
              '</div>';
    }
  }

  html += '<hr class="sidebar-sep">';
  html += '<div class="sidebar-footer">' +
            '<button class="btn-onboarding-sidebar" onclick="showScreen(\'onboarding\')">Ver bienvenida de nuevo</button>' +
          '</div>';

  inner.innerHTML = html;
}

function setSidebarActive(moduleId) {
  var btns = document.querySelectorAll('.sidebar-module');
  for (var i = 0; i < btns.length; i++) {
    var isActive = btns[i].getAttribute('data-module') === moduleId;
    if (isActive) {
      btns[i].classList.add('active');
    } else {
      btns[i].classList.remove('active');
    }
  }
}

/* ===================================================================
   NAVEGACIÓN DE MÓDULOS
=================================================================== */
function navigateToModule(moduleId) {
  var config = window.SKU_CONFIG;

  // Cerrar sidebar en móvil
  closeSidebar();

  // Verificar acceso
  if (config.accessibleModules.indexOf(moduleId) === -1) {
    setSidebarActive(moduleId);
    renderLockedMessage(moduleId);
    return;
  }

  setSidebarActive(moduleId);

  var mod = null;
  for (var i = 0; i < MODULES_DATA.length; i++) {
    if (MODULES_DATA[i].id === moduleId) { mod = MODULES_DATA[i]; break; }
  }
  if (!mod) return;

  // Bug 3: decidir pantalla según progreso
  var prog = getModuleProgress(moduleId, mod.totalComponents);
  var pct  = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;

  if (pct > 0 && pct < 100) {
    // En progreso → retomar en el último componente visitado
    renderContentArea(moduleId);
    var lastDone = parseInt(localStorage.getItem('ef_last_component_' + moduleId) || '-1', 10);
    var nextIdx  = lastDone + 1;
    setTimeout(function () {
      var nextEl = nextIdx === 0
        ? document.getElementById(moduleId + '-pre')
        : document.getElementById(moduleId + '-c' + nextIdx);
      if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  } else {
    // 0% → pantalla de inicio ("Empezar Mx") | 100% → intro con opción de revisar
    renderModuleIntro(mod);
  }
}

function renderModuleIntro(mod) {
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  var componentsHTML = '';
  for (var i = 0; i < mod.components.length; i++) {
    componentsHTML += '<li>' + mod.components[i] + '</li>';
  }

  inner.innerHTML =
    '<section class="module-intro" id="module-' + mod.id + '-intro">' +
      '<p class="module-num">MÓDULO ' + mod.num + '</p>' +
      '<p class="module-tagline">' + mod.tagline + '</p>' +

      '<img' +
        ' src="../shared/mindmaps/mindmap-' + mod.id.toLowerCase() + '.svg"' +
        ' alt="Mapa visual del módulo ' + mod.id + ' — ' + mod.title + '"' +
        ' class="module-mindmap"' +
        ' loading="lazy"' +
      '>' +

      '<h2 class="module-title-main">' + mod.title + '</h2>' +
      '<p class="module-description">' + mod.description + '</p>' +

      '<p class="module-components-label">Qué incluye</p>' +
      '<ul class="module-components">' + componentsHTML + '</ul>' +

      '<!-- ========================================================' +
      '     SLOTS DE MEDIA — reemplazar URLs cuando el operador      ' +
      '     entregue los archivos (producción en S3a)                ' +
      '     ======================================================== -->' +
      '<!-- <p class="media-label">Audio complementario</p>          -->' +
      '<!-- <audio controls src="[AUDIO_' + mod.id + '_URL]"></audio> -->' +
      '<!-- <p class="media-label">Video complementario</p>          -->' +
      '<!-- <video controls src="[VIDEO_' + mod.id + '_URL]"></video> -->' +
      '<!-- Alternativa iframe YouTube / Vimeo:                      -->' +
      '<!-- <iframe src="[VIDEO_EMBED_' + mod.id + '_URL]" allowfullscreen></iframe> -->' +

      '<button class="btn-primary" onclick="startModuleContent(\'' + mod.id + '\')">Empezar ' + mod.id + '</button>' +
    '</section>';
}

function startModuleContent(moduleId) {
  renderContentArea(moduleId);
}

function renderLockedMessage(moduleId) {
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  var mod = null;
  for (var i = 0; i < MODULES_DATA.length; i++) {
    if (MODULES_DATA[i].id === moduleId) { mod = MODULES_DATA[i]; break; }
  }
  var title = mod ? mod.title : moduleId;

  inner.innerHTML =
    '<section class="module-intro">' +
      '<p class="module-num">MÓDULO ' + moduleId + '</p>' +
      '<div class="locked-content">' +
        '<div class="locked-icon">🔒</div>' +
        '<h2 class="locked-title">' + title + '</h2>' +
        '<p class="locked-body">Este módulo está incluido en el plan completo de ExecForward.<br>Accedé a todos los módulos con el Bundle.</p>' +
        '<!-- PENDIENTE: reemplazar con URL real de LS post-aprobación -->' +
        '<a href="[LS_URL_BUNDLE]" class="btn-primary">Ver plan completo — $89</a>' +
      '</div>' +
    '</section>';
}

/* ===================================================================
   PROGRESO
=================================================================== */
function initProgressStructure() {
  var raw = localStorage.getItem('ef_progress');
  if (raw) return; // ya existe, no sobreescribir

  var initial = {};
  for (var i = 0; i < MODULES_DATA.length; i++) {
    var mod = MODULES_DATA[i];
    initial[mod.id] = { total: mod.totalComponents, completed: 0 };
  }
  localStorage.setItem('ef_progress', JSON.stringify(initial));
}

function getModuleProgress(moduleId, totalFallback) {
  var raw = localStorage.getItem('ef_progress');
  var data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch (e) { data = {}; }

  if (data[moduleId]) {
    return { completed: data[moduleId].completed || 0, total: data[moduleId].total || totalFallback || 4 };
  }
  return { completed: 0, total: totalFallback || 4 };
}

function getGlobalProgressPct() {
  // Retorna % global según los módulos accesibles del SKU
  // TODO Paso 4: se actualiza automáticamente al completar componentes
  var config   = window.SKU_CONFIG;
  var total    = 0;
  var completed = 0;

  for (var i = 0; i < config.accessibleModules.length; i++) {
    var modId = config.accessibleModules[i];
    var mod   = null;
    for (var j = 0; j < MODULES_DATA.length; j++) {
      if (MODULES_DATA[j].id === modId) { mod = MODULES_DATA[j]; break; }
    }
    if (!mod) continue;
    var prog = getModuleProgress(modId, mod.totalComponents);
    total     += prog.total;
    completed += prog.completed;
  }

  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

function updateGlobalProgress() {
  var pct   = getGlobalProgressPct();
  var fill  = document.getElementById('global-progress-fill');
  var label = document.getElementById('global-progress-label');
  if (fill)  fill.style.width  = pct + '%';
  if (label) label.textContent = 'Progreso: ' + pct + '% completado';
}

/* Actualiza la barra del módulo en el sidebar después de marcar progreso */
function refreshSidebarModule(moduleId) {
  var mod = null;
  for (var i = 0; i < MODULES_DATA.length; i++) {
    if (MODULES_DATA[i].id === moduleId) { mod = MODULES_DATA[i]; break; }
  }
  if (!mod) return;

  var prog  = getModuleProgress(moduleId, mod.totalComponents);
  var pct   = prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
  var isDone = prog.completed > 0 && prog.completed >= prog.total;

  var btns = document.querySelectorAll('.sidebar-module');
  for (var j = 0; j < btns.length; j++) {
    if (btns[j].getAttribute('data-module') === moduleId) {
      var fill = btns[j].querySelector('.sidebar-progress-fill');
      var pctEl = btns[j].querySelector('.sidebar-progress-pct');
      if (fill)  fill.style.width  = pct + '%';
      if (pctEl) pctEl.textContent = pct + '%';
      if (isDone) {
        btns[j].classList.add('completed');
        var top  = btns[j].querySelector('.sidebar-module-top');
        if (top && !top.querySelector('.sidebar-check')) {
          var check = document.createElement('span');
          check.className = 'sidebar-check';
          check.textContent = '✓';
          top.appendChild(check);
        }
      }
      break;
    }
  }

  updateGlobalProgress();
}

/* TODO Paso 4: llamar a esta función desde los botones "Completar componente" */
function markComponentComplete(moduleId, componentIndex, btnEl) {
  var raw  = localStorage.getItem('ef_progress');
  var data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch (e) { data = {}; }

  if (!data[moduleId]) {
    var mod = null;
    for (var i = 0; i < MODULES_DATA.length; i++) {
      if (MODULES_DATA[i].id === moduleId) { mod = MODULES_DATA[i]; break; }
    }
    data[moduleId] = { total: mod ? mod.totalComponents : 4, completed: 0 };
  }

  // Guardar qué componentes están completados para evitar doble conteo
  var key = moduleId + '_done';
  var doneRaw  = localStorage.getItem(key);
  var doneList = [];
  try { doneList = doneRaw ? JSON.parse(doneRaw) : []; } catch (e) { doneList = []; }

  if (doneList.indexOf(componentIndex) === -1) {
    doneList.push(componentIndex);
    localStorage.setItem(key, JSON.stringify(doneList));
    localStorage.setItem('ef_last_component_' + moduleId, String(componentIndex)); // Bug 3: último componente visitado
    data[moduleId].completed = doneList.length;
    localStorage.setItem('ef_progress', JSON.stringify(data));
    refreshSidebarModule(moduleId);
    checkForCompletion(moduleId);
  }
  if (btnEl) {
    btnEl.textContent = '✓ Completado';
    btnEl.disabled = true;
  }
}

/* ===================================================================
   SIDEBAR MÓVIL
=================================================================== */
function toggleSidebar() {
  var sidebar  = document.querySelector('.app-sidebar');
  var overlay  = document.getElementById('sidebar-overlay');
  if (!sidebar) return;

  var isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  } else {
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
  }
}

function closeSidebar() {
  var sidebar = document.querySelector('.app-sidebar');
  var overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

/* ===================================================================
   CLIPBOARD — función compartida para prompts copiables
   Paso 4 la usará al renderizar los prompts de cada componente.
=================================================================== */
function copyToClipboard(text, btnEl, successLabel) {
  if (!successLabel) successLabel = '✓ Copiado';

  function onSuccess() {
    if (!btnEl) return;
    var original = btnEl.textContent;
    btnEl.textContent = successLabel;
    setTimeout(function () { btnEl.textContent = original; }, 2200);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(fallback);
  } else {
    fallback();
  }

  function fallback() {
    var ta       = document.createElement('textarea');
    ta.value     = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* silencioso */ }
    document.body.removeChild(ta);
    onSuccess();
  }
}

/* ===================================================================
   VIDEO INTRO PROMPTS
   Aparece una sola vez, la primera vez que el usuario toca un prompt.
   Paso 4 llamará a checkPromptIntro() antes de mostrar el primer prompt.
=================================================================== */
function checkPromptIntro() {
  if (!localStorage.getItem('promptIntroSeen')) {
    localStorage.setItem('promptIntroSeen', 'true');
    showPromptIntroModal();
  }
}

function showPromptIntroModal() {
  if (document.getElementById('prompt-intro-modal')) return;
  var modal = document.createElement('div');
  modal.id = 'prompt-intro-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML =
    '<div class="modal-box">' +
      '<p class="modal-title">Cómo usar los prompts</p>' +
      '<p class="modal-body">Cada componente incluye un prompt listo para copiar y usar con tu IA. ' +
        'Cópialo, pégalo en ChatGPT o Claude, y reemplazá los campos entre corchetes con tu información real. ' +
        'Los corchetes son campos que vos completás — la IA hace el resto.</p>' +
      '<!-- SLOT VIDEO: reemplazar src cuando el operador entregue el video de introducción -->' +
      '<!-- <video controls src="[VIDEO_INTRO_PROMPTS_URL]" style="width:100%;margin:16px 0 8px;border-radius:6px;"></video> -->' +
      '<button class="btn-primary" onclick="closePromptIntroModal()">Entendido →</button>' +
    '</div>';
  document.body.appendChild(modal);
}

function closePromptIntroModal() {
  var modal = document.getElementById('prompt-intro-modal');
  if (modal) modal.remove();
}

/* ===================================================================
   PASO 4 — RENDERIZADO DE CONTENIDO DE MÓDULOS
   Requiere modules-content.js cargado ANTES que este archivo.
=================================================================== */

var _currentModuleId = null;

function renderContentArea(moduleId) {
  _currentModuleId = moduleId;
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  var mc = window.EF && window.EF.CONTENT && window.EF.CONTENT[moduleId];
  if (!mc) {
    inner.innerHTML =
      '<section class="module-content">' +
        '<p class="module-num">MÓDULO ' + moduleId + '</p>' +
        '<p style="color:var(--gray-400);font-style:italic;">Contenido no disponible.</p>' +
      '</section>';
    return;
  }

  var html = '<section class="module-content" id="module-' + moduleId + '-content">';
  html += '<button class="btn-back-intro" onclick="navigateToModule(\'' + moduleId + '\')">← Volver a la introducción</button>';

  // Pre-etapa (índice 0)
  html += renderPreEtapaHTML(moduleId, mc.preEtapa);

  // Componentes (índices 1..N)
  for (var i = 0; i < mc.components.length; i++) {
    html += renderComponentHTML(moduleId, mc.components[i], i + 1);
  }

  html += '</section>';
  inner.innerHTML = html;
  loadExerciseCells();
  loadComponentStates(moduleId);
  window.scrollTo(0, 0);
}

/* --- PRE-ETAPA --- */

function renderPreEtapaHTML(moduleId, pre) {
  var html = '<div class="component-section" id="' + moduleId + '-pre">';
  html += '<div class="component-header"><h2 class="component-title">' + pre.title + '</h2></div>';
  html += '<p class="pre-etapa-intro">' + pre.intro + '</p>';

  for (var i = 0; i < pre.questions.length; i++) {
    html += renderQuestionHTML(pre.questions[i]);
  }

  if (pre.promptKey) {
    html += renderPromptBoxHTML(pre.promptKey, 'Prompt copiable — Pre-etapa');
    if (pre.postPrompt) {
      html += '<p class="post-prompt-note">' + pre.postPrompt + '</p>';
    }
  }

  html += '<button class="btn-complete-component" data-comp-idx="0" ' +
    'onclick="markComponentComplete(\'' + moduleId + '\', 0, this)">' +
    'Completar pre-etapa</button>';
  html += '</div>';
  return html;
}

/* --- PREGUNTAS DE PRE-ETAPA --- */

function renderQuestionHTML(q) {
  var html = '<div class="q-block">';

  if (q.type === 'text') {
    html += '<label class="q-label" for="' + q.id + '">' + q.label + '</label>';
    html += '<input type="text" id="' + q.id + '" class="q-text" placeholder="' + escapeAttr(q.placeholder || '') + '">';

  } else if (q.type === 'checkbox') {
    html += '<p class="q-label">' + q.label + '</p>';
    for (var i = 0; i < q.options.length; i++) {
      html += '<label class="q-option-label"><input type="checkbox" class="q-checkbox"> ' + q.options[i] + '</label>';
    }

  } else if (q.type === 'radio') {
    html += '<p class="q-label">' + q.text + '</p>';
    var optKeys = ['A', 'B', 'C', 'D'];
    for (var j = 0; j < q.options.length; j++) {
      var val = optKeys[j];
      html += '<label class="q-option-label">' +
        '<input type="radio" name="' + q.id + '" value="' + val + '" ' +
        'onchange="handleRadioFeedback(\'' + q.id + '\', \'' + val + '\')">' +
        ' ' + q.options[j] + '</label>';
    }
    if (q.feedback) {
      html += '<div class="q-feedback-box" id="' + q.id + '-feedback" style="display:none">';
      var fkeys = ['A', 'B', 'C', 'D'];
      for (var k = 0; k < fkeys.length; k++) {
        if (q.feedback[fkeys[k]]) {
          html += '<p class="q-feedback-text" id="' + q.id + '-fb-' + fkeys[k] + '" style="display:none">' +
            q.feedback[fkeys[k]] + '</p>';
        }
      }
      html += '</div>';
    }

  } else if (q.type === 'table-input') {
    html += '<p class="q-label">' + q.label + '</p>';
    html += '<table class="q-table-input"><thead><tr>';
    for (var h = 0; h < q.tableHeaders.length; h++) {
      html += '<th>' + q.tableHeaders[h] + '</th>';
    }
    html += '</tr></thead><tbody>';
    for (var r = 0; r < q.tableRows.length; r++) {
      html += '<tr><td class="table-cell-fixed">' + q.tableRows[r] + '</td>' +
        '<td><input type="text" class="q-table-cell" placeholder="%"></td></tr>';
    }
    html += '</tbody></table>';
    if (q.feedbackTitle && q.feedbackRows) {
      html += '<p class="q-feedback-table-title"><strong>' + q.feedbackTitle + '</strong></p>';
      html += '<table class="static-table q-feedback-table"><tbody>';
      for (var fr = 0; fr < q.feedbackRows.length; fr++) {
        html += '<tr><td><strong>' + q.feedbackRows[fr].condition + '</strong></td>' +
          '<td>' + q.feedbackRows[fr].text + '</td></tr>';
      }
      html += '</tbody></table>';
    }
  }

  html += '</div>';
  return html;
}

/* --- COMPONENTES --- */

function renderComponentHTML(moduleId, comp, idx) {
  var html = '<div class="component-section" id="' + moduleId + '-c' + idx + '">';
  html += '<div class="component-header"><h2 class="component-title">' + comp.title + '</h2></div>';

  // Slots de audio/video — comentados hasta que el operador entregue los archivos
  html += '<!--\n' +
    '<p class="media-label">Audio — ' + moduleId + ' C' + idx + '</p>\n' +
    '<audio controls src="[AUDIO_' + moduleId + '_C' + idx + '_URL]"></audio>\n' +
    '<p class="media-label">Video — ' + moduleId + ' C' + idx + '</p>\n' +
    '<video controls src="[VIDEO_' + moduleId + '_C' + idx + '_URL]"></video>\n-->';

  // Cuerpo explicativo
  html += '<div class="component-body">' + comp.body + '</div>';

  // Ejemplos mal/bien hecho
  if (!comp.noMalBien) {
    html += '<div class="examples-row">';
    html += '<div class="mal-hecho-box">' +
      '<p class="example-label">❌ Mal hecho</p>' +
      '<blockquote class="example-quote">' + comp.malHecho + '</blockquote>' +
      '<p class="example-note">' + comp.malHechoNote + '</p>' +
      '</div>';
    html += '<div class="bien-hecho-box">' +
      '<p class="example-label">✓ Bien hecho</p>' +
      '<blockquote class="example-quote">' + comp.bienHecho + '</blockquote>' +
      '<p class="example-note">' + comp.bienHechoNote + '</p>' +
      '</div>';
    html += '</div>';
  }

  // Tabla de ejercicio
  if (comp.ejercicio) {
    html += renderExerciseTableHTML(comp.ejercicio, moduleId, idx);
  }

  // Prompt(s) copiable(s)
  if (comp.promptKeys && comp.promptKeys.length > 0) {
    for (var p = 0; p < comp.promptKeys.length; p++) {
      var lbl = comp.promptLabels ? comp.promptLabels[p] : 'Prompt copiable';
      html += renderPromptBoxHTML(comp.promptKeys[p], lbl);
    }
  }

  // Entregable
  if (comp.entregable) {
    html += '<div class="entregable-box">' +
      '<p class="entregable-label">Entregable de este componente</p>' +
      '<p class="entregable-text">' + comp.entregable + '</p>' +
      '</div>';
  }

  // Botón completar
  html += '<button class="btn-complete-component" data-comp-idx="' + idx + '" ' +
    'onclick="markComponentComplete(\'' + moduleId + '\', ' + idx + ', this)">' +
    'Marcar componente como completado</button>';

  html += '</div>';
  return html;
}

/* --- TABLA DE EJERCICIO --- */

function renderExerciseTableHTML(ejercicio, moduleId, compIdx) {
  var prefix = 'ef_ex_' + moduleId + '_' + compIdx;
  var html = '<div class="exercise-table-wrapper">';
  if (ejercicio.intro) {
    html += '<p class="exercise-intro">' + ejercicio.intro + '</p>';
  }
  html += '<div class="exercise-table-scroll"><table class="exercise-table"><thead><tr>';
  for (var h = 0; h < ejercicio.headers.length; h++) {
    html += '<th>' + ejercicio.headers[h] + '</th>';
  }
  html += '</tr></thead><tbody>';

  if (ejercicio.rowsFixed) {
    // Primera columna fija, resto editable
    for (var rf = 0; rf < ejercicio.rowsFixed.length; rf++) {
      html += '<tr><td class="table-cell-fixed">' + ejercicio.rowsFixed[rf] + '</td>';
      for (var cf = 1; cf < ejercicio.headers.length; cf++) {
        var kf = prefix + '_r' + rf + '_c' + cf;
        html += '<td contenteditable="true" class="table-cell" data-key="' + kf +
          '" onblur="saveExerciseCell(this)"></td>';
      }
      html += '</tr>';
    }
  } else {
    // N filas vacías
    var nRows = ejercicio.rows || 4;
    for (var rn = 0; rn < nRows; rn++) {
      html += '<tr>';
      if (ejercicio.rowNumbers) {
        html += '<td class="table-cell-num">' + (rn + 1) + '</td>';
        for (var cn = 1; cn < ejercicio.headers.length; cn++) {
          var kn = prefix + '_r' + rn + '_c' + cn;
          html += '<td contenteditable="true" class="table-cell" data-key="' + kn +
            '" onblur="saveExerciseCell(this)"></td>';
        }
      } else {
        for (var cn2 = 0; cn2 < ejercicio.headers.length; cn2++) {
          var kn2 = prefix + '_r' + rn + '_c' + cn2;
          html += '<td contenteditable="true" class="table-cell" data-key="' + kn2 +
            '" onblur="saveExerciseCell(this)"></td>';
        }
      }
      html += '</tr>';
    }
  }

  html += '</tbody></table></div></div>';
  return html;
}

/* --- PROMPT BOX --- */

function renderPromptBoxHTML(key, label) {
  var text = (window.EF && window.EF.PROMPTS && window.EF.PROMPTS[key]) || '';
  return '<div class="prompt-box">' +
    '<p class="prompt-label">' + (label || 'Prompt copiable') + '</p>' +
    '<pre class="prompt-text">' + escapeHtml(text) + '</pre>' +
    '<button class="copy-btn" onclick="copyPromptById(\'' + key + '\', this)">Copiar prompt</button>' +
    '</div>';
}

/* --- UTILIDADES DE STRING --- */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* --- ACCIONES DE USUARIO --- */

function copyPromptById(key, btn) {
  checkPromptIntro();
  var text = window.EF && window.EF.PROMPTS && window.EF.PROMPTS[key];
  if (!text) return;
  copyToClipboard(text, btn, '✓ Copiado');
}

function handleRadioFeedback(qId, val) {
  var fb = document.getElementById(qId + '-feedback');
  if (!fb) return;
  fb.style.display = 'block';
  var texts = fb.querySelectorAll('.q-feedback-text');
  for (var i = 0; i < texts.length; i++) {
    texts[i].style.display = 'none';
  }
  var active = document.getElementById(qId + '-fb-' + val);
  if (active) active.style.display = 'block';
}

/* --- PERSISTENCIA DE TABLAS DE EJERCICIO --- */

function saveExerciseCell(cell) {
  var key = cell.getAttribute('data-key');
  if (key) localStorage.setItem(key, cell.textContent || '');
}

function loadExerciseCells() {
  var cells = document.querySelectorAll('.table-cell[data-key]');
  for (var i = 0; i < cells.length; i++) {
    var key = cells[i].getAttribute('data-key');
    if (key) {
      var val = localStorage.getItem(key);
      if (val !== null) cells[i].textContent = val;
    }
  }
}

function loadComponentStates(moduleId) {
  if (!moduleId) return;
  var key = moduleId + '_done';
  var doneRaw = localStorage.getItem(key);
  var doneList = [];
  try { doneList = doneRaw ? JSON.parse(doneRaw) : []; } catch (e) { doneList = []; }
  if (doneList.length === 0) return;
  var btns = document.querySelectorAll('.btn-complete-component[data-comp-idx]');
  for (var i = 0; i < btns.length; i++) {
    var idx = parseInt(btns[i].getAttribute('data-comp-idx'), 10);
    if (doneList.indexOf(idx) !== -1) {
      btns[i].textContent = '✓ Completado';
      btns[i].disabled = true;
    }
  }
}

/* ===================================================================
   FLUJOS DE TRANSICIÓN, UPSELL Y CIERRE (Paso 7b)
   Lógica maestra — se dispara desde markComponentComplete()
   cuando un módulo queda 100% completo.

   Flujo:
     ¿Es el último módulo accesible del SKU?
       NO  → showModuleTransition()
       SÍ  → ¿SKU es start o core?
               SÍ → showUpsell[Start|Core]()
               NO (bundle/test) → ¿Todos los módulos completos?
                                    SÍ → showClosingScreen()
                                    NO → showAlmostThere()
=================================================================== */

/* Entregables por módulo — línea que aparece en pantalla de transición */
var MODULE_ENTREGABLES = {
  'M1': 'Construiste tu propuesta de valor ejecutiva.',
  'M2': 'Definiste tu mercado objetivo y el mapa de empresas target.',
  'M3': 'Optimizaste tu CV y LinkedIn para que trabajen por ti.',
  'M4': 'Activaste tu red con criterio y precisión.',
  'M5': 'Preparaste tu pitch, tu entrevista y tu posición de negociación.'
};

/* Taglines del módulo SIGUIENTE — para pantalla de transición (Spec §2.2) */
var TRANSITION_TAGLINES = {
  'M2': 'Define exactamente dónde eres el candidato más fuerte.',
  'M3': 'Haz que tus materiales trabajen por ti mientras no estás mirando.',
  'M4': 'Activa tu red con precisión — sin pedir favores, sin incomodar.',
  'M5': 'Prepárate para cerrar — pitch, entrevista y negociación en un módulo.',
  'M6': 'La búsqueda es un proceso que puede durar meses. Este módulo lo hace sostenible.'
};

function _getModuleData(moduleId) {
  for (var i = 0; i < MODULES_DATA.length; i++) {
    if (MODULES_DATA[i].id === moduleId) return MODULES_DATA[i];
  }
  return null;
}

/* Resetea el progreso de un módulo a 0% y limpia localStorage */
function resetModuleProgress(moduleId) {
  var raw  = localStorage.getItem('ef_progress');
  var data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch (e) { data = {}; }
  var mod = _getModuleData(moduleId);
  if (data[moduleId]) {
    data[moduleId] = { total: mod ? mod.totalComponents : data[moduleId].total, completed: 0 };
  }
  localStorage.setItem('ef_progress', JSON.stringify(data));
  localStorage.removeItem(moduleId + '_done');
  localStorage.removeItem('ef_last_component_' + moduleId);
}

function _allModulesComplete(accessibleModules) {
  for (var i = 0; i < accessibleModules.length; i++) {
    var mod = _getModuleData(accessibleModules[i]);
    if (!mod) continue;
    var prog = getModuleProgress(accessibleModules[i], mod.totalComponents);
    if (prog.completed < prog.total) return false;
  }
  return true;
}

function checkForCompletion(moduleId) {
  var config = window.SKU_CONFIG;
  if (!config) return;
  var accessible = config.accessibleModules;
  if (!accessible || accessible.length === 0) return;

  // Verificar que ESTE módulo está 100% completo
  var mod = _getModuleData(moduleId);
  if (!mod) return;
  var prog = getModuleProgress(moduleId, mod.totalComponents);
  if (prog.completed < prog.total) return;

  var sku = config.sku;

  // Bug 1: buscar el PRIMER módulo incompleto en cualquier posición
  var nextIncompleteId = null;
  for (var i = 0; i < accessible.length; i++) {
    if (accessible[i] === moduleId) continue; // saltar el recién completado
    var m = _getModuleData(accessible[i]);
    if (!m) continue;
    var p = getModuleProgress(accessible[i], m.totalComponents);
    if (p.completed < p.total) {
      nextIncompleteId = accessible[i];
      break;
    }
  }

  // Bug 4: si M6 se completó pero hay módulos pendientes, resetearlo —
  // el usuario llegó a M6 sin tener la base de los módulos anteriores
  if (moduleId === 'M6' && nextIncompleteId !== null) {
    resetModuleProgress('M6');
    refreshSidebarModule('M6');
    // M6 queda pendiente → aparece en la lista de "Casi llegas"
    setTimeout(showAlmostThere, 600);
    return;
  }

  if (nextIncompleteId !== null) {
    // Hay módulo incompleto → pantalla de transición (Bug 1 + Bug 2)
    var captured = nextIncompleteId;
    setTimeout(function () { showModuleTransition(moduleId, captured); }, 600);
    return;
  }

  // No quedan módulos incompletos → upsell o cierre
  if (sku === 'start') {
    setTimeout(showUpsellStart, 600);
  } else if (sku === 'core') {
    setTimeout(showUpsellCore, 600);
  } else {
    // bundle / test — todos los módulos están completos
    setTimeout(showClosingScreen, 600);
  }
}

/* ---------------------------------------------------------------
   PANTALLA DE TRANSICIÓN ENTRE MÓDULOS (Spec §2.2)
--------------------------------------------------------------- */
function showModuleTransition(completedModuleId, nextModuleId) {
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  var completedMod = _getModuleData(completedModuleId);
  var nextMod      = _getModuleData(nextModuleId);
  if (!completedMod || !nextMod) return;

  var entregable   = MODULE_ENTREGABLES[completedModuleId] || '';
  var tagline      = TRANSITION_TAGLINES[nextModuleId] || '';

  inner.innerHTML =
    '<div class="transition-screen">' +
      '<div class="transition-check">✓</div>' +
      '<p class="transition-completed-label">' + completedMod.id + ' — ' + completedMod.title + ' completado</p>' +
      '<p class="transition-entregable">' + entregable + '</p>' +
      '<hr class="transition-divider">' +
      '<p class="transition-next-label">A continuación</p>' +
      '<h3 class="transition-next-title">' + nextMod.id + ' — ' + nextMod.title + '</h3>' +
      '<p class="transition-next-tagline">' + tagline + '</p>' +
      '<div class="transition-actions">' +
        '<button class="btn-primary" onclick="navigateToModule(\'' + nextModuleId + '\')">' +
          'Continuar con ' + nextMod.id + ' →' +
        '</button>' +
        '<button class="btn-secondary" onclick="navigateToModule(\'' + completedModuleId + '\')">' +
          'Volver al inicio' +
        '</button>' +
      '</div>' +
    '</div>';
}

/* ---------------------------------------------------------------
   PANTALLA DE UPSELL — /start → Core + Bundle (tras completar M1)
--------------------------------------------------------------- */
function showUpsellStart() {
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  inner.innerHTML =
    '<div class="upsell-screen">' +
      '<div class="transition-check">✓</div>' +
      '<p class="transition-completed-label">M1 completado</p>' +
      '<p class="transition-entregable">Construiste tu propuesta de valor ejecutiva.</p>' +
      '<p class="upsell-context">El siguiente paso es saber exactamente a quién dirigirla, con qué materiales y cómo activar tu red.</p>' +
      '<hr class="transition-divider">' +

      '<div class="upsell-offer">' +
        '<p class="upsell-sku-badge">PLAN DE POSICIONAMIENTO</p>' +
        '<p class="upsell-price">$59</p>' +
        '<ul class="upsell-list">' +
          '<li>M2 · Mercado Objetivo y Mercado Oculto</li>' +
          '<li>M3 · CV Ejecutivo y LinkedIn</li>' +
          '<li>+ todo lo que ya tienes en M1</li>' +
        '</ul>' +
        '<a href="[LS_URL_CORE]" class="btn-primary upsell-btn">Acceder al Plan →</a>' +
      '</div>' +

      '<hr class="transition-divider">' +

      '<div class="upsell-offer">' +
        '<p class="upsell-sku-badge">SISTEMA COMPLETO</p>' +
        '<p class="upsell-price">$60 <span class="upsell-price-note">*</span></p>' +
        '<ul class="upsell-list">' +
          '<li>M2 · M3 · M4 · M5 · M6</li>' +
          '<li>+ todo lo que ya tienes en M1</li>' +
        '</ul>' +
        '<p class="upsell-discount-note">* Precio especial — descontamos tu compra de M1 ($29)</p>' +
        '<a href="[LS_URL_BUNDLE_UPGRADE_START]" class="btn-primary upsell-btn">Acceder al Sistema →</a>' +
      '</div>' +

      '<hr class="transition-divider">' +
      '<p class="upsell-dismiss"><a href="#" onclick="event.preventDefault(); navigateToModule(\'M1\')">Quedarme con M1 por ahora</a></p>' +
    '</div>';
}

/* ---------------------------------------------------------------
   PANTALLA DE UPSELL — /core → Bundle (tras completar M3)
--------------------------------------------------------------- */
function showUpsellCore() {
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  inner.innerHTML =
    '<div class="upsell-screen">' +
      '<div class="transition-check">✓</div>' +
      '<p class="transition-completed-label">Plan de Posicionamiento completado</p>' +
      '<p class="upsell-context">Tienes la base: propuesta de valor definida, mercado objetivo claro, CV y LinkedIn optimizados.</p>' +
      '<p class="upsell-context">Lo que falta es activar todo eso — tu red, tu pitch, tu negociación y el plan de ejecución.</p>' +
      '<hr class="transition-divider">' +

      '<div class="upsell-offer">' +
        '<p class="upsell-sku-badge">SISTEMA COMPLETO</p>' +
        '<p class="upsell-price">$30 <span class="upsell-price-note">*</span></p>' +
        '<ul class="upsell-list">' +
          '<li>M4 · Red de Contactos y Networking</li>' +
          '<li>M5 · Pitch, Entrevista y Negociación</li>' +
          '<li>M6 · Gestión del Proceso y Plan de Ejecución</li>' +
        '</ul>' +
        '<p class="upsell-discount-note">* Precio especial — descontamos tu compra anterior ($59)</p>' +
        '<a href="[LS_URL_BUNDLE_UPGRADE_CORE]" class="btn-primary upsell-btn">Completar el sistema →</a>' +
      '</div>' +

      '<hr class="transition-divider">' +
      '<p class="upsell-dismiss"><a href="#" onclick="event.preventDefault(); navigateToModule(\'M3\')">Quedarme con el Plan por ahora</a></p>' +
    '</div>';
}

/* ---------------------------------------------------------------
   PANTALLA "CASI LLEGAS" — bundle/test con módulos pendientes
--------------------------------------------------------------- */
function showAlmostThere() {
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  var config     = window.SKU_CONFIG;
  var accessible = config ? config.accessibleModules : [];

  var pendingCards = '';
  for (var i = 0; i < accessible.length; i++) {
    var modId   = accessible[i];
    var mod     = _getModuleData(modId);
    if (!mod) continue;
    var prog    = getModuleProgress(modId, mod.totalComponents);
    if (prog.completed >= prog.total) continue;
    var tagline = TRANSITION_TAGLINES[modId] || '';
    pendingCards +=
      '<div class="almost-there-card">' +
        '<p class="almost-there-mod-title">' + mod.id + ' — ' + mod.title + '</p>' +
        (tagline ? '<p class="almost-there-mod-tagline">' + tagline + '</p>' : '') +
        '<div class="almost-there-card-action">' +
          '<button class="btn-teal-outline" onclick="navigateToModule(\'' + modId + '\')">' +
            'Ir a ' + mod.id + ' →' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  inner.innerHTML =
    '<div class="almost-there-screen">' +
      '<h2 class="almost-there-title">Completaste M6.</h2>' +
      '<p class="almost-there-sub">El sistema está casi listo — te faltan algunos módulos para que todo encaje.</p>' +
      '<hr class="transition-divider">' +
      '<p class="almost-there-section-label">MÓDULOS PENDIENTES</p>' +
      '<div class="almost-there-cards">' + pendingCards + '</div>' +
      '<hr class="transition-divider">' +
      '<div class="almost-there-back">' +
        '<button class="btn-secondary" onclick="navigateToModule(\'' + accessible[0] + '\')">' +
          'Volver al inicio' +
        '</button>' +
      '</div>' +
    '</div>';
}

/* ---------------------------------------------------------------
   PANTALLA DE CIERRE FINAL (Spec §2.8)
   Solo para bundle/test cuando TODOS los módulos están completos
--------------------------------------------------------------- */
function showClosingScreen() {
  var inner = document.getElementById('content-inner');
  if (!inner) return;

  var config     = window.SKU_CONFIG;
  var accessible = config ? config.accessibleModules : [];
  var firstMod   = accessible.length > 0 ? accessible[0] : 'M1';

  /* <!-- REVISAR: texto LinkedIn — no especificado en spec §2.8; usar texto aproximado de marca --> */
  var shareText =
    'Terminé de construir mi sistema de búsqueda ejecutiva con ExecForward. ' +
    'Propuesta de valor, mercado objetivo, materiales, red, pitch y plan de ejecución. ' +
    'Si estás en proceso de búsqueda, vale la pena: execforward.com';

  inner.innerHTML =
    '<div class="closing-screen">' +
      '<div class="closing-badge">' +
        '<span class="closing-badge-icon">✓</span>' +
        '<span class="closing-badge-text">Programa completado</span>' +
      '</div>' +
      '<div class="closing-body">' +
        '<p>Llegaste al final.</p>' +
        '<p>No al final del proceso — al final de la preparación. Lo que viene ahora es diferente: es ejecutar con un sistema que ya construiste.</p>' +
        '<p>Pocos ejecutivos hacen esto. La mayoría improvisa, aplica sin criterio, espera que el mercado responda. Tú ya no estás en esa categoría.</p>' +
        '<p><strong>Lo que tienes ahora:</strong></p>' +
        '<ul class="closing-list">' +
          '<li>Una propuesta de valor que la gente recuerda</li>' +
          '<li>Un mercado objetivo definido donde eres el candidato más fuerte</li>' +
          '<li>Materiales que trabajan por ti mientras no estás mirando</li>' +
          '<li>Una red que puedes activar con precisión</li>' +
          '<li>Un pitch, una narrativa y una posición de negociación preparados</li>' +
          '<li>Un plan de ejecución que no depende de que estés inspirado ese día</li>' +
        '</ul>' +
        '<p>El trabajo ahora es salir.</p>' +
        '<p>Una última cosa: si algo de este programa cambió cómo estás viendo tu búsqueda, compártelo con alguien que lo necesite. No porque te lo pidamos — porque el ejecutivo que está en el mismo punto donde estabas tú hace unas semanas lo agradecerá.</p>' +
        '<p>Suerte. Aunque con esto, ya no dependes tanto de ella.</p>' +
      '</div>' +
      '<div class="closing-actions">' +
        '<button class="btn-teal-outline closing-share-btn" onclick="shareOnLinkedIn()">' +
          'Compartir en LinkedIn' +
        '</button>' +
        '<button class="btn-secondary" onclick="navigateToModule(\'' + firstMod + '\')">' +
          'Volver al inicio' +
        '</button>' +
      '</div>' +
    '</div>';
}

/* ---------------------------------------------------------------
   COMPARTIR EN LINKEDIN
--------------------------------------------------------------- */
function shareOnLinkedIn() {
  var text = encodeURIComponent(
    "Lo que más cuesta en una transición ejecutiva no es el mercado.\n" +
    "Es tener claro exactamente qué ofrecés, para quién, y por qué sos la mejor opción para ese rol específico.\n\n" +
    "Eso lo trabajé de forma muy concreta con ExecForward (execforward.com). " +
    "Si estás en ese momento y sentís que el problema no es tu experiencia sino cómo la estás comunicando, " +
    "puede valer la pena revisarlo."
  );
  window.open(
    'https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fexecforward.com&summary=' + text,
    '_blank', 'width=600,height=600'
  );
}

/* ---------------------------------------------------------------
   MENSAJE DE UPGRADE — sidebar módulos bloqueados
--------------------------------------------------------------- */
function showUpgradeMessage(el) {
  var existing = document.querySelector('.upgrade-tooltip');
  if (existing) existing.remove();

  var tooltip = document.createElement('div');
  tooltip.className = 'upgrade-tooltip';
  tooltip.innerHTML =
    'Este módulo está incluido en el sistema completo. ' +
    '<a href="[LS_URL_BUNDLE]" style="color:#2563EB;font-weight:700;text-decoration:underline;">' +
      'Ver el plan →' +
    '</a>';

  if (el && el.parentElement) {
    el.parentElement.appendChild(tooltip);
  } else {
    document.body.appendChild(tooltip);
  }

  setTimeout(function() {
    if (tooltip.parentElement) tooltip.remove();
  }, 4000);
}
