import jwtAuthAxios from "./auth/jwtAuth";

const authServices = {};

authServices.getCurrentUser = async () => {
    const {data} = await jwtAuthAxios.get("/auth");
    return data;
};

//loginCreds must be {email: "abc@example.com", password: "ABC123DEF"}
authServices.signIn = async (loginCreds) => {
    try {
        const {data} = await jwtAuthAxios.post('/login', loginCreds);
        return data;
    } catch (error) {
        console.log(error, " error error", error.message)
    }
    
    
};

export default authServices;