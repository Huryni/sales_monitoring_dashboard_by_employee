# 🔥 Configure Windows Firewall

If other computers can't access the dashboard, follow this guide to open port 3000 in the firewall.

## 🪟 Windows 10/11

### Method 1: Graphical Interface (Recommended)

1. **Open Firewall**
   - Press `Win + R`
   - Type: `wf.msc`
   - Press Enter

2. **Create New Rule**
   - Click "Inbound Rules" (left side)
   - Click "New Rule..." (right side)

3. **Rule Type**
   - Select: **Port**
   - Click "Next"

4. **Protocol and Ports**
   - Select: **TCP**
   - Select: **Specific local ports**
   - Type: **3000**
   - Click "Next"

5. **Action**
   - Select: **Allow the connection**
   - Click "Next"

6. **Profile**
   - Check all options:
     - ☑ Domain
     - ☑ Private
     - ☑ Public
   - Click "Next"

7. **Name**
   - Name: **Dashboard Node.js**
   - Description: **Allows access to Performance Dashboard on port 3000**
   - Click "Finish"

✅ **Done!** Port 3000 is now open.

### Method 2: Command Line (Quick)

Open PowerShell as Administrator and run:

```powershell
New-NetFirewallRule -DisplayName "Dashboard Node.js" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

### Method 3: Temporarily Disable (Testing only)

⚠️ **NOT RECOMMENDED for continuous use**

1. Open "Windows Settings"
2. Go to "Privacy & security" → "Windows Security"
3. Click "Firewall & network protection"
4. Click on the active network
5. Turn off "Microsoft Defender Firewall"

**Remember to turn it back on!**

## 🍎 macOS

```bash
# Allow connections on port 3000
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

## ✅ Test if It Worked

1. On the server, run:
   ```bash
   npm run dev:network
   ```

2. On another computer on the same network:
   - Open the browser
   - Type: `http://[SERVER_IP]:3000`
   - Example: `http://192.168.1.100:3000`

3. If the page loads, it's working! 🎉

## 🔍 Check if Port is Open

### Windows (PowerShell):
```powershell
Test-NetConnection -ComputerName localhost -Port 3000
```

### Linux/Mac:
```bash
netstat -an | grep 3000
```

## ❌ Remove Firewall Rule

If you need to remove the rule later:

### Windows (Interface):
1. Open `wf.msc`
2. Go to "Inbound Rules"
3. Find "Dashboard Node.js"
4. Right-click → Delete

### Windows (PowerShell):
```powershell
Remove-NetFirewallRule -DisplayName "Dashboard Node.js"
```

## 🆘 Common Problems

### "Still can't access"

1. ✓ Confirm the server is running
2. ✓ Verify you're on the same network
3. ✓ Try temporarily disabling antivirus
4. ✓ Restart the server computer
5. ✓ Check if the IP is correct

### "Works on server but not on other PCs"

- The problem is the firewall
- Follow the steps above again
- Try Method 3 for testing

### "Connection refused error"

- The server is not running
- Run `npm run dev:network` again

## 💡 Security Tip

For corporate or public networks, consider:
- Use only on trusted networks
- Add authentication (requires additional development)
- Use VPN for remote access
- Keep firewall active and properly configured

---

**Need more help?** Check the NETWORK_GUIDE.md file
