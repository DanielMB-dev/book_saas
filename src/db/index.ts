import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario si tu Supabase requiere SSL
  },
});

// Crear la instancia de drizzle
export const db = drizzle(pool);

// Función auxiliar para probar la conexión
export async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa a PostgreSQL:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
    return false;
  }
}