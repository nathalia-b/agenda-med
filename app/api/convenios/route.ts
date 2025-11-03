import { NextResponse } from "next/server";
import { mockConvenios } from "@/app/lib/mockData";
import type { Convenio } from "@/app/lib/types";

export async function GET() {
  try {
    return NextResponse.json(mockConvenios, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar convênios", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: { nome: string } = await request.json();

    if (!body.nome) {
      return NextResponse.json(
        { message: 'O campo "nome" é obrigatório' },
        { status: 400 } // 400 Bad Request
      );
    }

    const novoConvenio: Convenio = {
      id: mockConvenios.length + 1,
      nome: body.nome,
    };

    mockConvenios.push(novoConvenio);
    return NextResponse.json(novoConvenio, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao cadastrar especialidade", error },
      { status: 500 }
    );
  }
}
