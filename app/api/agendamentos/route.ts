import { NextResponse } from "next/server";
import { mockAgendamentos } from "@/app/lib/mockData";
import type { Agendamento } from "@/app/lib/types";

export async function GET() {
  try {
    return NextResponse.json(mockAgendamentos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar agendamentos", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: {
      pacienteNome: string;
      dataHora: string;
      especialidadeId: number;
      convenioID: number;
      medicoID: number;
      status: string;
    } = await request.json();

    if (
      !body.pacienteNome ||
      !body.dataHora ||
      !body.especialidadeId ||
      !body.convenioID ||
      !body.medicoID ||
      !body.status
    ) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 } // 400 Bad Request
      );
    }

    const novoAgendamento: Agendamento = {
      id: mockAgendamentos.length + 1,
      pacienteNome: body.pacienteNome,
      dataHora: body.dataHora,
      especialidadeId: body.especialidadeId,
      convenioId: body.convenioID,
      medicoId: body.medicoID,
      status: body.status || "agendado",
    };

    mockAgendamentos.push(novoAgendamento);
    return NextResponse.json(novoAgendamento, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao realizar agendamento", error },
      { status: 500 }
    );
  }
}
