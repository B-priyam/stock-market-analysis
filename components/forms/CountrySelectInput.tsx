"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { Label } from "../ui/label";
import Image from "next/image";
import { Controller } from "react-hook-form";

function CountrySelectInput({
  control,
  label,
  name,
  error,
  required,
}: CountrySelectProps) {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value: any) => {
    setValue(value);
  };

  const getFlagImoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };
  return (
    <div>
      <Label className="mb-2" htmlFor={name}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => {
          const selectedCountry = options.find(
            (c) => c.label === field.value || c.value === field.value,
          );
          return (
            <Combobox
              id={name}
              items={options}
              value={field.value}
              onValueChange={field.onChange}
            >
              <div className="relative">
                {selectedCountry && (
                  <div className="absolute top-4 left-5">
                    <Image
                      src={`https://flagcdn.com/w40/${selectedCountry.value.toLowerCase()}.png`}
                      alt="flag"
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                  </div>
                )}
              </div>
              <ComboboxInput
                className={"h-10 pl-10"}
                placeholder="Select a Country"
              />
              <ComboboxContent onChange={changeHandler}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.value} value={item.label}>
                      {/* <div> */}
                      <Image
                        src={`https://flagcdn.com/w40/${item.value.toLowerCase()}.png`}
                        alt="flag"
                        width={20}
                        height={15}
                        className="rounded-sm"
                      />
                      {item.label}
                      {/* </div> */}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          );
        }}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default CountrySelectInput;
