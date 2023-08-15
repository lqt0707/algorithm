function ArrayOf() {
  return [].slice.call(arguments);
}
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
console.log(Array.of(3));