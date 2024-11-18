import styles from './StyleDashboard.module.scss';
import { useState, useEffect } from 'react';
import MaterialButton from "../../Components/MaterialButton";
import { Checkbox, FormControlLabel, FormGroup,  Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { dataBase } from '../../Data/Database'


export default function DashBoard() {

    const [data, setData] = useState<{ message: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            try {
                await setTimeout(() => {
                    setData({ message: 'Olá ,Voce está em Dashboard!' });

                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error((error as Error).message);
            }
        }

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Página Dashboard</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <p>{data?.message}</p>
            )}

            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControlLabel name='filter' control={<Checkbox icon={<StarBorder sx={{ color: 'white' }} />} checkedIcon={<Star />} />} label="Filtrar" />
                
                <FormControlLabel control={<Checkbox icon={<StarBorder sx={{ color: 'white' }} />} checkedIcon={<Star />} />} label="Mais antigos" />
                <FormControlLabel control={<Checkbox icon={<StarBorder sx={{ color: 'white' }} />} checkedIcon={<Star />} />} label="Mais recentes" />
                <FormControlLabel control={<Checkbox icon={<StarBorder sx={{ color: 'white' }} />} checkedIcon={<Star />} />} label="Mais recentes" />
               
            </FormGroup>
            
            <Table sx= {tableStyles} >
                <TableHead >
                    <TableRow > 
                        <TableCell >Nome</TableCell>
                        <TableCell>Tempo de Experiência</TableCell>
                        <TableCell>Profissão</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataBase.map((item, index) =>(<TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{new Date(item.birthdate).toLocaleDateString()}</TableCell>
                        <TableCell>{item.occupation}</TableCell>
                    </TableRow >))}
                  </TableBody>
            </Table>
           

            <MaterialButton route="/" buttonText="Home"/>
        </div>
    );
};

const tableStyles = {
    'td, th': {
        border: 2,
        borderStyle: 'groove',
        color: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }

}