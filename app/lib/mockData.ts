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

  { nome: "Ivo André Mattos", crm: "3054", especialidadeId: 13, sexo: "M" },

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
