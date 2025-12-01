import { NextResponse } from 'next/server';
import { getAllPeople, getPerformances } from '@/lib/fileSystem';

interface EmployeeRanking {
  id: string;
  name: string;
  totalReceived: number;
  recordCount: number;
}

export async function GET() {
  try {
    // Obter todas as pessoas
    const people = await getAllPeople();

    // Calcular ranking para cada pessoa
    const rankings: EmployeeRanking[] = await Promise.all(
      people.map(async (person) => {
        const performances = await getPerformances(person.id);
        
        const totalReceived = performances.reduce((sum, perf) => sum + perf.score, 0);
        const recordCount = performances.length;

        return {
          id: person.id,
          name: person.name,
          totalReceived,
          recordCount,
        };
      })
    );

    // Ordenar por total recebido (decrescente)
    rankings.sort((a, b) => b.totalReceived - a.totalReceived);

    return NextResponse.json(rankings);
  } catch (error) {
    console.error('Erro ao gerar ranking:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar ranking' },
      { status: 500 }
    );
  }
}
