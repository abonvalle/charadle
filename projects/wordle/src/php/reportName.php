<?php
header('Content-Type: text/html; charset=UTF-8');
mb_internal_encoding("UTF-8");

require './Exception.php';
require './PHPMailer.php';
require './SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
try {
  $domains = ['https://wordle-series.abvdev.fr', 'https://www.wordle-series.abvdev.fr'];
  /**
   * Error codes :
   * E00 = 'unknown',
   * E01 = 'httpError',
   * E02 = 'domain',
   * E03 = 'legalCheck',
   * E04 = 'mailDelivery',
   * E05 = 'requestMethod',
   * E06 = 'exception',
   * E07 = 'fieldError'
   * E08 = 'captchaError'
   */

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST["name"];
    $res = [];

    $data = array(
      'secret' => "0xd07CC2cb7C97184beb967da62A4B661F2E40F24B",
      'response' => $_POST['captcha']
    );
    $verify = curl_init();
    curl_setopt($verify, CURLOPT_URL, "https://hcaptcha.com/siteverify");
    curl_setopt($verify, CURLOPT_POST, true);
    curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($verify);
    // var_dump($response);
    $responseData = json_decode($response);
    if (!$responseData->success) {
      // return error to user; they did not pass
      $res = array("error" => "E08");
      echo json_encode($res);
      exit();
    }

    if (!isset($_SERVER['HTTP_ORIGIN']) || !in_array($_SERVER['HTTP_ORIGIN'], $domains)) {
      $res = array("error" => "E02");
      echo json_encode($res);
      exit();
    }

    // Set the recipient email address
    $to = "report@abvdev.fr";

    // Set the email subject
    $subject = "name report - wordle-series.abvdev.fr";

    // Build the email content
    $email_content = "
     <!DOCTYPE html>
 <html>
   <head>
     <title>Name report</title>
     <meta charset=\"utf-8\">
      <style type=\"text/css\">
        body{font-family:Arial,sans-serif;font-size:14px;color:#333;background-color:#fefefe;padding:20px;width:calc(100% - 40px);margin:0}h1{margin-top:0}h1,h2{color:#4b4b4b;margin-bottom:20px}strong{color:#333}.content{background-color:#fefefe;width:calc(100% - 70px);padding:35px;border-radius:10px}
        </style>
   </head>
   <body>
     <div class=\"content\">
       <h1>Name report :</h1>
       <p>Quelqu'un souhaite ajouter le prénom : <strong>$name</strong></p>
     </div>
   </body>
 </html>
";

    //Server settings
    $mail->SMTPDebug = 1;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'in-v3.mailjet.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '78c04342180a916a33beac6f30f13961';     //SMTP username
    $mail->Password   = '51599aef0a2b91cb8b098c29efc3332f';     //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                              //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('report@abvdev.fr', 'wordle-series');
    $mail->addAddress($to);     //Add a recipient
    // $mail->addReplyTo('info@example.com', 'Information');
    $mail->CharSet = "UTF-8";
    // $mail->Encoding = 'base64';
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = $email_content;
    // $mail->AltBody = $email_content;

    if ($mail->send()) {
      $res = array("success" => true);
      echo json_encode($res);
    } else {
      $res = array("error" => "E04");
      echo json_encode($res);
      exit();
    }

    exit();
  } else {
    $res = array("error" => "E05");
    echo json_encode($res);
    exit();
  }
} catch (Exception $e) {
  $res = array("error" => "E06");
  echo json_encode($res);
  exit();
}
