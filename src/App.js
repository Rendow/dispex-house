import './App.css';
import {Stack} from "@mui/material";
import {Header} from "./ui/header/Header";
import {Address} from "./ui/address/Adress";
import ClientsList from "./ui/clients-list/ClientsList";

function App() {
    return (
        <div className="App" >
            <Stack  alignItems={"center"} spacing={21}>
                <Header/>
                <Stack style={{width:'900px', margin: '45px'}} alignItems={"flex-end"}  spacing={5}>
                <Address/>
                <ClientsList/>
                </Stack>
            </Stack>
        </div>
    );
}
export default App;


