# bafif.github.io

*[English](README.md) · Español*

Portfolio personal de Bautista Fiori, publicado en <https://bafif.github.io>, en español y en inglés.

Hecho con Astro, TypeScript y Tailwind CSS. Las fuentes (IBM Plex) están alojadas en el propio sitio; el sitio no
carga nada de terceros.

## Desarrollo

Todo corre en contenedores de Podman sin root; nunca corras `npm install` en el host. El repositorio se monta de
solo lectura, así que nada de lo que corre adentro puede cambiar las fuentes ni `.git`: las dependencias y el build
viven en volúmenes. La caché de Astro es un tmpfs, nuevo en cada contenedor: Astro 7 guarda ahí el pid de su
servidor de desarrollo y mata ese pid en el siguiente arranque, y en un contenedor recién creado ese pid puede ser
el del propio servidor nuevo.

```sh
mkdir -p node_modules .astro dist            # una sola vez: sus puntos de montaje
podman compose up --build                    # http://localhost:8080 (nginx → servidor de desarrollo de Astro, con HMR)
podman compose run --rm web npm run build    # chequeo de tipos y build (en el volumen dist)
```

## Contenido

Todo texto que lee quien visita el sitio está escrito en español y en inglés, uno al lado del otro, como
`{ es: "…", en: "…" }`: en `src/data/` el contenido, y en cada componente sus propias palabras. `localize`
(`src/i18n.ts`) elige un idioma y frena el build si a un texto le falta alguno de los dos.

- `src/data/projects.ts`: las vitrinas (`showcases`) y los proyectos más chicos (`smallProjects`). Acá van solo
  repositorios públicos.
- `src/data/career.ts`: la línea de tiempo.
- `src/data/profile.ts`: nombre, texto de presentación, enlaces de contacto y el pinout del chip DIP-16 del hero.
- `src/data/support.ts`: los alias, la dirección cripto y los enlaces de pago que aparecen en `/donaciones/` y
  `/en/donations/` (`src/components/paginas/Donaciones.astro`). Lo que quede vacío no aparece en la página generada.
- `/privacy/` y `/en/privacy/` (`src/components/paginas/Privacidad.astro`): política de privacidad. `/privacy/` es
  también la URL de privacidad de la app OAuth «Automatizaciones de Bautista Fiori» (proyecto de Google Cloud
  `bafif-obsidian`), así que no se mueve nunca.

## Idiomas

El español vive en las rutas de siempre (`/`, `/donaciones/`, `/privacy/`) y el inglés bajo `/en/` (`/en/`,
`/en/donations/`, `/en/privacy/`): cada página se genera dos veces desde un mismo componente de
`src/components/paginas/`, y `routes`, en `src/i18n.ts`, las empareja. En la primera visita, una página manda a su
gemela si los idiomas del navegador lo piden: español si alguno es español, inglés si no. El enlace del encabezado
cambia de idioma y se recuerda (`idioma` en `localStorage`), y esa elección manda sobre la del navegador. A los
buscadores no se los redirige nunca, y las páginas se enlazan entre sí con `hreflang`, así se indexan las dos
versiones. La página 404 es una sola para los dos idiomas.

## Aspecto

El sitio en sí usa Fiori, mi marca personal: Albiceleste en modo claro, Rojinegro en modo oscuro, Fraunces,
Instrument Sans y JetBrains Mono. Sus tokens, fuentes y emblema están copiados del kit de marca en
`src/styles/marca/` y `public/marca/`; el modo sigue al del sistema y el botón lo fija con `data-tema`.

Cada proyecto, en cambio, se muestra con su propio aspecto. `src/styles/pieles.css` tiene una piel por proyecto,
sacada del repositorio de ese proyecto (paleta, tipografías, motivo), y `src/components/vitrinas/` tiene un
componente por proyecto que completa el layout común (`Vitrina.astro`) con sus propios detalles y capturas. La
misma clase de piel viste el recuadro del proyecto en el índice de arriba. Las tipografías de los proyectos están
en `src/styles/proyectos/`, con sus licencias, y las capturas en `public/img/proyectos/`.

Para agregar un proyecto: una entrada en `showcases`, con cada texto en español y en inglés, una piel en
`pieles.css`, un componente en `vitrinas/` (con sus propias palabras también como `{ es, en }`) y su línea en el mapa
`skins` de `src/components/paginas/Inicio.astro`. Antes de publicar, revisá los colores de texto de la piel en
visión normal y protán (yo veo como protán): nada que se distinga solo por el tono, y nada de rojo como texto fino
sobre negro.

## Movimiento

Cada vitrina entra a medida que aparece al hacer scroll y tiene una animación chiquita propia, sacada de lo que
hace el proyecto: el mapa de TellMAP se desplaza dentro de su marco, una línea de escaneo recorre el lector de Urna,
la consulta de xport se escribe sola, EX Emulators tacha el flag que lo hace crashear. La pantalla de «reproduciendo»
de Rocola no es una captura sino el tema Ámbar dibujado en HTML y CSS (`src/components/vitrinas/RocolaPantalla.astro`),
con las burbujas, el 45 que gira, las lamparitas que se persiguen y un reloj que sigue la canción. El chip del hero
hace correr una señal por sus patas.

Todo eso vive en `src/styles/animaciones.css` y espera la clase `anima`, que `src/layouts/Base.astro` pone solo
cuando el visitante no pidió movimiento reducido; sin ella, o sin JavaScript, la página es la misma página, quieta.
Las animaciones se frenan mientras están fuera de pantalla.

## Videos

`public/video/` tiene un loop corto y sin sonido de un proyecto funcionando, con un póster del mismo nombre (su
primer cuadro). Una vitrina que tiene uno (`video` en `src/data/projects.ts`) lo reproduce mientras está en pantalla;
con movimiento reducido muestra el póster y los controles del navegador. Son grabados, no editados:

```sh
tools/videos/tellmap.sh                      # TellMAP en Godot, headless dentro de cage (necesita ~/tmap)
node tools/grabar.mjs video https://bafif.github.io/foja/editor/ public/video/foja.mp4 --ancho 1440 --alto 860 \
  --esperar 5000 --segundos 14 --lento 0.25 --antes @tools/videos/foja-ejemplo.js --guion tools/videos/foja.mjs
node tools/grabar.mjs video http://localhost:8080/ public/video/rocola.mp4 --ancho 1366 --alto 900 --escala 2 \
  --selector .rc-bisel --recorte .rc-bisel --segundos 10 --lento 0.12      # con el stack de desarrollo levantado
```

`tools/grabar.mjs` maneja un Chrome headless: ralentiza todas las animaciones, captura cuadros lo más rápido que
puede, le estampa a cada uno el tiempo de la propia página y deja que ffmpeg los remuestree a 30 cuadros por segundo
parejos, así el video sale fluido aunque una captura tarde mucho más que un cuadro. Un módulo `--guion` puede hacer
scroll, escribir o hacer clic en el camino. Hacé cada póster a partir del primer cuadro
(`ffmpeg -i x.mp4 -frames:v 1 x.png`, después `magick x.png -quality 80 x.webp`) y mantené cada video por debajo de
los 2 MB.

## Vista previa del enlace

`public/og.jpg` es la imagen que muestran WhatsApp, Telegram y LinkedIn cuando se comparte el enlace (etiquetas Open
Graph en `src/layouts/Base.astro`), y `public/og.en.jpg` su versión en inglés, para las páginas bajo `/en/`. Su
fuente es `tools/og-image.html` (con `?en`, en inglés); después de cambiarla, volvé a renderizar las dos a 1200×630
desde la raíz del repositorio y mantené cada JPEG por debajo de los 300 KB:

```sh
google-chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
  --virtual-time-budget=8000 --screenshot=og.png "file://$PWD/tools/og-image.html"
magick og.png -strip -quality 86 -interlace JPEG public/og.jpg && rm og.png
google-chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 \
  --virtual-time-budget=8000 --screenshot=og.png "file://$PWD/tools/og-image.html?en"
magick og.png -strip -quality 86 -interlace JPEG public/og.en.jpg && rm og.png
```

WhatsApp guarda la vista previa de cada enlace por un tiempo: un enlace que ya se compartió antes del cambio puede
seguir mostrando la vieja.

## Despliegue

Hacer push a `main` ejecuta `.github/workflows/deploy.yml`, que genera el sitio y lo publica con GitHub Pages
(Settings → Pages → Source: GitHub Actions).