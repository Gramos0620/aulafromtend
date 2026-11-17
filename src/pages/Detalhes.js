import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Detalhes() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarFilme() {
      const { data, error } = await supabase
        .from("filmes")
        .select("*")
        .eq("id_filme", id)
        .single();

      if (error) {
        setErro("Não foi possível carregar este filme.");
      } else {
        setFilme(data);
      }

      setCarregando(false);
    }

    buscarFilme();
  }, [id]);

  if (carregando) return <p>Carregando...</p>;
  if (erro) {
    return (
      <div>
        <p style={{ color: "red" }}>{erro}</p>
        <Link to="/registros">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{filme.titulo}</h1>
      <p>
        <strong>Diretor:</strong> {filme.diretor}
      </p>
      <p>
        <strong>Gênero:</strong> {filme.genero}
      </p>
      <p>
        <strong>Lançamento:</strong>{" "}
        {new Date(filme.data_lancamento + "T00:00:00").toLocaleDateString(
          "pt-BR"
        )}
      </p>

      <Link to="/registros">Voltar para a lista</Link>
    </div>
  );
}
