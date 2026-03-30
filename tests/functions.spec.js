// =============================================================================
// Tests — Mini LAB | Map, Filter & Reduce — Avanzado
// =============================================================================

// =============================================================================
// ITERACION 1 — Operaciones basicas con arrays
// =============================================================================

describe("Iteracion 1 — Operaciones basicas con arrays", function () {

  // ---------------------------------------------------------------------------
  // chunk
  // ---------------------------------------------------------------------------
  describe("chunk(array, size)", function () {
    it("deberia dividir un array en sub-arrays del tamaño indicado", function () {
      expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    it("deberia incluir el ultimo grupo aunque tenga menos elementos", function () {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4, 5], 3)).toEqual([[1, 2, 3], [4, 5]]);
    });

    it("deberia devolver un array vacio si recibe un array vacio", function () {
      expect(chunk([], 3)).toEqual([]);
    });

    it("deberia manejar tamaño igual o mayor que la longitud del array", function () {
      expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
      expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    });
  });

  // ---------------------------------------------------------------------------
  // zip
  // ---------------------------------------------------------------------------
  describe("zip(arr1, arr2)", function () {
    it("deberia combinar dos arrays del mismo tamaño en pares", function () {
      expect(zip(["a", "b", "c"], [1, 2, 3])).toEqual([["a", 1], ["b", 2], ["c", 3]]);
    });

    it("deberia usar la longitud del array mas corto", function () {
      expect(zip([1, 2], ["x", "y", "z"])).toEqual([[1, "x"], [2, "y"]]);
      expect(zip([1, 2, 3, 4], ["a", "b"])).toEqual([[1, "a"], [2, "b"]]);
    });

    it("deberia devolver un array vacio si alguno de los arrays esta vacio", function () {
      expect(zip([], [1, 2, 3])).toEqual([]);
      expect(zip([1, 2], [])).toEqual([]);
    });
  });

  // ---------------------------------------------------------------------------
  // intersection
  // ---------------------------------------------------------------------------
  describe("intersection(arr1, arr2)", function () {
    it("deberia devolver los elementos comunes entre dos arrays", function () {
      expect(intersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
    });

    it("deberia eliminar duplicados del resultado", function () {
      expect(intersection([1, 1, 2, 2, 3], [2, 2, 3, 3, 4])).toEqual([2, 3]);
    });

    it("deberia devolver un array vacio si no hay elementos comunes", function () {
      expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([]);
    });

    it("deberia devolver un array vacio si alguno de los arrays esta vacio", function () {
      expect(intersection([], [1, 2, 3])).toEqual([]);
      expect(intersection([1, 2, 3], [])).toEqual([]);
    });
  });
});

// =============================================================================
// ITERACION 2 — Conteo y extraccion
// =============================================================================

describe("Iteracion 2 — Conteo y extraccion", function () {

  // ---------------------------------------------------------------------------
  // frequencies
  // ---------------------------------------------------------------------------
  describe("frequencies(array)", function () {
    it("deberia contar las ocurrencias y ordenar por count descendente", function () {
      var result = frequencies(["js", "py", "js", "go", "js", "py"]);
      expect(result).toEqual([
        { value: "js", count: 3 },
        { value: "py", count: 2 },
        { value: "go", count: 1 }
      ]);
    });

    it("deberia funcionar con un solo elemento", function () {
      expect(frequencies(["hola"])).toEqual([{ value: "hola", count: 1 }]);
    });

    it("deberia devolver un array vacio si recibe un array vacio", function () {
      expect(frequencies([])).toEqual([]);
    });

    it("deberia funcionar con numeros", function () {
      var result = frequencies([3, 1, 3, 3, 2, 1]);
      expect(result).toEqual([
        { value: 3, count: 3 },
        { value: 1, count: 2 },
        { value: 2, count: 1 }
      ]);
    });
  });

  // ---------------------------------------------------------------------------
  // pluck
  // ---------------------------------------------------------------------------
  describe("pluck(array, path)", function () {
    it("deberia extraer valores con una propiedad simple", function () {
      var data = [{ a: 1 }, { a: 2 }, { a: 3 }];
      expect(pluck(data, "a")).toEqual([1, 2, 3]);
    });

    it("deberia extraer valores con dot notation anidada", function () {
      var data = [
        { user: { name: "Ana" } },
        { user: { name: "Luis" } },
        { user: { name: "Maria" } }
      ];
      expect(pluck(data, "user.name")).toEqual(["Ana", "Luis", "Maria"]);
    });

    it("deberia devolver undefined para propiedades que no existen", function () {
      var data = [{ a: 1 }, { b: 2 }, { a: 3 }];
      expect(pluck(data, "a")).toEqual([1, undefined, 3]);
    });

    it("deberia devolver un array vacio si recibe un array vacio", function () {
      expect(pluck([], "a")).toEqual([]);
    });
  });

  // ---------------------------------------------------------------------------
  // mapValues
  // ---------------------------------------------------------------------------
  describe("mapValues(obj, fn)", function () {
    it("deberia aplicar la funcion a cada valor del objeto", function () {
      expect(mapValues({ a: 1, b: 2, c: 3 }, function (x) { return x * 10; }))
        .toEqual({ a: 10, b: 20, c: 30 });
    });

    it("deberia funcionar con strings", function () {
      expect(mapValues({ name: "ana", city: "madrid" }, function (s) { return s.toUpperCase(); }))
        .toEqual({ name: "ANA", city: "MADRID" });
    });

    it("deberia devolver un objeto vacio si recibe un objeto vacio", function () {
      expect(mapValues({}, function (x) { return x * 2; })).toEqual({});
    });
  });
});

// =============================================================================
// ITERACION 3 — Transformaciones
// =============================================================================

describe("Iteracion 3 — Transformaciones", function () {

  // ---------------------------------------------------------------------------
  // transformKeys
  // ---------------------------------------------------------------------------
  describe("transformKeys(obj, fn)", function () {
    it("deberia transformar las claves con la funcion dada", function () {
      var result = transformKeys(
        { firstName: "Ana", lastName: "Garcia" },
        function (key) { return key.toLowerCase(); }
      );
      expect(result).toEqual({ firstname: "Ana", lastname: "Garcia" });
    });

    it("deberia funcionar con una funcion que agrega prefijo", function () {
      var result = transformKeys(
        { name: "Ana", age: 25 },
        function (key) { return "user_" + key; }
      );
      expect(result).toEqual({ user_name: "Ana", user_age: 25 });
    });

    it("deberia devolver un objeto vacio si recibe un objeto vacio", function () {
      expect(transformKeys({}, function (k) { return k; })).toEqual({});
    });
  });

  // ---------------------------------------------------------------------------
  // getStatistics
  // ---------------------------------------------------------------------------
  describe("getStatistics(numbers)", function () {
    it("deberia calcular min, max, sum, average y count correctamente", function () {
      expect(getStatistics([2, 4, 6, 8, 10])).toEqual({
        min: 2,
        max: 10,
        sum: 30,
        average: 6,
        count: 5
      });
    });

    it("deberia funcionar con un solo numero", function () {
      expect(getStatistics([42])).toEqual({
        min: 42,
        max: 42,
        sum: 42,
        average: 42,
        count: 1
      });
    });

    it("deberia funcionar con numeros negativos", function () {
      expect(getStatistics([-5, -1, 0, 3, 8])).toEqual({
        min: -5,
        max: 8,
        sum: 5,
        average: 1,
        count: 5
      });
    });

    it("deberia funcionar con decimales", function () {
      var result = getStatistics([1.5, 2.5, 3.0]);
      expect(result.min).toBe(1.5);
      expect(result.max).toBe(3.0);
      expect(result.sum).toBe(7);
      expect(result.average).toBeCloseTo(2.333, 2);
      expect(result.count).toBe(3);
    });
  });

  // ---------------------------------------------------------------------------
  // partitionBy
  // ---------------------------------------------------------------------------
  describe("partitionBy(array, fn)", function () {
    it("deberia separar pares e impares correctamente", function () {
      expect(partitionBy([1, 2, 3, 4, 5, 6], function (n) { return n % 2 === 0; }))
        .toEqual([[2, 4, 6], [1, 3, 5]]);
    });

    it("deberia poner todos en el primer array si todos cumplen la condicion", function () {
      expect(partitionBy([2, 4, 6], function (n) { return n % 2 === 0; }))
        .toEqual([[2, 4, 6], []]);
    });

    it("deberia poner todos en el segundo array si ninguno cumple", function () {
      expect(partitionBy([1, 3, 5], function (n) { return n % 2 === 0; }))
        .toEqual([[], [1, 3, 5]]);
    });

    it("deberia devolver dos arrays vacios si recibe un array vacio", function () {
      expect(partitionBy([], function (n) { return n > 0; })).toEqual([[], []]);
    });
  });
});

// =============================================================================
// ITERACION 4 — Agrupacion y estructuras
// =============================================================================

describe("Iteracion 4 — Agrupacion y estructuras", function () {

  // ---------------------------------------------------------------------------
  // groupBy
  // ---------------------------------------------------------------------------
  describe("groupBy(array, key)", function () {
    it("deberia agrupar objetos por la propiedad indicada", function () {
      var data = [
        { type: "fruta", name: "manzana" },
        { type: "verdura", name: "zanahoria" },
        { type: "fruta", name: "pera" }
      ];
      expect(groupBy(data, "type")).toEqual({
        fruta: [
          { type: "fruta", name: "manzana" },
          { type: "fruta", name: "pera" }
        ],
        verdura: [
          { type: "verdura", name: "zanahoria" }
        ]
      });
    });

    it("deberia funcionar cuando todos los elementos tienen el mismo valor", function () {
      var data = [
        { role: "admin", name: "Ana" },
        { role: "admin", name: "Luis" }
      ];
      expect(groupBy(data, "role")).toEqual({
        admin: [
          { role: "admin", name: "Ana" },
          { role: "admin", name: "Luis" }
        ]
      });
    });

    it("deberia devolver un objeto vacio si recibe un array vacio", function () {
      expect(groupBy([], "type")).toEqual({});
    });
  });

  // ---------------------------------------------------------------------------
  // buildLookupTable
  // ---------------------------------------------------------------------------
  describe("buildLookupTable(array, key)", function () {
    it("deberia crear un objeto indexado por la propiedad dada", function () {
      var data = [
        { id: 1, name: "Ana" },
        { id: 2, name: "Luis" }
      ];
      expect(buildLookupTable(data, "id")).toEqual({
        1: { id: 1, name: "Ana" },
        2: { id: 2, name: "Luis" }
      });
    });

    it("deberia funcionar con claves de tipo string", function () {
      var data = [
        { code: "ES", country: "Spain" },
        { code: "FR", country: "France" }
      ];
      expect(buildLookupTable(data, "code")).toEqual({
        ES: { code: "ES", country: "Spain" },
        FR: { code: "FR", country: "France" }
      });
    });

    it("deberia devolver un objeto vacio si recibe un array vacio", function () {
      expect(buildLookupTable([], "id")).toEqual({});
    });
  });

  // ---------------------------------------------------------------------------
  // pivot
  // ---------------------------------------------------------------------------
  describe("pivot(array)", function () {
    it("deberia transformar un array de objetos en un objeto de arrays", function () {
      var data = [
        { name: "Ana", age: 25 },
        { name: "Luis", age: 30 }
      ];
      expect(pivot(data)).toEqual({
        name: ["Ana", "Luis"],
        age: [25, 30]
      });
    });

    it("deberia funcionar con mas de dos propiedades", function () {
      var data = [
        { x: 1, y: 2, z: 3 },
        { x: 4, y: 5, z: 6 },
        { x: 7, y: 8, z: 9 }
      ];
      expect(pivot(data)).toEqual({
        x: [1, 4, 7],
        y: [2, 5, 8],
        z: [3, 6, 9]
      });
    });

    it("deberia devolver un objeto vacio si recibe un array vacio", function () {
      expect(pivot([])).toEqual({});
    });

    it("deberia funcionar con un solo objeto", function () {
      expect(pivot([{ a: 1, b: 2 }])).toEqual({ a: [1], b: [2] });
    });
  });
});

// =============================================================================
// ITERACION 5 — Avanzado (combinando metodos)
// =============================================================================

describe("Iteracion 5 — Avanzado (combinando metodos)", function () {

  // ---------------------------------------------------------------------------
  // flatMap
  // ---------------------------------------------------------------------------
  describe("flatMap(array, fn)", function () {
    it("deberia aplicar la funcion y aplanar el resultado un nivel", function () {
      var result = flatMap([[1, 2], [3, 4]], function (arr) {
        return arr.map(function (n) { return n * 2; });
      });
      expect(result).toEqual([2, 4, 6, 8]);
    });

    it("deberia funcionar con strings (split)", function () {
      var result = flatMap(["hola mundo", "foo bar"], function (s) {
        return s.split(" ");
      });
      expect(result).toEqual(["hola", "mundo", "foo", "bar"]);
    });

    it("deberia devolver un array vacio si recibe un array vacio", function () {
      expect(flatMap([], function (x) { return [x]; })).toEqual([]);
    });

    it("deberia manejar funciones que devuelven arrays de distinto tamaño", function () {
      var result = flatMap([1, 2, 3], function (n) {
        return Array(n).fill(n);
      });
      expect(result).toEqual([1, 2, 2, 3, 3, 3]);
    });
  });

  // ---------------------------------------------------------------------------
  // topN
  // ---------------------------------------------------------------------------
  describe("topN(array, key, n)", function () {
    it("deberia devolver los N objetos con mayor valor, ordenados desc", function () {
      var data = [
        { name: "A", score: 80 },
        { name: "B", score: 95 },
        { name: "C", score: 70 }
      ];
      expect(topN(data, "score", 2)).toEqual([
        { name: "B", score: 95 },
        { name: "A", score: 80 }
      ]);
    });

    it("deberia devolver todos si N es mayor o igual que la longitud del array", function () {
      var data = [
        { name: "X", val: 10 },
        { name: "Y", val: 20 }
      ];
      expect(topN(data, "val", 5)).toEqual([
        { name: "Y", val: 20 },
        { name: "X", val: 10 }
      ]);
    });

    it("deberia devolver un array vacio si recibe un array vacio", function () {
      expect(topN([], "score", 3)).toEqual([]);
    });

    it("deberia funcionar con un dataset mas grande", function () {
      var students = [
        { name: "Ana", grade: 85 },
        { name: "Luis", grade: 92 },
        { name: "Maria", grade: 78 },
        { name: "Carlos", grade: 95 },
        { name: "Elena", grade: 88 }
      ];
      expect(topN(students, "grade", 3)).toEqual([
        { name: "Carlos", grade: 95 },
        { name: "Luis", grade: 92 },
        { name: "Elena", grade: 88 }
      ]);
    });
  });

  // ---------------------------------------------------------------------------
  // summarizeBy
  // ---------------------------------------------------------------------------
  describe("summarizeBy(array, groupKey, valueKey)", function () {
    it("deberia agrupar y sumar correctamente", function () {
      var data = [
        { seller: "Ana", amount: 100 },
        { seller: "Luis", amount: 200 },
        { seller: "Ana", amount: 150 }
      ];
      expect(summarizeBy(data, "seller", "amount")).toEqual({
        Ana: 250,
        Luis: 200
      });
    });

    it("deberia funcionar con un solo elemento por grupo", function () {
      var data = [
        { dept: "IT", hours: 40 },
        { dept: "HR", hours: 35 },
        { dept: "Sales", hours: 45 }
      ];
      expect(summarizeBy(data, "dept", "hours")).toEqual({
        IT: 40,
        HR: 35,
        Sales: 45
      });
    });

    it("deberia devolver un objeto vacio si recibe un array vacio", function () {
      expect(summarizeBy([], "key", "val")).toEqual({});
    });

    it("deberia funcionar con multiples elementos por grupo", function () {
      var data = [
        { category: "A", value: 10 },
        { category: "B", value: 20 },
        { category: "A", value: 30 },
        { category: "B", value: 40 },
        { category: "A", value: 50 }
      ];
      expect(summarizeBy(data, "category", "value")).toEqual({
        A: 90,
        B: 60
      });
    });
  });
});
