import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Asegurar existencia del directorio de evidencias
test.beforeAll(() => {
  if (!fs.existsSync('./evidencias')) {
    fs.mkdirSync('./evidencias', { recursive: true });
  }
});

test.describe('Suite Automatizada - Buggy Cars Rating (https://buggy.justtestit.org/)', () => {

  test('TC-AUT-01: Registro exitoso de nuevo usuario con datos válidos', { tag: ['@smoke', '@registro'] }, async ({ page }, testInfo) => {
    const timestamp = Date.now().toString().slice(-6);
    const username = `qa_user_${timestamp}`;
    const password = 'Password123!';

    // 1. Navegar a la página de registro
    await page.goto('https://buggy.justtestit.org/register');
    await expect(page).toHaveTitle(/Buggy Cars Rating/i);

    // 2. Completar formulario con locators semánticos y por id
    await page.locator('#username').fill(username);
    await page.locator('#firstName').fill('Carlos');
    await page.locator('#lastName').fill('QA');
    await page.locator('#password').fill(password);
    await page.locator('#confirmPassword').fill(password);

    // 3. Captura previa al envío
    await page.screenshot({ path: './evidencias/TC-AUT-01-registro-formulario.png', fullPage: true });

    // 4. Enviar formulario
    await page.getByRole('button', { name: 'Register' }).click();

    // 5. Aserción web-first del mensaje de éxito
    const successBanner = page.locator('.result.alert-success');
    await expect(successBanner).toBeVisible({ timeout: 15000 });
    await expect(successBanner).toContainText('Registration is successful');

    // 6. Captura de evidencia final
    const evidenciaPath = './evidencias/TC-AUT-01-registro-exitoso.png';
    const captura = await page.screenshot({ path: evidenciaPath, fullPage: true });

    // 7. Adjuntar al reporte HTML de Playwright
    await testInfo.attach('evidencia-registro', {
      body: captura,
      contentType: 'image/png',
    });
    await testInfo.attach('datos-usuario-registrado', {
      body: `Usuario: ${username} | Fecha: ${new Date().toISOString()}`,
      contentType: 'text/plain',
    });

    console.log(`TC-AUT-01 completado exitosamente para el usuario: ${username}`);
  });

  test('TC-AUT-02: Intento de login con contraseña incorrecta', { tag: ['@regression', '@login'] }, async ({ page }, testInfo) => {
    // 1. Navegar al Home
    await page.goto('https://buggy.justtestit.org/');
    await expect(page).toHaveTitle(/Buggy Cars Rating/i);

    // 2. Ingresar usuario con password errónea
    await page.locator('input[name="login"]').fill('standard_test_qa');
    await page.locator('input[name="password"]').fill('PasswordErronea999!');

    // 3. Clic en botón Login
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Verificar mensaje de error
    const errorMsg = page.locator('.label-warning');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    await expect(errorMsg).toContainText('Invalid username/password');

    // 5. Captura de evidencia
    const evidenciaPath = './evidencias/TC-AUT-02-login-fallido.png';
    const captura = await page.screenshot({ path: evidenciaPath });

    await testInfo.attach('evidencia-login-fallido', {
      body: captura,
      contentType: 'image/png',
    });

    console.log('TC-AUT-02 completado: Acceso denegado con mensaje visible');
  });

  test('TC-AUT-03: Carga y verificación de la tabla del ranking general (Overall Rating)', { tag: ['@smoke', '@overall'] }, async ({ page }, testInfo) => {
    // 1. Navegar al Home
    await page.goto('https://buggy.justtestit.org/');

    // 2. Navegar a Overall Rating mediante enlace o imagen
    const overallLink = page.locator('a[href="/overall"]');
    await overallLink.first().click();
    await page.waitForURL('**/overall');
    await expect(page).toHaveURL(/overall/);

    // 3. Verificar que la tabla de vehículos está presente
    const tablaVehiculos = page.locator('table.cars.table');
    await expect(tablaVehiculos).toBeVisible({ timeout: 15000 });

    // 4. Verificar encabezados de columnas requeridas
    await expect(tablaVehiculos.locator('thead')).toContainText('Make');
    await expect(tablaVehiculos.locator('thead')).toContainText('Model');
    await expect(tablaVehiculos.locator('thead')).toContainText('Rank');
    await expect(tablaVehiculos.locator('thead')).toContainText('Votes');

    // 5. Verificar que contenga filas con datos
    const filas = tablaVehiculos.locator('tbody tr');
    await expect(filas.first()).toBeVisible({ timeout: 10000 });
    const cantidadFilas = await filas.count();
    expect(cantidadFilas).toBeGreaterThanOrEqual(5);

    // 6. Captura de evidencia
    const evidenciaPath = './evidencias/TC-AUT-03-overall-table.png';
    const captura = await page.screenshot({ path: evidenciaPath, fullPage: true });

    await testInfo.attach('evidencia-overall-table', {
      body: captura,
      contentType: 'image/png',
    });
    await testInfo.attach('conteo-vehiculos', {
      body: `Total de filas renderizadas en página 1: ${cantidadFilas}`,
      contentType: 'text/plain',
    });

    console.log(`TC-AUT-03 completado: ${cantidadFilas} vehículos listados en Overall Rating`);
  });

});
