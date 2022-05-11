ucitajPodatke=(podaci)=>{
    document.getElementById("spoljni").innerHTML="";
    for(let i=0;i<podaci.length;i++)
    {
        let div=document.createElement("div");
        div.setAttribute("class","unutrasnji")
        document.getElementById("spoljni").appendChild(div);
        let IDproizvoda=document.createElement("h4");
        div.appendChild(IDproizvoda);
        IDproizvoda.innerHTML=podaci[i].proizvodID;
        let naziv=document.createElement("h4");
        div.appendChild(naziv);
        naziv.innerHTML=podaci[i].naziv;
        let cijenaPoKvadratu=document.createElement("td");
        div.appendChild(cijenaPoKvadratu);
        cijenaPoKvadratu.innerHTML=podaci[i].cijenaPoKvadratu;
        let slikaUrl=document.createElement("img");
        slikaUrl.setAttribute("src",podaci[i].slikaUrl);
        slikaUrl.setAttribute("width","200");
        slikaUrl.setAttribute("height","150");
        div.appendChild(slikaUrl);
        let naruci=document.createElement("button");
        naruci.setAttribute("onclick","naruci("+podaci[i].proizvodID+")");
        naruci.innerHTML="Naruci";
        div.appendChild(naruci);
    }
}

podaci=()=>{
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll')
      .then(
        (response) =>{
          if (response.status !== 200) {
            console.log('Geska: ' +
              response.status);
            return;
          }
          response.json().then((pod)=> {
            console.log(pod);
                    ucitajPodatke(pod);
          });
        }
      )
      .catch((error) =>{
        console.log('Greška:', error);
      });
}

naruci=(IDnarudzbe)=>{
	document.getElementById("proizID").value=IDnarudzbe;
}

posaljiNarudzbu=()=>{
    let ime = document.getElementById("ime").value;
    let prezime = document.getElementById("prezime").value;
    let adresa = document.getElementById("adresa").value;
    let proizvodID = document.getElementById("proizID").value;
    let komada = document.getElementById("komada").value;
    let mail = document.getElementById("email").value;
    
    let Narudžba = {
        ime: ime,
        prezime: prezime,
        adresa: adresa,
        IDproivoda: proizvodID,
        komada: komada,
        email: mail
    };

    console.log(Narudžba);
}

budgetSave=()=>{
    fetch('http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll')
      .then(
        (response) =>{
          if (response.status !== 200) {
            console.log('Geska: ' +
              response.status);
            return;
          }
          response.json().then((pod)=> {
            console.log(pod);
                    pornadjiMin(pod);
          });
        }
      )
      .catch((error) =>{
        console.log('Greška:', error);
      });
}

pornadjiMin=(podaci)=>{
    var pozicija = 0;
    var minimum = 10000.0;
    for(let i=0;i<podaci.length;i++)
    {
        if (minimum > podaci[i].cijenaPoKvadratu){
            pozicija = i;
            minimum = podaci[i].cijenaPoKvadratu;
        }
    }
    alert("Najjeftiniji proizvod je "+ podaci[pozicija].naziv+" sa cijenom od "+ minimum+" KM po kvadratu");
}