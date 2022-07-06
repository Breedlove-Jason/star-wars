import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Characters from "./components/characters/Characters.component";

function App() {
    const [characters, setCharacters] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const characterResponse = await axios.get(
                "https://swapi.dev/api/people/?format=json"
            );
            setCharacters(characterResponse.data.results);

        }


        fetchData();

    }, [characters]);


    return (
        <div>
            <h1 className={"title"}>Star Wars API</h1>
            <Characters data={characters}/>
        </div>
    )


}

export default App;
