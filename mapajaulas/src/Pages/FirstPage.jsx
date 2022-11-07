import React from 'react'

import { useEffect } from "react";

import { useNavigate } from 'react-router-dom'

const FirstPage = ({ token }) => {

    let navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/Home')
        } else {
            navigate('/Login')
        }
    }, [])
    
   
  return (
    <div>Loading...</div>
  )
}

export default FirstPage;