const getIndexPage = (req, res) => {

    res.render("index", {
        link: "index",
    });
};

const getAboutPage = (req, res) => {
    res.render("about", {
        link: "about",
    });
};

const getRegisterPage = (req, res) => {
    res.render("register", {
        link: "register",
    });
};

const getLoginPage = (req, res) => {
    res.render("login", {
        link: "login",
    });
};

const getLogout = (req, res) => {
    res.cookie("jwt", " ", {
        maxAge: 1,                  // logout a tiklayinca 1 miisaniye icerisinde token sil dedik ve token silindigi icin kullanıcı cikis yapmis oldu.
    });
    res.redirect("/");
}


export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout};