import { NextResponse } from "next/server";
import { mockMedicos } from "@/app/lib/mockData";
import type { Medico } from "@/app/lib/types";

export async function GET() {
  try {
    return NextResponse.json(mockMedicos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar médicos", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: {
      nome: string;
      crm: string;
      especialidadeId: number;
      imageUrl: string;
      sexo: string;
    } = await request.json();

    if (!body.nome || !body.crm || !body.especialidadeId) {
      return NextResponse.json(
        { message: "Preencha todos os campos" },
        { status: 400 } // 400 Bad Request
      );
    }

    const novoMedico: Medico = {
      id: mockMedicos.length + 1,
      nome: body.nome,
      crm: body.crm,
      especialidadeId: body.especialidadeId,
      imageUrl: body.imageUrl || "null",
      sexo: body.sexo || "null",
    };

    mockMedicos.push(novoMedico);
    return NextResponse.json(novoMedico, { status: 201 }); // 201 Created
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao cadastrar médico", error },
      { status: 500 }
    );
  }
}
