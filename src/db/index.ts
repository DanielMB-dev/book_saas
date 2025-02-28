import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Configuración del pool de conexiones
const pool = new Pool({
  host: 'localhost',
  port: 54322,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres'
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