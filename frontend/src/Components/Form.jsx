import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Form = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <div>
            {
                isLoggedIn ? <Login /> : <Register />

            }
        </div>
    )
}

export default Form
