"use client";
import { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export default function NovaEspecialidadeForm() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const limpaCampos = () => {
    setNome("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!nome.trim()) {
      setMessage("Por favor, insira o nome da especialidade.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/especialidades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });

      const dataResponse = await response.json();

      if (response.ok) {
        setOpenDialog(true);
        limpaCampos();
        setTimeout(() => setOpenDialog(false), 800);
      } else {
        setMessage(
          `Erro: ${dataResponse.message || "Não foi possível cadastrar."}`
        );
      }
    } catch {
      setMessage("Erro ao tentar cadastrar especialidade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction={"column"} className="w-6/12 mx-auto mt-10">
      <h2>Nova Especialidade</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label htmlFor="nomeEspecialidade">
            Nome da Especialidade<span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            id="nomeEspecialidade"
            placeholder="Ex: Endocrinologista"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <Flex justify={"end"}>
          <button className="cadastroButton" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </Flex>
      </form>

      <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialog.Content maxWidth="fit-content" size="1">
          <AlertDialog.Title></AlertDialog.Title>
          <AlertDialog.Description size="2" className="text-center">
            Especialidade cadastrada com sucesso!
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
