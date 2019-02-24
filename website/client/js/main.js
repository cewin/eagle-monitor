
$.ajax({
  url: 'http://localhost:3003/api/detail',
  method: 'post',
  data: JSON.stringify({
    a: 'a',
    b: 'b'
  })
}).then((res) => {
  console.log('res', res);
  // debugger;
}).catch((err) => {
  console.log('error', err);
})