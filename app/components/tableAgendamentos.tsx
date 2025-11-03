"use client";
import { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";
import { Agendamento } from "../lib/types";

interface ProximasConsultasProps {
  limit?: number;
}

export default function ProximasConsultas({ limit }: ProximasConsultasProps) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const res = await fetch("/api/agendamentos");
        const data: Agendamento[] = await res.json();
        setAgendamentos(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAgendamentos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  const agendamentosExibir = limit
    ? agendamentos.slice(0, limit)
    : agendamentos;

  return (
    <div className="w-full max-h-[85vh] rounded flex flex-col overflow-auto">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Data</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Hora</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Paciente</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Médico</Table.ColumnHeaderCell>
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
                <Table.RowHeaderCell>{dataFormatada}</Table.RowHeaderCell>
                <Table.Cell>{horaFormatada}</Table.Cell>
                <Table.Cell>{agendamento.pacienteNome}</Table.Cell>
                <Table.Cell>{agendamento.medicoId}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
