# 🚀 Sistema de Agendamento de Reuniões (Frontend)

## Descrição do Projeto
Este é o frontend de um sistema para agendamento de reuniões, desenvolvido com Next.js. Ele permite que os usuários agendem, visualizem e gerenciem reuniões de forma eficiente.

## 🛠️ Tecnologias Utilizadas
- **Next.js**: Framework React para renderização do lado do servidor (SSR) e geração de páginas estáticas.
- **PrimeReact**: Biblioteca de componentes UI para criar interfaces modernas e responsivas.
- **React Hooks**: Para gerenciamento de estado e efeitos colaterais.
- **Axios**: Para fazer requisições HTTP à API do backend.
- **Toast**: Para exibir notificações de sucesso e erro.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- Git

### Passos para Configuração
1. Clone o repositório:
   bash
   git clone https://github.com/KorujaSedex123/front-sistema.git
   cd front-sistema
   npm install
   npm run dev

   
  🧩 Estrutura do Projeto
Aqui está a estrutura principal do projeto:
frontend/
├── public/                  # Arquivos estáticos (imagens, fonts, etc.)
├── src/
│   ├── app/                 # Páginas e componentes principais
│   ├── demo/                # Exemplos ou demonstrações
│   ├── layout/              # Componentes de layout (cabeçalho, rodapé, etc.)
│   ├── service/             # Serviços para chamadas à API
│   ├── styles/              # Estilos globais e módulos CSS
│   ├── types/               # Tipos TypeScript (se aplicável)
│   └── utils/               # Utilitários e helpers
├── .env.local               # Variáveis de ambiente locais
├── .eslintrc.json           # Configurações do ESLint
├── .gitignore               # Arquivos ignorados pelo Git
├── next.config.js           # Configurações do Next.js
├── package.json             # Dependências e scripts do projeto
├── README.md                # Documentação do projeto
└── tsconfig.json            # Configurações do TypeScript


🌐 Rotas do Frontend
/: Página inicial.

/auth/login: Página de login.

/auth/newuser: Página de cadastro de novo usuário.

/dashboard: Área protegida para agendar e gerenciar reuniões.

📝 Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE.md para mais detalhes.
