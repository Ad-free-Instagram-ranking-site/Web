const fetch = require('node-fetch');
  async function fetchData() {
    try {
      let response = await fetch('http://ec2-13-125-15-214.ap-northeast-2.compute.amazonaws.com:3000/api/s3data');
      let data = await response.json();
    //   console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  fetchData().then(jsonData => {
    // jsonData.sort((a, b) => b.score - a.score);
    print_hello();
    console.log(jsonData);
  });
  console.log("here we go~");

function print_hello(){
    console.log("hello------------------------------------");
}
