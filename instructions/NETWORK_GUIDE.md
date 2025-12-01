# 🌐 Local Network Access Guide

This guide explains how to make the Performance Dashboard available to other computers on the same local network.

## 📋 Prerequisites

- Node.js installed on the server computer
- All computers connected to the same network (Wi-Fi or cable)
- Firewall configured to allow access (port 3000)

## 🚀 Mode 1: Development (Recommended for testing)

### On the server computer:

1. Open terminal in the project folder
2. Run the command:
   ```bash
   npm run dev:network
   ```

3. The server will start and show something like:
   ```
   ▲ Next.js 16.0.3
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.100:3000
   ```

4. **Note the Network address** (example: http://192.168.1.100:3000)

### On other computers:

1. Open browser (Chrome, Firefox, Edge, etc.)
2. Type the noted Network address
3. Done! The dashboard will be accessible

## 🏭 Mode 2: Production (Recommended for continuous use)

### On the server computer:

1. First, build the project:
   ```bash
   npm run build
   ```

2. Then, start the production server:
   ```bash
   npm run start:network
   ```

3. Note the Network address shown

### On other computers:

- Access the Network address in the browser

## 🔍 How to Find the Server IP

If the Network address doesn't appear, find it manually:

### Windows:
```bash
ipconfig
```
Look for "IPv4 Address" (example: 192.168.1.100)

### Linux/Mac:
```bash
ifconfig
```
or
```bash
ip addr show
```

The complete address will be: `http://[YOUR_IP]:3000`

## 🔥 Configure Firewall (Windows)

If other computers can't access:

1. Open "Windows Defender Firewall"
2. Click "Advanced settings"
3. Click "Inbound Rules" → "New Rule"
4. Select "Port" → Next
5. Select "TCP" and type "3000" → Next
6. Select "Allow the connection" → Next
7. Check all options → Next
8. Name: "Dashboard Node.js" → Finish

## 📱 Mobile Device Access

Smartphones and tablets on the same network can also access:
- Open browser on phone
- Type the Network address
- Dashboard is responsive and works on small screens

## ⚠️ Important Notes

1. **Shared Data**: All users will see and edit the same data
2. **No Authentication**: Anyone on the network can access
3. **Automatic Backup**: Works only on the server
4. **CSV Export**: Saves on the computer that exports
5. **Keep Server On**: Server computer must be on and running the command

## 🛑 Stop the Server

To stop the server, press `Ctrl + C` in the terminal

## 🔄 Auto-Restart (Optional)

To keep the server always running, use PM2:

```bash
npm install -g pm2
npm run build
pm2 start npm --name "dashboard" -- run start:network
pm2 save
pm2 startup
```

## 📊 Team Usage Example

**Scenario**: Office with 5 computers

1. **Computer 1** (Server): Runs `npm run start:network`
2. **Computers 2-5**: Access via browser
3. Everyone can:
   - Add people
   - Record values
   - See real-time ranking
   - Export reports

## 🆘 Common Problems

### "Can't access from another computer"
- Check if they're on the same network
- Temporarily disable firewall to test
- Confirm the server is running

### "Page doesn't load"
- Check if you typed the correct IP
- Confirm port 3000 is open
- Try accessing from the server itself first (localhost:3000)

### "Data doesn't sync"
- Refresh the page (F5)
- Everyone accesses the same server, data is automatically shared

## 💡 Tips

- Create a desktop shortcut on computers with the address
- Use fixed IP on server so address doesn't change
- Keep server on a computer that stays on
- Make regular data backups
