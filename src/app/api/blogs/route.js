import { query } from "@/app/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("id");

    try {
        let results;
        if (blogId) {
            results = await query("SELECT * FROM blogs WHERE id = ?", [blogId]);
            if (results.length === 0) {
                return new Response(JSON.stringify({ message: "Blog no encontrado" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                });
            }
            return new Response(JSON.stringify(results[0]), {
                headers: { "Content-Type": "application/json" },
            });
        } else {
            results = await query("SELECT * FROM blogs");
            return new Response(JSON.stringify(results), {
                headers: { "Content-Type": "application/json" },
            });
        }
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

export async function PUT(req) {
    try {
        const { id, title, author, image, description } = await req.json();

        if (!id || !title || !author || !image || !description) {
            return new Response(JSON.stringify({ message: "Todos los campos son obligatorios" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const result = await query(
            "UPDATE blogs SET title = ?, author = ?, image = ?, description = ? WHERE id = ?",
            [title, author, image, description, id]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ message: "Blog no encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Blog actualizado con éxito" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error al actualizar el blog:", error);
        return new Response(JSON.stringify({ message: "Error al actualizar el blog" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return new Response(JSON.stringify({ message: "ID del blog requerido" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const result = await query("DELETE FROM blogs WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ message: "No se encontró el blog" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Blog eliminado con éxito" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error eliminando el blog:", error);
        return new Response(JSON.stringify({ message: "Error al eliminar el blog" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}