import os
from pathlib import Path

import paramiko


def load_env_file(project_root: Path) -> None:
    env_file = project_root / ".env"
    if not env_file.exists():
        return

    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        value = value.strip()
        if len(value) >= 2 and (
            (value[0] == '"' and value[-1] == '"')
            or (value[0] == "'" and value[-1] == "'")
        ):
            value = value[1:-1]
        os.environ.setdefault(key.strip(), value)


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    load_env_file(project_root)

    host = os.environ.get("DEPLOY_HOST", "").strip()
    if not host:
        raise SystemExit("DEPLOY_HOST missing")

    user = os.environ.get("DEPLOY_USER", "root")
    password = os.environ.get("DEPLOY_PASSWORD", "")
    port = int(os.environ.get("DEPLOY_PORT", "22"))

    local_conf = project_root / "nginx" / "srpailabs.conf"
    if not local_conf.exists():
        raise SystemExit(f"Missing nginx config at {local_conf}")

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    if password:
        ssh.connect(host, port=port, username=user, password=password, timeout=30)
    else:
        ssh.connect(host, port=port, username=user, timeout=30)

    sftp = ssh.open_sftp()
    sftp.put(str(local_conf), "/etc/nginx/sites-available/srpailabs.conf")
    sftp.close()

    cmd = (
        "ln -sf /etc/nginx/sites-available/srpailabs.conf /etc/nginx/sites-enabled/srpailabs.conf "
        "&& nginx -t && systemctl reload nginx && echo NGINX_OK"
    )
    _, stdout, stderr = ssh.exec_command(cmd)
    output = stdout.read().decode() + stderr.read().decode()
    ssh.close()
    print(output)


if __name__ == "__main__":
    main()
