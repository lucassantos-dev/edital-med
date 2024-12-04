'use client'

import { useState } from "react";
import { CustomInput } from "../CustomInput";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { handleCepChange } from "@/lib/utils";

import type { Cidades } from "@prisma/client";
import { CidadesSelect } from "../CidadeSelect";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FormAddressData({ form, }: { form: any }) {
    const [cepLoading, setCepLoading] = useState(false);
    const [cidades, setCidades] = useState<Cidades[]>([]);
    
    return (
        <>
            <h2 className="text-xl font-bold mb-8  text-[#4a79ad]">Endereço</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <CustomInput
                        labelText="CEP"
                        control={form.control}
                        registerName="cep"
                        textlabel="XXXXX-XXX"
                        placeholder="Digite o CEP"
                        type="text"
                        maskName="cep" // Aplique a máscara para o CEP
                        onChange={(e) => {
                            const cep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
                            form.setValue('cep', cep); // Atualiza o valor do campo de CEP
                            handleCepChange(cep, setCepLoading, form, setCidades); // Chama a função de busca do CEP
                        }}
                    />
                    {cepLoading && <p className="text-sm mt-3 ml-1 text-gray-500">Buscando informações...</p>}
                </div>
                <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Cidade"
                                    readOnly
                                    {...field}
                                />
                            </FormControl>
                            {fieldState?.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="estado"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Estado"
                                    readOnly
                                    {...field}
                                />
                            </FormControl>
                            {fieldState?.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                 <CidadesSelect
          cidades={cidades}
          name="cidadesSelecionadas"
          control={form.control}
          label="Cidades de Atuação"
        />
            </div>
        </>
    );
}
