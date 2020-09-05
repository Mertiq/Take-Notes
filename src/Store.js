import React, {useEffect, useState} from 'react'
export const notlarContext = React.createContext('notlar');
const Store = ({children}) => {
    const[notlar, setNotlar] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3005/notlar', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(data => data.json()).then(not =>{
            setNotlar(not);
        })
    }, []);

    return (
        <notlarContext.Provider value = {[notlar,setNotlar]}>
            {children}
        </notlarContext.Provider>
    )

}

export default Store