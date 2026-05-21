// App router

function App() {
  const initial = (window.location.hash || '').replace('#', '') || 'home';
  const [route, setRoute] = React.useState(initial);
  const [property, setProperty] = React.useState(null);
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route, property]);
  React.useEffect(() => {
    const onHash = () => {
      const r = (window.location.hash || '').replace('#', '');
      if (r) setRoute(r);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  // Keep URL in sync for admin global (hidden entry point)
  React.useEffect(() => {
    if (route.startsWith('admin-global')) {
      if (window.location.hash !== '#' + route) window.history.replaceState(null, '', '#' + route);
    } else if (window.location.hash.startsWith('#admin-global')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [route]);

  const nav = (r) => {
    if (r === 'help' || r === 'ads') { setRoute('home'); return; }
    if (r === 'posters') { setRoute('admin-agent-qr'); return; }
    setRoute(r);
  };
  const openProperty = (p) => { setProperty(p); setRoute('detail'); };
  const hideHeader = route.startsWith('admin-') || route === 'posters';

  return (
    <div className="app-shell">
      {!hideHeader && <Header route={route} onNav={nav}/>}
      {route === 'home' && <HomePage onNav={nav} onProperty={openProperty}/>}
      {route === 'catalog' && <CatalogPage onProperty={openProperty}/>}
      {route === 'detail' && <DetailPage p={property || PROPERTIES[0]} onProperty={openProperty} onNav={nav}/>}
      {route === 'temporal' && <TemporalPage onProperty={openProperty}/>}
      {route === 'plans' && <PlansPage onNav={nav}/>}
      {route === 'publish' && <PublishPage/>}
      {(route === 'posters' || route === 'admin-agent-qr') && <PostersPage route={route} onNav={nav}/>}
      {route.startsWith('admin-global') && <AdminGlobalPage route={route} onNav={nav}/>}
      {route.startsWith('admin-agent') && route !== 'admin-agent-qr' && <AdminAgentPage route={route} onNav={nav}/>}
      {!hideHeader && <Footer onNav={nav}/>}

      <DemoNav route={route} setRoute={setRoute}/>
    </div>
  );
}

// Floating demo nav so reviewers can jump between all screens
function DemoNav({ route, setRoute }) {
  const [open, setOpen] = React.useState(true);
  const screens = [
    ['home', 'Home', 'house'],
    ['catalog', 'Catálogo', 'grid'],
    ['detail', 'Detalle', 'eye'],
    ['temporal', 'Temporal', 'cal'],
    ['plans', 'Planes', 'star'],
    ['publish', 'Publicar', 'plus'],
    ['admin-agent', 'Panel agente', 'user'],
    ['admin-agent-qr', '↳ Carteles QR', 'qr'],
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 20, left: 20, zIndex: 60,
      background: 'rgba(11,22,34,.94)', color: '#fff', borderRadius: 14,
      backdropFilter: 'blur(12px)', boxShadow: '0 16px 40px rgba(11,22,34,.3)',
      padding: open ? '8px' : '6px 10px',
      display: 'flex', flexDirection: open ? 'column' : 'row', alignItems: 'stretch', gap: open ? 2 : 8
    }}>
      <div className="row between" style={{ padding: open ? '6px 8px 4px' : 0, gap: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', color: 'var(--yellow)' }}>NAVEGACIÓN DEMO</span>
        <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, display: 'grid', placeItems: 'center' }}>
          {open ? <I.x s={14}/> : <I.chev s={14}/>}
        </button>
      </div>
      {open && screens.map(([id, label, icon]) => {
        const active = (id === 'admin-agent' && route.startsWith('admin-agent')) ||
                       route === id;
        return (
          <button key={id} onClick={() => setRoute(id)} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
            background: active ? 'var(--blue)' : 'transparent',
            border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer',
            fontSize: 12.5, fontWeight: 600, textAlign: 'left', width: 180
          }}>
            <span style={{ color: active ? 'var(--yellow)' : '#9aa4b1' }}>
              {React.createElement(I[icon], { s: 14 })}
            </span>
            {label}
          </button>
        );
      })}
      {open && (
        <div style={{ marginTop: 4, padding: '8px 10px', borderTop: '1px solid rgba(255,255,255,.08)', fontSize: 10.5, color: '#6b7785', lineHeight: 1.4 }}>
          Admin global solo accesible por URL directa (<span className="mono" style={{ color: 'var(--yellow)' }}>#admin-global</span>).
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
