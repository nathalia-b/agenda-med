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
  const [possuiConvenio, setPossuiConvenio] = useState<"sim" | "nao" | "">("");
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
    setPossuiConvenio("");
  };

  useEffect(() => {
    if (especialidadeId) {
      const medicosFiltrados = mockMedicos.filter(
        (medico) => medico.especialidadeId === especialidadeId
      );
      setMedicosDisponiveis(medicosFiltrados);
      setMedicoId("");
    } else {
      setMedicosDisponiveis(mockMedicos);
      setMedicoId("");
    }
  }, [especialidadeId]);

  // Limpa convênio se o usuário escolher "Não"
  useEffect(() => {
    if (possuiConvenio === "nao") {
      setConvenioId("");
    }
  }, [possuiConvenio]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if (!data || !hora) {
      setMessage("Por favor, selecione data e hora.");
      setLoading(false);
      return;
    }
    if (!especialidadeId) {
      setMessage("Por favor, selecione uma especialidade.");
      setLoading(false);
      return;
    }
    if (!medicoId) {
      setMessage("Por favor, selecione um médico.");
      setLoading(false);
      return;
    }
    if (possuiConvenio === "sim" && !convenioId) {
      setMessage("Por favor, selecione um convênio.");
      setLoading(false);
      return;
    }

    const dataHora = `${data}T${hora}`;

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pacienteNome,
          dataHora,
          especialidadeId,
          medicoId,
          convenioId: possuiConvenio === "sim" ? convenioId : null,
        }),
      });

      const dataResponse = await response.json();

      if (response.ok) {
        setOpenDialog(true);
        limpaCampos();
        setTimeout(() => setOpenDialog(false), 800);
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
            <label htmlFor="nomePaciente">
              Nome do Paciente<span className="text-purple-500">*</span>
            </label>
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
              <label htmlFor="data">
                Data<span className="text-purple-500">*</span>
              </label>
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
              <label htmlFor="hora">
                Hora<span className="text-purple-500">*</span>
              </label>
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

          {/* NOVO: Possui convênio */}
          <div className="my-5">
            <label htmlFor="possuiConvenio">Possui convênio?</label>
            <select
              id="possuiConvenio"
              value={possuiConvenio}
              onChange={(e) =>
                setPossuiConvenio(e.target.value === "sim" ? "sim" : "nao")
              }
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>

          {/* NOVO: Select de convênio só se "Sim" */}
          {possuiConvenio === "sim" && (
            <div className="my-5">
              <label htmlFor="convenio">Convênio</label>
              <select
                id="convenio"
                value={convenioId}
                onChange={(e) => setConvenioId(Number(e.target.value))}
              >
                <option value="">Selecione um convênio</option>
                {mockConvenios.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="my-5">
            <label htmlFor="especialidade">
              Escolha uma especialidade
              <span className="text-purple-500">*</span>
            </label>
            <SelectComponent
              id="especialidade"
              value={especialidadeId}
              onChange={(value) => setEspecialidadeId(value)}
              options={mockEspecialidades}
              placeholder="Selecione uma especialidade"
            />
          </div>

          <div className="my-5">
            <label htmlFor="medico">
              Médico<span className="text-purple-500">*</span>
            </label>
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
            <button className="cadastroButton" type="submit" disabled={loading}>
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
