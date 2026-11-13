# PROMPT MAESTRO PARA TAREAS Y EXÁMENES DE QA
**Curso 048 · Aseguramiento de la Calidad del Software**  
**Facultad de Ingeniería en Sistemas · UMG**

> **Instrucciones:** Copia el bloque de texto de abajo, rellena o ajusta los parámetros entre corchetes `[...]` según el enunciado de tu examen o tarea, y pégalo en el chat.

---

## 📌 PROMPT OPERATIVO (COPIAR A PARTIR DE AQUÍ)

```text
Actúa como un QA Engineer Senior. Lee y sigue obligatoriamente las reglas, lineamientos técnicos y plantillas documentadas en los archivos locales:
1. "GUIA_BASE_QA.md"
2. "Documentos/Casos_de_prueba.xlsx"
3. "Documentos/DR-001_Reporte_de_error.docx"

PARÁMETROS DE LA TAREA:
- Sitio Web a evaluar: [https://buggy.justtestit.org/]
- Pruebas Automatizadas: [3 pruebas en Playwright con TypeScript]
- Pruebas Manuales de Exploración: [2 pruebas exploratorias]
- Herramienta de Gestión de Bugs: GitHub Issues mediante GitHub CLI (gh)
- Defectos Verificados: [2 issues con evidencia de re-test: captura y traza]

ENTREGABLES REQUERIDOS:

1. TABLA DE CASOS DE PRUEBA (Para copiar a Excel):
   Genera la matriz con las 11 columnas oficiales de la cátedra:
   [ID | Caso de prueba | Prioridad | Precondiciones | Datos de entrada | Pasos numerados | Resultados Esperado | Resultado Obtenido | Estado prueba (Pass/Fail) | Evidencia | Técnica de diseño aplicada].
   - Divide en sección de Pruebas Automatizadas y Pruebas Manuales de Exploración.

2. CÓDIGO DE PRUEBAS AUTOMATIZADAS (Playwright + TypeScript):
   - Archivo: tests/[nombre_archivo].spec.ts
   - Buenas prácticas obligatorias:
     * Cero esperas fijas (prohibido waitForTimeout).
     * Uso de locators semánticos (getByRole, getByLabel, getByTestId).
     * Captura programática de evidencias (.screenshot) en carpeta ./evidencias/.
     * Adjuntar capturas y trazas al reporte HTML con testInfo.attach().
     * Uso de tags (@smoke, @regression).

3. REPORTES FORMALES DE DEFECTO (Formato DR-00X):
   Por cada defecto identificado (manuales y automáticos), genera la ficha técnica oficial:
   - Tabla con: Número de Bug, Tester, Título (Componente + Qué falla + Condición), Fecha, OS, Browser, Prioridad (P1-P4 justificada), Asignado a, Severidad (Crítica/Alta/Media/Baja justificada), Funcionalidad (F0X).
   - Secciones: Descripción detallada, Pasos numerados para reproducción, Resultado Esperado, Resultado Actual y Referencia a la Evidencia.

4. COMANDOS DE TERMINAL GITHUB CLI (gh):
   - Comandos 'gh issue create' con título, etiquetas (--label "bug,automated/manual") y cuerpo en Markdown.
   - Flujo de verificación de la Clase 11 para los 2 defectos verificados:
     * Comando para comentar el issue con la evidencia del re-test superado.
     * Comando para cerrar el issue en estado verificado/completado (gh issue close).
```

---

## 🛠️ GUÍA DE PARÁMETROS RÁPIDOS

Cuando tu profesor o el examen te dé nuevos datos, solo ajusta estas líneas:

| Parámetro | Ejemplo 1 (Buggy Cars) | Ejemplo 2 (Sauce Demo) | Ejemplo 3 (Practice Testing) |
| :--- | :--- | :--- | :--- |
| **Sitio Web** | `https://buggy.justtestit.org/` | `https://www.saucedemo.com/` | `https://practice.expandtesting.com/` |
| **Tests Automáticos** | `3 pruebas (Registro, Login, Overall)` | `5 pruebas (Login POM, Carrito, Checkout)` | `4 pruebas (Dinámicos, Dialogs, Tables)` |
| **Tests Manuales** | `2 exploratorias (Perfil, Comentarios)` | `2 exploratorias (Filtros, Logout)` | `2 exploratorias (Subida archivos, Typos)` |
| **Issues Verificados** | `2 defectos verificados` | `1 defecto verificado` | `2 defectos verificados` |

---

## 📂 ARCHIVOS DE REFERENCIA EN TU REPOSITORIO
* Guía Base de QA: [GUIA_BASE_QA.md](file:///C:/Users/mavas/source/repos/PracticaExamenQA/GUIA_BASE_QA.md)
* Plantilla Excel de Casos de Prueba: [Casos_de_prueba.xlsx](file:///C:/Users/mavas/source/repos/PracticaExamenQA/Documentos/Casos_de_prueba.xlsx)
* Plantilla Word de Reporte de Defectos: [DR-001_Reporte_de_error.docx](file:///C:/Users/mavas/source/repos/PracticaExamenQA/Documentos/DR-001_Reporte_de_error.docx)
