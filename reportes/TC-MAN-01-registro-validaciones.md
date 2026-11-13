# TC-MAN-01 - Registro y validaciones

| Campo | Detalle |
|---|---|
| Charter | Explorar las validaciones del formulario de registro durante 15 minutos |
| Prioridad | P1 |
| Precondiciones | La aplicación está disponible y el usuario de prueba no existe |
| Datos usados | Campos vacíos, login corto o con caracteres especiales, contraseñas distintas y datos válidos |
| Resultado esperado | Los datos inválidos se rechazan, el botón permanece deshabilitado y los datos válidos permiten registrarse |
| Resultado observado | Pendiente de ejecución manual |
| Estado | Pendiente |
| Evidencia | Pendiente de captura |
| Técnica | Clases de equivalencia y valores frontera |

## Flujo de exploración

1. Abrir `/register`.
2. Probar campos vacíos.
3. Probar login corto y caracteres especiales.
4. Probar nombre, apellido y contraseña vacíos.
5. Probar confirmación de contraseña diferente.
6. Verificar el estado del botón `Register` en cada caso.
7. Cancelar el formulario, si existe la opción.
8. Ejecutar un registro válido.
9. Intentar registrar nuevamente el mismo usuario.

