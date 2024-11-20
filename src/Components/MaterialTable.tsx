import { Table, TableRow, TableCell, TableBody, TableHead } from "@mui/material";

export default function MaterialTable({ cellNames, dataBlock, occupationRange,filter }: { cellNames: Array<string>, dataBlock: Array<{ userId: number, name: string, birthDate: string, occupation: string, experience: number }>, occupationRange: string, filter:boolean}) {
    return (
        filter? (<Table sx={Styles}>
            <TableHead>
                <TableRow>
                    {
                        cellNames.map((cell, index) => { return (<TableCell key={index}>{cell}</TableCell>) })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {(dataBlock.filter(data => data.occupation === occupationRange )).map((data) => (
                    <TableRow key={data.userId}>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.occupation}</TableCell>
                        <TableCell>{data.experience} anos</TableCell>
                    </TableRow>
                ))}</TableBody>
        </Table>)
            :
            (<Table sx={Styles}>
            <TableHead>
                <TableRow>
                    {
                        cellNames.map((cell, index) => { return (<TableCell key={index}>{cell}</TableCell>) })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                    {dataBlock.map((item, index) => (<TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.birthDate}</TableCell>
                        <TableCell>{item.occupation}</TableCell>
                        <TableCell>{item.experience} anos</TableCell>
                    </TableRow >))}
                </TableBody>
        </Table>)
    );
}

const Styles = {
    'th, td': {
        border: 2,
        borderStyle: 'groove',
        color: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
};