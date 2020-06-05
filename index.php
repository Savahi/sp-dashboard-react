<?php
require('auth.php');

if( isAuthRequired() ) {
	$userName = auth(false);
} 

if( isset($userName) ) { 
	echo "<script>var _userName = '" . $userName . "';</script>"; 
}  
?>

<!DOCTYPE html>
<html lang = "en">
   <head>
      <meta charset="UTF-8" />
      <title>A Dashboard</title>
	
	  <style>
			body { box-sizing:border-box; -moz-box-sizing: border-box; margin:0; padding:0; background-color:#ffffff; font-family:arial; }
			* { box-sizing:border-box; -moz-box-sizing: border-box; margin:0; padding:0; }
	  </style>

   </head>
   <body>
      <div id="app"></div>
      <script charset="utf8" src='index_bundle.js'></script>
   </body>
</html>


