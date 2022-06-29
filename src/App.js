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
    // const [wholeCharacter, setWholeCharacter] = useState({
    //     person: [],
    //     home: [],
    //     type: [],
    //     height: [],
    //     mass: [],
    //     birth: []
    //
    // });


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
            // setPerson(person);
            // setHeight(height);
            // setMass(mass);
            // setBirth(birth);
            // setHome(world);
            // setType(species);
            console.log(home);
            console.log(type);

            const testMap = characters.map((character, index) => {
                character.homeworld = home[index]
                character.species = type[index]
                if (character.species === undefined){
                    character.species = ""
                }
                console.log("CWH", character.homeworld, home[index], character.species, type[index])
                return {
                    person: character.name,
                    home: character.homeworld,
                    type: character.species,
                    height: character.height,
                    mass: character.mass,
                    birth: character.birth_year
                }
            })
            console.log("TEST", testMap)


            //     setType(species);
            //     const testCombine =[...person, ...height, ...mass, ...birth, ...world, ...species]
            //     console.log(testCombine)

        }

// let newArray = home.toString().split(',');
//         console.log(newArray);
//         setWholeCharacter({
//             person: [...person],
//             height: [...height],
//             mass: [...mass],
//             birth: [...birth],
//             home: [...home],
//             type: [...type]
//         })
// console.log("WHOLE CHARACTER", wholeCharacter)

        // Object.values(wholeCharacter).map(function(value, index) {
        //     value.map(function(innerValue, idx) {
        //         console.log(idx, innerValue)
        //     })
        //     console.log("VALUE", index, value)
        // })

        fetchData();

    }, [characters]);


    return (
        <>
            {characters.map((character, index) => {
                // character.homeworld = home[index];
                // character.species = type[index];

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
