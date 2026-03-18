# Instrucciones seguras para compartir tu API Key

## Opción 1: Archivo .env.local (RECOMENDADA)

1. En tu computadora local, crea un archivo llamado `.env.local` en la carpeta `buenperro-files/`

2. Agrega tu API Key así:
```
CJ_API_KEY=tu_api_key_aqui
```

3. Guarda el archivo

4. Yo lo leeré desde el workspace y ejecutaré el script

---

## Opción 2: Variable de entorno temporal

Si estás en la terminal del servidor:

```bash
export CJ_API_KEY="tu_api_key_aqui"
```

Luego ejecuto el script que lee esa variable.

---

## ⚠️ IMPORTANTE DE SEGURIDAD

- NUNCA commitees `.env.local` a GitHub (ya está en .gitignore)
- La API Key permite acceder a tu cuenta de CJ - guárdala segura
- Después de usarla, puedes revocarla en CJ y generar una nueva

---

## ¿Dónde encuentro mi API Key en CJ?

1. Ve a https://cjdropshipping.com
2. Inicia sesión
3. Ve a tu perfil (icono de usuario arriba a la derecha)
4. Click en "API" o "API Key"
5. Copia la key

---

## Una vez tengas el archivo listo

Dime "listo" y yo:
1. Leo la API Key del archivo
2. Busco productos reales de CJ por categoría
3. Los mapeo a tus SKUs (CJDOG001, CJCAT001, etc.)
4. Descargo todas las imágenes automáticamente
5. Optimizo para web

¿Entendido? Crea el archivo `.env.local` y dime cuando esté listo. 🚀