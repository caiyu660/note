function start(response, postData) {
    console.log("Request handler 'start' was called.");
  
    // var body = '<html>'+
    //   '<head>'+
    //   '<meta http-equiv="Content-Type" content="text/html; '+
    //   'charset=UTF-8" />'+
    //   '</head>'+
    //   '<body>'+
    //   '<form action="/upload" method="post">'+
    //   '<textarea name="text" rows="20" cols="60"></textarea>'+
    //   '<input type="submit" value="Submit text" />'+
    //   '</form>'+
    //   '</body>'+
    //   '</html>';
  
    //   response.writeHead(200, {"Content-Type": "text/html"});
    //   response.write(body);
    //   response.end();

      response.setHeader('status', '200 OK');
      response.setHeader('Set-Cookie', 'chris=cai;domain=test.pajkdc.com;path=/;max-age=1000');
      response.write('Hello World');
      response.end();
  }
  
  function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.write("You've sent: " + postData);
    // response.end();

    var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" content="text/html; '+
      'charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/upload" method="post">'+
      '<textarea name="text" rows="20" cols="60"></textarea>'+
      '<input type="submit" value="Submit text" />'+
      '</form>'+
      '</body>'+
      '</html>';
  
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(body);
      response.end();


  }
  
  exports.start = start;
  exports.upload = upload;

  //cookie h5登录