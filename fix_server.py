import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('5.223.67.236', username='root', password='856Reey@nsh')

# Check what index.html references
i,o,e = ssh.exec_command("grep -oE 'srp-logo[^\"]+' /var/www/srpailabs/dist/index.html")
refs = o.read().decode().strip()
print("HTML references:", refs)

# Remove old stale assets
i,o,e = ssh.exec_command("rm -f /var/www/srpailabs/dist/assets/srp-logo-transparent-BMVOjzcg.png /var/www/srpailabs/dist/assets/index-5yAXGx9y.js")
print("Removed old assets")

# List remaining
i,o,e = ssh.exec_command("ls -la /var/www/srpailabs/dist/assets/")
print(o.read().decode())

# Reload nginx
i,o,e = ssh.exec_command("nginx -s reload")
print("Nginx reloaded")

ssh.close()
