import {
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  Table,
  Link,
  Select,
} from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <Flex wrap={"wrap"} direction={"column"} gap={"9"}>
      <Flex justify={"between"} wrap={"wrap"}>
        <Box width="300px" className="mt-5">
          <Card size="3">
            <Flex gap="4" align="center">
              <Box>
                <Text as="div" size="4" color="gray">
                  Agendamentos atendidos
                </Text>
                <Text as="div" size="5" weight="bold">
                  10
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box width="300px" className="mt-5">
          <Card size="3">
            <Flex gap="4" align="center">
              <Box>
                <Text as="div" size="4" color="gray">
                  Agendamentos pendentes
                </Text>
                <Text as="div" size="5" weight="bold">
                  1
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box width="300px" className="mt-5">
          <Card size="3">
            <Flex gap="4" align="center">
              <Box>
                <Text as="div" size="4" color="gray">
                  Médicos disponíveis
                </Text>
                <Text as="div" size="5" weight="bold">
                  3
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Flex>

      <Flex direction={"column"}>
        <h2>Próximas consultas</h2>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Hora</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Paciente</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Médico</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>09:00</Table.RowHeaderCell>
              <Table.Cell>Zahra Ambessa</Table.Cell>
              <Table.Cell>Jasper Eriksson</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>11:00</Table.RowHeaderCell>
              <Table.Cell>Za Amsa</Table.Cell>
              <Table.Cell>Jar Eron</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>10:00</Table.RowHeaderCell>
              <Table.Cell>Ambessa</Table.Cell>
              <Table.Cell>Eriksson</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        <span className="flex justify-end w-full">
          <Link href="/agendamentos" title="Ir para a página de agendamentos">
            Ver mais
          </Link>
        </span>
      </Flex>
    </Flex>
  );
}
