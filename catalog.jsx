// Catálogo / Resultados de búsqueda

function CatalogPage({ onProperty }) {
  const [tipo, setTipo] = React.useState('all');
  const [sort, setSort] = React.useState('recent');
  const [view, setView] = React.useState('grid');
  const [filters, setFilters] = React.useState({
    depto: 'Central', ciudad: 'Asunción', barrio: 'Todos',
    min: 1500000, max: 8000000,
    beds: 0, baths: 0,
    amoblado: false, mascotas: false, verified: false, temporal: false,
  });
  const filtered = PROPERTIES.filter(p =>
    (tipo === 'all' || p.tipo === tipo) &&
    p.price >= filters.min && p.price <= filters.max &&
    (filters.beds === 0 || p.beds >= filters.beds) &&
    (filters.baths === 0 || p.baths >= filters.baths) &&
    (!filters.amoblado || p.amoblado) &&
    (!filters.mascotas || p.mascotas) &&
    (!filters.verified || p.verified) &&
    (!filters.temporal || p.tipo === 'temporal')
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price;
    if (sort === 'priceDesc') return b.price - a.price;
    if (sort === 'featured') return (b.featured?1:0) - (a.featured?1:0);
    return 0;
  });
  return (
    <div className="fade-in">
      <CatalogHeader count={sorted.length} tipo={tipo} setTipo={setTipo} />
      <div className="container" style={{ padding: '24px 32px 32px', display: 'grid', gridTemplateColumns: '290px 1fr', gap: 28 }}>
        <FilterPanel filters={filters} setFilters={setFilters} />
        <div>
          <div className="row between" style={{ marginBottom: 16 }}>
            <div className="row gap-12">
              <span style={{ fontSize: 14, color: 'var(--ink-3)' }}>Ordenar por:</span>
              <select className="select" value={sort} onChange={e => setSort(e.target.value)} style={{ width: 'auto', padding: '8px 12px' }}>
                <option value="recent">Más recientes</option>
                <option value="priceAsc">Menor precio</option>
                <option value="priceDesc">Mayor precio</option>
                <option value="featured">Destacados</option>
              </select>
            </div>
            <div className="row gap-8">
              <button className={"btn btn-sm " + (view === 'grid' ? 'btn-blue' : 'btn-outline')} onClick={() => setView('grid')}><I.grid s={14}/> Grilla</button>
              <button className={"btn btn-sm " + (view === 'map' ? 'btn-blue' : 'btn-outline')} onClick={() => setView('map')}><I.map s={14}/> Mapa</button>
            </div>
          </div>
          {view === 'grid' ? (
            <CatalogGrid properties={sorted} onProperty={onProperty}/>
          ) : (
            <CatalogMap properties={sorted} onProperty={onProperty}/>
          )}
        </div>
      </div>
    </div>
  );
}

function CatalogHeader({ count, tipo, setTipo }) {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ padding: '28px 32px 0' }}>
        <div className="row between">
          <div>
            <div className="row gap-8 muted" style={{ fontSize: 13 }}>
              <span>Inicio</span>
              <I.chev s={12}/>
              <span>Alquileres</span>
              <I.chev s={12}/>
              <span style={{ color: 'var(--ink)' }}>Asunción · Central</span>
            </div>
            <h2 style={{ marginTop: 8, fontSize: 28 }}><span style={{ color: 'var(--blue)' }}>{count}</span> alquileres encontrados</h2>
            <div style={{ color: 'var(--ink-3)', fontSize: 14, marginTop: 4 }}>Mostrando inmuebles activos · actualizado hace 3 minutos</div>
          </div>
          <div className="card" style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <I.search s={16}/>
            <input className="input" placeholder="Buscar por título, ID o ubicación..." style={{ border: 'none', padding: 8, width: 340 }} />
          </div>
        </div>
        <div className="row gap-8" style={{ marginTop: 20 }}>
          <CatTab label="Todos" active={tipo === 'all'} onClick={() => setTipo('all')} />
          {TIPOS.map(t => (
            <CatTab key={t.id} icon={t.icon} label={t.label} active={tipo === t.id} onClick={() => setTipo(t.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CatTab({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '12px 18px', border: 'none', background: 'transparent',
      borderBottom: active ? '3px solid var(--blue)' : '3px solid transparent',
      color: active ? 'var(--blue)' : 'var(--ink-3)',
      fontWeight: 600, fontSize: 14, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 8,
      marginBottom: -1
    }}>
      {icon && React.createElement(I[icon], { s: 16 })}
      {label}
    </button>
  );
}

function FilterPanel({ filters, setFilters }) {
  const upd = (k, v) => setFilters(prev => ({ ...prev, [k]: v }));
  return (
    <aside style={{ position: 'sticky', top: 92, alignSelf: 'flex-start' }}>
      <div className="card" style={{ padding: 22 }}>
        <div className="row between" style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 17 }}>Filtros</div>
          <button onClick={() => setFilters({ depto: 'Central', ciudad: 'Asunción', barrio: 'Todos', min: 1500000, max: 8000000, beds: 0, baths: 0, amoblado: false, mascotas: false, verified: false, temporal: false })} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Limpiar</button>
        </div>
        <FilterGroup title="Ubicación">
          <div className="field" style={{ marginBottom: 10 }}>
            <select className="select" value={filters.depto} onChange={e => upd('depto', e.target.value)}>
              {DEPARTAMENTOS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="field" style={{ marginBottom: 10 }}>
            <select className="select" value={filters.ciudad} onChange={e => upd('ciudad', e.target.value)}>
              {(CIUDADES[filters.depto] || []).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <select className="select" value={filters.barrio} onChange={e => upd('barrio', e.target.value)}>
            <option>Todos los barrios</option>
            {BARRIOS.map(b => <option key={b}>{b}</option>)}
          </select>
        </FilterGroup>

        <FilterGroup title="Precio (Gs.)">
          <div className="row gap-8" style={{ marginBottom: 12 }}>
            <input className="input" type="number" value={filters.min} onChange={e => upd('min', +e.target.value)} style={{ padding: '8px 10px', fontSize: 13 }}/>
            <span style={{ color: 'var(--ink-4)' }}>—</span>
            <input className="input" type="number" value={filters.max} onChange={e => upd('max', +e.target.value)} style={{ padding: '8px 10px', fontSize: 13 }}/>
          </div>
          <RangeBar min={filters.min} max={filters.max} />
          <div className="row between" style={{ fontSize: 11.5, color: 'var(--ink-4)', marginTop: 6, fontFamily: 'JetBrains Mono' }}>
            <span>Gs. 0</span><span>Gs. 12.000.000</span>
          </div>
        </FilterGroup>

        <FilterGroup title="Habitaciones">
          <PillRow values={[0,1,2,3,4]} value={filters.beds} onChange={v => upd('beds', v)} labelFn={v => v === 0 ? 'Todas' : v + '+'} />
        </FilterGroup>

        <FilterGroup title="Baños">
          <PillRow values={[0,1,2,3]} value={filters.baths} onChange={v => upd('baths', v)} labelFn={v => v === 0 ? 'Todos' : v + '+'} />
        </FilterGroup>

        <FilterGroup title="Características">
          <div className="col gap-10">
            <Check label="Amoblado" icon="sofa" checked={filters.amoblado} onChange={v => upd('amoblado', v)}/>
            <Check label="Mascotas permitidas" icon="paw" checked={filters.mascotas} onChange={v => upd('mascotas', v)}/>
            <Check label="Verificado" icon="check" checked={filters.verified} onChange={v => upd('verified', v)}/>
            <Check label="Temporal disponible" icon="cal" checked={filters.temporal} onChange={v => upd('temporal', v)}/>
          </div>
        </FilterGroup>

        <button className="btn btn-blue" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>Aplicar filtros</button>
      </div>
    </aside>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div style={{ paddingBottom: 18, marginBottom: 18, borderBottom: '1px solid var(--line-2)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 10, letterSpacing: '.02em' }}>{title}</div>
      {children}
    </div>
  );
}
function RangeBar({ min, max }) {
  const total = 12000000;
  const left = (min / total) * 100;
  const right = ((total - max) / total) * 100;
  return (
    <div style={{ position: 'relative', height: 6, background: 'var(--bg-3)', borderRadius: 3 }}>
      <div style={{ position: 'absolute', left: left + '%', right: right + '%', top: 0, bottom: 0, background: 'var(--blue)', borderRadius: 3 }}/>
      <div style={{ position: 'absolute', left: 'calc(' + left + '% - 7px)', top: -5, width: 16, height: 16, background: '#fff', borderRadius: '50%', border: '3px solid var(--blue)', boxShadow: 'var(--shadow-sm)' }}/>
      <div style={{ position: 'absolute', left: 'calc(' + (100-right) + '% - 7px)', top: -5, width: 16, height: 16, background: '#fff', borderRadius: '50%', border: '3px solid var(--blue)', boxShadow: 'var(--shadow-sm)' }}/>
    </div>
  );
}
function PillRow({ values, value, onChange, labelFn }) {
  return (
    <div className="row gap-6" style={{ flexWrap: 'wrap' }}>
      {values.map(v => (
        <button key={v} onClick={() => onChange(v)} style={{
          padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600,
          border: '1px solid ' + (value === v ? 'var(--blue)' : 'var(--line)'),
          background: value === v ? 'var(--blue)' : '#fff', color: value === v ? '#fff' : 'var(--ink-2)', cursor: 'pointer'
        }}>{labelFn(v)}</button>
      ))}
    </div>
  );
}
function Check({ label, icon, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <span style={{
        width: 18, height: 18, borderRadius: 5,
        border: '2px solid ' + (checked ? 'var(--blue)' : 'var(--line)'),
        background: checked ? 'var(--blue)' : '#fff',
        display: 'grid', placeItems: 'center', color: '#fff', flexShrink: 0,
      }}>{checked && <I.check s={11}/>}</span>
      <span style={{ fontSize: 14, color: 'var(--ink-2)' }} className="row gap-6">
        {icon && React.createElement(I[icon], { s: 14 })}
        {label}
      </span>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: 'none' }}/>
    </label>
  );
}

function CatalogGrid({ properties, onProperty }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      {properties.map(p => <PropertyCard key={p.id} p={p} onClick={() => onProperty(p)} />)}
    </div>
  );
}

function CatalogMap({ properties, onProperty }) {
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 16, height: 'calc(100vh - 220px)', minHeight: 720 }}>
      <div className="card" style={{ overflow: 'hidden', position: 'relative', padding: 0 }}>
        <MiniMap height="100%" pins={properties.length} />
        <div style={{ position: 'absolute', top: 14, left: 14, background: '#fff', padding: '8px 14px', borderRadius: 999, boxShadow: 'var(--shadow-sm)', fontSize: 13, fontWeight: 600 }}>
          <I.pin s={13}/> {properties.length} inmuebles en el mapa
        </div>
      </div>
      <div style={{ overflowY: 'auto', paddingRight: 4 }}>
        <div className="col gap-14">
          {properties.map(p => (
            <div key={p.id} className="card" style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 0, cursor: 'pointer', overflow: 'hidden' }} onClick={() => onProperty(p)}>
              <Photo src={p.cover} style={{ height: 140, borderRadius: 0 }}/>
              <div style={{ padding: 14 }}>
                <div className="row gap-6">
                  {p.verified && <span className="badge badge-verified"><I.check s={10}/> Verificado</span>}
                  {p.featured && <span className="badge badge-featured">Destacado</span>}
                </div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 16, color: 'var(--blue)', marginTop: 6 }}>
                  {formatGs(p.price)}<span style={{ fontSize: 11, color: 'var(--ink-3)' }}> /{p.tipo==='temporal'?'noche':'mes'}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.title}</div>
                <div className="row gap-12 muted" style={{ marginTop: 6, fontSize: 12 }}>
                  {p.beds > 0 && <span><I.bed s={11}/> {p.beds}</span>}
                  <span><I.bath s={11}/> {p.baths}</span>
                  <span><I.ruler s={11}/> {p.m2} m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CatalogPage });
