# aulafromtend
Created with CodeSandbox

# aulafromtend

# aulafromtend

Aplicação em React com React Router e Supabase, com cadastro, login, logout e rotas protegidas.

## Perguntas e respostas

### 1. Qual é a responsabilidade do Supabase Auth dentro da aplicação?

Cuidar da identidade do usuário: cadastro, login, logout e manutenção da sessão. Ele guarda as senhas com segurança, então a aplicação nunca lida com elas diretamente.

### 2. Por que utilizamos a Context API para compartilhar as informações do usuário autenticado?

Porque vários componentes precisam saber quem é o usuário (`ProtectedRoute`, `Perfil`, `Dashboard`, menu). Com o `AuthContext`, eles acessam `user`, `loading` e `signOut` direto, sem passar props de componente em componente.

### 3. Qual é a diferença entre utilizar `useState` diretamente em cada componente e utilizar um contexto global de autenticação?

Com `useState` em cada componente, cada um teria sua própria cópia do usuário, com código repetido e risco de ficarem inconsistentes. Com o contexto global há uma única fonte de verdade, criada uma vez no `AuthProvider`, que todos os componentes compartilham.

### 4. O que acontece quando um usuário tenta acessar uma rota protegida sem estar autenticado?

O `ProtectedRoute` verifica o contexto: enquanto carrega, mostra "Carregando...". Se não houver usuário, redireciona para `/login` com `<Navigate />` e não exibe a página protegida.

### 5. Qual é a função do método `onAuthStateChange()`?

Ouvir mudanças no estado de autenticação (login, logout, renovação de sessão) e executar uma função a cada mudança. No projeto, ele atualiza o `user` do contexto, e a interface reage sozinha.

### 6. Por que a proteção de rotas com React Router não é suficiente para garantir a segurança dos dados?

Porque ela roda no navegador e pode ser contornada: qualquer pessoa pode chamar a API do Supabase diretamente. A segurança real precisa estar no banco, com RLS (Row Level Security) e políticas que só permitam o acesso a usuários autorizados.

### 7. Qual é a diferença entre autenticação e autorização?

Autenticação confirma quem é o usuário ("quem é você?"). Autorização define o que esse usuário pode acessar ou fazer ("o que você pode fazer?").
