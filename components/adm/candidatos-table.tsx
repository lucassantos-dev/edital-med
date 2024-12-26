import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download } from 'lucide-react'
import type { Candidato } from '@/lib/types'

interface CandidatosTableProps {
  candidatos: Candidato[]
  onCandidatoClick: (candidato: Candidato) => void
  onDownloadArquivos: (id: number) => void
  onToggleDocumentosValidados: (id: number) => void
  isDownloading: number | null
}

export function CandidatosTable({
  candidatos,
  onCandidatoClick,
  onDownloadArquivos,
  onToggleDocumentosValidados,
  isDownloading,
}: CandidatosTableProps) {
  // Estado de paginação
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage] = useState(5) // Defina o número de itens por página

  // Calcular os itens da página atual
  const indexOfLastItem = (currentPage + 1) * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = candidatos.slice(indexOfFirstItem, indexOfLastItem)
  // Funções de navegação de página
  const nextPage = () => {
    if (currentPage < Math.ceil(candidatos.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
          <span className="text-sm">Documentos Validados</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <span className="text-sm">Documentos Não Validados</span>
        </div>
      </div>
      <Table className="bg-white border-2 rounded-lg">
        <TableCaption>Lista de Candidatos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Cidade/Estado</TableHead>
            <TableHead>Arquivos</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((candidato) => (
            <TableRow
              key={candidato.id}
              onClick={() => onCandidatoClick(candidato)}
              className={`cursor-pointer hover:bg-gray-100 ${
                candidato.documentosValidados
                  ? 'bg-green-100 hover:bg-green-200'
                  : 'bg-red-100 hover:bg-red-200'
              }`}
            >
              <TableCell>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      candidato.documentosValidados
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                    aria-hidden="true"
                  />
                  {candidato.nome}
                </div>
              </TableCell>
              <TableCell>{candidato.email}</TableCell>
              <TableCell>{candidato.cnpjCpf}</TableCell>
              <TableCell>{candidato.telefone}</TableCell>
              <TableCell>{candidato.cargo}</TableCell>
              <TableCell>{`${candidato.cidade}/${candidato.estado}`}</TableCell>
              <TableCell>
                <Button
                  onClick={() => onDownloadArquivos(candidato.id)}
                  disabled={isDownloading === candidato.id}
                  variant="outline"
                  size="sm"
                >
                  {isDownloading === candidato.id ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">&#9696;</span>
                      Carregando...
                    </span>
                  ) : (
                    <>
                      Baixar Arquivo
                      <Download className="h-4 w-4 mr-2" />
                    </>
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-28"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleDocumentosValidados(candidato.id)
                  }}
                >
                  {candidato.documentosValidados
                    ? 'Invalidar Docs'
                    : 'Validar Docs'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Controles de navegação */}
      <div className="flex justify-between mt-4">
        <Button onClick={prevPage} disabled={currentPage === 0}>
          Anterior
        </Button>
        <Button
          onClick={nextPage}
          disabled={
            currentPage >= Math.ceil(candidatos.length / itemsPerPage) - 1
          }
        >
          Próximo
        </Button>
      </div>
    </>
  )
}
