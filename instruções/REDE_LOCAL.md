# 🌐 Guia de Acesso pela Rede Local

Este guia explica como disponibilizar o Dashboard de Desempenho para outros computadores na mesma rede local.

## 📋 Pré-requisitos

- Node.js instalado no computador servidor
- Todos os computadores conectados na mesma rede (Wi-Fi ou cabo)
- Firewall configurado para permitir acesso (porta 3000)

## 🚀 Modo 1: Desenvolvimento (Recomendado para testes)

### No computador servidor:

1. Abra o terminal na pasta do projeto
2. Execute o comando:
   ```bash
   npm run dev:network
   ```

3. O servidor iniciará e mostrará algo como:
   ```
   ▲ Next.js 16.0.3
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.100:3000
   ```

4. **Anote o endereço Network** (exemplo: http://192.168.1.100:3000)

### Nos outros computadores:

1. Abra o navegador (Chrome, Firefox, Edge, etc.)
2. Digite o endereço Network anotado
3. Pronto! O dashboard estará acessível

## 🏭 Modo 2: Produção (Recomendado para uso contínuo)

### No computador servidor:

1. Primeiro, compile o projeto:
   ```bash
   npm run build
   ```

2. Depois, inicie o servidor de produção:
   ```bash
   npm run start:network
   ```

3. Anote o endereço Network mostrado

### Nos outros computadores:

- Acesse o endereço Network no navegador

## 🔍 Como descobrir o IP do servidor

Se o endereço Network não aparecer, descubra manualmente:

### Windows:
```bash
ipconfig
```
Procure por "Endereço IPv4" (exemplo: 192.168.1.100)

### Linux/Mac:
```bash
ifconfig
```
ou
```bash
ip addr show
```

O endereço completo será: `http://[SEU_IP]:3000`

## 🔥 Configurar Firewall (Windows)

Se outros computadores não conseguirem acessar:

1. Abra "Firewall do Windows Defender"
2. Clique em "Configurações avançadas"
3. Clique em "Regras de Entrada" → "Nova Regra"
4. Selecione "Porta" → Avançar
5. Selecione "TCP" e digite "3000" → Avançar
6. Selecione "Permitir a conexão" → Avançar
7. Marque todas as opções → Avançar
8. Nome: "Dashboard Node.js" → Concluir

## 📱 Acesso por Dispositivos Móveis

Smartphones e tablets na mesma rede também podem acessar:
- Abra o navegador do celular
- Digite o endereço Network
- O dashboard é responsivo e funciona em telas pequenas

## ⚠️ Observações Importantes

1. **Dados Compartilhados**: Todos os usuários verão e editarão os mesmos dados
2. **Sem Autenticação**: Qualquer pessoa na rede pode acessar
3. **Backup Automático**: Funciona apenas no servidor
4. **Exportação CSV**: Salva no computador de quem exportar
5. **Manter Servidor Ligado**: O computador servidor deve estar ligado e com o comando rodando

## 🛑 Parar o Servidor

Para parar o servidor, pressione `Ctrl + C` no terminal

## 🔄 Reiniciar Automaticamente (Opcional)

Para manter o servidor sempre rodando, use PM2:

```bash
npm install -g pm2
npm run build
pm2 start npm --name "dashboard" -- run start:network
pm2 save
pm2 startup
```

## 📊 Exemplo de Uso em Equipe

**Cenário**: Escritório com 5 computadores

1. **Computador 1** (Servidor): Executa `npm run start:network`
2. **Computadores 2-5**: Acessam via navegador
3. Todos podem:
   - Adicionar pessoas
   - Registrar valores
   - Ver ranking em tempo real
   - Exportar relatórios

## 🆘 Problemas Comuns

### "Não consigo acessar de outro computador"
- Verifique se estão na mesma rede
- Desative temporariamente o firewall para testar
- Confirme que o servidor está rodando

### "Página não carrega"
- Verifique se digitou o IP correto
- Confirme que a porta 3000 está liberada
- Tente acessar do próprio servidor primeiro (localhost:3000)

### "Dados não sincronizam"
- Atualize a página (F5)
- Todos acessam o mesmo servidor, dados são compartilhados automaticamente

## 💡 Dicas

- Crie um atalho no desktop dos computadores com o endereço
- Use IP fixo no servidor para não mudar o endereço
- Mantenha o servidor em um computador que fica sempre ligado
- Faça backups regulares dos dados
