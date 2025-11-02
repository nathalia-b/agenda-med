export interface Especialidade {
  id: number;
  nome: string;
}

export interface Convenio {
  id: number;
  nome: string;
}

export interface Medico {
  imageUrl: string;
  id: number;
  nome: string;
  crm: string;
  especialidadeId: number;
  sexo: string;
}

export interface Disponibilidade {
  id: number;
  medicoId: number;
  data: string;
  horario: string;
  ocupado: boolean;
}

export interface Agendamento {
  id: number;
  pacienteNome: string;
  dataHora: string;
  especialidadeId: number;
  convenioId: number;
  medicoId: number;
  status: string;
}
