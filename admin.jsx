// Administradores — Global y Propietario/Agente

function AdminLayout({ kind, route, onNav, title, subtitle, actions, children }) {
  const items = kind === 'global' ? [
    { id: 'admin-global', label: 'Dashboard', icon: 'grid' },
    { id: 'admin-global-properties', label: 'Inmuebles', icon: 'house' },
    { id: 'admin-global-queue', label: 'Cola de verificación', icon: 'shield' },
    { id: 'admin-global-users', label: 'Propietarios y agentes', icon: 'user' },
    { id: 'admin-global-plans', label: 'Planes', icon: 'doc' },
  ] : [
    { id: 'admin-agent', label: 'Resumen', icon: 'grid' },
    { id: 'admin-agent-properties', label: 'Mis propiedades', icon: 'house' },
    { id: 'admin-agent-queries', label: 'Consultas', icon: 'chat' },
    { id: 'admin-agent-qr', label: 'Carteles QR', icon: 'qr' },
    { id: 'admin-agent-profile', label: 'Mi perfil', icon: 'user' },
  ];

  return (
    <div className="fade-in" style={{ background: 'var(--bg-2)', minHeight: 'calc(100vh - 76px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        <aside style={{ background: '#fff', borderRight: '1px solid var(--line)', minHeight: 'calc(100vh - 76px)', padding: '24px 16px' }}>
          <div style={{ padding: '0 8px 16px', borderBottom: '1px solid var(--line-2)', marginBottom: 12 }}>
            <div className="tag" style={{ color: kind === 'global' ? 'var(--blue)' : 'var(--yellow-600)' }}>
              Panel {kind === 'global' ? 'global' : 'de gestión'}
            </div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 16, marginTop: 4 }}>
              {kind === 'global' ? 'Administración' : 'Inmobiliaria Centro'}
            </div>
            <div className="muted xs">{kind === 'global' ? 'AlquiloYa · Equipo' : 'admin@centroinmob.py'}</div>
          </div>
          <nav className="col gap-2">
            {items.map(it => (
              <button key={it.id} onClick={() => onNav(it.id)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                background: route === it.id ? 'var(--blue-50)' : 'transparent',
                color: route === it.id ? 'var(--blue)' : 'var(--ink-2)',
                border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left'
              }}>
                {React.createElement(I[it.icon], { s: 16 })}
                {it.label}
              </button>
            ))}
          </nav>
          {kind === 'agent' && (
            <div style={{ marginTop: 24, padding: 14, background: 'var(--yellow-50)', borderRadius: 12, fontSize: 12.5 }}>
              <div style={{ fontWeight: 700, color: '#8a5e00' }}>Plan Premium</div>
              <div style={{ color: '#8a5e00', marginTop: 4 }}>Renueva el 30 de Junio</div>
              <button className="btn btn-blue btn-sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>Ver plan</button>
            </div>
          )}
          {kind === 'global' && (
            <div style={{ marginTop: 24, padding: 14, background: 'var(--blue-50)', borderRadius: 12, fontSize: 12.5 }}>
              <div style={{ fontWeight: 700, color: 'var(--blue)' }}>Modo administrador</div>
              <div style={{ color: 'var(--ink-3)', marginTop: 4 }}>Acceso completo a la plataforma</div>
            </div>
          )}
        </aside>
        <main style={{ padding: '28px 32px' }}>
          <div className="row between" style={{ marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 26 }}>
                {title || (kind === 'global' ? 'Panel de administración' : 'Bienvenida, Carla 👋')}
              </h2>
              <div className="muted" style={{ fontSize: 14 }}>
                {subtitle || (kind === 'global' ? 'Vista general de la operación · Mayo 2026' : 'Aquí gestionás tus inmuebles, consultas y carteles QR.')}
              </div>
            </div>
            <div className="row gap-12">
              {actions || (
                <>
                  <button className="btn btn-outline btn-sm"><I.bell s={14}/> 4 nuevas</button>
                  {kind !== 'global' && <button className="btn btn-primary btn-sm"><I.plus s={14}/> Cargar propiedad</button>}
                </>
              )}
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminGlobalPage({ route, onNav }) {
  return (
    <AdminLayout kind="global" route={route} onNav={onNav}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Inmuebles activos" value="2.480" delta="+ 124 últimos 7 días" trend="up" icon="house" color="var(--blue)"/>
        <StatCard label="Pendientes de revisión" value="48" delta="14 nuevos hoy · requiere acción" trend="warn" icon="shield" color="var(--yellow-600)"/>
        <StatCard label="Usuarios registrados" value="4.218" delta="3.612 propietarios · 606 agentes" trend="up" icon="user" color="var(--green)"/>
        <StatCard label="Ingresos del mes" value="Gs. 38.4M" delta="+ 12% vs mes pasado" trend="up" icon="trend" color="#6e3ad1"/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginTop: 20 }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="row between" style={{ padding: '20px 24px', borderBottom: '1px solid var(--line-2)' }}>
            <div>
              <h3 style={{ fontSize: 18 }}>Cola de verificación</h3>
              <div className="muted xs" style={{ marginTop: 2 }}>Inmuebles esperando aprobación · revisá lo más urgente primero</div>
            </div>
            <div className="row gap-8">
              <span className="badge" style={{ background: 'var(--yellow-50)', color: '#8a5e00' }}>48 pendientes</span>
              <button className="btn btn-outline btn-sm">Ver todos</button>
            </div>
          </div>
          <div className="col" style={{ padding: 14, gap: 8 }}>
            {PROPERTIES.slice(0, 5).map((p, i) => (
              <div key={p.id} className="row gap-12" style={{ padding: 12, borderRadius: 10, background: 'var(--bg-2)' }}>
                <Photo src={p.cover} style={{ width: 64, height: 52, borderRadius: 6, flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="row gap-8" style={{ alignItems: 'center' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</span>
                    {i === 0 && <span className="badge" style={{ background: '#fce4e4', color: '#c33636', fontSize: 10 }}>Urgente</span>}
                  </div>
                  <div className="muted xs" style={{ marginTop: 2 }}>
                    <span className="mono">{p.id}</span> · {p.agent.name} · subido hace {i+1} h
                  </div>
                </div>
                <div className="row gap-6" style={{ flexShrink: 0 }}>
                  <button className="btn btn-outline btn-sm">Revisar</button>
                  <button className="btn btn-blue btn-sm" style={{ padding: '6px 10px' }}><I.check s={12}/></button>
                  <button className="btn btn-outline btn-sm" style={{ padding: '6px 10px', color: 'var(--red)', borderColor: '#f0caca' }}><I.x s={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div>
            <div className="tag">Últimos 30 días</div>
            <h3 style={{ fontSize: 18, marginTop: 4 }}>Publicaciones</h3>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 28, marginTop: 8 }}>
              + 412 <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--green)' }}>↑ 18%</span>
            </div>
          </div>
          <ChartArea/>
          <div style={{ marginTop: 8, paddingTop: 14, borderTop: '1px solid var(--line-2)' }}>
            <div className="row between" style={{ fontSize: 13 }}>
              <span className="muted">Tasa de aprobación</span>
              <span style={{ fontWeight: 700 }}>92%</span>
            </div>
            <div className="row between" style={{ fontSize: 13, marginTop: 6 }}>
              <span className="muted">Tiempo medio de revisión</span>
              <span style={{ fontWeight: 700 }}>4 h 12 min</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value, delta, trend, icon, color }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="row between">
        <div className="muted" style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '14', color, display: 'grid', placeItems: 'center' }}>
          {React.createElement(I[icon], { s: 18 })}
        </div>
      </div>
      <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 30, marginTop: 8, color: 'var(--ink)' }}>{value}</div>
      <div className="row gap-4" style={{ marginTop: 4, fontSize: 12, color: trend === 'warn' ? '#8a5e00' : trend === 'up' ? 'var(--green)' : 'var(--ink-3)' }}>
        {trend === 'up' && <I.trend s={12}/>}
        {trend === 'warn' && <I.bell s={12}/>}
        {delta}
      </div>
    </div>
  );
}

function ChartArea() {
  const points = [10,18,14,22,19,28,26,30,24,34,32,40,38,46,42,50,46,54,58,52,60,64,58,72,68,76,74,82,78,86];
  const max = 90, w = 600, h = 200;
  const step = w / (points.length - 1);
  const toY = v => h - (v / max) * h;
  const path = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${toY(v)}`).join(' ');
  const area = path + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <div style={{ marginTop: 22 }}>
      <svg viewBox={`0 0 ${w} ${h+20}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0058A5" stopOpacity=".25"/>
            <stop offset="100%" stopColor="#0058A5" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0,1,2,3].map(i => <line key={i} x1="0" x2={w} y1={i * h/3} y2={i * h/3} stroke="#eef1f4" strokeWidth="1"/>)}
        <path d={area} fill="url(#g1)"/>
        <path d={path} stroke="#0058A5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {points.map((v, i) => i % 4 === 0 && <circle key={i} cx={i * step} cy={toY(v)} r="3" fill="#fff" stroke="#0058A5" strokeWidth="2"/>)}
      </svg>
      <div className="row between" style={{ marginTop: 8, fontSize: 11, color: 'var(--ink-4)', fontFamily: 'JetBrains Mono' }}>
        {['1 May','7 May','14 May','21 May','28 May'].map(l => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

function Donut({ data }) {
  const total = data.reduce((s, d) => s + d.v, 0);
  const C = 2 * Math.PI * 40;
  let acc = 0;
  return (
    <svg viewBox="0 0 100 100" width="140" height="140">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#eef1f4" strokeWidth="14"/>
      {data.map((d, i) => {
        const len = (d.v / total) * C;
        const c = <circle key={i} cx="50" cy="50" r="40" fill="none" stroke={d.color} strokeWidth="14"
          strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} transform="rotate(-90 50 50)"/>;
        acc += len;
        return c;
      })}
      <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontFamily="Montserrat" fontWeight="800" fontSize="18">2.480</text>
      <text x="50" y="62" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter" fontSize="6" fill="#5b6573">total inmuebles</text>
    </svg>
  );
}

function AdminAgentPage({ route, onNav }) {
  return (
    <AdminLayout kind="agent" route={route} onNav={onNav}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Mis propiedades" value="14" delta="3 destacadas" trend="up" icon="house" color="var(--blue)"/>
        <StatCard label="Visualizaciones (7d)" value="2.184" delta="+ 22% vs semana pasada" trend="up" icon="eye" color="var(--green)"/>
        <StatCard label="Consultas WhatsApp" value="38" delta="12 sin responder" trend="warn" icon="whats" color="var(--yellow-600)"/>
        <StatCard label="Tasa de cierre" value="18%" delta="2 cerrados este mes" trend="up" icon="trend" color="#6e3ad1"/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, marginTop: 20 }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="row between" style={{ padding: '20px 24px', borderBottom: '1px solid var(--line-2)' }}>
            <h3 style={{ fontSize: 18 }}>Mis propiedades</h3>
            <div className="row gap-8">
              <Segment value="all" onChange={() => {}} items={[
                { id: 'all', label: 'Todas' },
                { id: 'active', label: 'Activas' },
                { id: 'paused', label: 'Pausadas' },
              ]}/>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
              <tr style={{ background: 'var(--bg-2)' }}>
                <th style={{ ...th, textAlign: 'left' }}>Propiedad</th>
                <th style={{ ...th, textAlign: 'left' }}>Estado</th>
                <th style={{ ...th, textAlign: 'right' }}>Vistas</th>
                <th style={{ ...th, textAlign: 'right' }}>Consultas</th>
                <th style={{ ...th, textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {PROPERTIES.slice(0, 6).map((p, i) => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--line-2)' }}>
                  <td style={td}>
                    <div className="row gap-10">
                      <Photo src={p.cover} style={{ width: 50, height: 40, borderRadius: 6 }}/>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title.slice(0, 38)}…</div>
                        <div className="mono xs muted">{p.id} · {formatGs(p.price)}</div>
                      </div>
                    </div>
                  </td>
                  <td style={td}>
                    {i === 2 ? <span className="badge" style={{ background: 'var(--bg-3)', color: 'var(--ink-3)', fontSize: 10.5 }}>Pausada</span>
                      : p.featured ? <span className="badge badge-featured" style={{ fontSize: 10.5 }}>Destacada</span>
                      : <span className="badge badge-new" style={{ fontSize: 10.5 }}>Activa</span>}
                  </td>
                  <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{120 + i * 87}</td>
                  <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{2 + i * 3}</td>
                  <td style={{ ...td, textAlign: 'right' }}>
                    <div className="row gap-4" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }}><I.qr s={12}/></button>
                      <button className="btn btn-outline btn-sm" style={{ padding: '6px 10px' }}>Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col gap-20">
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 18 }}>Consultas recientes</h3>
            <div className="col gap-14" style={{ marginTop: 16 }}>
              {[
                ['Pablo R.','Hola, está disponible para visita el sábado?','AY-01241',5],
                ['Sofía G.','Permiten mascotas? Tengo un perro pequeño','AY-01243',22],
                ['Lucía M.','¿El precio incluye expensas?','AY-01242',45],
                ['Damián V.','Quisiera coordinar una visita para mañana','AY-01244',68],
              ].map(([n, m, id, t]) => (
                <div key={n} className="row gap-12">
                  <Avatar name={n} size={36}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="row between"><span style={{ fontWeight: 700, fontSize: 13.5 }}>{n}</span><span className="muted xs">{t}m</span></div>
                    <div style={{ fontSize: 13, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m}</div>
                    <div className="mono xs muted">{id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, var(--blue-50), #fff)' }}>
            <div className="tag">Herramientas</div>
            <h3 style={{ fontSize: 18, marginTop: 6 }}>Cartel "SE ALQUILA" con QR</h3>
            <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Cada propiedad tiene su QR único generado automáticamente. Descargá o imprimí el cartel desde acá.</p>
            <div className="row gap-10" style={{ marginTop: 14 }}>
              <button className="btn btn-blue btn-sm" onClick={() => onNav('admin-agent-qr')}><I.qr s={14}/> Ver mis carteles</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

Object.assign(window, { AdminGlobalPage, AdminAgentPage });
