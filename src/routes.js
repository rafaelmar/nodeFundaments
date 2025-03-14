export const routes = [
    {
        method: "GET",
        path: "/users",
        handler: (req, res) => {
            return res.end("Listagem de usuarios")
        }
    },
    {
        method: "POST",
        path: "/users",
        handler: (req, res) => {
            return res.end("Criando um usuario")
        }
    },
    {
        method: "PUT",
        path: "/users/:id",
        handler: (req, res) => {
            return res.end("Modificando um usuario")
        }
    },
    {
        method: "DELETE",
        path: "/users/:id",
        handler: (req, res) => {
            return res.end("Criando um usuario")
        }
    }
]