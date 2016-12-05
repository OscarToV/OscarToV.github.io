window.addEventListener("load",function(){

	var institutos = $('listaInstitutos');
	var divBotones = $('botones');

	institutos.addEventListener("change",function(){

		var listaValor = institutos.value;
		var listaProfesores = e("select",{"id":"profesores"});
		var defecto = e("option",{"value":"0","selected":"selected"},"Selecciona uno...");
		listaProfesores.appendChild(defecto);

		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

	            var jsonResponse = xmlhttp.responseText;
	            var objeto_json = JSON.parse(jsonResponse).filter(function(data){
					return data.instituto_id == listaValor});

	            for (var i = 0; i < objeto_json.length;i++) {

	                var id_prof  = objeto_json[i].id;
	                var nombre   = objeto_json[i].nombres;

	                item = e("option",{"value":id_prof,"on-click":(evt)=>{ muestraInformacion(evt.target.value)}},nombre);
	                listaProfesores.appendChild(item);
	            }

	        }
        }
        xmlhttp.open("GET","profesor.json");
        xmlhttp.send();

		divBotones.appendChild(listaProfesores);

		if(divBotones.children.length>4)
                divBotones.removeChild(divBotones.children[3]);
	});

});

function muestraInformacion(key){
	var gradoArray =["Na","Licenciatura","Maestria","Doctorado"];
    var estados =["Na","Activo","Licencia","Sabatico"];

    var linfo = e("ol",{"id":"linfo"});
    var cajaDatos = $('cajaInterna');

    cajaDatos.appendChild(linfo);

    var xmlhttp=new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var jsonResponse = xmlhttp.responseText;
                var datos = JSON.parse(jsonResponse).filter(function(data){
																 return data.id == key;
															});
								
                var nombre    = e("li",{"id":"nombre"},"Nombre: "+datos[0].nombres);
                var apellidos = e("li",{"id":"apellidos"},"Apellidos: "+datos[0].apellidos);
                var carrera = e("li",{"id":"carrera"},"Carrera: "+obtieneCarrera(datos[0].carrera_id));
                var grado = e("li",{"id":"grado"},"Grado: "+gradoArray[datos[0].grado]);
                var correo = e("li",{"id":"correo"},"Correo: "+datos[0].correo);
                var estado = e("li",{"id":"estado"},"Estado: "+estados[datos[0].activo]);
                linfo.appendChild(nombre);
                linfo.appendChild(apellidos);
                linfo.appendChild(carrera);
                linfo.appendChild(grado);
                linfo.appendChild(correo);
                linfo.appendChild(estado);

                if(cajaDatos.children.length>1)
                  cajaDatos.removeChild(cajaDatos.children[0]);
                }

            }
        xmlhttp.open("GET","profesor.json");
        xmlhttp.send();
}

//obtiene un elemento mediante su id
function $(id){
    var r = null;
    if(typeof id =="array") r = id.map($);

    else r = document.getElementById(id);
    return r;
}

//crea un elemento, añade atributos y eventos
function e(tag){
	var ele = document.createElement(tag);
	if(arguments.length > 1 ){
        var seg = arguments[1];
        var pri=1;
	    if(!(seg instanceof HTMLElement) &&(typeof seg=="object")){
	        for(attr in seg){
	            var p = attr.substr(0,3);
	            if(p!="on-"){
	                ele.setAttribute(attr,seg[attr]);
	            }
	            else{
	                var ev = attr.substr(3);
	                ele.addEventListener(ev,seg[attr]);
	              }
	            var pri=2;
	        }
	        for(var i = pri;i<arguments.length;i++){
	            var e1 = arguments[i];
	            if(e1 instanceof HTMLElement){
	                ele.appendChild(e1);
	            }
	            else if(typeof e1 == "string"){
	                var nel = document.createTextNode(e1);
	                ele.appendChild(nel);
	            }
	            else{
	                console.warn("Tipo no reconocido",e1);
	                throw "Tipo de argumento no reconocido";
	            }

	        }
			return ele;

		}
	}
}

function obtieneCarrera(key){
	switch(key){
		case 2: return "Computación";
		case 4: return "Electrónica";
		case 5: return "Mecatronica";
		case 6: return "Matematicas Aplicadas";
		case 7: return "Fisica Aplicada";
		case 8: return "Diseño";
		case 9: return "Empresariales";
		case 10: return "Alimentos";
		case 11: return "Industrial";
	}
}
