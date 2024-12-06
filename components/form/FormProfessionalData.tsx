import { fetchCargos } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import type { Cargos } from "@prisma/client";
import SectionUploadFile from "./SectionUploadFilesCnpj";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormProfessionalData({ form }: { form: any }) {
  const [isLoading, setIsLoading] = useState(true)
  const [cargos, setCargos] = useState<Cargos[]>([])

  useEffect(() => {
    async function loadCargos() {
      setIsLoading(true);
      const fetchedCargos = await fetchCargos();
      setCargos(fetchedCargos);
      setIsLoading(false);
    }
    loadCargos();
  }, [])
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
                    <SelectValue placeholder={isLoading ? 'Carregando...' : 'Selecione'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!isLoading &&
                    cargos.map((cargo) => (
                      <SelectItem key={cargo.id} value={cargo.nome}>
                        {cargo.nome}
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
                    const valor = parseFloat(e.target.value);
                    const cargoSelecionado = cargos.find((cargo) => cargo.nome === form.watch('cargo'));
                    const maxValue = cargoSelecionado?.valor_medio || 0;

                    if (valor > maxValue) {
                      form.setError('valor', {
                        message: `O valor máximo permitido para ${cargoSelecionado?.nome} é R$ ${maxValue.toFixed(2)}`,
                      });
                    } else {
                      form.clearErrors('valor');
                    }
                    field.onChange(valor);
                  }}
                />
              </FormControl>
              {fieldState?.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />
      </div>
      <div className="justify-center flex">
        <h2 className="text-2xl font-bold text-[#4a79ad]">Arquivos</h2>
      </div>
      <div className="border-2 p-2 border-gray-200 pb-4 rounded-sm">
        <SectionUploadFile form={form} />
      </div>
    </>
  )
}
