
export function dateFormater(date){
    var partes = date.split(" ");
    var fecha = partes[0];
    var partesFecha = fecha.split("-");
    var mes = partesFecha[1];
    var dia = partesFecha[2];
    return (dia+"/"+mes);
}