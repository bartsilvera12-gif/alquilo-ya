# AlquiloYa

Prototipo visual completo del marketplace inmobiliario AlquiloYa — solo frontend, datos mock, sin backend.

## Cómo abrir
Abrí `index.html` en cualquier navegador moderno. No requiere build ni servidor.

## Estructura

```
index.html                # Entry point
brand.jsx                 # Logo, iconos, formatter Gs.
data.jsx                  # Mock data (propiedades, ciudades, planes)
shared.jsx                # Header, Footer, PropertyCard, AdBanner, QRMock, Avatar
home.jsx                  # Landing
catalog.jsx               # Listado de inmuebles con filtros y mapa
detail.jsx                # Detalle de propiedad
temporal.jsx              # Alquiler temporal con calendario
plans.jsx                 # Planes (propietarios / agentes)
publish.jsx               # Wizard de publicación (5 pasos)
posters.jsx               # Carteles QR (dentro del panel agente)
admin.jsx                 # Panel admin global + panel agente
app.jsx                   # Router
assets/
  logo.png                # Logo oficial AlquiloYa
  logo-dark.png           # Variante para fondos oscuros
```

## Acceso al admin global

Solo por URL directa: `index.html#admin-global`

## Tecnología

- React 18 + Babel standalone (sin build)
- HTML + CSS vanilla con design tokens en `:root`
- Google Fonts: Montserrat, Inter, Nunito, JetBrains Mono
- Imágenes de propiedades desde Unsplash

## Paleta

- Azul `#0058A5` — estructura y confianza
- Amarillo `#F9B000` — CTAs y acentos
- Tipografías base: Montserrat (titulares), Inter (texto), Nunito (logo)
