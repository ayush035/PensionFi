import React, { useState } from "react"
import UAuth from "@uauth/js"
import { Button } from "react-bootstrap"

const uauth = new UAuth({
    clientID: "ca047f44-91d0-42be-98b1-45557369cc19",
    redirectUri: "http://localhost:3000"
})

function UnstoppableDomain() {
    const [Uauth, setUauth] = useState()

    async function Connect() {
        try {
            const authorization = await uauth.loginWithPopup()
            setUauth(JSON.parse(JSON.stringify(authorization))["idToken"])

            await authenticate()
        } catch (error) {
            console.error(error)
        }
    }

    async function logOut() {
        uauth.logout()
        logout()
    }

    function log() {
        if (Uauth === null || Uauth === undefined) {
            Connect()
        } else {
            logOut()
        }
    }

    return (
        <>
            <Button onClick={log} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                 <font color ='white' size ='4' face ='arial'>
                {Uauth != null ? Uauth["sub"] : "Login with Unstoppable Domain"}</font>
            </Button>
        </>
    )
}

export default UnstoppableDomain;