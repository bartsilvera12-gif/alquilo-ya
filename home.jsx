// Home / Landing principal

function HomePage({ onNav, onProperty }) {
  const featured = PROPERTIES.filter(p => p.featured || p.verified).slice(0, 6);
  return (
    <div className="fade-in">
      <Hero onNav={onNav}/>
      <Categories onNav={onNav}/>
      <Featured properties={featured} onProperty={onProperty} onNav={onNav}/>
      <HowItWorks/>
      <OwnersBlock onNav={onNav}/>
      <Faq/>
    </div>
  );
}

function Hero({ onNav }) {
  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: 56 }}>
      {/* decorative shapes */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,88,165,.08), transparent 60%)' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,176,0,.10), transparent 60%)' }} />
      <div className="container" style={{ position: 'relative', paddingTop: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center' }}>
          <div className="fade-up">
            <h1>
              Encontrá tu <span style={{ color: 'var(--blue)' }}>alquiler</span> <br/>
              más <span style={{ color: 'var(--yellow)', position: 'relative' }}>
                rápido
                <svg width="100%" height="14" viewBox="0 0 200 14" style={{ position: 'absolute', left: 0, bottom: -6 }}>
                  <path d="M2 9 Q 60 2 100 6 T 198 5" stroke="#F9B000" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>.
            </h1>
            <p style={{ marginTop: 20, fontSize: 18, color: 'var(--ink-3)', maxWidth: 520, lineHeight: 1.5 }}>
              Departamentos, casas, salones comerciales y alquileres temporales — organizados, verificados y fáciles de comparar.
            </p>
            <div style={{ marginTop: 32 }}>
              <HeroSearch onSubmit={() => onNav('catalog')} />
            </div>
            <div className="row gap-24" style={{ marginTop: 24, color: 'var(--ink-3)', fontSize: 13.5 }}>
              <div className="row gap-8"><I.check s={14}/> Búsqueda rápida</div>
              <div className="row gap-8"><I.check s={14}/> Contacto directo</div>
              <div className="row gap-8"><I.check s={14}/> Sin intermediarios</div>
            </div>
          </div>
          <HeroCollage onNav={onNav}/>
        </div>
      </div>
    </section>
  );
}

function HeroSearch({ onSubmit }) {
  const [depto, setDepto] = React.useState('Central');
  const [ciudad, setCiudad] = React.useState('Asunción');
  const [barrio, setBarrio] = React.useState('Todos los barrios');
  const [tipo, setTipo] = React.useState('depto');
  return (
    <div style={{ position: 'relative' }}>
      {/* Type tabs — attached to top of the search panel */}
      <div className="row gap-4" style={{ paddingLeft: 4 }}>
        {TIPOS.map(t => {
          const active = tipo === t.id;
          return (
            <button key={t.id} onClick={() => setTipo(t.id)} style={{
              padding: '12px 22px 14px', border: 'none',
              background: active ? '#fff' : 'rgba(255,255,255,.55)',
              color: active ? 'var(--blue)' : 'var(--ink-3)',
              fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
              borderRadius: '14px 14px 0 0',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: active ? '0 -4px 12px rgba(11,22,34,.06)' : 'none',
              position: 'relative', top: active ? 0 : 2,
              transition: 'all .15s',
            }}>
              <span style={{ color: active ? 'var(--blue)' : 'var(--ink-4)' }}>{React.createElement(I[t.icon], { s: 16 })}</span>
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="card" style={{
        padding: 0, borderRadius: 18, borderTopLeftRadius: 0,
        boxShadow: '0 24px 48px rgba(11,22,34,.10), 0 4px 12px rgba(11,22,34,.06)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', alignItems: 'stretch' }}>
          <SearchCell label="Departamento" value={depto} options={DEPARTAMENTOS} onChange={setDepto} icon="pin" divider/>
          <SearchCell label="Ciudad" value={ciudad} options={CIUDADES[depto] || []} onChange={setCiudad} divider/>
          <SearchCell label="Barrio" value={barrio} options={['Todos los barrios', ...BARRIOS]} onChange={setBarrio} divider/>
          <button onClick={onSubmit} style={{
            margin: 8, padding: '0 28px',
            background: 'var(--yellow)', border: 'none', borderRadius: 14,
            color: 'var(--ink)', fontWeight: 800, fontSize: 15,
            display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            transition: 'background .15s, transform .1s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--yellow-600)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--yellow)'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(.97)'}
            onMouseUp={e => e.currentTarget.style.transform = ''}
          >
            <I.search s={18}/>
            Buscar
          </button>
        </div>

        <div className="row between" style={{
          padding: '14px 22px', borderTop: '1px solid var(--line-2)',
          background: 'var(--bg-2)',
        }}>
          <div className="row gap-20" style={{ fontSize: 13, color: 'var(--ink-3)' }}>
            <span className="row gap-6">
              <I.shield s={14}/> Solo inmuebles verificados
              <span className="badge badge-soft" style={{ marginLeft: 4, fontSize: 10.5, padding: '2px 7px' }}>184</span>
            </span>
            <span style={{ width: 1, height: 14, background: 'var(--line)' }}/>
            <span className="row gap-6"><I.bolt s={14}/> Rango: <strong className="mono" style={{ color: 'var(--ink)' }}>Gs. 1.5M – 8M</strong></span>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <I.filter s={13}/> Filtros avanzados
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchCell({ label, value, options, onChange, icon, divider }) {
  return (
    <label style={{
      position: 'relative', padding: '14px 20px',
      borderRight: divider ? '1px solid var(--line-2)' : 'none',
      cursor: 'pointer', display: 'block',
      transition: 'background .15s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
      onMouseLeave={e => e.currentTarget.style.background = ''}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </div>
      <div className="row between" style={{ alignItems: 'center' }}>
        <select value={value} onChange={e => onChange(e.target.value)} style={{
          background: 'transparent', border: 'none', outline: 'none',
          fontSize: 15, fontWeight: 700, color: 'var(--ink)',
          padding: 0, cursor: 'pointer', width: '100%',
          appearance: 'none', WebkitAppearance: 'none',
        }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <I.chev s={14} />
      </div>
    </label>
  );
}

function HeroCollage({ onNav }) {
  const props = PROPERTIES.slice(0, 3);
  return (
    <div style={{ position: 'relative', height: 520 }}>
      {/* big main card */}
      <div className="card fade-up" style={{
        position: 'absolute', top: 0, right: 0, width: 360, padding: 0, overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)', borderRadius: 18, animationDelay: '.05s'
      }}>
        <Photo src={photo(0)} style={{ height: 250, borderRadius: 0 }} />
        <div style={{ padding: 16 }}>
          <div className="row gap-8">
            <span className="badge badge-verified"><I.check s={11}/> Verificado</span>
          </div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 20, color: 'var(--blue)', marginTop: 10 }}>Gs. 3.800.000<span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}> / mes</span></div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>Dúplex moderno en Villa Morra</div>
          <div className="row gap-12 muted" style={{ marginTop: 10, fontSize: 13 }}>
            <span className="row gap-4"><I.bed s={13}/> 2</span>
            <span className="row gap-4"><I.bath s={13}/> 2</span>
            <span className="row gap-4"><I.ruler s={13}/> 85 m²</span>
          </div>
        </div>
      </div>
      {/* floating mini card */}
      <div className="card fade-up" style={{
        position: 'absolute', bottom: 70, left: 0, width: 220, padding: 12,
        boxShadow: 'var(--shadow-lg)', borderRadius: 14, animationDelay: '.15s'
      }}>
        <Photo src={photo(7)} style={{ height: 110, borderRadius: 8 }}/>
        <div className="row gap-8" style={{ marginTop: 8 }}>
          <span className="badge badge-temporal" style={{ fontSize: 10 }}>Temporal</span>
        </div>
        <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 15, color: 'var(--blue)', marginTop: 6 }}>Gs. 420.000<span style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 500 }}> / noche</span></div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Carmelitas · Asunción</div>
      </div>
      {/* search count badge */}
      <div className="card fade-up" style={{
        position: 'absolute', top: 60, left: 30, padding: '14px 18px',
        boxShadow: 'var(--shadow-lg)', borderRadius: 999, animationDelay: '.25s',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--yellow-50)', display: 'grid', placeItems: 'center', color: 'var(--yellow-600)' }}>
          <I.bolt s={18}/>
        </div>
        <div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 18 }}>+2.480</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>inmuebles activos</div>
        </div>
      </div>
      {/* mini map preview */}
      <div className="card fade-up" style={{
        position: 'absolute', bottom: 0, right: 20, width: 260, padding: 0, overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)', borderRadius: 14, animationDelay: '.35s'
      }}>
        <MiniMap height={120}/>
        <div style={{ padding: 12 }}>
          <div className="row gap-8"><I.pin s={14} /> <span style={{ fontWeight: 600, fontSize: 13 }}>12 inmuebles en esta zona</span></div>
        </div>
      </div>
    </div>
  );
}

function MiniMap({ height = 200, pins = 8 }) {
  // Mapa estilizado tipo "modern map tile": tierra cálida, parques orgánicos,
  // un río que cruza, avenidas blancas con jerarquía, bloques sutiles y pines
  // con sombra. Determinista — mismos pines en cada render.
  const pinSeeds = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < pins; i++) {
      arr.push({
        x: 50 + ((i * 73) % 320),
        y: 40 + ((i * 53) % 160),
        active: i === 0 || i === 3,
      });
    }
    return arr;
  }, [pins]);
  return (
    <div style={{ position: 'relative', height, width: '100%', overflow: 'hidden', background: '#F1ECE2' }}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.2"/>
            <feOffset dx="0" dy="1.2" result="off"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.45"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.7"/>
            <feOffset dx="0" dy="0.6" result="off"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Tierra base con leve textura */}
        <rect width="400" height="240" fill="#F1ECE2"/>

        {/* Bloques (manzanas) — sutilmente más oscuros para crear jerarquía */}
        <g fill="#EAE3D2">
          <rect x="0" y="0" width="92" height="58" rx="2"/>
          <rect x="110" y="0" width="78" height="58" rx="2"/>
          <rect x="206" y="0" width="92" height="58" rx="2"/>
          <rect x="316" y="0" width="84" height="58" rx="2"/>

          <rect x="0" y="76" width="92" height="76" rx="2"/>
          <rect x="110" y="76" width="78" height="76" rx="2"/>
          <rect x="316" y="76" width="84" height="76" rx="2"/>

          <rect x="0" y="170" width="92" height="70" rx="2"/>
          <rect x="110" y="170" width="78" height="70" rx="2"/>
          <rect x="206" y="170" width="92" height="70" rx="2"/>
          <rect x="316" y="170" width="84" height="70" rx="2"/>
        </g>

        {/* Parque grande con forma orgánica */}
        <g filter="url(#softShadow)">
          <path d="M210 78 Q 220 70 240 72 T 290 84 Q 300 100 296 120 T 270 150 Q 250 156 230 148 T 210 120 Z" fill="#CDE2B6"/>
          {/* Caminos dentro del parque */}
          <path d="M218 100 Q 250 115 290 110" stroke="#B4CFA0" strokeWidth="1.3" fill="none"/>
          <path d="M240 78 Q 248 110 260 150" stroke="#B4CFA0" strokeWidth="1.3" fill="none"/>
        </g>

        {/* Río / canal cruzando en diagonal */}
        <path d="M -10 192 Q 80 175 160 195 T 410 220" stroke="#C2DDE8" strokeWidth="14" fill="none" strokeLinecap="round"/>
        <path d="M -10 192 Q 80 175 160 195 T 410 220" stroke="#B0CFE0" strokeWidth="0.6" fill="none" strokeLinecap="round" strokeDasharray="2 4" opacity="0.7"/>

        {/* Avenidas principales (más anchas, con borde sutil) */}
        <g>
          {/* Casing (borde) */}
          <path d="M0 64 L400 68" stroke="#D9CFB8" strokeWidth="11"/>
          <path d="M0 158 L400 162" stroke="#D9CFB8" strokeWidth="11"/>
          <path d="M98 0 L94 240" stroke="#D9CFB8" strokeWidth="11"/>
          <path d="M298 0 L302 240" stroke="#D9CFB8" strokeWidth="11"/>
          {/* Fill blanco */}
          <path d="M0 64 L400 68" stroke="#FFFFFF" strokeWidth="9"/>
          <path d="M0 158 L400 162" stroke="#FFFFFF" strokeWidth="9"/>
          <path d="M98 0 L94 240" stroke="#FFFFFF" strokeWidth="9"/>
          <path d="M298 0 L302 240" stroke="#FFFFFF" strokeWidth="9"/>
        </g>

        {/* Calles secundarias */}
        <g stroke="#FFFFFF" strokeWidth="4">
          <path d="M196 0 L196 240"/>
          <path d="M0 110 L400 110"/>
        </g>
        {/* Calles terciarias / pasajes */}
        <g stroke="#FFFFFF" strokeWidth="2" opacity="0.8">
          <path d="M48 0 L48 240"/>
          <path d="M150 0 L150 240"/>
          <path d="M250 0 L250 240"/>
          <path d="M352 0 L352 240"/>
          <path d="M0 32 L400 32"/>
          <path d="M0 200 L400 200"/>
        </g>

        {/* Edificios destacados — puntos para dar textura */}
        <g fill="#DCD2BC" opacity="0.55">
          <rect x="14" y="84" width="10" height="14"/>
          <rect x="30" y="84" width="10" height="20"/>
          <rect x="46" y="84" width="14" height="10"/>
          <rect x="120" y="180" width="12" height="16"/>
          <rect x="140" y="180" width="14" height="12"/>
          <rect x="330" y="178" width="12" height="20"/>
          <rect x="350" y="178" width="16" height="14"/>
        </g>

        {/* Pines de inmuebles */}
        {pinSeeds.map((p, i) => (
          <g key={i} transform={`translate(${p.x}, ${p.y})`} filter="url(#pinShadow)">
            {/* "drop pin" pequeño */}
            <path d={`M0 0
              a 9 9 0 1 1 0.01 0
              M 0 9
              Q -2.5 16 0 22
              Q 2.5 16 0 9`}
              fill={p.active ? '#F9B000' : '#0058A5'}/>
            <circle cx="0" cy="-1" r="6" fill="#FFFFFF"/>
            <text textAnchor="middle" y="1.5" fontSize="6.5" fontWeight="800" fontFamily="Montserrat, sans-serif"
              fill={p.active ? '#A57000' : '#0058A5'}>
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Categories({ onNav }) {
  const cats = [
    { id: 'depto', label: 'Departamentos', count: '1.240', icon: 'apt', color: '#eaf2fb', tint: '#0058A5' },
    { id: 'casa', label: 'Casas independientes', count: '820', icon: 'house', color: '#fff7e3', tint: '#a36100' },
    { id: 'salon', label: 'Salones comerciales', count: '186', icon: 'shop', color: '#ece4f7', tint: '#6e3ad1' },
    { id: 'temporal', label: 'Alquileres temporales', count: '312', icon: 'beach', color: '#dff2e7', tint: '#1f8a5b' },
  ];
  return (
    <section className="container" style={{ marginTop: 24, padding: '40px 32px' }}>
      <SectionHead eyebrow="Categorías" title="Explorá por tipo de inmueble" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 28 }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => onNav('catalog')} className="card"
            style={{ textAlign: 'left', padding: 22, cursor: 'pointer', border: '1px solid var(--line)', transition: 'transform .15s, box-shadow .15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: c.color, color: c.tint, display: 'grid', placeItems: 'center' }}>
              {React.createElement(I[c.icon], { s: 26 })}
            </div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 17, marginTop: 18 }}>{c.label}</div>
            <div className="row between" style={{ marginTop: 6 }}>
              <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{c.count} inmuebles</span>
              <I.arrow s={16}/>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, action, actionLabel }) {
  return (
    <div className="row between" style={{ alignItems: 'flex-end' }}>
      <div>
        {eyebrow && <div className="tag">{eyebrow}</div>}
        <h2 style={{ marginTop: 6 }}>{title}</h2>
      </div>
      {action && (
        <button onClick={action} className="btn btn-outline">{actionLabel} <I.arrow s={15}/></button>
      )}
    </div>
  );
}

function Featured({ properties, onProperty, onNav }) {
  return (
    <section className="container" style={{ padding: '40px 32px' }}>
      <SectionHead eyebrow="Propiedades destacadas" title="Inmuebles verificados, listos para visitar" action={() => onNav('catalog')} actionLabel="Ver todos los alquileres" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 28 }}>
        {properties.map((p, i) => (
          <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <PropertyCard p={p} onClick={() => onProperty(p)} />
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Buscá por zona', desc: 'Filtrá por departamento, ciudad, barrio y tipo de inmueble. Encontrás en segundos.', icon: 'search', color: 'var(--blue-50)', tint: 'var(--blue)' },
    { n: '02', title: 'Compará inmuebles', desc: 'Cards organizadas con fotos, precio, características y badges de confianza.', icon: 'grid', color: 'var(--yellow-50)', tint: 'var(--yellow-600)' },
    { n: '03', title: 'Contactá o reservá', desc: 'Hablá directamente con el propietario o agente por WhatsApp. Sin vueltas.', icon: 'whats', color: '#dff2e7', tint: 'var(--green)' },
  ];
  return (
    <section style={{ background: '#fff', padding: '64px 0', marginTop: 32 }}>
      <div className="container">
        <SectionHead eyebrow="Cómo funciona" title="En 3 pasos, ya estás visitando tu próximo alquiler" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 32 }}>
          {steps.map((s, i) => (
            <div key={s.n} className="card" style={{ padding: 28, position: 'relative' }}>
              <div style={{ fontFamily: 'Montserrat', fontStyle: 'italic', fontWeight: 900, fontSize: 64, color: 'var(--bg-3)', lineHeight: 1, position: 'absolute', top: 16, right: 24 }}>{s.n}</div>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: s.color, color: s.tint, display: 'grid', placeItems: 'center' }}>
                {React.createElement(I[s.icon], { s: 28 })}
              </div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 20, marginTop: 20 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 8, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OwnersBlock({ onNav }) {
  return (
    <section className="container" style={{ padding: '64px 32px' }}>
      <div style={{
        background: 'linear-gradient(120deg, var(--blue) 0%, #003e74 100%)',
        borderRadius: 24, padding: '56px 64px', color: '#fff', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: -80, top: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(249,176,0,.18)' }}/>
        <div style={{ position: 'absolute', right: 60, bottom: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }}/>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'center', position: 'relative' }}>
          <div>
            <div className="tag" style={{ color: 'var(--yellow)' }}>Propietarios & agentes</div>
            <h2 style={{ color: '#fff', marginTop: 10, maxWidth: 540 }}>Publicá tu inmueble y llegá a personas que ya están buscando.</h2>
            <p style={{ color: '#cfe0f4', marginTop: 16, maxWidth: 520, fontSize: 16 }}>
              Cargá tu propiedad en minutos, recibí consultas por WhatsApp y aparecé entre los destacados. Sin comisiones por cierre.
            </p>
            <div className="row gap-12" style={{ marginTop: 28 }}>
              <button className="btn btn-primary btn-lg" onClick={() => onNav('plans')}>Conocer planes <I.arrow s={16}/></button>
              <button className="btn btn-ghost btn-lg" onClick={() => onNav('publish')} style={{ color: '#fff', border: '1px solid rgba(255,255,255,.3)' }}>Publicar gratis</button>
            </div>
            <div className="row gap-32" style={{ marginTop: 32 }}>
              {[
                ['+15.000','propietarios activos'],
                ['+2.400','consultas por día'],
                ['72 hs','tiempo medio para alquilar'],
              ].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 28, color: 'var(--yellow)' }}>{k}</div>
                  <div style={{ fontSize: 13, color: '#cfe0f4' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="card" style={{ padding: 18, color: 'var(--ink)', boxShadow: 'var(--shadow-lg)' }}>
              <div className="row gap-12">
                <Avatar name="Mariana López" size={42} color="#0058A5"/>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Mariana López</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Propietaria · Asunción</div>
                </div>
                <span className="badge badge-verified" style={{ marginLeft: 'auto' }}><I.check s={10}/> Verificada</span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 14, fontStyle: 'italic', lineHeight: 1.5 }}>
                "Publiqué mi departamento un martes y el viernes ya tenía visitas confirmadas. Lo recomiendo 100%."
              </div>
              <div className="row gap-4" style={{ marginTop: 12, color: 'var(--yellow)' }}>
                {[1,2,3,4,5].map(i => <I.star key={i} s={14}/>)}
              </div>
            </div>
            <div style={{ position: 'absolute', right: -16, bottom: -16, background: 'var(--yellow)', color: 'var(--ink)', padding: '10px 16px', borderRadius: 12, fontFamily: 'Montserrat', fontWeight: 800, fontSize: 13, boxShadow: 'var(--shadow)' }}>
              <I.bolt s={14}/> Alquilado en 4 días
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QRBlock({ onNav }) {
  return (
    <section className="container" style={{ padding: '64px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div className="tag">Cartel dinámico</div>
          <h2 style={{ marginTop: 10 }}>Un QR, toda la información del inmueble.</h2>
          <p style={{ marginTop: 16, fontSize: 16, color: 'var(--ink-3)', maxWidth: 520 }}>
            Cada propiedad publicada en AlquiloYa tiene un código QR único. Imprimí tu cartel "SE ALQUILA" y los interesados acceden al instante a fotos, precio y contacto.
          </p>
          <div className="col gap-12" style={{ marginTop: 24 }}>
            {[
              ['Un QR único por inmueble', 'Se genera automáticamente al publicar la propiedad. Sin pasos extra.'],
              ['Descargá listo para imprimir', 'PDF A4 con colores oficiales, logo, ID y diseño de cartel.'],
              ['Mediciones en tiempo real', 'Sabé cuántas personas escanearon el cartel de cada inmueble.'],
            ].map(([t,d]) => (
              <div key={t} className="row gap-12" style={{ alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                  <I.check s={14}/>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink-3)' }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-blue btn-lg" style={{ marginTop: 28 }} onClick={() => onNav('publish')}>
            Publicá tu inmueble <I.arrow s={16}/>
          </button>
        </div>
        <div style={{ position: 'relative', display: 'grid', placeItems: 'center', minHeight: 540 }}>
          {/* poster mock */}
          <QRPosterMock id="AY-Q2058" address="Villa Morra, Asunción"/>
        </div>
      </div>
    </section>
  );
}

function QRPosterMock({ id, address }) {
  return (
    <div style={{
      width: 320, background: '#fff', borderRadius: 16, padding: 0, overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,88,165,.25), 0 0 0 1px rgba(11,22,34,.06)',
      transform: 'rotate(-3deg)'
    }}>
      <div style={{ background: 'var(--blue)', color: '#fff', padding: '20px 22px' }}>
        <Logo size={22} dark/>
      </div>
      <div style={{ background: 'var(--yellow)', padding: '18px 22px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontStyle: 'italic', fontSize: 36, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1 }}>
          SE ALQUILA
        </div>
      </div>
      <div style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ padding: 10, border: '2px solid var(--ink)', borderRadius: 8, display: 'inline-block' }}>
          <QRMock size={160} id={id} />
        </div>
        <div style={{ marginTop: 14, fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--ink-3)' }}>{id}</div>
        <div style={{ marginTop: 6, fontSize: 14, fontWeight: 600, color: 'var(--ink-2)' }}>{address}</div>
        <div style={{ marginTop: 12, padding: 10, background: 'var(--bg-2)', borderRadius: 8, fontSize: 12, color: 'var(--ink-3)' }}>
          Escaneá y mirá fotos, precio y detalles.
        </div>
      </div>
      <div style={{ background: 'var(--blue)', color: '#fff', padding: '10px 22px', fontSize: 11, fontFamily: 'Montserrat', fontWeight: 700, fontStyle: 'italic', textAlign: 'center', letterSpacing: '.04em' }}>
        ALQUILOYA.COM.PY · ¡DONDE ENCONTRÁS MÁS RÁPIDO!
      </div>
    </div>
  );
}

function _AdsBlock_REMOVED() {
  return (
    <section className="container" style={{ padding: '40px 32px' }}>
      <SectionHead eyebrow="Espacios publicitarios" title="Empresas afines que acompañan tu mudanza" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 28 }}>
        {ADS.map(a => <AdBanner key={a.brand} ad={a} variant="card"/>)}
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    ['¿Es gratis publicar mi inmueble?', 'Sí. Tenés un plan gratuito que te permite publicar 1 propiedad por 30 días, con hasta 5 fotos y contacto directo por WhatsApp.'],
    ['¿Cómo se verifica una propiedad?', 'Nuestro equipo revisa documentación de propietario, ubicación real y fotos. Las verificadas obtienen el badge azul y mayor visibilidad.'],
    ['¿Puedo pagar el alquiler desde la plataforma?', 'Próximamente. Por ahora, el contacto y la coordinación se hacen directamente entre las partes. La reserva visual está disponible para temporales.'],
    ['¿Qué pasa con los carteles QR?', 'Al cargar tu inmueble se genera automáticamente un QR único. Desde la sección "Carteles QR" descargás el cartel listo para imprimir, y cuando alguien lo escanea accede a la ficha completa con fotos, precio y contacto.'],
    ['¿Hay comisión por cerrar un alquiler?', 'No. AlquiloYa cobra solo por los planes premium. No tomamos comisión por contratos.'],
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="container" style={{ padding: '40px 32px' }}>
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <div className="tag">Preguntas frecuentes</div>
        <h2 style={{ marginTop: 6 }}>Lo que más nos preguntan</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginTop: 32, maxWidth: 880, marginLeft: 'auto', marginRight: 'auto' }}>
        {faqs.map(([q,a], i) => (
          <div key={q} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{
              width: '100%', background: 'none', border: 'none', padding: '20px 22px', textAlign: 'left', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16
            }}>
              <span style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 16 }}>{q}</span>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: open === i ? 'var(--blue)' : 'var(--bg-2)', color: open === i ? '#fff' : 'var(--ink-3)', display: 'grid', placeItems: 'center', transition: 'all .2s' }}>
                {open === i ? <I.x s={14}/> : <I.plus s={14}/>}
              </div>
            </button>
            {open === i && <div style={{ padding: '0 22px 22px', color: 'var(--ink-3)', fontSize: 14.5, lineHeight: 1.6 }}>{a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { HomePage, QRPosterMock, MiniMap, SectionHead });
