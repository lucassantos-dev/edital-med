import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from 'lucide-react'
import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <div className="min-h-screen bg-gradient-to-b from-[#4a79ad] to-[#67a892] text-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <svg className="absolute top-0 left-0 text-white/10" width="404" height="392" fill="none" viewBox="0 0 404 392">
          <defs>
            <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </svg>
        <svg className="absolute bottom-0 right-0 text-white/10 transform rotate-180" width="404" height="392" fill="none" viewBox="0 0 404 392">
          <defs>
            <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-12 text-white">Edital de Vagas - Medlar</h1>
        <div className='flex justify-center h-20 m-3'>
        <div className='flex justify-center bg-white w-[250px] h-[18] rounded-lg p-2' >
          <Image src="/Logo_Medlar.png" alt="Medlar Logo" width={200} height={150} className="" />
        </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/90 text-gray-800">
            <CardHeader>
              <CardTitle className="text-[#4a79ad]">Informações do Edital</CardTitle>
              <CardDescription>Detalhes sobre as vagas disponíveis na Medlar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A Medlar está com vagas abertas para diversos cargos. Este edital contém todas as informações
                necessárias para os candidatos interessados em fazer parte da nossa equipe.
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Período de inscrições: 01/06/2024 a 30/06/2024</li>
                <li>Vagas disponíveis: </li>
                <li>Requisitos: Formação superior na área e experiência mínima de 2 anos</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white/90 text-gray-800">
            <CardHeader>
              <CardTitle className="text-[#67a892]">Arquivo do Edital</CardTitle>
              <CardDescription>Faça o download do edital completo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-md border-[#67a892]">
                <FileText className="mr-2 text-[#67a892]" />
                <span>edital_vagas_medlar_2024.pdf</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#67a892] hover:bg-[#4a79ad]">
                Download do Edital
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mb-12">
          <Link href="/cadastro">
            <Button size="lg" className="bg-[#4a79ad] hover:bg-[#67a892] text-white">
              Ir para a Página de Cadastro
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
