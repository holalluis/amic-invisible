/*
 * TITES I TETES SOFTWARE
 * ALGORITME PER EVITAR REPETICIONS AMIC INVISIBLE
 * genera un shell script que envia els mails fent servir mutt/neomutt
*/

//llista participants pròxim amic invisible
//seria millor amb una classe--> new Participant(nom, mail, array_amics_anteriors) TODO
let participants=[
  "aina",
  "alba",
  "laura",
  "lluís",
  //"màrius",
  "núria",
  "paton",
  "queralt",
  "rosa",
  "rut",
  "sandra",
  "àlex",
];

//mails participants
let mails={
  "aina"     : "ainapr@gmail.com",
  "alba"     : "albatorrents1@gmail.com",
  "laura"    : "laurasoler24@gmail.com",
  "lluís"    : "holalluis@gmail.com",
  "màrius"   : "mariustomas@gmail.com",
  "núria"    : "ncasas9@gmail.com",
  "paton"    : "jantonz@gmail.com",
  "queralt"  : "queralt.vallmajo@gmail.com",
  "rosa"     : "riust.pascual@gmail.com",
  "rut"      : "rut.freixas@gmail.com",
  "sandra"   : "ssegurabayona@gmail.com",
  "àlex"     : "alexmasppcc@gmail.com",
  "jaume"    : "jmadaula@gmail.com",
  "chris"    : "christopher.a.millan@gmail.com",
};

//amics anys anteriors: penalitza combinacions
let amics_anteriors={
  "aina"   :[],
  "alba"   :[],
  "lluís"  :[],
  "núria"  :[],
  "paton"  :[],
  "queralt":[],
  "rut"    :[],
  "sandra" :[],
  "àlex"   :[],
  "laura"  :[],
  "rosa"   :[],
  "màrius" :[],
  "chris"  :[],
  "jaume"  :[],
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

  //el sistema falla si coincideixen els últims de les llistes
  if(amics[amics.length-1] == receptors[receptors.length-1]){
    return genera_combinacions();
  }

  //bucle infinit fins que hi ha un resultat vàlid
  //(nota: vàlid vol dir que amic no sigui receptor)
  while(true){
    let amic     = amics.shift();              //amic: agafa el primer de la llista
    let receptor = receptors.find(r=>r!=amic); //receptor: agafa el primer que trobis que no coincideixi amb l'amic

    if(amic     === undefined) throw "amic undefined: hi ha hagut algun error";
    if(receptor === undefined) throw "receptor undefined: hi ha hagut algun error";

    //actualitza llista receptors
    receptors = receptors.filter(r=>r!=receptor);

    //penalitza repeticions
    if(amics_anteriors[amic].indexOf(receptor)+1){
      repeticions++; //penalitza amb un punt
      //TODO pel futur, es podria penalitzar més els més recents
    }

    //afegeix la combinació al resultat
    combinacions.push([amic, receptor]);

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
  console.log(`# Amic invislbe amb ${participants.length} participants:`);
  console.log(`# Resultat bo (trobat en ${iteracions} iteracions)`);
  console.log(`# Repeticions: ${minim}`);

  //mostra resultat bo trobat
  resultat_bo.combinacions.forEach(([amic,receptor])=>{
    //console.log(`${amic}\t--> ${receptor}`);
    //genera un mail per enviar amb mutt
    console.log(`echo "hola ${amic}, li fas el regal a --> ${receptor}" | mutt ${mails[amic]} -s "Amic invisible 2021 tites i tetes"`);
  });
}

//executa programa
troba_resultat();
