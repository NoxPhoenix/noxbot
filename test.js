const names = ['bob', 'jeremy', 'tyler', 'dennison'];
const names2 = ['l;aksjdlfkjaslkdjasdkf', 'bob', 'jeremy', 'tyler', 'dennison'];
const names3 = ['ben', 'jon', 'l;aksjdlfkjaslkdjasdkf', 'bob', 'jeremy', 'tyler', 'dennison'];

function winner (list) {
  let win ='';
  list.forEach(function (item) {
    if (item.length > win.length) win = item;
  });
  return win;
}

console.log(winner(names));
console.log(winner(names2));
console.log(winner(names3));