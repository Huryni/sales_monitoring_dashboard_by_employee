import { NextResponse } from 'next/server';
import { generateCSVContent, exportCSV } from '@/lib/fileSystem';

export async function GET() {
  try {
    const csvContent = await generateCSVContent();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `relatorio_${timestamp}.csv`;

    // Salvar arquivo no servidor
    await exportCSV();

    // Retornar para download
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Erro ao exportar CSV:', error);
    return NextResponse.json(
      { error: 'Erro ao exportar relatório' },
      { status: 500 }
    );
  }
}
