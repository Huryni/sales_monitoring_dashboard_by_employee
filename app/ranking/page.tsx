'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface EmployeeRanking {
  id: string;
  name: string;
  totalReceived: number;
  recordCount: number;
}

export default function RankingPage() {
  const [rankings, setRankings] = useState<EmployeeRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadRankings();
  }, []);

  async function loadRankings() {
    try {
      const res = await fetch('/api/ranking');
      const data = await res.json();
      setRankings(data);
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
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

  const maxValue = Math.max(...rankings.map(r => r.totalReceived), 1);
  const totalArrecadacao = rankings.reduce((sum, r) => sum + r.totalReceived, 0);
  const totalRegistros = rankings.reduce((sum, r) => sum + r.recordCount, 0);
  
  const colors = [
    'bg-gradient-to-t from-yellow-500 to-yellow-300',
    'bg-gradient-to-t from-gray-400 to-gray-300',
    'bg-gradient-to-t from-orange-600 to-orange-400',
    'bg-gradient-to-t from-blue-500 to-blue-400',
    'bg-gradient-to-t from-green-500 to-green-400',
    'bg-gradient-to-t from-purple-500 to-purple-400',
    'bg-gradient-to-t from-pink-500 to-pink-400',
    'bg-gradient-to-t from-indigo-500 to-indigo-400',
  ];

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">
              🏆 Ranking de Desempenho
            </h1>
            <p className="text-gray-300 text-lg">
              Competição de valores recebidos
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:bg-gray-600 flex items-center gap-2"
            >
              {exporting ? '⏳ Exportando...' : '📊 Exportar CSV'}
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-semibold"
            >
              ← Voltar
            </Link>
          </div>
        </div>

        {/* Total de Arrecadação */}
        {!loading && rankings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-2xl p-6 border-2 border-green-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">
                    💰 Total Arrecadado
                  </p>
                  <p className="text-4xl font-bold text-white">
                    R$ {totalArrecadacao.toFixed(2)}
                  </p>
                </div>
                <div className="text-5xl opacity-20">💵</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl p-6 border-2 border-blue-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">
                    📊 Total de Registros
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {totalRegistros}
                  </p>
                </div>
                <div className="text-5xl opacity-20">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-2xl p-6 border-2 border-purple-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">
                    👥 Funcionários
                  </p>
                  <p className="text-4xl font-bold text-white">
                    {rankings.length}
                  </p>
                </div>
                <div className="text-5xl opacity-20">🏢</div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-white text-xl py-20">
            Carregando ranking...
          </div>
        ) : rankings.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-xl p-12 text-center">
            <p className="text-gray-400 text-xl">
              Nenhum dado disponível ainda. Adicione pessoas e registros de desempenho!
            </p>
          </div>
        ) : (
          <>
            {/* Pódio Visual */}
            <div className="bg-gray-800/50 backdrop-blur rounded-2xl shadow-2xl p-8 mb-8">
              <div className="flex items-end justify-center gap-4 h-96">
                {rankings.map((employee, index) => {
                  const heightPercentage = (employee.totalReceived / maxValue) * 100;
                  const minHeight = 15;
                  const finalHeight = Math.max(heightPercentage, minHeight);
                  
                  return (
                    <div
                      key={employee.id}
                      className="flex flex-col items-center justify-end flex-1 max-w-[150px]"
                      style={{ height: '100%' }}
                    >
                      {/* Valor e Medalha */}
                      <div className="mb-3 text-center">
                        {index < 3 && (
                          <div className="text-4xl mb-1">{medals[index]}</div>
                        )}
                        <div className="text-white font-bold text-xl">
                          R$ {employee.totalReceived.toFixed(2)}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {employee.recordCount} registro{employee.recordCount !== 1 ? 's' : ''}
                        </div>
                      </div>

                      {/* Barra */}
                      <div
                        className={`w-full rounded-t-xl ${colors[index % colors.length]} 
                          shadow-lg border-2 border-white/20 relative overflow-hidden
                          transition-all duration-500 hover:scale-105`}
                        style={{ height: `${finalHeight}%` }}
                      >
                        {/* Efeito de brilho */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30"></div>
                        
                        {/* Posição */}
                        <div className="absolute top-2 left-0 right-0 text-center">
                          <span className="text-white font-bold text-2xl drop-shadow-lg">
                            #{index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Nome */}
                      <div className="mt-3 text-center">
                        <p className="text-white font-semibold text-sm truncate max-w-[140px]">
                          {employee.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tabela Detalhada */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
                <h2 className="text-2xl font-bold text-white">
                  Classificação Completa
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Posição
                      </th>
                      <th className="px-6 py-4 text-left text-white font-semibold">
                        Nome
                      </th>
                      <th className="px-6 py-4 text-right text-white font-semibold">
                        Total Recebido
                      </th>
                      <th className="px-6 py-4 text-right text-white font-semibold">
                        Registros
                      </th>
                      <th className="px-6 py-4 text-right text-white font-semibold">
                        Média
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {rankings.map((employee, index) => (
                      <tr
                        key={employee.id}
                        className={`hover:bg-gray-700/50 transition-colors ${
                          index < 3 ? 'bg-gray-700/30' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">
                              {index + 1}
                            </span>
                            {index < 3 && (
                              <span className="text-2xl">{medals[index]}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-green-400 font-bold text-lg">
                            R$ {employee.totalReceived.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-300">
                          {employee.recordCount}
                        </td>
                        <td className="px-6 py-4 text-right text-blue-400 font-semibold">
                          R$ {(employee.totalReceived / employee.recordCount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
