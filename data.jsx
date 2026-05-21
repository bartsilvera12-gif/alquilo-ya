// Mock data — properties, departamentos, ciudades, etc.

const DEPARTAMENTOS = ['Central', 'Capital', 'Alto Paraná', 'Itapúa', 'Cordillera', 'Caaguazú', 'San Pedro'];
const CIUDADES = {
  'Central': ['Asunción', 'San Lorenzo', 'Luque', 'Lambaré', 'Fernando de la Mora', 'Capiatá'],
  'Capital': ['Asunción'],
  'Alto Paraná': ['Ciudad del Este', 'Hernandarias', 'Presidente Franco'],
  'Itapúa': ['Encarnación', 'Cambyretá'],
  'Cordillera': ['Caacupé', 'Piribebuy'],
  'Caaguazú': ['Coronel Oviedo', 'Caaguazú'],
  'San Pedro': ['San Estanislao', 'San Pedro de Ycuamandyyú'],
};
const BARRIOS = ['Villa Morra', 'Carmelitas', 'Las Lomas', 'Recoleta', 'Ycuá Satí', 'Jara', 'Mburucuyá', 'Trinidad', 'Centro', 'Manorá'];

const TIPOS = [
  { id: 'depto', label: 'Departamento', icon: 'apt' },
  { id: 'casa', label: 'Casa independiente', icon: 'house' },
  { id: 'salon', label: 'Salón comercial', icon: 'shop' },
  { id: 'temporal', label: 'Alquiler temporal', icon: 'beach' },
];

// Unsplash photo IDs — modern real estate photos
const PHOTOS = [
  '1568605114967-8130f3a36994', // modern house
  '1564013799919-ab600027ffc6', // house exterior
  '1570129477492-45c003edd2be', // modern home blue
  '1502672260266-1c1ef2d93688', // apartment interior
  '1522708323590-d24dbb6b0267', // modern living
  '1600585154340-be6161a56a0c', // modern house white
  '1600596542815-ffad4c1539a9', // luxury
  '1600607687939-ce8a6c25118c', // modern apartment
  '1600210492486-724fe5c67fb0', // interior
  '1605276374104-dee2a0ed3cd6', // modern villa
  '1613490493576-7fde63acd811', // luxury living
  '1583608205776-bfd35f0d9f83', // apartment
  '1600566753190-17f0baa2a6c3', // commercial
  '1493809842364-78817add7ffb', // bedroom
  '1512917774080-9991f1c4c750', // exterior contemporary
  '1521540216272-a50305cd4421', // bedroom
  '1556909114-f6e7ad7d3136', // dining
  '1494526585095-c41746248156', // kitchen
];
const photo = (i) => `https://images.unsplash.com/photo-${PHOTOS[i % PHOTOS.length]}?w=900&auto=format&fit=crop&q=70`;

const TITLES = [
  'Dúplex moderno con balcón en zona Villa Morra',
  'Casa familiar 3 dormitorios con quincho y patio',
  'Departamento amoblado a 2 cuadras del Shopping del Sol',
  'Salón comercial sobre Av. España, ideal local',
  'Casa con piscina en barrio cerrado Las Lomas',
  'Loft minimalista con vista al microcentro',
  'Departamento temporal full equipado — Carmelitas',
  'Casa nueva 4 dormitorios + dependencia, Ycuá Satí',
  'Mono ambiente luminoso, primera ocupación',
  'Salón sobre Mcal. López, 180 m² + estacionamiento',
  'PH planta alta con terraza propia — Jara',
  'Departamento ejecutivo amoblado, alquiler temporal',
];

function rand(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const PROPERTIES = TITLES.map((title, i) => {
  const tipos = ['depto','casa','salon','temporal'];
  const tipo = i === 3 || i === 9 ? 'salon' : (i === 6 || i === 11 ? 'temporal' : (i % 2 === 0 ? 'depto' : 'casa'));
  const ciudad = ['Asunción','San Lorenzo','Luque','Lambaré','Asunción','Asunción'][i % 6];
  const barrio = BARRIOS[i % BARRIOS.length];
  const beds = tipo === 'salon' ? 0 : 1 + Math.floor(rand(i+1) * 4);
  const baths = tipo === 'salon' ? 1 : 1 + Math.floor(rand(i+2) * 3);
  const m2 = tipo === 'salon' ? 80 + Math.floor(rand(i+3) * 200) : 35 + Math.floor(rand(i+4) * 180);
  const price = tipo === 'temporal'
    ? 280000 + Math.floor(rand(i+5) * 500000)
    : tipo === 'salon'
      ? 3500000 + Math.floor(rand(i+5) * 9000000)
      : 1800000 + Math.floor(rand(i+5) * 6500000);
  return {
    id: 'AY-' + String(1240 + i).padStart(5, '0'),
    title,
    tipo,
    depto: 'Central',
    ciudad,
    barrio,
    address: `${barrio}, ${ciudad}`,
    price,
    priceLabel: tipo === 'temporal' ? formatGs(price) + ' / noche' : formatGs(price) + ' / mes',
    beds, baths, m2,
    cochera: rand(i+6) > 0.4,
    amoblado: tipo === 'temporal' || rand(i+7) > 0.6,
    mascotas: rand(i+8) > 0.5,
    verified: rand(i+9) > 0.4,
    featured: rand(i+10) > 0.7,
    isNew: rand(i+11) > 0.7,
    photos: Array.from({ length: 5 }, (_, k) => photo(i*3 + k)),
    cover: photo(i*3),
    agent: {
      name: ['Mariana López','Diego Aguilar','Carla Benítez','Inmobiliaria Centro','Andrés Vera','Inmobiliaria Premium'][i % 6],
      type: i % 3 === 0 ? 'Inmobiliaria' : 'Propietario',
      avatar: i,
      verified: true,
      phone: '+595 9' + (80 + i) + ' 555 ' + String(100 + i*7).slice(-3),
    },
    desc: 'Excelente propiedad recientemente refaccionada, ubicación estratégica con acceso rápido a avenidas principales, supermercados, colegios y centros comerciales. Cuenta con ambientes amplios y ventilados, terminaciones de primera, y todos los servicios disponibles.',
    features: ['Aire acondicionado','Cocina equipada','Lavadero','Seguridad 24hs','Wifi','Termotanque'],
  };
});

const PLANS = [
  { tier: 'free-owner', target: 'Propietario', name: 'Gratis', price: 0, badge: null,
    bullets: ['1 propiedad activa', 'Hasta 5 fotos por inmueble', 'Publicación por 30 días', 'Contacto directo por WhatsApp', 'Estadísticas básicas'],
    cta: 'Empezar gratis' },
  { tier: 'free-agent', target: 'Agente', name: 'Gratis Agente', price: 0, badge: null,
    bullets: ['Hasta 5 propiedades', 'Hasta 8 fotos por inmueble', 'Publicación por 30 días', 'Perfil con nombre comercial', 'Soporte por email'],
    cta: 'Empezar gratis' },
  { tier: 'premium-owner', target: 'Propietario', name: 'Premium', price: 89000, badge: 'Más elegido',
    bullets: ['Hasta 5 propiedades', 'Hasta 25 fotos + video / tour 360°', 'Renovación automática', 'Reporte de visualizaciones', 'Posición destacada 7 días', 'Generador de cartel con QR'],
    cta: 'Quiero Premium', highlighted: true },
  { tier: 'premium-agent', target: 'Agente', name: 'Premium Agente', price: 249000, badge: 'Profesional',
    bullets: ['Inmuebles ilimitados', 'Video y tour 360° por propiedad', 'Estadísticas avanzadas', 'Integración WhatsApp Business', 'Identidad propia con logo', 'Creador visual de flyer + QR', 'Gestor multi-propiedad'],
    cta: 'Quiero Premium Agente' },
];

const ADS = [
  { brand: 'Ferretería Don Mario', tag: 'Ferretería', color: '#f5e6b6', tint: '#8a5e00', desc: 'Todo para tu mudanza con 15% off' },
  { brand: 'Constructora Nova', tag: 'Construcción', color: '#d8e4f7', tint: '#0058A5', desc: 'Proyectos llave en mano' },
  { brand: 'CleanPy Limpieza', tag: 'Limpieza', color: '#dff2e7', tint: '#1f8a5b', desc: 'Limpieza profunda post-mudanza' },
  { brand: 'Mudanzas Express', tag: 'Mudanzas', color: '#fde2d4', tint: '#c2410c', desc: 'Servicio puerta a puerta en 24 hs' },
  { brand: 'Seguros Hogar Plus', tag: 'Seguros', color: '#ece4f7', tint: '#6e3ad1', desc: 'Asegurá tu hogar desde Gs. 35.000/mes' },
  { brand: 'Mantenimiento 360', tag: 'Servicios', color: '#fff0d6', tint: '#a36100', desc: 'Plomería, electricidad y más' },
];

// QR posters
const QR_POSTERS = Array.from({ length: 30 }, (_, i) => {
  const assigned = i < 8;
  return {
    id: 'AY-Q' + String(2050 + i).padStart(4, '0'),
    created: '20/03/2026',
    assigned: assigned ? PROPERTIES[i % PROPERTIES.length].id : null,
    address: assigned ? PROPERTIES[i % PROPERTIES.length].address : '—',
    status: assigned ? 'Asignado' : 'Disponible',
  };
});

Object.assign(window, { DEPARTAMENTOS, CIUDADES, BARRIOS, TIPOS, PROPERTIES, PLANS, ADS, QR_POSTERS, photo });
