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

export async function POST(req) {
    try {
        const { category, title, description, package: pkg, price, image } = await req.json();
        
        if (!category || !title || !description || !pkg || !price || !image) {
            return new Response(JSON.stringify({ message: "Todos los campos son obligatorios" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        const result = await query(
            "INSERT INTO packages (categoria, nombre_lugar, descripcion, paquete, precio, imagen) VALUES (?, ?, ?, ?, ?, ?)",
            [category, title, description, pkg, price, image]
        );              
        return new Response(JSON.stringify({ message: "Paquete agregado con éxito", id: result.insertId }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error al agregar el paquete" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params; // Obtener el ID desde los parámetros de la URL

        if (!id) {
            return new Response(JSON.stringify({ message: "El ID es obligatorio" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const result = await query("DELETE FROM packages WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ message: "Paquete no encontrado" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Paquete eliminado correctamente" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error al eliminar el paquete" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}