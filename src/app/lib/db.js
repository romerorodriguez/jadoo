import mysql from "mysql2/promise";

const connection = mysql.createPool({
    host: "localhost",
    port: 3309,
    user: "jessica",
    password: "jessica", 
    database: "jadoo",
});

export async function query(sql, values) {
    try {
        const [rows] = await connection.execute(sql, values);
        return rows;
    } catch (error) {
        throw new Error(`Error executing query: ${error.message}`);
    }
}