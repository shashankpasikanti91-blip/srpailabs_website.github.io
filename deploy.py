"""
Deploy dist/ to Hetzner server via SFTP (paramiko).
Usage: python deploy.py
"""
import os
import sys
import paramiko
from pathlib import Path

HOST = "5.223.67.236"
PORT = 22
USER = "root"
PASSWORD = "856Reey@nsh"
LOCAL_DIST = Path(__file__).parent / "dist"
REMOTE_BASE = "/var/www/srpailabs/dist"

def upload_dir(sftp, local_path: Path, remote_path: str):
    """Recursively upload a local directory to remote."""
    try:
        sftp.stat(remote_path)
    except FileNotFoundError:
        sftp.mkdir(remote_path)

    for item in sorted(local_path.iterdir()):
        remote_item = f"{remote_path}/{item.name}"
        if item.is_dir():
            upload_dir(sftp, item, remote_item)
        else:
            print(f"  Uploading {item.relative_to(LOCAL_DIST.parent)} -> {remote_item}")
            sftp.put(str(item), remote_item)

def ensure_remote_dirs(ssh):
    """Make sure /var/www/srpailabs/dist exists on the server."""
    ssh.exec_command("mkdir -p /var/www/srpailabs/dist")
    # Also ensure nginx is set up to serve React SPA
    # Check if nginx site config exists
    _, stdout, _ = ssh.exec_command("test -f /etc/nginx/sites-enabled/srpailabs.conf && echo yes || echo no")
    exists = stdout.read().decode().strip()
    if exists == "no":
        print("  NOTE: Nginx site config not found at /etc/nginx/sites-enabled/srpailabs.conf")
        print("  You may need to set up nginx separately (see nginx/srpailabs.conf)")

def main():
    if not LOCAL_DIST.exists():
        print("ERROR: dist/ folder not found. Run 'npm run build' first.")
        sys.exit(1)

    print(f"Connecting to {HOST}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, port=PORT, username=USER, password=PASSWORD, timeout=30)
    print("Connected.")

    print("Ensuring remote directories exist...")
    ensure_remote_dirs(ssh)

    print(f"Uploading dist/ -> {REMOTE_BASE} ...")
    sftp = ssh.open_sftp()
    upload_dir(sftp, LOCAL_DIST, REMOTE_BASE)
    sftp.close()

    # Set correct permissions
    print("Setting permissions...")
    ssh.exec_command(f"chown -R www-data:www-data {REMOTE_BASE} 2>/dev/null || true")
    ssh.exec_command(f"chmod -R 755 {REMOTE_BASE}")

    # Test nginx config and reload
    print("Reloading nginx...")
    _, stdout, stderr = ssh.exec_command("nginx -t 2>&1 && systemctl reload nginx && echo NGINX_OK")
    result = stdout.read().decode() + stderr.read().decode()
    if "NGINX_OK" in result or "successful" in result:
        print("Nginx reloaded successfully.")
    else:
        print(f"Nginx output: {result}")
        print("NOTE: You may need to reload nginx manually: systemctl reload nginx")

    ssh.close()
    print("\nDeployment complete! Visit https://srpailabs.com")

if __name__ == "__main__":
    main()
