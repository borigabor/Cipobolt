let day = "";
let month = "";


function getDate() {

    if ((new Date().getMonth() + 1) < 10) {
        month = `0${new Date().getMonth() + 1}`;
    } else {
        month = new Date().getMonth() + 1;
    }
    
    
    if (new Date().getDate() < 10) {
        day = `0${new Date().getDate()}`;
    } else {
        day = new Date().getDate();
    }
}

getDate();


/*Generáljunk 6 véletlen dátumot az aktuális, vagy az előző hónapból!*/

function generateDate () {

    const honap = new Date().getMonth() + 1;
    const datumTomb = [];
    let datumHtmlTemplate = '';

    for (let i = 0; i < 6; i++) {
        let datumHonap = Math.floor(Math.random() * (honap - (honap - 2)) + 1) + (honap - 2);
        let datumNap = Math.floor(Math.random() * 28) + 1;

        if (datumHonap < 10) { 
            datumHonap = `0${datumHonap}`;
        }
        if (datumNap < 10) {
            datumNap = `0${datumNap}`;
        }

        datumTomb.push(`${datumHonap}.${datumNap}`);
    }

    for (let date of datumTomb) {
        datumHtmlTemplate += `
            <li style="padding: 2px; background-color: yellow; display: inline-block;">${date}<li>
        `;
    }

    document.getElementById("honapok").innerHTML = datumHtmlTemplate;

    return datumTomb;

}

//a, Mikor volt az eddigi utolsó beszállítás?


function rendezNovekvo (tomb) {

    let temp = 0;
    for (let i = tomb.length; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            if (tomb[j] > tomb[j + 1]) {
                temp = tomb[j];
                tomb[j] = tomb[j + 1];
                tomb[j + 1] = temp;
            }
        }
    }

    return tomb[tomb.length - 1];
}


let datumok = generateDate();

document.getElementById("a-1").innerHTML = `Az utolsó beszálítás ${rendezNovekvo(datumok)} volt!`;

//b, Volt-e már beszállítás ebben a hónapban?


function eldontes(tomb) {

    
    let besszalitas = false;

    const honapokTomb = tomb.map(datum => {
        let honap = datum.split(".");
        return honap[0];
    })

    console.log(month);
    console.log(honapokTomb);

    for (let i = 0; i < honapokTomb.length; i++) {
        if (honapokTomb[i] === month) {
            besszalitas = true;
            break;
        }
    }
    
    return besszalitas;

}

    if (eldontes(datumok)) {
        document.getElementById("b-1").innerHTML = `Volt besszalitás ebben a hónapban!`;
    } else {
        document.getElementById("b-1").innerHTML = "Ebben a hónapban nem volt besszállítás!";
    }




    // c, Hány beszállítás van még előre jelezve?

    function megszamolas(tomb) {

        let db = 0;

        for (let i = 0; i < tomb.length; i++) {
            if (`${month}.${day}` < tomb[i]) {
                db++;
            }
        }

        return db;

    }

    document.getElementById("c-1").innerHTML = `Ebben a hónapban még ${megszamolas(datumok)}db besszálítás várható!`;

    //d, Volt-e, vagy lesz-e több beszállítás egyazon napon?

    function kereses(tomb) {

        let datum = "";
        
        for (let i = 0; i < tomb.length; i++) {
            if (tomb[i] === tomb[i + 1]) {
                datum = tomb[i];
            } 
        }

        return datum;
    }


    if (kereses(datumok) !== "") {
        document.getElementById("d-1").innerHTML = `Volt vagy lesz besszálítás ugyanazon a napon ${kereses(datumok)} dátum-mal!`;
    } else {
        document.getElementById("d-1").innerHTML = `Nem volt és nem is lessz beszálítás ugyanazon a napon! `;
    }


    /*------------------------------------------------------------------------------------------------------------*/

    /*------------------------------------------------------------------------------------------------------------*/


    // Generáljon 12-12 véletlen cipőméretet, és külön tömbben tárolja el őket! F[ ] tömbben a férfi (38-46 méret­tarto­mány­ban), N[ ] tömbben a női cipőket (35-42 méret­tarto­mány­ban)!


    function cipoMeretek() {
        const F = [];
        const N = [];
        const cipok = 12;


        for (let i = 0; i < cipok; i++) {
            F.push(Math.floor(Math.random() * (46 - (38 )) + 1) + 38);
        }

        for (let i = 0; i < cipok; i++) {
            N.push(Math.floor(Math.random() * (42 - (35 )) + 1) + 35);
        }


        return {F, N};
    }


   const ferfiMeretek = cipoMeretek().F;
   const noiMeretek = cipoMeretek().N;
    const meretekTomb = [...ferfiMeretek, ...noiMeretek];

   console.log(`Férfi cipő méretek ${ferfiMeretek}`);
   console.log(`Női cipő méretek ${noiMeretek}`);
   console.log(`Összes cipő méret ${meretekTomb}`);


    // Mekkora a rendelt legnagyobb női cipő?

    function maximum(tomb) {

        let max = 0;

        for (let meret of tomb) {
            if (meret > max) {
                max = meret;
            }
        }

        return max;
    }

document.getElementById("a-2").innerHTML = `${maximum(noiMeretek)} a megrendelt legnagyobb női cipőméret!`;


// Mennyi a férfi és a női cipők méretének átlagának különbsége?


function kulombseg(tombF, tombN) {
    const initialValue = 0;
const osszFerfiMeret = tombF.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

const osszNoiMeret = tombN.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue, 
);


return Math.floor((osszFerfiMeret / tombF.length) - (osszNoiMeret / tombN.length));

}


document.getElementById("b-2").innerHTML = `A férfi és női cipők méretének átlagának külömbsége: ${kulombseg(ferfiMeretek, noiMeretek)}`;


// A női cipők hány százalék 40-es méret feletti?

function szazlekSzamitas(tomb) {
    let db = 0;
    tomb.forEach(meret => {
        if (meret > 40) {
            db++;
        }
    });

    return Math.floor((db / tomb.length) * 100);
}


document.getElementById("c-2").innerHTML = `A női cipők ${szazlekSzamitas(noiMeretek)}% 40-es méret feletti!`;


function legtobbMeret(tomb) {

    let db = 0;
    let max = 0;
    let meret = tomb[0];

    tomb.sort((a, b) => a - b);

    for (let i = 0; i < tomb.length; i++) {
        if (tomb[i] === tomb[i + 1]) {
            db++;
        } else {
            db = 0;
        }

        if (db > max) {
            max = db;
            meret = tomb[i];
        }
    }
    
    return meret;

}


document.getElementById("d-2").innerHTML = `${legtobbMeret(meretekTomb)} méretből fogyott a legtöbb!`;

    /*------------------------------------------------------------------------------------------------------------*/

    /*------------------------------------------------------------------------------------------------------------*/

    //Generáljunk rendelési időpontokat, ügyelve rá, hogy azok időrendben sorban legyenek! Két rendelési időpont között min. 1 perc, max. 3 óra legyen a különbség.

    const hours = [];
    const minutes = [];


    function rendelesiIndopontok() {

        let ido = 0;
        const idopontok = [];

        while (ido < 1440) {

            ido += Math.floor(Math.random() * 180) + 1;

            if (ido < 1440) {

            let ora = parseInt(ido / 60)
            let perc = ido % 60;

            hours.push(ora);
            minutes.push(ido);

            if (ora < 10) {
                ora = `0${ora}`;
            }

            if (perc < 10) {
                perc = `0${perc}`;
            }

            idopontok.push(`${ora}:${perc}`);
        }

        }

        return idopontok;
    }

    const idopontok = rendelesiIndopontok();

   function idopontKiir(tomb) {
    let idopontokTempleteHtml = "";

    for (let idopont of tomb) {
        idopontokTempleteHtml += `<li style="padding: 2px; background-color: yellow; display: inline-block; margin: 10px;">${idopont}</li>`;
    }

    document.getElementById("idopontok").innerHTML = idopontokTempleteHtml;
   }

   idopontKiir(idopontok);


   //Hányszor vásároltak dél és este 8 között?

   function vasarlasSzamol(tomb) {
    let db = 0;

    /*
    tomb.forEach( ora => {
        if (ora >= 12 && ora < 20) {
            db++;
        }
    })
        */

    const orak = tomb.map(ora => {
        let hour = ora.split(":");
        return parseInt(hour[0]);
    });

   orak.forEach( ora => {
    if (ora >= 12 && ora < 20) {
        db++;
    }
   })

   return db;

   }

document.getElementById("a-3").innerHTML = `Összesen ${vasarlasSzamol(idopontok)} vásároltak dél és este 8 között.`;

// Adtak-e le rendelést hajnali 3 és 4 óra között?


function rendelesVizsgal(tomb) {
    let rendeles = false;

    for (let i = 0; i < tomb.length; i++) {
        console.log(tomb[i].split(":")[0], tomb[i].split(":")[1]);
        if (parseInt(tomb[i].split(":")[0]) === 3 && parseInt(tomb[i].split(":")[1]) <= 59) {
            rendeles = true;
            break;
        }
    }

    return rendeles;
}

if (rendelesVizsgal(idopontok)) {
    document.getElementById("b-3").innerHTML = `Igen adtak le rendelést hajnali 3 és 4 óra között.`;
} else {
    document.getElementById("b-3").innerHTML = `Nem adtak le rendelést hajnali 3 és 4 óra között.`;
}


// Mikor volt az első délutáni vásárlás?

function delutaniVasarlas(tomb) {

    let idopont = "";

    tomb.sort((a, b) => a - b);

    for (let i = 0; i < tomb.length; i++) {
        if (parseInt(tomb[i].split(":")[0]) >= 12 && parseInt(tomb[i].split(":")[1]) >= 1) {
            idopont = tomb[i];
            break;
        }
    }

    return idopont;
}

document.getElementById("c-3").innerHTML = `${delutaniVasarlas(idopontok)} órakkor volt az első délutáni vásárlás!`;


//Átlagosan hány percenként érkezett rendelés?

function atlagosRendeles(tomb) {

    return Math.floor(tomb[tomb.length - 1] / tomb.length);

}


console.log(minutes);

document.getElementById("d-3").innerHTML = `Átlagosan ${parseInt(atlagosRendeles(minutes) / 60)} óra és ${atlagosRendeles(minutes) % 60} percenként érkezik rendelés.`;



    /*------------------------------------------------------------------------------------------------------------*/

    /*------------------------------------------------------------------------------------------------------------*/


    //Generáljunk vásárlási összegeket - annyi darabot, ahány vásárlás történt tegnap! Az összegek kialakításánál tartsuk szem előtt, hogy

    const multipleShoes = [];

    function arakatGeneral () {

        const rendelesSzam = 12;
        const arLista = [];
        let cipo_db = 0;

        for (let i = 0; i < rendelesSzam; i++) {

            let random = Math.random();

            if (random < 0.4) {
                cipo_db = 1;
            } else if (random < 0.7) {
                cipo_db = 2;
            } else if (random < 0.9) {
                cipo_db = 3;
            } else {
                cipo_db = 4;
            }

            multipleShoes.push(cipo_db);

            let ertek = 0;

            for (let j = 0; j < cipo_db; j++) {

                ertek += Math.floor(Math.random() * 20) * 1000 + 5990;

            }

            arLista.push(ertek);
            
        }

        return arLista;

    }


   

    function arakatKiir(arLista) {
        let arListaHtmlTemplate = "";

        for (let arak of arLista) {
            arListaHtmlTemplate += `
                <li style="padding: 2px; background-color: yellow; display: inline-block; margin: 10px;">${arak} Ft</li>
            `;
        }

        document.getElementById("arak").innerHTML = arListaHtmlTemplate;
    } 

    const arLista = arakatGeneral();
    arakatKiir(arLista);

    //Mennyi volt az átlagos kosárérték?

    function atlagKosarErtek(tomb) {

        let eredmeny = 0;

        const osszBevetel = tomb.reduce((accumlator, currentValue) => accumlator + currentValue, eredmeny);

        return parseInt(osszBevetel / tomb.length);
    }

    const atlagErtek = atlagKosarErtek(arLista);

    document.getElementById("a-4").innerHTML = `Az átlagos kosárérték ${atlagErtek} Ft volt.`;


   // Hányszorosa volt a legnagyobb kosárérték az átlagosnak?

    function legnagyobbKosarErtek(tomb) {
        let max = tomb[0];

        for (let i = 0; i < tomb.length; i++) {
            if (tomb[i] > max) {
                max = tomb[i];
            }
        }

        return max;
    } 

    const legnagyobbErtek = legnagyobbKosarErtek(arLista);

    function hanyszoros(max_ertek, atlag_ertek) {

        let db = 0;

        while (max_ertek >= atlag_ertek) {
            db++;
            atlag_ertek = atlag_ertek * db;
            
        }

        return db - 1;

    }


    document.getElementById("b-4").innerHTML = `${hanyszoros(legnagyobbErtek, atlagErtek)} szorosa volt az átlagnak`


    // Volt-e 50ezer forint feletti kosárérték?

    function osszegFelett(tomb) {

        let volt = false;

        tomb.forEach((ertek) => {
            if (ertek > 50000) {
                volt = true;
            }
        })

        return volt;
    }

    if (osszegFelett(arLista)) {
        document.getElementById("c-4").innerHTML = `Igen volt 50.000 Ft feletti vásárlás.`;
    } else {
        document.getElementById("c-4").innerHTML = `Nem volt  50.00 Ft feletti vásárlás.`;
    }

    //A rendelések hány százalékában vásároltak több pár cipőt is?

    function tobbCipoVasarlas(tomb) {
        let db = 0;
        tomb.forEach((cipo) => {
            if (cipo > 1) {
                db++;
            }
        });



        return parseInt((db / 12) * 100); 
    }


   console.log(multipleShoes);

    document.getElementById("d-4").innerHTML = `A rendelések ${tobbCipoVasarlas(multipleShoes)}% vásároltak több pár cipőt is.`;