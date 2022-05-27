import React, { useState, useEffect } from 'react';
import { getUser } from "../../utils/auth";

export const WrapperComponent = (props) => {

    const [user,setUser] = useState(null);
    const renderComponent = () => user.isAdmin 
                                    ? <>
                                      {props.navAdmin}
                                      {props.admin}
                                      </> 
                                    : <>
                                      {props.navStudent}
                                      {props.student}
                                      </>
    // const getUser = () => {
    //     //Trae al usuario del token
    //     const user = JSON.parse(getUser());
    //     return user
    // }
    useEffect(() => {
        setUser(JSON.parse(getUser()));
    },[])
    return (
        <div>
        {
            user    
                ? renderComponent()
                : <></>
        }
        </div>
    )
  } 