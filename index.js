/* 

mongorestore --db people --verbose "C:\Users\mati\Documents\mongo-mapreduce-1\BBDD\people.bson" // DESDE FUERA DE MONGO y descomprimir archivo zip hasta extraer una BBDD de 1GB


// 2. Generar por map-reduce una colección de personas (campo name) y su puntuación (campo points) */

const map = function() {
  emit(this.name, this.points);
};

var reduce = function(keys, values) {
  return Array.sum(values);
}



//3. Comprobar el resultado sobre la nueva colección

db.people.mapReduce(map,reduce,{out:"map_reduce_result"});


// 4. Generar el mismo resultado mediante una función aggregate

db.people.aggregate(
  {
      $group:
      {_id:'$name',
          totalPoints:{$sum:'$points'}
         
      }
    });



    // EJERCICIO PELÍCULAS : mongoimport --db movies --collection movies --drop --file "C:\Users\mati\Documents\mongo-mapreduce-1\movieDetails.json" --port 27017