# SUS Connect - Sistema de Monitoramento da Saúde

Sistema de monitoramento da saúde para Dourados/MS, desenvolvido para a Prefeitura Municipal de Dourados.

## 🚀 Funcionalidades

### Página Inicial
- Acesso aos relatórios do Power BI:
  - Atenção Primária
  - Vigilância em Saúde
  - Repasses Financeiros
- Link direto para o sistema Arbo Notifica

### Área Interna (com autenticação)
- Dashboard com indicadores de saúde em tempo real
- Relatórios gerenciais de diabéticos
- Monitoramento de equipes de saúde
- Filtros avançados por período, unidade e equipe
- Exportação de dados em CSV e Excel
- Interface responsiva e moderna

## 🛠️ Tecnologias

- React 18 + TypeScript
- Tailwind CSS
- Vite
- Supabase (autenticação e backend)
- Power BI (relatórios embarcados)
- Lucide React (ícones)

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Conta no Supabase
- Relatórios configurados no Power BI

## ⚙️ Configuração

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie `.env.example` para `.env`
   - Preencha com suas credenciais do Supabase:
     ```
     VITE_SUPABASE_URL=sua_url_do_supabase
     VITE_SUPABASE_ANON_KEY=sua_chave_anonima
     ```

4. Configure os links do Power BI:
   - Consulte o arquivo `POWERBI_SETUP.md` para instruções detalhadas
   - Faça deploy da Edge Function:
     ```bash
     supabase functions deploy powerbi-proxy
     ```

## 🚀 Executar Localmente

```bash
npm run dev
```

## 📦 Build para Produção

```bash
npm run build
```

## 🌐 Deploy

O projeto está configurado para deploy no Netlify via `netlify.toml`.

### Variáveis de Ambiente no Netlify
Configure as seguintes variáveis no painel do Netlify:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📄 Documentação Adicional

- `POWERBI_SETUP.md` - Configuração dos relatórios do Power BI

## 🔐 Autenticação

O sistema utiliza autenticação via Supabase. Para criar usuários:

1. Acesse o painel do Supabase
2. Vá em Authentication > Users
3. Adicione novos usuários manualmente ou configure email/senha

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (1920x1080 e superiores)
- Tablets (768px - 1024px)
- Mobile (320px - 767px)

## 🎨 Design

- Design moderno e profissional
- Cores institucionais da Prefeitura de Dourados
- Logo e branding oficiais
- Interface intuitiva e acessível

## 📞 Suporte

Para suporte técnico, entre em contato com a Coordenação de Saúde Digital & Inovação da SEMS.
