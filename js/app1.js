var ip;

// octeti input adresa IP
var oct1 = 192,
    oct2 = 168,
    oct3 = 1,
    oct4 = 1;

// octeti input subnetmask
var smo1 = 255,
    smo2 = 255,
    smo3 = 255,
    smo4 = 0;

// octeti binari subnetmask
var binsm1, binsm2, binsm3, binsm4;

// octeti masca wildcard
var opus1 = 0,
    opus2 = 0,
    opus3 = 0,
    opus4 = 255;

// octeti network adress
var na1, na2, na3, na4;

// octeti broadcast adress
var bad1, bad2, bad3, bad4;

// TODO variabile pt afisare 
var network_adress = "";
var wildmask = "";


// TODO de inlocuit cu functie forma binara => forma zecimala
// schimba octetii de input subnet mask in functie de CIRD selectat
function changeSM() {
    smo1 = 0; smo2 = 0; smo3 = 0; smo4 = 0;
    let e = document.getElementById("CIDR");
    let val = e.options[e.selectedIndex].value;
    val = Number(val);
    switch (val) {
        case 1: smo1 = 128; break;
        case 2: smo1 = 192; break;
        case 3: smo1 = 224; break;
        case 4: smo1 = 240; break;
        case 5: smo1 = 248; break;
        case 6: smo1 = 252; break;
        case 7: smo1 = 254; break;
        case 8: smo1 = 255; break;
        case 9: smo1 = 255; smo2 = 128; break;
        case 10: smo1 = 255; smo2 = 192; break;
        case 11: smo1 = 255; smo2 = 224; break;
        case 12: smo1 = 255; smo2 = 240; break;
        case 13: smo1 = 255; smo2 = 248; break;
        case 14: smo1 = 255; smo2 = 252; break;
        case 15: smo1 = 255; smo2 = 254; break;
        case 16: smo1 = 255; smo2 = 255; break;
        case 17: smo1 = 255; smo2 = 255; smo3 = 128; break;
        case 18: smo1 = 255; smo2 = 255; smo3 = 192; break;
        case 19: smo1 = 255; smo2 = 255; smo3 = 224; break;
        case 20: smo1 = 255; smo2 = 255; smo3 = 240; break;
        case 21: smo1 = 255; smo2 = 255; smo3 = 248; break;
        case 22: smo1 = 255; smo2 = 255; smo3 = 252; break;
        case 23: smo1 = 255; smo2 = 255; smo3 = 254; break;
        case 24: smo1 = 255; smo2 = 255; smo3 = 255; break;
        case 25: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 128; break;
        case 26: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 192; break;
        case 27: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 224; break;
        case 28: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 240; break;
        case 29: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 248; break;
        case 30: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 252; break;
        case 31: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 254; break;
        case 32: smo1 = 255; smo2 = 255; smo3 = 255; smo4 = 255; break;
    }
    subnetmaskDone(); // apel output subnetmask
    subnetmask_HTML(); // schimb input subnetmask
    nr_adrese(); // calculul de aderse
    document.getElementById("CIDR").value = val;
}

// schimba valoarea de input subnetmask
function subnetmask_HTML() {
    document.getElementById("sm1").value = smo1;
    document.getElementById("sm2").value = smo2;
    document.getElementById("sm3").value = smo3;
    document.getElementById("sm4").value = smo4;
}

// schimba varianta selectata CIDR in functie de subnetmask-ul introdus
function subnet_to_CIDR(smo1, smo2, smo3, smo4) {
    let contor = 0;
    let arr = [smo1, smo2, smo3, smo4];
    for (i = 0; i < 4; i++) {
        switch (arr[i]) {
            case 255: contor += 8; break;
            case 254: contor += 7; break;
            case 252: contor += 6; break;
            case 248: contor += 5; break;
            case 240: contor += 4; break;
            case 224: contor += 3; break;
            case 192: contor += 2; break;
            case 128: contor += 1; break;
        }
    }
    return contor;
}

// actualizare optiune selectata in functie de subnetmask-ul introdus
function act_CIDR() {
    document.getElementById("CIDR").value = subnet_to_CIDR(smo1,smo2,smo3,smo4);
}

// functia principala, formeaza adresa IP
// si apeleaza functiile pentru subneting
function formIPAddress() {
    ip = "";
    ip = ip.concat(oct1, ".", oct2, ".", oct3, ".", oct4);
    document.getElementById("oup").value = ip; // afisare adresa ip introdusa
    ip_to_binary();
    subnetmaskDone(); 
    validate_SM();
    classFind();
    findNetAdress();
    findWildmask();
    implictit_SM();
}

// calculeaza valoarea binara a adresei ip introduse
function ip_to_binary(){
    let binoct1 = binary(oct1);
    let binoct2 = binary(oct2);
    let binoct3 = binary(oct3);
    let binoct4 = binary(oct4);
    let bip = "";
    bip = bip.concat(binoct1, ".", binoct2, ".", binoct3, ".", binoct4);
    document.getElementById("bin").value = bip;
}

// gaseste adresa de broadcast
function findBroadmask() {
    bad1 = oct1 | opus1;
    bad2 = oct2 | opus2;
    bad3 = oct3 | opus3;
    bad4 = oct4 | opus4;
    bad_adr = "";
    bad_adr = bad_adr.concat(bad1, ".", bad2, ".", bad3, ".", bad4);
    document.getElementById("Adr_br").value = bad_adr;
    findLastAdress();
}

// calculeaza numarul total de adrese cu ajutorul notatiei CIDR
function nr_adrese(){
    let nr = 2**(32-subnet_to_CIDR(smo1,smo2,smo3,smo4));
    document.getElementById("Nrt_a").value = nr;
    nr_gazde(nr);
}

// calculeaza nr total de gazde cu ajutorul numarului total de adrese
function nr_gazde(nr){  
    let n = nr-2;
    if(n<0)
        n = 0;
    document.getElementById("Nrt_ga").value = n;
}

// formeaza subnetmask-ul si valoarea binara a acesteia
function subnetmaskDone() {
    smak = "";
    smak = smak.concat(smo1, ".", smo2, ".", smo3, ".", smo4);
    document.getElementById("MS").value = smak;
    binsm1 = binary(smo1);
    binsm2 = binary(smo2);
    binsm3 = binary(smo3);
    binsm4 = binary(smo4);
    let sm_bin = "";
    sm_bin = sm_bin.concat(binsm1, ".", binsm2, ".", binsm3, ".", binsm4);
    document.getElementById("bin_ms").value = sm_bin;
}

// calculeaza masca de subretea implicita in functie de clasa adresei IP
// clasele D ei E nu detin o astfel de masca
function implictit_SM() {
    if (document.getElementById("CAIP").value == "A")
        document.getElementById("MsI").value = "255.0.0.0"
    else if (document.getElementById("CAIP").value == "B")
        document.getElementById("MsI").value = "255.255.0.0"
    else if (document.getElementById("CAIP").value == "C")
        document.getElementById("MsI").value = "255.255.255.0"
    else if (document.getElementById("CAIP").value == "D")
        document.getElementById("MsI").value = "N/A"
    else if (document.getElementById("CAIP").value == "E")
        document.getElementById("MsI").value = "N/A"
}

// calculeaza masca wildcard
function findWildmask() {
    opus1 = padLeft(255 - smo1);
    opus2 = padLeft(255 - smo2);
    opus3 = padLeft(255 - smo3);
    opus4 = padLeft(255 - smo4);
    wildmask = "";
    wildmask = wildmask.concat(opus1, ".", opus2, ".", opus3, ".", opus4);
    document.getElementById("Mw").value = wildmask;
    findBroadmask(); // apel calcul adresa broadcast
}

// calculeaza prima adresa din retea
function findFirstAdress() {
    var fad1 = na1;
    var fad2 = na2;
    var fad3 = na3;
    var fad4 = Number(na4) + 1;
    Fadress = "";
    Fadress = Fadress.concat(fad1, ".", fad2, ".", fad3, ".", fad4);
    document.getElementById("Adr_pga").value = Fadress;
}

// calculeaza ultima adresa din retea
function findLastAdress() {
    var Lad1 = bad1;
    var Lad2 = bad2;
    var Lad3 = bad3;
    var Lad4 = Number(bad4) - 1;
    Ladress = "";
    Ladress = Ladress.concat(Lad1, ".", Lad2, ".", Lad3, ".", Lad4);
    document.getElementById("Adr_uga").value = Ladress;
}

// calculeaza adresa retelei
function findNetAdress() {
    na1 = oct1 & smo1;
    na2 = oct2 & smo2;
    na3 = oct3 & smo3;
    na4 = oct4 & smo4;
    network_adress = "";
    network_adress = network_adress.concat(na1).concat(".").concat(na2).concat(".").concat(na3).concat(".").concat(na4);
    document.getElementById("Adr_nw").value = network_adress;
    findFirstAdress();
}

// urmeaza functii de procesare a campurilor de input, care asigura ca datele introduse sunt intre 0-255
// si faptul ca fiecare camp are o valoare diferita de NULL
function octet1() {
    maxLengthCheck(inp1);
    oct1 = document.getElementById("inp1").value;
    if (oct1 == "") oct1 = "192";
    oct1 = Number(oct1);
    formIPAddress();
}

function octet2() {
    maxLengthCheck(inp2);
    oct2 = document.getElementById("inp2").value;
    if (oct2 == "") oct2 = "168";
    oct2 = Number(oct2);
    formIPAddress();
}

function octet3() {
    maxLengthCheck(inp3);
    oct3 = document.getElementById("inp3").value;
    if (oct3 == "") oct3 = "1";
    oct3 = Number(oct3);
    formIPAddress();
}

function octet4() {
    maxLengthCheck(inp4);
    oct4 = document.getElementById("inp4").value;
    if (oct4 == "") oct4 = "1";
    oct4 = Number(oct4);
    formIPAddress();
}

function sub_m1() {
    maxLengthCheck(sm1);
    smo1 = document.getElementById("sm1").value;
    if (smo1 == "") smo1 = "128";
    document.getElementById("sm1").value = smo1;
    smo1 = Number(smo1);
    formIPAddress();
}

function sub_m2() {
    maxLengthCheck(sm2);
    smo2 = document.getElementById("sm2").value;
    if (smo2 == "") smo2 = "0";
    document.getElementById("sm2").value = smo2;
    smo2 = Number(smo2);
    formIPAddress();
}

function sub_m3() {
    maxLengthCheck(sm3);
    smo3 = document.getElementById("sm3").value;
    if (smo3 == "") smo3 = "0";
    document.getElementById("sm3").value = smo3;
    smo3 = Number(smo3);
    formIPAddress();
}

function sub_m4() {
    maxLengthCheck(sm4);
    smo4 = document.getElementById("sm4").value;
    if (smo4 == "") smo4 = "0";
    document.getElementById("sm4").value = smo4;
    smo4 = Number(smo4);
    formIPAddress();
}

// 
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, 3)
    if (object.value > 255)
        object.value = 255;
    else if (object.value < 0)
        object.value = 0;
}

// functie de validare masca de subretea, foloseste o expresie regulara pentru a valida subnet mask-ul
// am gasit-o pe internet https://stackoverflow.com/questions/5360768/regular-expression-for-subnet-masking/51148542#51148542
function validate_SM() {
    var s = smak;
    var smrgex = /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/;
    var res = smrgex.test(s);
    if (res) {
        document.getElementById("VSM").innerHTML = "Valid";
        document.getElementById("VSM").style.backgroundColor = "greenyellow";
        act_CIDR();
    }
    else {
        document.getElementById("VSM").innerHTML = "Invalid";
        document.getElementById("VSM").style.backgroundColor = "red";
    }
}

// returneaza valoarea binara a valorii x 
function binary(x) {
    y = "";
    y = padLeft(x.toString(2));
    return y;
}

// adauga 0-uri la stanga, pentru afisarea valoriilor binare, pentru umplerea octetiilor
function padLeft(x) {
    while (x.length < 8) {
        x = "0" + x;
    }
    return x;
}

function classFind() {
    if (oct1 >= 0 && oct1 <= 127) {
        document.getElementById("CAIP").value = "A";
    } else if (oct1 >= 128 && oct1 <= 191) {
        document.getElementById("CAIP").value = "B";

    } else if (oct1 >= 192 && oct1 <= 223) {
        document.getElementById("CAIP").value = "C";
    } else if (oct1 >= 224 && oct1 <= 239) {
        document.getElementById("CAIP").value = "D";
    } else if (oct1 >= 240 && oct1 <= 255)
        document.getElementById("CAIP").value = "E";

    if (oct1 >= 10 && oct1 < 11)
        document.getElementById("tAd").value = "IP privat";
    else if (oct1 == 172 && oct2 >= 16 && oct2 < 32)
        document.getElementById("tAd").value = "IP privat";
    else if (oct1 == 192 && oct2 == 168)
        document.getElementById("tAd").value = "IP privat";
    else document.getElementById("tAd").value = "IP public";
}


// Pentru IPV6 
let ipv6_regex = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm;

function hex_to_binary(){
    
}

function binary_to_hex(){
    var hexa = parseInt(number, 2).toString(16).toUpperCase();
}

function valideare_ipv6(){

}