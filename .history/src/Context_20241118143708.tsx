import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";


interface AppProviderprops 
{
    children: React.ReactNode,
    ShowAlert: (message: string) => React.Component;
    ShowSnack: (message: string) => React.Component;
    
}

interface AppContextInterface 
{
    sharedState: AppProviderprops; 
    ShowSnack: (message: string) => React.ReactNode;
    ShowAlert: (message: string, severity: 'success' | 'error' | 'warning' | 'info' | undefined) => React.ReactNode;
}


const AppContext = createContext<AppContextInterface | null>(null);
 
const AppProvider: React.FC<AppProviderprops> = ({ children }) => {
    
    const [open, setOpen] = useState(true);
   
  
    function HandleClose(){
             setOpen(false); };
    
    function ShowAlert(message: string, possibleSeverity: 'success' | 'error' | 'warning' | 'info' | undefined) {
        return (
            <Snackbar open={open}
            autoHideDuration={5000}
            onClose={HandleClose} sx={{ width: '50%' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={HandleClose}
                    severity= {possibleSseverity}
                    variant="filled" >
                    {message}
                </Alert>
            </Snackbar>)
    }   

     function ShowSnack (message: string) {
         return (<Snackbar
             open={open}
             autoHideDuration={6000}
             onClose={HandleClose}
             message={message }
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
               
            />)
     }
 
    const sharedState = {
        ShowAlert,
        ShowSnack,

        // Adicionar as outras funcões que sejam necessárias 
    }

    return <AppContext.Provider value={sharedState}>
                    {children}
              </AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}

export default AppProvider;