# 🔥 Configurar Firewall do Windows

Se outros computadores não conseguem acessar o dashboard, siga este guia para liberar a porta 3000 no firewall.

## 🪟 Windows 10/11

### Método 1: Interface Gráfica (Recomendado)

1. **Abrir Firewall**
   - Pressione `Win + R`
   - Digite: `wf.msc`
   - Pressione Enter

2. **Criar Nova Regra**
   - Clique em "Regras de Entrada" (lado esquerdo)
   - Clique em "Nova Regra..." (lado direito)

3. **Tipo de Regra**
   - Selecione: **Porta**
   - Clique em "Avançar"

4. **Protocolo e Portas**
   - Selecione: **TCP**
   - Selecione: **Portas locais específicas**
   - Digite: **3000**
   - Clique em "Avançar"

5. **Ação**
   - Selecione: **Permitir a conexão**
   - Clique em "Avançar"

6. **Perfil**
   - Marque todas as opções:
     - ☑ Domínio
     - ☑ Particular
     - ☑ Público
   - Clique em "Avançar"

7. **Nome**
   - Nome: **Dashboard Node.js**
   - Descrição: **Permite acesso ao Dashboard de Desempenho na porta 3000**
   - Clique em "Concluir"

✅ **Pronto!** A porta 3000 está liberada.

### Método 2: Linha de Comando (Rápido)

Abra o PowerShell como Administrador e execute:

```powershell
New-NetFirewallRule -DisplayName "Dashboard Node.js" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

### Método 3: Desabilitar Temporariamente (Apenas para teste)

⚠️ **NÃO RECOMENDADO para uso contínuo**

1. Abra "Configurações do Windows"
2. Vá em "Privacidade e segurança" → "Segurança do Windows"
3. Clique em "Firewall e proteção de rede"
4. Clique na rede ativa
5. Desative "Firewall do Microsoft Defender"

**Lembre-se de reativar depois!**

## 🍎 macOS

```bash
# Permitir conexões na porta 3000
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add node
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblockapp node
```

## 🐧 Linux (Ubuntu/Debian)

```bash
# UFW (Ubuntu)
sudo ufw allow 3000/tcp

# Firewalld (Fedora/CentOS)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

## ✅ Testar se Funcionou

1. No servidor, execute:
   ```bash
   npm run dev:network
   ```

2. Em outro computador na mesma rede:
   - Abra o navegador
   - Digite: `http://[IP_DO_SERVIDOR]:3000`
   - Exemplo: `http://192.168.1.100:3000`

3. Se a página carregar, está funcionando! 🎉

## 🔍 Verificar se a Porta Está Aberta

### Windows (PowerShell):
```powershell
Test-NetConnection -ComputerName localhost -Port 3000
```

### Linux/Mac:
```bash
netstat -an | grep 3000
```

## ❌ Remover Regra do Firewall

Se precisar remover a regra depois:

### Windows (Interface):
1. Abra `wf.msc`
2. Vá em "Regras de Entrada"
3. Encontre "Dashboard Node.js"
4. Clique com botão direito → Excluir

### Windows (PowerShell):
```powershell
Remove-NetFirewallRule -DisplayName "Dashboard Node.js"
```

## 🆘 Problemas Comuns

### "Ainda não consigo acessar"

1. ✓ Confirme que o servidor está rodando
2. ✓ Verifique se está na mesma rede
3. ✓ Tente desabilitar antivírus temporariamente
4. ✓ Reinicie o computador servidor
5. ✓ Verifique se o IP está correto

### "Funciona no servidor mas não em outros PCs"

- O problema é o firewall
- Siga os passos acima novamente
- Tente o Método 3 para testar

### "Erro de conexão recusada"

- O servidor não está rodando
- Execute `npm run dev:network` novamente

## 💡 Dica de Segurança

Para redes corporativas ou públicas, considere:
- Usar apenas em redes confiáveis
- Adicionar autenticação (requer desenvolvimento adicional)
- Usar VPN para acesso remoto
- Manter o firewall ativo e configurado corretamente

---

**Precisa de mais ajuda?** Consulte o arquivo REDE_LOCAL.md
