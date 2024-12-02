/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

import { ChangeEvent } from 'react'
import { normalizeCEP, normalizeCNPJ, normalizeCPF, normalizePhoneNumber } from "@/mask/mask"


interface CustomInputProps {
  labelText: string
  control: Control<any>
  registerName: string
  textlabel?: string
  placeholder?: string
  type: string
  maskName?: 'contact_phone' | 'cnpj' | 'cep' | 'cpf'
  defaultValue?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; 
}

export const CustomInput = ({ onChange, labelText, registerName, textlabel, control, placeholder, type, maskName }: CustomInputProps) => {

  const { setValue } = useFormContext()

  const mask = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    let newValue = value

    // Aplique a máscara conforme o tipo
    if (maskName === 'cnpj') {
      newValue = normalizeCNPJ(value)
    } else if (maskName === 'contact_phone') {
      newValue = normalizePhoneNumber(value)
    } else if (maskName === 'cep') {
      newValue = normalizeCEP(value)
      if (onChange) onChange(event)
    } else if (maskName === 'cpf') {
      newValue = normalizeCPF(value)
    }
    setValue(name, newValue)  // Atualiza o valor no form
  }

  return (
    <FormField
      control={control}
      name={registerName}
      render={({ field, fieldState }) => (
        <FormItem className="group space-y-0">
          <div className="flex flex-col space-x-2">
            <FormLabel className="">{labelText}</FormLabel>
            <FormLabel htmlFor={registerName} className="text-sky-500 text-sm font-normal transition-opacity duration-300 opacity-0 group-focus-within:opacity-100 select-none text-right pr-3">
              {textlabel}
            </FormLabel>
          </div>
          <div className="flex items-center relative">
            {/* <div className="text-slate-100 absolute ml-2">
              <Icon className="size-5 stroke-1" />
            </div> */}
            <FormControl onChange={mask}>
              <Input
                id={registerName}
                data-mask={maskName}
                placeholder={placeholder}
                {...field}
                type={type}
                autoComplete="off"
                onChange={mask}
              />
            </FormControl>
          </div>
          {fieldState?.error && <FormMessage>{fieldState.error.message}</FormMessage>}
        </FormItem>
      )}
    />
  )
}