# DR-001 - Enlace de Twitter apunta a un dominio incorrecto

| Campo | Valor |
|---|---|
| Número de Bug | DR-001 |
| Tester | [Completar] |
| Título | [Footer] El enlace Twitter dirige a `twitter-broken.com` |
| Fecha | 2026-11-12 |
| Sistema operativo | Windows |
| Navegador | Chromium / Playwright |
| Prioridad | P2 - El enlace afecta una navegación secundaria visible, pero no bloquea la operación principal |
| Severidad | Baja - La funcionalidad principal de Buggy Cars Rating continúa disponible |
| Funcionalidad | F02 - Navegación externa del pie de página |
| Estado | Nuevo |
| Reproducible | Sí, observado durante la exploración |

## Descripción detallada

El pie de página muestra un enlace denominado `Twitter`, pero su destino es
`https://www.twitter-broken.com/`. El enlace no dirige al perfil o dominio
oficial esperado de Twitter/X.

El defecto se reporta como un problema de navegación y configuración del enlace.
No se debe cerrar hasta que se compruebe el destino corregido.

## Precondiciones

1. Tener conexión a Internet.
2. La aplicación Buggy Cars Rating debe estar disponible.
3. No se requiere autenticación.

## Pasos para reproducir

1. Abrir `https://buggy.justtestit.org/`.
2. Desplazarse al pie de página.
3. Localizar el enlace `Twitter`.
4. Inspeccionar su destino o activarlo.

## Resultado esperado

El enlace `Twitter` debe dirigir a la cuenta oficial configurada por el
producto, normalmente bajo `https://twitter.com/` o el dominio oficial que el
propietario de la aplicación defina.

## Resultado actual

El enlace apunta a:

```text
https://www.twitter-broken.com/
```

El destino no corresponde al dominio oficial esperado.

## Evidencia

- URL observada durante la exploración: `https://www.twitter-broken.com/`
- La captura debe agregarse al ejecutar el caso manual:
  `evidencias/DR-001-twitter-link.png`
- Si el navegador muestra un error de navegación, adjuntar también la traza.

## Re-test posterior

Pendiente. Para verificar la corrección:

1. Abrir nuevamente la página.
2. Activar el enlace `Twitter`.
3. Confirmar que el dominio sea el aprobado por el propietario del producto.
4. Adjuntar captura del destino.
5. Comentar el issue con el resultado antes de cerrarlo.

