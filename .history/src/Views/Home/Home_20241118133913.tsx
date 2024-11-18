import { useState, useEffect } from 'react';
import MaterialButton from '../../Components/MaterialButton.tsx';
import { Avatar, Box, Card, Typography } from '@mui/material';



export default function Home() {

    const [data, setData] = useState<{ message: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    
    // const { createMessage } = useAppContext() //TESTES DE CRIACAO DE MENSAGENS DESDE O CONTEXTO
    //const message = createMessage("Hello from Home");
    // console.log(message)

    

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            try {
                await setTimeout(() => {
                    setData({ message: 'Olá ,Voce está em Home!' });

                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error((error as Error).message);
            }
        }

        fetchData();
    }, []);
    
    return (
        <Box sx={avatarStyles.container}>
            
            <Box sx={avatarStyles.profileBox}>
                <Avatar sx={avatarStyles.avatar}>ER</Avatar>
            </Box>
        <Card sx={avatarStyles.card}>
                <Typography variant="h2" component="h1" sx={avatarStyles.title}>Painel Inicial</Typography>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <p>{data?.message}</p>
            )}
            <MaterialButton route="/formulary" buttonText="Formulário" />
            <MaterialButton route="/dashboard" buttonText="Dashboard" />
            <MaterialButton route="/settings" buttonText="Configurações" />
        </Card>
        </Box>
    );
};

const avatarStyles = {
    avatar:{
        width: '70px',
        height: '70px',
        backgroundColor: 'orange',
        color: '#fff',
        fontSize: '30px',
        fontWeight: 'bold',
        marginRight: '20px'
    },
    profileBox: {
        display: 'flex',        
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '20px',
        width: '100%',
        borderRadius: '10px',
        padding: '10px',
    },
    container: {
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '20px',
        height: '90vh',
        backgroundColor: '#181717',
        borderRadius: '10px',
        borderColor: 'grey',
        borderWidth: '2px',
        borderStyle: 'solid',
    },
    card: {
            width: '100%',
            padding: '20px',
        boxShadow: '0px 0px 5px #999',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
            boxShadow: '0px 0px 10px #FFA507',
            transition: 'box-shadow 0.3s ease-in-out', 
            },
    },
    title: {
        
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#FFA507',
    }
}