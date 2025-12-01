import { NextResponse } from 'next/server';
import {
  getPerformances,
  addPerformance,
  updatePerformance,
  deletePerformance,
} from '@/lib/fileSystem';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const performances = await getPerformances(id);
    return NextResponse.json(performances);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar desempenhos' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { score, notes } = await request.json();
    
    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json(
        { error: 'Score deve ser um número positivo' },
        { status: 400 }
      );
    }
    
    const performance = await addPerformance(id, score, notes || '');
    return NextResponse.json(performance, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao adicionar desempenho' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { performanceId, score, notes } = await request.json();

    if (!performanceId) {
      return NextResponse.json(
        { error: 'ID do desempenho é obrigatório' },
        { status: 400 }
      );
    }

    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json(
        { error: 'Score deve ser um número positivo' },
        { status: 400 }
      );
    }

    const performance = await updatePerformance(
      id,
      performanceId,
      score,
      notes || ''
    );
    return NextResponse.json(performance);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro ao atualizar desempenho';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const performanceId = searchParams.get('performanceId');

    if (!performanceId) {
      return NextResponse.json(
        { error: 'ID do desempenho é obrigatório' },
        { status: 400 }
      );
    }

    await deletePerformance(id, performanceId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar desempenho' },
      { status: 500 }
    );
  }
}
