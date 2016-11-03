<?php
  $titulo       = $_POST['titulo'];
  $intro        = $_POST['introduccion'];
  $s1           = $_POST['subtitulo1'];
  $p1           = $_POST['parrafo1'];
  $s2           = $_POST['subtitulo2'];
  $p2           = $_POST['parrafo2'];
  $s3           = $_POST['subtitulo3'];
  $p3           = $_POST['parrafo3'];
  $s4           = $_POST['subtitulo4'];
  $p4           = $_POST['parrafo4'];
  $s5           = $_POST['subtitulo5'];
  $p5           = $_POST['parrafo5'];
  $ri1          =$_POST['ri1'];
  $ri2          =$_POST['ri2'];
  $ri3          =$_POST['ri3'];
  $ri4          =$_POST['ri4'];
  $ri5          =$_POST['ri5'];

  $cad= "<html>
    <head>
      <title>$titulo</title>
      <meta charset= \"utf-8\">
      <link rel=\"stylesheet\" href=\"../estilo.css\" type=\"text/css\">
   </head>
   <body>
     <div id = \"banner\"></div>
     <nav>
          <ul>
               <li><a title=\"Opcion 1\" href=\"#\">Inicio</a></li>
               <li><a title=\"Opcion 2\" href=\"#\">Colaborar</a></li>
               <li><a title=\"Opcion 3\" href=\"../formulario/form.html\">Crear contenido</a></li>
               <li><a title=\"Opcion 4\" href=\"#\">Favoritos</a></li>
               <li><a title=\"Opcion 4\" href=\"#\">Ayuda</a></li>
               <li><a title=\"Opcion 5\" href=\"#\">Contacto</a></li>
           </ul>
      </nav>


     <div id =\"contenido\">
       <h1>$titulo</h1>
       <p>$intro</p>

       <h2>$s1</h2>
       <img src=\"$ri1\">
       <p>$p1</p>

       <h2>$s2</h2>
       <img src=\"$ri2\">
       <p>$p2</p>

      <h2>$s3</h2>
      <img src=\"$ri3\">
      <p>$p3</p>

      <h2>$s4</h2>
      <img src=\"$ri4\">
      <p>$p4</p>

      <h2>$s5</h2>
      <img src=\"$ri5\">
      <p>$p5</p>
    </div>
    <div id=\"pie\">
      <br>Oscar Torres Velasco 702
      <br>Programación Web 2016
    </div>
   </body>
  </html>";

  echo $cad;
  $nombre = "../generados/".$titulo.".html";
  $archivo=fopen($nombre,"w+");
  fputs($archivo,$cad);
?>
