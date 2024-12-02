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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
}
export default function CVUploadForm({ control }: CustomInputProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <FormField
      control={control}
      name="cv" // Certifique-se de que o nome seja o mesmo usado no schema
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { onChange, value }, fieldState }) => (
        <FormItem>
          <FormLabel className="text-lg text-[#4a79ad] font-semibold">Currículo</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const fileList = e.target.files;
                  if (fileList && fileList.length > 0) {
                    setFileName(fileList[0].name);
                    onChange(fileList); // Passa o FileList para o formulário
                  } else {
                    setFileName(null);
                    onChange(null); // Limpa o valor se nenhum arquivo for selecionado
                  }
                }}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm 
                font-medium ring-offset-background transition-colors focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 bg-[#4a79ad] hover:bg-[#67a4eb] 
                text-primary-foreground h-10 px-4 py-2"
              >
                Selecionar arquivo
              </label>
              {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
            </div>
          </FormControl>
          {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
          <FormDescription>
            Faça upload do seu currículo em formato PDF ou Word (máx. 5MB)
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
