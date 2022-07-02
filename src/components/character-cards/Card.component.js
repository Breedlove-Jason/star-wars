import React from "react";
import "./Card.styles.css";
const Card = (props) => {
    const { index, name, birth_year, height, mass, homeworld, species } =
        props.character;
    return (
        <div className={"card-container"} key={index}>
            <div className={"card"}>
            <h3>{name}</h3>
                <h5>Birth: {birth_year}</h5>
                <h5>Height: {height}</h5>
                <h5>Mass: {mass}</h5>
                <h5>Homeworld: {homeworld}</h5>
                <h5>Species: {species}</h5>
            </div>
        </div>
    );
};

export default Card;