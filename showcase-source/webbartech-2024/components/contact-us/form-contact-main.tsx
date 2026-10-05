"use client";
import clsx from "clsx";
import { Button, Form, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { toast } from "nextjs-toast-notify";
import { useState } from "react";

export const FormContactMain = () => {
  const [submitted, setSubmitted] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [nombres, setNombres] = useState("");
  const [correo, setCorreo] = useState("");
  const [organizacion, setOrganizacion] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [celular, setCelular] = useState("");
  const celularRegex = /^[0-9]{9}$/;
  const isInvalidCelular = celular !== "" && !celularRegex.test(celular);

  // Validación manual del correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isInvalidEmail = correo !== "" && !emailRegex.test(correo);

  // Chequeo de formulario válido
  const isFormValid = () => {
    return (
      nombres.trim() !== "" &&
      correo.trim() !== "" &&
      organizacion.trim() !== "" &&
      proyecto.trim() !== "" &&
      celularRegex.test(celular) &&
      emailRegex.test(correo)
    );
  };

  const clearForm = () => {
    setNombres("");
    setCelular("");
    setCorreo("");
    setOrganizacion("");
    setProyecto("");
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nombres", e.target[0].value);
    formData.append("correo", e.target[1].value);
    formData.append("celular", e.target[2].value);
    formData.append("organizacion", e.target[3].value);
    formData.append("proyecto", e.target[4].value);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bartech.pe/api/send-contact.php",
      headers: {},
      data: formData,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      clearForm();
      setSubmitted("¡Tu formulario se envió con éxito!");
      toast.success("¡Tu formulario se envió con éxito!", {
        duration: 4000,
        position: "top-center",
      });
    } catch (error) {
      setSubmitted("¡No se pudo enviar tu formulario!");
      toast.error("¡No se pudo enviar tu formulario!", {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-4/5 px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20">

        {/* TÍTULO + SUBTÍTULO */}
        <div className="flex flex-col items-center text-center gap-6 pt-16 pb-12">
          <h2
            className="
              uppercase
              font-extrabold
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
              text-transparent
              bg-clip-text
              bg-gradient-to-b
              from-[#60C3DC]
              to-[#414A98]
            "
          >
            CONTÁCTANOS Y HABLEMOS
          </h2>


          <p className="max-w-3xl text-base md:text-lg lg:text-2xl text-slate-600">
            ENVIANOS LOS SIGUIENTES DATOS
          </p>
        </div>

      <div className="pb-16">
        <div className="px-12 py-16">
          <Form
            validationBehavior="native"
            onSubmit={onSubmit}
            className="w-full flex flex-col gap-y-8"
          >
            <div className="w-full flex flex-col lg:flex-row gap-x-16 gap-y-8">
              <div className="flex-1">
                <Input
                  label="Nombre Completo"
                  labelPlacement="outside"
                  variant="flat"
                  placeholder=" "
                  size="lg"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  classNames={{
                    inputWrapper: "border-2 border-slate-300 bg-slate-200",
                    label: "text-lg text-slate-700",
                  }}
                  type="text"
                  isRequired
                  maxLength={100}
                  errorMessage="Ingrese tu nombre y apellido"
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Correo electrónico"
                  labelPlacement="outside"
                  variant="flat"
                  placeholder=" "
                  size="lg"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  classNames={{
                    inputWrapper: "border-2 border-slate-300 bg-slate-200",
                    label: "text-lg text-slate-700",
                  }}
                  type="email"
                  isInvalid={isInvalidEmail}
                  errorMessage={
                    isInvalidEmail ? "Ingrese un correo electrónico válido" : ""
                  }
                  isRequired
                  maxLength={100}
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-x-16 gap-y-8">
              <div className="flex-1">
                <Input
                  label="Celular"
                  labelPlacement="outside"
                  variant="flat"
                  placeholder=" "
                  size="lg"
                  value={celular}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]*$/.test(value)) {
                      // solo números
                      setCelular(value);
                    }
                  }}
                  classNames={{
                    inputWrapper: "border-2 border-slate-300 bg-slate-200",
                    label: "text-lg text-slate-700",
                  }}
                  type="tel"
                  isRequired
                  isInvalid={isInvalidCelular}
                  errorMessage={
                    isInvalidCelular
                      ? "Ingrese un número de celular válido (9 dígitos)"
                      : ""
                  }
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Organización"
                  labelPlacement="outside"
                  variant="flat"
                  placeholder=" "
                  size="lg"
                  value={organizacion}
                  onChange={(e) => setOrganizacion(e.target.value)}
                  classNames={{
                    inputWrapper: "border-2 border-slate-300 bg-slate-200",
                    label: "text-lg text-slate-700",
                  }}
                  type="text"
                  isRequired
                  maxLength={250}
                  errorMessage="Ingrese el nombre de tu organización"
                />
              </div>
            </div>
            <div className="w-full">
              <Textarea
                label="¿Qué idea quieres que hagamos realidad?"
                labelPlacement="outside"
                variant="flat"
                size="lg"
                placeholder=" "
                value={proyecto}
                onChange={(e) => setProyecto(e.target.value)}
                classNames={{
                  inputWrapper: "border-2 border-slate-300 bg-slate-200",
                  label: "text-lg text-slate-700",
                }}
                isRequired
                errorMessage="Este es un campo obligatorio"
                maxLength={1000}
              />
            </div>
            <div className="w-full flex justify-end">
              <Button
                radius="full"
                variant="light"
                color="default"
                type="submit"
                isDisabled={!isFormValid() || loading}
                isLoading={loading}
                className="
                  group
                  p-0
                  bg-transparent
                  overflow-visible
                  h-auto
                  min-h-0
                "
              >
                <span className="block rounded-full bg-gradient-to-r from-[#60c3dc] to-[#504d9b] p-[2px]">
                  <span
                    className="
                      flex items-center justify-center
                      px-4 py-2 xl:px-6 xl:py-3
                      text-sm lg:text-xl
                      font-medium
                      text-black
                      bg-slate-100
                      rounded-full
                      transition-all duration-300
                      group-hover:bg-gradient-to-r
                      group-hover:from-[#60c3dc]
                      group-hover:to-[#504d9b]
                      group-hover:text-white
                    "
                  >
                    Enviar
                  </span>
                </span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
  );
};
