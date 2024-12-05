import type { UseFormReturn } from "react-hook-form";
import FileUpload from "../InputFile";
import type { formSchema } from "@/zod-schema/schema";
import type { z } from "zod";

interface SectionUploadFileProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}
export default function SectionUploadFile({ form }: SectionUploadFileProps) {
  const uploadDescription = `
  Faça o upload do arquivo contendo a Relação dos Profissionais, incluindo o Curriculum Vitae e a Carteira do Conselho de Classe, em formato .zip ou .rar.
  Caso os arquivos não estejam compactados, você pode usar ferramentas online como o <a href="https://smallpdf.com/pt/comprimir-pdf" target="_blank" rel="noopener noreferrer" style="color: #18d932; font-weight: bold;"> Smallpdf </a>para comprimi-los antes de fazer o upload.
`


  return (
    <div className="space-y-4">
      {form.getValues("isCpf") ? (
        <>
          <FileUpload control={form.control}
            description="Faça upload do seu currículo em formato PDF ou Word (máx. 5MB)"
            id="cv-upload"
            name="documentosCpf.cv"
            title="Currículo"
            acceptFiles=".pdf" />
          <FileUpload control={form.control}
            description="Faça upload do seu Carteira do Conselho de Classe"
            id="carteira-conselho-upload"
            name="documentosCpf.carteiraConselhoClasse"
            title="Carteira do Conselho de Classe"
            acceptFiles=".pdf" />
          <FileUpload control={form.control}
            description=" Faça upload da sua Certidão negativa do Conselho de Classe"
            id="certidao-negativa-upload"
            name="documentosCpf.certidaoNegativa"
            title="Certidão Negativa"
            acceptFiles=".pdf" />
        </>
      ) : (
        <>
          <FileUpload
            control={form.control}
            description={uploadDescription}
            id="relacao-profissionais-pj"
            name="documentosCnpj.relacaoProfissionais"
            title="Relação dos Profissionais com Curriculum Vitae e Carteira do Conselho"
            acceptFiles=".zip,.rar" />
          <FileUpload
            control={form.control}
            description="Faça upload das CNAS/Solicitação Cadastral"
            id="cnaes"
            name="documentosCnpj.cnaes"
            title="CNAS/Solicitação Cadastral"
            acceptFiles=".pdf"
          />
          <FileUpload
            control={form.control}
            description="Faça upload Registro de empresa junto ao conselho de classe (responsável tecnico)"
            id="registroConselhoClasse"
            name="documentosCnpj.registroConselhoClasse"
            title="Registro de empresa junto ao conselho de classe"
            acceptFiles=".pdf" />
          <FileUpload
            control={form.control}
            description="Faça upload do Alvará de Funcionamento"
            id="alvaraFuncionamento"
            name="documentosCnpj.alvaraFuncionamento"
            title="Alvará de Funcionamento"
            acceptFiles=".pdf" />
          <FileUpload
            control={form.control}
            description="Faça upload do seu Alvará Sanitário"
            id="alvaraSanitario"
            name="documentosCnpj.alvaraSanitario"
            title="Alvará Sanitário"
            acceptFiles=".pdf" />
        </>

      )
      }
    </div>
  )
}