import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CustomInput } from '../CustomInput'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Switch } from '../ui/switch'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormPersonalData({ form }: { form: any }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-8 text-[#4a79ad]">Dados Pessoais</h2>

      <FormField
        control={form.control}
        name="nome"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className="">Nome</FormLabel>
            <FormControl>
              <Input placeholder="Seu nome completo" {...field} className="" />
            </FormControl>
            {fieldState?.error && (
              <FormMessage>{fieldState.error.message}</FormMessage>
            )}
          </FormItem>
        )}
      />
      <div className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="isCpf"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <FormItem className="space-y-0 flex flex-row items-center justify-between ">
              <div className="p-1 flex">
                <span>CNPJ</span>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="p-1 flex">
                <span>CPF</span>
              </div>
            </FormItem>
          )}
        />
      </div>
      {form.getValues('isCpf') ? (
        <CustomInput
          labelText="CPF"
          control={form.control}
          registerName="cnpj_cpf"
          textlabel="xxx.xxx.xxx-xx"
          placeholder="xxx.xxx.xxx-xx"
          type="text"
          maskName="cpf"
        />
      ) : (
        <CustomInput
          labelText="CNPJ"
          control={form.control}
          registerName="cnpj_cpf"
          textlabel="xx.xxx.xxx/xxxx-xx"
          placeholder="xx.xxx.xxx/xxxx-xx"
          type="text"
          maskName="cnpj"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="idade"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="">Idade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Idade"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  className=""
                />
              </FormControl>
              {fieldState?.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <CustomInput
          labelText="Telefone"
          control={form.control}
          registerName="telefone"
          textlabel="(xx) xxxxx-xxxx"
          placeholder="(xx) xxxxx-xxxx"
          type="text"
          maskName="contact_phone"
        />
        <FormField
          control={form.control}
          name="sexo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Sexo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  className=""
                />
              </FormControl>
              {fieldState?.error && (
                <FormMessage>{fieldState.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
