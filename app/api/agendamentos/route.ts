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
      convenioId: number | string;
      medicoId: number;
      status: string;
    } = await request.json();

    if (
      !body.pacienteNome ||
      !body.dataHora ||
      !body.especialidadeId ||
      !body.medicoId
    ) {
      return NextResponse.json(
        { message: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    const novoAgendamento: Agendamento = {
      id: mockAgendamentos.length + 1,
      pacienteNome: body.pacienteNome,
      dataHora: body.dataHora,
      especialidadeId: body.especialidadeId,
      convenioId: body.convenioId || "particular",
      medicoId: body.medicoId,
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

export async function PATCH(request: Request) {
  try {
    const body: { id: number; status: string } = await request.json();

    if (body.id === undefined || body.id === null || !body.status) {
      return NextResponse.json(
        { message: "ID e status são obrigatórios" },
        { status: 400 }
      );
    }

    const agendamentoIndex = mockAgendamentos.findIndex(
      (a) => a.id === body.id
    );

    // Atualiza o status
    mockAgendamentos[agendamentoIndex].status = body.status;

    return NextResponse.json(mockAgendamentos[agendamentoIndex], {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar status", error },
      { status: 500 }
    );
  }
}
