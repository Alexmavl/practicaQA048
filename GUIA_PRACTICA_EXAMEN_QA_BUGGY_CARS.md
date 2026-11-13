# Guia de practica para el examen de QA

Aplicacion de practica: [Buggy Cars Rating](https://buggy.justtestit.org/)

Esta guia transforma el prompt del examen en un procedimiento reutilizable. Sirve
para practicar el analisis, el diseno de casos, la automatizacion, el reporte de
defectos y el re-test sin inventar resultados.

## 1. Regla principal

No se deben afirmar defectos, resultados ni evidencias antes de ejecutar la
prueba. La guia contiene casos preparados; las columnas **Resultado obtenido**,
**Estado** y **Evidencia** se completan durante la ejecucion.

Antes de comenzar:

1. Abrir la URL y confirmar que responde.
2. Revisar la interfaz y los selectores reales.
3. Ejecutar el flujo manualmente una vez.
4. Capturar evidencia solamente del comportamiento observado.
5. Repetir cualquier fallo antes de crear un issue.

## 2. Mapa rapido de la aplicacion

| Area | URL o acceso | Que practicar |
|---|---|---|
| Inicio | `/` | Login, navegacion, enlaces del pie de pagina |
| Registro | `/register` | Validaciones, registro exitoso y datos invalidos |
| Ranking general | `/overall` | Tabla, encabezados, filas y paginacion si aparece |
| Area autenticada | Despues de iniciar sesion | Perfil, vehiculos, votos y comentarios |

### Observaciones de la exploracion inicial

- La pagina muestra los controles `Login`, `Register` y el encabezado
  `Buggy Cars Rating`.
- El formulario de registro contiene Login, First Name, Last Name, Password y
  Confirm Password.
- El boton `Register` comienza deshabilitado hasta que los datos son validos.
- Si las contrasenas no coinciden, se muestra `Passwords do not match` y el
  registro permanece deshabilitado.
- En la sesion explorada, `/overall` no mostro la tabla esperada. Esto es un
  **hallazgo candidato**, no un defecto confirmado.
- El enlace de Twitter observado apunta a `twitter-broken.com`. Debe verificarse
  antes de reportarlo como defecto.

## 3. Casos automatizados sugeridos

### TC-AUT-01 - Registro exitoso

- **Prioridad:** P1
- **Precondiciones:** La aplicacion esta disponible; el usuario generado no
  existe.
- **Datos:** Login unico con timestamp, nombre, apellido y contrasena valida.
- **Pasos:**
  1. Ir a `/register`.
  2. Completar todos los campos obligatorios.
  3. Verificar que `Register` se habilite.
  4. Enviar el formulario.
  5. Verificar el mensaje de registro exitoso.
- **Resultado esperado:** El usuario se registra y aparece confirmacion.
- **Tecnicas:** Clases de equivalencia, prueba positiva.
- **Evidencia:** Captura del formulario y captura del resultado.

### TC-AUT-02 - Login rechazado

- **Prioridad:** P1
- **Precondiciones:** La pagina de inicio esta disponible.
- **Datos:** Usuario inexistente o contrasena incorrecta.
- **Pasos:**
  1. Ir a `/`.
  2. Ingresar credenciales invalidas.
  3. Presionar `Login`.
  4. Verificar que no se conceda acceso.
  5. Verificar el mensaje de error si la aplicacion lo muestra.
- **Resultado esperado:** El acceso es rechazado y se informa el problema.
- **Tecnicas:** Clases de equivalencia negativa.
- **Evidencia:** Captura del mensaje o del estado rechazado.

### TC-AUT-03 - Ranking general

- **Prioridad:** P1
- **Precondiciones:** La pagina de inicio esta disponible.
- **Pasos:**
  1. Ir a `/`.
  2. Navegar a `Overall Rating`.
  3. Verificar que la URL sea `/overall`.
  4. Verificar la tabla.
  5. Verificar encabezados como Make, Model, Rank y Votes.
  6. Verificar que exista al menos una fila.
- **Resultado esperado:** El ranking se carga con estructura y datos visibles.
- **Tecnicas:** Prueba de interfaz, smoke testing.
- **Evidencia:** Captura de la tabla y traza si falla.

### Reglas para el codigo Playwright

- Usar `getByRole`, `getByLabel` o `getByTestId` cuando existan.
- Usar `locator('#id')` solamente cuando no exista una alternativa semantica.
- No usar `page.waitForTimeout`.
- Esperar con aserciones web-first, por ejemplo:

```typescript
await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();
await expect(page.locator('.result.alert-success')).toBeVisible();
```

- Adjuntar capturas con `testInfo.attach`.
- No adjuntar contrasenas, tokens ni datos sensibles.
- Usar tags:

```typescript
test('TC-AUT-01 registro exitoso', { tag: ['@smoke', '@registro'] }, async ({ page }, testInfo) => {
  // Arrange, Act, Assert y evidencia
});
```

- Generar datos unicos para registro:

```typescript
const username = `qa_user_${Date.now()}`;
```

## 4. Pruebas manuales exploratorias

### TC-MAN-01 - Registro y validaciones

**Mision:** Explorar reglas de validacion del registro durante 15 minutos.

Comprobar:

- Campos vacios.
- Login demasiado corto o con caracteres especiales.
- Nombre y apellido vacios.
- Contrasena vacia.
- Confirmacion diferente.
- Boton Register deshabilitado mientras los datos son invalidos.
- Cancelacion del formulario.
- Registro con datos validos.
- Intento de registrar nuevamente el mismo usuario.

Registrar cada hallazgo con:

```text
Charter:
Tiempo:
Datos usados:
Flujo probado:
Resultado esperado:
Resultado observado:
Evidencia:
Pregunta o riesgo:
```

### TC-MAN-02 - Navegacion y funcionalidad autenticada

**Mision:** Explorar la navegacion del usuario autenticado y las operaciones
principales de calificacion.

Comprobar:

- Login correcto.
- Logout o cierre de sesion.
- Acceso a perfil.
- Visualizacion de vehiculos.
- Voto o calificacion de un vehiculo.
- Comentario valido.
- Comentario vacio o demasiado largo.
- Recarga de la pagina despues de guardar.
- Prevencion de votos duplicados, si la regla aplica.
- Navegacion mediante botones del navegador.

No asumir nombres de rutas o mensajes: observarlos en la aplicacion y anotarlos.

## 5. Matriz de casos para copiar a Excel

Usar estas 11 columnas oficiales:

| ID | Caso de prueba | Prioridad | Precondiciones | Datos de entrada | Pasos numerados | Resultado esperado | Resultado obtenido | Estado prueba | Evidencia | Tecnica de diseno aplicada |
|---|---|---|---|---|---|---|---|---|---|---|
| TC-AUT-01 | Registro exitoso | P1 | Aplicacion disponible; usuario unico | Datos validos | Ir a registro; completar; enviar | Registro confirmado | Completar durante ejecucion | Pass/Fail | PNG y trace | CE positiva |
| TC-AUT-02 | Login con credenciales invalidas | P1 | Inicio disponible | Usuario o clave incorrecta | Completar login; enviar | Acceso rechazado | Completar durante ejecucion | Pass/Fail | PNG | CE negativa |
| TC-AUT-03 | Carga de Overall Rating | P1 | Inicio disponible | Ninguno | Ir a ranking; validar tabla | Tabla y filas visibles | Completar durante ejecucion | Pass/Fail | PNG y trace | Smoke |
| TC-MAN-01 | Validaciones de registro | P1 | Registro disponible | Campos vacios, invalidos y validos | Explorar charter | Reglas consistentes | Completar durante ejecucion | Pass/Fail | Capturas/notas | CE y frontera |
| TC-MAN-02 | Flujo autenticado | P1 | Cuenta valida | Voto y comentario | Login; navegar; operar | Operaciones guardadas correctamente | Completar durante ejecucion | Pass/Fail | Capturas/traza | Exploratoria |

## 6. Cuando un resultado es un defecto

Crear un defecto solamente si se cumplen todas estas condiciones:

1. El comportamiento se reproduce.
2. Existe un resultado esperado claro.
3. El resultado actual contradice el esperado.
4. La evidencia permite entender el fallo.
5. Se descartan datos invalidos, ambiente caido y errores de prueba.

### Titulo recomendado

```text
[Componente] no [resultado esperado] cuando [condicion]
```

Ejemplo:

```text
[Overall Rating] no muestra la tabla cuando el usuario accede a /overall
```

### Plantilla DR-00X

```markdown
# DR-00X - [Titulo]

| Campo | Valor |
|---|---|
| Bug | DR-00X |
| Tester | [nombre] |
| Fecha | [AAAA-MM-DD] |
| OS / Browser | [datos] |
| Prioridad | P1-P4: [justificacion] |
| Severidad | Critica/Alta/Media/Baja: [justificacion] |
| Funcionalidad | F0X |
| Estado | Nuevo / En progreso / Verificado / Cerrado |

## Descripcion
[Que ocurre y bajo que condicion.]

## Pasos para reproducir
1. [Paso]
2. [Paso]
3. [Paso]

## Resultado esperado
[Comportamiento correcto.]

## Resultado actual
[Comportamiento observado.]

## Evidencia
- [Captura]
- [Trace Viewer, si aplica]
```

## 7. GitHub CLI

Crear etiquetas separadas, no una etiqueta combinada:

```powershell
gh issue create `
--title "[Footer] Enlace Twitter apunta a un dominio incorrecto" `
  --label bug `
--label manual `
--body-file .\reportes\DR-001-enlace-twitter-roto.md
```

Para un defecto manual, cambiar `automated` por `manual`.

Despues del fix:

```powershell
gh issue comment NUMERO --body-file .\evidencias\DR-001-retest.md
gh issue close NUMERO --comment "Verificado mediante re-test. Evidencia adjunta."
```

El re-test debe indicar:

- Version o commit probado.
- Fecha y navegador.
- Pasos ejecutados.
- Resultado esperado.
- Resultado actual.
- Evidencia.
- Pass o Fail.

### Reporte preparado para esta practica

- [DR-001 - Enlace de Twitter roto](./reportes/DR-001-enlace-twitter-roto.md)
- [DR-001 - Reporte Word para Buggy Cars Rating](./Documentos/DR-001_Reporte_de_error_BuggyCars.docx)
- [Plantilla Word original de reporte](./Documentos/DR-001_Reporte_de_error.docx)

Este reporte corresponde a un hallazgo reproducido durante la exploracion.
Permanece en estado **Nuevo** hasta que exista una correccion y un re-test
exitoso. Los tres casos automatizados actuales no generan un defecto: se
ejecutaron en Chromium y terminaron `3 passed`.

### Como documentar un defecto usando Word

1. Copiar la plantilla [DR-001_Reporte_de_error.docx](./Documentos/DR-001_Reporte_de_error.docx)
   y cambiar el identificador a `DR-00X`.
2. Sustituir la aplicacion, descripcion, pasos, resultado esperado y resultado
   actual por datos observados en Buggy Cars Rating.
3. Completar tester, fecha, sistema operativo, navegador, prioridad, severidad
   y funcionalidad.
4. Insertar la captura real en la seccion **Impresion de pantalla**.
5. Guardar el Word con un nombre descriptivo, por ejemplo
   `DR-002_Reporte_de_error_BuggyCars.docx`.
6. Exportar a PDF solo si el examen lo solicita; conservar el `.docx` editable.

El documento Word preparado para DR-001 usa la estructura de la plantilla, pero
su contenido fue adaptado al defecto reproducible de esta aplicacion. La
plantilla original corresponde a otro proyecto y no debe entregarse sin
reemplazar sus datos.

## 8. Checklist de entrega

- [ ] Se reviso la URL y el estado de la aplicacion.
- [ ] Hay 3 casos automatizados.
- [ ] Hay 2 charters manuales.
- [ ] Cada caso tiene prioridad, precondiciones y tecnica.
- [ ] Resultado obtenido refleja una ejecucion real.
- [ ] Las capturas son legibles y no contienen secretos.
- [ ] Las trazas se conservan cuando existe un fallo.
- [ ] Cada defecto fue reproducido.
- [ ] Cada issue tiene severidad y prioridad justificadas.
- [ ] Los comandos `gh` usan etiquetas separadas.
- [ ] Los defectos corregidos tienen evidencia de re-test.
- [ ] Los issues verificados fueron cerrados.

## 9. Adaptacion rapida durante el examen

Si el examen cambia la URL o el numero de pruebas:

1. Sustituir la URL objetivo.
2. Mantener la estructura de los casos.
3. Cambiar los datos y selectores despues de observar la pagina.
4. Ajustar la cantidad de pruebas solicitada.
5. No copiar resultados de esta guia: ejecutar y documentar los nuevos.
