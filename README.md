# StellarWave-BackEnd
Proyecto final parte backend curso node.js Jeareth Venegas y María José*

Proyecto consitio en el desarrollo de un api donde se pueda crear, obtener, editar y 
eliminar listas de musica y usuarios para un reproductor de musica tiene las siguientes funcionalidades:

Playlist:
  Agregar nuevas canciones al playlist
  Editar los playlist
  Devolver todos los playlist que existen
  Devolver las canciones por playlist
  Borrar canciones del playlist
  Borrar un playlist completo

Favoritos:
  Agregar nuevas canciones a favoritos
  Devolver las canciones de favoritos
  Borrar canciones de favoritos

Reciente:
  Se agregan las canciones conforme se reproduzcan a la lista de recién reproducidos.
  Se devuelven todas las canciones recién reproducidas.

Usuarios:
  Cuando se crea la cuenta se debe almacenar el nombre, el email y la contraseña.
  Devolver el nombre para que sea visible en la pestaña de perfil.
  El usuario estará en la capacidad de editar el nombre
  Cuando alguien se loguea a la aplicación se debe comparar la contraseña contra la que existe en la base de datos

Endpoints fueron desarrollados en Node.js y el motor de base de datos mongoDB


Posteriormente fue subido a heroku
Link: https://stellarwaves.herokuapp.com/
