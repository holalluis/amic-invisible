/*
 * TITES I TETES SOFTWARE
 * ALGORITME PER EVITAR REPETICIONS AMIC INVISIBLE
 * genera un shell script que envia els mails fent servir mutt/neomutt
*/

//llista participants pròxim amic invisible
let participants=[
  "aina",
  "alba",
  "chris",
  "lluís",
  "jaume",
  "màrius",
  "núria",
  "paton",
  "queralt",
  "sandra",
  "rut",
  "àlex",
];

//mails participants
let mails={
  "aina"     : "ainapr@gmail.com",
  "alba"     : "albatorrents1@gmail.com",
  "chris"    : "christopher.a.millan@gmail.com",
  "jaume"    : "jmadaula@gmail.com",
  "lluís"    : "holalluis@gmail.com",
  "màrius"   : "mariustomas@gmail.com",
  "núria"    : "ncasas9@gmail.com",
  "paton"    : "jantonz@gmail.com",
  "queralt"  : "queralt.vallmajo@gmail.com",
  "rut"      : "rut.freixas@gmail.com",
  "sandra"   : "ssegurabayona@gmail.com",
  "àlex"     : "alexmasppcc@gmail.com",
};

//amics anys anteriors: penalitza combinacions
let amics_anteriors={
  "aina"     : ['rut',      'alba',     'paton'],
  "alba"     : ['rosa',     'rut',      'laura'],
  "chris"    : ['xavi'],
  "jaume"    : [            ],
  "lluís"    : ['àlex',     'laura',    'queralt'],
  "màrius"   : ['paton',    'chris',    'àlex'],
  "núria"    : ['rut',      'àlex',     'lluís'],
  "paton"    : ['lluís',    'alba'],
  "queralt"  : ['sandra',   'lluís'],
  "rut"      : ['alba',     'queralt',  'núria'],
  "sandra"   : ['queralt',  'lluís',    'núria'],
  "àlex"     : ['sandra',   'frans',    'màrius',    'lluís'],
};

//algoritme yates barrejar array
function barreja(arr){
  for(let i=arr.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
  }

  let nou_array=[];
  arr.forEach(nom=>nou_array.push(nom));
  return nou_array;
}

//genera combinacions tenint en compte amics anteriors
function genera_combinacions(){
  let amics        = barreja(participants);
  let receptors    = barreja(participants);
  let repeticions  = 0; //nombre de repeticions anys anteriors
  let combinacions = []; //resultat final va aquí dins

  //bucle infinit fins que hi ha un resultat vàlid
  //(nota: vàlid vol dir que amic no sigui receptor)
  while(true){
    let amic     = amics[0];
    let receptor = receptors[0];

    if(amic==receptor){
      if(amics.length==1){
        //torna a començar: per molt que barregis només hi ha un receptor
        return genera_combinacions();
      }else{
        //si queden receptors, barreja de nou
        //console.log({receptors}); //veure receptors abans de barrejar
        receptors=barreja(receptors);
        //console.log({receptors}); //veure receptors després de barrejar
        continue;
      }
    }

    //penalitza repeticions anys passats
    if(amics_anteriors[amic].indexOf(receptor)+1){
      repeticions++;
    }

    //guarda la combinació
    let combinacio = [amic, receptor];

    //elimina de la llista els afectats
    amics.shift();
    receptors.shift();

    //afegeix la combinació al resultat
    combinacions.push(combinacio);

    //si ja no queden amics, acaba
    if(amics.length==0) break;
  }

  //retorna el resultat generat
  return {combinacions, repeticions};
}

//genera resultats minimitzant repeticions
function troba_resultat(){
  //valors inicials variables
  let minim          = Infinity; //mínim repetcions trobat (número)
  let resultat_bo    = null;     //resultat bo (array combinacions)
  let iteracions     = 0;        //iteracinos fetes (número)
  let max_iteracions = 1e6;      //max iteracions (número)

  //bucle minimitzant repeticions
  while(true){
    iteracions++; //incrementa comptador iteracions

    //genera un nou resultat
    let resultat    = genera_combinacions(); //array
    let repeticions = resultat.repeticions;  //número

    //actualitza resultat en cas de minimitzar repeticions
    if(repeticions < minim){
      minim       = repeticions; //actualitza mínim trobat de repeticions
      resultat_bo = resultat;    //actualitza resultat bo
    }

    //condicions de sortida:
    //1. no repeticions
    if(repeticions==0) break;
    //2. max iteracions fetes
    if(iteracions>max_iteracions) break;
  }

  //final
  console.log(`# Resultat bo (trobat en ${iteracions} iteracions)`);
  console.log(`# Repeticions: ${minim}`);

  //mostra resultat bo trobat
  resultat_bo.combinacions.forEach(([amic,receptor])=>{
    //console.log(`${amic}\t--> ${receptor}`);
    //genera un mail per enviar amb mutt
    console.log(`echo "hola ${amic}, li fas el regal a --> ${receptor}" | mutt ${mails[amic]} -s "Amic invisible 2019 tites i tetes"`);
  });
}

troba_resultat();
