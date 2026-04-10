import paramiko

NGINX_CONF = r"""
server {
    listen 80;
    server_name srpailabs.com www.srpailabs.com
                autonomous.srpailabs.com app.srpailabs.com
                mediflow.srpailabs.com recruit.srpailabs.com
                growth.srpailabs.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name srpailabs.com www.srpailabs.com;

    ssl_certificate     /etc/letsencrypt/live/srpailabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/srpailabs.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/srpailabs/dist;
    index index.html;

    # HTML - NEVER cache so new deploys take effect immediately
    location / {
        add_header Cache-Control "no-cache, no-store, must-revalidate" always;
        add_header Pragma "no-cache" always;
        add_header Expires "0" always;
        try_files $uri $uri/ /index.html;
    }

    # Hashed assets - cache forever (hash changes on rebuild)
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        try_files $uri =404;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    if ($host = www.srpailabs.com) {
        return 301 https://srpailabs.com$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name autonomous.srpailabs.com;
    ssl_certificate     /etc/letsencrypt/live/srpailabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/srpailabs.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 443 ssl http2;
    server_name app.srpailabs.com;
    ssl_certificate     /etc/letsencrypt/live/srpailabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/srpailabs.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 443 ssl http2;
    server_name mediflow.srpailabs.com;
    ssl_certificate     /etc/letsencrypt/live/srpailabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/srpailabs.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 443 ssl http2;
    server_name recruit.srpailabs.com;
    ssl_certificate     /etc/letsencrypt/live/srpailabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/srpailabs.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://127.0.0.1:3004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 443 ssl http2;
    server_name growth.srpailabs.com;
    ssl_certificate     /etc/letsencrypt/live/srpailabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/srpailabs.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;
    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
"""

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('5.223.67.236', 22, 'root', '856Reey@nsh', timeout=30)
print("Connected")

# Upload nginx config
sftp = ssh.open_sftp()
with sftp.open('/etc/nginx/sites-available/srpailabs.conf', 'w') as f:
    f.write(NGINX_CONF)
sftp.close()
print("Nginx config uploaded")

# Test config
_, o, e = ssh.exec_command('nginx -t 2>&1')
result = o.read().decode() + e.read().decode()
print("nginx -t:", result)

if 'successful' in result:
    # Restart nginx
    _, o, e = ssh.exec_command('systemctl restart nginx')
    o.read()
    e.read()
    print("Nginx restarted")
    
    # Touch index.html
    ssh.exec_command('touch /var/www/srpailabs/dist/index.html')
    
    # Verify response headers
    _, o, _ = ssh.exec_command('curl -sI https://srpailabs.com')
    print("\nResponse headers:")
    print(o.read().decode())
else:
    print("ERROR: nginx config test failed!")

ssh.close()
