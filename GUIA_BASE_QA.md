# GUÍA BASE Y PROMPT MAESTRO — ASEGURAMIENTO DE LA CALIDAD (QA)
**Curso 048 · Aseguramiento de la Calidad del Software**  
**Facultad de Ingeniería en Sistemas · Universidad Mariano Gálvez de Guatemala**

---

## 🎯 CÓMO USAR ESTA GUÍA (PROMPT MAESTRO)

Cuando necesites resolver una tarea, escribir tests, diseñar casos de prueba o responder preguntas de examen, copia y envía este comando:

```text
Actúa como experto en QA y sigue estrictamente las convenciones de la GUIA_BASE_QA.md.
Basándote en la [CLASE NÚMERO (1 al 12)], realiza lo siguiente:
- Tarea / Requerimiento: [Describir qué necesitas: p. ej., test de login, reporte de bug, caso de prueba, etc.]
- Aplicación objetivo: [DemoBlaze / SauceDemo / Practice ExpandTesting / Otra URL]
- Formato esperado: [Código TypeScript Playwright / Documento Markdown con plantilla oficial]
```

---

## 🗺️ MAPA CURRICULAR Y RESUMEN POR CLASE

| Clase | Aplicación Base | Tema Teórico Principal | Práctica / Código Playwright | Artefacto Entregable |
| :---: | :--- | :--- | :--- | :--- |
| **01** | DemoBlaze | Fundamentos de Calidad (Juran, Crosby), ISO 9001, rol QA. | Setup Playwright + TS, `playwright.config.ts`, primer test funcional. | `tests/clase01.spec.ts` |
| **02** | DemoBlaze | Cultura de Calidad, ISO 25010 (calidad en uso), QA vs QC. | Navegación (`goto`, `goBack`), esperas (`waitForURL`), capturas (`page.screenshot`). | `tests/clase02.spec.ts`, `evidencias/` |
| **03** | DemoBlaze | Niveles de prueba (Unitarias, Integración, Sistema, UAT), tipos de prueba. | Locators semánticos (`getByRole`, `getByText`, CSS), filtros `.filter()`, negación `.not`. | `tests/clase03.spec.ts`, `casos-de-prueba/TC-001.md` |
| **04** | DemoBlaze | 7 Principios ISTQB, proceso de pruebas en 5 fases, roles (SDET, DevOps QA). | Actions (`fill`, `click`), gestión de alertas con `page.on('dialog')`, reintentos de login. | `tests/clase04.spec.ts`, `tareas/tarea-04.md` |
| **05** | SauceDemo | Técnicas de diseño: Clases de Equivalencia (CE), Valores Frontera (BVA), Tablas de Decisión. | Aserciones (`toBeVisible`, `toHaveText`, regex `toMatch`), `expect.soft()`. | `tests/clase05.spec.ts`, `casos-de-prueba/tabla-decision-checkout.md` |
| **06** | SauceDemo | Testing ágil (Scrum, Whole Team), Cuadrante Ágil, ROI y costo de bugs. | **Page Object Model (POM)**: Clases `LoginPage`, `InventoryPage`, `CartPage`. | `pages/*.ts`, `tests/clase06.spec.ts` |
| **07** | SauceDemo | Cadena causal: **Error humano $\rightarrow$ Defecto (Bug) $\rightarrow$ Fallo (Failure)**, ISO 25010 (8 atributos). | Evidencias profesionales: screenshots por elemento, video y Trace Viewer. | `tests/clase07.spec.ts`, `reportes/DR-001.md` |
| **08** | SauceDemo | Proceso Fundamental del Testing + Criterios de Salida, SQA Plan, Métricas. | Hooks de suite (`beforeEach`, `afterEach`), `helpers/auth.ts`, paralelismo (`mode: 'parallel'`). | `helpers/auth.ts`, `tests/clase08.spec.ts`, `documentos/sqa-plan-saucedemo.md` |
| **09** | SauceDemo | Pirámide de pruebas (Mike Cohn), qué automatizar vs manual, diseño de datos. | **Fixtures** personalizados (`base.extend`), pruebas parametrizadas en loops. | `fixtures/index.ts`, `tests/clase09.spec.ts` |
| **10** | SauceDemo | Manual vs Automatizada, Smoke vs Sanity, UAT, motores de navegador (Blink, Gecko, WebKit). | Multi-browser (Chromium, Firefox, Safari, Móvil), Tags (`@smoke`, `@regression`, `--grep`). | `playwright.config.ts`, `clase10-smoke.spec.ts`, `clase10-regression.spec.ts` |
| **11** | Practice ExpandTesting | Ciclo de vida del defecto, severidad vs prioridad, clasificación, Bug Trackers (GitHub Issues). | Reporte HTML con adjuntos (`testInfo.attach`), bugs conocidos (`test.fail()`, `@bug`). | `tests/clase11.spec.ts`, `reportes/bug-report-clase11.md`, GitHub Issues |
| **12** | Practice ExpandTesting | Probar vs Depurar, 5 fases del debug, tests frágiles (*flaky*), Caja Blanca vs Caja Negra, Accesibilidad. | Inspector (`--debug`), corrección de flakiness, accesibilidad con `@axe-core/playwright`, GitHub Actions CI. | `tests/clase12.spec.ts`, `reportes/analisis-tests-fragiles.md`, `.github/workflows/` |

---

## 📐 REGLAS Y CONVENCIONES DE CÓDIGO (PLAYWRIGHT + TS)

1. **Selectores Robustos vs Frágiles:**
   - ✅ **Preferir siempre:** `page.getByRole()`, `page.getByText()`, `page.getByLabel()`, `page.getByTestId()`.
   - ⚠️ **Aceptables si no hay semántica:** `page.locator('#id')`, `page.locator('.clase')`.
   - ❌ **Evitar rotundamente:** XPath absolutos (`/html/body/div[1]/...`) o selectores ligados a posiciones volátiles.

2. **Manejo de Esperas (Anti-patrón prohibido):**
   - ❌ **Nunca usar `page.waitForTimeout(ms)`** en tests definitivos (crea tests frágiles y lentos).
   - ✅ **Usar aserciones web-first con auto-reintento:**
     ```typescript
     await expect(page.locator('#elemento')).toBeVisible({ timeout: 15000 });
     ```
   - ⚠️ **Gotcha con `.count()` y `.isVisible()`:**
     Estas funciones retornan de inmediato sin esperar. Si esperas que algo aparezca, usa `expect(locator).toHaveCount(n)` o `await expect(locator.first()).toBeVisible()`.

3. **Manejo de Diálogos / Alertas (`alert`, `confirm`, `prompt`):**
   - El listener `page.on('dialog', ...)` o `page.once('dialog', ...)` **debe registrarse ANTES** de la acción que dispara el diálogo:
     ```typescript
     page.once('dialog', async (dialog) => {
       console.log(`Mensaje: ${dialog.message()}`);
       await dialog.accept();
     });
     await page.locator('#btn-alerta').click();
     ```

4. **Capturas de Evidencias:**
   - De página completa: `await page.screenshot({ path: './evidencias/foto.png', fullPage: true });`
   - De un elemento específico: `await page.locator('.tarjeta').screenshot({ path: './evidencias/elemento.png' });`

5. **Soft Assertions (Aserciones Blandas):**
   - Para no detener el test al primer fallo y validar múltiples propiedades:
     ```typescript
     await expect.soft(locator).toBeVisible();
     await expect.soft(locator).toHaveText('Texto');
     ```

---

## 🏛️ PATRONES DE ARQUITECTURA DEL CURSO

### 1. Page Object Model (POM) — [Clase 6]
Cada página o componente tiene su propia clase en `pages/`:
```typescript
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(expectedText: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
```

### 2. Helpers Modulares Reutilizables — [Clase 8 y 12]
```typescript
// helpers/auth.ts
import { Page } from '@playwright/test';

export async function loginAs(page: Page, username: string) {
  const passwords: Record<string, string> = {
    'standard_user': 'secret_sauce',
    'locked_out_user': 'secret_sauce',
    'problem_user': 'secret_sauce',
    'performance_glitch_user': 'secret_sauce',
  };
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill(username);
  await page.locator('#password').fill(passwords[username] ?? 'secret_sauce');
  await page.locator('#login-button').click();
}
```

### 3. Fixtures Personalizados con Inyección — [Clase 9]
```typescript
// fixtures/index.ts
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.navigate();
    await use(lp);
  },
  inventoryPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);
    const ip = new InventoryPage(page);
    await use(ip);
  },
});

export { expect } from '@playwright/test';
```

### 4. Tests Parametrizados (Data-Driven Testing) — [Clase 9]
```typescript
const usuariosDeLogin = [
  { username: 'standard_user', password: 'secret_sauce', valido: true, desc: 'usuario válido' },
  { username: 'locked_out_user', password: 'secret_sauce', valido: false, desc: 'usuario bloqueado' },
  { username: '', password: '', valido: false, desc: 'campos vacíos' }
];

for (const datos of usuariosDeLogin) {
  test(`Login: ${datos.desc}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill(datos.username);
    await page.locator('#password').fill(datos.password);
    await page.locator('#login-button').click();
    if (datos.valido) {
      await expect(page).toHaveURL(/inventory/);
    } else {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }
  });
}
```

---

## 📋 PLANTILLAS OFICIALES DE ENTREGABLES DEL CURSO

### Plantilla 1: Caso de Prueba (`casos-de-prueba/TC-XXX.md`)
```markdown
# Caso de Prueba - TC-001

| Campo | Detalle |
| :--- | :--- |
| **ID** | TC-001 |
| **Título** | Agregar un producto al carrito en DemoBlaze |
| **Tipo de Prueba** | Funcional / Sistema |
| **Precondición** | El usuario está en la página principal y el catálogo muestra productos |
| **Datos de Prueba** | Producto: "Samsung galaxy s6" |
| **Pasos** | 1. Clic en el nombre del producto.<br>2. Clic en el botón "Add to cart".<br>3. Aceptar el diálogo de confirmación.<br>4. Navegar a /cart.html. |
| **Resultado Esperado** | El producto aparece listado en la tabla del carrito con su nombre y precio correcto. |
| **Resultado Obtenido** | Pass (conforme a lo esperado en la ejecución automatizada) |
| **Estado** | Pass |
```

### Plantilla 2: Reporte de Defecto Formal (`reportes/bug-report-clase11.md` / `DR-XXX.md`)
```markdown
# Bug Report - BR-001

**Título:** [Componente] + [Qué falla] + [Bajo qué condición]  
**Fecha:** 2026-11-12  
**Reportado por:** [Tu Nombre / Carné]  
**Ambiente:** Windows 11, Chromium 120, https://www.saucedemo.com  

## Descripción
Descripción clara del comportamiento anómalo detectado durante las pruebas.

## Severidad y Prioridad
* **Severidad:** [Crítica / Alta / Media / Baja] — (Justificar impacto técnico)
* **Prioridad:** [P1 / P2 / P3 / P4] — (Justificar urgencia de negocio)

## Frecuencia
[Siempre / Intermitente (ej: 7 de cada 10) / Una sola vez]

## Pasos para reproducir
1. Ir a la URL ...
2. Iniciar sesión con ...
3. Hacer clic en ...

## Resultado esperado
Lo que el requisito o especificación dicta que debe suceder.

## Resultado obtenido
Lo que realmente ocurrió (error en pantalla, timeout, elemento bloqueado).

## Evidencia
* Screenshot: `evidencias/fallo-nombre.png`
* Video/Traza: `test-results/.../trace.zip`

## Notas adicionales
Detalles sobre consola del navegador, peticiones HTTP con 4xx/5xx o información relevante.
```

### Plantilla 3: Tabla de Decisión (`casos-de-prueba/tabla-decision-checkout.md`)
```markdown
# Tabla de Decisión: Proceso de Checkout

| Condiciones / Entradas | R1 | R2 | R3 | R4 | R5 | R6 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Usuario con sesión activa | Sí | Sí | Sí | Sí | No | No |
| Carrito contiene productos | Sí | Sí | No | No | Sí | No |
| Formulario de envío completo | Sí | No | Sí | No | N/A | N/A |
| **Acciones / Salidas** | | | | | | |
| Permitir continuar a pago (Overview) | **X** | - | - | - | - | - |
| Mostrar error de formulario incompleto | - | **X** | - | - | - | - |
| Mostrar advertencia de carrito vacío | - | - | **X** | **X** | - | - |
| Redirigir a login obligatorio | - | - | - | - | **X** | **X** |
```

### Plantilla 4: SQA Plan Mínimo (`documentos/sqa-plan-saucedemo.md`)
```markdown
# Plan de Aseguramiento de la Calidad (SQA Plan Mínimo)

* **1. Propósito:** Garantizar que los flujos críticos de compra y autenticación de la plataforma operen sin defectos antes de cada pase a producción.
* **2. Alcance:** 
  * *Dentro del alcance:* Login, catálogo, carrito de compras, cálculo de orden y checkout.
  * *Fuera del alcance:* Procesamiento de pasarelas de pago reales y pruebas de rendimiento con alta concurrencia.
* **3. Herramientas y Tecnologías:** Playwright con TypeScript, GitHub Actions para CI, Trace Viewer para diagnóstico.
* **4. Criterios de Salida:** 100% de los tests críticos de regresión en estado aprobado (Pass) en Chromium y Firefox, con tasa de fragilidad inferior al 2%.
```

### Plantilla 5: Análisis de Test Frágil (*Flaky*) (`reportes/analisis-tests-fragiles.md`)
```markdown
# Análisis de Tests Frágiles

## Caso 1: Elemento dinámico con tiempo de renderizado variable
* **Test y archivo:** `'Esperar elemento de carga lenta'` en `tests/clase12.spec.ts`
* **Cómo se manifestaba:** Falla intermitente (3 de cada 10 ejecuciones) con error `Timeout 5000ms exceeded`.
* **Diagnóstico:** El backend responde entre 3.4s y 5.2s. La aserción por defecto esperaba 5s y el test usaba `waitForTimeout(3000)`.
* **Corrección aplicada:** Se eliminó la pausa fija y se aplicó espera explícita sobre el locator:
  ```typescript
  // Antes (Frágil):
  await page.waitForTimeout(3000);
  expect(await page.locator('#finish').isVisible()).toBe(true);

  // Después (Robusto):
  await expect(page.locator('#finish')).toBeVisible({ timeout: 15000 });
  ```
* **Confirmación:** 10 corridas consecutivas ejecutadas con `npx playwright test --repeat-each=10`, 10 passed (0 fallos).
```

---

## 🧠 DICCIONARIO TEÓRICO PARA EXAMEN DE QA

* **Calidad del Software:**
  * **Joseph Juran:** *"Adecuación al uso"* (cumple la necesidad real del usuario).
  * **Philip Crosby:** *"Conformidad con los requisitos"* (cumple la especificación escrita).
* **QA vs QC:**
  * **QA (Aseguramiento):** Proactivo, enfocado al proceso, previene defectos durante el desarrollo.
  * **QC (Control):** Reactivo, enfocado al producto terminado, detecta defectos ejecutando pruebas.
* **Cadena Causal de Defectos:**
  $$\text{Error Humano (equivocación mental)} \longrightarrow \text{Defecto / Bug (código incorrecto)} \longrightarrow \text{Fallo / Failure (síntoma en ejecución)}$$
  *(Nota clave: un defecto no siempre causa fallo si nunca se ejecuta esa rama; y un test que pasa no demuestra ausencia de defectos).*
* **Severidad vs Prioridad:**
  * **Severidad:** Impacto técnico del defecto en el sistema (Crítica, Alta, Media, Baja). La asigna el QA.
  * **Prioridad:** Urgencia comercial/negocio de solucionarlo (P1, P2, P3, P4). La decide el Product Owner / Líder.
  * *(Ejemplo clásico: un error ortográfico en el nombre del CEO en la portada tiene Severidad Baja pero Prioridad P1).*
* **Smoke Testing vs Sanity Testing:**
  * **Smoke Testing:** Amplio pero superficial. Se corre **antes** de probar a fondo para ver si el build es estable.
  * **Sanity Testing:** Angosto pero profundo. Se corre **después** de un fix puntual para verificar solo el área modificada.
* **Verificación vs Validación:**
  * **Verificación:** *"¿Construimos el sistema correctamente?"* (Cumple la especificación técnica).
  * **Validación:** *"¿Construimos el sistema correcto?"* (Satisface la necesidad real del cliente).
* **Pruebas Estáticas vs Dinámicas:**
  * **Estáticas:** Sin ejecutar el código (Code reviews, linters, TypeScript `tsc --noEmit`).
  * **Dinámicas:** Ejecutando el código contra entradas (Playwright, Jest).
* **Caja Negra vs Caja Blanca:**
  * **Caja Negra:** Se prueban entradas y salidas sin conocer el código interno (CE, Valores Límite, Tablas de Decisión, Transición de Estados).
  * **Caja Blanca:** Se conoce el código interno y se diseñan pruebas según sentencias, ramas y caminos (Complejidad Ciclomática $= \text{decisiones} + 1$).
* **Métricas Clave:**
  * **DRE (Defect Removal Efficiency):** $\frac{\text{Defectos antes de liberar}}{\text{Defectos totales (antes + después)}} \times 100$.
  * **Densidad de defectos:** $\frac{\text{Defectos encontrados}}{\text{KLOC (miles de líneas de código)}}$.
  * **Tasa de fragilidad:** $\frac{\text{Tests con resultados inconsistentes}}{\text{Tests totales}} \times 100$ (Meta $< 2\%$).
* **Accesibilidad (a11y) y WCAG:**
  * 4 Principios: **P**erceptible, **O**perable, **C**omprensible, **R**obusto (POUR). Niveles: A, AA (estándar), AAA. Herramienta: `@axe-core/playwright`.
