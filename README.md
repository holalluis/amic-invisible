
# AMIC INVISIBLE
Generador combinacions amic invisible.

Genera un shell script que envia els mails fent servir mutt/neomutt.

## Requeriments
- node (per generar les combinacions)
- mutt / neomutt (per enviar els mails)

## Instruccions

Descarrega:

```bash
git clone https://github.com/holalluis/amic-invisible.git
cd amic-invisible
```

Executa (en una sola línia):

```bash
  node combinacions.js | bash
```

O bé, genera el shell script, per poder inspeccionar-lo (recomanat):

```bash
  node combinacions.js > envia_mails.sh
  bash envia_mails.sh
```
