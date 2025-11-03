"use client";
import { useEffect, useState } from "react";
import { Badge, IconButton, Table } from "@radix-ui/themes";
import { Agendamento, Medico } from "../lib/types";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface ProximasConsultasProps {
  limit?: number;
}

export default function ProximasConsultas({ limit }: ProximasConsultasProps) {
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

  if (loading) return <p>Carregando...</p>;

  const agendamentosExibir = limit
    ? agendamentos.slice(0, limit)
    : agendamentos;

  const getMedicoNome = (id: number) => {
    const medico = medicos.find((m) => m.id === id);
    return medico ? medico.nome : "—";
  };

  return (
    <div className="w-full max-h-[85vh] rounded flex flex-col overflow-auto px-10 mr-5">
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
                <Table.Cell align={"center"}>
                  <IconButton color="crimson" variant="soft">
                    <CheckCircledIcon width="18" height="18" />
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
