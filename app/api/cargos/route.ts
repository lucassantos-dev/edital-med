import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try{
      const cargos = await prisma.cargos.findMany()
      return NextResponse.json({ message: 'Cadastro realizado com sucesso', cargos: cargos });
    } catch(erro) {
      console.error('Erro ao buscar cargos :', erro)
    }
 
}