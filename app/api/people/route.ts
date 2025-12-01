import { NextResponse } from 'next/server';
import { getAllPeople, createPerson } from '@/lib/fileSystem';

export async function GET() {
  try {
    const people = await getAllPeople();
    return NextResponse.json(people);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar pessoas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
        { status: 400 }
      );
    }
    
    const person = await createPerson(name);
    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar pessoa';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
