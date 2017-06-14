<?php
  date_default_timezone_set('Asia/Tokyo');

  $errors = array();
  $result = array();
  $filename = './bbs.txt';

  if ($_SERVER['REQUEST_METHOD'] === 'POST')
  {
    // echo 'POST送信されました！';
    // var_dump($_POST);
    if (empty($_POST['name']))
    {
      $name = '名無しさん';
    }
    else if(strlen($_POST['name']) > 20)
    {
      $errors['name'] = '名前は10文字以内で入力してください。';
    }
    else{
    $name = $_POST['name'];
    }
    if (empty($_POST['comment']))
    {
      $errors['comment'] = 'コメントを入力してください';
    }
    else if(strlen($_POST['comment']) > 40)
    {
      $errors['comment'] = 'コメントは20文字以内で入力してください。';
    }
    else{
    $comment = $_POST['comment'];
    }

    if (count($errors) === 0)
    {
      $content = $name . ',' . $comment. ',' .date('Y-m-d H:i:s') . "\n";
      // var_dump($content);
      file_put_contents($filename, $content, FILE_APPEND | LOCK_EX);

      header('Location:http://192.168.1.29:8000/');
    }
  }

  if (is_readable($filename))
  {
    $data = file_get_contents($filename);
    $data = explode("\n", $data);
    foreach ($data as $key => $val)
    {
      if (!empty($val)) $result[$key] = explode(',', $val);
    }
    // var_dump($result);
  }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>22ch</title>
</head>
<body>
  <h1>22ch</h1>
  <?php if (count($errors) > 0) { ?>
    <ul>
      <?php foreach ($errors as $error) {?>
        <li>
        <?php echo $error; ?>
      </li>
      <?php } ?>
    </ul>
  <?php } ?>
  <form action="index.php" method="post">
    <dl>
      <dt><label for="name">名前：</label></dt>
      <dd><input type="text" name="name" id="name"></dd>
      <dt><label for="comment">ひとこと：</label></dt>
      <dd><input type="text" name="comment" id="comment"></dd>
    </dl>
    <input type="submit" name="submit" value="送信">
  </form>
  <ul>
    <?php foreach ($result as $value) { ?>
      <li>
        <?php echo htmlspecialchars($value[0], ENT_QUOTES, 'UTF-8'); ?>
        <?php echo htmlspecialchars($value[1], ENT_QUOTES, 'UTF-8'); ?>
        - <?php echo htmlspecialchars($value[2], ENT_QUOTES, 'UTF-8'); ?>
      </li>
    <?php } ?>
  </ul>
</body>
</html>
