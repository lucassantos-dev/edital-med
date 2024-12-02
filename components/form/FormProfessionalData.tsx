import { Cargo, valorValidator } from "@/lib/utils";
import CCCUploadForm from "../CCCUploadForm";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import CVUploadForm from "../CVUploadForm";
import CNUploadForm from "../CNUploadForm";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormProfessionalData({ form, cargosValores }: { form: any, cargosValores:any }) {
    return (
      <>
        <h2 className="text-xl font-bold mb-8  text-[#4a79ad]">Dados Profissionais</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="especializacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Possui especialização?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experiencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Possui experiencia no cargo?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienciaHomeCare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Ja trabalhou em home care?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(cargosValores).map((cargo) => (
                          <SelectItem key={cargo} value={cargo}>
                            {cargo.charAt(0).toUpperCase() + cargo.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valor"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Valor por sessão/visita</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Digite o valor"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => {
                          const valor = parseInt(e.target.value, 10)
                          const cargo = form.watch('cargo') as Cargo
                          const errorMessage = valorValidator(valor, cargo)
                          field.onChange(valor)
                          // Atualiza o erro de validação
                          if (errorMessage !== true) {
                            form.setError("valor", { message: errorMessage })
                          }
                        }}
                      />
                    </FormControl>
                    {fieldState?.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>
              <div className=''>
                <CCCUploadForm control={form.control}/>
              </div>
              <div className=''>
                <CVUploadForm control={form.control}/>
              </div>
              <div className=''>
              <CNUploadForm control={form.control}/>
               
              </div>
      </>
    )
  }
  