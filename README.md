
# AMIC INVISIBLE
Generador combinacions amic invisible que té en compte els anys anteriors, per
no repetir receptors.

## Què fa?
Genera un shell script que envia els mails amb les combinacions generades, fent
servir mutt/neomutt.

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

O bé, en dues línies: primer genera el shell script, per poder inspeccionar-lo
(recomanat), i després executa'l:

```bash
node combinacions.js > envia.sh
bash envia.sh
```
