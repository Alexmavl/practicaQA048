# TC-MAN-02 - Navegación y funcionalidad autenticada

| Campo | Detalle |
|---|---|
| Charter | Explorar la navegación autenticada y las operaciones principales de calificación |
| Prioridad | P1 |
| Precondiciones | Existe una cuenta válida y la aplicación está disponible |
| Datos usados | Credenciales válidas, un vehículo disponible, voto y comentario válido/vacío |
| Resultado esperado | El login, logout, perfil, voto y comentario funcionan; los datos se conservan al recargar y no se permiten votos duplicados si aplica |
| Resultado observado | Pendiente de ejecución manual |
| Estado | Pendiente |
| Evidencia | Pendiente de capturas y traza si falla |
| Técnica | Pruebas exploratorias y transición de estados |

## Flujo de exploración

1. Iniciar sesión con una cuenta válida.
2. Verificar el acceso al perfil.
3. Consultar la lista o detalle de vehículos.
4. Emitir un voto o calificación.
5. Agregar un comentario válido.
6. Probar un comentario vacío o demasiado largo.
7. Recargar y verificar la persistencia.
8. Intentar votar nuevamente el mismo vehículo.
9. Cerrar sesión y comprobar el acceso posterior.
10. Usar los botones de navegación del navegador y registrar el comportamiento.

