/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface CustomInputProps {
  control: Control<any>
  name: string
  title: string
  id: string
  description: string
  acceptFiles: string
}
export default function FileUpload({
  control,
  description,
  id,
  name,
  title,
  acceptFiles,
}: CustomInputProps) {
  const [fileName, setfileName] = useState<string | null>(null)

  return (
    <div className="border border-gray-300 rounded-md p-4">
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState }) => (
          <FormItem>
            <FormLabel className="text-sm text-[#4a79ad] font-semibold">
              {title}
            </FormLabel>
            <FormControl>
              <div className="flex items-center">
                <input
                  type="file"
                  accept={acceptFiles}
                  onChange={(e) => {
                    const fileList = e.target.files
                    if (fileList && fileList.length > 0) {
                      setfileName(fileList[0].name)
                      onChange(fileList)
                    } else {
                      setfileName(null)
                      onChange(null)
                    }
                  }}
                  className="hidden"
                  id={id}
                />
                <label
                  htmlFor={id}
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm 
                font-medium ring-offset-background transition-colors focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
                disabled:pointer-events-none disabled:opacity-50 bg-[#4a79ad] hover:bg-[#67a4eb] 
                text-primary-foreground h-10 px-4 py-2"
                >
                  Selecionar arquivo
                </label>
                {fileName && (
                  <span className="text-sm ml-3 text-muted-foreground">
                    {fileName}
                  </span>
                )}
              </div>
            </FormControl>
            {fieldState.error && (
              <FormMessage>{fieldState.error.message}</FormMessage>
            )}
            <FormDescription>
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  )
}
