
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormTerms({ form }: { form: any }) {

    return(
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
                <FormLabel>
                  Aceite os termos
                </FormLabel>
                <FormDescription>
                  Confirme que os dados estão corretos, e que você esta de acordo com os termos do 
                  <Link href="/examples/forms" className='text-[#4a79ad] font-bold'> edital</Link> ?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
)}