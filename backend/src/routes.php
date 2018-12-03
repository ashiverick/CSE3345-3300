<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");

$app->options('/{routes:.+}', function($request, $response, $args){
	return $response;
});

$app->add(function ($req, $res, $next) {
	$response = $next($req, $res);
	return $response
		->withHeader('Access-Control-Allow-Origin', '*')
		->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
		->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

function debugToConsole($msg) { 
	echo "<script>console.log(".json_encode($msg).")</script>";
}
// Routes
$app->post('/login', function (request $request, response $response, array $args) {
 
    $input = $request->getParsedBody();
    $sql = "SELECT * FROM Users WHERE userName= :userName";
    $sth = $this->db->prepare($sql);
	$sth->bindParam("userName", $input["userName"]);
    $sth->execute();
    $user = $sth->fetchObject();
    //verify userName address.
    if(!$user) {
        return $this->response->withJson(['error' => true, 'message' => 'Username is incorrect.']);  
    }
 
    // verify password.
    if ($user->passW != $input["passW"]) {
        return $this->response->withJson(['error' => true, 'message' => 'Password is incorrect.']);  
    }
    $settings = $this->get('settings'); // get settings array.
    $token = JWT::encode(['userName' => $user->userName], $settings['jwt']['secret'], "HS256");
    return $this->response->withJson(['token' => $token]);
});

$app->post('/signup', function ($request, $response, $args) {
	$input = $request->getParsedBody();
	$sql = "INSERT INTO Users (userName, passW, email) VALUES (:userName, :pass, :email)";
	$sth = $this->db->prepare($sql);

	$sth->bindParam("userName", $input['username']);
	$sth->bindParam("pass", $input['password']);
	$sth->bindParam("email", $input['email']);

	$sth->execute();
	$newResponse = $response->withStatus(200);
	return $newResponse;
});

$app->get('/users', function ($request, $response, $args) {	
	$sth = $this->db->prepare(
		"SELECT * FROM Users ORDER BY userName"
	);
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

$app->get('/user/[{userName}]', function ($request, $response, $args) {
	$sth = $this->db->prepare(
		"SELECT * FROM Users WHERE userName=:userName"
	);
	$sth->bindParam("userName", $args['userName']);
	$sth->execute();
	$user = $sth->fetchObject();
	return $this->response->withJson($user);
});

$app->group('/api', function () use ($app) {
	$app->get('/user', function($request, $response, $args) {
		print_r($request->getAttribute('decoded_token_data'));
	});
    $app->get('/hello', function ($request, $response, $args) {
		Return "Hello World";
    });

	$app->get('/users', function ($request, $response, $args) {	
	//debugToConsole('REQUEST');
	    $sth = $this->db->prepare(
	        "SELECT * FROM Users ORDER BY userName"
	    );
	    $sth->execute();
	    $users = $sth->fetchAll();
	    return $this->response->withJson($users);
	});

	$app->get('/user/[{userName}]', function ($request, $response, $args) {
	    $sth = $this->db->prepare(
	        "SELECT * FROM Users WHERE userName=:userName"
	    );
	    $sth->bindParam("userName", $args['userName']);
	    $sth->execute();
	    $user = $sth->fetchObject();
	    return $this->response->withJson($user);
	});

	$app->post('/user', function ($request, $response) {
	    $input = $request->getParsedBody();
	    $sql = "INSERT INTO 
	        users (email, userName, passw) 
	        VALUES (:email, :userName, :passw)";
	    $sth = $this->db->prepare($sql);
	    $sth->bindParam("email", $input['email']);
	    $sth->bindParam("userName", $input['userName']);
	    $sth->bindParam("passw", $input['passw']);
	    $sth->execute();
	    return $this->response->withJson($input);
	});

	//get all data for one user
	$app->get('/users/[{userName}]', function ($request, $response, $args){
	    $sth = $this->db->prepare(
	        "SELECT * FROM Users WHERE userName=:userName"
	    );
	    $sth->bindParam("userName", $args['userName']);
	    $sth->execute();
	    $user = $sth->fetchObject();
	    return $this->response->withJson($user);
	});

	//return emails
	$app->get('/email', function ($request, $response, $args){
	    $sth = $this->db->prepare(
	        "SELECT email FROM Users"
	    );
	    $sth->execute();
	    $emails = $sth->fetchAll();
	    return $this->response->withJson($emails);
	});

	//get password for an account
	$app->get('/passW/[{userName}]', function ($request, $response, $args){
	    $sth = $this->db->prepare(
	        "SELECT passW FROM Users WHERE userName=:userName"
	    );
	    $sth->bindParam("email", $args['email']);
	    $sth->execute();
	    $passW = $sth->fetchObject();
	    return $this->response->withJsoon($passW);
	});
	
	$app->get('/children/[{userName}]', function ($request, $response, $args){
	    $sth = $this->db->prepare(
	        "SELECT * FROM Children WHERE parent=:userName"
	    );
	    $sth->bindParam("userName", $args['userName']);
	    $sth->execute();
	    $children = $sth->fetchAll();
	    return $this->response->withJson($children);
	});

	//get all posts
	$app->get('/posts', function ($request, $response, $args){
	    $sth = $this->db->prepare(
	        "SELECT * FROM Posts"
	    );
	    $sth->execute();
	    $posts = $sth->fetchAll();
	    return $this->response->withJson($posts);
	});

	//gets a post based on the Child ID
	$app->get('/posts/[{id}]', function ($request, $response, $args){
	    $sth = $this->db->prepare(
	        "SELECT p.* FROM Posts p JOIN Children c ON p.ChildID = c.ChildID WHERE p.ChildID = :id ORDER BY postdate DESC"
	    );
	    $sth->bindParam("id", $args['id']);
	    $sth->execute();
	    $post = $sth->fetchAll();
	    return $this->response->withJson($post);
	});

	//get all comments
	$app->get('/comments', function ($request, $response, $args){
	    $th = $this->db->prepare(
	        "SELECT * FROM Comments"
	    );
	    $sth->execute();
	    $comments = $sth->fetchAll();
	    return $this->response->withJson($comments);
	});
	
	//gets a comment based on the posting id
	$app->get('/comment/[{id}]', function ($request, $response, $args){
	    $sth = $this->db->prepare(
	        "SELECT * FROM Comments WHERE id=:id"
	    );
	    $sth->bindParam("id", $args['id']);
	    $sth->execute();
	    $comment = $sth->fetchObject();
	    return $this->response->withJson($comment);
	});

	// update password
	$app->put('/updatePassword/[{userName}]', function ($request, $response, $args) {
		$input = $request->getParsedBody();
		$sql = "UPDATE Users SET passW=:passW WHERE userName=:userName";
		$sth = $this->db->prepare($sql);
		$sth->bindParam("userName", $args['userName']);
		$sth->bindParam("passW", $input['password']);
		$sth->execute();
		// $newResponse = $response->withStatus(200);
		return $this->response->withStatus(200);
	});


	$app->post('/addPost', function ($request, $response, $args) {
		$input = $request->getParsedBody();
		$sql = "INSERT INTO Posts (ChildID, userName, body, photoID, contentType, milestone) VALUES (:childId, :userName, :body, :photoID, :content, :milestone)";
		$sth = $this->db->prepare($sql);
		$sth->bindParam("childId", $input['ChildID']);
	    $sth->bindParam("userName", $input['username']);
		$sth->bindParam("body", $input['body']);
		$sth->bindParam("photoID", $input['photoID']);
		$sth->bindParam("content", $input['content']);
		$sth->bindParam("milestone", $input['milestone']);
		$sth->execute();
		$newResponse = $response->withStatus(200);
		return $newResponse;
	});

	$app->post('/addChild', function ($request, $response, $args) {
		$input = $request->getParsedBody();
		$sql = "INSERT INTO Children (parent, firstName, lastName, gender, birthday, about, photoID) VALUES (:parent, :firstName, :lastName, :gender, :birthday, :about, :photoID)";
		$sth = $this->db->prepare($sql);
		$sth->bindParam("parent", $input['parent']);
	    $sth->bindParam("firstName", $input['firstName']);
		$sth->bindParam("lastName", $input['lastName']);
		$sth->bindParam("gender", $input['gender']);
		$sth->bindParam("birthday", $input['birthday']);
		$sth->bindParam("about", $input['about']);
		$sth->bindParam("photoID", $input['photoID']);
		$sth->execute();
		$newResponse = $response->withStatus(200);
		return $newResponse;
	});

	$app->delete('/deleteChild/[{id}]', function($request, $response, $args){
		$sth = $this->db->prepare("DELETE FROM Children WHERE ChildID = :id");
		$sth->bindParam("id", $args['id']);
		$sth->execute();
		
		$newResponse = $response->withStatus(200);
		return $newResponse;
	});

	$app->delete('/deletePost/[{id}]', function($request, $response, $args){
		$sth = $this->db->prepare("DELETE FROM Posts WHERE PostID = :id");
		$sth->bindParam("id", $args['id']);
		$sth->execute();
		$newResponse = $response->withStatus(200);
		return $newResponse;
	});
});