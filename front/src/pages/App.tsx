import { useState, useEffect } from "react";
import "./App.css";
import { Imovel } from "../entity/imovel";
import { Comodo } from "../entity/comodo";
import {
  getImoveis,
  saveImovel,
  updateImovel,
  deleteImovel,
  addComodo,
} from "../service/api";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

function App() {
  const [excluindo, setExcluindo] = useState<{ [id: number]: boolean }>({});

  async function handleExcluirImovel(idImovel: number) {
    if (!window.confirm("Tem certeza que deseja excluir este imóvel?")) return;
    setExcluindo((prev) => ({ ...prev, [idImovel]: true }));
    try {
      await deleteImovel(idImovel);
      setImoveis((prev) => prev.filter((i) => i.idImovel !== idImovel));
    } catch (e) {
      console.log(e);
      alert("Erro ao excluir imóvel");
    } finally {
      setExcluindo((prev) => ({ ...prev, [idImovel]: false }));
    }
  }
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [editandoImovelId, setEditandoImovelId] = useState<number | null>(null);
  const [imovelEditado, setImovelEditado] = useState<Partial<Imovel>>({});
  const [editandoComodo, setEditandoComodo] = useState<{
    idImovel: number;
    idx: number;
  } | null>(null);
  const [comodoEditadoNome, setComodoEditadoNome] = useState<string>("");
  function handleEditarImovel(imovel: Imovel) {
    setEditandoImovelId(imovel.idImovel ?? null);
    setImovelEditado({
      descricao: imovel.descricao,
      dataCompra: imovel.dataCompra,
      endereco: imovel.endereco,
    });
  }

  async function handleSalvarEdicaoImovel(idImovel: number) {
    const imovelOriginal = imoveis.find((i) => i.idImovel === idImovel);
    if (!imovelOriginal) return;
    const imovelAtualizado = {
      ...imovelOriginal,
      ...imovelEditado,
    };
    try {
      await updateImovel(imovelAtualizado);
      setImoveis((prev) =>
        prev.map((i) => (i.idImovel === idImovel ? { ...imovelAtualizado } : i))
      );
      setEditandoImovelId(null);
      setImovelEditado({});
    } catch {
      alert("Erro ao salvar edição do imóvel");
    }
  }

  function handleEditarComodo(
    idImovel: number,
    idx: number,
    nomeAtual: string
  ) {
    setEditandoComodo({ idImovel, idx });
    setComodoEditadoNome(nomeAtual);
  }

  async function handleSalvarEdicaoComodo(idImovel: number, idx: number) {
    const imovel = imoveis.find((i) => i.idImovel === idImovel);
    if (!imovel) return;
    const novosComodos = [...(imovel.comodos || [])];
    novosComodos[idx] = { ...novosComodos[idx], nome: comodoEditadoNome };
    const imovelAtualizado = { ...imovel, comodos: novosComodos };
    try {
      await updateImovel(imovelAtualizado);
      setImoveis((prev) =>
        prev.map((i) => (i.idImovel === idImovel ? { ...imovelAtualizado } : i))
      );
      setEditandoComodo(null);
      setComodoEditadoNome("");
    } catch {
      alert("Erro ao editar cômodo");
    }
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [novoComodo, setNovoComodo] = useState<{ [id: number]: string }>({});
  const [adicionando, setAdicionando] = useState<{ [id: number]: boolean }>({});
  const [novoImovel, setNovoImovel] = useState({
    descricao: "",
    dataCompra: "",
    endereco: "",
    comodos: [] as { nome: string }[],
  });
  const [novoImovelComodo, setNovoImovelComodo] = useState("");
  const [salvandoImovel, setSalvandoImovel] = useState(false);

  function handleAddComodoNovoImovel() {
    const nome = novoImovelComodo.trim();
    if (!nome) return;
    setNovoImovel((prev) => ({
      ...prev,
      comodos: [...prev.comodos, { nome }],
    }));
    setNovoImovelComodo("");
  }

  async function handleSalvarImovel(e: React.FormEvent) {
    e.preventDefault();
    if (
      !novoImovel.descricao ||
      !novoImovel.dataCompra ||
      !novoImovel.endereco
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!novoImovel.comodos || novoImovel.comodos.length === 0) {
      alert("Adicione pelo menos um cômodo ao imóvel.");
      return;
    }
    setSalvandoImovel(true);
    try {
      const imovelSalvo = await saveImovel(novoImovel as Imovel);
      setImoveis((prev) => [imovelSalvo, ...prev]);
      setNovoImovel({
        descricao: "",
        dataCompra: "",
        endereco: "",
        comodos: [],
      });
      setNovoImovelComodo("");
    } catch (e) {
      console.log(e);
      alert("Erro ao salvar imóvel");
    } finally {
      setSalvandoImovel(false);
    }
  }

  useEffect(() => {
    async function fetchImoveis() {
      try {
        setLoading(true);
        const data = await getImoveis();
        setImoveis(data);
      } catch (e) {
        console.log(e);
        setError("Erro ao buscar imóveis");
      } finally {
        setLoading(false);
      }
    }
    fetchImoveis();
  }, []);

  async function handleAddComodo(idImovel: number) {
    const imovel = imoveis.find((i) => i.idImovel === idImovel);
    if (!imovel) return;
    const nomeComodo = novoComodo[idImovel]?.trim();
    if (!nomeComodo) return;
    setAdicionando((prev) => ({ ...prev, [idImovel]: true }));
    try {
      const imovelAtualizado = await addComodo(nomeComodo, idImovel);
      setImoveis((prev) => {
        const outros = prev.filter((i) => i.idImovel !== idImovel);
        return [{ ...imovelAtualizado }, ...outros];
      });
      setNovoComodo((prev) => ({ ...prev, [idImovel]: "" }));
    } catch (e) {
      console.log(e);
      alert("Erro ao adicionar cômodo");
    } finally {
      setAdicionando((prev) => ({ ...prev, [idImovel]: false }));
    }
  }

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Imóveis
      </Typography>

      <Paper elevation={3} sx={{ mb: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Novo Imóvel
        </Typography>
        <Box component="form" onSubmit={handleSalvarImovel}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
            <TextField
              label="Descrição"
              value={novoImovel.descricao}
              onChange={(e) =>
                setNovoImovel((prev) => ({
                  ...prev,
                  descricao: e.target.value,
                }))
              }
              required
            />
            <TextField
              label="Data de Compra"
              type="date"
              value={novoImovel.dataCompra}
              onChange={(e) =>
                setNovoImovel((prev) => ({
                  ...prev,
                  dataCompra: e.target.value,
                }))
              }
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Endereço"
              value={novoImovel.endereco}
              onChange={(e) =>
                setNovoImovel((prev) => ({ ...prev, endereco: e.target.value }))
              }
              required
            />
          </Stack>
          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              label="Adicionar cômodo"
              value={novoImovelComodo}
              onChange={(e) => setNovoImovelComodo(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={handleAddComodoNovoImovel}
              disabled={!novoImovelComodo.trim()}
            >
              Adicionar cômodo
            </Button>
          </Stack>
          {novoImovel.comodos.length > 0 && (
            <List dense sx={{ mb: 2 }}>
              {novoImovel.comodos.map((c, idx) => (
                <ListItem key={c.nome + idx}>
                  <ListItemText primary={c.nome} />
                </ListItem>
              ))}
            </List>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={
              salvandoImovel ||
              !novoImovel.descricao.trim() ||
              !novoImovel.dataCompra.trim() ||
              !novoImovel.endereco.trim() ||
              novoImovel.comodos.length === 0
            }
          >
            {salvandoImovel ? "Salvando..." : "Salvar Imóvel"}
          </Button>
        </Box>
      </Paper>

      {imoveis.length === 0 ? (
        <Alert severity="info">Nenhum imóvel cadastrado.</Alert>
      ) : (
        <Stack spacing={3}>
          {imoveis.map((imovel) => (
            <Paper
              key={imovel.idImovel ?? imovel.descricao}
              elevation={2}
              sx={{ p: 2 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {editandoImovelId === imovel.idImovel ? (
                  <>
                    <TextField
                      label="Descrição"
                      value={imovelEditado.descricao || ""}
                      onChange={(e) =>
                        setImovelEditado((prev) => ({
                          ...prev,
                          descricao: e.target.value,
                        }))
                      }
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <TextField
                      label="Data de Compra"
                      type="date"
                      value={imovelEditado.dataCompra || ""}
                      onChange={(e) =>
                        setImovelEditado((prev) => ({
                          ...prev,
                          dataCompra: e.target.value,
                        }))
                      }
                      size="small"
                      sx={{ mr: 1 }}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Endereço"
                      value={imovelEditado.endereco || ""}
                      onChange={(e) =>
                        setImovelEditado((prev) => ({
                          ...prev,
                          endereco: e.target.value,
                        }))
                      }
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() =>
                        handleSalvarEdicaoImovel(imovel.idImovel ?? 0)
                      }
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setEditandoImovelId(null);
                        setImovelEditado({});
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{imovel.descricao}</Typography>
                    <Box>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEditarImovel(imovel)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() =>
                          handleExcluirImovel(imovel.idImovel ?? 0)
                        }
                        disabled={excluindo[imovel.idImovel ?? 0]}
                      >
                        {excluindo[imovel.idImovel ?? 0]
                          ? "Excluindo..."
                          : "Excluir"}
                      </Button>
                    </Box>
                  </>
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Data de Compra: {imovel.dataCompra.split("T")[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Endereço: {imovel.endereco}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1">Cômodos:</Typography>
              {imovel.comodos && imovel.comodos.length > 0 ? (
                <List dense>
                  {imovel.comodos.map((comodo: Comodo, idx: number) => (
                    <ListItem
                      key={comodo.idComodo ?? comodo.nome + idx}
                      secondaryAction={
                        editandoComodo &&
                        editandoComodo.idImovel === imovel.idImovel &&
                        editandoComodo.idx === idx ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              sx={{ mr: 1 }}
                              onClick={() =>
                                handleSalvarEdicaoComodo(
                                  imovel.idImovel ?? 0,
                                  idx
                                )
                              }
                              disabled={!comodoEditadoNome.trim()}
                            >
                              Salvar
                            </Button>
                            <Button
                              variant="outlined"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setEditandoComodo(null);
                                setComodoEditadoNome("");
                              }}
                            >
                              Cancelar
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ mr: 1 }}
                              onClick={() =>
                                handleEditarComodo(
                                  imovel.idImovel ?? 0,
                                  idx,
                                  comodo.nome
                                )
                              }
                            >
                              Editar
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={async () => {
                                const novosComodos = imovel.comodos.filter(
                                  (_, i) => i !== idx
                                );
                                const imovelAtualizado = {
                                  ...imovel,
                                  comodos: novosComodos,
                                };
                                try {
                                  await updateImovel(imovelAtualizado);
                                  setImoveis((prev) =>
                                    prev.map((i) =>
                                      i.idImovel === imovel.idImovel
                                        ? { ...imovelAtualizado }
                                        : i
                                    )
                                  );
                                } catch {
                                  alert("Erro ao excluir cômodo");
                                }
                              }}
                            >
                              Excluir
                            </Button>
                          </>
                        )
                      }
                    >
                      {editandoComodo &&
                      editandoComodo.idImovel === imovel.idImovel &&
                      editandoComodo.idx === idx ? (
                        <TextField
                          value={comodoEditadoNome}
                          onChange={(e) => setComodoEditadoNome(e.target.value)}
                          size="small"
                          autoFocus
                        />
                      ) : (
                        <ListItemText primary={comodo.nome} />
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Nenhum cômodo cadastrado.
                </Typography>
              )}
              <Stack direction="row" spacing={2} mt={2}>
                <TextField
                  label="Novo cômodo"
                  value={novoComodo[imovel.idImovel ?? 0] || ""}
                  onChange={(e) =>
                    setNovoComodo((prev) => ({
                      ...prev,
                      [imovel.idImovel ?? 0]: e.target.value,
                    }))
                  }
                  disabled={adicionando[imovel.idImovel ?? 0]}
                  size="small"
                />
                <Button
                  variant="outlined"
                  onClick={() => handleAddComodo(imovel.idImovel ?? 0)}
                  disabled={
                    adicionando[imovel.idImovel ?? 0] ||
                    !novoComodo[imovel.idImovel ?? 0]?.trim()
                  }
                >
                  {adicionando[imovel.idImovel ?? 0]
                    ? "Adicionando..."
                    : "Adicionar cômodo"}
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
}

export default App;
