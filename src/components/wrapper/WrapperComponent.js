import React, { useState, useEffect } from 'react';
import { isAdmin } from "../../utils/auth";

export const WrapperComponent = (props) => {

    const [user,setUser] = useState(null);
    const renderComponent = () => user 
                                    ? <>
                                      {props.navAdmin}
                                      {props.admin}
                                      </> 
                                    : <>
                                      {props.navStudent}
                                      {props.student}
                                      </>
    useEffect(() => {
        setUser(isAdmin());
    },[])
    return (
        <div>
        {
            user != null   
                ? renderComponent()
                : <></>
        }
        </div>
    )
  } 