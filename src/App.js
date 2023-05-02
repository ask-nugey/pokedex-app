import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      await loadPokemon(res.results);
      setLoading(false);
    }
    fetchPokemonData()
  }, [])

  const loadPokemon = async (data) => {
    let _polemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(_polemonData)
  }

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <div className="conainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
