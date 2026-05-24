# ⛅ Previsão do Clima (Weather Dashboard)

Uma aplicação web moderna e responsiva para consulta de previsão do tempo. O projeto permite visualizar o clima atual e a previsão para os próximos dias, com detecção automática de localização e suporte a tema claro/escuro.

## ✨ Funcionalidades

- **Detecção Automática de Localização:** Ao acessar a aplicação, a sua localização é identificada automaticamente através do seu IP (usando ipapi.co) para exibir o clima local imediatamente.
- **Busca por Cidades:** É possível pesquisar o clima de qualquer cidade do mundo usando a API de Geocodificação do Open-Meteo.
- **Clima Atual e Previsão:** Exibe dados detalhados como temperatura atual, umidade, velocidade do vento e as temperaturas máximas e mínimas para os próximos dias.
- **Gráficos Interativos:** Visualização da variação de temperatura ao longo da semana utilizando gráficos interativos da biblioteca Recharts.
- **Modo Claro / Escuro (Dark Mode):** Alternância fluida entre temas, proporcionando maior conforto visual. O tema padrão é definido de acordo com as preferências do sistema.
- **Design Responsivo e Moderno:** Construído com o Material-UI (MUI), garantindo que a aplicação funcione perfeitamente em dispositivos móveis, tablets e desktops.

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/) (v19):** Biblioteca principal para construção da interface de usuário.
- **[TypeScript](https://www.typescriptlang.org/):** Adiciona tipagem estática ao JavaScript, garantindo maior segurança e facilidade no desenvolvimento.
- **[Vite](https://vitejs.dev/):** Ferramenta de build super rápida para projetos front-end.
- **[Material-UI (MUI)](https://mui.com/):** Biblioteca de componentes de interface robusta e customizável.
- **[Recharts](https://recharts.org/):** Utilizada para a criação do gráfico de variação de temperaturas.
- **[Axios](https://axios-http.com/):** Cliente HTTP para realizar as requisições às APIs externas.
- **[Open-Meteo API](https://open-meteo.com/):** Fornecimento de dados meteorológicos e geocodificação.
- **[ipapi.co](https://ipapi.co/):** API para detecção de geolocalização via IP.

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **[Node.js](https://nodejs.org/):** Versão 18 ou superior.
- **[NPM](https://www.npmjs.com/)** (geralmente instalado junto com o Node.js) ou **[Yarn](https://yarnpkg.com/)**.

## 🚀 Como Configurar e Executar o Projeto

Siga o passo a passo abaixo para rodar a aplicação em seu ambiente local:

### 1. Clone o repositório
Caso o projeto esteja versionado remotamente (GitHub/GitLab), clone-o utilizando o comando:
```bash
git clone https://github.com/JoaoVictor-Nunes/climaApp
cd clima
```
*(Se você já possui a pasta do projeto localmente, basta acessá-la pelo terminal).*

### 2. Instale as dependências
Execute o comando abaixo na raiz do projeto para baixar e instalar todos os pacotes necessários:
```bash
npm install @mui/material @mui/icons-material @emotion/styled axios recharts 
```

### 3. Execute a aplicação em ambiente de desenvolvimento
Após a instalação das dependências, inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### 4. Acesse no navegador
O Vite iniciará o servidor local, geralmente na porta `5173`. Acesse o link exibido no seu terminal, algo como:
```
http://localhost:5173
```

## 🏗️ Estrutura do Projeto

Abaixo, a estrutura principal de pastas para que você possa se guiar facilmente pelo código base:

```text
clima/
├── public/                 # Arquivos públicos estáticos
├── src/
│   ├── Components/         # Componentes React reutilizáveis (SearchBar, GraficoClima, etc.)
│   ├── Context/            # Gerenciamento de estado global (ClimaContext)
│   ├── services/           # Configurações do Axios e chamadas de API (api.ts)
│   ├── types/              # Definições de tipagens do TypeScript
│   ├── tema.tsx            # Configuração personalizada do tema do Material-UI
│   ├── App.tsx             # Componente raiz da aplicação
│   └── main.tsx            # Ponto de entrada do React
├── package.json            # Dependências e scripts do projeto
├── vite.config.ts          # Configurações do Vite
└── tsconfig.json           # Configurações do TypeScript
```

## 🌐 APIs e Serviços de Terceiros

Este projeto consome as seguintes APIs abertas (não necessitam de chaves de autenticação prévias):
1. **Open-Meteo Weather API:** `https://api.open-meteo.com/v1/forecast` para previsão do tempo.
2. **Open-Meteo Geocoding API:** `https://geocoding-api.open-meteo.com/v1/search` para busca de cidades por nome.
3. **ipapi:** `https://ipapi.co/json/` para descobrir coordenadas geográficas da rede atual.

## 🛠️ Scripts Disponíveis

No diretório do projeto, você pode executar:
- `npm run dev`: Executa a aplicação em modo de desenvolvimento.
- `npm run build`: Compila a aplicação para produção, gerando os arquivos na pasta `dist`.
- `npm run lint`: Analisa o código em busca de problemas estruturais, utilizando o ESLint.
- `npm run preview`: Inicia um servidor local para visualizar a build de produção localmente.
