import React, {useEffect, useState} from 'react';


function Characters({data} ) {
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        const fetchOtherData = (characters) => {
            const charactersWithAllData = [];
            characters.forEach((character) => {
                const homeworld = character.homeworld;
                const species = character.species;
                const vehicles = character.vehicles;
                const starships = character.starships;
                let urls = [homeworld, ...species, ...vehicles, ...starships];

                Promise.all(
                    urls.map((url) => {
                        if (url.length) {
                            fetch(url)
                                .then((response) => response.json())
                                .then((data) => {
                                    if (url.search("species") > 0) {
                                        character.species = data.name;
                                    }
                                    if (url.search("planets") > 0) {
                                        character.homeworld = data.name;
                                    }
                                    if (url.search("vehicles") > 0) {
                                        character.vehicles.shift();
                                        character.vehicles.push(data.name);
                                    }
                                    if (url.search("starships") > 0) {
                                        character.starships.shift();
                                        character.starships.push(data.name);
                                    }
                                })
                                .catch((err) => console.error(err));
                        }
                        if (!url.length) {
                            if (url.search("species")) {
                                character.species = "Unspecified";
                            }
                            if (url.search("vehicles")) {
                                character.vehicles = "";
                            }
                            if (url.search("starships")) {
                                character.starships = "";
                            }
                        }
                    })
                ).then(charactersWithAllData.push(character));
            });
            console.log("ALL", charactersWithAllData);
            return charactersWithAllData;

        };

        const fetchApi = () => {
            const characters = [];
            Promise.all(
                ["https://swapi.dev/api/people/?format=json"].map((api) =>
                    fetch(api)
                        .then((response) => response.json())
                        .then((data) => characters.push(...data.results))
                        .then((data) => {
                            setCharacters(fetchOtherData(characters));
                        })
                )
            );
        };
        fetchApi();
    }, []);
    console.log("ATTENTION", characters);
    const listItems = characters.map(
        (element, index) => {
            return (
            <ul type="disc">
                <li style={{
                    fontWeight: 'bold',
                    color: 'red'
                }}
                >{element.name}
                </li>
                <li>{element.homeworld}</li>
                <li>{element.species}</li>
                <li>{element.height}</li>
                <li>{element.mass}</li>
                <li>{element.birth_year}</li>
            </ul>
            )
        }
    )
    return (
        <div>
            {listItems}
        </div>
    )
}
export default Characters;