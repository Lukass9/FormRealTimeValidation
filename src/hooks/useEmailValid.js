import { useState } from "react";
import axios from "axios";

export const useEmailValid = () => {
    const [isValid, setIsValid] = useState(' ')
    let typingTimer;

    const handleCleareTimeout = ()=>{
        clearTimeout(typingTimer)
    }

    const handleEmailChange = (e) => { 
        // console.log(e.target.value)
        const email = encodeURIComponent(e.target.value)
        axios({
            method: 'get',
            url: `/api/email-validator.php?email=${email}`,
        })
            .then(function ({ data }) {
                if(data.email === e.target.value){
                    setIsValid(data.validation_status)
                }
                // console.log(data)
            })
            .catch(err => console.log(err));
    }

    return {
        isValid,
        handleEmailChange,
        handleCleareTimeout
    }
}