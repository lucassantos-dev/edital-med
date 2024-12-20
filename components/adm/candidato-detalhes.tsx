import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

type Atuacao = {
  id: number
  cidade: string
}

type CandidatoDetalhado = {
  id: number
  nome: string
  email: string
  cnpjCpf: string
  telefone: string
  sexo: string
  especializacao: string | null
  experiencia: string | null
  experienciaHomeCare: string | null
  cargo: string
  valor: number | null
  idade: number | null
  cep: string
  cidade: string
  estado: string
  documentosValidados: boolean
  ativo: boolean
  atuacoes: Atuacao[]
}

type CandidatoDetalhesProps = {
  candidato: CandidatoDetalhado | null
  isOpen: boolean
  onClose: () => void
}

export function CandidatoDetalhes({
  candidato,
  isOpen,
  onClose,
}: CandidatoDetalhesProps) {
  if (!candidato) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Candidato</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] overflow-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Informações Pessoais</h3>
              <p>
                <strong>Nome:</strong> {candidato.nome}
              </p>
              <p>
                <strong>Email:</strong> {candidato.email}
              </p>
              <p>
                <strong>CPF/CNPJ:</strong> {candidato.cnpjCpf}
              </p>
              <p>
                <strong>Telefone:</strong> {candidato.telefone}
              </p>
              <p>
                <strong>Sexo:</strong> {candidato.sexo}
              </p>
              <p>
                <strong>Idade:</strong> {candidato.idade || 'Não informado'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Informações Profissionais
              </h3>
              <p>
                <strong>Cargo:</strong> {candidato.cargo}
              </p>
              <p>
                <strong>Especialização:</strong>{' '}
                {candidato.especializacao || 'Não informado'}
              </p>
              <p>
                <strong>Experiência:</strong>{' '}
                {candidato.experiencia || 'Não informado'}
              </p>
              <p>
                <strong>Experiência em Home Care:</strong>{' '}
                {candidato.experienciaHomeCare || 'Não informado'}
              </p>
              <p>
                <strong>Valor:</strong>{' '}
                {candidato.valor
                  ? `R$ ${candidato.valor.toFixed(2)}`
                  : 'Não informado'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Localização</h3>
              <p>
                <strong>CEP:</strong> {candidato.cep}
              </p>
              <p>
                <strong>Cidade:</strong> {candidato.cidade}
              </p>
              <p>
                <strong>Estado:</strong> {candidato.estado}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Atuações</h3>
              {candidato.atuacoes.length > 0 ? (
                <ul>
                  {candidato.atuacoes.map((atuacao) => (
                    <li key={atuacao.id}>{atuacao.cidade}</li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma atuação registrada</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Status</h3>
              <p>
                <strong>Documentos Validados:</strong>{' '}
                {candidato.documentosValidados ? 'Sim' : 'Não'}
              </p>
              <p>
                <strong>Ativo:</strong> {candidato.ativo ? 'Sim' : 'Não'}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
