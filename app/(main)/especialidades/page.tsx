"use client";
import { useState, useEffect } from "react";
import { Convenio, Especialidade, Medico } from "@/app/lib/types";
import {
  AlertDialog,
  Avatar,
  Button,
  Flex,
  IconButton,
  Link,
  Popover,
  Separator,
  Spinner,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import DialogNovaEspecialidade from "../horarios/page";

const avatarGroupStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  alignItems: "center",
};

export default function EspecialidadesList() {
  const [loading, setLoading] = useState(true);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [convenios, setConvenios] = useState<Convenio[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const fetchData = async <T,>(url: string, setter: (data: T[]) => void) => {
      try {
        const response = await fetch(url);
        const data: T[] = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Erro ao buscar ${url}:`, error);
      }
    };

    Promise.all([
      fetchData("/api/especialidades", setEspecialidades),
      fetchData("/api/medicos", setMedicos),
      fetchData("/api/convenios", setConvenios),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Flex align="center" gap="4">
        <Spinner size="3" />
      </Flex>
    );
  }

  /** Mapeia o array de especialidades para criar uma estrutura que separa os médicos pela especialidade.
   * Para cada especialidade, filtra o array `medicos` retornando apenas aqueles cujo `especialidadeId` coincide
   * com o `id` da especialidade atual. */
  const medicosPorEspecialidade = especialidades.map((especialidade) => {
    const medicosDaEspecialidade = medicos.filter(
      (medico) => medico.especialidadeId === especialidade.id
    );

    return {
      especialidade,
      medicos: medicosDaEspecialidade,
    };
  });

  /** Pega as letras iniciais de cada palavra de uma string. Se a string tiver mais de uma palavra,
   * adiciona um ponto após cada inicial.
   * @example getIniciais("lorem ipsum dolor") => "L.I.D."; getIniciais("lorem") => "L"
   */
  const getIniciais = (nome: string): string => {
    const nomes = nome.trim().split(" ").filter(Boolean);
    if (nomes.length === 1) {
      return nomes[0].charAt(0).toUpperCase();
    }

    return nomes.map((parte) => parte.charAt(0).toUpperCase() + ".").join("");
  };

  return (
    <Flex wrap={"wrap"} direction={"column"}>
      <Flex align="center" gap="5" direction={"row"} justify={"between"}>
        <h2>Especialidades</h2>
        <Flex gap="3">
          <Link href="/especialidades/nova" className="self-end">
            <Button title="Adicionar especialidade" variant="soft" size="1">
              <PlusIcon width="15" height="15" />
              Adicionar especialidade
            </Button>
          </Link>
          <Link href="/medicos/novo" className="self-end">
            <Button title="Adicionar médico" variant="soft" size="1">
              <PlusIcon width="15" height="15" />
              Adicionar médico
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Flex className="px-5" wrap={"wrap"} width={"100%"} justify={"between"}>
        {medicosPorEspecialidade.map(({ especialidade, medicos }) => (
          <div key={especialidade.id} className="mb-5 w-100">
            <h3 className="my-2">{especialidade.nome}</h3>

            {medicos.length > 0 ? (
              <div style={avatarGroupStyle}>
                {medicos.map((medico) => (
                  <div key={medico.id}>
                    <Popover.Root>
                      <Popover.Trigger>
                        <Avatar
                          src={medico.imageUrl}
                          fallback={getIniciais(medico.nome)}
                        />
                      </Popover.Trigger>
                      <Popover.Content side="right" size="1" maxWidth="300px">
                        <p>
                          {`Dr${medico.sexo === "F" ? "a" : ""}. ${
                            medico.nome
                          }`}
                        </p>
                        <Separator orientation="horizontal" size={"4"} />
                        <p className="text-center">CRM: {medico.crm}</p>
                      </Popover.Content>
                    </Popover.Root>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-(--text-light) mt-3">
                Nenhum médico disponível.
              </p>
            )}
          </div>
        ))}
      </Flex>

      <Flex align="center" gap="5" direction={"row"} justify={"between"}>
        <h2>Convênios</h2>

        <Link href="/especialidades/nova" className="self-end">
          <Button title="Adicionar especialidade" variant="soft" size="1">
            <PlusIcon width="15" height="15" />
            Adicionar convênio
          </Button>
        </Link>
      </Flex>

      <Flex className="ml-4" wrap={"wrap"} width={"100%"} justify={"between"}>
        {convenios.map((convenio) => (
          <div
            style={avatarGroupStyle}
            className="mb-5 w-100"
            key={convenio.id}
          >
            <Avatar variant="soft" fallback={getIniciais(convenio.nome)} />
            <h3>{convenio.nome}</h3>
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
