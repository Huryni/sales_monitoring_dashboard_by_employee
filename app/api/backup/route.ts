import { NextResponse } from 'next/server';
import { needsBackup, createBackupAndReset } from '@/lib/fileSystem';

export async function GET() {
  try {
    const needs = await needsBackup();
    return NextResponse.json({ needsBackup: needs });
  } catch (error) {
    console.error('Erro ao verificar backup:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar backup' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const backupFolder = await createBackupAndReset();
    return NextResponse.json({
      success: true,
      message: 'Backup criado e dados resetados com sucesso',
      backupFolder,
    });
  } catch (error) {
    console.error('Erro ao criar backup:', error);
    return NextResponse.json(
      { error: 'Erro ao criar backup' },
      { status: 500 }
    );
  }
}
