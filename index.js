import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

app.use(cors());

const supabaseUrl = 'https://fhzgeiitkypgdreblixg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api/status', async (req, res) => {
    try {
        const { error } = await supabase.from('_status_check').select('*').limit(1);

        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en el puerto ${PORT}`));