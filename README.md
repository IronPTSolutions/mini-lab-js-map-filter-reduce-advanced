# Mini LAB | Map, Filter & Reduce — Avanzado

```
 _____________________________________
/ Este lab va a poner a prueba todo   \
| lo que sabes sobre map, filter y    |
\ reduce. Vamos alla!                /
 -------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Objetivos de aprendizaje

- Dominar los metodos `.map()`, `.filter()` y `.reduce()` en escenarios reales
- Trabajar con arrays de objetos y estructuras anidadas
- Combinar multiples metodos de array para resolver problemas complejos
- Manipular objetos usando `Object.keys()`, `Object.entries()` y `Object.fromEntries()`
- Implementar funciones utilitarias comunes en el desarrollo profesional

## Requisitos previos

- JavaScript basico: variables, funciones, condicionales, bucles
- Metodos de array: `.map()`, `.filter()`, `.reduce()`, `.sort()`, `.concat()`
- Objetos: acceso a propiedades, `Object.keys()`, `Object.entries()`
- Haber completado el Mini LAB | Map, Filter & Reduce (basico)

## Configuracion

1. Haz **fork** de este repositorio en tu cuenta de GitHub
2. **Clona** tu fork en tu maquina local
3. Abre el archivo `index.html` en el navegador para ver los tests de Jasmine
4. Edita el archivo `src/functions.js` para implementar las funciones

## Estructura de archivos

```
mini-lab-js-map-filter-reduce-advanced/
├── index.html              # SpecRunner de Jasmine (abrir en el navegador)
├── src/
│   └── functions.js        # Archivo donde escribiras tu codigo
├── tests/
│   └── functions.spec.js   # Tests automaticos (NO modificar)
└── README.md               # Este archivo
```

## Entrega

Al terminar, haz `git add`, `git commit` y `git push` de tu solucion. Crea un **Pull Request** de tu fork al repositorio original.

---

## Instrucciones

Abre `src/functions.js` y veras 15 funciones vacias organizadas en 5 iteraciones. Tu objetivo es implementarlas una por una hasta que **todos los tests pasen** (punto verde en Jasmine).

Refresca `index.html` en el navegador despues de cada cambio para ver tu progreso.

---

### Iteracion 1 — Operaciones basicas con arrays

En esta primera iteracion practicaras como **dividir**, **combinar** y **comparar** arrays. Son operaciones fundamentales que usaras constantemente.

#### 1.1 `chunk(array, size)`

Divide un array en sub-arrays de un tamaño dado. Si el ultimo grupo tiene menos elementos, se incluye tal cual.

```javascript
chunk([1, 2, 3, 4, 5], 2)
// → [[1, 2], [3, 4], [5]]
```

<details>
<summary>Pista</summary>

Usa `.reduce()`. En cada paso, comprueba si el ultimo sub-array ya tiene `size` elementos. Si es asi, crea uno nuevo. Si no, agrega el elemento al ultimo sub-array.

</details>

#### 1.2 `zip(arr1, arr2)`

Combina dos arrays en pares, elemento por elemento. Si tienen distinto tamaño, usa la longitud del mas corto.

```javascript
zip(["a", "b", "c"], [1, 2, 3])
// → [["a", 1], ["b", 2], ["c", 3]]
```

<details>
<summary>Pista</summary>

Usa `.map()` sobre uno de los arrays (el mas corto). En cada iteracion, devuelve un array con el elemento del primer array y el del segundo usando el indice.

</details>

#### 1.3 `intersection(arr1, arr2)`

Devuelve los elementos comunes entre dos arrays, sin duplicados.

```javascript
intersection([1, 2, 3, 4], [3, 4, 5, 6])
// → [3, 4]
```

<details>
<summary>Pista</summary>

Primero elimina duplicados (piensa en como crear un array con valores unicos). Luego usa `.filter()` para quedarte solo con los elementos que existen en ambos arrays.

</details>

---

### Iteracion 2 — Conteo y extraccion

Aqui trabajaras con **conteo de frecuencias**, **extraccion de datos** de objetos anidados y **transformacion de valores** en objetos.

#### 2.1 `frequencies(array)`

Cuenta las ocurrencias de cada elemento y devuelve un array de objetos `{ value, count }` ordenado por count de mayor a menor.

```javascript
frequencies(["js", "py", "js", "go", "js", "py"])
// → [{ value: "js", count: 3 }, { value: "py", count: 2 }, { value: "go", count: 1 }]
```

<details>
<summary>Pista</summary>

Usa `.reduce()` para construir un objeto con los conteos. Luego convierte ese objeto a un array con `Object.entries()` o `Object.keys()`, transforma cada entrada en `{ value, count }` con `.map()`, y finalmente ordena con `.sort()`.

</details>

#### 2.2 `pluck(array, path)`

Extrae valores de objetos usando dot notation (por ejemplo `"user.name"`) para acceder a propiedades anidadas.

```javascript
pluck([{ user: { name: "Ana" } }, { user: { name: "Luis" } }], "user.name")
// → ["Ana", "Luis"]
```

<details>
<summary>Pista</summary>

Divide el `path` con `.split(".")` para obtener las partes. Luego usa `.map()` sobre el array, y para cada objeto navega a traves de las partes con `.reduce()` (reduce sobre las partes del path, no sobre el array principal).

</details>

#### 2.3 `mapValues(obj, fn)`

Aplica una funcion a cada valor de un objeto y devuelve un nuevo objeto.

```javascript
mapValues({ a: 1, b: 2, c: 3 }, x => x * 10)
// → { a: 10, b: 20, c: 30 }
```

<details>
<summary>Pista</summary>

Usa `Object.entries()` para obtener pares `[clave, valor]`. Transforma los valores con `.map()` y reconstruye el objeto con `Object.fromEntries()` o con `.reduce()`.

</details>

---

### Iteracion 3 — Transformaciones

En esta iteracion crearemos funciones que **transforman claves**, **calculan estadisticas** y **particionan** datos.

#### 3.1 `transformKeys(obj, fn)`

Transforma las claves de un objeto aplicando una funcion.

```javascript
transformKeys({ firstName: "Ana", lastName: "Garcia" }, key => key.toLowerCase())
// → { firstname: "Ana", lastname: "Garcia" }
```

<details>
<summary>Pista</summary>

Muy similar a `mapValues`, pero esta vez transformas la clave en lugar del valor. Usa `Object.entries()`, aplica la funcion a cada clave con `.map()`, y reconstruye con `Object.fromEntries()`.

</details>

#### 3.2 `getStatistics(numbers)`

Recibe un array de numeros y devuelve un objeto con `min`, `max`, `sum`, `average` y `count`.

```javascript
getStatistics([2, 4, 6, 8, 10])
// → { min: 2, max: 10, sum: 30, average: 6, count: 5 }
```

<details>
<summary>Pista</summary>

Puedes calcular `sum` con `.reduce()`. Para `min` y `max` usa `Math.min()` y `Math.max()` con el spread operator (`...`). El `average` es `sum / count`.

</details>

#### 3.3 `partitionBy(array, fn)`

Divide un array en dos: los que cumplen la condicion y los que no.

```javascript
partitionBy([1, 2, 3, 4, 5, 6], n => n % 2 === 0)
// → [[2, 4, 6], [1, 3, 5]]
```

<details>
<summary>Pista</summary>

Usa `.reduce()` con un acumulador que sea un array de dos arrays: `[[], []]`. En cada paso, haz push al primer array si la condicion se cumple, y al segundo si no.

</details>

---

### Iteracion 4 — Agrupacion y estructuras

Estas funciones son muy comunes en el mundo real: **agrupar datos**, crear **tablas de busqueda** y **pivotar** estructuras.

#### 4.1 `groupBy(array, key)`

Agrupa objetos por el valor de una propiedad.

```javascript
groupBy(
  [
    { type: "fruta", name: "manzana" },
    { type: "verdura", name: "zanahoria" },
    { type: "fruta", name: "pera" }
  ],
  "type"
)
// → { fruta: [...], verdura: [...] }
```

<details>
<summary>Pista</summary>

Usa `.reduce()`. Para cada objeto, lee el valor de la propiedad `key`. Si esa clave no existe en el acumulador, creala como un array vacio. Luego haz push del objeto.

</details>

#### 4.2 `buildLookupTable(array, key)`

Crea un objeto donde cada clave es el valor de una propiedad del objeto original.

```javascript
buildLookupTable([{ id: 1, name: "Ana" }, { id: 2, name: "Luis" }], "id")
// → { 1: { id: 1, name: "Ana" }, 2: { id: 2, name: "Luis" } }
```

<details>
<summary>Pista</summary>

Usa `.reduce()`. Para cada objeto, usa `obj[key]` como la clave del acumulador y el objeto completo como valor.

</details>

#### 4.3 `pivot(array)`

Transforma un array de objetos en un objeto de arrays.

```javascript
pivot([{ name: "Ana", age: 25 }, { name: "Luis", age: 30 }])
// → { name: ["Ana", "Luis"], age: [25, 30] }
```

<details>
<summary>Pista</summary>

Usa `.reduce()`. Para cada objeto, itera sus claves con `Object.keys()`. Si la clave no existe en el acumulador, creala como array vacio. Luego haz push del valor.

</details>

---

### Iteracion 5 — Avanzado (combinando metodos)

La ultima iteracion combina todo lo aprendido. Cada funcion requiere usar **varios metodos de array** juntos.

#### 5.1 `flatMap(array, fn)`

Aplica una funcion a cada elemento y aplana el resultado un nivel.

```javascript
flatMap([[1, 2], [3, 4]], arr => arr.map(n => n * 2))
// → [2, 4, 6, 8]
```

<details>
<summary>Pista</summary>

Usa `.map(fn)` para aplicar la funcion, y luego `.reduce()` con `.concat()` para aplanar. Otra opcion: usa `.reduce()` directamente, concatenando el resultado de `fn(element)` en cada paso.

</details>

#### 5.2 `topN(array, key, n)`

Devuelve los N objetos con mayor valor en una propiedad, ordenados de mayor a menor.

```javascript
topN(
  [{ name: "A", score: 80 }, { name: "B", score: 95 }, { name: "C", score: 70 }],
  "score",
  2
)
// → [{ name: "B", score: 95 }, { name: "A", score: 80 }]
```

<details>
<summary>Pista</summary>

Primero ordena una copia del array con `.sort()` (recuerda: `.sort()` muta el array original, asi que haz una copia con `.slice()` o spread `[...array]`). Luego usa `.slice(0, n)` para obtener los primeros N.

</details>

#### 5.3 `summarizeBy(array, groupKey, valueKey)`

Agrupa por una propiedad y suma los valores de otra.

```javascript
summarizeBy(
  [
    { seller: "Ana", amount: 100 },
    { seller: "Luis", amount: 200 },
    { seller: "Ana", amount: 150 }
  ],
  "seller",
  "amount"
)
// → { Ana: 250, Luis: 200 }
```

<details>
<summary>Pista</summary>

Usa `.reduce()`. Para cada objeto, lee `obj[groupKey]` como clave y suma `obj[valueKey]` al valor acumulado. Inicializa a 0 si la clave no existe.

</details>

---

## Resultado esperado

Cuando todas las funciones esten implementadas correctamente, deberas ver en el navegador:

```
15 specs, 0 failures
```

Todas las barras en verde. Sin excepciones.

---

Happy coding! :)
