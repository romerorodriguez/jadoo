import { query } from "@/app/lib/db";

export async function POST(req) {
    try {
        const { nombre, correo, contrasena } = await req.json();

        // Validaciones de campos
        if (!nombre) {
            return new Response(JSON.stringify({ message: "Agregue un nombre de usuario" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (!correo) {
            return new Response(JSON.stringify({ message: "Agregue un correo" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (!contrasena) {
            return new Response(JSON.stringify({ message: "Agregue una contraseña" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Insertar nuevo usuario en la base de datos
        await query("INSERT INTO admin (nombre, correo, contrasena) VALUES (?, ?, ?)", [nombre, correo, contrasena]);

        return new Response(JSON.stringify({ message: "Cuenta creada con éxito" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error en el servidor" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}