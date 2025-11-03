import { Agendamento, Convenio, Especialidade, Medico } from "./types";

export const mockEspecialidades: Especialidade[] = [
  "Alergologia e Imunologia",
  "Anestesiologia",
  "Cardiologia",
  "Cirurgia Geral",
  "Colonoscopia",
  "Dermatologia",
  "Geriatria",
  "Ginecologia",
  "Hepatologia",
  "Infectologia",
  "Mastologia",
  "Neurocirurgia",
  "Neurologia",
  "Oftalmologia",
  "Oncogenética",
].map((nome, index) => ({
  id: index + 1,
  nome,
}));

export const mockConvenios: Convenio[] = [
  "Unimed",
  "Hapvida",
  "Humana Saúde",
  "Bradesco Saúde",
  "Amil",
  "SulAmérica",
  "Natal Saúde",
  "VitalCare",
  "VitaPlan",
  "Santander",
].map((nome, index) => ({
  id: index + 1,
  nome,
}));

const urlF = "https://randomuser.me/api/portraits/women/";
const urlM = "https://randomuser.me/api/portraits/men/";

export const mockMedicos: Medico[] = [
  { nome: "Ana Carina Fonseca", crm: "1235", especialidadeId: 1, sexo: "F" },

  { nome: "Carlos Alberto Silva", crm: "6843", especialidadeId: 2, sexo: "M" },
  { nome: "Bruno Lima Farias", crm: "5431", especialidadeId: 2, sexo: "M" },
  { nome: "Roberto Silva Ribeiro", crm: "6890", especialidadeId: 2, sexo: "M" },

  { nome: "Ana Paula Souza", crm: "1345", especialidadeId: 3, sexo: "F" },
  { nome: "Bruno Henrique Costa", crm: "2876", especialidadeId: 3, sexo: "M" },

  { nome: "Camila Rodrigues Lima", crm: "3901", especialidadeId: 4, sexo: "F" },
  { nome: "Daniel Lima Santos", crm: "4829", especialidadeId: 4, sexo: "M" },
  { nome: "Pedro Alves Silva", crm: "5098", especialidadeId: 4, sexo: "M" },

  { nome: "Ana Martins Rocha", crm: "6234", especialidadeId: 5, sexo: "F" },

  { nome: "Gustavo Nunes Pereira", crm: "7582", especialidadeId: 6, sexo: "M" },
  { nome: "Igor Batista Ribeiro", crm: "9127", especialidadeId: 6, sexo: "M" },

  { nome: "Julia Farias Monteiro", crm: "0673", especialidadeId: 7, sexo: "F" },
  { nome: "Carlos Alberto Silva", crm: "6843", especialidadeId: 7, sexo: "M" },
  { nome: "João Alberto Pereira", crm: "6483", especialidadeId: 7, sexo: "M" },

  { nome: "Luciana Torres", crm: "9125", especialidadeId: 8, sexo: "F" },
  { nome: "Fábio Pereira", crm: "8701", especialidadeId: 8, sexo: "M" },
  { nome: "Marcela Andrade", crm: "1992", especialidadeId: 8, sexo: "F" },

  { nome: "Lucas Mendes", crm: "3425", especialidadeId: 9, sexo: "M" },

  { nome: "Sofia Costa", crm: "6721", especialidadeId: 10, sexo: "F" },
  { nome: "Tiago Lima", crm: "9840", especialidadeId: 10, sexo: "M" },
  { nome: "Renata Silva", crm: "7653", especialidadeId: 10, sexo: "F" },

  { nome: "André Alves Ferreira", crm: "5098", especialidadeId: 11, sexo: "M" },

  { nome: "Patrícia Sousa", crm: "5041", especialidadeId: 12, sexo: "F" },
  { nome: "Péricles Alves", crm: "5411", especialidadeId: 12, sexo: "M" },

  { nome: "Ivo André Mattos", crm: "3054", especialidadeId: 12, sexo: "M" },

  { nome: "Cássia Sofia Ribeiro", crm: "9860", especialidadeId: 14, sexo: "F" },

  { nome: "Carmen Fernandes", crm: "1278", especialidadeId: 15, sexo: "F" },
  { nome: "Tiago Lima", crm: "9840", especialidadeId: 15, sexo: "M" },
  { nome: "Gabriela Santiago", crm: "6537", especialidadeId: 15, sexo: "F" },
  { nome: "Paulo Fernandes", crm: "2786", especialidadeId: 15, sexo: "M" },
].map((medico, index) => ({
  id: index,
  imageUrl: medico.sexo === "F" ? `${urlF}${index}.jpg` : `${urlM}${index}.jpg`,
  ...medico,
}));

export const mockAgendamentos: Agendamento[] = [
  {
    pacienteNome: "Cristiana Medeiros",
    dataHora: "2025-11-20T10:00:00",
    especialidadeId: 1,
    convenioId: "particular",
    medicoId: 1,
    status: "agendado",
  },
  {
    pacienteNome: "João Paciente",
    dataHora: "2025-11-20T11:30:00",
    especialidadeId: 3,
    convenioId: 3,
    medicoId: 4,
    status: "agendado",
  },
  {
    pacienteNome: "Zahra Ambessa",
    dataHora: "2025-11-20T09:00:00",
    especialidadeId: 2,
    convenioId: 1,
    medicoId: 2,
    status: "agendado",
  },
  {
    pacienteNome: "Za Amsa",
    dataHora: "2025-11-20T11:00:00",
    especialidadeId: 3,
    convenioId: "particular",
    medicoId: 5,
    status: "agendado",
  },
  {
    pacienteNome: "Ambessa Silva",
    dataHora: "2025-11-20T10:00:00",
    especialidadeId: 1,
    convenioId: 2,
    medicoId: 1,
    status: "agendado",
  },
  {
    pacienteNome: "Sofia Costa",
    dataHora: "2025-11-21T15:30:00",
    especialidadeId: 10,
    convenioId: 6,
    medicoId: 20,
    status: "agendado",
  },
  {
    pacienteNome: "Marcos Vinicius",
    dataHora: "2025-11-22T09:00:00",
    especialidadeId: 4,
    convenioId: "particular",
    medicoId: 7,
    status: "agendado",
  },

  {
    pacienteNome: "Gabriel Santos",
    dataHora: "2025-11-22T11:00:00",
    especialidadeId: 2,
    convenioId: 2,
    medicoId: 3,
    status: "agendado",
  },
  {
    pacienteNome: "Camila Pereira",
    dataHora: "2025-11-23T08:30:00",
    especialidadeId: 5,
    convenioId: 4,
    medicoId: 9,
    status: "atendido",
  },
  {
    pacienteNome: "Rafael Andrade",
    dataHora: "2025-11-23T09:15:00",
    especialidadeId: 7,
    convenioId: 5,
    medicoId: 12,
    status: "agendado",
  },
  {
    pacienteNome: "Felipe Lima",
    dataHora: "2025-11-23T11:30:00",
    especialidadeId: 3,
    convenioId: 2,
    medicoId: 5,
    status: "atendido",
  },
  {
    pacienteNome: "Ana Carolina Souza",
    dataHora: "2025-11-24T14:00:00",
    especialidadeId: 1,
    convenioId: 3,
    medicoId: 1,
    status: "agendado",
  },
  {
    pacienteNome: "Patrícia Almeida",
    dataHora: "2025-11-24T16:30:00",
    especialidadeId: 10,
    convenioId: 5,
    medicoId: 22,
    status: "agendado",
  },
  {
    pacienteNome: "Larissa Ferreira",
    dataHora: "2025-11-25T10:30:00",
    especialidadeId: 6,
    convenioId: "particular",
    medicoId: 11,
    status: "agendado",
  },
].map((agendamento, index) => ({
  id: index,
  ...agendamento,
}));
