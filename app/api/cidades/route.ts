import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uf = searchParams.get("uf");

    // Validação se a UF foi fornecida
    if (!uf) {
      return NextResponse.json({ message: "UF é obrigatória" }, { status: 400 });
    }

    // Buscar o estado pela sigla
    const estado = await prisma.estados.findFirst({
      where: {
        sigla: uf,
      },
    });

    // Caso o estado não seja encontrado, retornar erro
    if (!estado) {
      return NextResponse.json({ message: "Estado não encontrado" }, { status: 404 });
    }

    // Buscar as cidades relacionadas ao estado encontrado
    const cidades = await prisma.cidades.findMany({
      where: {
        idEstado: estado.id, // Verifique o nome correto da chave de relacionamento
      },
    });

    // Retorno das cidades encontradas
    return NextResponse.json({
      message: "Cidades encontradas com sucesso",
      cidades,
    });

  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    return NextResponse.json({ message: "Erro ao buscar cidades" }, { status: 500 });
  }
}
