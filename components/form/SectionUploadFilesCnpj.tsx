import type { UseFormReturn } from "react-hook-form";
import FileUpload from "../InputFile";
import type { formSchema } from "@/zod-schema/schema";
import type { z } from "zod";

interface SectionUploadFileProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function SectionUploadFile({ form }: SectionUploadFileProps) {
  const { isCpf } = form.watch();

  return (
    <div className="space-y-4">
      <div>
        {isCpf ? (
          <div className="text-gray-700">
            Envie um arquivo <strong>.zip</strong> contendo:
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>Currículo (PDF/Word)</li>
              <li>Carteira do Conselho de Classe</li>
              <li>Certidão Negativa do Conselho de Classe</li>
            </ul>
          </div>
        ) : (
          <div className="text-gray-700">
            Envie um arquivo <strong>.zip</strong> contendo:
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>Relação de Profissionais</li>
              <li>Lista de CNAEs</li>
              <li>Registro no Conselho de Classe</li>
              <li>Alvará de Funcionamento</li>
              <li>Alvará Sanitário</li>
            </ul>
          </div>
        )}
      </div>
      <FileUpload
        acceptFiles=".zip,.rar"
        control={form.control}
        name="documentos"
        id="documentos"
        title="Envie os documentos"
        description='Envie nos formatos .zip ou .rar'
      />
      <p className="text-sm text-gray-500">
        Caso os arquivos não estejam compactados, você pode usar ferramentas online como o{" "}
        <a
          href="https://smallpdf.com/pt/comprimir-pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 font-bold"
        >
          Smallpdf
        </a>{" "}
        para comprimi-los antes de fazer o upload.
      </p>
    </div>
  );
}
