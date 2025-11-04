# AgendaMed

Este projeto foi tem como objetivo criar um sistema de agendamento de consultas médicas, com foco em usabilidade, boas práticas de código e simulação de API REST.


## Tecnologias

- *Next.js* (React)

- *Node.js* >= 18.0.0

## Como Rodar o Projeto

### 1. Clonar o repositório
 ```bash
git clone https://github.com/nathalia-b/agenda-med.git
cd agenda-med
```

### 2. Instalar dependências

```bash
npm install
```

### 4. Executar o servidor

```bash
npm run dev
```

Acesse o projeto em *[http://localhost:3000](http://localhost:3000)*

## Funcionalidades


- Cadastrar e listar agendamentos
- Marcar um agendamento como "Atendido"
- Listar especialidades e seus respectivos médicos
- Cadastrar uma nova especialidade
- Cadastrar num novo médico
- Listar convênios 


## Endpoints

- Especialidades
  - ```POST /api/especialidades``` -> Cadastrar uma nova especialidade
  - ```GET /api/especialidades``` -> Listar especialidades

- Convênios
  - ```POST /api/convenios``` -> Cadastrar novo convênio
  - ```GET /api/convenios``` -> Listar convênios

- Agendamentos
  - ```POST /api/agendamentos``` -> Agendar consulta
  - ```GET /api/agendamentos``` -> Listar agendamentos

