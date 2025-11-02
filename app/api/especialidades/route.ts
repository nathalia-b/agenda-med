// Em: app/api/especialidades/route.ts
import { NextResponse } from "next/server";
import { mockEspecialidades } from "@/app/lib/mockData";
import type { Especialidade } from "@/app/lib/types";

export async function GET() {
  try {
    return NextResponse.json(mockEspecialidades, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar especialidades", error },
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

    const novaEspecialidade: Especialidade = {
      id: mockEspecialidades.length + 1,
      nome: body.nome,
    };

    mockEspecialidades.push(novaEspecialidade);
    return NextResponse.json(novaEspecialidade, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao cadastrar especialidade", error },
      { status: 500 }
    );
  }
}
