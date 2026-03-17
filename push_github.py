import subprocess, os, sys

os.chdir(r'c:\Users\User\Desktop\srpailabs website\srpautomationlabs-main')

# Suppress CRLF warnings
r = subprocess.run(
    ['git', '-c', 'core.autocrlf=false', 'push', '-u', 'origin', 'main'],
    capture_output=True, text=True, env={**os.environ, 'GIT_TERMINAL_PROMPT': '0'}
)

# Write result to a clean file
with open(r'c:\Users\User\Desktop\push_result.txt', 'w') as f:
    f.write("STDOUT:\n" + r.stdout + "\n")
    f.write("STDERR:\n" + r.stderr + "\n")
    f.write("EXIT: " + str(r.returncode) + "\n")

print("RESULT WRITTEN")
print("EXIT:", r.returncode)
# Print last 300 chars of stderr to avoid buffer flood
if r.stderr:
    lines = [l for l in r.stderr.strip().split('\n') if 'LF will' not in l and 'warning: in the' not in l]
    print('\n'.join(lines[-20:]))
if r.stdout:
    print(r.stdout[-300:])
