"use client";
import { SelectComponent } from "@/app/components/form/select";
import { useState, useEffect } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import {
  mockConvenios,
  mockEspecialidades,
  mockMedicos,
} from "@/app/lib/mockData";

export default function NovoAtendimentoForm() {
  const [pacienteNome, setPacienteNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [medicoId, setMedicoId] = useState<number | "">("");
  const [especialidadeId, setEspecialidadeId] = useState<number | "">("");
  const [medicosDisponiveis, setMedicosDisponiveis] = useState(mockMedicos);
  const [convenioId, setConvenioId] = useState<number | "">("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const limpaCampos = () => {
    setPacienteNome("");
    setData("");
    setHora("");
    setMedicoId("");
    setConvenioId("");
    setEspecialidadeId("");
  };

  useEffect(() => {
    if (especialidadeId) {
      const medicosFiltrados = mockMedicos.filter(
        (medico) => medico.especialidadeId === especialidadeId
      );
      setMedicosDisponiveis(medicosFiltrados);
      setMedicoId("");
    }
  }, [especialidadeId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!data || !hora) {
      setMessage("Por favor, selecione data e hora.");
      setLoading(false);
      return;
    }

    const dataHora = `${data}T${hora}`;

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pacienteNome,
          dataHora,
          especialidadeId,
          medicoId,
          convenioId,
        }),
      });

      const dataResponse = await response.json();

      if (response.ok) {
        setOpenDialog(true);
        limpaCampos();
        setTimeout(() => {
          setOpenDialog(false);
        }, 800);
      } else {
        setMessage(
          `Erro: ${
            dataResponse.message || "Não foi possível realizar o agendamento."
          }`
        );
      }
    } catch {
      setMessage("Erro ao tentar realizar o agendamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction={"column"}>
      <Flex
        className="form-container w-8/12 px-20 self-center align-middle"
        direction={"column"}
      >
        <h2>Novo agendamento</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-5 mt-10">
            <label htmlFor="nomePaciente">Nome do Paciente</label>
            <input
              type="text"
              name="nomePaciente"
              id="nomePaciente"
              value={pacienteNome}
              onChange={(e) => setPacienteNome(e.target.value)}
              required
            />
          </div>
          <Flex justify={"between"} className="my-5">
            <div className="w-full">
              <label htmlFor="data">Data</label>
              <input
                type="date"
                name="data"
                id="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>

            <div className="ml-5 w-100">
              <label htmlFor="hora">Hora</label>
              <input
                type="time"
                name="hora"
                id="hora"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>
          </Flex>

          <div className="my-5">
            <label htmlFor="convenio">Convênio</label>
            <SelectComponent
              id="convenio"
              value={convenioId}
              onChange={(value) => setConvenioId(value)}
              options={mockConvenios}
              placeholder="Selecione um convênio"
            />
          </div>

          <div className="my-5">
            <label htmlFor="especialidade">Escolha uma especialidade</label>
            <SelectComponent
              id="especialidade"
              value={especialidadeId}
              onChange={(value) => setEspecialidadeId(value)}
              options={mockEspecialidades}
              placeholder="Selecione uma especialidade"
            />
          </div>

          <div className="my-5">
            <label htmlFor="medico">Médico (CRM)</label>
            <SelectComponent
              id="medico"
              value={medicoId}
              onChange={(value) => setMedicoId(value)}
              options={medicosDisponiveis}
              placeholder={
                !especialidadeId
                  ? "Selecione uma especialidade"
                  : medicosDisponiveis.length === 0
                  ? "Não há médicos disponíveis para essa especialidade"
                  : "Selecione um médico"
              }
              disabled={medicosDisponiveis.length <= 0 || !especialidadeId}
            />
          </div>

          {message && <p className="message">{message}</p>}

          <Flex justify={"end"}>
            <button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </Flex>
        </form>
      </Flex>

      <AlertDialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialog.Content maxWidth="fit-content" size="1">
          <AlertDialog.Title></AlertDialog.Title>
          <AlertDialog.Description size="2" className="text-center">
            Agendamento realizado com sucesso!
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
