/* 

mongorestore --db people --verbose "C:\Users\mati\Documents\mongo-mapreduce-1\BBDD\people.bson" // DESDE FUERA DE MONGO y descomprimir archivo zip hasta extraer una BBDD de 1GB


// 2. Generar por map-reduce una colección de personas (campo name) y su puntuación (campo points) */

var map = function() {
  emit(this.name, { age: this.points, count: 1 });
};

var reduce = function(keys, values) {
  var reduced = {
    points: 0
  };

  for (var i = 0; i < values.length; i++) {
    reduced.points += 1;
  }
  return reduced;
};


db.people.mapReduce(map,reduce,{out:‘map_reduce_result’});
