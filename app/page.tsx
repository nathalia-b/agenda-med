"use client";
import TableAgendamentos from "./components/tableAgendamentos";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { Agendamento } from "./lib/types";
import {
  CalendarIcon,
  CheckCircledIcon,
  ClockIcon,
} from "@radix-ui/react-icons";

const Home = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch("/api/agendamentos");
        const data: Agendamento[] = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, []);

  const atendidos = agendamentos.filter(
    (agendamento) => agendamento.status === "atendido"
  ).length;

  const pendentes = agendamentos.filter(
    (agendamento) => agendamento.status === "agendado"
  ).length;

  return (
    <Flex wrap={"wrap"} direction={"column"} gap={"9"}>
      <Flex direction="column" gap="9">
        <Flex
          justify="center"
          align="center"
          gap="5"
          wrap="wrap"
          className="mt-2 mb-2"
        >
          <Box width="260px">
            <Card
              size="3"
              className="bg-white hover:shadow-md transition-all rounded-2xl border border-gray-200"
            >
              <Flex align="center" justify="center" gap="4" p="4">
                <div className="p-3 rounded-full bg-blue-100 flex items-center justify-center">
                  <ClockIcon width={32} height={32} color="#3B82F6" />
                </div>
                <Box>
                  <Text as="div" size="8" weight="bold" className="text-center">
                    {pendentes}
                  </Text>
                  <Text as="div" size="3" color="gray">
                    Pendentes
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>

          <Box width="260px">
            <Card
              size="3"
              className="bg-white hover:shadow-md transition-all rounded-2xl border border-gray-200"
            >
              <Flex align="center" justify="center" gap="4" p="4">
                <div className="p-3 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircledIcon width={32} height={32} color="#15803D" />
                </div>
                <Box>
                  <Text as="div" size="8" weight="bold" className="text-center">
                    {atendidos}
                  </Text>
                  <Text as="div" size="3" color="gray">
                    Atendidos
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>

          <Box width="260px">
            <Card
              size="3"
              className="bg-white hover:shadow-md transition-all rounded-2xl border border-gray-200"
            >
              <Flex align="center" justify="center" gap="4" p="4">
                <div className="p-3 rounded-full bg-orange-100 flex items-center justify-center">
                  <CalendarIcon width={32} height={32} color="#F97316" />
                </div>
                <Box>
                  <Text as="div" size="8" weight="bold" className="text-center">
                    {agendamentos.length}
                  </Text>
                  <Text as="div" size="3" color="gray">
                    Total
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        </Flex>

        <Flex id="listaAgendamentos" direction="column" className="mt-4">
          <h2>Últimos agendamentos</h2>
          <TableAgendamentos
            limit={7}
            agendamentos={agendamentos}
            setAgendamentos={setAgendamentos}
          />

          <span className="flex justify-end w-full mt-4">
            <Button variant="surface">
              <a href="/agendamentos" title="Ir para listagem de agendamentos">
                Ver mais
              </a>
            </Button>
          </span>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
