import React from "react";
import Card from "./Card.component";

const CardList = ({ characters }) => {
    return (
        <div className={"card-list"}>
            {characters.map((character, index) => {
                return <Card key={index} character={character} />;
            })}
        </div>
    );
};

export default CardList;