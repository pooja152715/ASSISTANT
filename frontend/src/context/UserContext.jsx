// import axios from "axios"
// import { createContext, useEffect, useState } from "react"

// export const userDataContext=createContext()
// function UserContext({children}){
//     const serverUrl="https://assistant-lime-xi.vercel.app"
//     const [userData,setUserData]=useState(null)
//         const [frontendImage, setFrontendImage] = useState(null)
//         const [backendImage, setBackendImage] = useState(null)
//         const [selectedImage,setSelectedImage]=useState(null)
//         const [loading, setLoading] = useState(true) //dd

//     const handleCurrentUser=async()=>{
//         try {
//             const result= await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
//             setUserData(result.data.user)
//             console.log(result.data.user)
//         } catch (error) {
//             console.log(error)
//         } finally{
//             setLoading(false)  //dd
//         }
//     }

//     const getGeminiResponse=async (command)=>{
//     try {
//         const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
//             return result.data
//     } catch (error) {
//         console.log(error)
//     }
//     }

//     useEffect(()=>{
//         handleCurrentUser()
//     },[])

//     if (loading) return null //dd

//     const value={
//         serverUrl,userData,setUserData,backendImage, 
//         setBackendImage,frontendImage, setFrontendImage,
//         selectedImage,setSelectedImage,getGeminiResponse
//     }
//     return(
//         <div>
//             <userDataContext.Provider value={value}>
//             {children}
//             </userDataContext.Provider>
//         </div>
//     )
// }

// export default UserContext


import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const userDataContext = createContext()

function UserContext({ children }) {

    const serverUrl = "https://assistant-lime-xi.vercel.app"

    const [userData, setUserData] = useState(null)
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleCurrentUser = async () => {

        try {

            const result = await axios.get(
                `${serverUrl}/api/user/current`,
                { withCredentials: true }
            )

            setUserData(result.data.user)

        } catch (error) {

            console.log(error.response?.data || error.message)

            setUserData(null)

        } finally {

            setLoading(false)

        }
    }

    const getGeminiResponse = async (command) => {

        try {

            const result = await axios.post(
                `${serverUrl}/api/user/asktoassistant`,
                { command },
                { withCredentials: true }
            )

            return result.data

        } catch (error) {

            console.log(error.response?.data || error.message)

        }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    const value = {
        serverUrl,
        userData,
        setUserData,
        backendImage,
        setBackendImage,
        frontendImage,
        setFrontendImage,
        selectedImage,
        setSelectedImage,
        getGeminiResponse
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext