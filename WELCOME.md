# 📊 Dashboard de Desempenho

Sistema de gerenciamento de valores recebidos por funcionários com ranking e relatórios.

## 🚀 Início Rápido

### Instalação (Primeira vez)

1. Certifique-se de ter o Node.js instalado
2. Abra o terminal nesta pasta
3. Execute:
   ```bash
   npm install
   ```

### Uso Local (Apenas neste computador)

```bash
npm run dev
```
Acesse: http://localhost:3000

### 🌐 Uso em Rede Local (Vários computadores)

#### Opção 1: Clique duplo (Windows)
- **Desenvolvimento**: Clique em `iniciar-rede.bat`
- **Produção**: Clique em `iniciar-producao.bat`

#### Opção 2: Terminal
```bash
# Desenvolvimento (mais rápido para iniciar)
npm run dev:network

# Produção (mais rápido para usar)
npm run build
npm run start:network
```

**Anote o endereço "Network"** que aparece (ex: http://192.168.1.100:3000)

**Nos outros computadores**: Abra o navegador e digite esse endereço

📖 **Guia completo**: Veja [REDE_LOCAL.md](REDE_LOCAL.md)

## ✨ Funcionalidades

- ✅ Cadastro de funcionários
- ✅ Registro de valores recebidos
- ✅ Edição e exclusão de registros
- ✅ Ranking visual com gráficos
- ✅ Exportação de relatórios em CSV
- ✅ Backup automático após 30 dias
- ✅ Interface responsiva (funciona em celular)
- ✅ Acesso em rede local

## 📁 Estrutura de Dados

```
dashboard/
├── data/              # Dados dos funcionários
├── relatorios/        # Relatórios exportados e backups
├── iniciar-rede.bat   # Atalho para iniciar na rede
└── ...
```

## 🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento local |
| `npm run dev:network` | Desenvolvimento em rede |
| `npm run build` | Compilar para produção |
| `npm run start` | Produção local |
| `npm run start:network` | Produção em rede |

## 📱 Acesso Móvel

Smartphones e tablets na mesma rede podem acessar o dashboard pelo navegador usando o endereço Network.

## 💾 Backup e Relatórios

- **Exportação Manual**: Botão "Exportar CSV" nas páginas
- **Backup Automático**: Após 30 dias da primeira entrada
- **Localização**: Pasta `relatorios/`

## ⚠️ Importante

- Mantenha o computador servidor ligado e com o programa rodando
- Todos os usuários compartilham os mesmos dados
- Configure o firewall para permitir acesso (porta 3000)
- Faça backups regulares da pasta `data/`

## 🆘 Suporte

Problemas comuns e soluções estão no arquivo [REDE_LOCAL.md](REDE_LOCAL.md)

## 📊 Exemplo de Uso

1. **Gerente**: Adiciona funcionários no sistema
2. **Funcionários**: Registram valores recebidos
3. **Todos**: Visualizam ranking em tempo real
4. **Administrador**: Exporta relatórios mensais

---

Desenvolvido com Next.js, React e TypeScript
