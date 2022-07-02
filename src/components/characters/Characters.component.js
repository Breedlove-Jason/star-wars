import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Characters.styles.css";
import CardList from '../character-cards/CardList.component';
import SearchBox from "../search-box/SearchBox.component";

function Characters({data}) {
    const [characters, setCharacters] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [filteredCharacters, setFilteredCharacters] = useState(characters);

    useEffect(() => {
        const newFilteredCharacters = characters.filter((character) =>
            character.name.toLowerCase().includes(searchField.toLowerCase())
        );
        setFilteredCharacters(newFilteredCharacters);
    }, [characters, searchField]);

    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setSearchField(searchFieldString);
    };

    useEffect(() => {
        const fetchOtherData = (characters) => {
            const charactersWithAllData = [];
            characters.forEach((character) => {
                const homeworld = character.homeworld;
                const species = character.species;
                let urls = [homeworld, ...species];

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
                                })
                                .catch((err) => console.error(err));
                        }
                        if (!url.length) {
                            if (url.search("species")) {
                                character.species = "Unspecified";
                            }
                        }
                    })
                ).then(charactersWithAllData.push(character));
            });
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
    const listItems = characters.map(
        (element, index) => {

            return (
                <div className="Characters" key={index}>
                    <div className={"media"}>
                        <div className={"media-body"}>
                    <table className={" table striped bordered hover"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Height</th>
                            <th scope={"col"}>Mass</th>
                            <th scope={"col"}>Birth Year</th>
                            <th scope={"col"}>Home World</th>
                            <th scope={"col"}>Species</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th >{element.name}</th>
                            <td>{element.height}</td>
                            <td>{element.mass}</td>
                            <td>{element.birth_year}</td>
                            <td >{element.homeworld}</td>
                            <td>{element.species}</td>

                        </tr>
                        </tbody>
                    </table>
                        </div>
                    </div>
                </div>
            )
        }
    )
    return (
        <div>
            <SearchBox
                onChangeHandler={onSearchChange}
                placeholder="Search Characters"
                className={"form-control container search-box"}
            />

            <CardList characters={filteredCharacters}/>
            {listItems}
        </div>
    )
}

export default Characters;