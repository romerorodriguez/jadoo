import { query } from "@/app/lib/db";

export async function GET() {
    try {
        const results = await query("SELECT id, nombre_lugar, descripcion, paquete, precio, imagen, categoria FROM packages");
        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching packages" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}