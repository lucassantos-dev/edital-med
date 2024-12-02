/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Control } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


interface CustomInputProps {
  control: Control<any>
}
export default function CCCUploadForm({ control }: CustomInputProps) {
  const [fileCccName, setFileCccName] = useState<string | null>(null);

  return (
    <FormField
      control={control}
      name="ccc" // Certifique-se de que o nome seja o mesmo usado no schema
      render={({ field: { onChange }, fieldState }) => (
        <FormItem>
          <FormLabel className="text-lg text-[#4a79ad] font-semibold">Carteira do Conselho de Classe</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const fileList = e.target.files;
                  if (fileList && fileList.length > 0) {
                    setFileCccName(fileList[0].name);
                    onChange(fileList); // Passa o FileList para o formulário
                  } else {
                    setFileCccName(null);
                    onChange(null); // Limpa o valor se nenhum arquivo for selecionado
                  }
                }}
                className="hidden"
                id="Ccc-upload"
              />
              <label
                htmlFor="Ccc-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm 
                font-medium ring-offset-background transition-colors focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 bg-[#4a79ad] hover:bg-[#67a4eb] 
                text-primary-foreground h-10 px-4 py-2"
              >
                Selecionar arquivo
              </label>
              {fileCccName && <span className="text-sm text-muted-foreground">{fileCccName}</span>}
            </div>
          </FormControl>
          {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          <FormDescription>
            Faça upload do seu Carteira do Conselho de Classe
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
