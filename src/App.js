import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState(null)
  const [nextURL, setNextURL] = useState("")
  const [prevURL, setPrevURL] = useState("")

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      await loadPokemon(res.results);
      setNextURL(res.next);
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

  const handlePrevPage = async () => {
    if (!prevURL) return

    setLoading(true)
    let data = await getAllPokemon(prevURL)
    await loadPokemon(data.results);
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false);
  }

  const handleNextPage = async () => {
    if (!nextURL) return

    setLoading(true)
    let data = await getAllPokemon(nextURL)
    await loadPokemon(data.results);
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <div className="conainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="pager">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
