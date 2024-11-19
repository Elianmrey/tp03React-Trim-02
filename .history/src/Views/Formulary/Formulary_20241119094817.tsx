import styles from './StyleFormulary.module.scss';
import { useState, useEffect } from 'react';
import MaterialButton from "../../Components/MaterialButton";
import { Button, Container, FormGroup, Input, InputLabel, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
import { dataBase } from '../../Data/Database.tsx';
import {addUser } from '../../Services/DataService.tsx';
import { useAppContext } from '../../Context.tsx';
import { DatePicker } from '@mui/x-date-pickers-pro';
export default function Formulary() {
    
    const{ShowAlert} = useAppContext();
   
    const [uId, _]= useState(dataBase.length > 0 ? dataBase.length : 0);
    const [data, setData] = useState<{ message: string }>();
    const [loading, setLoading] = useState<boolean>(true);
   
    const [info, setInfo] = useState<{
        userId: number,
        name: string,
        birthDate: string,
        occupation: string,
        experience: number } >({
       userId: uId,
        name: '',
        birthDate: '',
        occupation: '',
        experience: 0,
    });
    
    const onSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        setLoading(true);
        if (info.name !== '' && info.birthDate  !== ''  && info.occupation  !== ''  && info.experience  !== 0) {
             addUser({ name: info.name, birthDate: info.birthDate, occupation: info.occupation, experience: info.experience});
        }
            setLoading(false);
            ShowAlert('Preencha todos os campos. Por favor!','error');
       
        
    };

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            try {
                await setTimeout(() => {
                    setData({ message: 'Olá ,Voce está em Formulary!' });

                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error((error as Error).message);
            }
        }

        fetchData();
    }, []);
    function HandleChange(evnt) {
        const value = evnt.currentTarget.value;
        setInfo((prevData) => ({...prevData, [evnt.target.name]: value}));
}

    // console.log(dataBase);
    return (
        <div className={styles.container}>
            <h1>Formulário</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <p>{data?.message}</p>
            )}
            
            <Typography variant='h4'>Adicione seus dados</Typography>
          
            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', backgroundColor: 'orange', borderRadius: '10px', padding: '10px' }}>

            <form onSubmit={onSubmit} className={styles.form}>
            <FormGroup sx={MaterialStyles.form}>

                <InputLabel htmlFor="name" sx={MaterialStyles.inputLabel}>Nome:</InputLabel>
                <Input name='name' type="text" placeholder="Digite seu nome" sx={MaterialStyles.input} value={info?.name} onChange={(e) =>HandleChange(e) }/>
                
                <InputLabel htmlFor="birthDate" sx={MaterialStyles.inputLabel} >Data de nascimento:</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br" >
                   
                    <DemoContainer components={['DateTimePicker']} sx={MaterialStyles.dateTimePickerContainer} locale="pt-Br">
                        <DatePicker  name='birthDate' label="Selecione a data de nascimento"  onChange={(date) => setInfo((prevData) => ({ ...prevData, birthDate: new Date(date).toLocaleDateString('pt-BR') }))}
                                sx={MaterialStyles.dateTimePicker} />
                    </DemoContainer>
                </LocalizationProvider>

                <InputLabel htmlFor="occupation" sx={MaterialStyles.inputLabel}>Ocupação:</InputLabel>
                <Input name='occupation' type="text" placeholder="Digite sua ocupação" sx={MaterialStyles.input} value={info?.occupation} onChange={(e) =>HandleChange(e) }/>

                <InputLabel htmlFor="experience" sx={MaterialStyles.inputLabel}>Tempo de experiência:</InputLabel>
                <Input name='experience' type="text" placeholder="Digite o tempo de experiência" sx={MaterialStyles.input}  value={info?.experience} onChange={(e) =>HandleChange(e) }/>

                <Button type='submit' value='Enviar'  sx={MaterialStyles.button}>Enviar</Button>
              
                    </FormGroup>
            </form>
                <MaterialButton route="/" buttonText="Home" />
         </Container>
                
        </div>
    );
};


const MaterialStyles = {
    input: {
        width: '100%',
        marginBottom: '10px',
        color: 'black',
    },
    inputLabel: {
        color: 'black',
    },
    dateTimePickerContainer: {
        width: '100%',
    },
    dateTimePicker: {
        width: '100%',
        color: 'black',
    },
    button: {
        width: '100%',
        color: 'white',
        backgroundColor: 'indigo',
        '&:hover': {
            boxShadow: '0 0 0.8rem 0.rebeccapurple',
        },
        '&:active': {
            backgroundColor: 'blue',
            outline: 'none',
            border: 'none',
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: '10px',
        padding: '20px',
    },
    };
    