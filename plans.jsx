// Planes para propietarios y agentes

function PlansPage({ onNav }) {
  const [audience, setAudience] = React.useState('owner');
  const filtered = PLANS.filter(p => p.tier.includes(audience === 'owner' ? 'owner' : 'agent'));
  return (
    <div className="fade-in container" style={{ padding: '48px 32px' }}>
      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <div className="tag" style={{ color: 'var(--blue)' }}>Planes y precios</div>
        <h2 style={{ fontSize: 44, marginTop: 8, lineHeight: 1.1 }}>
          Publicá tu inmueble y llegá a personas que ya están buscando.
        </h2>
        <p style={{ marginTop: 16, fontSize: 17, color: 'var(--ink-3)' }}>
          Empezá gratis. Si necesitás más visibilidad, fotos o estadísticas, cambiá de plan cuando quieras.
        </p>
      </div>
      <div className="row" style={{ justifyContent: 'center', marginTop: 28 }}>
        <Segment value={audience} onChange={setAudience} items={[
          { id: 'owner', label: 'Propietarios' },
          { id: 'agent', label: 'Agentes inmobiliarios' },
        ]}/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, marginTop: 40, maxWidth: 960, margin: '40px auto 0' }}>
        {filtered.map(p => <PlanCard key={p.tier} plan={p}/>)}
      </div>

      <div className="card" style={{ marginTop: 56, padding: '32px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
        <div>
          <div className="tag">Add-on</div>
          <h3 style={{ marginTop: 8, fontSize: 24 }}>Inmueble destacado / verificado</h3>
          <p className="muted" style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.6 }}>
            Pedí la verificación de tu inmueble: nuestro equipo confirma documentación, ubicación real y fotos. Obtené el badge azul, prioridad en resultados y mayor confianza para los interesados.
          </p>
          <div className="row gap-12" style={{ marginTop: 18 }}>
            <button className="btn btn-blue">Solicitar verificación <I.check s={14}/></button>
            <span className="muted xs">Desde Gs. 45.000 por inmueble</span>
          </div>
        </div>
        <div className="row gap-16" style={{ justifyContent: 'flex-end' }}>
          <div className="card" style={{ padding: 18, width: 240, transform: 'rotate(-2deg)' }}>
            <div className="row gap-8">
              <span className="badge badge-verified"><I.check s={11}/> Verificado</span>
            </div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 18, color: 'var(--blue)', marginTop: 10 }}>Gs. 3.800.000</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>+340% más vistas que un inmueble sin verificar</div>
          </div>
          <div className="card" style={{ padding: 18, width: 200, transform: 'rotate(3deg)', background: 'var(--yellow-50)' }}>
            <div className="row gap-8">
              <span className="badge badge-featured"><I.star s={11}/> Destacado</span>
            </div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 16, marginTop: 10 }}>Posición top</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>7 días en home y catálogo</div>
          </div>
        </div>
      </div>

      <CompareTable audience={audience}/>
      <PlansFaq/>
    </div>
  );
}

function PlanCard({ plan }) {
  const highlight = plan.highlighted;
  return (
    <div className="card" style={{
      padding: 28, position: 'relative',
      border: highlight ? '2px solid var(--yellow)' : '1px solid var(--line)',
      background: highlight ? 'linear-gradient(180deg, #fff7e3 0%, #fff 200px)' : '#fff',
      boxShadow: highlight ? '0 20px 40px rgba(249,176,0,.15)' : 'var(--shadow-sm)'
    }}>
      {plan.badge && (
        <div style={{
          position: 'absolute', top: -12, left: 28,
          background: highlight ? 'var(--yellow)' : 'var(--blue)', color: highlight ? 'var(--ink)' : '#fff',
          padding: '4px 12px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, letterSpacing: '.04em'
        }}>{plan.badge.toUpperCase()}</div>
      )}
      <div className="row gap-8">
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.08em', color: 'var(--ink-3)' }}>
          PARA {plan.target.toUpperCase()}
        </span>
      </div>
      <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 26, marginTop: 6 }}>{plan.name}</div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        {plan.price === 0 ? (
          <span style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 44, color: 'var(--blue)' }}>Gs. 0</span>
        ) : (
          <>
            <span style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 44, color: 'var(--blue)' }}>{formatGs(plan.price).replace('Gs. ','Gs. ')}</span>
            <span className="muted" style={{ fontSize: 14 }}>/ mes</span>
          </>
        )}
      </div>
      <button className={"btn " + (highlight ? 'btn-primary' : 'btn-blue')} style={{ width: '100%', justifyContent: 'center', marginTop: 18 }}>
        {plan.cta}
      </button>
      <div className="divider" style={{ margin: '22px 0' }}/>
      <div className="col gap-12">
        {plan.bullets.map(b => (
          <div key={b} className="row gap-10" style={{ alignItems: 'flex-start' }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: highlight ? 'var(--yellow)' : 'var(--blue-50)', color: highlight ? 'var(--ink)' : 'var(--blue)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
              <I.check s={11}/>
            </span>
            <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareTable({ audience }) {
  const rows = [
    ['Propiedades activas', '1', '5 / ilimitado'],
    ['Fotos por inmueble', '5', '25'],
    ['Video / Tour 360°', '—', 'Sí'],
    ['Reporte de visualizaciones', 'Básico', 'Completo'],
    ['Posición destacada', '—', 'Hasta 7 días'],
    ['Creador visual de flyer + QR', '—', 'Sí'],
    ['Integración WhatsApp Business', '—', audience === 'agent' ? 'Sí' : '—'],
    ['Identidad propia con logo', '—', audience === 'agent' ? 'Sí' : '—'],
    ['Soporte', 'Email', 'Email + WhatsApp prioritario'],
  ];
  return (
    <div style={{ marginTop: 56 }}>
      <SectionHead eyebrow="Comparativa" title="Todo lo que incluye cada plan" />
      <div className="card" style={{ marginTop: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'var(--bg-2)', padding: '16px 22px', fontWeight: 700, fontSize: 13, color: 'var(--ink-2)' }}>
          <div>Característica</div>
          <div>Gratis</div>
          <div>Premium</div>
        </div>
        {rows.map(([k, a, b], i) => (
          <div key={k} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 22px', fontSize: 14, borderTop: '1px solid var(--line-2)', background: i % 2 ? 'var(--bg-2)' : '#fff' }}>
            <div style={{ color: 'var(--ink-2)' }}>{k}</div>
            <div className="muted">{a}</div>
            <div style={{ fontWeight: 600 }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlansFaq() {
  return null;
}

Object.assign(window, { PlansPage });
