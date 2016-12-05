window.addEventListener("load",function(){
	var opciones = $('opciones');

	opciones.addEventListener("change", function(){
		var listaValor = opciones.value;
		var divBotones = $('botones');
		var listaAnios = e("select",{"id":"años"},e("option",{"value":"0"},"Selecciona uno..."),e("option",{"value":"2015"},"2015"),e("option",{"value":"2016"},"2016"),
							e("option",{"value":"2017"},"2017"));
    var pagina = e("select",{"id":"pag"},e("option",{"value":"1"},"Página 1"),e("option",{"value":"2"},"Página 2"),
										e("option",{"value":"3"},"Página 3"));
		if(listaValor==2){

			divBotones.appendChild(listaAnios);


			$('años').addEventListener("change",function(){
				divBotones.appendChild(pagina);


					var etiquetas1 = ["Computacion", "Electronica", "Mecatronica", "Matematicas", "Fisica", "Diseño", "Empresariales","Alimentos","Industrial","M. computo A.","D. Computo A.","M. Medios I."];
					var etiquetas2 = ["M. Administracion","M. Manufactura","M. Sistemas D.","M. Electronica","M. Robotica","M. Alimentos","M. Matematica","D. Electronica","D. Matematica","D. Robotica",
													"M. Software","M. Diseño Muebles"];
					var etiquetas3 = ["M. Diseño Moda","M. Ciencia materiales","Mecanica","M.V Computacion","L. Estudios M.","L. Informatica","Agronomia","L. Administracion"];

					var etiqueta = "Alumnos";
					var texto = "Alumnos Por Año";

					var xmlhttp=new XMLHttpRequest();
					var arrayAlumnos=[];

					for(var h=0; h<32;h++)
							arrayAlumnos[h]=0;

					var objeto_json;
					xmlhttp.onreadystatechange = function() {
							var arrayId =[2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,28,29,30,31,32,33,34,35,36,37];
							var anio =$('años').value;
							 if (xmlhttp.readyState==4 && xmlhttp.status==200) {
									var jsonResponse = xmlhttp.responseText;
									objeto_json = JSON.parse(jsonResponse);

									for (var i=0; i<arrayAlumnos.length;i++){
											var carrera = arrayId[i];
											var grupos = objeto_json.filter(function(data){
																			 return (data.carrera_id == carrera && data.anio == anio);
																		});
											for(var j=0; j<grupos.length;j++){
													arrayAlumnos[i] += grupos[j].alumnos;
											}
											arrayAlumnos[i]/=2;
									}
									var paginaValor = $('pag').value;
									if(paginaValor==1){
										var temp = [];
										for(var i=0; i<12; i++) {
											temp[i] = arrayAlumnos[i];
										}
										grafica(temp,etiquetas1,etiqueta,texto);
									}

									$('pag').addEventListener("change",function(){

										var paginaValor = $('pag').value;

										if(paginaValor==1){
											var temp = [];
											for(var i=0; i<12; i++) {
												temp[i] = arrayAlumnos[i];
											}
											grafica(temp,etiquetas1,etiqueta,texto);
										}

										if(paginaValor==2){
											var temp = [];
											for(var i=0; i<12; i++) {
												temp[i] = arrayAlumnos[i+12];
											}
											grafica(temp,etiquetas2,etiqueta,texto);
										}

										if(paginaValor==3){
											var temp = [];
											for(var i=0; i<8; i++) {
												temp[i] = arrayAlumnos[i+24];
											}
											grafica(temp,etiquetas3,etiqueta,texto);
										}
									});


							}
					}
									xmlhttp.open("GET","grupos.json");
									xmlhttp.send();

				});

		}
		else if(listaValor==1){
			var etiquetas = ["Computacion", "Mecatronica", "Ciencias Sociales", "Agroindustrias", "Diseño", "F Y M",
					 "Hidrologia","Míneria","Posgrado","Industrial","Idiomas","Uni. Virtual","Nova"];
			var etiqueta = "Profesores";
			var texto = "Profesores Por Instituto";
			if(divBotones.children.length>3) {divBotones.removeChild(divBotones.children[3]);divBotones.removeChild(divBotones.children[3]);}
			var xmlhttp = new XMLHttpRequest();
			var arrayIns=[0,0,0,0,0,0,0,0,0,0,0,0,0];
			var objeto_json;
			xmlhttp.onreadystatechange = function() {
					var arrayId=[2,14,15,16,17,18,19,20,21,23,24,25,26];

					 if (xmlhttp.readyState==4 && xmlhttp.status==200) {
							var jsonResponse = xmlhttp.responseText;
							objeto_json = JSON.parse(jsonResponse);

							for (var i=0; i<arrayIns.length;i++){
									var insId = arrayId[i];
									arrayIns[i] = objeto_json.filter(function(data){
																	 return data.instituto_id == insId;
																}).length;
							}
							grafica(arrayIns,etiquetas,etiqueta,texto);
					}
			}
							xmlhttp.open("GET","profesor.json");
							xmlhttp.send();
		}
	});
});


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

//Funcion para graficar
function grafica(arreg, etiquetas, etiqueta, texto){

			 var color = Chart.helpers.color;
			 if(window.myHorizontalBar!=null) myHorizontalBar.destroy();

			 var horizontalBarChartData = {
						labels: etiquetas,
						datasets: [{
								label: etiqueta,
								backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
								borderColor: window.chartColors.blue,
								borderWidth: 1,
								data:arreg
						}]

				};
	 		  var ctx = document.getElementById("canvas").getContext("2d");
			  window.myHorizontalBar = new Chart(ctx, {
					type: 'horizontalBar',
					data: horizontalBarChartData,
					options: {

							elements: {
									rectangle: {
											borderWidth: 2,
									}
							},
							responsive: true,
							legend: {
									position: 'right',
							},
							title: {
									display: true,
									text: texto
							}
					}
			});

	}
