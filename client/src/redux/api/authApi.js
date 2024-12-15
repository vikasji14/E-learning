const url = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const token = localStorage.getItem('token');

export const registerUser = async (user) => {
    try {
        const response = await fetch(`${url}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'api-key': apiKey,
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
            headers: {
                "Content-Type": "application/json",
                'api-key': apiKey ,
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
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey ,
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
            headers: {
                "content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey ,
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
            headers: {
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey ,
            },
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
            headers: {
                'Content-Type': 'application/json',  // Set Content-Type to JSON
                'Authorization': `Bearer ${token}`,
                'api-key': apiKey ,
            },
            body:JSON.stringify(data),
        })
        response = await response.json();
        return response;
    
    } catch (e) {
        console.log(e);
    }
}






