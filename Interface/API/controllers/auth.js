

//For Register Page
export const registerView = (req, res) => {
    res.render("register", {
    } );
}

// For View 
export const loginView = (req, res) => {
    res.render("login", {
    } );
}


// export async function signup (req, res) {
//     const fields = req.body
//     const jwt = await AuthServiceInstance.signup({ fields })
//     if (!jwt) {
        
//         res.redirect('/auth/register')
//     }
//     res.redirect('/auth/login')
// }

// export const logout = async (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// }


  



