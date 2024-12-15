

const url = "http://localhost:8080/api/v1"
// const url = 'https://e-learning-6ppv.onrender.com/api/v1'

export const registerUser = async (user) => {
    try {
        const response = await fetch(`${url}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (user) => {
    try {
        const response = await fetch(`${url}/user/login`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const userLoggedOut = async () => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        const response = await fetch(`${url}/user/logout`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const userProfile = async () => {
    try {
        const response = await fetch(`${url}/user/profile`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "content-Type": "application/json",
            },
        })

        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}


export const updateUser = async (formData) => {
    console.log("fd",formData)
    try {
        let response = await fetch(`${url}/user/profile/update`, {
            method: "PUT",
            credentials: 'include',

            body:formData,
        })
        response = await response.json();
        return response;
    
    } catch (e) {
        console.log(e);
    }
}

export const updateBioChange = async (data) => {
    try {
        let response = await fetch(`${url}/user/profile/bio`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',  // Set Content-Type to JSON
            },
            body:JSON.stringify(data),
        })
        response = await response.json();
        return response;
    
    } catch (e) {
        console.log(e);
    }
}






