export const login = async (req, res) => {
    try {
        if(!req.user) return res.status(400).send({ status: "error", error: "Credenciales incorrectas" });
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            cart: req.user.cart,
            role: req.user.role
        }
        res.send({ status: "success", payload: req.session.user });
    } catch (error) {
        req.logger.error(`The cause is '${error}' in ${req.method} at ${req.url} - ${new Date().toString()} `);
        res.status(401).send({ status: "error", error: "Credenciales incorrectas" });
    }
}

export const failLogin = (req, res) => {
    res.send({ status: "error", message: "Failed login" });
}

export const register = async (req, res) => {
    res.send({ status: "success", message: "User registered" });
}

export const failRegister = (req, res) => {
    res.send({ status: "error", message: "Failed register" });
}

export const logout = (req, res) => {
    req.session.destroy(error => {
        if (error) return res.send({ status: "Logout ERROR", body: error });
        res.redirect("/login");
    })
}

export const githubcallback = async (req, res) => {
    const user = req.user;
    delete user.password;
    req.session.user = user;
    res.redirect("/products");
}

export const current = (req, res) => {
    const user = req.session.user;
    if (user) {
        res.send({ status: "success", user });
    } else {
        res.send({ status: "error", message: "No hay un usuario logueado" });
    }
}