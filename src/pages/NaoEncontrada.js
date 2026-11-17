import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <div>
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar ao início</Link>
    </div>
  );
}
