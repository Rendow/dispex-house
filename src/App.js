import './App.css';
import {Stack} from "@mui/material";
import {Header} from "./ui/header/Header";
import {Address} from "./ui/address/Adress";
import ClientsList from "./ui/clients-list/ClientsList";

function App() {
    return (
        <div className="App">
            <Stack  alignItems={"center"} spacing={21}>
                <Header/>
                <Address/>
                <ClientsList/>
            </Stack>
        </div>
    );
}
export default App;


