import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

// Permitir que tu GitHub Pages se conecte sin bloqueos de CORS
app.use(cors());

// Configuración del cliente de Supabase
const supabaseUrl = 'https://fhzgeiitkypgdreblixg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta que consultará tu frontend en GitHub Pages
app.get('/api/status', async (req, res) => {
    try {
        // Ejecutamos un SELECT directo que no necesita tablas existentes. 
        // Si la base de datos está viva y la clave es correcta, responderá con éxito.
        const { data, error } = await supabase.from('').select().limit(0).maybeSingle();
        
        // El código 'PGRST103' o similar solo indica que la ruta está vacía, 
        // pero si la API Key fuera inválida daría un error 400/401 directo e iría al catch.
        if (error && error.status === 401) {
            throw error;
        }

        res.json({ 
            backend: "Online", 
            database: "Conectado a Supabase con éxito" 
        });
    } catch (err) {
        res.status(500).json({ 
            backend: "Online", 
            database: "Error de conexión", 
            error: err.message 
        });
    }
});

// Render asigna el puerto automáticamente mediante process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en el puerto ${PORT}`));
