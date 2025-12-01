import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export interface Person {
  id: string;
  name: string;
  createdAt: string;
}

export interface Performance {
  id: string;
  date: string;
  score: number;
  notes: string;
}

// Garantir que o diretório de dados existe
export async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Listar todas as pessoas
export async function getAllPeople(): Promise<Person[]> {
  await ensureDataDir();
  
  try {
    const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });
    const people: Person[] = [];
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        try {
          const personFile = path.join(DATA_DIR, entry.name, 'person.json');
          const data = await fs.readFile(personFile, 'utf-8');
          people.push(JSON.parse(data));
        } catch {
          // Ignorar pastas sem person.json
        }
      }
    }
    
    return people.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

// Criar nova pessoa
export async function createPerson(name: string): Promise<Person> {
  await ensureDataDir();
  
  const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const personDir = path.join(DATA_DIR, id);
  
  try {
    await fs.access(personDir);
    throw new Error('Pessoa já existe');
  } catch {
    // Pasta não existe, podemos criar
  }
  
  await fs.mkdir(personDir, { recursive: true });
  
  const person: Person = {
    id,
    name,
    createdAt: new Date().toISOString(),
  };
  
  await fs.writeFile(
    path.join(personDir, 'person.json'),
    JSON.stringify(person, null, 2)
  );
  
  return person;
}

// Obter desempenhos de uma pessoa
export async function getPerformances(personId: string): Promise<Performance[]> {
  const performanceFile = path.join(DATA_DIR, personId, 'performances.json');
  
  try {
    const data = await fs.readFile(performanceFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Adicionar desempenho
export async function addPerformance(
  personId: string,
  score: number,
  notes: string
): Promise<Performance> {
  const performances = await getPerformances(personId);
  
  const newPerformance: Performance = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    score,
    notes,
  };
  
  performances.push(newPerformance);
  
  const performanceFile = path.join(DATA_DIR, personId, 'performances.json');
  await fs.writeFile(performanceFile, JSON.stringify(performances, null, 2));
  
  return newPerformance;
}

// Editar desempenho
export async function updatePerformance(
  personId: string,
  performanceId: string,
  score: number,
  notes: string
): Promise<Performance> {
  const performances = await getPerformances(personId);
  
  const index = performances.findIndex(p => p.id === performanceId);
  if (index === -1) {
    throw new Error('Desempenho não encontrado');
  }
  
  performances[index] = {
    ...performances[index],
    score,
    notes,
  };
  
  const performanceFile = path.join(DATA_DIR, personId, 'performances.json');
  await fs.writeFile(performanceFile, JSON.stringify(performances, null, 2));
  
  return performances[index];
}

// Deletar desempenho
export async function deletePerformance(
  personId: string,
  performanceId: string
): Promise<void> {
  const performances = await getPerformances(personId);
  const filtered = performances.filter(p => p.id !== performanceId);
  
  const performanceFile = path.join(DATA_DIR, personId, 'performances.json');
  await fs.writeFile(performanceFile, JSON.stringify(filtered, null, 2));
}

// Deletar pessoa
export async function deletePerson(personId: string): Promise<void> {
  const personDir = path.join(DATA_DIR, personId);
  await fs.rm(personDir, { recursive: true, force: true });
}

// Obter a data da primeira performance de todas as pessoas
export async function getFirstPerformanceDate(): Promise<Date | null> {
  const people = await getAllPeople();
  let firstDate: Date | null = null;

  for (const person of people) {
    const performances = await getPerformances(person.id);
    if (performances.length > 0) {
      const personFirstDate = new Date(performances[0].date);
      if (!firstDate || personFirstDate < firstDate) {
        firstDate = personFirstDate;
      }
    }
  }

  return firstDate;
}

// Verificar se precisa fazer backup (30 dias desde a primeira performance)
export async function needsBackup(): Promise<boolean> {
  const firstDate = await getFirstPerformanceDate();
  if (!firstDate) return false;

  const daysSinceFirst = Math.floor(
    (Date.now() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysSinceFirst >= 30;
}

// Criar backup e resetar dados
export async function createBackupAndReset(): Promise<string> {
  const BACKUP_DIR = path.join(process.cwd(), 'relatorios');
  await fs.mkdir(BACKUP_DIR, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFolder = path.join(BACKUP_DIR, `backup_${timestamp}`);
  await fs.mkdir(backupFolder, { recursive: true });

  // Copiar todos os dados para o backup
  const people = await getAllPeople();
  for (const person of people) {
    const personDir = path.join(DATA_DIR, person.id);
    const backupPersonDir = path.join(backupFolder, person.id);
    await fs.mkdir(backupPersonDir, { recursive: true });

    // Copiar person.json
    const personFile = path.join(personDir, 'person.json');
    const backupPersonFile = path.join(backupPersonDir, 'person.json');
    await fs.copyFile(personFile, backupPersonFile);

    // Copiar performances.json se existir
    const performanceFile = path.join(personDir, 'performances.json');
    try {
      const backupPerformanceFile = path.join(
        backupPersonDir,
        'performances.json'
      );
      await fs.copyFile(performanceFile, backupPerformanceFile);
    } catch {
      // Arquivo não existe
    }
  }

  // Gerar CSV do backup
  const csvContent = await generateCSVContent();
  const csvFile = path.join(backupFolder, `relatorio_${timestamp}.csv`);
  await fs.writeFile(csvFile, csvContent, 'utf-8');

  // Limpar dados atuais (resetar performances)
  for (const person of people) {
    const performanceFile = path.join(DATA_DIR, person.id, 'performances.json');
    try {
      await fs.writeFile(performanceFile, JSON.stringify([], null, 2));
    } catch {
      // Arquivo não existe
    }
  }

  return backupFolder;
}

// Gerar conteúdo CSV
export async function generateCSVContent(): Promise<string> {
  const people = await getAllPeople();
  const rows: string[] = [
    'Nome,Data,Valor (R$),Notas',
  ];

  for (const person of people) {
    const performances = await getPerformances(person.id);
    for (const perf of performances) {
      const date = new Date(perf.date).toLocaleString('pt-BR');
      const notes = perf.notes.replace(/,/g, ';').replace(/"/g, '""');
      rows.push(`"${person.name}","${date}","${perf.score.toFixed(2)}","${notes}"`);
    }
  }

  // Adicionar linha de total
  let total = 0;
  for (const person of people) {
    const performances = await getPerformances(person.id);
    total += performances.reduce((sum, p) => sum + p.score, 0);
  }
  rows.push('');
  rows.push(`"TOTAL GERAL","","${total.toFixed(2)}",""`);

  return rows.join('\n');
}

// Exportar CSV manualmente
export async function exportCSV(): Promise<string> {
  const REPORTS_DIR = path.join(process.cwd(), 'relatorios');
  await fs.mkdir(REPORTS_DIR, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const csvFile = path.join(REPORTS_DIR, `relatorio_${timestamp}.csv`);

  const csvContent = await generateCSVContent();
  await fs.writeFile(csvFile, csvContent, 'utf-8');

  return csvFile;
}
