import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import type { Cidades } from '@prisma/client'
import { Control, useFormContext } from 'react-hook-form'

interface CidadesSelectProps {
  cidades: Cidades[]
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  label: string
}

export const CidadesSelect = ({
  cidades,
  name,
  control,
  label,
}: CidadesSelectProps) => {
  const { setValue, watch } = useFormContext()
  const selectedCities = watch(name) || [] // Obter cidades selecionadas do formulário

  const handleSelect = (cidadeId: number) => {
    const cidadeSelecionada = cidades.find((cidade) => cidade.id === cidadeId)

    if (!cidadeSelecionada) return

    // Verifica se já foi selecionada ou se o limite foi atingido
    if (
      selectedCities.some((cidade: Cidades) => cidade.id === cidadeId) ||
      selectedCities.length >= 3
    ) {
      return
    }

    // Atualizar o valor no formulário
    setValue(name, [...selectedCities, cidadeSelecionada])
  }

  const removeCity = (cidadeId: number) => {
    const updatedCities = selectedCities.filter(
      (cidade: Cidades) => cidade.id !== cidadeId,
    )
    setValue(name, updatedCities)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={(value) => handleSelect(Number(value))}>
              <SelectTrigger className="w-full relative">
                <SelectValue placeholder="Selecione as cidades" />
              </SelectTrigger>
              <SelectContent className="absolute z-10">
                {cidades.map((cidade) => (
                  <SelectItem key={cidade.id} value={cidade.id.toString()}>
                    {cidade.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {selectedCities.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-[#4a79ad]">
                Cidades selecionadas:
              </h4>
              <ul className="mt-2 space-y-1">
                {selectedCities.map((cidade: Cidades) => (
                  <li
                    key={cidade.id}
                    className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md"
                  >
                    <span>{cidade.nome}</span>
                    <button
                      onClick={() => removeCity(cidade.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
              {selectedCities.length >= 3 && (
                <p className="mt-2 text-xs text-gray-600">
                  Você pode selecionar no máximo 3 cidades.
                </p>
              )}
            </div>
          )}
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  )
}
