// Pentru IPV6 
// https://community.helpsystems.com/forums/intermapper/miscellaneous-topics/5acc4fcf-fa83-e511-80cf-0050568460e4?_ga=2.113564423.1432958022.1523882681-2146416484.1523557976
let regex = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
var prefi;
var adress; // adresa ip input
var full_adress; // toata adresa ip
var first_adress = "", last_adress = "";

function main() {
    maxLengthCheck(prefix);
    prefi = document.getElementById("prefix").value;
    if (validare_ipv6()) {
        process_adress();
    }
}

function process_adress() {
    // eliminam primul sau ultimul ":" din adresa
    adress = adress.replace(/^:|:$/g, '');
    var ipv6 = adress.split(':');
    // avem adresa impartita in octeti
    for (var i = 0; i < ipv6.length; i++) {
        var hex = ipv6[i];
        if (hex != "") {
            ipv6[i] = hex;
        }
        else {
            hex = [];
            for (var j = ipv6.length; j <= 8; j++) {
                hex.push('0000');
            }
            ipv6[i] = hex.join('.');
        }
    }
    let sm = "";
    let inverse_mask = "";
    let c = 1;
    for (i = 0; i <= 127; i++) {
        if (i < prefi) {
            sm += "1";
            inverse_mask += "0";
        }
        else {
            sm += "0";
            inverse_mask += "1";
        }

        if (c == 16 && i != 127) {
            c = 0;
            sm += ".";
            inverse_mask += ".";
        }
        c++;
    }

    sm = sm.split(".");
    inverse_mask = inverse_mask.split(".");
    for (i = 0; i < 8; i++) {
        sm[i] = parseInt(sm[i], 2).toString(10);
        inverse_mask[i] = parseInt(inverse_mask[i], 2).toString(10);
    }

    full_adress = ipv6.join('.'); // adresa completa ipv6
    ipv6 = full_adress.split(".");
    first_adress = "";
    last_adress = "";
    for (i = 0; i < 8; i++) {
        let el1 = hex_to_dec(ipv6[i]);
        let el2 = parseInt(sm[i]);
        let el = el1 & el2;
        let last = el1 | parseInt(inverse_mask[i]);
        if (i != 7) {
            first_adress += el.toString(16).padStart(4, "0") + ".";
            last_adress += last.toString(16).padStart(4, "0") + ".";
        }
        else {
            first_adress += el.toString(16).padStart(4, "0");
            last_adress += last.toString(16).padStart(4, "0");
        }
    }
    document.getElementById("fAdr").value = first_adress;
    document.getElementById("lAdr").value = last_adress;
}

function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, 3)
    if (object.value > 127)
        object.value = 127;
    else if (object.value < 1)
        object.value = 1;
}

function hex_to_dec(hex) {
    return (parseInt(hex, 16).toString(10));
}

function dec_to_hex(number) {
    var hexa = parseInt(number, 10).toString(16);
    return hexa;
}

function validare_ipv6() {
    adress = document.getElementById("ipv6_inp").value;
    let rez = regex.test(adress);
    if (rez && prefi >= 1 && prefi <= 127) {
        document.getElementById("valid_ipv6").innerHTML = "Valid";
        document.getElementById("valid_ipv6").style.backgroundColor = "lime";
        act_CIDR();
    }
    else {
        document.getElementById("valid_ipv6").innerHTML = "Invalid";
        document.getElementById("valid_ipv6").style.backgroundColor = "red";
    }
    return rez;
}