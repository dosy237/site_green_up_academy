<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard — Green Up Academy</title>
<style>
:root{
  --green:#1FAB89;--green-dark:#15896B;--green-light:#E8F8F3;
  --bg:#0F1117;--sidebar:#161B22;--card:#1C2128;--card2:#21262D;
  --border:#30363D;--text:#E6EDF3;--muted:#8B949E;--white:#fff;
  --red:#F85149;--yellow:#E3B341;--blue:#58A6FF;--purple:#BC8CFF;
  --orange:#F0883E;--radius:10px;--transition:.2s ease;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);display:flex;height:100vh;overflow:hidden;}
a{color:var(--green);text-decoration:none;}

/* ──── SIDEBAR ──── */
#sidebar{
  width:250px;min-width:250px;background:var(--sidebar);border-right:1px solid var(--border);
  display:flex;flex-direction:column;transition:width var(--transition);overflow:hidden;
}
#sidebar.collapsed{width:64px;min-width:64px;}
.sidebar-logo{padding:20px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;white-space:nowrap;}
.sidebar-logo .logo-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--green),var(--green-dark));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.sidebar-logo .logo-text{font-weight:700;font-size:14px;line-height:1.3;color:var(--text);}
.sidebar-logo .logo-text span{color:var(--green);display:block;font-size:11px;font-weight:400;}
nav{flex:1;overflow-y:auto;padding:8px 0;}
nav::-webkit-scrollbar{width:4px;}nav::-webkit-scrollbar-thumb{background:var(--border);}
.nav-section{padding:8px 16px 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted);white-space:nowrap;overflow:hidden;}
#sidebar.collapsed .nav-section{opacity:0;}
.nav-item{display:flex;align-items:center;gap:12px;padding:10px 16px;cursor:pointer;border-radius:0;transition:background var(--transition);white-space:nowrap;position:relative;border-left:3px solid transparent;}
.nav-item:hover{background:var(--card);}
.nav-item.active{background:var(--green-light);color:var(--green);border-left-color:var(--green);}
.nav-item .icon{font-size:18px;flex-shrink:0;width:24px;text-align:center;}
.nav-item .label{font-size:13px;font-weight:500;}
.nav-item .badge{margin-left:auto;background:var(--red);color:#fff;border-radius:12px;padding:2px 7px;font-size:10px;font-weight:700;flex-shrink:0;}
#sidebar.collapsed .nav-item .label,.nav-item .badge-txt{opacity:0;pointer-events:none;}
#sidebar.collapsed .nav-item .badge{position:absolute;top:6px;right:6px;}
.sidebar-footer{padding:12px;border-top:1px solid var(--border);}
.collapse-btn{width:100%;display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--card);border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;color:var(--muted);font-size:12px;transition:all var(--transition);}
.collapse-btn:hover{border-color:var(--green);color:var(--green);}

/* ──── MAIN ──── */
#main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.topbar{height:60px;background:var(--sidebar);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;gap:16px;flex-shrink:0;}
.topbar h1{font-size:16px;font-weight:700;flex:1;}
.topbar-actions{display:flex;gap:8px;align-items:center;}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:var(--radius);font-size:13px;font-weight:500;cursor:pointer;border:1px solid var(--border);background:var(--card2);color:var(--text);transition:all var(--transition);}
.btn:hover{border-color:var(--green);color:var(--green);}
.btn-green{background:var(--green);border-color:var(--green);color:#fff;}
.btn-green:hover{background:var(--green-dark);border-color:var(--green-dark);color:#fff;}
.btn-red{background:var(--red);border-color:var(--red);color:#fff;}
.btn-red:hover{opacity:.85;}
.btn-sm{padding:4px 10px;font-size:12px;}
.btn-icon{width:34px;height:34px;padding:0;justify-content:center;}
#content{flex:1;overflow-y:auto;padding:24px;}
#content::-webkit-scrollbar{width:6px;}#content::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}

/* ──── CARDS ──── */
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.card-title{font-size:14px;font-weight:600;}
.card-subtitle{font-size:12px;color:var(--muted);margin-top:2px;}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}

/* ──── STAT CARDS ──── */
.stat-card{padding:20px;border-radius:var(--radius);border:1px solid var(--border);background:var(--card);position:relative;overflow:hidden;}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.stat-card.green::before{background:var(--green);}
.stat-card.blue::before{background:var(--blue);}
.stat-card.yellow::before{background:var(--yellow);}
.stat-card.red::before{background:var(--red);}
.stat-card.purple::before{background:var(--purple);}
.stat-card.orange::before{background:var(--orange);}
.stat-icon{font-size:28px;margin-bottom:8px;}
.stat-num{font-size:32px;font-weight:800;line-height:1;}
.stat-label{font-size:12px;color:var(--muted);margin-top:4px;}
.stat-sub{font-size:11px;color:var(--green);margin-top:6px;display:flex;align-items:center;gap:4px;}

/* ──── TABLE ──── */
table{width:100%;border-collapse:collapse;font-size:13px;}
th{padding:10px 12px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);border-bottom:1px solid var(--border);}
td{padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:middle;}
tr:hover td{background:var(--card2);}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:12px;font-size:11px;font-weight:600;}
.badge-green{background:#1FAB8920;color:var(--green);}
.badge-blue{background:#58A6FF20;color:var(--blue);}
.badge-yellow{background:#E3B34120;color:var(--yellow);}
.badge-red{background:#F8514920;color:var(--red);}
.badge-gray{background:#8B949E20;color:var(--muted);}
.badge-purple{background:#BC8CFF20;color:var(--purple);}

/* ──── FORMS ──── */
.form-group{margin-bottom:14px;}
.form-label{font-size:12px;font-weight:600;color:var(--muted);margin-bottom:6px;display:block;text-transform:uppercase;letter-spacing:.5px;}
.form-control{width:100%;padding:9px 12px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);color:var(--text);font-size:13px;transition:border-color var(--transition);resize:vertical;}
.form-control:focus{outline:none;border-color:var(--green);}
.form-control::placeholder{color:var(--muted);}
select.form-control option{background:var(--card2);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}

/* ──── MODAL ──── */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;backdrop-filter:blur(4px);}
.modal{background:var(--card);border:1px solid var(--border);border-radius:14px;width:100%;max-width:700px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;}
.modal-lg{max-width:900px;}
.modal-header{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.modal-title{font-size:16px;font-weight:700;}
.modal-body{padding:24px;overflow-y:auto;}
.modal-footer{padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px;flex-shrink:0;}
.close-btn{background:none;border:none;cursor:pointer;color:var(--muted);font-size:20px;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:6px;transition:all var(--transition);}
.close-btn:hover{background:var(--card2);color:var(--text);}

/* ──── ALERTS ──── */
.alert{padding:12px 16px;border-radius:var(--radius);font-size:13px;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.alert-success{background:#1FAB8915;border:1px solid var(--green);color:var(--green);}
.alert-error{background:#F8514915;border:1px solid var(--red);color:var(--red);}
.alert-warning{background:#E3B34115;border:1px solid var(--yellow);color:var(--yellow);}

/* ──── PAGE TABS ──── */
.tabs{display:flex;gap:4px;margin-bottom:20px;background:var(--card);padding:4px;border-radius:var(--radius);border:1px solid var(--border);}
.tab{padding:7px 16px;border-radius:7px;cursor:pointer;font-size:13px;font-weight:500;color:var(--muted);transition:all var(--transition);}
.tab.active{background:var(--green);color:#fff;}
.tab:hover:not(.active){color:var(--text);background:var(--card2);}

/* ──── MESSAGE THREAD ──── */
.msg-list{display:flex;flex-direction:column;gap:8px;}
.msg-item{padding:14px 16px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:all var(--transition);border-left:3px solid transparent;}
.msg-item:hover{border-color:var(--green);}
.msg-item.unread{border-left-color:var(--green);background:var(--green-light);}
.msg-item.unread .msg-subject{color:var(--green);}
.msg-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;}
.msg-from{font-size:13px;font-weight:600;}
.msg-date{font-size:11px;color:var(--muted);}
.msg-subject{font-size:12px;font-weight:500;margin-bottom:2px;}
.msg-preview{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* ──── RICH TEXT EDITOR ──── */
.editor-toolbar{display:flex;gap:4px;padding:8px;background:var(--card2);border:1px solid var(--border);border-bottom:none;border-radius:var(--radius) var(--radius) 0 0;}
.editor-btn{padding:4px 8px;border-radius:4px;border:1px solid transparent;background:none;color:var(--muted);cursor:pointer;font-size:12px;transition:all var(--transition);}
.editor-btn:hover{background:var(--card);color:var(--text);border-color:var(--border);}
.editor-content{min-height:200px;padding:12px;background:var(--card2);border:1px solid var(--border);border-radius:0 0 var(--radius) var(--radius);color:var(--text);font-size:13px;line-height:1.7;outline:none;}

/* ──── CHART ──── */
.chart-bar-container{display:flex;gap:6px;align-items:flex-end;height:120px;padding:8px 0;}
.chart-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;}
.chart-bar{width:100%;background:var(--green);border-radius:4px 4px 0 0;min-height:2px;transition:height .5s ease;}
.chart-bar-label{font-size:9px;color:var(--muted);text-align:center;}
.chart-bar-val{font-size:10px;color:var(--green);font-weight:700;}
.donut{width:120px;height:120px;position:relative;}
.donut svg{transform:rotate(-90deg);}
.donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}

/* ──── IMAGE UPLOAD ──── */
.img-upload-zone{border:2px dashed var(--border);border-radius:var(--radius);padding:24px;text-align:center;cursor:pointer;transition:all var(--transition);}
.img-upload-zone:hover{border-color:var(--green);background:var(--green-light);}
.img-preview{width:100%;max-height:200px;object-fit:cover;border-radius:var(--radius);border:1px solid var(--border);}

/* ──── PROGRAM CARD EDITOR ──── */
.prog-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);padding:14px;cursor:pointer;transition:all var(--transition);position:relative;}
.prog-card:hover{border-color:var(--green);}
.prog-card .prog-actions{position:absolute;top:8px;right:8px;display:flex;gap:4px;opacity:0;transition:opacity var(--transition);}
.prog-card:hover .prog-actions{opacity:1;}

/* ──── KANBAN ──── */
.kanban{display:flex;gap:16px;overflow-x:auto;padding-bottom:8px;}
.kanban-col{min-width:240px;max-width:280px;background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);display:flex;flex-direction:column;}
.kanban-header{padding:12px 14px;border-bottom:1px solid var(--border);font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:space-between;}
.kanban-body{padding:10px;display:flex;flex-direction:column;gap:8px;flex:1;overflow-y:auto;max-height:500px;}
.kanban-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px;cursor:pointer;transition:all var(--transition);}
.kanban-card:hover{border-color:var(--green);transform:translateY(-1px);}

/* ──── SCROLLBAR ──── */
::-webkit-scrollbar{width:6px;height:6px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:var(--muted);}

/* ──── TOGGLE SWITCH ──── */
.toggle{position:relative;display:inline-flex;width:40px;height:22px;cursor:pointer;}
.toggle input{opacity:0;width:0;height:0;}
.toggle-slider{position:absolute;inset:0;background:var(--border);border-radius:22px;transition:var(--transition);}
.toggle-slider::before{content:'';position:absolute;height:16px;width:16px;left:3px;bottom:3px;background:white;border-radius:50%;transition:var(--transition);}
.toggle input:checked~.toggle-slider{background:var(--green);}
.toggle input:checked~.toggle-slider::before{transform:translateX(18px);}

/* ──── TOAST ──── */
#toast-container{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:8px;}
.toast{padding:12px 16px;border-radius:var(--radius);font-size:13px;display:flex;align-items:center;gap:8px;animation:slideIn .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.4);max-width:320px;}
.toast-success{background:var(--green);color:#fff;}
.toast-error{background:var(--red);color:#fff;}
.toast-info{background:var(--blue);color:#fff;}
@keyframes slideIn{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}
@keyframes fadeOut{to{transform:translateX(100%);opacity:0;}}

/* ──── SECTION HEADERS ──── */
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.section-title{font-size:18px;font-weight:700;}
.section-subtitle{font-size:13px;color:var(--muted);margin-top:2px;}

/* ──── CONTENT SECTIONS ──── */
.page-section{display:none;}
.page-section.active{display:block;}

/* ──── NEWS CARD ──── */
.news-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
.news-card{background:var(--card2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:all var(--transition);}
.news-card:hover{border-color:var(--green);}
.news-card-img{width:100%;height:160px;object-fit:cover;background:var(--card);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:36px;}
.news-card-body{padding:14px;}
.news-card-meta{display:flex;gap:8px;align-items:center;margin-bottom:8px;}
.news-card-title{font-size:14px;font-weight:600;margin-bottom:6px;}
.news-card-excerpt{font-size:12px;color:var(--muted);line-height:1.5;}
.news-card-footer{padding:10px 14px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.news-stats{display:flex;gap:12px;align-items:center;}
.news-stat{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:4px;}

/* ──── MEDIA ──── */
@media(max-width:1100px){.grid-4{grid-template-columns:repeat(2,1fr);}.grid-3{grid-template-columns:1fr 1fr;}}
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">🌱</div>
    <div class="logo-text">Green Up Academy <span>Dashboard v2.0</span></div>
  </div>
  <nav id="nav">
    <div class="nav-section">Vue d'ensemble</div>
    <div class="nav-item active" data-page="dashboard">
      <span class="icon">📊</span><span class="label">Tableau de bord</span>
    </div>

    <div class="nav-section">Contenu du site</div>
    <div class="nav-item" data-page="cms-hero">
      <span class="icon">🏠</span><span class="label">Hero / Accueil</span>
    </div>
    <div class="nav-item" data-page="cms-about">
      <span class="icon">ℹ️</span><span class="label">À propos</span>
    </div>
    <div class="nav-item" data-page="cms-programs">
      <span class="icon">📚</span><span class="label">Formations</span>
    </div>
    <div class="nav-item" data-page="cms-why">
      <span class="icon">⭐</span><span class="label">Pourquoi nous</span>
    </div>
    <div class="nav-item" data-page="cms-testimonials">
      <span class="icon">💬</span><span class="label">Témoignages</span>
    </div>
    <div class="nav-item" data-page="cms-admission">
      <span class="icon">📝</span><span class="label">Admission</span>
    </div>
    <div class="nav-item" data-page="cms-cta">
      <span class="icon">🎯</span><span class="label">CTA & Dates</span>
    </div>
    <div class="nav-item" data-page="cms-contact">
      <span class="icon">📍</span><span class="label">Contact & Infos</span>
    </div>
    <div class="nav-item" data-page="cms-partners">
      <span class="icon">🤝</span><span class="label">Partenaires</span>
    </div>
    <div class="nav-item" data-page="cms-header">
      <span class="icon">🔝</span><span class="label">Header & Nav</span>
    </div>
    <div class="nav-item" data-page="cms-footer">
      <span class="icon">🔻</span><span class="label">Footer</span>
    </div>
    <div class="nav-item" data-page="cms-seo">
      <span class="icon">🔍</span><span class="label">SEO & Méta</span>
    </div>

    <div class="nav-section">Actualités</div>
    <div class="nav-item" data-page="news">
      <span class="icon">📰</span><span class="label">Actualités</span>
    </div>

    <div class="nav-section">Messagerie</div>
    <div class="nav-item" data-page="applications">
      <span class="icon">🎓</span><span class="label">Candidatures</span>
      <span class="badge" id="badge-apps">0</span>
    </div>
    <div class="nav-item" data-page="messages">
      <span class="icon">✉️</span><span class="label">Messages contact</span>
      <span class="badge" id="badge-msgs">0</span>
    </div>

    <div class="nav-section">Paramètres</div>
    <div class="nav-item" data-page="settings">
      <span class="icon">⚙️</span><span class="label">Paramètres</span>
    </div>
  </nav>
  <div class="sidebar-footer">
    <button class="collapse-btn" onclick="toggleSidebar()">
      <span id="collapse-icon">◀</span>
      <span class="label" style="font-size:12px">Réduire</span>
    </button>
  </div>
</aside>

<!-- MAIN -->
<div id="main">
  <div class="topbar">
    <h1 id="page-title">Tableau de bord</h1>
    <div class="topbar-actions">
      <span id="server-status" style="font-size:12px;color:var(--muted)">🔴 Hors ligne</span>
      <button class="btn" onclick="window.open('http://localhost:3000','_blank')">🌐 Voir le site</button>
      <button class="btn btn-green" onclick="saveCurrentPage()">💾 Sauvegarder</button>
    </div>
  </div>

  <div id="content">

    <!-- ═══ DASHBOARD ═══ -->
    <div id="page-dashboard" class="page-section active">
      <div class="section-header">
        <div><div class="section-title">Tableau de bord</div><div class="section-subtitle">Vue d'ensemble de Green Up Academy</div></div>
        <button class="btn" onclick="loadAnalytics()">🔄 Actualiser</button>
      </div>
      <div class="grid-4" id="stat-cards">
        <div class="stat-card green"><div class="stat-icon">👁️</div><div class="stat-num" id="stat-views">—</div><div class="stat-label">Visites totales</div></div>
        <div class="stat-card blue"><div class="stat-icon">🎓</div><div class="stat-num" id="stat-apps">—</div><div class="stat-label">Candidatures</div><div class="stat-sub" id="stat-apps-new"></div></div>
        <div class="stat-card yellow"><div class="stat-icon">✉️</div><div class="stat-num" id="stat-msgs">—</div><div class="stat-label">Messages</div><div class="stat-sub" id="stat-msgs-unread"></div></div>
        <div class="stat-card purple"><div class="stat-icon">📰</div><div class="stat-num" id="stat-news">—</div><div class="stat-label">Actualités</div></div>
      </div>
      <div class="grid-2" style="margin-top:16px;">
        <div class="card">
          <div class="card-header"><div><div class="card-title">📈 Visites (30 jours)</div></div></div>
          <div class="chart-bar-container" id="visits-chart"></div>
        </div>
        <div class="card">
          <div class="card-header"><div><div class="card-title">🎓 Candidatures par statut</div></div></div>
          <div style="display:flex;gap:20px;align-items:center;margin-top:8px;">
            <canvas id="donut-chart" width="130" height="130"></canvas>
            <div id="donut-legend" style="font-size:12px;display:flex;flex-direction:column;gap:8px;"></div>
          </div>
        </div>
      </div>
      <div class="grid-3" style="margin-top:16px;">
        <div class="card">
          <div class="card-header"><div class="card-title">🔥 Dernières candidatures</div><a href="#" onclick="navigate('applications')">Voir tout →</a></div>
          <div id="recent-apps" style="display:flex;flex-direction:column;gap:8px;"></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">💬 Derniers messages</div><a href="#" onclick="navigate('messages')">Voir tout →</a></div>
          <div id="recent-msgs" style="display:flex;flex-direction:column;gap:8px;"></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">📰 Top actualités</div><a href="#" onclick="navigate('news')">Voir tout →</a></div>
          <div id="top-news" style="display:flex;flex-direction:column;gap:8px;"></div>
        </div>
      </div>
    </div>

    <!-- ═══ HERO ═══ -->
    <div id="page-cms-hero" class="page-section">
      <div class="section-header"><div><div class="section-title">🏠 Section Hero</div><div class="section-subtitle">Première section visible du site</div></div></div>
      <div class="card">
        <div class="form-group"><label class="form-label">Titre principal</label><input class="form-control" id="hero-title" placeholder="Devenez l'Expert de la Transition Écologique"></div>
        <div class="form-group"><label class="form-label">Sous-titre</label><textarea class="form-control" id="hero-subtitle" rows="2"></textarea></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Texte du bouton CTA</label><input class="form-control" id="hero-ctaText" placeholder="Candidater maintenant"></div>
          <div class="form-group"><label class="form-label">Lien du bouton CTA</label><input class="form-control" id="hero-ctaHref" placeholder="#admission"></div>
        </div>
        <div class="form-group">
          <label class="form-label">Image de fond</label>
          <div class="img-upload-zone" id="hero-img-zone" onclick="document.getElementById('hero-img-input').click()">
            <div>📷 Cliquer pour uploader une image de fond</div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px;">JPG, PNG, WebP — max 5MB</div>
          </div>
          <input type="file" id="hero-img-input" accept="image/*" style="display:none" onchange="uploadImage(this,'hero-backgroundImage','hero-img-zone')">
          <div id="hero-img-preview" style="margin-top:8px;"></div>
        </div>
      </div>
    </div>

    <!-- ═══ ABOUT ═══ -->
    <div id="page-cms-about" class="page-section">
      <div class="section-header"><div><div class="section-title">ℹ️ À propos</div></div></div>
      <div class="card">
        <div class="form-group"><label class="form-label">Titre</label><input class="form-control" id="about-title"></div>
        <div class="form-group"><label class="form-label">Texte principal</label><textarea class="form-control" id="about-text" rows="4"></textarea></div>
        <div class="form-group"><label class="form-label">Vision</label><input class="form-control" id="about-vision"></div>
        <div class="form-group"><label class="form-label">Valeurs (séparées par des virgules)</label><input class="form-control" id="about-values" placeholder="Innovation, Durabilité, Excellence"></div>
        <div><div class="card-title" style="margin-bottom:12px;">📊 Statistiques</div>
          <div id="about-stats-editor"></div>
          <button class="btn btn-sm" style="margin-top:8px" onclick="addAboutStat()">+ Ajouter une stat</button>
        </div>
      </div>
    </div>

    <!-- ═══ PROGRAMS ═══ -->
    <div id="page-cms-programs" class="page-section">
      <div class="section-header">
        <div><div class="section-title">📚 Formations</div><div class="section-subtitle">Gérez les programmes de formation</div></div>
        <button class="btn btn-green" onclick="openAddProgram()">+ Ajouter une formation</button>
      </div>
      <div id="programs-list" class="grid-2"></div>
    </div>

    <!-- ═══ WHY CHOOSE US ═══ -->
    <div id="page-cms-why" class="page-section">
      <div class="section-header">
        <div><div class="section-title">⭐ Pourquoi nous choisir</div></div>
        <button class="btn btn-green" onclick="openAddWhy()">+ Ajouter</button>
      </div>
      <div id="why-list" class="grid-2"></div>
    </div>

    <!-- ═══ TESTIMONIALS ═══ -->
    <div id="page-cms-testimonials" class="page-section">
      <div class="section-header">
        <div><div class="section-title">💬 Témoignages</div></div>
        <button class="btn btn-green" onclick="openAddTestimonial()">+ Ajouter</button>
      </div>
      <div id="testimonials-list" class="grid-2"></div>
    </div>

    <!-- ═══ ADMISSION ═══ -->
    <div id="page-cms-admission" class="page-section">
      <div class="section-header"><div><div class="section-title">📝 Page Admission</div></div></div>
      <div class="card" style="margin-bottom:16px;">
        <div class="form-group"><label class="form-label">Titre</label><input class="form-control" id="admission-title"></div>
        <div class="form-group"><label class="form-label">Sous-titre</label><input class="form-control" id="admission-subtitle"></div>
      </div>
      <div class="card" style="margin-bottom:16px;">
        <div class="card-title" style="margin-bottom:14px;">📋 Étapes du processus</div>
        <div id="admission-steps-editor"></div>
        <button class="btn btn-sm" style="margin-top:8px" onclick="addAdmissionStep()">+ Ajouter une étape</button>
      </div>
      <div class="card" style="margin-bottom:16px;">
        <div class="card-title" style="margin-bottom:14px;">📄 Documents requis</div>
        <div id="admission-docs-editor"></div>
        <button class="btn btn-sm" style="margin-top:8px" onclick="addAdmissionDoc()">+ Ajouter un document</button>
      </div>
      <div class="card">
        <div class="card-title" style="margin-bottom:14px;">❓ FAQ</div>
        <div id="admission-faq-editor"></div>
        <button class="btn btn-sm" style="margin-top:8px" onclick="addAdmissionFaq()">+ Ajouter une question</button>
      </div>
    </div>

    <!-- ═══ CTA ═══ -->
    <div id="page-cms-cta" class="page-section">
      <div class="section-header"><div><div class="section-title">🎯 Section CTA</div></div></div>
      <div class="card">
        <div class="form-group"><label class="form-label">Titre</label><input class="form-control" id="cta-title"></div>
        <div class="form-group"><label class="form-label">Sous-titre</label><input class="form-control" id="cta-subtitle"></div>
        <div class="card-title" style="margin:14px 0 10px;">📅 Dates clés</div>
        <div id="cta-dates-editor"></div>
        <button class="btn btn-sm" style="margin-top:8px" onclick="addCtaDate()">+ Ajouter une date</button>
      </div>
    </div>

    <!-- ═══ CONTACT ═══ -->
    <div id="page-cms-contact" class="page-section">
      <div class="section-header"><div><div class="section-title">📍 Informations de contact</div></div></div>
      <div class="card">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Directeur</label><input class="form-control" id="contact-director"></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="contact-email" type="email"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Téléphone</label><input class="form-control" id="contact-phone"></div>
          <div class="form-group"><label class="form-label">Horaires</label><input class="form-control" id="contact-hours"></div>
        </div>
        <div class="form-group"><label class="form-label">Adresse</label><input class="form-control" id="contact-address"></div>
        <div class="form-group"><label class="form-label">Google Maps Embed URL</label><input class="form-control" id="contact-mapEmbed" placeholder="https://maps.google.com/..."></div>
        <div class="card-title" style="margin:14px 0 10px;">🔗 Réseaux sociaux</div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">LinkedIn</label><input class="form-control" id="contact-linkedin" placeholder="https://linkedin.com/company/..."></div>
          <div class="form-group"><label class="form-label">Instagram</label><input class="form-control" id="contact-instagram" placeholder="https://instagram.com/..."></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Facebook</label><input class="form-control" id="contact-facebook" placeholder="https://facebook.com/..."></div>
          <div class="form-group"><label class="form-label">Twitter / X</label><input class="form-control" id="contact-twitter" placeholder="https://twitter.com/..."></div>
        </div>
      </div>
    </div>

    <!-- ═══ PARTNERS ═══ -->
    <div id="page-cms-partners" class="page-section">
      <div class="section-header">
        <div><div class="section-title">🤝 Partenaires</div></div>
        <button class="btn btn-green" onclick="openAddPartner()">+ Ajouter</button>
      </div>
      <div id="partners-list" class="grid-3"></div>
    </div>

    <!-- ═══ HEADER ═══ -->
    <div id="page-cms-header" class="page-section">
      <div class="section-header"><div><div class="section-title">🔝 Header & Navigation</div></div></div>
      <div class="card">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Logo (image)</label>
            <div class="img-upload-zone" onclick="document.getElementById('header-logo-input').click()">📷 Logo (PNG/SVG)</div>
            <input type="file" id="header-logo-input" accept="image/*" style="display:none" onchange="uploadImage(this,'header-logo','header-logo-preview')">
            <div id="header-logo-preview" style="margin-top:8px;"></div>
          </div>
          <div class="form-group"><label class="form-label">Texte du logo</label><input class="form-control" id="header-logoText"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Texte bouton CTA</label><input class="form-control" id="header-ctaText"></div>
          <div class="form-group"><label class="form-label">Lien bouton CTA</label><input class="form-control" id="header-ctaHref"></div>
        </div>
        <div class="card-title" style="margin:14px 0 10px;">🔗 Liens de navigation</div>
        <div id="header-nav-editor"></div>
        <button class="btn btn-sm" style="margin-top:8px" onclick="addNavLink()">+ Ajouter un lien</button>
      </div>
    </div>

    <!-- ═══ FOOTER ═══ -->
    <div id="page-cms-footer" class="page-section">
      <div class="section-header"><div><div class="section-title">🔻 Footer</div></div></div>
      <div class="card">
        <div class="form-group"><label class="form-label">Description</label><textarea class="form-control" id="footer-description" rows="3"></textarea></div>
        <div class="form-group"><label class="form-label">Copyright</label><input class="form-control" id="footer-copyright"></div>
        <div class="card-title" style="margin:14px 0 10px;">🔗 Liens footer</div>
        <div id="footer-links-editor"></div>
        <button class="btn btn-sm" style="margin-top:8px" onclick="addFooterLink()">+ Ajouter un lien</button>
      </div>
    </div>

    <!-- ═══ SEO ═══ -->
    <div id="page-cms-seo" class="page-section">
      <div class="section-header"><div><div class="section-title">🔍 SEO & Métadonnées</div></div></div>
      <div class="card">
        <div class="form-group"><label class="form-label">Titre de la page (title tag)</label><input class="form-control" id="seo-title"></div>
        <div class="form-group"><label class="form-label">Meta description</label><textarea class="form-control" id="seo-description" rows="3"></textarea></div>
        <div class="form-group"><label class="form-label">Mots-clés</label><input class="form-control" id="seo-keywords"></div>
        <div class="form-group">
          <label class="form-label">Image Open Graph</label>
          <div class="img-upload-zone" onclick="document.getElementById('seo-og-input').click()">📷 Image OG (1200×630 recommandé)</div>
          <input type="file" id="seo-og-input" accept="image/*" style="display:none" onchange="uploadImage(this,'seo-ogImage','seo-og-preview')">
          <div id="seo-og-preview" style="margin-top:8px;"></div>
        </div>
      </div>
    </div>

    <!-- ═══ NEWS ═══ -->
    <div id="page-news" class="page-section">
      <div class="section-header">
        <div><div class="section-title">📰 Actualités</div><div class="section-subtitle">Gérez les articles et suivez les statistiques</div></div>
        <button class="btn btn-green" onclick="openAddNews()">+ Nouvel article</button>
      </div>
      <div class="tabs">
        <div class="tab active" onclick="filterNews('all',this)">Tous</div>
        <div class="tab" onclick="filterNews('published',this)">Publiés</div>
        <div class="tab" onclick="filterNews('draft',this)">Brouillons</div>
      </div>
      <div id="news-list" class="news-grid"></div>
    </div>

    <!-- ═══ APPLICATIONS ═══ -->
    <div id="page-applications" class="page-section">
      <div class="section-header">
        <div><div class="section-title">🎓 Candidatures</div></div>
        <div style="display:flex;gap:8px;">
          <select class="form-control" style="width:160px" id="filter-app-status" onchange="filterApplications()">
            <option value="">Tous les statuts</option>
            <option value="nouveau">Nouveau</option>
            <option value="en_etude">En étude</option>
            <option value="accepte">Accepté</option>
            <option value="refuse">Refusé</option>
          </select>
          <select class="form-control" style="width:200px" id="filter-app-program" onchange="filterApplications()">
            <option value="">Toutes les formations</option>
          </select>
        </div>
      </div>
      <div class="tabs">
        <div class="tab active" onclick="switchAppView('table',this)">📋 Liste</div>
        <div class="tab" onclick="switchAppView('kanban',this)">📌 Kanban</div>
      </div>
      <div id="apps-table-view">
        <div class="card" style="padding:0;overflow:hidden;">
          <table>
            <thead><tr><th>Candidat</th><th>Formation</th><th>Date</th><th>Statut</th><th>Fichiers</th><th>Actions</th></tr></thead>
            <tbody id="apps-tbody"></tbody>
          </table>
        </div>
      </div>
      <div id="apps-kanban-view" style="display:none;">
        <div class="kanban">
          <div class="kanban-col"><div class="kanban-header"><span>🆕 Nouveau</span><span class="badge badge-blue" id="k-nouveau">0</span></div><div class="kanban-body" id="k-col-nouveau"></div></div>
          <div class="kanban-col"><div class="kanban-header"><span>⏳ En étude</span><span class="badge badge-yellow" id="k-en_etude">0</span></div><div class="kanban-body" id="k-col-en_etude"></div></div>
          <div class="kanban-col"><div class="kanban-header"><span>✅ Accepté</span><span class="badge badge-green" id="k-accepte">0</span></div><div class="kanban-body" id="k-col-accepte"></div></div>
          <div class="kanban-col"><div class="kanban-header"><span>❌ Refusé</span><span class="badge badge-red" id="k-refuse">0</span></div><div class="kanban-body" id="k-col-refuse"></div></div>
        </div>
      </div>
    </div>

    <!-- ═══ MESSAGES ═══ -->
    <div id="page-messages" class="page-section">
      <div class="section-header"><div><div class="section-title">✉️ Messages de contact</div></div></div>
      <div id="messages-list" class="msg-list"></div>
    </div>

    <!-- ═══ SETTINGS ═══ -->
    <div id="page-settings" class="page-section">
      <div class="section-header"><div><div class="section-title">⚙️ Paramètres</div></div></div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title" style="margin-bottom:16px;">📧 Configuration email</div>
          <div id="email-status" class="alert alert-warning">⚠️ Vérification...</div>
          <div class="form-group"><label class="form-label">Mode</label>
            <select class="form-control" id="settings-email-mode">
              <option value="oauth2">Gmail OAuth2 (recommandé)</option>
              <option value="apppassword">App Password</option>
            </select>
          </div>
          <div id="oauth2-fields">
            <div class="form-group"><label class="form-label">Client ID</label><input class="form-control" id="settings-client-id" placeholder="GMAIL_CLIENT_ID"></div>
            <div class="form-group"><label class="form-label">Client Secret</label><input class="form-control" type="password" id="settings-client-secret" placeholder="GMAIL_CLIENT_SECRET"></div>
            <div class="form-group"><label class="form-label">Refresh Token</label><input class="form-control" type="password" id="settings-refresh-token" placeholder="GMAIL_REFRESH_TOKEN"></div>
          </div>
          <div class="alert alert-warning" style="margin-top:12px;font-size:12px;">
            <div>📋 <strong>Guide OAuth2 :</strong><br>
            1. <a href="https://console.cloud.google.com" target="_blank">Google Cloud Console</a> → Gmail API → Activer<br>
            2. Créer identifiants OAuth2 (Application Web)<br>
            3. URI de redirection : <code>https://developers.google.com/oauthplayground</code><br>
            4. <a href="https://developers.google.com/oauthplayground" target="_blank">OAuth Playground</a> → Scope : <code>https://mail.google.com/</code><br>
            5. Copier le refresh_token dans votre <code>.env</code></div>
          </div>
        </div>
        <div class="card">
          <div class="card-title" style="margin-bottom:16px;">🌐 Informations serveur</div>
          <div id="server-info" style="font-size:13px;line-height:2;"></div>
          <button class="btn" style="margin-top:16px;width:100%" onclick="checkServerStatus()">🔄 Vérifier le statut</button>
        </div>
      </div>
    </div>

  </div><!-- /content -->
</div><!-- /main -->

<!-- TOAST CONTAINER -->
<div id="toast-container"></div>

<!-- ════════════════════════ MODALS ════════════════════════ -->

<!-- Modal générique -->
<div id="modal" class="modal-overlay" style="display:none">
  <div class="modal" id="modal-box">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-title">Modal</h3>
      <button class="close-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body" id="modal-body"></div>
    <div class="modal-footer" id="modal-footer">
      <button class="btn" onclick="closeModal()">Annuler</button>
      <button class="btn btn-green" id="modal-save" onclick="modalSave()">Sauvegarder</button>
    </div>
  </div>
</div>

<!-- Modal candidature détail -->
<div id="app-modal" class="modal-overlay" style="display:none">
  <div class="modal modal-lg">
    <div class="modal-header">
      <h3 class="modal-title" id="app-modal-title">Candidature</h3>
      <button class="close-btn" onclick="closeAppModal()">✕</button>
    </div>
    <div class="modal-body" id="app-modal-body"></div>
    <div class="modal-footer">
      <button class="btn" onclick="closeAppModal()">Fermer</button>
      <button class="btn btn-green" id="app-reply-btn">📧 Répondre</button>
    </div>
  </div>
</div>

<!-- Modal message détail -->
<div id="msg-modal" class="modal-overlay" style="display:none">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title" id="msg-modal-title">Message</h3>
      <button class="close-btn" onclick="document.getElementById('msg-modal').style.display='none'">✕</button>
    </div>
    <div class="modal-body" id="msg-modal-body"></div>
    <div class="modal-footer">
      <button class="btn" onclick="document.getElementById('msg-modal').style.display='none'">Fermer</button>
    </div>
  </div>
</div>

<script>
// ════════════════════════════════════════════════════════════════
// CORE STATE & API
// ════════════════════════════════════════════════════════════════
const API = 'http://localhost:4000/api';
let content = {}, applications = [], messages = [], newsData = [], analytics = {};
let currentPage = 'dashboard';
let modalCallback = null;
let allApplications = [];
let currentAppFilter = { status: '', program: '' };

async function api(path, method = 'GET', body = null, isFormData = false) {
  const opts = { method, headers: {} };
  if (body && !isFormData) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
  if (body && isFormData) opts.body = body;
  try {
    const r = await fetch(`${API}${path}`, opts);
    return await r.json();
  } catch (e) { return { error: e.message }; }
}

// ════════════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════════════
function navigate(page) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  const sec = document.getElementById(`page-${page}`);
  if (sec) sec.classList.add('active');
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');
  currentPage = page;
  const titles = {
    'dashboard':'Tableau de bord','cms-hero':'Hero / Accueil','cms-about':'À propos','cms-programs':'Formations',
    'cms-why':'Pourquoi nous','cms-testimonials':'Témoignages','cms-admission':'Admission','cms-cta':'CTA & Dates',
    'cms-contact':'Contact','cms-partners':'Partenaires','cms-header':'Header & Nav','cms-footer':'Footer',
    'cms-seo':'SEO','news':'Actualités','applications':'Candidatures','messages':'Messages','settings':'Paramètres'
  };
  document.getElementById('page-title').textContent = titles[page] || page;
  if (page === 'dashboard') loadAnalytics();
  else if (page.startsWith('cms-')) loadCMSPage(page.replace('cms-',''));
  else if (page === 'news') loadNews();
  else if (page === 'applications') loadApplications();
  else if (page === 'messages') loadMessages();
  else if (page === 'settings') checkServerStatus();
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => navigate(item.dataset.page));
});

// ════════════════════════════════════════════════════════════════
// SIDEBAR TOGGLE
// ════════════════════════════════════════════════════════════════
let sidebarCollapsed = false;
function toggleSidebar() {
  sidebarCollapsed = !sidebarCollapsed;
  document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
  document.getElementById('collapse-icon').textContent = sidebarCollapsed ? '▶' : '◀';
}

// ════════════════════════════════════════════════════════════════
// TOAST
// ════════════════════════════════════════════════════════════════
function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = (type==='success'?'✅ ':type==='error'?'❌ ':'ℹ️ ') + msg;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => { el.style.animation = 'fadeOut .3s ease forwards'; setTimeout(() => el.remove(), 300); }, 3000);
}

// ════════════════════════════════════════════════════════════════
// ANALYTICS & DASHBOARD
// ════════════════════════════════════════════════════════════════
async function loadAnalytics() {
  const [a, apps, msgs, news_] = await Promise.all([
    api('/analytics'), api('/applications'), api('/messages'), api('/news')
  ]);
  analytics = a; allApplications = apps || []; messages = msgs || []; newsData = news_ || [];

  // Update badges
  const unreadApps = (apps||[]).filter(a=>!a.read).length;
  const unreadMsgs = (msgs||[]).filter(m=>!m.read).length;
  document.getElementById('badge-apps').textContent = unreadApps || '';
  document.getElementById('badge-msgs').textContent = unreadMsgs || '';

  // Stat cards
  setText('stat-views', (a.pageViews?.total || 0).toLocaleString());
  setText('stat-apps', (apps||[]).length);
  setText('stat-msgs', (msgs||[]).length);
  setText('stat-news', (news_||[]).length);
  setText('stat-apps-new', unreadApps ? `🆕 ${unreadApps} nouvelles` : '');
  setText('stat-msgs-unread', unreadMsgs ? `📬 ${unreadMsgs} non lues` : '');

  // Visits chart
  renderVisitsChart(a.dailyViews || []);

  // Donut chart
  renderDonutChart({
    nouveau: a.applicationStats?.nouveau || 0,
    en_etude: a.applicationStats?.en_etude || 0,
    accepte: a.applicationStats?.accepte || 0,
    refuse: a.applicationStats?.refuse || 0,
  });

  // Recent apps
  const raEl = document.getElementById('recent-apps');
  raEl.innerHTML = (apps||[]).slice(0,5).map(a=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
      <div><div style="font-size:13px;font-weight:600">${a.fullName}</div><div style="font-size:11px;color:var(--muted)">${a.program}</div></div>
      ${statusBadge(a.status)}
    </div>`).join('') || '<div style="color:var(--muted);font-size:13px;">Aucune candidature</div>';

  // Recent msgs
  const rmEl = document.getElementById('recent-msgs');
  rmEl.innerHTML = (msgs||[]).slice(0,5).map(m=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
      <div><div style="font-size:13px;font-weight:600">${m.name}</div><div style="font-size:11px;color:var(--muted)">${m.subject||m.message?.slice(0,30)}</div></div>
      ${m.read?'':'<span class="badge badge-green">New</span>'}
    </div>`).join('') || '<div style="color:var(--muted);font-size:13px;">Aucun message</div>';

  // Top news
  const tnEl = document.getElementById('top-news');
  tnEl.innerHTML = (news_||[]).sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,5).map(n=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
      <div style="font-size:13px;font-weight:600">${n.title}</div>
      <div style="font-size:11px;color:var(--muted)">👁 ${n.views||0} ❤️ ${n.likes||0}</div>
    </div>`).join('') || '<div style="color:var(--muted);font-size:13px;">Aucune actualité</div>';
}

function renderVisitsChart(dailyViews) {
  const el = document.getElementById('visits-chart');
  if (!el) return;
  const last14 = dailyViews.slice(-14);
  if (!last14.length) { el.innerHTML = '<div style="color:var(--muted);font-size:13px;margin:auto;">Pas de données</div>'; return; }
  const max = Math.max(...last14.map(d => d.views || 0), 1);
  el.innerHTML = last14.map(d => {
    const h = Math.round(((d.views || 0) / max) * 100);
    const label = d.date.slice(5);
    return `<div class="chart-bar-wrap">
      <div class="chart-bar-val">${d.views||0}</div>
      <div class="chart-bar" style="height:${h}%;"></div>
      <div class="chart-bar-label">${label}</div>
    </div>`;
  }).join('');
}

function renderDonutChart(stats) {
  const canvas = document.getElementById('donut-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = [
    { label: 'Nouveaux', val: stats.nouveau, color: '#58A6FF' },
    { label: 'En étude', val: stats.en_etude, color: '#E3B341' },
    { label: 'Acceptés', val: stats.accepte, color: '#1FAB89' },
    { label: 'Refusés',  val: stats.refuse,  color: '#F85149' },
  ];
  const total = data.reduce((s, d) => s + d.val, 0) || 1;
  const cx = 65, cy = 65, r = 50, lineW = 18;
  ctx.clearRect(0, 0, 130, 130);
  let startAngle = -Math.PI / 2;
  data.forEach(({ val, color }) => {
    const slice = (val / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
    ctx.fillStyle = color;
    ctx.fill();
    startAngle += slice;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, r - lineW, 0, 2 * Math.PI);
  ctx.fillStyle = '#1C2128';
  ctx.fill();
  ctx.fillStyle = '#E6EDF3';
  ctx.font = 'bold 22px Segoe UI';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy - 8);
  ctx.font = '11px Segoe UI';
  ctx.fillStyle = '#8B949E';
  ctx.fillText('total', cx, cy + 10);

  const legend = document.getElementById('donut-legend');
  legend.innerHTML = data.map(d => `
    <div style="display:flex;align-items:center;gap:6px;">
      <div style="width:10px;height:10px;background:${d.color};border-radius:2px;"></div>
      <span>${d.label} : <strong>${d.val}</strong></span>
    </div>`).join('');
}

function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

// ════════════════════════════════════════════════════════════════
// CMS LOAD & SAVE
// ════════════════════════════════════════════════════════════════
async function loadCMSPage(section) {
  const data = await api('/content');
  content = data;

  switch (section) {
    case 'hero':
      setVal('hero-title', data.hero?.title);
      setVal('hero-subtitle', data.hero?.subtitle);
      setVal('hero-ctaText', data.hero?.ctaText);
      setVal('hero-ctaHref', data.hero?.ctaHref);
      if (data.hero?.backgroundImage) showImagePreview('hero-img-preview', data.hero.backgroundImage);
      break;
    case 'about':
      setVal('about-title', data.about?.title);
      setVal('about-text', data.about?.text);
      setVal('about-vision', data.about?.vision);
      setVal('about-values', (data.about?.values||[]).join(', '));
      renderAboutStats(data.about?.stats || []);
      break;
    case 'programs':
      renderPrograms(data.programs || []);
      break;
    case 'why':
      renderWhy(data.whyChooseUs || []);
      break;
    case 'testimonials':
      renderTestimonials(data.testimonials || []);
      break;
    case 'admission':
      setVal('admission-title', data.admission?.title);
      setVal('admission-subtitle', data.admission?.subtitle);
      renderAdmissionSteps(data.admission?.steps || []);
      renderAdmissionDocs(data.admission?.documentsRequired || []);
      renderAdmissionFaq(data.admission?.faq || []);
      break;
    case 'cta':
      setVal('cta-title', data.cta?.title);
      setVal('cta-subtitle', data.cta?.subtitle);
      renderCtaDates(data.cta?.dates || []);
      break;
    case 'contact':
      setVal('contact-director', data.contact?.director);
      setVal('contact-email', data.contact?.email);
      setVal('contact-phone', data.contact?.phone);
      setVal('contact-address', data.contact?.address);
      setVal('contact-hours', data.contact?.hours);
      setVal('contact-mapEmbed', data.contact?.mapEmbed);
      setVal('contact-linkedin', data.contact?.socialLinks?.linkedin);
      setVal('contact-instagram', data.contact?.socialLinks?.instagram);
      setVal('contact-facebook', data.contact?.socialLinks?.facebook);
      setVal('contact-twitter', data.contact?.socialLinks?.twitter);
      break;
    case 'partners':
      renderPartners(data.partners || []);
      break;
    case 'header':
      setVal('header-logoText', data.header?.logoText);
      setVal('header-ctaText', data.header?.ctaText);
      setVal('header-ctaHref', data.header?.ctaHref);
      if (data.header?.logo) showImagePreview('header-logo-preview', data.header.logo);
      renderNavLinks(data.header?.navLinks || []);
      break;
    case 'footer':
      setVal('footer-description', data.footer?.description);
      setVal('footer-copyright', data.footer?.copyright);
      renderFooterLinks(data.footer?.links || []);
      break;
    case 'seo':
      setVal('seo-title', data.seo?.title);
      setVal('seo-description', data.seo?.description);
      setVal('seo-keywords', data.seo?.keywords);
      if (data.seo?.ogImage) showImagePreview('seo-og-preview', data.seo.ogImage);
      break;
  }
}

function setVal(id, val) { const el = document.getElementById(id); if (el && val !== undefined) el.value = val || ''; }
function getVal(id) { const el = document.getElementById(id); return el ? el.value : ''; }

async function saveCurrentPage() {
  const section = currentPage.replace('cms-', '');
  let patch = {};

  switch (section) {
    case 'hero':
      patch = { hero: { ...content.hero, title: getVal('hero-title'), subtitle: getVal('hero-subtitle'), ctaText: getVal('hero-ctaText'), ctaHref: getVal('hero-ctaHref') } };
      break;
    case 'about':
      patch = { about: { ...content.about, title: getVal('about-title'), text: getVal('about-text'), vision: getVal('about-vision'), values: getVal('about-values').split(',').map(v=>v.trim()).filter(Boolean), stats: collectAboutStats() } };
      break;
    case 'cta':
      patch = { cta: { ...content.cta, title: getVal('cta-title'), subtitle: getVal('cta-subtitle'), dates: collectCtaDates() } };
      break;
    case 'contact':
      patch = { contact: { ...content.contact, director: getVal('contact-director'), email: getVal('contact-email'), phone: getVal('contact-phone'), address: getVal('contact-address'), hours: getVal('contact-hours'), mapEmbed: getVal('contact-mapEmbed'), socialLinks: { linkedin: getVal('contact-linkedin'), instagram: getVal('contact-instagram'), facebook: getVal('contact-facebook'), twitter: getVal('contact-twitter') } } };
      break;
    case 'header':
      patch = { header: { ...content.header, logoText: getVal('header-logoText'), ctaText: getVal('header-ctaText'), ctaHref: getVal('header-ctaHref'), navLinks: collectNavLinks() } };
      break;
    case 'footer':
      patch = { footer: { ...content.footer, description: getVal('footer-description'), copyright: getVal('footer-copyright'), links: collectFooterLinks() } };
      break;
    case 'seo':
      patch = { seo: { ...content.seo, title: getVal('seo-title'), description: getVal('seo-description'), keywords: getVal('seo-keywords') } };
      break;
    case 'admission':
      patch = { admission: { ...content.admission, title: getVal('admission-title'), subtitle: getVal('admission-subtitle'), steps: collectAdmissionSteps(), documentsRequired: collectAdmissionDocs(), faq: collectAdmissionFaq() } };
      break;
    default:
      toast('Sauvegardé!', 'success'); return;
  }

  const res = await api('/content', 'POST', { ...content, ...patch });
  if (res.success) { content = { ...content, ...patch }; toast('✅ Sauvegardé avec succès!'); }
  else toast('Erreur sauvegarde', 'error');
}

// ════════════════════════════════════════════════════════════════
// PROGRAMS CRUD
// ════════════════════════════════════════════════════════════════
function renderPrograms(programs) {
  document.getElementById('programs-list').innerHTML = programs.map(p => `
    <div class="prog-card">
      <div class="prog-actions">
        <button class="btn btn-sm" onclick="editProgram(${p.id})">✏️</button>
        <button class="btn btn-sm btn-red" onclick="deleteProgram(${p.id})">🗑️</button>
      </div>
      <div style="font-size:28px;margin-bottom:8px;">${p.icon||'📚'}</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:4px;">${p.title}</div>
      <div style="display:flex;gap:6px;margin-bottom:6px;">
        <span class="badge badge-green">${p.level||''}</span>
        <span class="badge badge-blue">${p.duration||''}</span>
      </div>
      <div style="font-size:12px;color:var(--muted)">${p.description}</div>
    </div>`).join('');
}

function openAddProgram(id) {
  const prog = id ? (content.programs||[]).find(p=>p.id===id) : {};
  openModal(id ? 'Modifier la formation' : 'Ajouter une formation', `
    <div class="form-group"><label class="form-label">Titre</label><input class="form-control" id="mp-title" value="${prog?.title||''}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Niveau</label><input class="form-control" id="mp-level" value="${prog?.level||'Bac+3'}"></div>
      <div class="form-group"><label class="form-label">Durée</label><input class="form-control" id="mp-duration" value="${prog?.duration||'3 ans'}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Icône (emoji)</label><input class="form-control" id="mp-icon" value="${prog?.icon||'📚'}"></div>
      <div class="form-group"><label class="form-label">Couleur</label><input class="form-control" type="color" id="mp-color" value="${prog?.color||'#1FAB89'}"></div>
    </div>
    <div class="form-group"><label class="form-label">Description courte</label><textarea class="form-control" id="mp-desc" rows="2">${prog?.description||''}</textarea></div>
    <div class="form-group"><label class="form-label">Description détaillée</label><textarea class="form-control" id="mp-details" rows="3">${prog?.details||''}</textarea></div>
    <div class="form-group"><label class="form-label">Débouchés (un par ligne)</label><textarea class="form-control" id="mp-outcomes" rows="3">${(prog?.outcomes||[]).join('\n')}</textarea></div>
  `, () => {
    const programs = content.programs || [];
    const newProg = {
      id: id || Date.now(), title: getVal('mp-title'), level: getVal('mp-level'), duration: getVal('mp-duration'),
      icon: getVal('mp-icon'), color: getVal('mp-color'), description: getVal('mp-desc'), details: getVal('mp-details'),
      outcomes: getVal('mp-outcomes').split('\n').map(o=>o.trim()).filter(Boolean),
    };
    if (id) { const idx = programs.findIndex(p=>p.id===id); programs[idx] = newProg; }
    else programs.push(newProg);
    saveSectionData('programs', programs);
    renderPrograms(programs);
  });
}
function editProgram(id) { openAddProgram(id); }
async function deleteProgram(id) {
  if (!confirm('Supprimer cette formation ?')) return;
  content.programs = (content.programs||[]).filter(p=>p.id!==id);
  await saveSectionData('programs', content.programs);
  renderPrograms(content.programs);
}

// ════════════════════════════════════════════════════════════════
// WHY CHOOSE US CRUD
// ════════════════════════════════════════════════════════════════
function renderWhy(items) {
  document.getElementById('why-list').innerHTML = items.map(item => `
    <div class="prog-card">
      <div class="prog-actions">
        <button class="btn btn-sm" onclick="editWhy(${item.id})">✏️</button>
        <button class="btn btn-sm btn-red" onclick="deleteWhy(${item.id})">🗑️</button>
      </div>
      <div style="font-size:32px;font-weight:800;color:${item.color||'var(--green)'}">${item.stat}</div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:6px;">${item.statLabel}</div>
      <div style="font-size:14px;font-weight:600;">${item.title}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:4px;">${item.description}</div>
    </div>`).join('');
}
function openAddWhy(id) {
  const item = id ? (content.whyChooseUs||[]).find(w=>w.id===id) : {};
  openModal(id ? 'Modifier' : 'Ajouter un avantage', `
    <div class="form-group"><label class="form-label">Titre</label><input class="form-control" id="mw-title" value="${item?.title||''}"></div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-control" id="mw-desc" rows="2">${item?.description||''}</textarea></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Statistique</label><input class="form-control" id="mw-stat" value="${item?.stat||''}"></div>
      <div class="form-group"><label class="form-label">Label stat</label><input class="form-control" id="mw-statLabel" value="${item?.statLabel||''}"></div>
    </div>
    <div class="form-group"><label class="form-label">Couleur</label><input class="form-control" type="color" id="mw-color" value="${item?.color||'#1FAB89'}"></div>
  `, () => {
    const items = content.whyChooseUs || [];
    const newItem = { id: id||Date.now(), title:getVal('mw-title'), description:getVal('mw-desc'), stat:getVal('mw-stat'), statLabel:getVal('mw-statLabel'), color:getVal('mw-color') };
    if (id) { const idx=items.findIndex(w=>w.id===id); items[idx]=newItem; } else items.push(newItem);
    saveSectionData('whyChooseUs', items); renderWhy(items);
  });
}
function editWhy(id) { openAddWhy(id); }
async function deleteWhy(id) {
  if (!confirm('Supprimer ?')) return;
  content.whyChooseUs=(content.whyChooseUs||[]).filter(w=>w.id!==id);
  await saveSectionData('whyChooseUs',content.whyChooseUs); renderWhy(content.whyChooseUs);
}

// ════════════════════════════════════════════════════════════════
// TESTIMONIALS CRUD
// ════════════════════════════════════════════════════════════════
function renderTestimonials(items) {
  document.getElementById('testimonials-list').innerHTML = items.map(t => `
    <div class="prog-card">
      <div class="prog-actions">
        <button class="btn btn-sm" onclick="editTestimonial(${t.id})">✏️</button>
        <button class="btn btn-sm btn-red" onclick="deleteTestimonial(${t.id})">🗑️</button>
      </div>
      <div style="font-size:14px;font-weight:600;">${t.name}</div>
      <div style="font-size:12px;color:var(--muted)">${t.program} · ${t.company||''}</div>
      <div style="margin:8px 0;font-size:13px;font-style:italic;color:var(--text)">"${t.text}"</div>
      <div>⭐⭐⭐⭐⭐</div>
    </div>`).join('');
}
function openAddTestimonial(id) {
  const t = id ? (content.testimonials||[]).find(x=>x.id===id) : {};
  openModal(id?'Modifier':'Ajouter un témoignage', `
    <div class="form-row">
      <div class="form-group"><label class="form-label">Nom</label><input class="form-control" id="mt-name" value="${t?.name||''}"></div>
      <div class="form-group"><label class="form-label">Entreprise</label><input class="form-control" id="mt-company" value="${t?.company||''}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Formation</label><input class="form-control" id="mt-program" value="${t?.program||''}"></div>
      <div class="form-group"><label class="form-label">Année</label><input class="form-control" id="mt-year" value="${t?.year||''}"></div>
    </div>
    <div class="form-group"><label class="form-label">Témoignage</label><textarea class="form-control" id="mt-text" rows="4">${t?.text||''}</textarea></div>
  `, () => {
    const items = content.testimonials||[];
    const newT = { id:id||Date.now(), name:getVal('mt-name'), company:getVal('mt-company'), program:getVal('mt-program'), year:getVal('mt-year'), text:getVal('mt-text'), rating:5 };
    if (id) { const idx=items.findIndex(x=>x.id===id); items[idx]=newT; } else items.push(newT);
    saveSectionData('testimonials',items); renderTestimonials(items);
  });
}
function editTestimonial(id) { openAddTestimonial(id); }
async function deleteTestimonial(id) {
  if (!confirm('Supprimer ?')) return;
  content.testimonials=(content.testimonials||[]).filter(t=>t.id!==id);
  await saveSectionData('testimonials',content.testimonials); renderTestimonials(content.testimonials);
}

// ════════════════════════════════════════════════════════════════
// PARTNERS CRUD
// ════════════════════════════════════════════════════════════════
function renderPartners(items) {
  document.getElementById('partners-list').innerHTML = items.map(p => `
    <div class="prog-card">
      <div class="prog-actions">
        <button class="btn btn-sm" onclick="editPartner(${p.id})">✏️</button>
        <button class="btn btn-sm btn-red" onclick="deletePartner(${p.id})">🗑️</button>
      </div>
      ${p.logo ? `<img src="${p.logo}" style="height:40px;object-fit:contain;margin-bottom:8px;">` : '<div style="font-size:28px;margin-bottom:8px;">🤝</div>'}
      <div style="font-size:14px;font-weight:600;">${p.name}</div>
      <div style="font-size:11px;color:var(--muted)">${p.category||''}</div>
    </div>`).join('');
}
function openAddPartner(id) {
  const p = id ? (content.partners||[]).find(x=>x.id===id) : {};
  openModal(id?'Modifier':'Ajouter un partenaire', `
    <div class="form-group"><label class="form-label">Nom</label><input class="form-control" id="mpart-name" value="${p?.name||''}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Catégorie</label><input class="form-control" id="mpart-cat" value="${p?.category||'Entreprise'}"></div>
      <div class="form-group"><label class="form-label">URL</label><input class="form-control" id="mpart-url" value="${p?.url||''}"></div>
    </div>
    <div class="form-group"><label class="form-label">Logo (URL)</label><input class="form-control" id="mpart-logo" value="${p?.logo||''}"></div>
  `, () => {
    const items = content.partners||[];
    const newP = { id:id||Date.now(), name:getVal('mpart-name'), category:getVal('mpart-cat'), url:getVal('mpart-url'), logo:getVal('mpart-logo') };
    if (id) { const idx=items.findIndex(x=>x.id===id); items[idx]=newP; } else items.push(newP);
    saveSectionData('partners',items); renderPartners(items);
  });
}
function editPartner(id) { openAddPartner(id); }
async function deletePartner(id) {
  if (!confirm('Supprimer ?')) return;
  content.partners=(content.partners||[]).filter(p=>p.id!==id);
  await saveSectionData('partners',content.partners); renderPartners(content.partners);
}

// ════════════════════════════════════════════════════════════════
// INLINE EDITORS (About Stats, CTA Dates, Nav Links, etc.)
// ════════════════════════════════════════════════════════════════
function renderAboutStats(stats) {
  document.getElementById('about-stats-editor').innerHTML = stats.map((s,i) => `
    <div class="form-row" style="margin-bottom:8px;align-items:end;">
      <div class="form-group" style="margin:0"><label class="form-label">Valeur</label><input class="form-control" id="astat-val-${i}" value="${s.value}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Label</label><input class="form-control" id="astat-lbl-${i}" value="${s.label}"></div>
      <button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>
    </div>`).join('');
}
function addAboutStat() {
  const el = document.createElement('div');
  const i = Date.now();
  el.className='form-row'; el.style.marginBottom='8px'; el.style.alignItems='end';
  el.innerHTML=`<div class="form-group" style="margin:0"><label class="form-label">Valeur</label><input class="form-control" id="astat-val-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Label</label><input class="form-control" id="astat-lbl-${i}" value=""></div><button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>`;
  document.getElementById('about-stats-editor').appendChild(el);
}
function collectAboutStats() {
  return [...document.querySelectorAll('[id^="astat-val-"]')].map(el => {
    const i = el.id.replace('astat-val-','');
    return { value: el.value, label: document.getElementById(`astat-lbl-${i}`)?.value || '' };
  });
}

function renderCtaDates(dates) {
  document.getElementById('cta-dates-editor').innerHTML = dates.map((d,i)=>`
    <div class="form-row" style="margin-bottom:8px;align-items:end;">
      <div class="form-group" style="margin:0"><label class="form-label">Label</label><input class="form-control" id="cdate-lbl-${i}" value="${d.label}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Sous-label</label><input class="form-control" id="cdate-sub-${i}" value="${d.sub}"></div>
      <button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>
    </div>`).join('');
}
function addCtaDate() {
  const el=document.createElement('div'); const i=Date.now();
  el.className='form-row'; el.style.marginBottom='8px'; el.style.alignItems='end';
  el.innerHTML=`<div class="form-group" style="margin:0"><label class="form-label">Label</label><input class="form-control" id="cdate-lbl-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Sous-label</label><input class="form-control" id="cdate-sub-${i}" value=""></div><button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>`;
  document.getElementById('cta-dates-editor').appendChild(el);
}
function collectCtaDates() {
  return [...document.querySelectorAll('[id^="cdate-lbl-"]')].map(el => {
    const i=el.id.replace('cdate-lbl-',''); return { label:el.value, sub:document.getElementById(`cdate-sub-${i}`)?.value||'' };
  });
}

function renderNavLinks(links) {
  document.getElementById('header-nav-editor').innerHTML = links.map((l,i)=>`
    <div class="form-row" style="margin-bottom:8px;align-items:end;">
      <div class="form-group" style="margin:0"><label class="form-label">Texte</label><input class="form-control" id="nav-lbl-${i}" value="${l.label}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Lien</label><input class="form-control" id="nav-href-${i}" value="${l.href}"></div>
      <button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>
    </div>`).join('');
}
function addNavLink() {
  const el=document.createElement('div'); const i=Date.now();
  el.className='form-row'; el.style.marginBottom='8px'; el.style.alignItems='end';
  el.innerHTML=`<div class="form-group" style="margin:0"><label class="form-label">Texte</label><input class="form-control" id="nav-lbl-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Lien</label><input class="form-control" id="nav-href-${i}" value=""></div><button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>`;
  document.getElementById('header-nav-editor').appendChild(el);
}
function collectNavLinks() {
  return [...document.querySelectorAll('[id^="nav-lbl-"]')].map(el=>{
    const i=el.id.replace('nav-lbl-',''); return {label:el.value,href:document.getElementById(`nav-href-${i}`)?.value||''};
  });
}

function renderFooterLinks(links) {
  document.getElementById('footer-links-editor').innerHTML = links.map((l,i)=>`
    <div class="form-row" style="margin-bottom:8px;align-items:end;">
      <div class="form-group" style="margin:0"><label class="form-label">Texte</label><input class="form-control" id="flink-lbl-${i}" value="${l.label}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Lien</label><input class="form-control" id="flink-href-${i}" value="${l.href}"></div>
      <button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>
    </div>`).join('');
}
function addFooterLink() {
  const el=document.createElement('div'); const i=Date.now();
  el.className='form-row'; el.style.marginBottom='8px'; el.style.alignItems='end';
  el.innerHTML=`<div class="form-group" style="margin:0"><label class="form-label">Texte</label><input class="form-control" id="flink-lbl-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Lien</label><input class="form-control" id="flink-href-${i}" value=""></div><button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>`;
  document.getElementById('footer-links-editor').appendChild(el);
}
function collectFooterLinks() {
  return [...document.querySelectorAll('[id^="flink-lbl-"]')].map(el=>{
    const i=el.id.replace('flink-lbl-',''); return {label:el.value,href:document.getElementById(`flink-href-${i}`)?.value||''};
  });
}

// Admission Steps/Docs/FAQ editors
function renderAdmissionSteps(steps) {
  document.getElementById('admission-steps-editor').innerHTML = steps.map((s,i)=>`
    <div class="form-row" style="margin-bottom:8px;align-items:start;">
      <div class="form-group" style="margin:0;flex:0 0 60px;"><label class="form-label">N°</label><input class="form-control" id="astep-num-${i}" value="${s.num}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Titre</label><input class="form-control" id="astep-title-${i}" value="${s.title}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Description</label><textarea class="form-control" id="astep-desc-${i}" rows="2">${s.desc}</textarea></div>
      <button class="btn btn-sm btn-red" style="margin-top:20px" onclick="this.closest('.form-row').remove()">🗑️</button>
    </div>`).join('');
}
function addAdmissionStep() {
  const i=Date.now(); const el=document.createElement('div'); el.className='form-row'; el.style.marginBottom='8px'; el.style.alignItems='start';
  el.innerHTML=`<div class="form-group" style="margin:0;flex:0 0 60px"><label class="form-label">N°</label><input class="form-control" id="astep-num-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Titre</label><input class="form-control" id="astep-title-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Description</label><textarea class="form-control" id="astep-desc-${i}" rows="2"></textarea></div><button class="btn btn-sm btn-red" style="margin-top:20px" onclick="this.closest('.form-row').remove()">🗑️</button>`;
  document.getElementById('admission-steps-editor').appendChild(el);
}
function collectAdmissionSteps() {
  return [...document.querySelectorAll('[id^="astep-num-"]')].map(el=>{
    const i=el.id.replace('astep-num-',''); return {num:el.value,title:document.getElementById(`astep-title-${i}`)?.value||'',desc:document.getElementById(`astep-desc-${i}`)?.value||''};
  });
}
function renderAdmissionDocs(docs) {
  document.getElementById('admission-docs-editor').innerHTML = docs.map((d,i)=>`
    <div class="form-row" style="margin-bottom:8px;align-items:end;">
      <div class="form-group" style="margin:0"><label class="form-label">Label</label><input class="form-control" id="adoc-lbl-${i}" value="${d.label}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Formats</label><input class="form-control" id="adoc-fmt-${i}" value="${d.formats||''}"></div>
      <div class="form-group" style="margin:0;flex:0 0 80px"><label class="form-label">Taille max</label><input class="form-control" id="adoc-size-${i}" value="${d.maxSize||'5MB'}"></div>
      <button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>
    </div>`).join('');
}
function addAdmissionDoc() {
  const i=Date.now(); const el=document.createElement('div'); el.className='form-row'; el.style.marginBottom='8px'; el.style.alignItems='end';
  el.innerHTML=`<div class="form-group" style="margin:0"><label class="form-label">Label</label><input class="form-control" id="adoc-lbl-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Formats</label><input class="form-control" id="adoc-fmt-${i}" value=""></div><div class="form-group" style="margin:0;flex:0 0 80px"><label class="form-label">Taille max</label><input class="form-control" id="adoc-size-${i}" value="5MB"></div><button class="btn btn-sm btn-red" onclick="this.closest('.form-row').remove()">🗑️</button>`;
  document.getElementById('admission-docs-editor').appendChild(el);
}
function collectAdmissionDocs() {
  return [...document.querySelectorAll('[id^="adoc-lbl-"]')].map(el=>{
    const i=el.id.replace('adoc-lbl-',''); return {label:el.value,formats:document.getElementById(`adoc-fmt-${i}`)?.value||'',maxSize:document.getElementById(`adoc-size-${i}`)?.value||'5MB',required:true};
  });
}
function renderAdmissionFaq(faq) {
  document.getElementById('admission-faq-editor').innerHTML = faq.map((f,i)=>`
    <div style="margin-bottom:12px;background:var(--card2);padding:12px;border-radius:var(--radius);">
      <div class="form-group" style="margin-bottom:6px"><label class="form-label">Question</label><input class="form-control" id="afaq-q-${i}" value="${f.q||''}"></div>
      <div class="form-group" style="margin:0"><label class="form-label">Réponse</label><textarea class="form-control" id="afaq-a-${i}" rows="2">${f.a||''}</textarea></div>
      <button class="btn btn-sm btn-red" style="margin-top:8px" onclick="this.closest('div[style]').remove()">🗑️ Supprimer</button>
    </div>`).join('');
}
function addAdmissionFaq() {
  const i=Date.now(); const el=document.createElement('div'); el.style.cssText='margin-bottom:12px;background:var(--card2);padding:12px;border-radius:var(--radius)';
  el.innerHTML=`<div class="form-group" style="margin-bottom:6px"><label class="form-label">Question</label><input class="form-control" id="afaq-q-${i}" value=""></div><div class="form-group" style="margin:0"><label class="form-label">Réponse</label><textarea class="form-control" id="afaq-a-${i}" rows="2"></textarea></div><button class="btn btn-sm btn-red" style="margin-top:8px" onclick="this.closest('div[style]').remove()">🗑️ Supprimer</button>`;
  document.getElementById('admission-faq-editor').appendChild(el);
}
function collectAdmissionFaq() {
  return [...document.querySelectorAll('[id^="afaq-q-"]')].map(el=>{
    const i=el.id.replace('afaq-q-',''); return {q:el.value,a:document.getElementById(`afaq-a-${i}`)?.value||''};
  });
}

// ════════════════════════════════════════════════════════════════
// SAVE SECTION DATA
// ════════════════════════════════════════════════════════════════
async function saveSectionData(key, data) {
  content[key] = data;
  const res = await api('/content', 'POST', content);
  if (res.success) toast('✅ Sauvegardé!');
  else toast('Erreur sauvegarde', 'error');
}

// ════════════════════════════════════════════════════════════════
// NEWS CRUD
// ════════════════════════════════════════════════════════════════
let newsFilter = 'all';
async function loadNews() {
  newsData = await api('/news');
  renderNewsList();
}
function filterNews(f, el) {
  newsFilter = f;
  document.querySelectorAll('#page-news .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderNewsList();
}
function renderNewsList() {
  let items = newsData;
  if (newsFilter === 'published') items = items.filter(n => n.published);
  if (newsFilter === 'draft') items = items.filter(n => !n.published);
  document.getElementById('news-list').innerHTML = items.map(n => `
    <div class="news-card">
      <div class="news-card-img">${n.image ? `<img src="${n.image}" style="width:100%;height:100%;object-fit:cover">` : '📰'}</div>
      <div class="news-card-body">
        <div class="news-card-meta">
          <span class="badge ${n.published?'badge-green':'badge-gray'}">${n.published?'Publié':'Brouillon'}</span>
          <span style="font-size:11px;color:var(--muted)">${new Date(n.date).toLocaleDateString('fr-FR')}</span>
          <span class="badge badge-blue">${n.category||'Article'}</span>
        </div>
        <div class="news-card-title">${n.title}</div>
        <div class="news-card-excerpt">${n.excerpt}</div>
      </div>
      <div class="news-card-footer">
        <div class="news-stats">
          <div class="news-stat">👁 ${n.views||0}</div>
          <div class="news-stat">❤️ ${n.likes||0}</div>
        </div>
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm" onclick="editNews(${n.id})">✏️</button>
          <button class="btn btn-sm" onclick="togglePublishNews(${n.id},${!n.published})">${n.published?'📤':'📥'}</button>
          <button class="btn btn-sm btn-red" onclick="deleteNews(${n.id})">🗑️</button>
        </div>
      </div>
    </div>`).join('') || '<div style="color:var(--muted);padding:24px;text-align:center;">Aucun article</div>';
}
function openAddNews(id) {
  const n = id ? newsData.find(x => x.id === id) : {};
  openModal(id ? 'Modifier l\'article' : 'Nouvel article', `
    <div class="form-group"><label class="form-label">Titre</label><input class="form-control" id="mn-title" value="${n?.title||''}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Catégorie</label><input class="form-control" id="mn-cat" value="${n?.category||'Actualité'}"></div>
      <div class="form-group"><label class="form-label">Auteur</label><input class="form-control" id="mn-author" value="${n?.author||'Green Up Academy'}"></div>
    </div>
    <div class="form-group"><label class="form-label">Extrait</label><textarea class="form-control" id="mn-excerpt" rows="2">${n?.excerpt||''}</textarea></div>
    <div class="form-group"><label class="form-label">Contenu (HTML possible)</label><textarea class="form-control" id="mn-content" rows="8" style="font-family:monospace;font-size:12px">${n?.content||''}</textarea></div>
    <div class="form-group"><label class="form-label">URL Image</label><input class="form-control" id="mn-image" value="${n?.image||''}"></div>
    <div class="form-group"><label class="form-label">Tags (virgule)</label><input class="form-control" id="mn-tags" value="${(n?.tags||[]).join(', ')}"></div>
    <div class="form-group"><label class="form-label">Date de publication</label><input type="date" class="form-control" id="mn-date" value="${n?.date?n.date.split('T')[0]:''}"></div>
    <div class="form-group" style="display:flex;align-items:center;gap:10px">
      <label class="toggle"><input type="checkbox" id="mn-published" ${n?.published?'checked':''}><span class="toggle-slider"></span></label>
      <span style="font-size:13px">Publier immédiatement</span>
    </div>
  `, async () => {
    const payload = {
      title: getVal('mn-title'), category: getVal('mn-cat'), author: getVal('mn-author'),
      excerpt: getVal('mn-excerpt'), content: getVal('mn-content'), image: getVal('mn-image'),
      tags: getVal('mn-tags').split(',').map(t=>t.trim()).filter(Boolean),
      date: document.getElementById('mn-date').value || new Date().toISOString(),
      published: document.getElementById('mn-published').checked,
    };
    const res = id ? await api(`/news/${id}`, 'PUT', payload) : await api('/news', 'POST', payload);
    if (!res.error) { toast('✅ Article sauvegardé!'); await loadNews(); }
    else toast('Erreur', 'error');
  });
}
function editNews(id) { openAddNews(id); }
async function togglePublishNews(id, state) {
  await api(`/news/${id}`, 'PUT', { ...newsData.find(n=>n.id===id), published: state });
  toast(state ? '✅ Publié!' : '📤 Dépublié');
  loadNews();
}
async function deleteNews(id) {
  if (!confirm('Supprimer cet article ?')) return;
  await api(`/news/${id}`, 'DELETE');
  toast('Article supprimé');
  loadNews();
}

// ════════════════════════════════════════════════════════════════
// APPLICATIONS
// ════════════════════════════════════════════════════════════════
async function loadApplications() {
  allApplications = await api('/applications');
  populateProgramFilter();
  renderApplicationsTable(allApplications);
  renderKanban(allApplications);
}

function populateProgramFilter() {
  const programs = [...new Set(allApplications.map(a => a.program))];
  const sel = document.getElementById('filter-app-program');
  sel.innerHTML = '<option value="">Toutes les formations</option>' + programs.map(p => `<option value="${p}">${p}</option>`).join('');
}

function filterApplications() {
  const status = document.getElementById('filter-app-status').value;
  const program = document.getElementById('filter-app-program').value;
  let filtered = allApplications;
  if (status) filtered = filtered.filter(a => a.status === status);
  if (program) filtered = filtered.filter(a => a.program === program);
  renderApplicationsTable(filtered);
  renderKanban(filtered);
}

function renderApplicationsTable(apps) {
  document.getElementById('apps-tbody').innerHTML = apps.map(a => `
    <tr>
      <td>
        <div style="font-weight:600">${a.fullName}</div>
        <div style="font-size:11px;color:var(--muted)">${a.email}</div>
        ${!a.read?'<span class="badge badge-green" style="font-size:9px">Nouveau</span>':''}
      </td>
      <td><div style="font-size:13px">${a.program}</div><div style="font-size:11px;color:var(--muted)">${a.programNiveau||''}</div></td>
      <td style="font-size:12px;color:var(--muted)">${new Date(a.date).toLocaleDateString('fr-FR')}</td>
      <td>${statusBadge(a.status)}</td>
      <td style="font-size:11px;color:var(--muted)">${Object.keys(a.files||{}).length} fichier(s)</td>
      <td>
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm" onclick="viewApplication(${a.id})">👁 Voir</button>
          <select class="form-control" style="width:130px;padding:4px 6px;font-size:12px" onchange="updateAppStatus(${a.id},this.value)">
            <option value="nouveau" ${a.status==='nouveau'?'selected':''}>🆕 Nouveau</option>
            <option value="en_etude" ${a.status==='en_etude'?'selected':''}>⏳ En étude</option>
            <option value="accepte" ${a.status==='accepte'?'selected':''}>✅ Accepté</option>
            <option value="refuse" ${a.status==='refuse'?'selected':''}>❌ Refusé</option>
          </select>
          <button class="btn btn-sm btn-red" onclick="deleteApplication(${a.id})">🗑️</button>
        </div>
      </td>
    </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:24px">Aucune candidature</td></tr>';
}

function renderKanban(apps) {
  ['nouveau','en_etude','accepte','refuse'].forEach(status => {
    const items = apps.filter(a => a.status === status);
    document.getElementById(`k-${status}`).textContent = items.length;
    document.getElementById(`k-col-${status}`).innerHTML = items.map(a => `
      <div class="kanban-card" onclick="viewApplication(${a.id})">
        <div style="font-size:13px;font-weight:600">${a.fullName}</div>
        <div style="font-size:11px;color:var(--muted);margin:2px 0">${a.program}</div>
        <div style="font-size:11px;color:var(--muted)">${new Date(a.date).toLocaleDateString('fr-FR')}</div>
        ${!a.read?'<span class="badge badge-green" style="margin-top:4px;font-size:9px">Non lu</span>':''}
      </div>`).join('') || '<div style="color:var(--muted);font-size:12px;text-align:center;padding:12px;">Vide</div>';
  });
}

let switchAppViewState = 'table';
function switchAppView(view, el) {
  switchAppViewState = view;
  document.querySelectorAll('#page-applications .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('apps-table-view').style.display = view === 'table' ? 'block' : 'none';
  document.getElementById('apps-kanban-view').style.display = view === 'kanban' ? 'block' : 'none';
}

async function updateAppStatus(id, status) {
  await api(`/applications/${id}`, 'PATCH', { status });
  toast('Statut mis à jour');
  const app = allApplications.find(a => a.id === id);
  if (app) { app.status = status; app.read = true; }
  renderKanban(allApplications);
}

async function viewApplication(id) {
  const a = allApplications.find(x => x.id === id);
  if (!a) return;
  if (!a.read) { await api(`/applications/${id}`, 'PATCH', { read: true }); a.read = true; }

  const filesHtml = Object.entries(a.files || {}).map(([key, arr]) =>
    arr.map(f => `<a href="${f.url}" target="_blank" class="btn btn-sm" style="margin:2px">📎 ${key.toUpperCase()}: ${f.name}</a>`).join('')
  ).join('');

  document.getElementById('app-modal-title').textContent = `Candidature — ${a.fullName}`;
  document.getElementById('app-modal-body').innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
      ${statusBadge(a.status)}
      <span class="badge badge-blue">${a.program}</span>
      <span class="badge badge-gray">${a.programNiveau||''}</span>
      <span class="badge badge-purple">Rentrée: ${a.startDate||'?'}</span>
    </div>
    <div class="grid-2" style="margin-bottom:16px;">
      <div class="card" style="background:var(--card2)"><div class="card-title" style="margin-bottom:10px">👤 Identité</div>
        <div style="font-size:13px;line-height:2"><b>Nom:</b> ${a.fullName}<br><b>Email:</b> <a href="mailto:${a.email}">${a.email}</a><br><b>Tél:</b> ${a.phone||'—'}<br><b>Naissance:</b> ${a.birthDate||'—'} à ${a.birthPlace||'—'}<br><b>Nationalité:</b> ${a.nationality||'—'}<br><b>Adresse:</b> ${a.address||'—'}</div>
      </div>
      <div class="card" style="background:var(--card2)"><div class="card-title" style="margin-bottom:10px">🎓 Parcours</div>
        <div style="font-size:13px;line-height:2"><b>Diplôme:</b> ${a.diploma||'—'}<br><b>Année:</b> ${a.year||'—'}<br><b>École:</b> ${a.school||'—'}<br><b>Spécialité:</b> ${a.specialite||'—'}<br><b>Moyenne:</b> ${a.gpa||'—'}</div>
      </div>
    </div>
    <div class="card" style="background:var(--card2);margin-bottom:16px"><div class="card-title" style="margin-bottom:8px">✍️ Lettre de motivation</div>
      <div style="font-size:13px;line-height:1.8;color:var(--muted)">${(a.motivation||'—').replace(/\n/g,'<br>')}</div>
    </div>
    ${a.experience ? `<div class="card" style="background:var(--card2);margin-bottom:16px"><div class="card-title" style="margin-bottom:8px">💼 Expérience</div><div style="font-size:13px;line-height:1.8;color:var(--muted)">${a.experience.replace(/\n/g,'<br>')}</div></div>` : ''}
    ${filesHtml ? `<div class="card" style="background:var(--card2)"><div class="card-title" style="margin-bottom:8px">📎 Documents</div>${filesHtml}</div>` : ''}
    <div class="card" style="background:var(--card2);margin-top:16px">
      <div class="card-title" style="margin-bottom:12px">📧 Répondre à ${a.firstName}</div>
      <div class="form-group"><label class="form-label">Changer le statut</label>
        <select class="form-control" id="reply-status">
          <option value="">Ne pas changer</option>
          <option value="en_etude"> Passer en étude</option>
          <option value="accepte"> Accepter la candidature</option>
          <option value="refuse"> Refuser la candidature</option>
        </select>
      </div>
      <div class="form-group"><label class="form-label">Objet</label><input class="form-control" id="reply-subject" value="Réponse à votre candidature — ${a.program}"></div>
      <div class="form-group"><label class="form-label">Message</label><textarea class="form-control" id="reply-message" rows="6" placeholder="Bonjour ${a.firstName},..."></textarea></div>
      <button class="btn btn-green" onclick="sendAppReply(${a.id})">📧 Envoyer la réponse</button>
    </div>`;

  document.getElementById('app-reply-btn').onclick = () => sendAppReply(a.id);
  document.getElementById('app-modal').style.display = 'flex';
}

async function sendAppReply(id) {
  const subject = getVal('reply-subject');
  const message = getVal('reply-message');
  const status = document.getElementById('reply-status')?.value;
  if (!message.trim()) { toast('Rédigez un message', 'error'); return; }
  const res = await api(`/applications/${id}/reply`, 'POST', { subject, message, status });
  if (res.success) {
    toast(' Réponse envoyée!');
    if (status) { const a = allApplications.find(x => x.id === id); if (a) a.status = status; }
    closeAppModal();
    renderApplicationsTable(allApplications);
    renderKanban(allApplications);
  } else toast('Erreur envoi: ' + res.error, 'error');
}

function closeAppModal() { document.getElementById('app-modal').style.display = 'none'; }

async function deleteApplication(id) {
  if (!confirm('Supprimer cette candidature ?')) return;
  await api(`/applications/${id}`, 'DELETE');
  allApplications = allApplications.filter(a => a.id !== id);
  renderApplicationsTable(allApplications);
  renderKanban(allApplications);
  toast('Candidature supprimée');
}

function statusBadge(status) {
  const map = { nouveau:'badge-blue', en_etude:'badge-yellow', accepte:'badge-green', refuse:'badge-red' };
  const labels = { nouveau:'🆕 Nouveau', en_etude:'⏳ En étude', accepte:'✅ Accepté', refuse:'❌ Refusé' };
  return `<span class="badge ${map[status]||'badge-gray'}">${labels[status]||status}</span>`;
}

// ════════════════════════════════════════════════════════════════
// MESSAGES
// ════════════════════════════════════════════════════════════════
async function loadMessages() {
  messages = await api('/messages');
  document.getElementById('messages-list').innerHTML = messages.map(m => `
    <div class="msg-item ${m.read?'':'unread'}" onclick="viewMessage(${m.id})">
      <div class="msg-meta">
        <div class="msg-from">${m.name} <span style="font-size:11px;color:var(--muted);font-weight:400">&lt;${m.email}&gt;</span></div>
        <div class="msg-date">${new Date(m.date).toLocaleDateString('fr-FR', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
      </div>
      <div class="msg-subject">${m.subject||'Sans sujet'}</div>
      <div class="msg-preview">${m.message}</div>
      <div style="display:flex;gap:4px;margin-top:8px">
        <button class="btn btn-sm" onclick="event.stopPropagation();markMsgRead(${m.id},${!m.read})">${m.read?'📩':'✉️'} ${m.read?'Non lu':'Marquer lu'}</button>
        <button class="btn btn-sm btn-red" onclick="event.stopPropagation();deleteMessage(${m.id})">🗑️</button>
        <a href="mailto:${m.email}?subject=Re: ${m.subject||''}" class="btn btn-sm btn-green" onclick="event.stopPropagation()">📧 Répondre</a>
      </div>
    </div>`).join('') || '<div style="color:var(--muted);padding:24px;text-align:center">Aucun message</div>';
}

async function viewMessage(id) {
  const m = messages.find(x => x.id === id);
  if (!m) return;
  await markMsgRead(id, true);
  document.getElementById('msg-modal-title').textContent = m.subject || 'Message de contact';
  document.getElementById('msg-modal-body').innerHTML = `
    <div style="margin-bottom:16px;">
      <div style="font-size:14px;font-weight:600">${m.name}</div>
      <div style="font-size:13px;color:var(--muted)">${m.email} ${m.phone?'· '+m.phone:''}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:4px">${new Date(m.date).toLocaleString('fr-FR')}</div>
    </div>
    <div style="background:var(--card2);padding:16px;border-radius:var(--radius);font-size:14px;line-height:1.8;">${(m.message||'').replace(/\n/g,'<br>')}</div>
    <div style="margin-top:16px">
      <a href="mailto:${m.email}?subject=Re: ${m.subject||''}" class="btn btn-green">📧 Répondre par email</a>
    </div>`;
  document.getElementById('msg-modal').style.display = 'flex';
}

async function markMsgRead(id, state) {
  await api(`/messages/${id}`, 'PATCH', { read: state });
  const m = messages.find(x => x.id === id);
  if (m) m.read = state;
  loadMessages();
}

async function deleteMessage(id) {
  if (!confirm('Supprimer ce message ?')) return;
  await api(`/messages/${id}`, 'DELETE');
  messages = messages.filter(m => m.id !== id);
  loadMessages();
  toast('Message supprimé');
}

// ════════════════════════════════════════════════════════════════
// SERVER STATUS
// ════════════════════════════════════════════════════════════════
async function checkServerStatus() {
  const status = await api('/status');
  if (!status.error) {
    document.getElementById('server-status').innerHTML = '🟢 En ligne';
    document.getElementById('server-info').innerHTML = `
      <div><b>Version :</b> ${status.version}</div>
      <div><b>Email :</b> ${status.emailMode}</div>
      <div><b>Email configuré :</b> ${status.emailConfigured ? '✅ Oui' : '❌ Non'}</div>
      <div><b>Admin :</b> ${status.adminEmail}</div>
      <div><b>Timestamp :</b> ${new Date(status.timestamp).toLocaleString('fr-FR')}</div>`;
    const alertEl = document.getElementById('email-status');
    if (status.emailConfigured) { alertEl.className='alert alert-success'; alertEl.innerHTML='✅ Email correctement configuré en mode '+status.emailMode; }
    else { alertEl.className='alert alert-error'; alertEl.innerHTML='❌ Email non configuré — les emails ne seront pas envoyés. Configurez votre .env'; }
  } else {
    document.getElementById('server-status').innerHTML = '🔴 Hors ligne';
    document.getElementById('server-info').innerHTML = '<div style="color:var(--red)">❌ Serveur inaccessible — Vérifiez que le serveur tourne sur le port 4000</div>';
  }
}

// ════════════════════════════════════════════════════════════════
// IMAGE UPLOAD
// ════════════════════════════════════════════════════════════════
async function uploadImage(input, field, previewId) {
  const file = input.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(`${API}/upload-image`, { method: 'POST', body: fd }).then(r => r.json());
  if (res.url) {
    // Store in content
    const keys = field.split('-');
    if (!content[keys[0]]) content[keys[0]] = {};
    content[keys[0]][keys[1]] = `http://localhost:4000${res.url}`;
    showImagePreview(previewId, `http://localhost:4000${res.url}`);
    toast(' Image uploadée!');
  }
}
function showImagePreview(containerId, url) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<img src="${url}" class="img-preview" onerror="this.style.display='none'">`;
}

// ════════════════════════════════════════════════════════════════
// GENERIC MODAL
// ════════════════════════════════════════════════════════════════
function openModal(title, body, onSave) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  modalCallback = onSave;
  document.getElementById('modal').style.display = 'flex';
}
function closeModal() { document.getElementById('modal').style.display = 'none'; modalCallback = null; }
function modalSave() { if (modalCallback) { modalCallback(); closeModal(); } }

// Close on overlay click
document.getElementById('modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.getElementById('app-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeAppModal(); });
document.getElementById('msg-modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.style.display = 'none'; });

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
async function init() {
  await checkServerStatus();
  await loadAnalytics();
  // Auto-refresh badges every 30 sec
  setInterval(async () => {
    const [apps, msgs] = await Promise.all([api('/applications'), api('/messages')]);
    document.getElementById('badge-apps').textContent = (apps||[]).filter(a=>!a.read).length || '';
    document.getElementById('badge-msgs').textContent = (msgs||[]).filter(m=>!m.read).length || '';
  }, 30000);
}
init();
</script>
</body>
</html>