import { Fab } from "@mui/material";
import { Link } from "react-router-dom";

export default function MaterialButton({route, buttonText}: {route: string, buttonText: string}) {
    return <Link to={route}><Fab aria-label="add"  color="primary"  sx={{ margin: '10px', width: '150px', height: '100px'}}>{buttonText}</Fab></Link>;
}