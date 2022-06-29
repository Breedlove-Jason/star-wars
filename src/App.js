import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    const [characters, setCharacters] = useState([]);
    const [home, setHome] = useState([]);
    const [type, setType] = useState([]);
    const [person, setPerson] = useState([]);
    const [height, setHeight] = useState([]);
    const [mass, setMass] = useState([]);
    const [birth, setBirth] = useState([]);
    const [wholeCharacter, setWholeCharacter] = useState({
        person: [],
        home: [],
        type: [],
        height: [],
        mass: [],
        birth: []

    });


    useEffect(() => {
        async function fetchData() {
            const characterResponse = await axios.get(
                "https://swapi.dev/api/people/?format=json"
            );
            setCharacters(characterResponse.data.results);

            const world = [];
            const species = [];
            // const person = [];
            // const height = [];
            // const mass = [];
            // const birth = [];
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
            }
            // setPerson(person);
            // setHeight(height);
            // setMass(mass);
            // setBirth(birth);
            setHome(world);
            setType(species);
        }


        // setWholeCharacter({
        //     person: person,
        //     height: height,
        //     mass: mass,
        //     birth: birth,
        //     home: home,
        //     type: type
        // })
// console.log("WHOLE CHARACTER", wholeCharacter)

        // Object.values(wholeCharacter).map(function(value, index) {
        //     value.map(function(innerValue, idx) {
        //         console.log(idx, innerValue)
        //     })
        //     console.log("VALUE", index, value)
        // })

        fetchData();

    }, [characters]);

    let theName = ""
    let theHeight = ""
    let theMass = ""
    let theBirth = ""
    const data = characters.map((character, index) => {
            theName = character.name;
            theHeight = character.height;
            theMass = character.mass;
            theBirth = character.birth_year;

        // console.log(name, index);
        // return (
        //         <>
        //             <h1>"Mapping Data</h1>
        //             <h3>{character.name}</h3>
        //             <p>{character.height}</p>
        //             <p>{character.mass}</p>
        //             <p>{character.birth_year}</p>
        //         </>
        //     )


    })
    return (
        <>
            {characters.map((character, index) => {
                return (
                    <div className={""}>
                        <table key={index} className={"table flex-container"}>
                            <thead></thead>
                            <tbody>
                            <tr>
                                <td>Name:</td>
                                <th>{character.name}</th>
                                <td>Birth:</td>
                                <th>{character.birth_year}</th>
                                <td>Height:</td>
                                <th>{character.height}</th>
                                <td>Mass:</td>
                                <th>{character.mass}</th>
                                <td>HomeWorld:</td>
                                <th>{character.homeworld}</th>
                                <td>Species:</td>
                                <th>{character.species}</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </>
    );

}

export default App;
