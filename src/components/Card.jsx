import React from "react";

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="name">
        <span>No.{("000" + pokemon.id).slice(-3)}</span> {pokemon.name}
      </h3>
      <div className="data">
        <p>高さ：{pokemon.height}m</p>
        <p>重さ：{pokemon.weight}kg</p>
      </div>
      <div className="types">
        <p>
          タイプ：
          {pokemon.types
            .map((type) => {
              return type.type.name;
            })
            .join(", ")}
        </p>
      </div>
      <div className="ability">
        <p>アビリティ：{pokemon.abilities[0].ability.name}</p>
      </div>
    </div>
  );
};

export default Card;
