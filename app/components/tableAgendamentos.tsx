"use client";
import { useEffect, useState } from "react";
import { Badge, Flex, IconButton, Spinner, Table } from "@radix-ui/themes";
import { Agendamento, Medico } from "../lib/types";
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";

interface TableAgendamentosProps {
  limit?: number;
}

export default function TableAgendamentos({ limit }: TableAgendamentosProps) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [medicos, setMedicos] = useState<Medico[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [agRes, medRes] = await Promise.all([
          fetch("/api/agendamentos"),
          fetch("/api/medicos"),
        ]);

        const agData: Agendamento[] = await agRes.json();
        const medData: Medico[] = await medRes.json();

        setAgendamentos(agData);
        setMedicos(medData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex align="center" gap="4">
        <Spinner size="3" />
      </Flex>
    );
  }

  const agendamentosExibir = [...agendamentos]
    .reverse()
    .slice(0, limit ?? agendamentos.length);

  const getMedicoNome = (id: number) => {
    const medico = medicos.find((m) => m.id === id);
    return medico ? medico.nome : "—";
  };

  const handleMarcarAtendido = async (agendamento: Agendamento) => {
    try {
      const res = await fetch("/api/agendamentos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: agendamento.id,
          status: "atendido",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Erro desconhecido");
      }

      const atualizado: Agendamento = await res.json();
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === atualizado.id ? atualizado : a))
      );
    } catch {
      console.error("Não foi possível atualizar o status do agendamento");
    }
  };

  return (
    <div className="w-full max-h-[85vh] rounded flex flex-col overflow-auto mr-5">
      <Table.Root>
        <Table.Header>
          <Table.Row align={"center"}>
            <Table.ColumnHeaderCell justify={"center"}>
              Data
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={"center"}>
              Hora
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={"center"}>
              Paciente
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={"center"}>
              Médico
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={"center"}>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell justify={"center"}>
              Ação
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {agendamentosExibir.map((agendamento, index) => {
            const data = new Date(agendamento.dataHora);
            const dataFormatada = data.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const horaFormatada = data.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Table.Row key={index}>
                <Table.Cell align={"center"}>{dataFormatada}</Table.Cell>
                <Table.Cell align={"center"}>{horaFormatada}</Table.Cell>
                <Table.Cell align={"center"}>
                  {agendamento.pacienteNome}
                </Table.Cell>
                <Table.Cell align={"center"}>
                  {getMedicoNome(agendamento.medicoId)}
                </Table.Cell>
                <Table.Cell align={"center"}>
                  {agendamento.status === "agendado" ? (
                    <Badge color="blue">Agendado</Badge>
                  ) : (
                    <Badge color="green">Atendido</Badge>
                  )}
                </Table.Cell>
                <Table.Cell align="center">
                  <IconButton
                    variant="soft"
                    color="blue"
                    title={
                      agendamento.status === "agendado"
                        ? "Marcar como atendido"
                        : ""
                    }
                    disabled={agendamento.status === "agendado" ? false : true}
                    onClick={() => handleMarcarAtendido(agendamento)}
                  >
                    {agendamento.status === "agendado" ? (
                      <Pencil1Icon width={148} height={18} />
                    ) : (
                      <CheckIcon width={148} height={18} />
                    )}
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
