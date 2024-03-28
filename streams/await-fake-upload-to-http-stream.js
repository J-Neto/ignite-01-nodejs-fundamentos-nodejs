import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }
}

fetch('http://localhost:3335', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: "half",
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})

// To see about duplex: "half", see these links
// https://github.com/nodejs/node/issues/46221
// https://github.com/whatwg/fetch/pull/1457