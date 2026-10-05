import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import clsx from "clsx";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "nextjs-toast-notify";

export const FormOportunity = ({ cargo }: { cargo: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<string>("");

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [razon, setRazon] = useState("");
  const [celular, setCelular] = useState("");
  const celularRegex = /^[0-9]{9}$/;
  const isInvalidCelular = celular !== "" && !celularRegex.test(celular);

  // Validación manual del correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isInvalidEmail = correo !== "" && !emailRegex.test(correo);

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formValid, setFormValid] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // Chequeo de formulario válido
  const isFormValid = () => {
    return (
      nombres.trim() !== "" &&
      apellidos.trim() !== "" &&
      correo.trim() !== "" &&
      razon.trim() !== "" &&
      celularRegex.test(celular) &&
      emailRegex.test(correo) &&
      file !== null
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const clearForm = () => {
    setNombres("");
    setApellidos("");
    setCelular("");
    setCorreo("");
    setRazon("");
    setFile(null);
    setFileName(null);
    setPreview(null);
    setMessage("");
    setSubmitted(false);
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setSubmitted(true);
    setLoading(true);

    if (!file) {
      toast.warning("¡Es necesario que cargues tu CV para poder postular!", {
        duration: 5000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });
      return;
    }

    const formData = new FormData();

    formData.append("cargo", cargo);
    formData.append("nombres", e.target[0].value);
    formData.append("apellidos", e.target[1].value);
    formData.append("celular", e.target[2].value);
    formData.append("correo", e.target[3].value);
    formData.append("razon", e.target[4].value);
    formData.append("archivo", file as File);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://bartech.pe/api/send-job-application.php",
      headers: {},
      data: formData,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      setMessage(
        "¡Tu formulario se envió con éxito! Se te contactará lo más pronto posible."
      );

      toast.success("¡Tu formulario se envió con éxito!", {
        duration: 5000,
        progress: true,
        position: "top-center",
        transition: "bounceIn",
        icon: "",
        sound: true,
      });

      handleClose();
    } catch (error) {
      setMessage(
        "¡No se pudo enviar tu formulario, intenta nuevamente más tarde!"
      );

      toast.error(
        "¡No se pudo enviar tu formulario, intenta nuevamente más tarde!",
        {
          duration: 5000,
          progress: true,
          position: "top-center",
          transition: "bounceIn",
          icon: "",
          sound: true,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        aria-label="Aplicar ahora"
        size="lg"
        radius="full"
        variant="bordered"
        className={clsx(
          "cursor-pointer rounded-full font-normal",
          "border-[#38C0E0] text-black",
          "hover:bg-[#38C0E0] hover:text-white",
          "transition-colors duration-200",
          "px-4 py-1 lg:py-2 xl:px-6 xl:py-3 text-sm lg:text-xl"
        )}
        onPress={onOpen}
      >
        ¡Aplicar ahora!
      </Button>

      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        size={"5xl"}
        onClose={handleClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody>
                <div
                  className="px-4 lg:px-12 overflow-y-auto"
                  style={{ maxHeight: "85vh" }}
                >
                  <Form
                    className="w-full flex flex-col gap-y-8"
                    validationBehavior="native"
                    onSubmit={onSubmit}
                  >
                    <div className="w-full flex justify-center">
                      <h2
                        className={clsx(
                          "flex lg:flex-col gap-4 uppercase title_font text-center"
                        )}
                      >
                        <span className="title_font_up flex-grow-0 leading-[1] text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]">
                          envíanos los siguientes datos
                        </span>
                      </h2>
                    </div>
                    <div className="w-full flex justify-center">
                      <h3
                        className={clsx(
                          "title_font transition-all duration-100 capitalize",
                          "text-gradient-to-r from-25% text-white font-semibold from-[#60c3dc] to-[#504d9b]",
                          "px-4 py-2 xl:px-6 xl:py-3 text-lg lg:text-3xl text-center"
                        )}
                      >
                        <span className="uppercase">{cargo}</span>
                      </h3>
                    </div>
                    <div className="w-full flex flex-col gap-y-6">
                      <div className="w-full flex flex-col lg:flex-row gap-x-16 gap-y-8">
                        <div className="flex-1">
                          <Input
                            label="Nombres"
                            labelPlacement="outside"
                            variant="flat"
                            placeholder=" "
                            type="text"
                            size="lg"
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                            classNames={{
                              inputWrapper:
                                "border-2 border-slate-300 bg-slate-200",
                              label: "text-lg text-slate-700",
                            }}
                            isRequired
                            maxLength={100}
                            errorMessage="Ingresa tu nombre"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            label="Apellidos"
                            labelPlacement="outside"
                            variant="flat"
                            placeholder=" "
                            type="text"
                            size="lg"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            classNames={{
                              inputWrapper:
                                "border-2 border-slate-300 bg-slate-200",
                              label: "text-lg text-slate-700",
                            }}
                            isRequired
                            maxLength={100}
                            errorMessage="Ingresa tu apellido"
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
                              inputWrapper:
                                "border-2 border-slate-300 bg-slate-200",
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
                            label="Correo electrónico"
                            labelPlacement="outside"
                            variant="flat"
                            placeholder=" "
                            size="lg"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            classNames={{
                              inputWrapper:
                                "border-2 border-slate-300 bg-slate-200",
                              label: "text-lg text-slate-700",
                            }}
                            type="email"
                            isInvalid={isInvalidEmail}
                            errorMessage={
                              isInvalidEmail
                                ? "Ingrese un correo electrónico válido"
                                : ""
                            }
                            isRequired
                            maxLength={100}
                          />
                        </div>
                      </div>
                      <div>
                        <Textarea
                          label="¿Por qué te gustaría trabajar en Bartech y por qué deberíamos seleccionarte?"
                          labelPlacement="outside"
                          variant="flat"
                          size="lg"
                          placeholder=" "
                          value={razon}
                          onChange={(e) => setRazon(e.target.value)}
                          classNames={{
                            inputWrapper:
                              "border-2 border-slate-300 bg-slate-200",
                            label: "text-lg text-slate-700",
                          }}
                          isRequired
                          errorMessage="Este es un campo obligatorio"
                          maxLength={1000}
                          minLength={20}
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <div>
                        <Input
                          id="fileCV"
                          ref={fileRef}
                          type="file"
                          label="Adjuntar CV"
                          labelPlacement="outside"
                          accept=".doc,.docx,.pdf"
                          variant="flat"
                          color="default"
                          size="lg"
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        <div className="flex items-center gap-4">
                          {/* Botón para abrir el file picker */}
                          <Button
                            size="lg"
                            radius="full"
                            variant="light"
                            color="default"
                            className={clsx(
                              "cursor-pointer inner-border-2-slate-700 rounded-full font-normal border-slate-700 bg-slate-700 text-slate-100 transition-all duration-100",
                              "hover:inner-border-none hover:bg-sky-100 hover:bg-gradient-to-r hover:from-25%",
                              `hover:from-[#60c3dc] hover:to-[#504d9b]`,
                              "px-4 py-2 xl:px-6 xl:py-3 text-sm lg:text-xl"
                            )}
                            onPress={() => {
                              fileRef.current?.click();
                            }}
                          >
                            Adjuntar CV
                          </Button>

                          {file && (
                            <span className="text-sm text-slate-500">
                              {file.type.includes("pdf") ? "📄 PDF" : "📝 DOC"}
                            </span>
                          )}

                          {fileName ? (
                            <div className="flex items-center gap-2 w-48">
                              <Tooltip
                                content={fileName}
                                delay={50}
                                closeDelay={50}
                              >
                                <p className="truncate">{fileName}</p>
                              </Tooltip>

                              {/* Botón borrar archivo */}
                              <Button
                                isIconOnly
                                size="sm"
                                radius="full"
                                variant="light"
                                color="danger"
                                className="shrink-0"
                                onPress={() => {
                                  if (fileRef.current)
                                    fileRef.current.value = ""; // limpiar input file
                                  setFile(null); // 👈 limpia tu estado file
                                  setFileName(""); // 👈 limpia tu estado fileName
                                }}
                              >
                                ✕
                              </Button>
                            </div>
                          ) : (
                            submitted &&
                            !file && (
                              <p className="text-red-400 text-xs">
                                El CV es obligatorio
                              </p>
                            )
                          )}
                        </div>
                      </div>

                      <Button
                        size="lg"
                        radius="full"
                        variant="light"
                        color="default"
                        className={clsx(
                          "cursor-pointer inner-border-2-slate-700 rounded-full font-normal border-slate-700 transition-all duration-100",
                          "hover:inner-border-none hover:bg-sky-100 hover:bg-gradient-to-r hover:from-25% hover:text-slate-100",
                          `hover:from-[#60c3dc] hover:to-[#504d9b]`,
                          "px-4 py-2 xl:px-6 xl:py-3 text-sm lg:text-xl"
                        )}
                        type="submit"
                        isDisabled={!isFormValid() || loading} // 👈
                        isLoading={loading}
                      >
                        ¡Enviar ahora!
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      {message && (
                        <p className="text-red-400 text-xs">{message}</p>
                      )}
                    </div>
                  </Form>
                </div>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
