import type { UseFormReturn } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form'
import Link from 'next/link'
import type { z } from 'zod'
import type { formSchema } from '@/zod-schema/schema'

export default function FormTerms({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Aceite os termos</FormLabel>
              <FormDescription className="leading-relaxed">
                Confirme que os dados estão corretos e que você está de acordo
                com os termos do
                <Link
                  href="/Edital de captacao PJ.pdf"
                  className="text-[#4a79ad] font-bold"
                >
                  {' '}
                  EDITAL DE CAPTAÇÃO E SELEÇÃO PROFISSIONAL Nº 001/2024
                </Link>
                , que regulamenta a participação de profissionais da saúde no
                processo seletivo da MEDLAR - Soluções em Saúde.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </>
  )
}
