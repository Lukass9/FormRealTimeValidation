import React, { useState } from "react";
import axios from "axios";

export const useEmailValid = () => {
    const [isValid, setIsValid] = useState(' ')
    const handleEmailChange = (e) => { 
        axios({
            method: 'get',
            url: `/api/email-validator.php?email=${e.target.value}`,
        })
            .then(function ({ data }) {
                setIsValid(data.validation_status)
                console.log(data)
            })
            .catch(err => console.log(err));
    }

    return {
        isValid,
        handleEmailChange
    }
}