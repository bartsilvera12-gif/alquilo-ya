// Shared layout components: Header, Footer, PropertyCard, AdBanner, QRMock, etc.

function Header({ route, onNav, onPublish }) {
  const items = [
    { id: 'catalog', label: 'Alquileres' },
    { id: 'publish', label: 'Publicar propiedad' },
    { id: 'plans', label: 'Planes' },
    { id: 'help', label: 'Ayuda' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: '#fff', borderBottom: '1px solid var(--line)',
      boxShadow: '0 1px 0 rgba(11,22,34,.03)'
    }}>
      <div className="container row between" style={{ height: 76 }}>
        <div className="row gap-32">
          <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <Logo size={32} />
          </button>
          <nav className="row gap-24" style={{ marginLeft: 8 }}>
            {items.map(it => (
              <button key={it.id} onClick={() => onNav(it.id)} style={{
                background: 'none', border: 'none', padding: '8px 4px',
                fontSize: 14.5, fontWeight: 600,
                color: route === it.id ? 'var(--blue)' : 'var(--ink-2)',
                borderBottom: route === it.id ? '2px solid var(--blue)' : '2px solid transparent',
                cursor: 'pointer'
              }}>{it.label}</button>
            ))}
          </nav>
        </div>
        <div className="row gap-12">
          <button className="btn btn-ghost" onClick={() => onNav('admin-agent')}>
            <I.user s={16}/> Ingresar
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onNav }) {
  return (
    <footer style={{ background: '#0b1622', color: '#cfd6df', marginTop: 64 }}>
      <div className="container" style={{ padding: '56px 32px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: 40 }}>
          <div>
            <Logo size={26} dark />
            <p style={{ marginTop: 16, color: '#9aa4b1', fontSize: 14, fontStyle: 'italic', fontWeight: 600 }}>
              ¡Donde encontrás más rápido!
            </p>
            <p style={{ marginTop: 12, color: '#7a8593', fontSize: 13 }}>
              El marketplace inmobiliario más rápido para alquileres en Paraguay.
            </p>
          </div>
          <FootCol title="Buscar" items={['Departamentos','Casas','Salones comerciales','Temporales']} onClick={() => onNav('catalog')} />
          <FootCol title="Para propietarios" items={['Publicar inmueble','Planes y precios','Carteles QR','Centro de ayuda']} />
          <FootCol title="Empresa" items={['Sobre AlquiloYa','Términos','Política de privacidad','Trabajá con nosotros']} />
          <FootCol title="Contacto" items={['hola@alquiloya.com.py','+595 21 555 0100','Asunción, Paraguay','Lun a Sáb 8–20 hs']} />
        </div>
        <div style={{ borderTop: '1px solid #1b2a3a', marginTop: 40, paddingTop: 20 }} className="row between">
          <div style={{ fontSize: 12.5, color: '#6b7785' }}>© 2026 AlquiloYa · Todos los derechos reservados</div>
          <div className="row gap-16" style={{ fontSize: 12.5, color: '#6b7785' }}>
            <span>Instagram</span><span>Facebook</span><span>WhatsApp</span><span>TikTok</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
function FootCol({ title, items, onClick }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 14, letterSpacing: '.02em' }}>{title}</div>
      <div className="col gap-8">
        {items.map(it => <a key={it} onClick={onClick} style={{ color: '#9aa4b1', fontSize: 13.5, cursor: 'pointer' }}>{it}</a>)}
      </div>
    </div>
  );
}

function Photo({ src, alt, label, style, children, className = '' }) {
  return (
    <div className={`photo ${className}`} style={{ borderRadius: 12, ...style }}>
      {src && <img src={src} alt={alt || ''} loading="lazy" />}
      {label && <div className="photo-label">{label}</div>}
      {children}
    </div>
  );
}

function PropertyCard({ p, onClick, compact = false }) {
  return (
    <div className="card" style={{
      overflow: 'hidden', cursor: 'pointer',
      transition: 'transform .2s ease, box-shadow .2s ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
      onClick={onClick}
    >
      <div style={{ position: 'relative' }}>
        <Photo src={p.cover} style={{ height: compact ? 170 : 200, borderRadius: 0 }} />
        <div className="row gap-8" style={{ position: 'absolute', top: 12, left: 12 }}>
          {p.verified && <span className="badge badge-verified"><I.check s={11}/> Verificado</span>}
          {p.featured && <span className="badge badge-featured"><I.star s={11}/> Destacado</span>}
          {p.isNew && !p.featured && <span className="badge badge-new">Nuevo</span>}
          {p.tipo === 'temporal' && <span className="badge badge-temporal">Temporal</span>}
        </div>
        <button style={{
          position: 'absolute', top: 12, right: 12, width: 34, height: 34,
          borderRadius: '50%', background: 'rgba(255,255,255,.95)', border: 'none',
          display: 'grid', placeItems: 'center', cursor: 'pointer'
        }} onClick={e => e.stopPropagation()}>
          <I.heart s={16}/>
        </button>
        <div className="mono xs"
          style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(11,22,34,.7)', color: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'JetBrains Mono, monospace', backdropFilter: 'blur(6px)' }}>
          {p.id}
        </div>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <div className="row between" style={{ alignItems: 'flex-start' }}>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 19, color: 'var(--blue)' }}>
            {formatGs(p.price)}
            <span style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 500, marginLeft: 4 }}>
              {p.tipo === 'temporal' ? '/ noche' : '/ mes'}
            </span>
          </div>
        </div>
        <div style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--ink)', marginTop: 4, lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {p.title}
        </div>
        <div className="row gap-4 muted" style={{ marginTop: 6, fontSize: 13 }}>
          <I.pin s={13}/> <span>{p.address}</span>
        </div>
        <div className="row gap-16" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--line-2)', color: 'var(--ink-3)', fontSize: 13 }}>
          {p.beds > 0 && <span className="row gap-4"><I.bed s={14}/> {p.beds} dorm</span>}
          <span className="row gap-4"><I.bath s={14}/> {p.baths} baño{p.baths>1?'s':''}</span>
          <span className="row gap-4"><I.ruler s={14}/> {p.m2} m²</span>
          {p.cochera && <span className="row gap-4"><I.car s={14}/> Cochera</span>}
        </div>
      </div>
    </div>
  );
}

function AdBanner({ ad, variant = 'horizontal' }) {
  if (!ad) return null;
  if (variant === 'horizontal') {
    return (
      <div style={{
        background: ad.color, borderRadius: 16, padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: `1px dashed ${ad.tint}33`,
      }}>
        <div className="row gap-16">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: ad.tint }}>PUBLICIDAD · {ad.tag.toUpperCase()}</div>
        </div>
        <div className="row gap-24" style={{ flex: 1, marginLeft: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 18, color: 'var(--ink)' }}>{ad.brand}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{ad.desc}</div>
          </div>
          <button className="btn btn-outline btn-sm">Conocer más <I.arrow s={14}/></button>
        </div>
      </div>
    );
  }
  // sidebar / card
  return (
    <div style={{
      background: ad.color, borderRadius: 14, padding: 18,
      border: `1px dashed ${ad.tint}33`,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.1em', color: ad.tint, marginBottom: 12 }}>PUBLICIDAD</div>
      <div style={{
        height: 120, borderRadius: 10, background: `linear-gradient(135deg, ${ad.tint}22, ${ad.tint}11)`,
        display: 'grid', placeItems: 'center', fontFamily: 'JetBrains Mono', fontSize: 11, color: ad.tint
      }}>{ad.tag}.jpg</div>
      <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 16, marginTop: 12 }}>{ad.brand}</div>
      <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>{ad.desc}</div>
      <button className="btn btn-outline btn-sm" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>Conocer más</button>
    </div>
  );
}

// QR mock — fake QR using checker pattern
function QRMock({ size = 140, id = 'AY-00000', dark = '#0b1622' }) {
  // deterministic 21x21 grid
  const N = 21;
  const cells = [];
  let seed = 0;
  for (let i = 0; i < id.length; i++) seed = (seed * 31 + id.charCodeAt(i)) >>> 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      const isFinder = (x < 7 && y < 7) || (x > N-8 && y < 7) || (x < 7 && y > N-8);
      const isFinderBorder = isFinder && ((x === 0 || x === 6 || y === 0 || y === 6) || (x < 7 && y < 7 && x>=2 && x<=4 && y>=2 && y<=4) || (x > N-8 && (x === N-7 || x === N-1) ) );
      const finderFill = isFinder && (
        (x>=0 && x<=6 && y>=0 && y<=6 && (x===0||x===6||y===0||y===6||(x>=2&&x<=4&&y>=2&&y<=4))) ||
        (x>=N-7 && y>=0 && y<=6 && (x===N-7||x===N-1||y===0||y===6||(x>=N-5&&x<=N-3&&y>=2&&y<=4))) ||
        (x>=0 && x<=6 && y>=N-7 && (x===0||x===6||y===N-7||y===N-1||(x>=2&&x<=4&&y>=N-5&&y<=N-3)))
      );
      const fill = isFinder ? finderFill : ((seed >>> 16) % 100) < 48;
      if (fill) cells.push(<rect key={x+','+y} x={x} y={y} width="1" height="1" fill={dark}/>);
    }
  }
  return (
    <svg viewBox={`0 0 ${N} ${N}`} width={size} height={size} style={{ background: '#fff', borderRadius: 6, display: 'block' }}>
      <rect width={N} height={N} fill="#fff"/>
      {cells}
    </svg>
  );
}

function Avatar({ name, size = 40, color }) {
  const initial = (name || '?').split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
  const colors = ['#0058A5','#1f8a5b','#c33636','#6e3ad1','#a36100','#0e7a8a'];
  const c = color || colors[(name?.length || 0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: c, color: '#fff',
      display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: size * 0.4,
      flexShrink: 0
    }}>{initial}</div>
  );
}

// Tabbed segment control
function Segment({ items, value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', background: 'var(--bg-3)', borderRadius: 999, padding: 4 }}>
      {items.map(it => (
        <button key={it.id} onClick={() => onChange(it.id)} style={{
          padding: '8px 16px', borderRadius: 999, border: 'none',
          background: value === it.id ? '#fff' : 'transparent',
          color: value === it.id ? 'var(--ink)' : 'var(--ink-3)',
          fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
          boxShadow: value === it.id ? 'var(--shadow-sm)' : 'none',
        }}>{it.label}</button>
      ))}
    </div>
  );
}

Object.assign(window, { Header, Footer, Photo, PropertyCard, AdBanner, QRMock, Avatar, Segment });
