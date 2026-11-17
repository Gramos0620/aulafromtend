import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://spylpfdpjdkorbzjrguk.supabase.co";
const supabaseKey = "sb_publishable_JOaiOWI9Jl21zy6WjfhaoQ_S6tV-1j0";

export const supabase = createClient(supabaseUrl, supabaseKey);
// Troque pelo nome real da chave primária da tabela filmes
export const id_filme = "id_filme";
