
# AMIC INVISIBLE
Generador combinacions amic invisible.

Genera un shell script que envia els mails fent servir mutt/neomutt.

## Requeriments
- node (per generar les combinacions)
- mutt / neomutt (per enviar els mails)

## Instruccions

En una sola línia:

```bash
  node combinacions.js | bash
```

O bé, generant el shell script dels mails, per poder inspeccionar-lo:

```bash
  node combinacions.js > envia_mails.sh
  bash envia_mails.sh
```
