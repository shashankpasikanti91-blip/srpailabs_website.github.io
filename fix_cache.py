import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('5.223.67.236', username='root', password='856Reey@nsh')

# Disable aggressive caching
cmds = [
    "sed -i 's/expires 1y;/expires -1;/' /etc/nginx/sites-available/srpailabs.conf",
    'sed -i \'s/add_header Cache-Control "public, immutable";/add_header Cache-Control "no-cache, no-store, must-revalidate";/\' /etc/nginx/sites-available/srpailabs.conf',
    "nginx -t",
    "nginx -s reload",
]

for cmd in cmds:
    i,o,e = ssh.exec_command(cmd)
    out = o.read().decode().strip()
    err = e.read().decode().strip()
    if out: print(out)
    if err: print(err)

# Verify
i,o,e = ssh.exec_command('grep -A2 "Static asset" /etc/nginx/sites-available/srpailabs.conf')
print("\nUpdated config:")
print(o.read().decode())

ssh.close()
print("Done - caching disabled")
