import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // ajuste o caminho para o seu client do Supabase

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Registro() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [resultado, setResultado] = useState(null); // { tipo: "sucesso" | "erro", texto: string }
  const [loading, setLoading] = useState(false);

  function validar() {
    const novosErros = {};

    if (!nomeCompleto.trim()) {
      novosErros.nomeCompleto = "O nome completo é obrigatório.";
    }

    if (!email.trim()) {
      novosErros.email = "O e-mail é obrigatório.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      novosErros.email = "Informe um e-mail em formato válido.";
    }

    if (!password) {
      novosErros.password = "A senha é obrigatória.";
    } else if (password.length < 8) {
      novosErros.password = "A senha deve ter no mínimo 8 caracteres.";
    }

    if (!confirmPassword) {
      novosErros.confirmPassword = "A confirmação de senha é obrigatória.";
    } else if (confirmPassword !== password) {
      novosErros.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setResultado(null);

    if (!validar()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          nome: nomeCompleto.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      setResultado({
        tipo: "erro",
        texto: `Não foi possível realizar o cadastro: ${error.message}`,
      });
      return;
    }

    // Se a confirmação por e-mail estiver ativada no Supabase, data.session vem null
    const precisaConfirmar = !data.session;

    setResultado({
      tipo: "sucesso",
      texto: precisaConfirmar
        ? "Cadastro realizado! Verifique seu e-mail para confirmar a conta."
        : "Cadastro realizado com sucesso!",
    });

    setNomeCompleto("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  }

  return (
    <div style={estilos.container}>
      <h1>Cadastro de usuário</h1>

      {/* noValidate desliga a validação nativa do navegador e usa a nossa */}
      <form onSubmit={handleSubmit} noValidate style={estilos.form}>
        <div style={estilos.campo}>
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            type="text"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />
          {errors.nomeCompleto && (
            <span style={estilos.erro}>{errors.nomeCompleto}</span>
          )}
        </div>

        <div style={estilos.campo}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={estilos.erro}>{errors.email}</span>}
        </div>

        <div style={estilos.campo}>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span style={estilos.erro}>{errors.password}</span>
          )}
        </div>

        <div style={estilos.campo}>
          <label htmlFor="confirmar">Confirmação de senha</label>
          <input
            id="confirmar"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span style={estilos.erro}>{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {resultado && (
          <p
            style={{
              ...estilos.mensagem,
              color: resultado.tipo === "sucesso" ? "#166534" : "#b91c1c",
              background: resultado.tipo === "sucesso" ? "#dcfce7" : "#fee2e2",
            }}
          >
            {resultado.texto}
          </p>
        )}
      </form>

      <p>
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}

const estilos = {
  container: { maxWidth: 400, margin: "40px auto", padding: 16 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  campo: { display: "flex", flexDirection: "column", gap: 4 },
  erro: { color: "#b91c1c", fontSize: 14 },
  mensagem: { padding: 12, borderRadius: 6 },
};

export default Registro;
