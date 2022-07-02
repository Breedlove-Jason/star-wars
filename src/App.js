import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Characters from "./components/characters/Characters.component";

function App() {
    const [characters, setCharacters] = useState([]);
    const [home, setHome] = useState([]);
    const [type, setType] = useState([]);
    const [person, setPerson] = useState([]);
    const [height, setHeight] = useState([]);
    const [mass, setMass] = useState([]);
    const [birth, setBirth] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const characterResponse = await axios.get(
                "https://swapi.dev/api/people/?format=json"
            );
            setCharacters(characterResponse.data.results);

            const world = [];
            const species = [];
            const person = [];
            const height = [];
            const mass = [];
            const birth = [];
            for (const element of characters) {
                const nameResponse = element.name
                person.push(nameResponse);
                const heightResponse = element.height
                height.push(heightResponse);
                const massResponse = element.mass
                mass.push(massResponse);
                const birthResponse = element.birth_year
                birth.push(birthResponse);
                const homeWorldResponse = await axios.get(
                    element.homeworld)
                world.push(homeWorldResponse.data.name)

                const speciesResponse = await axios.get(
                    element.species)
                species.push(speciesResponse.data.name)
                setPerson(person);
                setHeight(height);
                setMass(mass);
                setBirth(birth);
                setHome(world);
                setType(species);

            }


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
