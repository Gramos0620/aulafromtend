import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Listagem() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarFilmes() {
      const { data, error } = await supabase.from("filmes").select("*");

      if (error) {
        setErro(error.message);
      } else {
        setFilmes(data);
      }
      setCarregando(false);
    }

    buscarFilmes();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro ao buscar dados: {erro}</p>;
  if (filmes.length === 0) return <p>Nenhum filme cadastrado.</p>;

  return (
    <div>
      <h1>Filmes</h1>
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id_filme}>
            {filme.titulo} —{" "}
            <Link to={`/registros/${filme.id_filme}`}>Ver detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
