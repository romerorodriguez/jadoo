import { query } from "@/app/lib/db";
export async function GET() {
    try {
        const results = await query("SELECT * FROM blogs");
        console.log("Blogs obtenidos:", results);
        
        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error al obtener los blogs:", error);
        return new Response(JSON.stringify({ message: "Error al obtener los blogs" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function POST(req) {
    try {
        const { title, author, image, description } = await req.json();

        if (!title || !author || !image || !description) {
            console.error("Faltan datos:", { title, author, image, description });
            return new Response(JSON.stringify({ message: "Todos los campos son obligatorios" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const result = await query(
            "INSERT INTO blogs (title, author, image, description, date) VALUES (?, ?, ?, ?, NOW())",
            [title, author, image, description]
        );

        return new Response(JSON.stringify({ message: "Blog creado", id: result.insertId }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return new Response(JSON.stringify({ message: "Error interno del servidor" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}