import { NextResponse } from 'next/server';
import { deletePerson } from '@/lib/fileSystem';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deletePerson(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar pessoa' },
      { status: 500 }
    );
  }
}
