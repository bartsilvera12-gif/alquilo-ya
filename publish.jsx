// Publicar inmueble — wizard 5 pasos

function PublishPage() {
  const [step, setStep] = React.useState(0);
  const steps = [
    { id: 0, title: 'Datos básicos', icon: 'doc' },
    { id: 1, title: 'Ubicación', icon: 'pin' },
    { id: 2, title: 'Fotos', icon: 'upload' },
    { id: 3, title: 'Plan', icon: 'star' },
    { id: 4, title: 'Vista previa', icon: 'eye' },
  ];
  return (
    <div className="fade-in container" style={{ padding: '32px' }}>
      <div className="row between">
        <div>
          <div className="tag">Publicar inmueble</div>
          <h2 style={{ marginTop: 6, fontSize: 30 }}>Cargá tu propiedad en 5 pasos</h2>
        </div>
        <button className="btn btn-outline">Guardar borrador</button>
      </div>

      <div className="card" style={{ marginTop: 24, padding: '20px 24px' }}>
        <div className="row" style={{ gap: 0, justifyContent: 'space-between' }}>
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="row gap-12" style={{ alignItems: 'center', flex: '0 0 auto' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: step >= i ? 'var(--blue)' : '#fff',
                  border: '2px solid ' + (step >= i ? 'var(--blue)' : 'var(--line)'),
                  color: step >= i ? '#fff' : 'var(--ink-3)',
                  display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0
                }}>
                  {step > i ? <I.check s={16}/> : i + 1}
                </div>
                <div>
                  <div className="muted xs">Paso {i + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: step >= i ? 'var(--ink)' : 'var(--ink-4)' }}>{s.title}</div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, background: step > i ? 'var(--blue)' : 'var(--line)', alignSelf: 'center', margin: '0 12px' }}/>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 28, marginTop: 28, alignItems: 'flex-start' }}>
        <div className="card" style={{ padding: 32 }}>
          {step === 0 && <StepBasics/>}
          {step === 1 && <StepLocation/>}
          {step === 2 && <StepPhotos/>}
          {step === 3 && <StepPlan/>}
          {step === 4 && <StepPreview/>}

          <div className="row between" style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line-2)' }}>
            <button className="btn btn-outline" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}
              style={{ opacity: step === 0 ? 0.4 : 1 }}>
              ← Anterior
            </button>
            <div className="row gap-12">
              <span className="muted xs">Paso {step + 1} de {steps.length}</span>
              {step < steps.length - 1 ? (
                <button className="btn btn-blue" onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>
                  Continuar <I.arrow s={14}/>
                </button>
              ) : (
                <button className="btn btn-primary btn-lg">
                  Publicar inmueble <I.check s={16}/>
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ position: 'sticky', top: 92 }}>
          <PreviewCard step={step}/>
        </div>
      </div>
    </div>
  );
}

function FormGrid({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>{children}</div>;
}

function StepBasics() {
  return (
    <div>
      <div className="tag">Paso 1</div>
      <h3 style={{ fontSize: 22, marginTop: 6 }}>Datos básicos de tu propiedad</h3>
      <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Completá la información principal del inmueble.</p>
      <div style={{ marginTop: 24 }}>
        <div className="field" style={{ marginBottom: 18 }}>
          <label>Tipo de inmueble</label>
          <div className="row gap-10" style={{ flexWrap: 'wrap' }}>
            {TIPOS.map(t => <TileChoice key={t.id} icon={t.icon} label={t.label} active={t.id === 'depto'}/>)}
          </div>
        </div>
        <div className="field" style={{ marginBottom: 18 }}>
          <label>Título de la publicación</label>
          <input className="input" defaultValue="Dúplex moderno con balcón en zona Villa Morra"/>
          <span className="muted xs">Hasta 80 caracteres. Sé claro y específico.</span>
        </div>
        <FormGrid>
          <div className="field">
            <label>Precio mensual (Gs.)</label>
            <input className="input" defaultValue="3.800.000"/>
          </div>
          <div className="field">
            <label>Operación</label>
            <select className="select"><option>Alquiler permanente</option><option>Alquiler temporal</option></select>
          </div>
        </FormGrid>
        <div style={{ height: 18 }}/>
        <FormGrid>
          <div className="field"><label>Dormitorios</label><input className="input" defaultValue="2"/></div>
          <div className="field"><label>Baños</label><input className="input" defaultValue="2"/></div>
          <div className="field"><label>Superficie (m²)</label><input className="input" defaultValue="85"/></div>
          <div className="field"><label>Antigüedad</label><select className="select"><option>A estrenar</option><option>1–5 años</option><option>5–10 años</option><option>+10 años</option></select></div>
        </FormGrid>
        <div className="field" style={{ marginTop: 18 }}>
          <label>Características</label>
          <div className="row gap-8" style={{ flexWrap: 'wrap' }}>
            {['Cochera','Amoblado','Mascotas permitidas','Piscina','Quincho','Aire acondicionado','Wifi','Lavadero','Seguridad 24hs','Cocina equipada'].map((f,i) => (
              <Chip key={f} label={f} active={i < 5}/>
            ))}
          </div>
        </div>
        <div className="field" style={{ marginTop: 18 }}>
          <label>Descripción</label>
          <textarea className="input" rows={4} defaultValue="Excelente departamento recientemente refaccionado. Cuenta con ambientes amplios, ventilados, y todos los servicios."/>
        </div>
      </div>
    </div>
  );
}

function TileChoice({ icon, label, active }) {
  return (
    <button style={{
      padding: '14px 16px', borderRadius: 12,
      border: '2px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
      background: active ? 'var(--blue-50)' : '#fff',
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
      color: active ? 'var(--blue)' : 'var(--ink-2)', fontWeight: 600, fontSize: 14
    }}>
      {React.createElement(I[icon], { s: 18 })}
      {label}
    </button>
  );
}
function Chip({ label, active }) {
  return (
    <button style={{
      padding: '8px 14px', borderRadius: 999,
      border: '1px solid ' + (active ? 'var(--blue)' : 'var(--line)'),
      background: active ? 'var(--blue)' : '#fff',
      color: active ? '#fff' : 'var(--ink-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer'
    }}>{active && '✓ '}{label}</button>
  );
}

function StepLocation() {
  return (
    <div>
      <div className="tag">Paso 2</div>
      <h3 style={{ fontSize: 22, marginTop: 6 }}>¿Dónde se encuentra tu inmueble?</h3>
      <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>La ubicación exacta solo se compartirá cuando coordines una visita.</p>
      <div style={{ marginTop: 24 }}>
        <FormGrid>
          <div className="field"><label>Departamento</label><select className="select">{DEPARTAMENTOS.map(d => <option key={d}>{d}</option>)}</select></div>
          <div className="field"><label>Ciudad</label><select className="select">{CIUDADES['Central'].map(d => <option key={d}>{d}</option>)}</select></div>
          <div className="field"><label>Barrio</label><select className="select">{BARRIOS.map(d => <option key={d}>{d}</option>)}</select></div>
          <div className="field"><label>Código postal</label><input className="input" defaultValue="1208"/></div>
        </FormGrid>
        <div className="field" style={{ marginTop: 18 }}>
          <label>Dirección (no se mostrará al público)</label>
          <input className="input" defaultValue="Mariscal López casi Capitán Brizuela"/>
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 18, border: '1px solid var(--line)' }}>
        <div style={{ padding: '14px 16px', background: 'var(--bg-2)', borderBottom: '1px solid var(--line-2)' }} className="row between">
          <div className="row gap-8"><I.pin s={14}/> <span style={{ fontWeight: 600, fontSize: 13 }}>Ubicación aproximada</span></div>
          <button className="btn btn-outline btn-sm">Ajustar pin</button>
        </div>
        <MiniMap height={260} pins={1}/>
      </div>
    </div>
  );
}

function StepPhotos() {
  const photos = Array.from({ length: 6 }, (_, i) => photo(i));
  return (
    <div>
      <div className="tag">Paso 3</div>
      <h3 style={{ fontSize: 22, marginTop: 6 }}>Subí tus mejores fotos</h3>
      <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>La primera foto será la principal. Recomendamos al menos 5 fotos para maximizar consultas.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
        {photos.map((src, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <Photo src={src} style={{ height: 130, borderRadius: 10 }}/>
            {i === 0 && <span className="badge badge-featured" style={{ position: 'absolute', top: 8, left: 8 }}>Principal</span>}
            <button style={{ position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,.95)', border: 'none', cursor: 'pointer' }}>
              <I.x s={12}/>
            </button>
          </div>
        ))}
        <button style={{
          height: 130, borderRadius: 10, border: '2px dashed var(--line)', background: 'var(--bg-2)',
          display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--ink-3)'
        }}>
          <div className="col" style={{ alignItems: 'center', gap: 4 }}>
            <I.upload s={20}/>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>Agregar foto</span>
          </div>
        </button>
      </div>
      <div style={{ marginTop: 24, padding: 18, background: 'var(--blue-50)', borderRadius: 12 }}>
        <div className="row gap-12">
          <I.bolt s={20} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Premium incluye video y tour 360°</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Las propiedades con video reciben 3x más consultas. <a style={{ color: 'var(--blue)', fontWeight: 600 }}>Activar Premium →</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPlan() {
  const [picked, setPicked] = React.useState('premium-owner');
  return (
    <div>
      <div className="tag">Paso 4</div>
      <h3 style={{ fontSize: 22, marginTop: 6 }}>Elegí un plan para tu publicación</h3>
      <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Podés cambiar de plan más adelante.</p>
      <div className="col gap-12" style={{ marginTop: 20 }}>
        {PLANS.filter(p => p.tier.includes('owner')).map(p => (
          <button key={p.tier} onClick={() => setPicked(p.tier)} className="card" style={{
            padding: 18, textAlign: 'left',
            border: '2px solid ' + (picked === p.tier ? 'var(--blue)' : 'var(--line)'),
            background: picked === p.tier ? 'var(--blue-50)' : '#fff',
            cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16
          }}>
            <div className="row gap-14">
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                border: '2px solid ' + (picked === p.tier ? 'var(--blue)' : 'var(--line)'),
                background: picked === p.tier ? 'var(--blue)' : '#fff',
                display: 'grid', placeItems: 'center', color: '#fff'
              }}>{picked === p.tier && <I.check s={12}/>}</span>
              <div>
                <div className="row gap-8">
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 17 }}>{p.name}</div>
                  {p.badge && <span className="badge badge-featured" style={{ fontSize: 10 }}>{p.badge}</span>}
                </div>
                <div className="muted xs">{p.bullets[0]} · {p.bullets[1]}</div>
              </div>
            </div>
            <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 20, color: 'var(--blue)' }}>
              {p.price === 0 ? 'Gratis' : formatGs(p.price) + ' /mes'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPreview() {
  return (
    <div>
      <div className="tag">Paso 5</div>
      <h3 style={{ fontSize: 22, marginTop: 6 }}>Revisá cómo se verá tu publicación</h3>
      <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Si todo está correcto, publicá. Podrás editar en cualquier momento.</p>
      <div className="card" style={{ marginTop: 24, padding: 0, overflow: 'hidden' }}>
        <Photo src={photo(0)} style={{ height: 280, borderRadius: 0 }}/>
        <div style={{ padding: 22 }}>
          <div className="row gap-8">
            <span className="badge badge-verified"><I.check s={11}/> Verificación pendiente</span>
          </div>
          <h3 style={{ marginTop: 10, fontSize: 22 }}>Dúplex moderno con balcón en zona Villa Morra</h3>
          <div className="muted" style={{ marginTop: 4, fontSize: 13 }}><I.pin s={13}/> Villa Morra, Asunción · Central</div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: 28, color: 'var(--blue)', marginTop: 12 }}>Gs. 3.800.000<span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}> / mes</span></div>
        </div>
      </div>
      <div style={{ marginTop: 16, padding: 18, background: 'var(--yellow-50)', borderRadius: 12, fontSize: 13.5, color: '#8a5e00' }}>
        <I.bolt s={14}/> Al publicar, tu inmueble entra en cola de verificación. Tarda menos de 24 hs hábiles.
      </div>
    </div>
  );
}

function PreviewCard({ step }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="tag">Vista previa</div>
      <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>Así se va completando tu ficha</div>
      <div className="card" style={{ marginTop: 16, padding: 14, border: '1px dashed var(--line)' }}>
        <Photo src={photo(0)} style={{ height: 140, borderRadius: 8 }}/>
        <div style={{ marginTop: 12 }}>
          <div className="row gap-6">
            <span className="badge badge-soft">Borrador</span>
            {step >= 3 && <span className="badge badge-featured" style={{ fontSize: 10 }}>Premium</span>}
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, marginTop: 6 }}>Dúplex moderno · Villa Morra</div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 16, color: 'var(--blue)', marginTop: 4 }}>Gs. 3.800.000<span style={{ fontSize: 11, color: 'var(--ink-3)' }}> /mes</span></div>
          <div className="row gap-12 muted" style={{ marginTop: 8, fontSize: 12 }}>
            <span><I.bed s={11}/> 2</span><span><I.bath s={11}/> 2</span><span><I.ruler s={11}/> 85m²</span>
          </div>
        </div>
      </div>
      <div className="col gap-10" style={{ marginTop: 18, fontSize: 13 }}>
        {['Datos básicos','Ubicación','Fotos','Plan','Vista previa'].map((s, i) => (
          <div key={s} className="row gap-8" style={{ color: step >= i ? 'var(--ink)' : 'var(--ink-4)' }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: step > i ? 'var(--blue)' : step === i ? 'var(--yellow)' : 'var(--bg-3)', color: '#fff', display: 'grid', placeItems: 'center' }}>
              {step > i && <I.check s={10}/>}
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PublishPage });
