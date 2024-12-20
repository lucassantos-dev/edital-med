'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveAs } from 'file-saver'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CriarUsuarioForm } from '@/components/adm/criar-usuario-form'
import {
  ChevronDown,
  User,
  FileText,
  Settings,
  LogOut,
  Download,
} from 'lucide-react'
import type { Candidato } from '@/lib/types'
import { CandidatosTable } from '@/components/adm/candidatos-table'
import { CandidatoDetalhes } from '@/components/adm/candidato-detalhes'
import { ConfirmDialog } from '@/components/adm/confirm-dialog'
import ExcelJS from 'exceljs'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { signOut } from 'next-auth/react'
// // Dados de exemplo para a tabela
// const candidatos: Candidato[] = [
//   {
//     id: 1,
//     nome: 'João Silva',
//     email: 'joao@example.com',
//     cnpjCpf: '123.456.789-00',
//     telefone: '(11) 98765-4321',
//     sexo: 'Masculino',
//     especializacao: 'Geriatria',
//     experiencia: '5 anos',
//     experienciaHomeCare: '3 anos',
//     cargo: 'Enfermeiro',
//     valor: 100,
//     idade: 35,
//     cep: '01234-567',
//     cidade: 'São Paulo',
//     estado: 'SP',
//     documentosValidados: true,
//     ativo: true,
//     atuacoes: [
//       { id: 1, cidade: 'São Paulo' },
//       { id: 2, cidade: 'Campinas' },
//     ],
//   },
//   {
//     id: 2,
//     nome: 'Maria Santos',
//     email: 'maria@example.com',
//     cnpjCpf: '987.654.321-00',
//     telefone: '(21) 98765-4321',
//     sexo: 'Feminino',
//     especializacao: 'Ortopedia',
//     experiencia: '7 anos',
//     experienciaHomeCare: '2 anos',
//     cargo: 'Fisioterapeuta',
//     valor: 90,
//     idade: 32,
//     cep: '20000-000',
//     cidade: 'Rio de Janeiro',
//     estado: 'RJ',
//     documentosValidados: false,
//     ativo: true,
//     atuacoes: [{ id: 3, cidade: 'Rio de Janeiro' }],
//   },
//   {
//     id: 3,
//     nome: 'Carlos Oliveira',
//     email: 'carlos@example.com',
//     cnpjCpf: '456.789.123-00',
//     telefone: '(31) 98765-4321',
//     sexo: 'Masculino',
//     especializacao: null,
//     experiencia: '2 anos',
//     experienciaHomeCare: '1 ano',
//     cargo: 'Cuidador',
//     valor: 50,
//     idade: 28,
//     cep: '30000-000',
//     cidade: 'Belo Horizonte',
//     estado: 'MG',
//     documentosValidados: true,
//     ativo: false,
//     atuacoes: [
//       { id: 4, cidade: 'Belo Horizonte' },
//       { id: 5, cidade: 'Contagem' },
//     ],
//   },
//   {
//     id: 4,
//     nome: 'Ana Pereira',
//     email: 'ana@example.com',
//     cnpjCpf: '789.123.456-00',
//     telefone: '(41) 98765-4321',
//     sexo: 'Feminino',
//     especializacao: 'UTI',
//     experiencia: '4 anos',
//     experienciaHomeCare: null,
//     cargo: 'Técnico de Enfermagem',
//     valor: 70,
//     idade: 30,
//     cep: '80000-000',
//     cidade: 'Curitiba',
//     estado: 'PR',
//     documentosValidados: false,
//     ativo: true,
//     atuacoes: [{ id: 6, cidade: 'Curitiba' }],
//   },
//   {
//     id: 5,
//     nome: 'Pedro Costa',
//     email: 'pedro@example.com',
//     cnpjCpf: '321.654.987-00',
//     telefone: '(51) 98765-4321',
//     sexo: 'Masculino',
//     especializacao: 'Clínica Geral',
//     experiencia: '10 anos',
//     experienciaHomeCare: '5 anos',
//     cargo: 'Médico',
//     valor: 200,
//     idade: 40,
//     cep: '90000-000',
//     cidade: 'Porto Alegre',
//     estado: 'RS',
//     documentosValidados: true,
//     ativo: true,
//     atuacoes: [
//       { id: 7, cidade: 'Porto Alegre' },
//       { id: 8, cidade: 'Canoas' },
//     ],
//   },
// ]

export default function ParticipantesPage() {
  const router = useRouter()
  const [candidatosData, setCandidatosData] = useState<Candidato[]>([])
  const [filteredCandidatos, setFilteredCandidatos] = useState<Candidato[]>([])
  const [selectedCandidato, setSelectedCandidato] = useState<Candidato | null>(
    null,
  )
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [confirmDialogConfig, setConfirmDialogConfig] = useState({
    title: '',
    description: '',
    onConfirm: () => {},
  })
  const [filters, setFilters] = useState({
    nome: '',
    cpf: '',
    cidade: '',
    cargo: '',
    atuacao: '',
  })

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const response = await fetch('/api/protected/candidatos')
        const data = await response.json()
        setCandidatosData(data)
        setFilteredCandidatos(data)
      } catch (error) {
        console.log('Erro ao buscar candidatos:', error)
      }
    }
    fetchCandidatos()
  }, [router])

  useEffect(() => {
    const filtered = candidatosData.filter(
      (candidato) =>
        candidato.nome.toLowerCase().includes(filters.nome.toLowerCase()) &&
        candidato.cnpjCpf.includes(filters.cpf) &&
        candidato.cidade.toLowerCase().includes(filters.cidade.toLowerCase()) &&
        candidato.cargo.toLowerCase().includes(filters.cargo.toLowerCase()) &&
        (filters.atuacao === '' ||
          candidato.atuacoes.some((atuacao) =>
            atuacao.cidade
              .toLowerCase()
              .includes(filters.atuacao.toLowerCase()),
          )),
    )
    setFilteredCandidatos(filtered)
  }, [filters, candidatosData])

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin' })
  }

  const handleDownloadArquivos = (id: number) => {
    // Lógica para download de arquivos
    console.log(`Baixando arquivos do candidato ${id}`)
  }

  const handleToggleDocumentosValidados = (id: number) => {
    const candidato = candidatosData.find((c) => c.id === id)
    if (candidato) {
      setConfirmDialogConfig({
        title: 'Confirmar Alteração',
        description: `Deseja ${candidato.documentosValidados ? 'invalidar' : 'validar'} os documentos de ${candidato.nome}?`,
        onConfirm: () => {
          setCandidatosData((prevData) =>
            prevData.map((c) =>
              c.id === id
                ? { ...c, documentosValidados: !c.documentosValidados }
                : c,
            ),
          )
          setIsConfirmDialogOpen(false)
        },
      })
      setIsConfirmDialogOpen(true)
    }
  }

  const handleToggleAtivo = (id: number) => {
    const candidato = candidatosData.find((c) => c.id === id)
    if (candidato) {
      setConfirmDialogConfig({
        title: 'Confirmar Alteração',
        description: `Deseja ${candidato.ativo ? 'desativar' : 'ativar'} o candidato ${candidato.nome}?`,
        onConfirm: () => {
          setCandidatosData((prevData) =>
            prevData.map((c) => (c.id === id ? { ...c, ativo: !c.ativo } : c)),
          )
          setIsConfirmDialogOpen(false)
        },
      })
      setIsConfirmDialogOpen(true)
    }
  }

  const handleCandidatoClick = (candidato: Candidato) => {
    setSelectedCandidato(candidato)
    setIsDetailOpen(true)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const exportToExcel = async () => {
    setIsExporting(true)
    try {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Candidatos')

      // Adicionando cabeçalhos
      worksheet.columns = [
        { header: 'Nome', key: 'nome', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'CPF/CNPJ', key: 'cnpjCpf', width: 20 },
        { header: 'Telefone', key: 'telefone', width: 20 },
        { header: 'Cargo', key: 'cargo', width: 30 },
        { header: 'Cidade', key: 'cidade', width: 20 },
        { header: 'Estado', key: 'estado', width: 15 },
        {
          header: 'Documentos Validados',
          key: 'documentosValidados',
          width: 20,
        },
        { header: 'Ativo', key: 'ativo', width: 10 },
        { header: 'Atuações', key: 'atuacoes', width: 30 },
      ]

      // Adicionando dados
      filteredCandidatos.forEach((candidato) => {
        worksheet.addRow({
          nome: candidato.nome,
          email: candidato.email,
          cnpjCpf: candidato.cnpjCpf,
          telefone: candidato.telefone,
          cargo: candidato.cargo,
          cidade: candidato.cidade,
          estado: candidato.estado,
          documentosValidados: candidato.documentosValidados ? 'Sim' : 'Não',
          ativo: candidato.ativo ? 'Sim' : 'Não',
          atuacoes: candidato.atuacoes,
        })
      })

      // Gerar o arquivo Excel
      const buffer = await workbook.xlsx.writeBuffer()

      // Salvar o arquivo usando file-saver
      const data = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      saveAs(data, 'candidatos.xlsx')
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error)
    } finally {
      setIsExporting(false)
    }
  }
  return (
    <div className="min-h-screen ">
      <header className="bg-[#4a79ad] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Dashboard de Candidatos
          </h1>
          <nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Menu <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Opções</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsCreateUserOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Criar Usuário</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Relatórios</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="shadow-lg border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="filter-nome">Nome</Label>
              <Input
                id="filter-nome"
                value={filters.nome}
                onChange={(e) => handleFilterChange('nome', e.target.value)}
                placeholder="Filtrar por nome"
              />
            </div>
            <div>
              <Label htmlFor="filter-cpf">CPF/CNPJ</Label>
              <Input
                id="filter-cpf"
                value={filters.cpf}
                onChange={(e) => handleFilterChange('cpf', e.target.value)}
                placeholder="Filtrar por CPF/CNPJ"
              />
            </div>
            <div>
              <Label htmlFor="filter-cidade">Cidade</Label>
              <Input
                id="filter-cidade"
                value={filters.cidade}
                onChange={(e) => handleFilterChange('cidade', e.target.value)}
                placeholder="Filtrar por cidade"
              />
            </div>
            <div>
              <Label htmlFor="filter-cargo">Cargo</Label>
              <Input
                id="filter-cargo"
                value={filters.cargo}
                onChange={(e) => handleFilterChange('cargo', e.target.value)}
                placeholder="Filtrar por cargo"
              />
            </div>
            <div>
              <Label htmlFor="filter-atuacao">Atuação</Label>
              <Input
                id="filter-atuacao"
                value={filters.atuacao}
                onChange={(e) => handleFilterChange('atuacao', e.target.value)}
                placeholder="Filtrar por atuação"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4 flex justify-end">
          <Button
            onClick={exportToExcel}
            disabled={isExporting}
            className="w-48 bg-[#4a79ad]"
          >
            {isExporting ? (
              <>
                <span className="animate-spin mr-2">&#9696;</span>
                Exportando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar para Excel
              </>
            )}
          </Button>
        </div>
        <div className="bg-white border-2 rounded-lg shadow-lg  p-6 overflow-x-auto">
          <CandidatosTable
            candidatos={filteredCandidatos}
            onCandidatoClick={handleCandidatoClick}
            onDownloadArquivos={handleDownloadArquivos}
            onToggleDocumentosValidados={handleToggleDocumentosValidados}
            onToggleAtivo={handleToggleAtivo}
          />
        </div>
      </main>
      <CandidatoDetalhes
        candidato={selectedCandidato}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDialogConfig.onConfirm}
        title={confirmDialogConfig.title}
        description={confirmDialogConfig.description}
      />
      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogContent>
          <CriarUsuarioForm onClose={() => setIsCreateUserOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}