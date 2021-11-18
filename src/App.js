import './App.css';
import {Stack} from "@mui/material";
import {Header} from "./ui/header/Header";
import {Address} from "./ui/address/Adress";
import ClientsList from "./ui/clients-list/ClientsList";

function App() {
    return (
        <div className="App" >
            <Stack  alignItems={"center"}>
                <Header/>
                <span style={{
                    fontSize: '12px',
                      opacity: '0.5',
                      marginTop:'20px',
                }}> Функционал работает с Федюнинского, ул , 30 , Подъезд 1</span>
                <Stack style={{width:'900px', margin: '45px'}} alignItems={"flex-end"}  spacing={5}>
                <Address/>
                <ClientsList/>
                </Stack>
            </Stack>
        </div>
    );
}
export default App;


