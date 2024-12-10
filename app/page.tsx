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
        <div className='flex justify-center bg-white w-[250px] h-[60px] rounded-lg p-2' >
          <Image src="/Logo_Medlar.png" alt="Medlar Logo" width={200} height={100} className="" />
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
              A MEDLAR Soluções em Saúde leva ao conhecimento dos interessados o 
              presente processo de captação e seleção de pessoas físicas ou jurídicas: <span className='text-teal-600 font-semibold'>enfermeiros, médicos, fisioterapeutas, 
              fonoaudiólogos, psicólogos,  terapeutas ocupacionais, nutricionistas,</span> interessados na prestação de serviços em atenção 
              domiciliar nas modalidades de gerenciamento e internação domiciliar aos diversos clientes que necessitem de assistência 
              domiciliar nas cidades de médio porte dos estados e municípios dos estados Norte e Nordeste brasileiro, 
              nas condições estabelecidas neste edital e seus anexos.
              </p>
                <span> 2. DAS CONDIÇÕES DE PARTICIPAÇÃO</span> 
              <ul className="list-disc list-inside mb-4">
                 <li> 2.1 Somente serão admitidos a participar deste processo de captação e seleção profissionais de saúde autônomos ou pessoas 
                  jurídicas que comprovem regularidade junto ao conselho de classe da categoria
                   (sem pendências financeiras).</li>
                  <li>2.2 Os profissionais selecionados firmaram vínculo de prestação de serviço não empregatício junto a MEDLAR.</li>
                  <li>2.3 Para participar, os profissionais ou pessoas jurídicas interessados, deverão apresentar toda a documentação 
                  solicitada neste edital até 31/12/2024.</li>

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
            <CardFooter  className="justify-center flex">
            <Link href="/Edital-de-captacao-PJ.pdf"> 
              <Button className="w-full bg-[#67a892] hover:bg-[#4a79ad]">
                Download do Edital
              </Button>
            </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mb-12">
          <Link href="/cadastro">
            <Button size="lg" className="bg-[#4a79ad] hover:bg-[#67a892] text-lg  text-white h-16">
              Ir para a Página de Cadastro
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
