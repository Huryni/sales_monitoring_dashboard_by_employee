# ✅ Checklist de Configuração - Rede Local

Use este checklist para garantir que tudo está funcionando corretamente.

## 📋 Antes de Começar

- [ ] Node.js está instalado (versão 18 ou superior)
- [ ] Todos os computadores estão na mesma rede
- [ ] Você tem acesso de administrador (para firewall)

## 🔧 Configuração Inicial

- [ ] Executou `npm install` na pasta dashboard
- [ ] Instalação concluída sem erros
- [ ] Pasta `node_modules` foi criada

## 🚀 Teste Local (Primeiro)

Antes de testar na rede, verifique se funciona localmente:

- [ ] Executou `npm run dev` (sem :network)
- [ ] Abriu http://localhost:3000 no navegador
- [ ] Página carregou corretamente
- [ ] Consegue adicionar uma pessoa
- [ ] Consegue adicionar um valor
- [ ] Consegue ver o ranking

Se tudo acima funcionou, prossiga para rede local.

## 🌐 Configuração de Rede

- [ ] Executou `npm run dev:network` ou clicou em `iniciar-rede.bat`
- [ ] Terminal mostrou mensagem "Network: http://..."
- [ ] Anotou o endereço IP (ex: 192.168.1.100)
- [ ] Terminal permanece aberto

## 🔥 Firewall

- [ ] Abriu o firewall do Windows (`wf.msc`)
- [ ] Criou regra de entrada para porta 3000
- [ ] Regra está ativa e habilitada
- [ ] Ou desabilitou firewall temporariamente para teste

## 🖥️ Teste em Outro Computador

No segundo computador:

- [ ] Está na mesma rede que o servidor
- [ ] Abriu o navegador
- [ ] Digitou o endereço Network (ex: http://192.168.1.100:3000)
- [ ] Página carregou
- [ ] Consegue ver os dados do servidor
- [ ] Consegue adicionar/editar dados

## 📱 Teste em Dispositivo Móvel (Opcional)

- [ ] Celular/tablet conectado na mesma rede Wi-Fi
- [ ] Abriu navegador no dispositivo
- [ ] Digitou o endereço Network
- [ ] Página carregou e é responsiva

## 💾 Teste de Funcionalidades

- [ ] Adicionar pessoa funciona
- [ ] Adicionar valor funciona
- [ ] Editar valor funciona
- [ ] Deletar valor funciona
- [ ] Ranking atualiza corretamente
- [ ] Exportar CSV funciona
- [ ] CSV é baixado corretamente

## 🔄 Sincronização

- [ ] Mudanças no PC 1 aparecem no PC 2 (após F5)
- [ ] Mudanças no PC 2 aparecem no PC 1 (após F5)
- [ ] Múltiplos usuários podem usar simultaneamente

## 📊 Relatórios e Backup

- [ ] Pasta `relatorios/` é criada ao exportar
- [ ] CSV contém dados corretos
- [ ] Backup automático funciona (teste manual se quiser)

## ⚠️ Problemas Comuns

### ❌ "Não consigo acessar de outro PC"

Verifique:
- [ ] Ambos estão na mesma rede
- [ ] IP está correto
- [ ] Firewall está configurado
- [ ] Servidor está rodando
- [ ] Porta 3000 não está sendo usada por outro programa

### ❌ "Página não carrega"

Tente:
- [ ] Atualizar a página (F5)
- [ ] Limpar cache do navegador (Ctrl+Shift+Del)
- [ ] Testar em outro navegador
- [ ] Verificar se o servidor não travou
- [ ] Reiniciar o servidor

### ❌ "Dados não aparecem"

- [ ] Aguarde alguns segundos
- [ ] Atualize a página (F5)
- [ ] Verifique se há erros no console do navegador (F12)
- [ ] Verifique se há erros no terminal do servidor

## 🎯 Checklist de Produção

Para uso contínuo (não apenas testes):

- [ ] Executou `npm run build`
- [ ] Build concluído sem erros
- [ ] Executou `npm run start:network`
- [ ] Servidor está mais rápido que no modo dev
- [ ] Configurou para iniciar automaticamente (opcional)

## 📝 Documentação Verificada

- [ ] Leu o README.md
- [ ] Leu o REDE_LOCAL.md
- [ ] Sabe como configurar firewall
- [ ] Sabe como fazer backup manual
- [ ] Sabe como exportar relatórios

## ✅ Tudo Funcionando!

Se marcou todos os itens acima, parabéns! 🎉

Seu dashboard está configurado e funcionando perfeitamente na rede local.

## 📞 Próximos Passos

1. Compartilhe o endereço com sua equipe
2. Crie um atalho no desktop dos PCs
3. Configure backup automático
4. Treine os usuários nas funcionalidades
5. Estabeleça rotina de exportação de relatórios

---

**Dica:** Imprima este checklist e use-o sempre que configurar em um novo local.
