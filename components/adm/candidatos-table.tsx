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
import type { Candidato } from '@/lib/types'
import { Download } from 'lucide-react'

interface CandidatosTableProps {
  candidatos: Candidato[]
  onCandidatoClick: (candidato: Candidato) => void
  onDownloadArquivos: (id: number) => void
  onToggleDocumentosValidados: (id: number) => void
  onToggleAtivo: (id: number) => void
}

export function CandidatosTable({
  candidatos,
  onCandidatoClick,
  onDownloadArquivos,
  onToggleDocumentosValidados,
  // onToggleAtivo,
}: CandidatosTableProps) {
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
          {candidatos.map((candidato) => (
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
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDownloadArquivos(candidato.id)
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
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
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="w-28"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleAtivo(candidato.id)
                  }}
                >
                  {candidato.ativo ? 'Desativar' : 'Ativar'}
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
