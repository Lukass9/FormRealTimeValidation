import { useState } from "react";
import axios from "axios";

export const useEmailValid = () => {
    const [isValid, setIsValid] = useState(' ')
    let typingTimer;

    const handleCleareTimeout = ()=>{
        clearTimeout(typingTimer)
    }

    const handleEmailChange = (e) => { 
        console.log(e.target.value)
        clearTimeout(typingTimer)
        const email = encodeURIComponent(e.target.value)

        typingTimer = setTimeout(()=>{ 
            axios({
                method: 'get',
                url: `/api/email-validator.php?email=${email}`,
            })
                .then(function ({ data }) {
                    setIsValid(data.validation_status)
                    console.log(data)
                })
                .catch(err => console.log(err));
        },1000)

        
        
    }

    return {
        isValid,
        handleEmailChange,
        handleCleareTimeout
    }
}