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
        // Llamamos a una función matemática interna de Postgres (sign) pasándole un número.
        // Esto no requiere tablas, no requiere configuración y si las credenciales son correctas, funciona siempre.
        const { error } = await supabase.rpc('sign', { value: 1 });
        
        if (error) {
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
