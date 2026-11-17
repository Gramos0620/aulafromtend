import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Perfil() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Meu Perfil</h1>

      <p>
        <strong>Nome completo:</strong> {user.user_metadata.nome}
      </p>
      <p>
        <strong>E-mail:</strong> {user.email}
      </p>
      <p>
        <strong>Identificador:</strong> {user.id}
      </p>

      <button onClick={signOut}>Sair</button>
    </div>
  );
}
