import { query } from "@/app/lib/db";

export async function POST(req) {
    try {
        const { correo, contrasena } = await req.json();

        if (!correo || !contrasena) {
            return new Response(JSON.stringify({ message: "Complete todos los campos" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await query("SELECT * FROM admin WHERE correo = ?", [correo]);

        if (user.length === 0) {
            return new Response(JSON.stringify({ message: "Correo incorrecto, vuelva a intentarlo" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (user[0].contrasena !== contrasena) {
            return new Response(JSON.stringify({ message: "Contraseña incorrecta, vuelva a intentarlo" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Inicio de sesión exitoso" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error en el servidor" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}