"use client";

import { useState } from "react";
import { SelectComponent } from "@/app/components/form/select";
import { mockEspecialidades } from "@/app/lib/mockData";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export default function MedicosPage() {
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [especialidadeId, setEspecialidadeId] = useState<number | "">("");
  const [sexo, setSexo] = useState<"masculino" | "feminino" | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const limpaCampos = () => {
    setNome("");
    setCrm("");
    setEspecialidadeId("");
    setSexo("");
    setImageUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!nome || !crm || !especialidadeId) {
      setMessage(
        "Preencha todos os campos obrigatórios (nome, CRM e especialidade)."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          crm,
          especialidadeId,
          sexo: sexo || "",
          imageUrl: imageUrl || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        limpaCampos();
        setOpenDialog(true);
        setTimeout(() => setOpenDialog(false), 800);
      } else {
        setMessage(data.message || "Erro ao cadastrar médico.");
      }
    } catch {
      setMessage("Erro ao tentar cadastrar médico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" className="w-8/12 mx-auto mt-10">
      <h1 className="text-2xl mb-5">Cadastro de Médicos</h1>

      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label htmlFor="nome">
            Nome do Médico<span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="my-5">
          <label htmlFor="crm">
            CRM<span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            id="crm"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="my-5">
          <label htmlFor="especialidade">
            Especialidade<span className="text-purple-500">*</span>
          </label>
          <SelectComponent
            id="especialidade"
            value={especialidadeId}
            onChange={(value) => setEspecialidadeId(value)}
            options={mockEspecialidades}
            required
            placeholder="Selecione uma especialidade"
          />
        </div>

        <div className="my-5">
          <label htmlFor="sexo">
            Sexo<span className="text-purple-500">*</span>
          </label>
          <select
            id="sexo"
            required
            value={sexo}
            onChange={(e) =>
              setSexo(
                e.target.value === "masculino"
                  ? "masculino"
                  : e.target.value === "feminino"
                  ? "feminino"
                  : ""
              )
            }
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>

        <div className="my-5">
          <label htmlFor="imageUrl">
            URL da Imagem <span className="text-gray-400">(Opcional)</span>
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
            className="w-full"
          />
        </div>

        {message && <p className="text-red-500">{message}</p>}

        <Flex justify="end">
          <button type="submit" disabled={loading} className="cadastroButton">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </Flex>
      </form>

      <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialog.Content maxWidth="fit-content" size="1">
          <AlertDialog.Title></AlertDialog.Title>
          <AlertDialog.Description size="2" className="text-center">
            Médico cadastrado com sucesso!
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button
                variant="soft"
                color="green"
                onClick={() => setOpenDialog(false)}
              >
                OK
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Flex>
  );
}
