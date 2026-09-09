# Configurar sincronizacion entre dispositivos

La app ya esta preparada para trabajar con Supabase. Hasta que se carguen estas claves, funciona en modo local y cada celular o computadora guarda sus propios pedidos.

## 1. Crear el proyecto

1. Entrar a https://supabase.com.
2. Crear un proyecto nuevo.
3. Abrir `SQL Editor`.
4. Pegar y ejecutar el contenido completo de `supabase-schema.sql`.

## 2. Copiar las claves

En Supabase, ir a `Project Settings` > `API` y copiar:

- `Project URL`
- `anon public key`

Despues editar `supabase-config.js`:

```js
window.SIGNUM_SUPABASE = {
  url: "https://TU-PROYECTO.supabase.co",
  anonKey: "TU-ANON-PUBLIC-KEY",
  stateId: "signum-merch-ops"
};
```

## 3. Probar

Abrir la misma URL de la app en dos dispositivos. Cuando el indicador diga `Datos en vivo`, un pedido cargado desde Ventas en el celular aparece en Planeamiento en la computadora.
