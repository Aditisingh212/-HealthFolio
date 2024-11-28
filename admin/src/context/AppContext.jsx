import { createContext } from "react";

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const currency='₹'

    const months= ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    
    const slotDateFormat=( slotDate)=> {
      const dateArray = slotDate.split('_')
      return dateArray[0]+" "+months[Number(dateArray[1])]+ " "+dateArray[2]
    }

    const calculateAge = (dob) => {
        if (!dob || dob === "Not Selected") return "-";
        
        try {
            const today = new Date();
            const birthDate = new Date(dob);
            
            if (isNaN(birthDate.getTime())) return "-";
            
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age >= 0 ? age : "-";  // <-- Added validation for negative ages
        } catch (error) {
            console.error("Age calculation error:", error);
            return "-";
        }
    }

    const value={
        calculateAge,slotDateFormat,currency

    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider