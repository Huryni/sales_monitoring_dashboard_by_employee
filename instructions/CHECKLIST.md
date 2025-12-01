# ✅ Configuration Checklist - Local Network

Use this checklist to ensure everything is working correctly.

## 📋 Before Starting

- [ ] Node.js is installed (version 18 or higher)
- [ ] All computers are on the same network
- [ ] You have administrator access (for firewall)

## 🔧 Initial Setup

- [ ] Ran `npm install` in the dashboard folder
- [ ] Installation completed without errors
- [ ] `node_modules` folder was created

## 🚀 Local Test (First)

Before testing on the network, verify it works locally:

- [ ] Ran `npm run dev` (without :network)
- [ ] Opened http://localhost:3000 in browser
- [ ] Page loaded correctly
- [ ] Can add a person
- [ ] Can add a value
- [ ] Can see the ranking

If everything above worked, proceed to local network.

## 🌐 Network Configuration

- [ ] Ran `npm run dev:network` or double-clicked `iniciar-rede.bat`
- [ ] Terminal showed "Network: http://..." message
- [ ] Noted the IP address (e.g., 192.168.1.100)
- [ ] Terminal remains open

## 🔥 Firewall

- [ ] Opened Windows firewall (`wf.msc`)
- [ ] Created inbound rule for port 3000
- [ ] Rule is active and enabled
- [ ] Or temporarily disabled firewall for testing

## 🖥️ Test on Another Computer

On the second computer:

- [ ] Is on the same network as the server
- [ ] Opened the browser
- [ ] Typed the Network address (e.g., http://192.168.1.100:3000)
- [ ] Page loaded
- [ ] Can see server data
- [ ] Can add/edit data

## 📱 Mobile Device Test (Optional)

- [ ] Phone/tablet connected to the same Wi-Fi network
- [ ] Opened browser on device
- [ ] Typed the Network address
- [ ] Page loaded and is responsive

## 💾 Feature Testing

- [ ] Add person works
- [ ] Add value works
- [ ] Edit value works
- [ ] Delete value works
- [ ] Ranking updates correctly
- [ ] Export CSV works
- [ ] CSV downloads correctly

## 🔄 Synchronization

- [ ] Changes on PC 1 appear on PC 2 (after F5)
- [ ] Changes on PC 2 appear on PC 1 (after F5)
- [ ] Multiple users can use simultaneously

## 📊 Reports and Backup

- [ ] `relatorios/` folder is created when exporting
- [ ] CSV contains correct data
- [ ] Automatic backup works (manual test if desired)

## ⚠️ Common Issues

### ❌ "Can't access from another PC"

Check:
- [ ] Both are on the same network
- [ ] IP is correct
- [ ] Firewall is configured
- [ ] Server is running
- [ ] Port 3000 is not being used by another program

### ❌ "Page doesn't load"

Try:
- [ ] Refresh the page (F5)
- [ ] Clear browser cache (Ctrl+Shift+Del)
- [ ] Test in another browser
- [ ] Check if server hasn't crashed
- [ ] Restart the server

### ❌ "Data doesn't appear"

- [ ] Wait a few seconds
- [ ] Refresh the page (F5)
- [ ] Check for errors in browser console (F12)
- [ ] Check for errors in server terminal

## 🎯 Production Checklist

For continuous use (not just testing):

- [ ] Ran `npm run build`
- [ ] Build completed without errors
- [ ] Ran `npm run start:network`
- [ ] Server is faster than in dev mode
- [ ] Configured to start automatically (optional)

## 📝 Documentation Verified

- [ ] Read the README.md
- [ ] Read the REDE_LOCAL.md
- [ ] Know how to configure firewall
- [ ] Know how to do manual backup
- [ ] Know how to export reports

## ✅ Everything Working!

If you checked all items above, congratulations! 🎉

Your dashboard is configured and working perfectly on the local network.

## 📞 Next Steps

1. Share the address with your team
2. Create a desktop shortcut on PCs
3. Configure automatic backup
4. Train users on features
5. Establish report export routine

---

**Tip:** Print this checklist and use it whenever setting up in a new location.
