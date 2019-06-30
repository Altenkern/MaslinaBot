const pathes = [
  "https://www.leftovercurrency.com/wp-content/uploads/2017/04/1-israeli-new-shekel-coin-obverse-1.jpg",
  "https://www.leftovercurrency.com/wp-content/uploads/2017/04/1-israeli-new-shekel-coin-reverse-1.jpg"
];

function* SpinGenerator() {
  for (;;) {
    let i = Math.floor(Math.random() * 2);
    console.log(i);
    yield pathes[i];
    if (i == 1) {
      yield pathes[1];
    }
    if (i == 0) {
      yield [0];
    }
  }
}

const gen = SpinGenerator();

module.exports = {
  Spin: () => gen.next().value
};
