'use client';

import { useState, useEffect } from 'react';

interface Person {
  id: string;
  name: string;
  createdAt: string;
}

interface Performance {
  id: string;
  date: string;
  score: number;
  notes: string;
}

export default function Dashboard() {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [newScore, setNewScore] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingPerformance, setEditingPerformance] = useState<Performance | null>(null);
  const [editScore, setEditScore] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [needsBackup, setNeedsBackup] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadPeople();
    checkBackup();
  }, []);

  useEffect(() => {
    if (selectedPerson) {
      loadPerformances(selectedPerson.id);
    }
  }, [selectedPerson]);

  async function loadPeople() {
    try {
      const res = await fetch('/api/people');
      const data = await res.json();
      setPeople(data);
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    }
  }

  async function checkBackup() {
    try {
      const res = await fetch('/api/backup');
      const data = await res.json();
      setNeedsBackup(data.needsBackup);
      
      if (data.needsBackup) {
        const shouldBackup = confirm(
          'Já se passaram 30 dias desde a primeira adição de valor!\n\n' +
          'Deseja criar um backup e resetar os dados?\n\n' +
          'Os dados atuais serão salvos na pasta "relatorios" e os registros serão zerados.'
        );
        
        if (shouldBackup) {
          await handleBackup();
        }
      }
    } catch (error) {
      console.error('Erro ao verificar backup:', error);
    }
  }

  async function handleBackup() {
    if (!confirm('Confirma a criação do backup e reset dos dados?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/backup', { method: 'POST' });
      const data = await res.json();
      
      if (res.ok) {
        alert(
          'Backup criado com sucesso!\n\n' +
          `Pasta: ${data.backupFolder}\n\n` +
          'Os dados foram resetados.'
        );
        setNeedsBackup(false);
        await loadPeople();
        if (selectedPerson) {
          await loadPerformances(selectedPerson.id);
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Erro ao criar backup');
    } finally {
      setLoading(false);
    }
  }

  async function handleExportCSV() {
    setExporting(true);
    try {
      const res = await fetch('/api/export');
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        alert('Relatório exportado com sucesso!');
      } else {
        alert('Erro ao exportar relatório');
      }
    } catch (error) {
      alert('Erro ao exportar relatório');
    } finally {
      setExporting(false);
    }
  }

  async function loadPerformances(personId: string) {
    try {
      const res = await fetch(`/api/performances/${personId}`);
      const data = await res.json();
      setPerformances(data);
    } catch (error) {
      console.error('Erro ao carregar desempenhos:', error);
    }
  }

  async function handleAddPerson(e: React.FormEvent) {
    e.preventDefault();
    if (!newPersonName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPersonName }),
      });

      if (res.ok) {
        setNewPersonName('');
        await loadPeople();
      } else {
        const error = await res.json();
        alert(error.error);
      }
    } catch (error) {
      alert('Erro ao adicionar pessoa');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPerformance(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPerson || !newScore) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/performances/${selectedPerson.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: parseFloat(newScore),
          notes: newNotes,
        }),
      });

      if (res.ok) {
        setNewScore('');
        setNewNotes('');
        await loadPerformances(selectedPerson.id);
      } else {
        const error = await res.json();
        alert(error.error);
      }
    } catch (error) {
      alert('Erro ao adicionar desempenho');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePerson(personId: string) {
    if (!confirm('Tem certeza que deseja deletar esta pessoa?')) return;

    try {
      await fetch(`/api/people/${personId}`, { method: 'DELETE' });
      if (selectedPerson?.id === personId) {
        setSelectedPerson(null);
        setPerformances([]);
      }
      await loadPeople();
    } catch (error) {
      alert('Erro ao deletar pessoa');
    }
  }

  function startEditPerformance(perf: Performance) {
    setEditingPerformance(perf);
    setEditScore(perf.score.toString());
    setEditNotes(perf.notes);
  }

  function cancelEdit() {
    setEditingPerformance(null);
    setEditScore('');
    setEditNotes('');
  }

  async function handleUpdatePerformance(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPerson || !editingPerformance || !editScore) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/performances/${selectedPerson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          performanceId: editingPerformance.id,
          score: parseFloat(editScore),
          notes: editNotes,
        }),
      });

      if (res.ok) {
        cancelEdit();
        await loadPerformances(selectedPerson.id);
      } else {
        const error = await res.json();
        alert(error.error);
      }
    } catch (error) {
      alert('Erro ao atualizar desempenho');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePerformance(performanceId: string) {
    if (!selectedPerson) return;
    if (!confirm('Tem certeza que deseja deletar este registro?')) return;

    try {
      await fetch(
        `/api/performances/${selectedPerson.id}?performanceId=${performanceId}`,
        { method: 'DELETE' }
      );
      await loadPerformances(selectedPerson.id);
    } catch (error) {
      alert('Erro ao deletar registro');
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Dashboard de Desempenho
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:bg-gray-600 flex items-center gap-2"
            >
              {exporting ? '⏳ Exportando...' : '📊 Exportar CSV'}
            </button>
            {needsBackup && (
              <button
                onClick={handleBackup}
                disabled={loading}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold disabled:bg-gray-600 animate-pulse"
              >
                💾 Fazer Backup
              </button>
            )}
            <a
              href="/ranking"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
            >
              Ver Ranking 🏆
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Painel de Pessoas */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Pessoas</h2>
            
            <form onSubmit={handleAddPerson} className="mb-6">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="Nome da pessoa"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg mb-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-600"
              >
                Adicionar Pessoa
              </button>
            </form>

            <div className="space-y-2">
              {people.map((person) => (
                <div
                  key={person.id}
                  className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
                    selectedPerson?.id === person.id
                      ? 'bg-blue-600 border-2 border-blue-400'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <span
                    onClick={() => setSelectedPerson(person)}
                    className="flex-1 text-white"
                  >
                    {person.name}
                  </span>

                </div>
              ))}
            </div>
          </div>

          {/* Painel de Desempenho */}
          <div className="lg:col-span-2">
            {selectedPerson ? (
              <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-white">
                  Desempenho de {selectedPerson.name}
                </h2>

                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-700">
                    <p className="text-sm text-gray-400">Valor Total Recebido</p>
                    <p className="text-3xl font-bold text-blue-400">
                      R$ {performances.reduce((acc, p) => acc + p.score, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-green-900/50 p-4 rounded-lg border border-green-700">
                    <p className="text-sm text-gray-400">Total de Registros</p>
                    <p className="text-3xl font-bold text-green-400">
                      {performances.length}
                    </p>
                  </div>
                </div>

                {/* Adicionar Desempenho */}
                <form onSubmit={handleAddPerformance} className="mb-6 p-4 bg-gray-700 rounded-lg">
                  <h3 className="font-semibold mb-3 text-white">Adicionar Valor Recebido</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={newScore}
                      onChange={(e) => setNewScore(e.target.value)}
                      placeholder="Valor recebido (R$)"
                      min="0"
                      step="0.01"
                      className="px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg placeholder-gray-400"
                      disabled={loading}
                    />
                    <input
                      type="text"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="Notas (opcional)"
                      className="px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg placeholder-gray-400"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                  >
                    Adicionar
                  </button>
                </form>

                {/* Lista de Desempenhos */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-white">Histórico</h3>
                  {performances.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      Nenhum valor registrado ainda
                    </p>
                  ) : (
                    performances
                      .slice()
                      .reverse()
                      .map((perf) => (
                        <div key={perf.id}>
                          {editingPerformance?.id === perf.id ? (
                            // Modo de Edição
                            <form
                              onSubmit={handleUpdatePerformance}
                              className="p-4 bg-blue-900/30 border-2 border-blue-500 rounded-lg"
                            >
                              <p className="text-sm text-gray-400 mb-3">
                                Editando registro de{' '}
                                {new Date(perf.date).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <input
                                  type="number"
                                  value={editScore}
                                  onChange={(e) => setEditScore(e.target.value)}
                                  placeholder="Valor recebido (R$)"
                                  min="0"
                                  step="0.01"
                                  className="px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg placeholder-gray-400"
                                  disabled={loading}
                                  required
                                />
                                <input
                                  type="text"
                                  value={editNotes}
                                  onChange={(e) => setEditNotes(e.target.value)}
                                  placeholder="Notas (opcional)"
                                  className="px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg placeholder-gray-400"
                                  disabled={loading}
                                />
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="submit"
                                  disabled={loading}
                                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                  Salvar
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  disabled={loading}
                                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 disabled:bg-gray-400"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </form>
                          ) : (
                            // Modo de Visualização
                            <div className="p-4 bg-gray-700 rounded-lg flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm text-gray-400">
                                  {new Date(perf.date).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                                {perf.notes && (
                                  <p className="text-gray-300 mt-1">{perf.notes}</p>
                                )}
                              </div>
                              <div className="ml-4 flex items-center gap-3">
                                <span className="text-2xl font-bold text-green-400">
                                  R$ {perf.score.toFixed(2)}
                                </span>
                                <div className="flex flex-col gap-1">
                                  <button
                                    onClick={() => startEditPerformance(perf)}
                                    className="text-blue-400 hover:text-blue-300 text-sm"
                                    title="Editar"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleDeletePerformance(perf.id)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                    title="Deletar"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow p-6 text-center text-gray-400">
                Selecione uma pessoa para ver o desempenho
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
